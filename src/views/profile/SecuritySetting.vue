<template>
    <div class="box">
        <div class="square">
            <h4>安全服务</h4>
            <el-divider></el-divider>
            <div>
                <el-form label-width="120px">
                    <el-form-item
                        label="输入原密码">
                        <el-input class="width" v-model="currentPassword" show-password></el-input>
                    </el-form-item>
                    <el-form-item
                        label="输入新密码">
                        <el-input class="width" v-model="newPassword" show-password></el-input>
                    </el-form-item>
                    <el-alert
                        title="新旧密码不能相同"
                        type="error"
                        v-if="passwordMismatch2"
                        show-icon>
                    </el-alert>
                    <el-form-item
                        label="再次输入新密码">
                        <el-input class="width" v-model="confirmPassword" show-password></el-input>

                    </el-form-item>
                    <el-alert
                        title="密码不一致"
                        type="error"
                        v-if="passwordMismatch"
                        show-icon>
                    </el-alert>
                    <el-form-item
                        label="输入验证码">
                        <el-input style="width: 100px ;margin-right: 5px" v-model="code"></el-input>
                        <el-button v-if="showButton" style="width: 95px" @click="getCode" :disabled="isCountingDown">
                            {{ buttonText }}
                        </el-button>

                    </el-form-item>
                </el-form>
                <el-button @click="submitForm">确定修改</el-button>
            </div>

        </div>
    </div>
</template>

<script>
import axios from "axios";
import {globalVar} from "@/utils/globalVar";
import Vue from "vue";

export default {
    name: "SecuritySetting",
    data() {
        return {
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
            host: globalVar,
            code: '',
            showButton: true,
            isCountingDown: false,
            remainingTime: 59, // 五分钟的秒数
            timer: null
        };
    },
    computed: {
        buttonText() {
            if (this.isCountingDown) {
                return `${this.remainingTime % 60}`;
            } else {
                return '发送验证码';
            }
        },

        passwordMismatch() {
            if (this.confirmPassword === '' || this.confirmPassword == null) {
                return false;
            } else if (this.newPassword !== this.confirmPassword) {
                return true;
            }
        },
        passwordMismatch2() {
            if (this.newPassword === '' || this.newPassword == null) {
                return false;
            } else if (this.newPassword === this.currentPassword) {
                return true;
            }
        },

    },
    created() {
        //this.load();
        console.log(sessionStorage.getItem('phone'));
    },
    methods: {
        //获取验证码
        getCode() {
            let phone = sessionStorage.getItem('account');
            console.log(phone);
            axios.post(globalVar.HOST_NAME+ "/user/get_reset_phone_code", {

                    account: phone,


            })
                .then(response => {
                    if (response.data.code === '200') {
                        this.$message({
                            message: '验证码已发送',
                            center: true,
                            showClose: true,
                            type: 'success'
                        });
                        if (!this.isCountingDown) {
                            this.isCountingDown = true;
                            this.timer = setInterval(() => {
                                if (this.remainingTime > 0) {
                                    this.remainingTime--;
                                } else {
                                    this.stopTimer();
                                }
                            }, 1000);

                            this.$nextTick(() => {
                                // 在DOM更新完成后更新按钮状态
                                this.$forceUpdate();
                            });
                        }
                    }

                })
                .catch(error => {
                    console.log(error);
                })

        },
        stopTimer() {
            this.isCountingDown = false;
            clearInterval(this.timer);
            this.remainingTime = 300; // 重置计时器
            this.showButton = true; // 显示按钮
        },
        //修改密码
        submitForm() {
            let account = sessionStorage.getItem('account');
            axios.post(globalVar.HOST_NAME+ "/user/resetPassword", {
                account: account,
                code: this.code,
                password: this.confirmPassword,
                repassword: this.currentPassword,
            })
                .then(response => {
                    if (response.data.code === "200") {
                        alert('密码修改成功');
                        // 重置表单
                        this.currentPassword = '';
                        this.newPassword = '';
                        this.confirmPassword = '';
                    }
                })
                .then(error => {
                    console.log(error);
                })


        },
    },

    beforeDestroy() {
        clearInterval(this.timer);
    }
};
</script>

<style scoped>
.box {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.square {
    width: 800px;
    height: auto;
    /* border: 1px solid black; */
    padding: 30px;

}

.width {
    width: 200px;
}
</style>
