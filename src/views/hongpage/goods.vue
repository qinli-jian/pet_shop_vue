<template>
<div>

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
  <div>
    <div style="width: 200px">
    </div>
    <div class="card-grid" style="padding-top: 25px;;margin-left: 350px;width: 700px">
      <el-card v-for="product in products" :key="product.id" class="person-card" shadow="hover">
        <div class="card-content">

          <img :src="product.image"  class="product-image">
          <h2>{{ product.name }}</h2>
          <h3>{{ product.name }}</h3>
          <span>{{ product.price }}</span>
          <!-- 其他商品信息 -->

        </div>
      </el-card>
    </div>
  </div>
</div>
</template>


<script>
export default {
  name: "goods",
  data(){
    return{
      activeIndex: '/goods',
      products: [
        { id: 1, name: '商品1', price: 10.99, image: '/path/to/image1.jpg' },
        { id: 2, name: '商品2', price: 19.99, image: '/path/to/image2.jpg' },
        { id: 3, name: '商品3', price: 15.99, image: '/path/to/image3.jpg' },
        { id: 4, name: '商品4', price: 15.99, image: '/path/to/image3.jpg' },
        { id: 5, name: '商品5', price: 15.99, image: '/path/to/image3.jpg' },
        { id: 6, name: '商品6', price: 15.99, image: '/path/to/image3.jpg' },
        // 其他商品对象
      ]
    }
  },

  methods:{
    toPath(path1){
      this.$router.push({path:path1}).catch(err => err)
    }
  }
}
</script>

<style scoped>
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;
}
.person-card {
  width: 150px;
  margin-bottom: 20px;
  /*display: flex;*/
}
.card-content {
  padding: 10px;
  width: 150px;
}

.product-image {
  margin-left: 12px;
  width: 100px;
  height: 100px;
  margin-bottom: 10px;
}
</style>