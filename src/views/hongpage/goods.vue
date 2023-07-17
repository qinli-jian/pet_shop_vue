<template>
<div>

<!--  <el-backtop target=".page-component__scroll .el-scrollbar__wrap"></el-backtop>-->
  <div style="height: 100px; display: flex; margin-top: 5px" >
    <div style=" margin-left: 500px">
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" >
        <el-menu-item index="/frontpage"  @click="toPath('/frontpage')">首页</el-menu-item>
        <el-menu-item index="/goods" @click="toPath('/goods')">全部商品</el-menu-item>
        <el-menu-item index="/about" @click="toPath('/about')">关于我们</el-menu-item>

      </el-menu>

    </div>

    <div style="padding:10px 0 ;margin-left: 200px; display: flex; justify-content: center; align-items: center;">
      <el-input style="width: 200px " placeholder="请输入想要搜索的商品" suffix-icon="el-icon-search" class="ml-5"
                v-model="name" @keyup.enter.native="search(name)" ></el-input>
      <el-button   type="primary" @click="search(name)"> 搜索</el-button>

    </div>

  </div>
  <div style="margin-left: 15%" >
    <el-dropdown @command="handleCommand">
    <span class="el-dropdown-link">
      {{ sort_name }}<i class="el-icon-arrow-down el-icon--right"></i>
    </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item
            command="综合排序"
            :class="{ 'custom-bg': currentCommand === '综合排序' }"
            @click="handleCommand('综合排序')"
        >
          综合排序
        </el-dropdown-item>
        <el-dropdown-item
            command="销量升序"
            :class="{ 'custom-bg': currentCommand === '销量升序' }"
            @click="handleCommand('销量升序')"
        >
          销量升序
        </el-dropdown-item>
        <el-dropdown-item
            command="销量降序"
            :class="{ 'custom-bg': currentCommand === '销量降序' }"
            @click="handleCommand('销量降序')"
        >
          销量降序
        </el-dropdown-item>
        <el-dropdown-item
            command="价格升序"
            :class="{ 'custom-bg': currentCommand === '价格升序' }"
            @click="handleCommand('价格升序')"
        >
          价格升序
        </el-dropdown-item>
        <el-dropdown-item
            command="价格降序"
            :class="{ 'custom-bg': currentCommand === '价格降序' }"
            @click="handleCommand('价格降序')"
        >
          价格降序
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-select v-model="L1_id" clearable placeholder="请选择一级分类" @change="selectChange" style="margin-left: 4%">
      <el-option
          v-for="item in categories"
          :key="item.value"
          :label="item.label"
          :value="item.value">
      </el-option>

    </el-select>
    <el-select v-model="L2_id" clearable placeholder="请选择二级分类" @change="selectChangeL2" style="margin-left: 10px">
      <el-option
          v-for="item in subOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
      </el-option>

    </el-select>
  </div>
  <div>

    <div class="Classificationtable">

      <div class="card-grid">
        <el-card v-for="product in products" :key="product.id" class="person-card" shadow="hover" @click.native="toDetails(product.id)">
          <div class="card-content">
            <img :src="product.imgs"  class="product-image">
            <div class="product-name-container" style="margin-top: 20px " >{{ product.name }}</div>
            <b style="margin-top: 10px ;color: red; font-size: 20px">{{ product.price }}元</b>
            <b style="margin-top: 10px ; color: #9BABB8;">销量:{{product.total_sales}}</b>
<!--            <del style="margin-top: 10px; color: gray;">{{ product.price }}.00元</del>-->
            <!-- 其他商品信息 -->

          </div>
        </el-card>
      </div>
    </div>
    <div style="padding:10px 0 ;margin-left: 500px;margin-top: 50px">
      <el-pagination
          @current-change="handleCurrentChange"
          :current-page="pageNum"
          :page-size="pageSize"
          background
          :page-sizes="[10,20]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
      </el-pagination>
    </div>
  </div>

</div>
</template>


<script>
import request from "@/utils/request";
import {globalVar} from "@/utils/globalVar";

export default {
  name: "goods",
  data(){
    return{
      name:'',
      activeIndex: '/goods',
      pageSize:10,
      pageNum:1,
      category_id:'',
      kw:'',
      total:3,
      products: [],
      currentCommand:"",
      subOptions:{},
      L1_id:"",
      L2_id:"",
      categoryL1: "",
      categoryL2: "",
      categories:[],
      sort_name:"综合排序",
      ranking:"",
      loading: false,
      searchTerm: '',
      count:2,



    }
  },
  created() {
    this.getfenlei1()
    this.getCommodity()

  },
  methods:{
    getSubOp(L1_id,f){
      for(var i =0;this.categories.length;i++){
        var item = this.categories[i];
        if(item.value===L1_id){
          console.log("L2_id")
          console.log(this.L2_id)
          this.subOptions = item.children;
          console.log("subOP")
          console.log(this.subOptions)
        }
      }
    },
    selectChangeL2(){
      this.category_id=this.L2_id
      this.getCommodity()
      console.log("selectChange2")
      console.log(this.L1_id)
      console.log(this.L2_id)

    },
    selectChange(){
      this.category_id=this.L1_id
      this.getCommodity()
      console.log("selectChange")
      console.log(this.L1_id)
      console.log(this.L2_id)
      this.L2_id="";
      this.getSubOp(this.L1_id)
    },
    setRanking(command1){
      console.log("排序")
      console.log(command1)
      console.log(command1==="销量升序")
      switch (command1){
        case "销量升序":
          this.ranking = "S_ASC";
          console.log("S_ASC")
          break;
        case "销量降序":
          this.ranking = "S_DES";
          console.log("S_DES")
          break;
        case "价格升序":
          this.ranking = "P_ASC";
          console.log("P_ASC")
          break;
        case "价格降序":
          this.ranking = "P_DES";
          console.log("P_DES")
          break;
        default:
          console.log("没进去")
          break;
      }
      this.getCommodity();
    },
    handleCommand(command) {
      this.setRanking(command)
      console.log(this.ranking)
      // this.$message('click on item ' + command);
      this.sort_name = command;
      this.currentCommand = command; // 更新currentCommand的值

    },
    //获取商品列表
    getCommodity(){
      let _this = this;

      request.get(globalVar.HOST_NAME + "/commodity/search",
        {
          params:{
            kw:_this.kw,
            category_id:_this.category_id,
            ranking:this.ranking,
            pageNum: _this.pageNum,
            pageSize:_this.pageSize,
          }
      }).then(res=>{
        console.log(res)
        const produces=res.data.map(produce=>{
          if(produce.imgs){

            produce.imgs=globalVar.STATIC_NAME+produce.imgs.split(',')[0];

          }
          return produce; // 返回处理后的元素
        })
        this.products=res.data
        this.total=res.data.length

      }).catch(error=>{
        console.error('出错了!!!!', error);
      })
    },
    search(name){
      if (this.name!==''){
        console.log(name)
        this.$router.push({path:'searchgoods',query:{kw:name}}).catch(err => err)
      }
      else {
        this.$message({
          showClose: true,
          center: true,
          message: '请输入想要搜索的商品'
        });
      }
    },
    getfenlei1(){
      console.log(111222)
      let _this=this;
      request.get(globalVar.HOST_NAME + "/commodity/getAllCategory").then(res=>{
        console.log(res.data)
        const categories = [];

        res.data.forEach((item) => {
          const category = {
            value: item.id,
            label: item.category_name,
            children: []
          };
          if (item.childen_category && item.childen_category.length > 0) {
            item.childen_category.forEach((child) => {
              const childCategory = {
                value: child.id,
                label: child.category_name
              };
              category.children.push(childCategory);
            });
          }
          categories.push(category);
        });
        console.log(222)
        console.log(categories);
        _this.categories=categories
        const ca_id = _this.category_id;
        // for(var i )
      }).catch(error => {
        console.error('Error:', error);
      })
    },
    toPath(path1){
      this.$router.push({path:path1}).catch(err => err)
    },

    handleCurrentChange(pageNum){
      this.pageNum=pageNum
      this.load()
    },
    toDetails(id){
      this.$router.push({path:'productdetails',query:{ID:id}}).catch(err => err)
    },


  }
}
</script>

<style scoped>

.Classificationtable{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.card-grid {
  padding-top: 25px;
  width: 1100px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
}
.person-card {
  margin: 20px;
  /*display: flex;*/
  /*width: ;*/

  width: 230px;
  height: 300px;
}
.card-content {
  padding: 10px;
  /*width: 200px;*/
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;


}
.product-image {
  /*margin-right: 50px;*/
  /*margin-bottom: 20px;*/
  width: 200px;
  height: 175px;

}
/* 容器样式 */
.product-name-container {
  max-width: 200px; /* 自定义容器的最大宽度 */
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis; /* 使用省略号来处理文本溢出 */
}

/* 悬停时显示完整文本 */
.product-name-container:hover {
  white-space: normal;
  overflow: visible;
}

</style>