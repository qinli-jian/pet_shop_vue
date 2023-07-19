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
    <div style="margin-top: 15px">
      <div class="left flexbox">
        <el-input placeholder="请输入商品标题或订单号进行搜索" v-model="selectTitle" class="input-with-select" style="width: 300px">
          <el-button slot="append" icon="el-icon-search" @click="select"></el-button>
        </el-input>
        <p style="margin-left: 10px" @click="ontrue" class="click change-color-on-hover" v-show="!isshowmore">
          更多搜索条件
        </p>
        <p style="margin-left: 10px" @click="ontrue" class="click change-color-on-hover" v-show="isshowmore">
          精简搜索条件
        </p>
        <p style="margin-left: 10px" @click="reload" class="click change-color-on-hover">
          重置搜索
        </p>
      </div>
      <!-- 更多搜索 -->
      <div v-show="isshowmore" style="margin-top: 30px">
        <div>
          <span>成交时间</span>
          <el-date-picker style="margin-left: 10px" v-model="date" type="daterange" align="right" unlink-panels
            range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
          </el-date-picker>
        </div>

        <div style="margin-top: 20px">
          <span>交易状态</span>
          <el-select v-model="selectType" slot="prepend" placeholder="请选择" style="width: auto; margin-left: 10px">
            <el-option label="已取消" value="1"></el-option>
            <el-option label="已下单" value="2"></el-option>
            <el-option label="待支付" value="3"></el-option>
            <el-option label="已支付" value="4"></el-option>
            <el-option label="出货中" value="5"></el-option>
            <el-option label="已发货" value="6"></el-option>
            <el-option label="运输中" value="7"></el-option>
            <el-option label="已签收" value="8"></el-option>
            <el-option label="交易成功" value="9"></el-option>
            <el-option label="审核中" value="10"></el-option>
            <el-option label="待运回" value="11"></el-option>
            <el-option label="已退款" value="12"></el-option>
          </el-select>
        </div>
        <div style="margin-top: 20px">
          <el-button type="success" @click="select">搜索</el-button>
        </div>
      </div>
    </div>

    <div style="margin-top: 80px">
      <div class="orderList">
        <div class="page-wrap w">
          <div class="orderList-table">
            <table class="order-head" style="background-color: #f5f5f5">
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
                  <br />
                  <div class="body_top_con">
                    <div class="top_con_shop">
                      <span class="top_con_time">{{
                        item.create_time.substring(0, 10)
                      }}</span>
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
                            <img :src="static_name + work.image" alt="" />
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
                      <td colspan="" rowspan="" headers="" class="goods_handle body_content_handle">

                        <p class="click change-color-on-hover">
                          <span>
                            <el-button
                              :disabled="!(item.status.status_description === '已签收' || item.status.status_description === '交易成功')"
                              :type="item.status.status_description === '已签收' || item.status.status_description === '交易成功' ? 'primary' : 'info'"
                              plain @click="comment(index, work)">追加评论</el-button>
                          </span>
                        </p>

                        <p class="click change-color-on-hover">
                          <span @click="afterSale(item, work)"> 申请售后 </span>
                        </p>
                      </td>
                    </div>

                    <td colspan="" :rowspan="item.commodity_list.length" headers="" class="real_pay body_content_pay">
                      <p class="price">
                        <span
                          data-reactid=".0.7:$order-3439077948206595114.$3439077948206595114.0.1:1:0.$0.$1.0.1.0">￥</span>{{
                            item.total_price }}
                      </p>
                      <!--                                        <p class="postage">(含运费：￥{{ item.postage }})</p>-->
                      <p class="postage">(含运费：￥0.00)</p>
                    </td>
                    <td colspan="" :rowspan="item.commodity_list.length" headers=""
                      class="order_status body_content_status">
                      <p>
                        <span v-if="item.status.status_description === '已取消'"><el-tag type="warning">订单已取消</el-tag></span>
                        <span v-if="item.status.status_description === '已下单'"><el-tag type="success">已下单</el-tag></span>
                        <span v-if="item.status.status_description === '待支付'"><el-tag type="info">待支付</el-tag></span>
                        <span v-if="item.status.status_description === '已支付'"><el-tag type="success">已支付</el-tag></span>
                        <span v-if="item.status.status_description === '出货中'"><el-tag type="">出货中</el-tag></span>
                        <span v-if="item.status.status_description === '已发货'"><el-tag type="info">已发货</el-tag></span>
                        <span v-if="item.status.status_description === '运输中'"><el-tag type="info">运输中</el-tag></span>
                        <span v-if="item.status.status_description === '已签收'"><el-tag type="info">已签收</el-tag></span>
                        <span v-if="item.status.status_description === '交易成功'"><el-tag type="success">交易成功</el-tag></span>
                        <span v-if="item.status.status_description === '审核中'"><el-tag type="warning">审核中</el-tag></span>
                        <span v-if="item.status.status_description === '待运回'"><el-tag type="info">待运回</el-tag></span>
                        <span v-if="item.status.status_description === '已退款'"><el-tag type="success">已退款</el-tag></span>
                      </p>
                      <p class="detail">
                        <span @click="orderDetail(item.order_id)">订单详情</span>
                      </p>
                      <p v-if="item.status.status_description === '已发货' ||
                        item.status.status_description === '已发货' ||
                        item.status.status_description === '已发货' ||
                        item.status.status_description === '已发货'
                        " class="click change-color-on-hover">
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
                        <span @click="deleteOrder(item.order_id)">取消订单</span>
                      </p>
                      <p v-if="item.status.status_description === '已发货' ||
                        item.status.status_description === '运输中' ||
                        item.status.status_description === '已签收' ||
                        item.status.status_description === '交易成功'
                        " class="click change-color-on-hover">
                        <span @click="invoice">申请发票</span>
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
              <!-- 填写评价的区域 -->
              <div v-show="currentComment == index" class="comment-box">
                <div class="area">
                  <div class="label">评论商品</div>
                  <el-input style="font-size: 15px" type="textarea" :autosize="{ minRows: 2, maxRows: 4 }"
                    placeholder="请输入内容" v-model="commentContent">
                  </el-input>
                </div>
                <div class="area">
                  <div class="label">上传图片</div>
                  <el-upload :action="globalVar.HOST_NAME + '/file/upload'" name="image" list-type="picture-card"
                    :on-preview="handlePictureCardPreview" :on-remove="handleRemove" @click="testImg"
                    :on-success="uploadSuccess">
                    <i class="el-icon-plus"></i>
                  </el-upload>
                  <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="" />
                  </el-dialog>
                </div>
                <div class="area">
                  <div class="label">商品评分</div>
                  <el-rate v-model="rating" @change="testRating" show-text>
                  </el-rate>
                </div>
                <div class="area">
                  <el-button type="primary" @click="commitComment">提交评论</el-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { globalVar } from "@/utils/globalVar";
import axios from "axios";
import Vue from "vue";

export default {
  name: "order",
  data() {
    return {
      user_id: "",
      currentCommentId: -1,
      rating: 1,
      currentSpecifications: "",
      commentRating: 0,
      uploadImageNames: [],
      globalVar: globalVar,
      dialogImageUrl: "",
      dialogVisible: false,
      commentContent: "",
      currentComment: -1,
      selectTitle: "", //搜索名
      activeIndex: "1", // 默认选中的菜单项
      list: [],
      static_name: globalVar.STATIC_NAME,
      isshowmore: false,
      selectType: "",
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },

      date: null,
    };
  },
  created() {
    var user_id = localStorage.getItem("id");
    if (user_id == "" || user_id === undefined || user_id == null) {
      this.$router.push({ path: "/login" }).catch((err) => {
        console.log(err);
      });
    } else {
      this.user_id = user_id
    }
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
    reload() {
      // 点击事件处理函数，在这里刷新页面
      window.location.reload();
    },
    ontrue() {
      this.isshowmore = !this.isshowmore;
    },
    commitComment() {
      let _this = this;
      if (user_id === "" || user_id == undefined || user_id == null) {
        this.$router.push({ path: "/login" }).catch((err) => {
          console.log(err);
        });
      } else {
        this.request
          .post(globalVar.HOST_NAME + "/comment/addcomment", {
            user_id: this.user_id,
            content: this.commentContent,
            commodity_id: this.currentCommentId,
            rating: this.rating,
            images: this.uploadImageNames,
            reply_to_comment_id: "-1",
          })
          .then((res) => {
            console.log(res);
            if (res.code === "200") {
              _this.$message.success("评论成功");
              this.currentComment = -1;
              this.commentContent = "";
              this.rating = 0;
              this.uploadImageNames = [];
            } else {
              _this.$message.error("评论失败");
            }
          });
      }
    },
    testRating() {
      console.log(this.rating);
    },
    invoice() { },
    uploadSuccess(res) {
      console.log(res);
      this.uploadImageNames.push(res.data.filename);
      console.log(this.uploadImageNames);
    },
    testImg() {
      console.log("图片url");
      console.log(this.dialogImageUrl);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
      console.log("图片url");
      console.log(this.dialogImageUrl);
    },
    comment(index, item) {
      console.log(index);
      console.log(item.commodity_id);
      console.log(item.specifications);
      this.currentCommentId = item.commodity_id;
      this.commentContent = "";
      this.rating = 0;
      this.uploadImageNames = [];
      console.log(
        index == this.currentComment &&
        item.specifications === this.currentSpecifications
      );
      // 展示添加评论的界面
      if (
        index == this.currentComment &&
        item.specifications === this.currentSpecifications
      ) {
        this.currentComment = -1;
      } else {
        this.currentComment = index;
        this.currentSpecifications = item.specifications;
      }
    },
    //查看分类
    filteredOrders() {
      console.log(this.activeIndex);
      if (this.activeIndex === "1") {
        // 返回所有订单
        this.getlist("*");
      } else if (this.activeIndex === "2") {
        this.getlist("待支付");
      } else if (this.activeIndex === "3") {
        this.getlist("待发货");
      } else if (this.activeIndex === "4") {
        this.getlist("待收货");
      } else if (this.activeIndex === "5") {
        this.getlist("交易成功");
      }
    },
    handleSelect(index) {
      this.activeIndex = index;
    },
    // 可以在这里添加与后端传输数据的接口方法，从后端获取订单数据
    getlist(status) {
      axios
        .post(globalVar.HOST_NAME + "/user_order/get_order_by_user_id", {
          //user_id: localStorage.getItem('id'),
          user_id: this.user_id,
          status: status,
        })
        .then((response) => {
          console.log(response.data);
          console.log(response.data.data);
          this.list = response.data.data;
          console.log("---------------");
          //console.log(this.list);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    //搜索
    select() {
      let status;
      if (this.selectType.value == "1") {
        status = "已取消";
      } else if (this.selectType == "2") {
        status = "已下单";
      } else if (this.selectType == "3") {
        status = "待支付";
      } else if (this.selectType == "4") {
        status = "已支付 ";
      } else if (this.selectType == "5") {
        status = "已下单";
      } else if (this.selectType == "6") {
        status = "已发货";
      } else if (this.selectType == "7") {
        status = "运输中";
      } else if (this.selectType == "8") {
        status = "已签收";
      } else if (this.selectType == "9") {
        status = "交易成功";
      } else if (this.selectType == "10") {
        status = "审核中";
      } else if (this.selectType == "11") {
        status = "待运回";
      } else if (this.selectType == "12") {
        status = "已退款";
      } else {
        status = "*";
      }

      let date_b = "*",
        date_e = "*";
      if (this.date !== null) {
        let dateObj = new Date(this.date[0]);

        // 获取日期对象的年、月和日
        let year = dateObj.getFullYear();
        let month = dateObj.getMonth() + 1; // 月份从0开始，需要加1
        let day = dateObj.getDate();

        // 格式化为年-月-日格式
        let formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day
          .toString()
          .padStart(2, "0")}`;
        date_b = formattedDate;
        dateObj = new Date(this.date[1]);

        // 获取日期对象的年、月和日
        year = dateObj.getFullYear();
        month = dateObj.getMonth() + 1; // 月份从0开始，需要加1
        day = dateObj.getDate();

        // 格式化为年-月-日格式
        formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day
          .toString()
          .padStart(2, "0")}`;
        date_e = formattedDate;
      }
      console.log("Date: " + date_b + " " + date_e);
      console.log("this.date: " + this.date);

      axios
        .post(globalVar.HOST_NAME + "/user_order/findOrdersByKey", {
          // user_id: localStorage.getItem("id"),
          user_id: this.user_id,
          status: status,
          key: this.selectTitle,

          date_begin: date_b,
          date_end: date_e, //optional, default is now. 或空或不
        })
        .then((response) => {
          console.log("数据");
          console.log(response);
          this.list = response.data.data;
          console.log(this.list);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    //商品详情
    viewGood(work) {
      // this.$router.push({
      //   path: "/productdetails",
      //   query: {
      //     commodity_id: work.commodity_id,
      //   },
      // });
      
      this.$router.push({name:"productdetails",path:'/frontpage/productdetails',query:{ID:work.commodity_id}}).catch(err => err)
    },
    //申请售后
    afterSale(order, good) {
      console.log("订单")
      console.log(order)
      console.log(good.commodity_id);
      this.$router.push({
        path: "/ApplyAfterSales",
        query: {
          user_id: this.user_id,
          order_obj: order,
          orderId: order.order_id,
          commodity_id: good.commodity_id,
        },
      });
    },
    //查看物流
    viewLogistics() { },

    //支付
    pay(orderId) {
      console.log(orderId);
      axios
        .post(globalVar.HOST_NAME + "/user_order/pay_order", {
          order_id: orderId,
        })
        .then((response) => {
          console.log(response.data);
          if (response.data.code === "200") {
            this.$message({
              message: "支付成功",
              center: true,
              showClose: true,
              type: "success",
            });
            this.filteredOrders();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    //订单详情
    orderDetail(orderId) {
      console.log("1111111111111");
      // 使用编程式导航进行页面跳转并传递数据作为查询参数
      this.$router.push({
        path: "/OrderDetails",
        query: {
          order_id: orderId,
        },
      });
    },
    //删除订单
    deleteOrder(orderId) {
      console.log(orderId);
      // return;
      axios
        .delete(globalVar.HOST_NAME + "/user_order/delete", {
          params: {
            order_id: orderId,
          },
        })
        .then((response) => {
          console.log(response);
          if (response.data.code === "200") {
            this.$message({
              message: "删除成功",
              center: true,
              showClose: true,
              type: "success",
            });
          }
          this.filteredOrders();
        });
    },
  },
};
</script>

<style scoped>
.el-select .el-input {
  width: 130px;
}

.input-with-select .el-input-group__prepend {
  background-color: #fff;
}

.flexbox {
  display: flex;
}

.left,
.right {
  flex: 1;
}

.btn-act {
  background-color: rgb(84, 84, 234);
  color: aliceblue;
}

.label {
  background-color: #f5f5f5;
  font-size: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 10%;
}

.area {
  padding: 10px;
  display: flex;
  flex-direction: row;
  width: 100%;
}

.comment-box {
  display: flex;
  flex-direction: column;
  width: 100%;
}

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
  cursor: pointer;
}

.change-color-on-hover:hover {
  color: red;
  /* 鼠标悬停时的文字颜色 */
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
            content: "\e6d7";
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