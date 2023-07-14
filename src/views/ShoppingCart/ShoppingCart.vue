<template>
  <div class="hello">
    <div class="page-shopping-cart">
      <h4 class="cart-title">你亲爱的垃圾车</h4>

      <!--    <div class="cart-product-title clearfix">-->
      <!--      <div class="td-check fl">-->
      <!--        <el-checkbox v-model="isSelectAll" @change="selectAllProducts">{{ isSelectAll ? '取消全选' : '全选' }}</el-checkbox>-->
      <!--      </div>-->
      <!--    </div>-->
      <div class="cart-product clearfix">
        <el-table :data="productList">
          <el-table-column prop="select" width="70">
            <template slot-scope="scope">
              <el-checkbox v-model="scope.row.select"></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column width="90" align="center">
            <template slot="header">商品图片</template>
            <template slot-scope="scope">
              <img :src="scope.row.pro_image" alt="商品图片" class="product-image" style="width: 98px; height: 98px;"  />
            </template>
          </el-table-column>
          <el-table-column label="商品" prop="pro_name">
            <template slot-scope="scope">
              <div class="product-info">
                <h6>{{ scope.row.pro_name }}</h6>
                <p>品牌：{{ scope.row.pro_brand }}&nbsp;&nbsp;产地：{{ scope.row.pro_place }}</p>
<!--                <p>规格: {{ scope.row.pro_purity }}&nbsp;&nbsp;</p>-->
                <p>规格:
                  <el-select v-model="scope.row.selectedSpec" placeholder="选择规格" size="mini" @change="updatePrice(scope.row)">
                    <el-option
                        v-for="option in specOptions"
                        :key="option"
                        :label="option"
                        :value="option"
                    ></el-option>
                  </el-select>
                </p>
                <p>配送仓储：{{ scope.row.pro_depot }}</p>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="数量" prop="pro_num">
            <template slot-scope="scope">

              <a href="javascript:;" class="num-reduce num-do fl" @click="scope.row.pro_num > 0 ? scope.row.pro_num-- : ''">
                <span></span>
              </a>
              <el-input-number v-model="scope.row.pro_num" :min="0" controls-position="right" size="small"></el-input-number>
              <a href="javascript:;" class="num-add num-do fr" @click="scope.row.pro_num++">
                <span></span>
              </a>

            </template>
          </el-table-column>
          <el-table-column label="单价(元)" prop="pro_price">
            <template slot-scope="scope">
              <p class="red-text">￥{{ scope.row.pro_price }}</p>
            </template>
          </el-table-column>
          <el-table-column label="金额(元)" prop="totalPrice">
            <template slot-scope="scope">
              <p class="red-text">￥{{ scope.row.pro_price * scope.row.pro_num }}</p>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <a href="javascript:;" class="product-delete" @click="deleteProduct(scope.$index)">删除</a>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="cart-product-info">
        <!--      <el-checkbox v-model="isSelectAll" @change="selectAllProducts">{{ isSelectAll ? '取消全选' : '全选' }}</el-checkbox>-->
        <div class="td-check fl">
          <el-checkbox v-model="isSelectAll" @change="selectAllProducts">{{ isSelectAll ? '取消全选' : '全选' }}</el-checkbox>
        </div>
        <a class="delete-product" href="javascript:;" @click="deleteSelectedProducts"><span></span>删除所选商品</a>
        <a class="keep-shopping" href="#" @click="back"><span></span>继续购物</a>
        <a class="btn-buy fr" href="javascript:;">去结算</a>
        <p class="fr product-total">￥{{ getTotalAmount() }}</p>
        <p class="fr check-num"><span>{{ getSelectedCount() }}</span>件商品总计（不含运费）：</p>
      </div>

    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      productList: [
        {
          pro_image:require("@/assets/pic/2.jpg"),
          pro_name: '瑞克',
          pro_brand: '雪豹',
          pro_place: '山里',
          selectedSpec: '',

          pro_depot: '上海仓海仓储',
          pro_num: 1,
          pro_price: 800,
          select: false
        },
        {
          pro_image:require("@/assets/pic/2.jpg"),
          pro_name: '瑞克',
          pro_brand: '雪豹',
          pro_place: '山里',
          pro_depot: '上海仓海仓储',
          pro_num: 1,
          pro_price: 800,
          select: false
        },
        {
          pro_image:require("@/assets/logo.png"),
          pro_name: '瑞克',
          pro_brand: '雪豹',
          pro_place: '山里',

          pro_depot: '上海仓海仓储',
          pro_num: 1,
          pro_price: 800,
          select: false
        },
        {
          'pro_image':require("@/assets/pic/2.jpg"),
          'pro_name': '顶针',
          'pro_brand': '雪豹',
          'pro_place': '山里',
          'pro_purity': '200g',

          'pro_depot': '上海仓海仓储',
          'pro_num': 1,
          'pro_price': 800,
          'select': false
        },
        {
          'pro_image':require("@/assets/pic/2.jpg"),
          'pro_name': '顶针',
          'pro_brand': '雪豹',
          'pro_place': '山里',
          'pro_purity': '200g',

          'pro_depot': '上海仓海仓储',
          'pro_num': 1,
          'pro_price': 800,
          'select': false
        }
      ],
      specOptions: [], // 存储规格选项的数组
    };
  },
  created() {
    // 从后端获取规格选项数据，并将其赋值给 specOptions 变量
    // 例如，使用异步请求或其他方式获取数据
    // 将数据赋值给 this.specOptions
  },
  methods: {
    updatePrice(product) {
      // 根据选择的规格更新商品的价格
      const selectedSpec = product.selectedSpec;
      // 根据选定的规格从后端或其他数据源获取对应的价格
      // const price = /* 从后端或其他数据源获取价格 */;

      // 更新商品的价格
      product.pro_price = price;

      // 更新商品的总价金额
      product.totalPrice = price * product.pro_num;
    },
    back(){
      this.$router.push('/home')
    },
    deleteProduct(index) {
      this.productList.splice(index, 1);
    },
    deleteSelectedProducts() {
      this.productList = this.productList.filter((product) => !product.select);
    },
    selectAllProducts(value) {
      for (let i = 0; i < this.productList.length; i++) {
        this.productList[i].select = value;
      }
    },
    getTotalAmount() {
      let total = 0;
      for (let i = 0; i < this.productList.length; i++) {
        const product = this.productList[i];
        if (product.select) {
          total += product.pro_price * product.pro_num;
        }
      }
      return total.toFixed(2);
    },
    getSelectedCount() {
      let count = 0;
      for (let i = 0; i < this.productList.length; i++) {
        if (this.productList[i].select) {
          count++;
        }
      }
      return count;
    }
  },
  computed: {
    isSelectAll: {
      get() {
        return this.productList.length > 0 && this.productList.every((product) => product.select);
      },
      set(value) {
        this.selectAllProducts(value);
      }
    }
  }
};
</script>

<style>
.fl{
  float: left;
}
.fr{
  float: right;
}
blockquote, body, dd, div, dl, dt, fieldset, form, h1, h2, h3, h4, h5, h6, img, input, li, ol, p, table, td, textarea, th, ul {
  margin: 0;
  padding: 0;
}
.clearfix{
  zoom: 1;
}
.clearfix:after {
  clear: both;
}
.clearfix:after {
  content: '.';
  display: block;
  overflow: hidden;
  visibility: hidden;
  font-size: 0;
  line-height: 0;
  width: 0;
  height: 0;
}
a{
  text-decoration: none;
  color: #333;
}
img{vertical-align: middle;}
.page-shopping-cart {
  width: 1200px;
  margin: 50px auto;

  /*background-image: url("src/assets/pic/2.jpg");*/
  background-color: #cccccc;
  font-size: 14px;
  border: 1px solid #e3e3e3;
  border-top: 2px solid #317ee7; }
.page-shopping-cart .cart-title {
  color: #317ee7;
  font-size: 16px;
  text-align: left;
  padding-left: 20px;
  line-height: 68px; }
.page-shopping-cart .red-text {
  color: #e94826; }
.page-shopping-cart .check-span {
  display: block;
  width: 24px;
  height: 20px;
  /*background: url("shopping_cart.png") no-repeat 0 0;*/
}
.page-shopping-cart .check-span.check-true {
  /*background: url("shopping_cart.png") no-repeat 0 -22px; */
}
.page-shopping-cart .td-check {
  width: 70px; }
.page-shopping-cart .td-product {
  width: 460px; }
.page-shopping-cart .td-num, .page-shopping-cart .td-price, .page-shopping-cart .td-total {
  width: 160px; }
.page-shopping-cart .td-do {
  width: 150px; }
.page-shopping-cart .cart-product-title {
  text-align: center;
  height: 38px;
  line-height: 38px;
  padding: 0 20px;
  background: #f7f7f7;
  border-top: 1px solid #e3e3e3;
  border-bottom: 1px solid #e3e3e3; }
.page-shopping-cart .cart-product-title .td-product {
  text-align: center;
  font-size: 14px; }
.page-shopping-cart .cart-product-title .td-check {
  text-align: left; }
.page-shopping-cart .cart-product-title .td-check .check-span {
  margin: 9px 6px 0 0; }
.page-shopping-cart .cart-product {
  padding: 0 20px;
  text-align: center; }
.page-shopping-cart .cart-product table {
  width: 100%;
  text-align: center;
  font-size: 14px; }
.page-shopping-cart .cart-product table td {
  padding: 20px 0; }
.page-shopping-cart .cart-product table tr {
  border-bottom: 1px dashed #e3e3e3; }
.page-shopping-cart .cart-product table tr:last-child {
  border-bottom: none; }
.page-shopping-cart .cart-product table .product-num {
  border: 1px solid #e3e3e3;
  display: inline-block;
  text-align: center; }
.page-shopping-cart .cart-product table .product-num .num-do {
  width: 24px;
  height: 28px;
  display: block;
  background: #f7f7f7; }
.page-shopping-cart .cart-product table .product-num .num-reduce span {
  /*background: url("shopping_cart.png") no-repeat -40px -22px;*/
  display: block;
  width: 6px;
  height: 2px;
  margin: 13px auto 0 auto; }
.page-shopping-cart .cart-product table .product-num .num-add span {
  /*background: url("shopping_cart.png") no-repeat -60px -22px;*/
  display: block;
  width: 8px;
  height: 8px;
  margin: 10px auto 0 auto; }
.page-shopping-cart .cart-product table .product-num .num-input {
  width: 42px;
  height: 28px;
  line-height: 28px;
  border: none;
  text-align: center; }
.page-shopping-cart .cart-product table .td-product {
  text-align: left;
  font-size: 12px;
  line-height: 20px; }
.page-shopping-cart .cart-product table .td-product img {
  border: 1px solid #e3e3e3;
  margin-right: 10px; }
.page-shopping-cart .cart-product table .td-product .product-info {
  display: inline-block;
  vertical-align: middle; }
.page-shopping-cart .cart-product table .td-do {
  font-size: 12px; }
.page-shopping-cart .cart-product-info {
  height: 50px;
  line-height: 50px;
  background: #f7f7f7;
  padding-left: 20px; }
.page-shopping-cart .cart-product-info .delete-product {

  color: #666; }
.page-shopping-cart .cart-product-info .delete-product span {
  display: inline-block;
  vertical-align: top;
  margin: 18px 8px 0 0;
  width: 13px;
  height: 15px;
  /*background: url("shopping_cart.png") no-repeat -60px 0;*/
}
.page-shopping-cart .cart-product-info .product-total {
  font-size: 14px;
  color: #e94826; }
.page-shopping-cart .cart-product-info .product-total span {
  font-size: 20px; }
.page-shopping-cart .cart-product-info .check-num {
  color: #333; }
.page-shopping-cart .cart-product-info .check-num span {
  color: #e94826; }
.page-shopping-cart .cart-product-info .keep-shopping {
  color: #666;
  margin-left: 40px; }
.page-shopping-cart .cart-product-info .keep-shopping span {
  display: inline-block;
  vertical-align: top;
  margin: 18px 8px 0 0;
  width: 15px;
  height: 15px;
  /*background: url("shopping_cart.png") no-repeat -40px 0;*/
}
.page-shopping-cart .cart-product-info .btn-buy {
  height: 50px;
  color: #fff;
  font-size: 20px;
  display: block;
  width: 110px;
  background: #ff7700;
  text-align: center;
  margin-left: 30px; }
.page-shopping-cart .cart-worder {
  padding: 20px; }
.page-shopping-cart .cart-worder .choose-worder {
  color: #fff;
  display: block;
  background: #39e;
  width: 140px;
  height: 40px;
  line-height: 40px;
  border-radius: 4px;
  text-align: center;
  margin-right: 20px; }
.page-shopping-cart .cart-worder .choose-worder span {
  display: inline-block;
  vertical-align: top;
  margin: 9px 10px 0 0;
  width: 22px;
  height: 22px;
  /*background: url("shopping_cart.png") no-repeat -92px 0; */
}
.page-shopping-cart .cart-worder .worker-info {
  color: #666; }
.page-shopping-cart .cart-worder .worker-info img {
  border-radius: 100%;
  margin-right: 10px; }
.page-shopping-cart .cart-worder .worker-info span {
  color: #000; }

.choose-worker-box {
  width: 620px;
  background: #fff; }
.choose-worker-box .box-title {
  height: 40px;
  line-height: 40px;
  background: #F7F7F7;
  text-align: center;
  position: relative;
  font-size: 14px; }
.choose-worker-box .box-title a {
  display: block;
  position: absolute;
  top: 15px;
  right: 16px;
  width: 10px;
  height: 10px;
  /*background: url("shopping_cart.png") no-repeat -80px 0;*/
}
.choose-worker-box .box-title a:hover {
  /*background: url("shopping_cart.png") no-repeat -80px -22px;*/
}
.choose-worker-box .worker-list {
  padding-top: 30px;
  height: 134px;
  overflow-y: auto; }
.choose-worker-box .worker-list li {
  float: left;
  width: 25%;
  text-align: center;
  margin-bottom: 30px; }
.choose-worker-box .worker-list li p {
  margin-top: 8px; }
.choose-worker-box .worker-list li.cur a {
  color: #f70; }
.choose-worker-box .worker-list li.cur a img {
  border: 1px solid #f70; }
.choose-worker-box .worker-list li a:hover {
  color: #f70; }
.choose-worker-box .worker-list li a:hover img {
  border: 1px solid #f70; }
.choose-worker-box .worker-list li img {
  border: 1px solid #fff;
  border-radius: 100%; }
.hello{
  /*height: 100vh;*/
  /*background-image: linear-gradient(to bottom right, #42b983, #3F5EFB);*/
  /*background-image: url('src/static/pic/2.jpg');*/
  background-size: cover;

  overflow: hidden;
}
</style>
