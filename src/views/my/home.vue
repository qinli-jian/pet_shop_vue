<template>
    <div  class="box">
        <div class="row">
            <div style="flex: 3">
                <el-aside  >
                    <div class="menu"  style="width: 400px">
                        <h3>账号管理</h3>
                        <router-link class="href1" to="/account-management/personal-data">个人资料</router-link>
                        <router-link class="href1" to="/account-management/security-setting">安全设置</router-link>
                        <router-link class="href1" to="/account-management/shipping-address">收货地址</router-link>
                    </div>
                </el-aside>
            </div>
            <div class="vertical-line"></div>
            <div  style="flex: 3">
                <el-container class="box">
                    <el-main >
                        <router-view/>
                    </el-main>
                </el-container>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "home",
    methods:{
        navigateTo(path){
            this.$router.push(path);
        }
    }
}
</script>

<style scoped>
.row{
    display: flex;
    flex-direction: row;
    /*align-items: center;*/
}
.box{
    width: 100% !important;
    /*border:1px solid red;*/
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}
.href1 {
    text-decoration: none;
}

.menu a {
    display: block;
    margin-bottom: 10px; /* 可选，用于设置链接之间的间距 */
}
.menu{
    float: right;
}
.vertical-line {
    width: 1px;
    background-color: #000;
    flex-grow: 1;
}
</style>
