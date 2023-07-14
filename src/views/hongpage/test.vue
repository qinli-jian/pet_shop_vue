<template>
  <div>
  <div class="carousel-container">
    <el-carousel
        :interval="3000"
        arrow="never"
        indicator-position="none"
        @change="handleCarouselChange"
    >
      <el-carousel-item v-for="(item, index) in images" :key="index">
        <el-image :src="item.url" fit="contain"></el-image>
      </el-carousel-item>
    </el-carousel>

    <div class="preview-container">
      <el-image
          v-for="(item, index) in images"
          :key="index"
          :src="item.url"
          :class="{ active: activeIndex === index }"
          fit="contain"
          @click="handlePreviewClick(index)"
      ></el-image>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: [
        // 添加更多图片对象
        {
          url:'aaaaa'
        }
      ],
      activeIndex: 0
    };
  },
  methods: {
    handleCarouselChange(index) {
      this.activeIndex = index;
    },
    handlePreviewClick(index) {
      this.activeIndex = index;
      // 可以在这里执行预览图片的逻辑，比如弹出大图预览等操作
    }
  }
};
</script>

<style>
.carousel-container {
  position: relative;
  height: 300px;
}

.preview-container {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.el-image {
  width: 60px;
  height: 40px;
  margin-right: 10px;
  cursor: pointer;
}

.el-image.active {
  border: 2px solid #1890ff;
}
</style>
