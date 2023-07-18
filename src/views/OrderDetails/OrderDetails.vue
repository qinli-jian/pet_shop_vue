<template>
  <div class="MainBack">
    <div style="text-align: center">
      <h1>订单详情</h1>
    </div>
    <div style="margin: 50px 100px">
      <el-steps :active="currentStep" finish-status="success" align-center  >
        <el-step v-for="(step, index) in steps" :key="index" :title="step.title" >
          <template slot="description">
            {{ index < currentStep ? completeTime : '暂无信息'  }}
          </template>
        </el-step>
      </el-steps>
    </div>
    <div class="ml-100">
      <el-row v-model="order">
        <el-col :span="12" align="left" style="font-weight: 200; font-size: 12px;" >
          <h3>订单信息</h3>
          <p>订单创建时间：{{ order.createTime }}</p>
          <p>收货地址：{{ order.shippingAddress }}</p>
          <p>订单编号：{{ order.orderNumber }}</p>

        </el-col>
        <el-col :span="12" align="left" style="font-weight: 200; font-size: 12px;">
          <h3>订单状态</h3>
          <p>订单状态：{{ order.status }}</p>
          <p>物流公司：{{ order.logisticsCompany }}</p>
          <p>运单号：{{ order.waybillNumber }}</p>
          <p>是否签收：{{ order.isDelivered ? '是' : '否' }}</p>
          <p>签收时间：{{ order.receiveTime }}</p>
        </el-col>
      </el-row>
    </div>
    <div class="ml-5">
      <div style="margin: 0 100px">
        <el-table :data="order.items" border>
          <el-table-column prop="image" label="商品图片" width="100px">
            <template slot-scope="scope">
              <img :src="globalVar.STATIC_NAME + scope.row.image" class="product-image" alt="商品图片" />
            </template>
          </el-table-column>
          <el-table-column prop="name" label="商品名称" width="100px" align="center"></el-table-column>
          <el-table-column prop="price" label="单价" align="center"></el-table-column>
          <el-table-column prop="quantity" label="数量" align="center"></el-table-column>
          <el-table-column prop="OneTotalPrice" label="总价" align="center"></el-table-column>
          <el-table-column prop="status" label="状态" align="center"></el-table-column>
        </el-table>

      </div>
      <div style="margin: 0 100px">
        <div class="order-summary">
          <div class="summary-item">
            <span>订单商品总价：</span>
            <span>{{ order.totalPrice }} 元</span>
          </div>
          <div class="summary-item">
            <span>运费：</span>
            <span>{{ order.shippingFee }} 元</span>
          </div>
          <div class="summary-item">
            <span>实付款：</span>
            <span>{{ order.actualPayment }} 元</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {globalVar} from "@/utils/globalVar";
import axios from "axios";

export default {
  data() {
    return {

      globalVar:globalVar,
      currentStep: 0,
      completeTime:'',
      order: {
        orderNumber: '',
        shippingAddress: '',

        status: '',
        logisticsCompany: '',
        waybillNumber: '',
        isDelivered: true,
        createTime: '',
        receiveTime: '',
        items: [],
        totalPrice: '',
        shippingFee: '0',
        actualPayment: ''
      },
      steps: [
        { title: '已下单' },
        { title: '待支付' },
        { title: '已付款' },
        { title: '出货中' },
        { title: '已发货' },
        { title: '运输中' },
        { title: '已签收' },
        { title: '交易成功' }
      ]
    };
  },
  mounted() {
    // 发送 HTTP 请求获取订单详情数据

    const param={
      order_id:"1"
    }
    this.request.get( globalVar.HOST_NAME + '/user_order/details',{
      params:param
    })  // 替换为后端 API 地址
        .then(response => {
          this.$message.success("获取成功");
          console.log(response.data);

          // 订单信息
          this.order.createTime=response.data.create_time;
          this.order.orderNumber=response.data.order_id;
          this.order.shippingAddress=response.data.address;
          //  订单状态
          this.order.status=response.data.latest_status.status_description;
          this.order.logisticsCompany=response.data.logistics_company;
          this.order.waybillNumber=response.data.waybill;
          // 遍历 order_status 数组并进行判断
          let isDelivered = false;
          for (const status of response.data.order_status) {
            if (status.status_id === 7) {
              isDelivered = true;
              break;
            }
          }
          // 根据判断结果赋值给 this.order.isDelivered
          this.order.isDelivered = isDelivered;
          // 初始化 receiveTime 为默认值 "未签收"
          this.order.receiveTime = "未签收";
        // 遍历 order_status 数组并进行判断
          for (const status of response.data.order_status) {
            if (status.status_id === 7) {
              this.order.receiveTime = status.create_time;
              break;
            }
          }
          //商品表格
          for (const item of response.data.commodity_list) {
            const newItem = {
              image: item.image,
              name: item.commodity_name,
              price: item.price,
              quantity: item.num,
              OneTotalPrice: item.price * item.num,
              status: response.data.latest_status.status_description
            };
            this.order.items.push(newItem);
          }
          //结尾
          this.order.totalPrice=response.data.total_price;
          this.order.actualPayment=response.data.total_price;
          this.currentStep=response.data.latest_status.status_id;

          this.completeTime=response.data.latest_status.create_time;
        })
        .catch(error => {
          console.error("测你吗");
        });
  }
};
</script>

<style>
.order-info-table td,
.order-status-table td {
  padding: 5px;
}

.product-image {
  width: 100px;
  height: 100px;
}

.order-summary {
  margin-top: 40px;
  margin-bottom: 40px;
}

.summary-item {
  text-align: right;
  margin-bottom: 10px;
}

.ml-5 {
  margin: 40px 50px;
}

.ml-100 {
  margin-right: 200px;
  margin-left: 200px;
}

.MainBack {
  background-color: rgba(241, 238, 238, 0.98);
  overflow: hidden;
  margin: 20px 100px ;





}
</style>
