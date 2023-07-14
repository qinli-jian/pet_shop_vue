<template>
    <div class="box" >
        <div >
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                <el-menu-item index="1">所有订单</el-menu-item>
                <el-menu-item index="2">待付款</el-menu-item>
                <el-menu-item index="3">待发货</el-menu-item>
                <el-menu-item index="4">待收货</el-menu-item>
                <el-menu-item index="5">待评价</el-menu-item>
            </el-menu>
        </div>
        <div style="margin-top: 80px">
            <table>
                <thead>
                <tr>
                    <th style="width: 400px">宝贝</th>
                    <th  style="width: 100px">单价</th>
                    <th  style="width: 100px">数量</th>
                    <th  style="width: 100px">商品操作</th>
                    <th  style="width: 100px">实付款</th>
                    <th  style="width: 100px"> 交易状态</th>
                    <th  style="width: 100px">交易操作</th>
                </tr>
                </thead>
<!--                <tbody v-show="false">-->
<!--                &lt;!&ndash; 表格内容 &ndash;&gt;-->
<!--                </tbody>-->
            </table>
        </div>
        <div class="order-list">
            <div v-for="order in filteredOrders" :key="order.id" class="order-item">
                <!-- 根据订单数据展示订单信息 -->

            </div>
        </div>
    </div>


</template>

<script>
export default {
    name: "order",
    data() {
        return {
            activeIndex: '1', // 默认选中的菜单项
            orders: [], // 订单列表数据，从后端获取或通过其他方式获取
        };
    },
    computed: {
        filteredOrders() {
            if (this.activeIndex === '1') {
                // 返回所有订单
                return this.orders;
            } else {
                // 根据选中的类别筛选订单
                return this.orders.filter(order => order.status === this.activeIndex);
            }
        },
    },
    methods: {
        handleSelect(index) {
            this.activeIndex = index;
        },
        // 可以在这里添加与后端传输数据的接口方法，从后端获取订单数据
    }

}
</script>

<style scoped>
.order-list {
    padding: 20px;
}
.box{
    display: flex;
    width: 60%;
    flex-direction: column;
    /*border-bottom: 1px solid black;*/
    margin-left: auto;
    margin-right: auto;

}
.order-item {
    margin-bottom: 20px;
}
</style>
