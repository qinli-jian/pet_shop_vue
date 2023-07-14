<template>
<div >
  <!--  回到顶部-->
  <div class="wrap">
    <el-backtop target=".panel-card" :visibility-height="200" />
    <!-- 下面是其他的 html 代码 -->
  </div>
  <div style="height: 100px; display: flex; margin-top: 5px" >
    <div style=" margin-left: 500px">
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" >
        <el-menu-item index="/frontpage"  @click="toPath('/frontpage')">首页</el-menu-item>
        <el-menu-item index="/goods" @click="toPath('/goods')">全部商品</el-menu-item>
        <el-menu-item index="/about" @click="toPath('/about')">关于我们</el-menu-item>
      </el-menu>
    </div>

    <div style="padding:10px 0 ;margin-left: 200px; display: flex; justify-content: center; align-items: center;">
      <el-input style="width: 200px " placeholder="请输入想要搜索的商品" suffix-icon="el-icon-search" class="ml-5" v-model="name"
                @keyup.enter.native="search"></el-input>
      <el-button   type="primary" @click="search"> 搜索</el-button>

    </div>

  </div>

  <div style="display: flex; margin-left: 150px">
    <div style="position: relative;  display: inline-block; z-index: 10;">
      <div style="position: absolute; background-color: white;"
           >
        <el-cascader-panel
            :options="categories"
            :show-all-levels="false"
            :props="props"
            @change="handleCascaderChange"
        ></el-cascader-panel>
      </div>

    </div>
<!--    轮播图-->
    <div class="block"  style="z-index: 1; margin-left: 200px" >
      <el-carousel  class="carousel-container"  height="550px">
        <el-carousel-item v-for=" image in images" :key="image.id">
          <img :src="image" alt="image.alt" class="rightImg">
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
  <div  class="recommend">
    <div class="item" >
      <b style="margin-top: 10px ;background-color:#C5DFF8;">猜你喜欢</b>
      <hr >
      <div style="display: flex; justify-content: space-between;flex-wrap: wrap;margin-top: 10px">
        <el-card v-for="product in products1" :key="product.id" class="person-card1" shadow="hover"
                 @click.native="toDetails(product.value)" style="margin-left: 20px ;margin-top: 20px">
          <div class="card-content1">
            <div  class="item1">
              <img :src="product.image"  class="product-image1">
            </div>
            <div class="item1" style="display: flex;flex-direction: column;justify-content: center;align-items: center;">
              <b style="margin-left: 5px" >{{ product.name }}</b>
              <b style="margin-top: 5px ;color: red;">{{ product.price }}元</b>
              <del style=" color: gray;">{{ product.price }}元</del>
              <!-- 其他商品信息 -->
            </div>
          </div>
        </el-card>
      </div>
    </div>
    <br>
    <div class="item" >
      <b style="margin-top: 10px  ;background-color:#C5DFF8;">新品上新</b>
      <hr>
      <div style="display: flex; justify-content: space-between;flex-wrap: wrap;margin-top: 10px">
        <el-card v-for="product in products2" :key="product.id" class="person-card1" shadow="hover"
                 @click.native="toDetails(product.value)" style="margin-left: 20px ;margin-top: 20px">
          <div class="card-content1">
            <div  class="item1">
              <img :src="product.image"  class="product-image1">
            </div>
            <div class="item1" style="display: flex;flex-direction: column;justify-content: center;align-items: center;">
              <b style="margin-left: 5px" >{{ product.name }}</b>
              <b style="margin-top: 5px ;color: red;">{{ product.price }}元</b>
              <del style=" color: gray;">{{ product.price }}元</del>
              <!-- 其他商品信息 -->
            </div>
          </div>
        </el-card>
      </div>
    </div>
    <br>
    <div class="item">
      <b style="margin-top: 10px ;background-color:#C5DFF8;">热销商品</b>
      <hr>
      <div style="display: flex; justify-content: space-between;flex-wrap: wrap;margin-top: 10px">
        <el-card v-for="product in products3" :key="product.value" class="person-card1" shadow="hover"
                 style="margin-left: 20px ;margin-top: 20px; z-index: 100;"  @click.native="toDetails(product.value)">
          <div class="card-content1" >
            <div  class="item1" style="border-radius: 5px;">
              <img :src="product.image"  class="product-image1">
            </div>
            <div class="item1" style="display: flex;flex-direction: column;justify-content: center;align-items: center;">
              <b style="margin-left: 5px" >{{ product.name }}</b>
              <b style="margin-top: 5px ;color: red;">{{ product.price }}元</b>
              <del style=" color: gray;">{{ product.price }}元</del>
              <!-- 其他商品信息 -->
            </div>
          </div>
        </el-card>
      </div>
    </div>

  </div>
</div>
</template>

<script>

import {globalVar} from "@/utils/globalVar"

import axios from "axios";
import request from "@/utils/request";

export default {
  name: "firstPage",
  data(){
    return{
      globalVar:globalVar,
      name,
      props:{
        expandTrigger:"hover"
      },
      images: [
        require('../../assets/images/5.png'),
        require('../../assets/images/gta.png'),
        require('../../assets/images/gta1.png'),
        require('../../assets/images/O神.png'),
        require('../../assets/images/yuanshen.png'),
      ],
      activeIndex: '/frontpage',

      categories:[],
      products1: [
        {
          value:1,
          name:'你买给狗狗都不吃，王浩吃',
          price:'10.00'
        },
        {
          value:1,
          name:'你买给狗狗都不吃，王浩吃',
          price:'10.00'
        },
        {
          value:1,
          name:'你买给狗狗都不吃，王浩吃',
          price:'10.00'
        },


      ],
      products2: [
        {
          value:1,
          name:'你买给狗狗都不吃，王浩吃',
          price:'10.99'
        },
        {
          value:1,
          name:'你买给狗狗都不吃，王浩吃',
          price:'9.99'
        },
        {
          value:1,
          name:'你买给狗狗都不吃，王浩吃',
          price:'10.00'
        },


      ],
      products3: [
        {
          value:1,
          name:'你买给狗狗都不吃，王浩吃',
          price:'1000.00'
        },
        {
          value:1,
          name:'你买给狗狗都不吃，王浩吃',
          price:'10.00'
        },
        {
          value:1,
          name:'你买给狗狗都不吃，王浩吃',
          price:'10.00'
        },


      ],
      PageSize:3,
      PageNum:1,
      category_id:'',
      kw:'',
      selectedOptions:""
    };
  },
  created() {
    this.getfenlei()
  },
  methods:{
    noFocus(){
      console.log("=====")
    },
    //获取分类
    getfenlei(){
      console.log(111)
      request.get(globalVar.HOST_NAME + "/commodity/getAllCategory").then(res=>{
        console.log(res)
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
        this.categories=categories
      }).catch(error => {
        console.error('Error:', error);
      })
    },
    getCommodity1(){

    },
    getCommodity2(){

    },
    getCommodity3(){

    },
    toDetails(id){
      const path=globalVar.HOST_NAME+'/commodity/details'
      // this.$router.push({path:id}).catch(err => err)
      this.$router.push({path:'productdetails'}).catch(err => err)
      console.log('11111')
      console.log(id)
    },
    search(){
      if (this.name!==''){
        console.log(this.name)
        this.$router.push({path:'searchgoods'}).catch(err => err)
      }

    },
    reset(){
      console.log('重置')
    },
    toPath(path1){
      this.$router.push({path:path1}).catch(err => err)
    },
    //根据分类搜索商品
    handleCascaderChange(value){
      // 处理选择 value 的变化
      console.log('选择的 value：', value[1]);
      this.selectedOptions = value;
      console.log(value[value.length-1])
    }

  },
}
</script>

<style scoped>

.carousel-container{
  /*position: absolute;*/
  /*top: 60%;*/
  /*left: 55%;*/
  /*transform: translate(-50%, -50%);*/
  width: 900px;
  border-radius: 4px

}
.rightImg{
  width: 900px;
  height: 550px;
  /*border-radius: 20px;*/
}

.el-menu-vertical {
  width: 200px;
}
.recommend{
  /*background-color: beige;*/
  margin-top: 25px;
  margin-left: 150px;
  margin-right: 265px;
  /*display: flex;*/
  /*flex-direction: column;*/
  /*justify-content: center;*/
  /*align-items: center;*/
}
.item{
  flex:1;
  /*margin-left: 5px;*/
  border-radius: 20px;
  /*height: 200px;*/
  margin-top: 20px;

}
.item:first-child {
  margin-left: 0;
}
.item1{
  flex: 1;
}
.person-card1 {
  /*margin-bottom: 20px;*/
  /*display: flex;*/
  /*width: ;*/
  width: 300px;
  height: 200px;
}
.card-content1 {
  padding: 10px;
  /*width: 200px;*/
  display: flex;
  /*flex-direction: column;*/
  justify-content: left;
  /*align-items: center;*/
}
.product-image1 {
  /*margin-right: 50px;*/
  /*margin-bottom: 20px;*/
  width: 175px;
  height: 175px;
  /*border-radius: 20px;*/

}
.wrap {
  height: 100%;
  overflow-x: hidden;
}

</style>