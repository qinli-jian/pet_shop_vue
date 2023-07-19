<template>
  <div class="refund-form">
    <h2 class="form-title">退货申请</h2>
    <el-form ref="form" :model="form" class="form-container" label-width="100px" size="small">
      <div class="product-info">
        <img :src="globalVar.STATIC_NAME + commodity.image" alt="商品图片" class="product-image" />
        <div class="commodity-content">
          <span class="product-name">{{ commodity.commodity_name }}</span>
          <div class="spec-content">
            {{ commodity.specifications }}
          </div>
        </div>
        <div class="amount">
          数量：{{ commodity.num }}
        </div>
        <div class="amount">
          总金额：{{ commodity.price * commodity.num }}
        </div>
      </div>
      <el-form-item label="服务类型" prop="service_type_id" required>
        <el-radio-group v-model="form.service_type_id">
          <el-radio label="1">仅退款</el-radio>
          <el-radio label="2">退货退款</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="退款原因" prop="refund_reason" required>
        <el-select v-model="form.refund_reason" placeholder="请选择退款原因">
          <el-option label="质量问题" value="质量问题"></el-option>
          <el-option label="收到商品与描述不符" value="收到商品与描述不符"></el-option>
          <el-option label="其他原因" value="其他原因"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="退款金额" prop="refund_price" required>
        <el-input v-model="form.refund_price" placeholder="请输入退款金额" type="text" :max="commodity.price"
          @input="validateInput" />
      </el-form-item>
      <el-form-item label="退款说明" prop="after_sale_content">
        <el-input v-model="form.after_sale_content" type="textarea" :rows="3" placeholder="请输入退款说明"></el-input>
      </el-form-item>
      <el-form-item label="上传凭证图片" prop="imgList">
        <el-upload class="upload-container" name="image" :action="globalVar.HOST_NAME + '/file/upload'"
          :on-success="handleUploadSuccess" :on-error="handleUploadError" :limit="3" list-type="picture-card"
          :auto-upload="true" :before-upload="beforeUpload">
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">提交申请</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { globalVar } from '@/utils/globalVar';
import axios from "axios";

export default {
  data() {
    return {
      globalVar: globalVar,
      commodity: {},
      form: {
        service_type_id: '2',
        after_sale_content: '',
        refund_price: 0,
        refund_reason: '',
        imgs: [],
        user_id: "",
        order_id: "",
      },
      product: {
        image: require("@/assets/logo.png"), // 商品图片地址
        name: '纯纯雪豹口粮',
        price: 100.00 // 商品价格
      }
    };
  },
  mounted() {
    const user_id = localStorage.getItem("id")
    const order_id = this.$route.query.orderId;
    const order_obj = this.$route.query.order_obj;
    const commodity_id = this.$route.query.commodity_id;
    // 在控制台打印参数
    console.log("售后接收参数")
    console.log(user_id);
    console.log(order_id);
    console.log(commodity_id);
    console.log("订单对象")
    console.log(order_obj);
    this.user_id = user_id;
    this.order_id = order_id;

    for (var i = 0; i < order_obj.commodity_list.length; i++) {
      var item = order_obj.commodity_list[i];
      if (item.commodity_id === commodity_id) {
        this.commodity = item;
        this.form.refund_price = this.commodity.price * this.commodity.num;
        break;
      }
    }


  },
  methods: {
    validateInput() {
      const inputValue = this.form.refund_price;
      // 通过正则表达式验证输入是否为整数或小数
      const regExp = /^[0-9]+(\.[0-9]*)?$/;
      if (!regExp.test(inputValue)) {
        // 非法输入，清除输入内容中的非数字字符
        this.form.refund_price = inputValue.replace(/[^\d.]/g, '');
      }
    },
    handleUploadSuccess(response, file, fileList) {
      // 上传成功回调
      // this.form.proofImages = fileList;
      console.log("上传成功")
      this.form.proofImages
      console.log(response)
      this.form.imgs.push(response.data.filename)
    },
    handleUploadError(error, file, fileList) {
      // 上传失败回调
      this.$message.error('上传失败');
    },
    beforeUpload(file) {
      // 文件上传前的验证
      const isImage = file.type.startsWith('image/');
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isImage) {
        this.$message.error('只支持上传图片格式的文件');
        return false;
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB');
        return false;
      }
      return true;
    },
    submitForm() {
      this.form.order_id = this.order_id;
      this.form.user_id = this.user_id;
      console.log(this.form)
      // 提交表单逻辑
      this.$refs.form.validate(valid => {
        console.log("判断验证")
        console.log(valid)
        
        // return;
        if (valid) {
          // 表单验证通过，执行提交逻辑
          this.$message.success('提交成功');
          // TODO: 处理表单数据的提交逻辑
          // 发送请求
          axios({url: globalVar.HOST_NAME + "/user_order/after_sale",method:"POST", data:this.form}).then((res) => {
              console.log(res)
              if (res.data.code === "200") {
                this.$router.push({
                  path: "/order",
                });
              }
            }).catch(res => {
              console.log(res);
            })

        } else {
          this.$message.error('表单验证失败');
          return false;
        }
      });
    },
    resetForm() {
      // 重置表单
      this.$refs.form.resetFields();
      this.form.proofImages = [];
    }
  }
};
</script>

<style scoped>
.amount {
  margin-left: 50px;
}

.commodity-content {
  display: flex;
  flex-direction: column;

}

.refund-form {

  background-color: #cccccc;
  display: flex;
  flex-direction: column;
  align-items: center;

}

.form-title {
  margin: 50px 0;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
}

.form-container {
  width: 600px;
}

.product-info {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.product-image {
  width: 80px;
  height: 80px;
  margin-right: 10px;
}

.product-name {
  font-weight: bold;
}

.upload-container .el-upload-list {
  display: flex;
}

.upload-container .el-upload-list .el-upload-list__item {
  flex: 1;
  margin-right: 10px;
}
</style>
