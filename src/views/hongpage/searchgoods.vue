<template>
<div style="margin-left: 200px;margin-right: 260px">
  <div>
    <div>
      <div style="padding:10px 0 ;margin-top:20px;margin-bottom: 20px; display: flex; justify-content: center; align-items: center;">
        <el-input v-model="searchTerm" placeholder="搜索你想要的商品" @keyup.enter.native="performSearch1"
                  clearable size="large" style="width: 400px;"></el-input>
        <el-button type="primary" icon="el-icon-search" size="large" @click="performSearch">搜索</el-button>


      </div>
    </div>
    <div>
      <div class="infinite-list-wrapper" style="overflow:auto">
        <el-card
            class="list"
            v-infinite-scroll="load"
            infinite-scroll-disabled="disabled"
            style="margin-bottom: 20px;">
          <p v-for="i in pagesize" class="list-item" style="width: 1000px;height: 100px;background-color: darkseagreen;margin: 20px">{{ i }}</p>
        </el-card>
        <p v-if="loading">加载中...</p>
        <p v-if="noMore">没有更多了</p>
      </div>
    </div>

  </div>
</div>
</template>

<script>
export default {
  name: "searchgoods",
  data(){
    return{
      pagesize: 10,
      loading: false,
      searchTerm: ''
    }
  },
  computed: {
    noMore () {
      return this.pagesize >= 20
    },
    disabled () {
      return this.loading || this.noMore
    }
  },
  methods:{
    load () {
      this.loading = true
      setTimeout(() => {
        this.pagesize += 2
        this.loading = false
      }, 2000)
    },
    performSearch() {
      // 执行搜索逻辑，例如发送搜索请求或进行搜索结果展示等
      console.log('搜索：', this.searchTerm);
    },
    performSearch1(evt){
      console.log(evt.target.value)
    }
  }
}
</script>

<style scoped>

</style>