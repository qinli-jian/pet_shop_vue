<template>
    <div class="container">
        <div class="chat-window">
            <div class="chat-content">
                <!-- 聊天记录 -->
            </div>
            <div class="send-area">
                <el-input></el-input>
                <el-button style="margin-left: 10px;" type="primary">发送</el-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "chatView",
    data(){
        return{
            
        }
    }
}
</script>

<style>
.chat-content{
    box-sizing:border-box;
    width: calc(100% - 20px); /* 考虑到边框和外边距的大小 */
    height: calc(100% - 20px);
    border:1px solid red;
    margin: 10px;
    border-radius: 10px;
}
.send-area {
    margin: 10px;
    margin-top: auto;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
}

.chat-window {
    display: flex;
    flex-direction: column;
    height: 90%;
    width: 70%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
    /* 添加阴影 */
    border-radius: 10px;
    /* 添加圆角 */
}

.container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    top: 0;
}</style>