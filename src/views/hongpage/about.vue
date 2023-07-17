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
        <el-input style="width: 200px " placeholder="请输入想要搜索的商品" suffix-icon="el-icon-search" class="ml-5" v-model="name"
                  @keyup.enter.native="search"></el-input>
        <el-button   type="primary" @click="search"> 搜索</el-button>

      </div>

    </div>
<div>
</div>

  </div>
</template>

<script>
export default {
  name: "about",
  data(){
    return{
      activeIndex: '/about',
      name:'',
    }

  },
  methods:{
    toPath(path1){
      this.$router.push({path:path1}).catch(err => err)
    },
    search(){
      if (this.name!==''){
        console.log(this.name)
        this.$router.push({path:'searchgoods'}).catch(err => err)
      }
      else{
        this.$notify({
          title: '警告',
          message: '这是一条警告的提示消息',
          type: 'warning'
        });
      }
    }

  }
}
</script>

<style scoped>

</style>