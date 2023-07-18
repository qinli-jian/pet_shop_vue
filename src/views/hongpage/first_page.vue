<template>
<div >
  <!--  回到顶部-->

  <div style="height: 100px; display: flex; margin-top: 5px" >
    <div style=" margin-left: 500px">
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" >
        <el-menu-item index="/frontpage"  @click="toPath('/frontpage')">首页</el-menu-item>
        <el-menu-item index="/goods" @click="toPath('/goods')">全部商品</el-menu-item>
        <el-menu-item index="/about" @click="toPath('/about')">关于我们</el-menu-item>
      </el-menu>
    </div>

    <div style="padding:10px 0 ;margin-left: 200px; display: flex; justify-content: center; align-items: center;">
      <el-input style="width: 200px " placeholder="请输入想要搜索的商品" suffix-icon="el-icon-search" class="ml-5" v-model="kw"
                @keyup.enter.native="search(kw)"></el-input>
      <el-button   type="primary" @click="search(kw)"> 搜索</el-button>

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
                 @click.native="toDetails(product.id)" style="margin-left: 20px ;margin-top: 20px">
          <div class="card-content1">
            <div  class="item1">
              <img :src="product.imgs"  class="product-image1">
            </div>
            <div class="item1" style="display: flex;flex-direction: column;justify-content: center;align-items: center;">
              <div class="product-name-container" style="margin-left: 5px" ><b>{{ product.name }}</b></div>
              <b style="margin-top: 10px ;color: red;">{{ product.price }}元</b>
              <del style=" color: gray;">{{ product.price*1.2 }}元</del>
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
                 @click.native="toDetails(product.id)" style="margin-left: 20px ;margin-top: 20px">
          <div class="card-content1">
            <div  class="item1">
              <img :src="product.imgs"  class="product-image1">
            </div>
            <div class="item1" style="display: flex;flex-direction: column;justify-content: center;align-items: center;">
              <div class="product-name-container" style="margin-left: 5px" ><b>{{ product.name }}</b></div>
              <b style="margin-top: 10px ;color: red;">{{ product.price }}元</b>
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
        <el-card v-for="product in products3" :key="product.id" class="person-card1" shadow="hover"
                 style="margin-left: 20px ;margin-top: 20px; z-index: 100;"  @click.native="toDetails(product.id)">
          <div class="card-content1" >
            <div  class="item1" style="border-radius: 5px;">
              <img :src="product.imgs"  class="product-image1">
            </div>
            <div class="item1" style="display: flex;flex-direction: column;justify-content: center;align-items: center;">
              <div class="product-name-container" style="margin-left: 5px" ><b>{{ product.name }}</b></div>
              <b style="margin-top: 10px ;color: red;">{{ product.price }}元</b>
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
import request from "@/utils/request";

export default {
  name: "firstPage",
  data(){
    return{

      globalVar:globalVar,
      props:{
        expandTrigger:"hover"
      },
      // images: [
      //   require('../../assets/images/5.png'),
      //   require('../../assets/images/gta.png'),
      //   require('../../assets/images/gta1.png'),
      //   require('../../assets/images/O神.png'),
      //   require('../../assets/images/yuanshen.png'),
      // ],
      images:[],
      activeIndex: '/frontpage',
      categories:[],
      products1: [],
      products2: [],
      products3: [],
      pageSize:3,
      pageNum:1,
      category_id:'',
      kw:'',
      selectedOptions:""
    };
  },
  created() {
    this.getfenlei()
    this.getImg()
    this.getCommodity1()
    this.getCommodity2()
    this.getCommodity3()
  },  
  
  methods:{
    noFocus(){
      console.log("=====")
    },
    //获取分类
    getfenlei(){
      console.log(111222)
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
        this.categories=categories
      }).catch(error => {
        console.error('Error:', error);
      })
    },
      getImg(){
      request.get(globalVar.HOST_NAME+"/slide/slideShow").then(res=>{
        console.log(res.data)
        // 提取"image"字段并转换为图片路径数组
        const imagePaths = res.data.map(item => item.image);
        // 使用动态导入和require来引入图片资源
        const images = imagePaths.map(imagePath => globalVar.STATIC_NAME + imagePath);
        console.log(images); // 输出包含图片资源的数组
        this.images=images

      }).catch(error=>{
        console.error('轮播图出错了!!!!', error);
      })
    },
    //获取猜你喜欢的商品
    getCommodity1(){
      request.get(globalVar.HOST_NAME+"/commodity/search",{
        params:{
          kw:this.kw,
          category_id:this.category_id,
          pageNum: this.pageNum,
          pageSize:this.pageSize,
        }
      }).then(res=>{

        const produces=res.data.map(produce=>{
          if(produce.imgs){

            produce.imgs=globalVar.STATIC_NAME+produce.imgs.split(',')[0];

          }
          return produce; // 返回处理后的元素
        })
        this.products1=res.data


      }).catch(error=>{

        console.error('喜欢出错了!!!!', error);
      })
    },
    //获取新品商品
    getCommodity2(){
      request.get(globalVar.HOST_NAME+"/commodity/search",{
        params:{
          kw:this.kw,
          category_id:this.category_id,
          pageNum: this.pageNum,
          pageSize:this.pageSize,
          ranking:'P_DES'
        }
      }).then(res=>{
        console.log("新评成功")
        console.log(res)
        const produces=res.data.map(produce=>{
          console.log(produce.imgs)
          if(produce.imgs.length!=0){

            produce.imgs=globalVar.STATIC_NAME+produce.imgs.split(',')[0];
            console.log(produce.imgs)
          }
          return produce; // 返回处理后的元素
        })
        console.log("pero")
        console.log(produces)
        this.products2=produces
      }).catch(error=>{
        console.error('新品出错了!!!!', error);
      })
    },
    //获取热销商品
    getCommodity3(){
      request.get(globalVar.HOST_NAME+"/commodity/search",{
        params:{
          kw:this.kw,
          category_id:this.category_id,
          pageNum: this.pageNum,
          pageSize:this.pageSize,
          ranking:'S_DES'
        }
      }).then(res=>{
        console.log(333)
        const produces=res.data.map(produce=>{
          if(produce.imgs){

            produce.imgs=globalVar.STATIC_NAME+produce.imgs.split(',')[0];

          }
          return produce; // 返回处理后的元素
        })
        console.log(res.data)
        this.products3=res.data
      }).catch(error=>{
        console.error('热销出错了!!!!', error);
      })
    },
    toDetails(id){
      const path1=globalVar.HOST_NAME+'/commodity/details'
      // this.$router.push({path:id}).catch(err => err)
      this.$router.push({path:'productdetails',query:{ID:id}}).catch(err => err)
      console.log('11111')
      console.log(id)
      console.log(path1)
    },
    search(kw){
      if (kw!==''){
        console.log(kw)
        this.$router.push({path:'searchgoods', query: { kw:kw } }).catch(err => err)
      }
      else {
        this.$message({
          showClose: true,
          center: true,
          message: '请输入想要搜索的商品'
        });
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
      console.log(value)
      this.category_id = value[1];
      console.log(this.category_id)
      console.log(value[value.length-1])
      this.$router.push({path:'searchgoods', query: {L1_id:value[0],L2_id:value[1], categories:this.categories } }).catch(err => err)
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
/* 容器样式 */
.product-name-container {
  max-width: 100px; /* 自定义容器的最大宽度 */
  white-space: nowrap; /* 防止商品名称换行 */
  overflow: hidden;
  text-overflow: ellipsis; /* 使用省略号来处理文本溢出 */
}

/* 悬停时显示完整文本 */
.product-name-container:hover {
  white-space: normal;
  overflow: visible;
}

</style>