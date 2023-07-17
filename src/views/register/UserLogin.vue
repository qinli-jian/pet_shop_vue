<template>
  <div class="wrapper">
    <div class="login-container">
      <div class="login-header">欢迎来到宠物之家</div>
      <el-form :model="userLogin" ref="loginForm" :rules="rules" class="login-form">
        <el-form-item prop="mobile">
          <el-input size="medium" style="margin: 10px 0" prefix-icon="el-icon-user" v-model="userLogin.mobile"></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input size="medium" style="margin: 10px 0" prefix-icon="el-icon-lock" v-model="userLogin.password" show-password></el-input>
        </el-form-item>

        <div style="margin: 10px 0; text-align: center">
          <el-button type="primary" size="small" autocomplete="off" round @click="login">登录</el-button>
          <el-button type="warning" size="small" autocomplete="off" round @click="register">注册</el-button>
          <el-link style="margin-left: 10px" @click="forgotPassword">忘记密码</el-link>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {globalVar} from "@/utils/globalVar";
export default {
  name: "Login",
  data() {
    return {
      userLogin: {},
      rules: {
        mobile: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 11, max: 11, message: '输入有效的手机号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ],
      }
    };
  },
  methods: {
    login() {
      this.$refs["loginForm"].validate((valid) => {
        if (valid) {
          // 向服务器发送登录请求
          const { mobile, password } = this.userLogin;
          console.log(mobile)
          this.request.post(globalVar.HOST_NAME+'/user/login', {
            "account" :mobile,
            "password":password
          })
              .then((response) => {
                console.log(response)
                // 登录成功的操作
                if (response.code==="200") {
                  console.log(response.code)
                  this.$message.success(response.msg);
                  // 跳转到首页或其他页面
                  this.$router.push('/主页');
                } else {
                  // 登录失败的操作，如提示错误信息
                  console.log(response.code)
                  this.$message.error("出错");
                }
              })
              .catch((error) => {
                // 处理请求错误的操作
                console.error('登录请求出错:', error);
              })
        } else {
          return false;
        }
      });
    },

    register() {
      // 在此处编写注册逻辑

      this.$router.push('/UserRegister')

    },
    forgotPassword() {
      this.$router.push('/UserForget')
    }
  },

};
</script>

<style scoped>
.wrapper {
  height: 100vh;
  /*background-image: linear-gradient(to bottom right, #42b983, #3F5EFB);*/
  background-image: url('./pic/3.jpg');
  background-size: cover;

  overflow: hidden;
}

.login-container {
  margin: 200px auto;
  background-color: #fff;
  width: 350px;
  height: 300px;
  padding: 20px;
  border-radius: 10px;
}

.login-header {
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: rgba(51, 51, 51, 0.99);
}

.login-form .el-form-item__label {
  margin: 10px 0;
}

.login-buttons {
  margin: 10px 0;
  text-align: right;
}
</style>
