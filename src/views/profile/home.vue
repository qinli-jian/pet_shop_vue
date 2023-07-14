<template>
    <div class="box">
        <div class="row">
            <div class="aside" style="flex: 2">
                <el-aside>
                    <div class="menu"  style="width: fit-content">
                        <h3>账号管理</h3>
                        <router-link class="href1" to="/account-management/personal-data">个人资料</router-link>
                        <router-link class="href1" to="/account-management/security-setting">安全设置</router-link>
                        <router-link class="href1" to="/account-management/shipping-address">收货地址</router-link>
                    </div>
                </el-aside>
            </div>
            <div class="vertical-line"></div>
            <div class=""  style="flex: 5">
                <el-container class="box main-box">
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
.aside{
    position: absolute;
    left: 220px;
    /* top: 20px; */
    /* display: flex;
    flex-direction: row; */
    /* justify-content: flex-end; */
}
.main-box {
  /* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); */
}

.row{
    width:100%;
    display: flex;
    flex-direction: row;
    /* align-items: center; */
}
.box{
    box-sizing: border-box;
    margin-top: 20px;
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
    /* float: right; */
    
}
.vertical-line {
    /* width: 1px;
    background-color: #000;
    flex-grow: 1; */
}
</style>
