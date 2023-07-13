<template>
  <div>

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
  <el-button @click="gotoproductDetails"> goto商品详情</el-button>
  <el-button @click="gotoproducttest"> goto测试</el-button>
</div>

  </div>
</template>

<script>
export default {
  name: "about",
  data(){
    return{
      activeIndex: '/about',
    }

  },
  methods:{
    toPath(path1){
      this.$router.push({path:path1}).catch(err => err)
    },
    gotoproductDetails(){
      this.$router.push({path:'/productdetails'}).catch(err => err)
    },
    gotoproducttest(){
      this.$router.push({path:'/test'}).catch(err => err)
    }

  }
}
</script>

<style scoped>

</style>