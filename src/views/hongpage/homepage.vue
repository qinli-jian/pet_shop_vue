<template>
  <div>
    <!--  导航栏信息-->
    <el-container>
      <el-header class="elheader1">
        <div class="header-1">
          <div class="header-2">
            <img src="../../assets/images/ruke5.png" class="icon" alt="Icon" />
            <el-link
              href="/"
              type="primary"
              style="font-size: 12px"
            >
              顶针的动物朋友</el-link
            >
          </div>
          <div class="header-3">
            <!-- 登录状态 -->
            <div v-if="isLoggedIn">
              <el-button
                type="text"
                style="width: 20px; margin-right: 10px"
                @click="toProfile"
              >
                {{ getUsername() }}
              </el-button>
              <el-button
                type="text"
                style="width: 20px; margin-left: 20px"
                @click="exit"
                >[退出]</el-button
              >
              <el-button
                type="text"
                style="width: 20px; margin-left: 40px"
                @click="gotoMessage"
              >
                <i class="el-icon-chat-dot-round">新消息</i></el-button
              >
              <el-button
                type="text"
                style="width: 20px; margin-left: 40px"
                @click="gotoShopping"
              >
                <i class="el-icon-shopping-cart-2">购物车</i></el-button
              >
              <el-dropdown style="margin-left: 20px" @command="handleCommand">
                <el-button
                  class="el-dropdown-link"
                  type="text"
                  style="margin-left: 20px"
                  ><i class="el-icon-user">个人中心</i></el-button
                >
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="a" @click.native="toOrderPage">我的订单</el-dropdown-item>
                  <el-dropdown-item command="b">收货地址设置</el-dropdown-item>
                  <el-dropdown-item command="c">阿巴阿巴</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
            <!-- 未登录状态 -->
            <div v-else>
              <el-button
                type="text"
                style="width: 20px; margin-right: 10px"
                @click="gotoLogin"
                >[登录]</el-button
              >
              <el-button
                type="text"
                style="width: 20px; margin-right: 10px"
                @click="gotoRegister"
                >[注册]</el-button
              >
            </div>
          </div>
        </div>
      </el-header>

      <el-main>
        <router-view />
      </el-main>

      <el-footer style="margin: 40px 100px 50px 200px">
        <div class="footer-container">
          <div class="footer-content">
            <h3>联系信息</h3>
            <p>电话: 023-62652498</p>
            <p>电子邮件: info@example.com</p>
            <p>地址: 重庆市南岸区学府大道66号</p>
          </div>
          <div class="footer-content">
            <h3>导航</h3>
            <ul>
              <li><a href="#">首页</a></li>
              <li><a href="#">关于我们</a></li>
              <li><a href="#">产品</a></li>
              <li><a href="#">联系我们</a></li>
            </ul>
          </div>
          <div class="footer-content">
            <h3>社交媒体</h3>
            <ul>
              <li>
                <a href="#"><i class="fab fa-facebook"></i></a>
              </li>
              <li>
                <a href="#"><i class="fab fa-twitter"></i></a>
              </li>
              <li>
                <a href="#"><i class="fab fa-instagram"></i></a>
              </li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; 2023 Example Website. All Rights Reserved.</p>
        </div>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "homepage",

  data() {
    return {
      isLoggedIn: false, // 根据登录状态设置为 true 或 false
      username: "王小浩", // 根据登录用户设置用户名
    };
  },
  mounted() {
    var id = localStorage.getItem("id");
    if (id != undefined || id != null) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  },
  methods: {
    toOrderPage(){
      console.log("购物车")
      this.$router.push({ path: "order" }).catch((err) => {
        console.log(err);
      });
    },
    getUsername() {
      var name = localStorage.getItem("name");
      return name;
    },
    toProfile() {
      this.$router.push("/account-management/personal-data").catch((err) => {
        console.log(err);
      });
    },
    gotoLogin() {
      console.log("登录");
      this.isLoggedIn = true;
      this.$router.push({ path: "/login" }).catch((err) => {
        console.log(err);
      });
    },
    gotoRegister() {
      console.log("注册");
    },
    gotoShopping() {
      console.log("购物车");
      this.$router.push("ShoppingCart").catch((err) => {
        console.log(err);
      });
    },
    gotoMessage() {
      console.log("消息");
    },
    exit() {
      console.log("退出");
      this.isLoggedIn = false;
      localStorage.removeItem("id")
      localStorage.removeItem("name")
      localStorage.removeItem("token")
    },

    handleCommand(command) {
      console.log(command);
    },
  },
};
</script>

<style scoped>
.icon {
  height: 30px;
}
.elheader1 {
  display: flex;
  /*align-items: center;*/
  align-items: flex-start;
  background: #9acaf1;
  height: 30px !important;
  /*justify-content: flex-end;*/
}
.header-1 {
  font-size: 14px;
  display: flex;
}
.header-2 {
  display: flex;
  flex-direction: row;
  /*justify-content: center;*/
  align-items: center;
  margin-left: 10px; /* 设置左边距 */
  width: 800px;
}
.header-3 {
  /*margin-top: 10px; !* 设置上方间距 *!*/
  /*margin-bottom: 10px; !* 设置下方间距 *!*/
  height: 30px !important;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 10px; /* 设置右边距 */
  margin-left: auto;
}
.header-4 {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.footer-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
}

.footer-content {
  flex: 1 1 300px;
  margin: 10px;
}

.footer-content h3 {
  font-size: 18px;
  margin-bottom: 10px;
}

.footer-content p,
.footer-content ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

.footer-content ul li {
  margin-bottom: 5px;
}

.footer-content ul li a {
  text-decoration: none;
  color: #333;
}

.footer-bottom {
  text-align: center;
  margin-top: 20px;
  font-size: 14px;
  color: #888;
}
</style>