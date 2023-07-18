<template>
  <div class="hello">

    <div class="page-shopping-cart">
      <h4 class="cart-title">购物车</h4>

      <div class="cart-product" >
        <el-table :data="productList">
          <el-table-column prop="select" width="70">
            <template slot-scope="scope">
              <el-checkbox v-model="scope.row.select"></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column width="90" align="center">
            <template slot="header">商品图片</template>
            <template slot-scope="scope" v-if="!(scope.row.specification_price===undefined)" >
              <img :src="globalVar.STATIC_NAME+scope.row.specification_price.image" alt="商品图片" class="product-image" style="width: 98px; height: 98px;"  />
            </template>
          </el-table-column>
          <el-table-column width="250" label="商品" prop="pro_name">
            <template slot-scope="scope">
              <div class="product-info" v-if="!(scope.row.commodityInfo===undefined)" >
                <h6>{{ scope.row.commodityInfo.name }}</h6>
                <div style="display: flex;flex-direction: row;align-items: center;flex-wrap: nowrap">规格:
                  <el-select v-model="scope.row.specification_price.id" placeholder="选择规格" size="mini" @change="updatePrice(scope.row)">
                    <el-option
                        v-for="option in scope.row.all_specification_price"
                        :key="option.id"
                        :label="option.label"
                        :value="option.id"
                    ></el-option>
                  </el-select>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="数量" prop="pro_num">
            <template slot-scope="scope">
<!--              <a href="javascript:;" class="num-reduce num-do fl" @click="scope.row.pro_num > 1 ? scope.row.pro_num&#45;&#45; : ''">-->
<!--                <span></span>-->
<!--              </a>-->
              <el-input-number @change="changeInfo(scope.row.id)" style="width: 80px" v-model="scope.row.amount" :min="1" controls-position="right" size="small"></el-input-number>
<!--              <a href="javascript:;" class="num-add num-do fr" @click="scope.row.pro_num++">-->
<!--                <span></span>-->
<!--              </a>-->
            </template>
          </el-table-column>
          <el-table-column label="单价(元)" prop="pro_price">
            <template slot-scope="scope" v-if="scope.row.specification_price!==undefined">
              <p class="red-text">￥{{ scope.row.specification_price.price}}</p>
            </template>
          </el-table-column>
          <el-table-column label="金额(元)" prop="totalPrice">
            <template slot-scope="scope" v-if="scope.row.specification_price!==undefined">
              <p class="red-text">￥{{ scope.row.specification_price.price* scope.row.amount }}</p>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="warning" @click="deleteProduct(scope.row)">删除</el-button>
              <el-button v-show="currentShopCart===scope.row.id" type="primary" @click="commitChange(scope.row)">提交修改</el-button>
            </template>
          </el-table-column>

        </el-table>
      </div>
      <div class="cart-product-info">
        <div class="td-check fl">
          <el-checkbox v-model="isSelectAll" @change="selectAllProducts">{{ isSelectAll ? '取消全选' : '全选' }}</el-checkbox>
        </div>
        <a class="delete-product" href="javascript:;" @click="deleteSelectedProducts"><span></span>删除所选商品</a>
        <a class="keep-shopping" href="#" @click="back"><span></span>继续购物</a>
        <a class="btn-buy fr" href="javascript:;"   type="text" @click="showCheckoutModal">去结算</a>
        <div >

<!--          弹出框-->

          <el-dialog title="收货地址" :visible.sync="dialogTableVisible" width="800px">
            <el-table
                :data="tableData"
                style="width: 100%">
              <el-table-column
                  label="姓名"
                  prop="addressee"
                 >
              </el-table-column>
              <el-table-column
                  label="电话"
                  prop="phone"
                 >
              </el-table-column>
              <el-table-column
                  label="住址"
                  prop="detailed_address"
                  >

              </el-table-column>


              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button
                      v-if="selectedRowIndex !== scope.$index"
                      size="mini"
                      type="primary"
                      @click="chooseAddress(scope.$index, scope.row)">选择</el-button>
                  <el-button
                      v-else
                      size="mini"
                      type="danger"
                      @click="chooseAddress(-1, null)"
                  >
                    取消选中
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-button type="primary" class="fr" @click="submitOrder" round   >
              提交订单
            </el-button>
          </el-dialog>

        </div>

        <p class="fr product-total">￥{{ totalPrice }}</p>
        <p class="fr check-num"><span>{{ getSelectedCount() }}</span>件商品总计（不含运费）：</p>
      </div>
    </div>
  </div>
</template>

<script>
import {globalVar} from "@/utils/globalVar";

export default {
  data() {
    return {
      selectedRowIndex: -1,

     tableData: [],
      dialogTableVisible : false,

      totalPrice:0,
      currentShopCart:-1,
      globalVar:globalVar,
      productList: [],
      specOptions: [], // 存储规格选项的数组
      fixedSepcOptions:[],
      currentAdressId:'',
    };
  },
  created() {
    // 初始化购物车数据，例如从后端获取购物车商品列表数据
    this.fetchProductList();
  },
  methods: {
    showCheckoutModal() {
      if(this.getSelectShopCartId().length===0){
        this.$message.warning("没有选择商品")
        return;
      }
      const param={
        user_id:"34"
      }
      let _this = this;
      this.request.get(globalVar.HOST_NAME+'/user/addresslist',{params:param}).then(response => {
       this.$message.success("打开地址目录")
        console.log(response.data)
        _this.tableData=response.data;
        _this.dialogTableVisible = true;
        // _this.$forceUpdate();
       // 显示弹框
      }).catch(error => {
        console.error("打开地址目录失败");
      });
    },
    chooseAddress(index, row) {
      this.selectedRowIndex = index;
      console.log(row);
      if(row!==null){
        this.currentAdressId=row.id;
      }else{
        this.currentAdressId=""
      }

    },
    getSelectShopCartId(){
      var selectShopCartId=[]
      for(var i = 0;i<this.productList.length;i++){
        var item = this.productList[i];
        if(item.select){
          selectShopCartId.push(item.id)
        }
      }
      return selectShopCartId;
    },
    submitOrder() {
      console.log(this.currentAdressId)
      // 购物车ID，用户ID
      const selectShopCartId = this.getSelectShopCartId();
      console.log("购物车ID列表")
      console.log(selectShopCartId)

      if (this.currentAdressId!=='') {
        // 提交订单逻辑
        console.log('选择的地址:', this.currentAdressId);
        // 向后端发送提交订单请求
        // this.request.post('/api/submitOrder', { address: this.currentAdressId }).then(response => {
        //   console.log('订单提交成功');
        // }).catch(error => {
        //   console.error('订单提交失败', error);
        // });
      } else {
        this.$message.warning('请选择收货地址');
      }
    },

    commitChange(product){
      console.log("确认提交");
      console.log(product);
      const param={
        shop_cart_id:product.id,
        user_id:product.user_id,
        commodity_id:product.commodity_id,
        specification_price_id:product.specification_price.id,
        amount:product.amount
      }

      this.request.post(globalVar.HOST_NAME+'/shopcart/changeShopCart',param)
          .then(response=>{
        this.$message.success("提交修改成功");
            this.fetchProductList();

      }).catch(error=>{
        this.$message.error("提交修改失败")
      })
    },
    changeInfo(shopCartId){
      console.log("shopCartId")
      console.log(shopCartId)
      this.currentShopCart=shopCartId;
    },
    fetchProductList() {
      let _this = this;
      const param={
        user_id:"1"
      }
      this.request.get(globalVar.HOST_NAME + '/shopcart/list',{
        params:param
      }).then(response=>{
        this.$message.success("连接成功");
        console.log("未修改")
        console.log(response.data)
        // _this.productList = response.data;
        _this.productList = _this.setSpecStrName(response.data);
        for(var i = 0;i<_this.productList.length;i++){
          _this.productList["select"]=false;
        }
        console.log("修改后")
        console.log(_this.productList)

      }).catch(error=>{
        console.log("修改错误")
        this.$message("错误")
      })
    },
    setSpecStrName(productList){
      console.log("进入修改")
      console.log(productList)
      for(var i = 0;i<productList.length;i++){
        productList[i]["select"]=false;
        var item = productList[i].all_specification_price;
        console.log(item)
        for(var j = 0;j<item.length;j++){// 循环所有的组合
          var jitem = item[j].specifications;
          console.log(jitem)
          var str_name = ""
          for(var k = 0;k<jitem.length;k++){
            var kitem = jitem[k];
            str_name+=kitem.specification_name;
            if(k!==jitem.length-1){
              str_name+='/'
            }
          }
          productList[i].all_specification_price[j]["label"]=str_name
        }
      }
      return productList;
    },
    fixSpec(specs){
      var new_specs = []
      for(var i = 0;i<specs.length;i++){
        var item = specs[i];
        var spec_str = "";
        for(var j =0 ;j<item.specifications.length;j++){
          var jitem = item.specifications[j];
          spec_str+=jitem.specification_name
          if(j!==item.specifications.length-1){
            spec_str+="/"
          }
        }
        new_specs.push({
          value:item.id,
          label:spec_str
        })
      }
      console.log(new_specs)
      return new_specs;
    },
    updatePrice(product) {
      console.log("商品列表")
      console.log(this.productList)
      console.log(product.specification_price.id)
      var spec_id = product.specification_price.id;// 选择之后的组合id
      var shopCartId = product.id;
      for(var i = 0;i<this.productList.length;i++){
        if(this.productList[i].id===shopCartId){
          // this.productList[i].specification_price=""// 需要修改的
          for(var j = 0;j<product.all_specification_price.length;j++){
              var jitem = product.all_specification_price[j];
              if(jitem.id === spec_id){
                this.productList[i].specification_price=JSON.parse(JSON.stringify(jitem));
                break;
              }
          }
          break;
        }
        console.log("选择之后")
        console.log(product.all_specification_price)
      }
      this.changeInfo(shopCartId);
      // this.changeInfo(product.id)
      // 根据选择的规格更新商品的价格
      const selectedSpec = product.selectedSpec;
      // 发送 HTTP 请求或其他方式从后端获取选定规格的价格
      // 将获取到的价格赋值给 product.pro_price
      // 更新商品的总价金额
      product.totalPrice = product.pro_price * product.pro_num;
    },
    back() {
      // 返回到其他页面的逻辑
    },
    deleteProduct(product) {
      const param={
        shop_cart_id:product.id,
      }
      this.request.delete(globalVar.HOST_NAME+'/shopcart/deleteShopCart', {params:param}).then(response=>{
        this.$message.success("删除成功");
        this.fetchProductList();

      }).catch(error=>{
        this.$message.error("删除失败");
      })

    },
    // deleteSelectedProducts() {
    //   // 删除选中的商品
    //   this.productList = this.productList.filter((product) => !product.select);
    // },
    deleteSelectedProducts() {
      // 获取选中的商品
      const selectedProducts = this.productList.filter((product) => product.select);

      if (selectedProducts.length === 0) {
        return; // 如果没有选中的商品，则不执行删除操作
      }

      const selectedShopCartIds = selectedProducts.map((product) => product.id);

      // 发送请求到后端删除选中的商品数据
      const param = {
        shop_cart_id: selectedShopCartIds // 将选中的购物车ID作为参数传递给后端
      };

      this.request.delete(globalVar.HOST_NAME + '/shopcart/deleteShopCart', { params: param })
          .then(response => {
            this.$message.success("删除成功");

            // 在前端更新商品列表，删除选中的商品
            this.productList = this.productList.filter((product) => !product.select);
          })
          .catch(error => {
            this.$message.error("删除失败");
          });
    },


    selectAllProducts(value) {
      console.log("全选")
      console.log(value)
      // 全选/取消全选商品
      for (let i = 0; i < this.productList.length; i++) {
        this.productList[i].select = value;
      }
      this.$forceUpdate();
    },
    getTotalAmount() {
      console.log(this.productList)
      // 计算选中商品的总金额
      let total = 0;
      for (let i = 0; i < this.productList.length; i++) {
        const product = this.productList[i];
        if (product.select) {
          total += product.totalPrice;
        }
      }
      return total.toFixed(2);
    },
    getSelectedCount() {
      console.log(this.productList)
      var sumPrice = 0;
      // 计算选中的商品数量
      let count = 0;
      for (let i = 0; i < this.productList.length; i++) {
        if (this.productList[i].select) {
          count++;
          sumPrice+=this.productList[i].amount*this.productList[i].specification_price.price;
        }
      }
      this.totalPrice=sumPrice;
      return count;
    },
  },
  computed: {
    isSelectAll: {
      get() {
        return this.productList.length > 0 && this.productList.every((product) => product.select);
      },
      set(value) {
        this.selectAllProducts(value);
      },
    },
  },
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
  text-align: center;

}
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

  display: flex;
  background-size: cover;
  overflow: hidden;
}
</style>
