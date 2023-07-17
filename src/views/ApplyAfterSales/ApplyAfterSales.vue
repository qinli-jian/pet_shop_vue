<template>
  <div class="refund-form">
    <h2 class="form-title">退货申请</h2>
    <el-form ref="form" :model="form" class="form-container" label-width="100px" size="small">
      <div class="product-info">
        <img :src="product.image" alt="商品图片" class="product-image" />
        <span class="product-name">{{ product.name }}</span>
      </div>
      <el-form-item label="服务类型" prop="serviceType" required>
        <el-radio-group v-model="form.serviceType">
          <el-radio label="仅退款">仅退款</el-radio>
          <el-radio label="退货退款">退货退款</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="退款原因" prop="refundReason" required>
        <el-select v-model="form.refundReason" placeholder="请选择退款原因">
          <el-option label="质量问题" value="质量问题"></el-option>
          <el-option label="收到商品与描述不符" value="收到商品与描述不符"></el-option>
          <el-option label="其他原因" value="其他原因"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="退款金额" prop="refundAmount" required>
        <el-input v-model.number="form.refundAmount" placeholder="请输入退款金额" :max="product.price" />
      </el-form-item>
      <el-form-item label="退款说明" prop="refundNote">
        <el-input v-model="form.refundNote" type="textarea" :rows="3" placeholder="请输入退款说明"></el-input>
      </el-form-item>
      <el-form-item label="上传凭证图片" prop="proofImages">
        <el-upload
            class="upload-container"
            action="/api/upload"
        :on-success="handleUploadSuccess"
        :on-error="handleUploadError"
        :limit="3"
        :file-list="form.proofImages"
        list-type="picture-card"
        :auto-upload="false"
        :before-upload="beforeUpload"
        >
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
export default {
  data() {
    return {
      form: {
        serviceType: '仅退款',
        refundReason: '',
        refundAmount: 200 ,
        refundNote: '',
        proofImages: []
      },
      product: {
        image:require("@/assets/logo.png"), // 商品图片地址
        name: '纯纯雪豹口粮',
        price: 100.00 // 商品价格
      }
    };
  },
  methods: {
    handleUploadSuccess(response, file, fileList) {
      // 上传成功回调
      this.form.proofImages = fileList;
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
      // 提交表单逻辑
      this.$refs.form.validate(valid => {
        if (valid) {
          // 表单验证通过，执行提交逻辑
          this.$message.success('提交成功');
          // TODO: 处理表单数据的提交逻辑
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
