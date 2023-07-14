<template>
  <div class="MainBack">
    <div class="ml-5">
      <h1>订单详情</h1>
    </div>
    <div style="margin: 50px 100px">
      <el-steps :active="currentStep" finish-status="success" align-center>
        <el-step v-for="(step, index) in steps" :key="index" :title="step.title"></el-step>
      </el-steps>
    </div>
    <div class="ml-100">
      <el-row>
        <el-col :span="12" align="left" style="font-weight: 200; font-size: 12px;">
          <h3>订单信息</h3>
          <p>订单创建时间：{{ order.createTime }}</p>
          <p>收货地址：{{ order.shippingAddress }}</p>
          <p>订单编号：{{ order.orderNumber }}</p>
          <p>商家名称：{{ order.merchantName }}</p>
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
      <div class="ml-5">
        <el-table :data="order.items" border>
          <el-table-column prop="image" label="商品图片">
            <template slot-scope="scope">
              <img :src="scope.row.image" class="product-image" alt="商品图片" style="width: 98px; height: 98px;"/>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="商品名称" width="100px"></el-table-column>
          <el-table-column prop="price" label="单价"></el-table-column>
          <el-table-column prop="quantity" label="数量"></el-table-column>
          <el-table-column prop="totalPrice" label="总价"></el-table-column>
          <el-table-column prop="status" label="状态"></el-table-column>
        </el-table>
      </div>
      <div class="ml-5">
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
import axios from 'axios';

export default {
  data() {
    return {
      currentStep: 0,
      order: {
        orderNumber: '',
        shippingAddress: '',
        merchantName: '',
        status: '',
        logisticsCompany: '',
        waybillNumber: '',
        isDelivered: false,
        createTime: '',
        receiveTime: '',
        items: [],
        totalPrice: '',
        shippingFee: '',
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
    this.request.get('/api/order/detail')  // 替换为你的后端 API 地址
        .then(response => {
          this.order = response.data;
        })
        .catch(error => {
          console.error(error);
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
  width: 50px;
  height: 50px;
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
  margin: 0px 200px;
}
</style>
