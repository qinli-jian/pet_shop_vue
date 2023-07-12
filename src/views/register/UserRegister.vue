<template>
  <div class="wrapper">
    <div class="register-container">
      <h2 class="register-header">用户注册</h2>
      <el-form :model="userRegister" ref="registerForm" :rules="rules" class="register-form">
        <el-form-item prop="nickname">
          <el-input size="medium" style="margin: 5px 0" prefix-icon="el-icon-user"
                    v-model="userRegister.nickname" placeholder="请输入昵称"></el-input>
        </el-form-item>

        <el-form-item prop="mobile">
          <el-input size="medium" style="margin: 5px 0" prefix-icon="el-icon-mobile"
                    v-model="userRegister.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>

        <el-form-item prop="verificationCode">
          <el-input size="medium" style="margin: 1px 0" prefix-icon="el-icon-message"
                    v-model="userRegister.verificationCode" placeholder="请输入验证码">
            <template slot="append" class="btn-box">
              <el-button type="primary" size="medium" class="btn-box"
                           @click="sendVerificationCode" :disabled="verificationCodeSending">
                {{  verificationCodeButtonText  }}
<!--                <div v-show="!verificationCodeSending"></div>-->
<!--                <div v-show="verificationCodeSending">{{countdown}}秒后重试</div>-->
              </el-button>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input size="medium" style="margin: 5px 0" prefix-icon="el-icon-lock"
                    v-model="userRegister.password" placeholder="请输入密码" show-password></el-input>
        </el-form-item>

        <el-form-item prop="confirmPassword">
          <el-input size="medium" style="margin: 5px 0" prefix-icon="el-icon-lock"
                    v-model="userRegister.confirmPassword" placeholder="请再次输入密码" show-password></el-input>
        </el-form-item>

        <el-form-item prop="gender">
          <el-radio-group v-model="userRegister.gender">
            <el-radio label="male">男</el-radio>
            <el-radio label="female">女</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item prop="age">
          <el-input size="medium" style="margin: 5px 0" prefix-icon="el-icon-date"
                    v-model="userRegister.age" placeholder="请输入年龄"></el-input>
        </el-form-item>

        <div style="margin: 5px 0; text-align: right;">
          <el-button type="primary" size="medium" autocomplete="off" round @click="register">确认注册</el-button>
          <el-button type="warning" size="medium" autocomplete="off" round @click="goBack">返回</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserRegister",
  data() {
    return {
      userRegister: {
        nickname: "",
        mobile: "",
        verificationCode: "",
        password: "",
        confirmPassword: "",
        gender: "",
        age: ""
      },
      rules: {
        nickname: [
          { required: true, message: "请输入昵称", trigger: "blur" }
          // 添加昵称的其他校验规则
        ],
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          // 添加手机号的其他校验规则
          { min: 11, max: 11, message: '输入有效的手机号', trigger: 'blur' }
        ],
        verificationCode: [
          { required: true, message: "请输入验证码", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" }
          // 添加密码的其他校验规则
        ],
        confirmPassword: [
          { required: true, message: "请再次输入密码", trigger: "blur" },
          { validator: this.checkConfirmPassword, trigger: "blur" }
        ],
        gender: [
          { required: true, message: "请选择性别", trigger: "change" }
        ],
        age: [
          { required: true, message: "请输入年龄", trigger: "blur" }
          // 添加年龄的其他校验规则
        ]
      },
      verificationCodeSending: false,
      verificationCodeButtonText: "发送验证码",
      countdown: 60, // 倒计时秒数
      timer: null // 计时器变量
    };
  },
  methods: {
    sendVerificationCode() {
      this.verificationCodeSending = true;

      // 构造请求参数，如手机号码
      const params = {
        phone: this.userRegister.mobile
      };
      let _this = this;
      console.log("获取验证码")
      this.request.post('http://5735bc3c.r7.cpolar.top/user/get_phone_code', params)
          .then(response => {
            console.log(response)
            // 模拟发送验证码的过程
            if(response.code==='200'){
              _this.$message.success("获取验证码成功");
              // 请求成功处理
              console.log(response.data); // 可根据需要处理返回的数据
              _this.startCountdown(); // 启动倒计时
            }
            else{
              //this.stopCountdown();
              _this.$message.error(response.msg);
              _this.verificationCodeSending = false; // 发送失败时也需要恢复按钮状态
            }
          })
          .catch(error => {
            // 请求失败处理
            console.error(error);
            this.verificationCodeSending = false; // 发送失败时也需要恢复按钮状态
          });
    },
    startCountdown() {
      this.verificationCodeSending = true;
      this.verificationCodeButtonText = `${this.countdown}秒后重试`;

      // 启动计时器
      this.countdownTimer = setInterval(() => {
        if (this.countdown > 1) {
          this.countdown--;
          this.verificationCodeButtonText = `${this.countdown}秒后重试`;
        } else {
          this.stopCountdown();
        }
      }, 1000);
    },
    stopCountdown() {
      clearInterval(this.countdownTimer);
      this.countdownTimer = null;
      this.verificationCodeSending = false;
      this.verificationCodeButtonText = "发送验证码";
      this.countdown = 60;
    },
    checkConfirmPassword(rule, value, callback) {
      if (value !== this.userRegister.password) {
        callback(new Error("两次输入的密码不一致"));
      } else {
        callback();
      }
    },
    register() {
      this.$refs["registerForm"].validate((valid) => {
        if (valid) {
          const params = {
            repassword:this.userRegister.confirmPassword,
            username: this.userRegister.nickname,
            phone: this.userRegister.mobile,
            code: this.userRegister.verificationCode,
            password: this.userRegister.password,
            sex: this.userRegister.gender,
            age: this.userRegister.age
          };

          this.request.post('http://5735bc3c.r7.cpolar.top/user/register', params)
              .then(response => {
                // 注册成功处理
                console.log(response)
                if(response.code==='200'){
                  console.log(response.code);
                  console.log(response.data); // 可根据需要处理返回的数据
                  // this.$message.success(response.msg);
                  this.$message.success("成功")
                  this.$router.push("/UserLogin"); // 注册成功后的操作，如跳转到登录页面
                }
                else {
                  // 注册失败的操作
                  console.log(response.code);
                  this.$message.error(response.msg);
                }

              })
              .catch(error => {
                // 注册失败处理

                console.error(error);
                this.$message.error("注册失败"); // 可根据需要显示错误提示
              });
        } else {
          return false;
        }
      });
    },
    goBack() {
      this.$router.go(-1); // 返回上一页
    }
  },
  // 在组件销毁时清除计时器
  beforeDestroy() {
    if (this.countdownTimer) {
      clearInterval(this.countdownTimer);
    }
  }
};
</script>

<style scoped>
.btn-box{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.wrapper {
  height: 100vh;
  background-image: linear-gradient(to bottom right, #42b983, #3F5EFB);
  display: flex;
  justify-content: center;
  align-items: center;
}

.register-container {
  background-color: #fff;
  width: 350px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
}

.register-header {
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
}

.register-form .el-form-item__label {
  margin-bottom: 10px;
}

.register-form .el-button {
  margin-right: 10px;
}

.register-form .el-input-group__append {
  background-color: #fff;
  border-left: 1px solid #ccc;
}

.register-form .el-input-group__append button {
  justify-content: flex-start;
  padding-left: 0;
}
</style>
