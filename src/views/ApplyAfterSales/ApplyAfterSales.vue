<template>
  <div >
    <div class="ml-5">
      <h1>售后申请</h1>
    </div>
    <div class="ml-100">
      <el-row>
        <el-col :span="12" align="left" style="font-weight: 200; font-size: 12px;">
          <h3>订单信息</h3>
          <p>订单编号：{{ order.orderNumber }}</p>
          <p>商品名称：{{ order.items[0].name }}</p>
          <p>商品价格：{{ order.items[0].price }} 元</p>
        </el-col>
        <el-col :span="12" align="left" style="font-weight: 200; font-size: 12px;">
          <h3>售后信息</h3>
          <el-form ref="refundForm" :model="refund" label-width="80px">
            <el-form-item label="退款金额">
              <el-input v-model="refund.amount" placeholder="请输入退款金额"></el-input>
            </el-form-item>
            <el-form-item label="退款原因">
              <el-input v-model="refund.reason" type="textarea" placeholder="请输入退款原因"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitRefund">提交申请</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      order: {
        orderNumber: '123456789',
        items: [
          { name: '宠物粮食 A', price: 20 }
        ]
      },
      refund: {
        amount: '',
        reason: ''
      }
    };
  },
  methods: {
    submitRefund() {
      axios.post('/api/refund', this.refund)  // 替换为你的后端 API 地址
          .then(response => {
            // 处理申请成功的逻辑
          })
          .catch(error => {
            // 处理申请失败的逻辑
          });
    }
  }
};
</script>

<style>
.order-info-table td,
.order-status-table td {
  padding: 5px;
}

.ml-5 {
  margin: 40px 50px;
}

.ml-100 {
  margin-right: 200px;
  margin-left: 200px;
}

.MainBack {
  /*background-color: rgba(241, 238, 238, 0.98);*/
  overflow: hidden;
  margin: 0 200px;
}
</style>
