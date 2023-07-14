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
                v-model="name" @keyup.enter.native="search" ></el-input>
      <el-button   type="primary" @click="search"> 搜索</el-button>

    </div>

  </div>
  <div>

    <div class="Classificationtable">

      <div class="card-grid" style="padding-top: 25px;;margin-left: 100px;width: 800px">
        <el-card v-for="product in products" :key="product.id" class="person-card" shadow="hover" @click="toDetails">
          <div class="card-content">
            <img :src="product.image"  class="product-image">
            <b style="margin-top: 20px " >{{ product.name }}</b>
            <b style="margin-top: 10px ;color: red;">{{ product.price }}元</b>
            <del style="margin-top: 10px; color: gray;">{{ product.price }}.00元</del>
            <!-- 其他商品信息 -->

          </div>
        </el-card>
      </div>
    </div>
    <div style="padding:10px 0 ;margin-left: 500px">
      <el-pagination
          @current-change="handleCurrentChange"
          :current-page="pageNum"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
      </el-pagination>
    </div>
  </div>
</div>
</template>


<script>
import request from "@/utils/request";

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
      total:0,
      products: [
      ]
    }
  },
  created() {
      this.getCommodity()
  },
  methods:{
    //获取商品列表
    getCommodity(){
      let _this = this;

      request.get("http://5735bc3c.r7.cpolar.top" + "/commodity/search",
        {
          params:{
            kw:_this.kw,
            category_id:_this.category_id,
            pageNum: _this.pageNum,
            pageSize:_this.pageSize,
          }
      }).then(res=>{
        console.log(res)
        this.products=res.data
        this.total=res.total

      }).catch(error=>{
        console.error('Error:', error);
      })
    },
    search(){
      if (this.name!==''){
        console.log(this.name)
        this.$router.push({path:'searchgoods'}).catch(err => err)
      }




    },
    toPath(path1){
      this.$router.push({path:path1}).catch(err => err)
    },

    handleCurrentChange(pageNum){
      this.pageNum=pageNum
      this.load()
    },
    toDetails(){

    }
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
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;
}
.person-card {
  /*margin-bottom: 20px;*/
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
</style>