<template>
    <div class="box">

        <div>
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                <el-menu-item index="1">所有订单</el-menu-item>
                <el-menu-item index="2">待付款</el-menu-item>
                <el-menu-item index="3">待发货</el-menu-item>
                <el-menu-item index="4">待收货</el-menu-item>
                <el-menu-item index="5">待评价</el-menu-item>
            </el-menu>

        </div>
        <div style="margin-top: 15px;">
            <el-input placeholder="请输入商品标题或订单号进行搜索" v-model="selectTitle" class="input-with-select"
                      style="width: 300px">
                <el-button slot="append" icon="el-icon-search" @click="select"></el-button>
            </el-input>
        </div>
        <div style="margin-top: 80px">
            <div class="orderList">
                <div class="page-wrap w">
                    <div class="orderList-table">
                        <table class="order-head" style="background-color: #9e9e9e">
                            <tbody>
                            <tr>
                                <th class="order_info">商品信息</th>
                                <th class="order_price">单价</th>
                                <th class="order_num">数量</th>
                                <th class="goods_handle">商品操作</th>
                                <th class="real_pay">实付款</th>
                                <th class="order_status">订单状态</th>
                                <th class="order_handle">交易操作</th>
                            </tr>
                            </tbody>
                        </table>
                        <div v-for="(item, index) in list" :key="index" class="order-body" v-if="list && list.length">
                            <table class="body_top">
                                <tbody>
                                <br/>
                                <div class="body_top_con">
                                    <div class="top_con_shop">
                                        <span class="top_con_time">{{ item.create_time.substring(0, 10) }}</span>
                                        <span class="top_con_num">订单号：{{ item.order_id }}</span>
                                    </div>
                                    <div class="top_con_del">
                                        <i class="el-icon-delete" @click="deleteOrder(item.order_id)"></i>
                                    </div>
                                </div>
                                </tbody>
                            </table>
                            <table>
                                <tbody>
                                <tr class="body_content">
                                    <div v-for="(work, ind) in item.commodity_list" :key="ind">
                                        <td colspan="" rowspan="" headers="" class="body_content_info">
                                            <div class="info_box">
                                                <div class="info_box_img" @click="viewGood(work)">
                                                    <img :src="static_name+work.image" alt=""/>
                                                </div>
                                                <div class="info_describe">
                                                    <p class="text" @click="viewGood(work)">
                                                        <span>{{ work.commodity_name }}</span>
                                                    </p>
                                                    <p class="attr">
                                                             <span v-for="(itm, iid) in work.specification" :key="iid">
                                                                   <span>{{ itm.type }}：{{ itm.value }}</span>
                                                             </span>
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td colspan="" rowspan="" headers="" class="order_price body_content_price">
                                            <p>￥{{ work.price }}</p>
                                        </td>
                                        <td colspan="" rowspan="" headers="" class="order_num body_content_num">
                                            <p>{{ work.num }}</p>
                                        </td>
                                    </div>

                                    <td colspan="" :rowspan="item.commodity_list.length" headers=""
                                        class="goods_handle body_content_handle">
                                        <p class="click change-color-on-hover">
                                            <span @click="afterSale">
                                                申请售后
                                            </span></p>
                                        <p class="click change-color-on-hover" @click="complainSeller">投诉卖家</p>
                                    </td>
                                    <td colspan="" :rowspan="item.commodity_list.length" headers=""
                                        class="real_pay body_content_pay">
                                        <p class="price">￥{{ item.total_price }}</p>
                                        <!--                                        <p class="postage">(含运费：￥{{ item.postage }})</p>-->
                                        <p class="postage">(含运费：￥0.00)</p>
                                    </td>
                                    <td colspan="" :rowspan="item.commodity_list.length" headers=""
                                        class="order_status body_content_status">
                                        <p>
                                            <span v-if="item.status.status_description === '已取消'">订单已取消</span>
                                            <span v-if="item.status.status_description === '已下单'">已下单</span>
                                            <span v-if="item.status.status_description === '待支付'">待支付</span>
                                            <span v-if="item.status.status_description === '已支付'">已支付</span>
                                            <span v-if="item.status.status_description === '出货中'">出货中</span>
                                            <span v-if="item.status.status_description === '已发货'">已发货</span>
                                            <span v-if="item.status.status_description === '运输中'">运输中</span>
                                            <span v-if="item.status.status_description === '已签收'">已签收</span>
                                            <span v-if="item.status.status_description === '交易成功'">交易成功</span>
                                            <span v-if="item.status.status_description === '审核中'">审核中</span>
                                            <span v-if="item.status.status_description === '待运回'">待运回</span>
                                            <span v-if="item.status.status_description === '已退款'">已退款</span>
                                        </p>
                                        <p class="detail">
                                            <span @click="orderDetail(item.order_id)">订单详情</span>
                                        </p>
                                        <p v-if="item.status.status_description==='已发货'||
                                        item.status.status_description==='已发货'||
                                        item.status.status_description==='已发货'||
                                        item.status.status_description==='已发货'"
                                           class="click change-color-on-hover">
                                            <span @click="viewLogistics">查看物流</span>
                                        </p>
                                    </td>
                                    <td colspan="" :rowspan="item.commodity_list.length" headers=""
                                        class="order_handle body_content_ohandle">
                                        <p v-if="item.status.status_description === '待支付'">
                                            <el-button size="mini" type="danger" @click="pay(item.order_id)">立即付款
                                            </el-button>
                                        </p>
                                        <p v-if="item.status.status_description === '待支付'" class="order_cancel">
                                            <span @click="deleteOrder">取消订单</span>
                                        </p>
                                        <p v-if="item.status.status_description==='已签收'||
                                        item.status.status_description==='交易成功'"
                                           class="click change-color-on-hover">
                                            <span @click="deleteOrder">追加评论</span>
                                        </p>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    </div>


</template>

<script>
import {globalVar} from "@/utils/globalVar";
import axios from "axios";
import Vue from "vue";

export default {
    name: "order",
    data() {
        return {
            selectTitle: '',//搜索名
            activeIndex: '1', // 默认选中的菜单项
            list: [],
            static_name: globalVar.STATIC_NAME,

        };
    },
    created() {
        //console.log(this.list.length);
        this.filteredOrders();
    },
    watch: {
        activeIndex(newValue, oldValue) {
            // 在activeIndex发生变化时执行的回调函数
            console.log("activeIndex发生变化：", newValue, oldValue);
            // 这里可以执行其他逻辑，比如更新订单数据等操作
            this.filteredOrders();
        },
    },

    methods: {
        filteredOrders() {
            console.log(this.activeIndex);
            if (this.activeIndex === '1') {
                // 返回所有订单
                this.getlist("*");
            } else if (this.activeIndex === "2") {

                this.getlist("待支付");
            } else if (this.activeIndex === "3") {
                this.getlist("待发货");
            } else if (this.activeIndex === "4") {
                this.getlist("待收货");
            } else if (this.activeIndex === "5") {
                this.getlist("待评价");
            }
        },
        handleSelect(index) {
            this.activeIndex = index;
        },
        // 可以在这里添加与后端传输数据的接口方法，从后端获取订单数据
        getlist(status) {
            axios.post(globalVar.HOST_NAME + "/user_order/get_order_by_user_id", {

                //user_id: localStorage.getItem('id'),
                user_id: "34",
                status: status

            })
                .then(response => {
                    console.log(response.data);
                    console.log(response.data.data);
                    this.list = response.data.data;
                    console.log("---------------");
                    //console.log(this.list);


                })
                .catch(error => {
                    console.log(error);
                })
        },
        select() {

        },
        viewGood() {

        },
        afterSale() {

        },
        viewLogistics() {

        },
        complainSeller() {

        },
        pay(orderId) {
            console.log(orderId);
            axios.post(globalVar.HOST_NAME + "/user_order/pay_order", {
                order_id: orderId
            })
                .then(response => {
                    console.log(response.data);
                    if (response.data.code === '200') {
                        this.$message({
                            message: '支付成功',
                            center: true,
                            showClose: true,
                            type: 'success'
                        });
                    }
                    this.filteredOrders();
                })
                .catch(error => {
                    console.log(error);
                })
        },
        orderDetail(orderId) {
            // 使用this.$router.push方法进行页面跳转，并传递数据
            this.$router.push({ name: '订单详情页', params: { order_id: orderId } });
        },
        deleteOrder(orderId) {
            console.log(orderId)

            axios.delete(globalVar.HOST_NAME + "/user_order/delete", {
                    params: {
                        order_id:orderId
                    }
                }
            )
                .then(response => {
                    console.log(response);
                    if (response.data.code === "200") {
                        this.$message({
                            message: '删除成功',
                            center: true,
                            showClose: true,
                            type: 'success'
                        });
                    }
                    this.filteredOrders();
                })
        },

    }

}
</script>

<style scoped>
.order-list {
    padding: 20px;
}

.box {
    display: flex;
    width: 70%;
    flex-direction: column;
    /*border-bottom: 1px solid black;*/
    margin-left: auto;
    margin-right: auto;

}

.click {
    cursor: pointer
}

.change-color-on-hover:hover {
    color: red; /* 鼠标悬停时的文字颜色 */
}

.order-item {
    margin-bottom: 20px;
}

</style>
<style lang="scss" scoped>
.orderList-table {
    margin-top: 20px;

    .order_info {
        width: 460px;
    }

    .order_price {
        width: 107px;
    }

    .order_num {
        width: 55px;
    }

    .goods_handle {
        width: 110px;
    }

    .real_pay {
        width: 128px;
    }

    .order_status {
        width: 110px;
    }

    .order_handle {
        width: 110px;
    }

    // 表格数据
    .order-body {
        .body_top {
            .body_top_con {
                background: #f5f5f5;
                border: 1px solid #e5e5e5;
                width: 1080px;
                padding: 10px;
                display: flex;
                justify-content: space-between;

                .top_con_shop {
                    .top_con_time {
                        color: #3c3c3c;
                        font-weight: bold;
                        margin: 0 10px 0 0;
                    }

                    .top_con_num {
                        margin: 0 50px 0 0;
                    }
                }

                .top_con_del {
                    cursor: pointer;

                    .el-icon-delete:before {
                        content: '\e6d7';
                        font-size: 15px;
                    }
                }
            }
        }

        .body_content {
            p {
                margin: 4px 0;
            }
        }

        // 商品信息
        .body_content_info {
            width: 460px;
            border-top: unset;

            .info_box {
                display: flex;
                align-items: center;
                margin: 0 10px;

                .info_box_img {
                    cursor: pointer;
                    width: 80px;
                    flex: 0 0 80px;
                    margin-right: 10px;

                    img {
                        width: 80px;
                        height: 80px;
                    }
                }

                .info_describe {
                    .text {
                        margin-bottom: 6px;
                        cursor: pointer;

                        :hover {
                            color: red;
                        }
                    }

                    .attr {
                        color: #9e9e9e;

                        span {
                            margin-right: 6px;
                        }
                    }
                }
            }
        }

        // 单价
        .body_content_price {
            text-align: center;
            border-top: unset;
        }

        // 数量
        .body_content_num {
            text-align: center;
            border-top: unset;
            border-right: unset;
        }

        //商品操作
        .body_content_handle {
            text-align: center;
            border-top: unset;
        }

        // 实际付款
        .body_content_pay {
            text-align: center;
            border-top: unset;

            .price {
                color: #3c3c3c;
                font-weight: bold;
            }

            .postage {
                color: #6c6c6c;
            }
        }

        .body_content_status {
            text-align: center;
            border-top: unset;

            .detail {
                cursor: pointer;

                :hover {
                    color: red;
                }
            }
        }

        .body_content_ohandle {
            text-align: center;
            border-top: unset;

            .order_cancel {
                cursor: pointer;

                :hover {
                    color: red;
                }
            }
        }
    }
}
</style>
<style lang="scss">
.orderList {
    .order-body {
        td,
        th {
            padding: 10px 0;
            border: 1px solid #e5e5e5;
            vertical-align: top;
        }
    }
}
</style>

