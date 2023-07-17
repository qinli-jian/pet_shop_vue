<template>
<div style="width: 100%">
  <div style="margin-left: 200px;margin-top: 20px">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>搜索</el-breadcrumb-item>
<!--      <el-breadcrumb-item>商品详情</el-breadcrumb-item>-->
    </el-breadcrumb>
  </div>
  <div style="margin-left: 200px;margin-right: 260px">
    <div>
      <div style="padding:10px 0 ;margin-top:20px;margin-bottom: 20px; display: flex; justify-content: center; align-items: center;">
        <el-input v-model="searchTerm" placeholder="搜索你想要的商品" @keyup.enter.native="performSearch"
                  clearable size="large" style="width: 400px;" ></el-input>
        <el-button type="primary" icon="el-icon-search" size="large" @click.native="performSearch">搜索</el-button>


      </div>
    </div>

    <div style="margin-left: 100px" >
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
      <el-select v-model="L1_id" clearable placeholder="请选择一级分类" @change="selectChange" style="margin-left: 20px">
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

    <div style="height: 600px;width: 100%;">



      <div class="infinite-list-wrapper" style="overflow:auto;height: 100%;margin-top: 50px">
        <ul
            class="list"
            v-infinite-scroll="load"
            infinite-scroll-disabled="disabled">
            <li v-for="product in products" class="list-item" style="height: 200px">
              <el-card  class="listCard" shadow="hover"  @click.native="toDetails(product.id)">

                <div style="margin: 12px ;height: 175px;display: flex;flex-direction: row ">
                  <img :src="product.imgs"  class="product-image3">
                  <div style="display: flex;flex-direction: column;justify-content: flex-start;margin: 12PX;">
                    <div style="margin-top: 20px " >{{ product.name }}</div>
                    <b style="margin-top: 10px ;color: red; font-size: 20px">{{ product.price }}元</b>
                    <b style="margin-top: 10px ; color: #9BABB8;">销量:{{product.total_sales}}</b>
                    <!--            <del style="margin-top: 10px; color: gray;">{{ product.price }}.00元</del>-->
                    <!-- 其他商品信息 -->
                  </div>
                </div>
<!--                <div style="display: flex;flex-direction: column;justify-content: flex-start;margin: 12PX;">-->
<!--                  <div style="margin-top: 20px " >{{ product.name }}</div>-->
<!--                  <b style="margin-top: 10px ;color: red; font-size: 20px">{{ product.price }}元</b>-->
<!--                  <b style="margin-top: 10px ; color: #9BABB8;">销量:{{product.total_sales}}</b>-->
<!--                  &lt;!&ndash;            <del style="margin-top: 10px; color: gray;">{{ product.price }}.00元</del>&ndash;&gt;-->
<!--                  &lt;!&ndash; 其他商品信息 &ndash;&gt;-->
<!--                </div>-->
              </el-card>
            </li>

        </ul>
        <p v-if="loading">加载中...</p>
        <p v-if="noMore">没有更多了</p>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import product_details from "@/views/hongpage/product_details";
import {globalVar} from "@/utils/globalVar";
import request from "@/utils/request";

export default {
  name: "searchgoods",
  data(){
    return{
      currentCommand:"",
      subOptions:{},
      L1_id:"",
      L2_id:"",
      categoryL1: "",
      categoryL2: "",
      categories:[],
      sort_name:"综合排序",
      loading: false,
      searchTerm: '',
      products: [],
      kw:'',
      count:2,
      pageSize: 5,
      pageNum:1,
      category_id:'',
      ranking:"",
      total:7,
    }
  },
  created() {
    this.getfenlei1()
  },
  watch:{
    // L1_id(nv,ov){
    //   this.getSubOp(nv);
    // }
  },
  computed: {
    noMore () {
      return this.pageSize >=10
    },
    disabled () {
      return this.loading || this.noMore
    },
    categoryL2(){

    }
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
      this.getsearchgood()
      console.log("selectChange2")
      console.log(this.L1_id)
      console.log(this.L2_id)

    },
    selectChange(){
      this.category_id=this.L1_id
      this.getsearchgood()
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
      this.getsearchgood();
    },
    handleCommand(command) {
      this.setRanking(command)
      console.log(this.ranking)
      // this.$message('click on item ' + command);
      this.sort_name = command;
      this.currentCommand = command; // 更新currentCommand的值

    },
    load () {
      console.log("加载")
      this.loading = true
      // 进行请求，请求道德length加到pagesize里面
      setTimeout(() => {
        this.pageSize += 1
        this.getsearchgood()
        this.loading = false
      }, 2000)
    },
    performSearch() {
      // 执行搜索逻辑，例如发送搜索请求或进行搜索结果展示等
      console.log('搜索：', this.searchTerm);
      this.getsearchgood();
    },
    performSearch1(evt){
      console.log(evt.target.value)
    },
    toDetails(id){
      const path1=globalVar.HOST_NAME+'/commodity/details'
      // this.$router.push({path:id}).catch(err => err)
      this.$router.push({path:'productdetails'}).catch(err => err)
      console.log('11111')
      console.log(id)
      console.log(path1)
    },
    getsearchgood(){
      request.get(globalVar.HOST_NAME+"/commodity/search",{
        params:{
          kw:this.searchTerm,
          category_id:this.category_id,
          pageNum: this.pageNum,
          pageSize:this.pageSize,
          ranking:this.ranking
        }
      }).then(res=>{
        console.log(res.data)
        const produces=res.data.map(produce=>{
          if(produce.imgs){

            produce.imgs=globalVar.STATIC_NAME+produce.imgs.split(',')[0];

          }
          return produce; // 返回处理后的元素
        })
        console.log(11)
        console.log(res.data)
        this.products=res.data
      }).catch(error=>{
        console.error('搜索商品出错了', error);
      })
    },
    addDictData(){
      // 通过 this.$route.query + 参数键  接收参数
      console.log("=====")
      if (this.$route.query.kw){
        this.searchTerm = this.$route.query.kw
      }

      this.L2_id=this.$route.query.L2_id;
      this.L1_id=this.$route.query.L1_id;
      this.getSubOp(this.L1_id)
      console.log("L2_id")
      console.log(this.$route.query.L2_id)
      console.log(this.$route.query.category_id)
      console.log(this.category_id)
      // console.log(this.$route.query.kw)
      // console.log(this.kw)
    },
//获取分类
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
        _this.addDictData()
        // for(var i )
      }).catch(error => {
        console.error('Error:', error);
      })
    },
  }
}
</script>

<style scoped>
.infinite-list-wrapper{
  margin-left: 100px;
}
.listCard{
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 300px;
  height: 200px;
  margin: 10px;

}
.listCard:hover {
  white-space: normal;
  overflow: visible;
}

.el-card__body .product-image3 {
  /*margin-right: 50px;*/
  /*margin-bottom: 20px;*/
  width: 175px;
  height: 175px;

}

.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
}
.el-icon-arrow-down {
  font-size: 12px;
}
/*.el-card__body{*/
/*  */
/*}*/
.custom-bg {
  background-color: #ECF5FF;
  color: #66B1FF;
}
</style>