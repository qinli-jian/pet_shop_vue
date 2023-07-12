<template>
<div>
  <!--  回到顶部-->
  <el-backtop target=".page-component__scroll .el-scrollbar__wrap"></el-backtop>
  <div style="height: 100px; display: flex; margin-top: 5px" >
    <div style=" margin-left: 500px">
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" >
        <el-menu-item index="/frontpage"  @click="toPath('/frontpage')">首页</el-menu-item>
        <el-menu-item index="/goods" @click="toPath('/goods')">全部商品</el-menu-item>
        <el-menu-item index="/about" @click="toPath('/about')">关于我们</el-menu-item>
      </el-menu>
    </div>

    <div style="padding:10px 0 ;margin-left: 200px; display: flex; justify-content: center; align-items: center;">
      <el-input style="width: 200px " placeholder="请输入想要搜索的商品" suffix-icon="el-icon-search" class="ml-5" v-model="name"></el-input>
      <el-button   type="primary" @click="search"> 搜索</el-button>

    </div>

  </div>

  <div style="display: flex; margin-left: 150px">
    <div style="position: relative; z-index: 2; display: inline-block;">
      <div style="position: relative;">
        <el-cascader-panel
            :options="categories"
            :show-all-levels="false"
            @change="handleCascaderChange"
        ></el-cascader-panel>
      </div>

    </div>
    <div class="block"  style="margin-left: 50px ; position: relative; z-index: 1;" >
      <el-carousel  class="carousel-container"  height="500px">
        <el-carousel-item v-for=" image in images" :key="image.id">
          <img :src="image" alt="image.alt" class="rightImg">
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</div>
</template>

<script>



import axios from "axios";

export default {
  name: "firstPage",
  data(){
    return{
      name,
      images: [
        require('../../assets/images/5.png'),
        require('../../assets/images/gta.png'),
        require('../../assets/images/gta1.png'),
        require('../../assets/images/O神.png'),
        require('../../assets/images/yuanshen.png'),
      ],
      activeIndex: '/frontpage',
      categories: [
        {
          value: 1,
          label: '电子产品',
          children: [
            { value: 11, label: '手机' },
            { value: 12, label: '电视' },
            { value: 13, label: '电脑' }
          ]
        },
        {
          value: 2,
          label: '家居用品',
          children: [
            { value: 21, label: '床上用品' },
            { value: 22, label: '厨房用具' },
            { value: 23, label: '家具' }
          ]
        },
        {
          value: '3',
          label: '其他',
        }
        // 其他分类和子分类项
      ],
      selectedOptions:""
    };
  },

  methods:{

    //获取分类

    async fetchImages() {
      try {
        const response = await axios.get('/api/images'); // 通过适当的 API 路径请求图片数据
        this.images = response.data; // 将返回的图片数据赋值给组件的 images 数组
      } catch (error) {
        console.error('Failed to fetch images:', error);
      }
    },
    search(){
      console.log('搜索')
      console.log(this.name)
    },
    reset(){
      console.log('重置')
    },
    toPath(path1){
      this.$router.push({path:path1}).catch(err => err)
    },
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
  height: 600px;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}
.el-menu-vertical {
  width: 200px;
}

</style>