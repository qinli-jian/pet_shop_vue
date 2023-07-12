<template>
<div>
  <el-container>
    <el-header class="elheader1">
      <div class="header-1">
        <p style="width: 40px;margin-left: 20px;">首页</p>

        <div class="header-2">
            <img src="../../assets/images/ruke5.png" class="icon" alt="Icon"/>
          <el-link href="http://localhost:8082/page" target="_blank" type="primary" style="font-size: 12px;"> 顶针的动物朋友</el-link>
        </div>
        <div class="header-3">
          <!-- 登录状态 -->
          <div v-if="isLoggedIn">
          <el-button  type="text" style="width: 20px; margin-right: 20px; left: 10px;" @click="exit">
            {{ username }} [退出]
          </el-button>
          <el-button type="text" style="width: 20px; margin-left: 40px;" @click="gotoMessage">
            <i class="el-icon-chat-dot-round">新消息</i></el-button>
          <el-button type="text" style="width: 20px; margin-left: 40px;" @click="gotoShopping">
            <i class="el-icon-shopping-cart-2">购物车</i></el-button>
          <el-dropdown style="margin-left: 20px" @command="handleCommand">
            <el-button class="el-dropdown-link" type="text" style=" margin-left: 20px;"><i class="el-icon-user">个人中心</i></el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="a">我的订单</el-dropdown-item>
              <el-dropdown-item command="b">收货地址设置</el-dropdown-item>
              <el-dropdown-item command="c">阿巴阿巴</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          </div>
          <!-- 未登录状态 -->
          <div v-else>
            <el-button type="text" style="width: 20px; margin-right: 10px;" @click="gotoLogin">[登录]</el-button>
            <el-button type="text" style="width: 20px; margin-right: 10px;" @click="gotoRegister">[注册]</el-button>
          </div>

        </div>
      </div>
    </el-header>

    <el-main>
      <router-view />
    </el-main>

    <el-footer>
    </el-footer>
  </el-container>
</div>

</template>

<script>
export default {
  name: "homepage",

  data(){
    return{
      isLoggedIn: true, // 根据登录状态设置为 true 或 false
      username: '王小浩' // 根据登录用户设置用户名

    }
  },

  methods:{
    gotoLogin(){
      console.log("登录")
      this.isLoggedIn=true
    },
    gotoRegister(){
      console.log("注册")
    },
    gotoShopping(){
      console.log("购物车")
    },
    gotoMessage(){
      console.log("消息")
    },
    exit(){
      console.log("退出")
      this.isLoggedIn=false
    },

    handleCommand(command) {
      console.log(command)
    }
  },

}
</script>

<style scoped>
.icon{
  height: 20px;
}
.elheader1{
  display: flex;
  /*align-items: center;*/
  align-items: flex-start;
  background: #9acaf1;
  height: 20px !important;
  /*justify-content: flex-end;*/
}
.header-1{
  font-size: 12px;
  display: flex;
}
.header-2{
  display: flex;
  flex-direction: row;
  /*justify-content: center;*/
  align-items: center;
  margin-left: 10px; /* 设置左边距 */
  width: 800px;
}
.header-3{
  /*margin-top: 10px; !* 设置上方间距 *!*/
  /*margin-bottom: 10px; !* 设置下方间距 *!*/
  height: 20px !important;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 10px; /* 设置右边距 */
  margin-left: auto;
}
.header-4{
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>