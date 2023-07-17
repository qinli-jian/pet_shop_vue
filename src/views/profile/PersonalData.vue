<template>
    <div class="box">
        <div class="square">
            <el-form label-width="80px" :model="formData">
                <el-form-item label="当前头像">
<!--                    <el-upload-->
<!--                        class="avatar-uploader"-->
<!--                        action="https://jsonplaceholder.typicode.com/posts/"-->
<!--                        :show-file-list="false"-->
<!--                        :on-success="handleAvatarSuccess"-->
<!--                        :before-upload="beforeAvatarUpload">-->
<!--                        <div @mouseover="showText = true"-->
<!--                             @mouseleave="showText = false">-->
<!--                            <img v-if="imageUrl" :src="imageUrl" class="avatar" alt="">-->
<!--                            <img v-else src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"-->
<!--                                 class="avatar" alt="">-->
<!--                        </div>-->
<!--                    </el-upload>-->
                    <el-avatar shape="square" :size="100"  :src="avatar"></el-avatar>
                    <el-button type="text" @click="$refs.uploadInput.click()">上传头像</el-button>
                    <input type="file" ref="uploadInput" style="display: none" @change="handleFileChange" />
                </el-form-item>
                <el-form-item label="账号">
                    <el-input class="width" v-model="formData.account" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="昵称">
                    <el-input class="width" v-model="formData.name"></el-input>
                </el-form-item>
                <el-form-item label="年龄">
                    <el-input-number controls-position="right" v-model="formData.age" :min="1"></el-input-number>
                </el-form-item>
                <el-form-item label="性别">
                    <el-radio v-model="formData.sex" label="1">男</el-radio>
                    <el-radio v-model="formData.sex" label="0">女</el-radio>
                </el-form-item>
                <el-button type="success" plain @click="save">保存</el-button>
            </el-form>
        </div>

    </div>

</template>

<script>
import axios from "axios";
import {globalVar} from "@/utils/globalVar";

export default {
    name: "PersonalData",
    data() {
        return {
            avatar: "", // 用于显示上传后的头像图片地址
            file: null, // 用于保存上传的文件
            imageUrl: '',
            formData: {

                account: '',
                name: '',
                age: '',
                sex: ''
            },
            showText: false,

        };
    },
    created() {
        this.load();
    },
    methods: {

        handleFileChange(event) {
            this.file = event.target.files[0];
            this.uploadAvatar(); // 选择文件后立即触发上传头像的方法
        },
        uploadAvatar() {
            if (!this.file) {
                // 如果文件为空，不进行上传
                return;
            }

            const formData = new FormData();
            formData.append("image", this.file); // 将上传的文件添加到FormData
            formData.append("user_id",localStorage.getItem('id'));
            axios
                .post(globalVar.HOST_NAME+"/user/uploadAvatar", formData, {

                })
                .then((response) => {
                    // 处理上传成功的情况
                    console.log(response);
                    this.avatar = globalVar.STATIC_NAME + response.data.data.avatar; // 更新显示头像的URL
                    console.log("上传头像成功！");
                    console.log(this.avatar)
                })
                .catch((error) => {
                    // 处理上传失败的情况
                    console.error("上传头像失败:", error);
                });
        },

        load() {
            var phone = sessionStorage.getItem("account");
            phone = '15047418647';
            var userId = sessionStorage.getItem("id");
            userId = "";
            axios.get(globalVar.HOST_NAME + "/user/profile", {
                params: {
                    phone: phone,
                    user_id: userId
                }
            })
                .then(response => {
                    this.formData = response.data.data;
                    console.log(response.data.data);
                    this.avatar = globalVar.STATIC_NAME + response.data.data.avatar; // 更新显示头像的URL
                    console.log(this.avatar);
                    sessionStorage.setItem('account', response.data.data.account);
                    sessionStorage.setItem('id', response.data.data.id)
                    //console.log(sessionStorage.getItem('account'));
                    //console.log(sessionStorage.getItem('id'));

                    // console.log("表数据");
                    // console.log(this.formData);
                    // console.log(this.formData.age);
                    console.log(response.data)
                })
                .catch(error => {
                    console.log(error);
                })
        },
        save() {
            axios.post(globalVar.HOST_NAME + "/user/modifyProfile", this.formData
            )
                .then(response => {
                    console.log(response.data)
                    if (response.data.code === "200") {
                        this.$message({
                            message: '修改成功',
                            center: true,
                            showClose: true,
                            type: 'success'
                        });
                        this.load();
                    }
                })
                .catch(error => {
                    console.log(error);
                })
        }

    }
}
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

.avatar-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, 50%);
    color: #ffffff;
    background-color: rgba(0, 0, 0, 0.7);
    padding: 5px 10px;
    border-radius: 4px;
    cursor: pointer;
}

.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}

.avatar {
    width: 178px;
    height: 178px;
    display: block;

}

.square {
    width: 800px;
    height: auto;
    /* border: 1px solid black; */
    padding: 30px;
}

.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.width {
    width: 250px;
}

.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}

.avatar {
    width: 70px;
    height: 70px;
    display: block;
}
</style>
