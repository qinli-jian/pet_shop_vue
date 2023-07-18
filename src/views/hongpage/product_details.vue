<template>
<div style="background-color:#FDFDFD">
  <el-divider content-position="right">顶针的动物朋友</el-divider>
  <div style="margin-left: 200px">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{productDetails.categoryLevel1}}</el-breadcrumb-item>
      <el-breadcrumb-item>{{productDetails.categoryLevel2}}</el-breadcrumb-item>
      <el-breadcrumb-item>商品详情</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
  <div class="details">
    <div>
      <el-card shadow="always" style="width: 1000px" >
        <div class="detailsCard">
          <div class="card-content1" style="width:500px; margin-top: 50px;margin-left: 20px">
            <el-carousel height="400px" style="border-radius: 4px;width: 400px;">
              <el-carousel-item v-for=" image in images" height:500px>
                <img :src="image" alt="image.alt" class="details-image">
              </el-carousel-item>
            </el-carousel>
<!--            <img :src="productDetails.commodity.imgs"  class="details-image">-->
          </div>
          <div class="card-content1" >
            <div class="card-details">
              <div class="item22" v-if="productDetails.commodity!==undefined">
                <h3 style="margin-top: 20px " >{{ productDetails.commodity.name }}</h3>
                <p>类别: {{ productDetails.categoryLevel1 }} > {{ productDetails.categoryLevel2 }}</p>
                <p style="margin-top: 20px;color: red">{{ productDetails.commodity.description }} </p>
                <p style="color: #9BABB8">销量: {{productDetails.commodity.total_sales_volume}}</p>
              </div>
              <hr>
              <div class="item22">

                <div style="display: flex;flex-direction:column">
                  <h3>规格:</h3>
<!--                  <div v-for="stype in productDetails.commodity.specifications" :key="stype" style="display: flex;flex-direction: row;align-items: center "  @click="pickItem">-->

<!--                        <el-radio-group v-model="FData[stype]">-->
<!--                          <el-radio-button v-bind:label="item.id" v-for="item in specifications" :key="item.id"  size="mini" style="margin-bottom: 10px"-->
<!--                                       v-if="item.type===stype">{{ item.specification_name }}-->
<!--                          </el-radio-button>-->
<!--                        </el-radio-group>-->
<!--                  v-for="items in productDetails.commodity.specifications" key="items.specification_type"-->
<!--                  </div>-->
                  <div  style="display: flex;flex-direction: row;align-items: flex-start" v-if="productDetails.commodity!==undefined">
                    <el-button :type="currentSelectSpec===item.specifications_id?'primary':''"  v-for="item in productDetails.commodity.specification_price" :key="item.specifications_id" size="mini" @click="selectOption(item)">
                        <span v-for="jitem in item.specifications">
                          {{jitem.specification_name}} &nbsp;
                        </span>
                    </el-button>
                  </div>
                  <div v-if="selectedSpec">
                    <h3>已选规格: {{ selectedSpec.specification_type }} - {{ selectedSpec.specification_name }}</h3>
                    <h4>{{selectedSpec.Object.specification_type }}:</h4>
                    <div v-if="selectedSpec.Object && selectedSpec.Object.specification_type" style="height: 100px">
                      <div v-for="weight in selectedSpec.Object" style="margin-right:10px "
                           :key="weight.specification_name"  @click="selectWeight(weight)">
                        <el-button v-if="weight ==='10kg' ">
                          {{ weight }}
                        </el-button>
                      </div>

                    </div>
                    <p>价格: {{ selectedSpec.Object.Object.price }} 元    库存:{{ selectedSpec.Object.Object.inventory }}</p>
<!--                    <p>销量:{{ selectedSpec.Object.Object.sales_volume}}</p>-->

                  </div>


<!--                  <h3>口味:</h3>-->
<!--                  <el-button v-for="flavor in flavors" :key="flavor"  size="mini" style="margin: 10px"-->
<!--                             v-model="selectedFlavor" @click="selectFlavor(flavor)">{{ flavor }}</el-button>-->
                </div>
<!--                <h3>选中的规格:-->
<!--                  <el-input-->
<!--                      style="width: 150px"-->
<!--                      v-model="input"-->
<!--                      v-text="soecCom.重量+' '+soecCom.味道"-->
<!--                      clearable>-->
<!--                  </el-input>-->
<!--                </h3>-->
<!--                <p style="color: red">价格:{{ getPriceBySpec(soecCom.重量)}} 元</p>-->
                <h3>购买数量 : </h3>
                <el-input-number size="small" v-model="amount" :min="1" style="margin: 5px"></el-input-number>
<!--                <div>{{soecCom}}</div>-->
<!--                <div>-->
<!--                  Selected Quality: {{ selectedQuality }}-->
<!--                </div>-->
<!--                <div>-->
<!--                  Selected Flavor: {{ selectedFlavor }}-->
<!--                </div>-->
<!--                <h3>价格 : {{productDetails.specifications_price.price}}</h3>-->
                <div>

                </div>

              </div>
              <hr>
<!--              <div class="item22"><b style="margin-top: 10px ;color: red;">总价:{{ getPriceBySpec(soecCom.重量)*num1}}元</b></div>-->
<!--              <div class="item22"><del style="margin-top: 10px; color: gray;">{{ productDetails.price }}.00元</del></div>-->
              <div class="item22"><b style="margin-top: 10px ;color: red;font-size: 20px ">总价:{{(price*amount).toFixed(2)}}元</b></div>


            </div>
            <div style="display: flex;justify-content: center;align-items: center; margin-bottom: 20px">
              <div style="width: 200px;height:60px; background-color: #78b300;margin: 20px;user-select:none;cursor: default;border-radius: 10px;
            display: flex;justify-content: center;align-items: center;" :plain="true" @click="addShip">
                <h1 style="color: #FDFDFD">加入购物车</h1>
              </div>

              <div style="width: 200px;height:60px; background-color: #78b300;margin: 20px;user-select:none;cursor: default;border-radius: 10px;
            display: flex;justify-content: center;align-items: center;" @click="gotoShip">
                <h1 style="color: #FDFDFD">立即购买</h1>
              </div>
            </div>


          </div>
        </div>

      </el-card>
    </div>
    <div style="width: 1000px">
      <el-collapse style="width:100%" v-model="activeNames" @change="handleChange">
        <el-collapse-item style="width:100%;" title="商品描述1" name="1">
          <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
          <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
          <div v-html="richTextContent"></div>
        </el-collapse-item>
        <el-collapse-item title="评论" name="2">

          <div class="comment-area" v-if="comments.length!==0">
            <div class="comment-box" v-for="(comment,index) in comments">
              <div class="inner-box" v-if="comment.reply_to_comment_id==='-1'">
                <div class="comment-header">
                  <el-avatar :src="comment.avatar==null?'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png':globalVar.STATIC_NAME + comment.avatar"></el-avatar>
                  <div class="username-box">
                    {{comment.username===null?comment.user_id:comment.username}}
                    <!--                    <i class="el-icon-caret-right"/>-->
                    <!--                    {{comment.reply_to_username===null||comment.reply_to_username===''?'该账号已注销':comment.reply_to_username}}-->
                  </div>
                  <div class="time" style="flex-wrap: nowrap">
                    {{comment.createTime}}
                  </div>
                </div>
                <div class="comment-content">
                  {{comment.content}}
                </div>
              </div>
              <div class="sub-comment-box" v-if="comment.subComments.length!==0">
                <div  v-for="(sub_comment,subindex) in comment.subComments" class="comment-inner-box" :style="{ height: comment.unfolded ? 'fit-content' : '0' }">
                  <div class="sub-comment-header">
                    <el-avatar :src="sub_comment.avatar==null?'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png':globalVar.STATIC_NAME + comment.avatar"></el-avatar>
                    <div class="username-box">
                      {{sub_comment.username===null?'id'+sub_comment.user_id:sub_comment.username}}
                      <i class="el-icon-caret-right"/>
                      {{sub_comment.reply_to_username===null||sub_comment.reply_to_username===''?sub_comment.reply_to_comment_id:sub_comment.reply_to_username}}
                    </div>
                    <div class="time" style="flex-wrap: nowrap">
                      {{sub_comment.createTime}}
                    </div>
                  </div>
                  <div class="comment-content">
                    {{sub_comment.content}}
                  </div>
                </div>
                <div class="export-btn" @click="unfold(index)">查看{{comment.subComments.length}}条评论</div>
              </div>
            </div>
          </div>
          <el-pagination
              @current-change="handleCurrentChange"
              background
              layout="total,prev, pager, next"
              :current-page="pageNum"
              :page-size="pageSize"
              :total="total"
          >

          </el-pagination>

        </el-collapse-item>
<!--        <el-collapse-item title="商品描述3" name="3">-->
<!--          <div>简化流程：设计简洁直观的操作流程；</div>-->
<!--          <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>-->
<!--          <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>-->
<!--        </el-collapse-item>-->
<!--        <el-collapse-item title="商品描述4" name="4">-->
<!--          <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>-->
<!--          <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>-->
<!--        </el-collapse-item>-->
      </el-collapse>
    </div>
  </div>
  <div>
    <el-dialog title="收货地址选择" :visible.sync="dialogVisible" width="40%">
      <el-table ref="singleTable" :data="tableData" highlight-current-row @current-change="handleCurrentChange1" style="width: 100%">
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column property="addressee" label="收件人" width="120">
        </el-table-column>
        <el-table-column property="phone" label="手机号" width="120">
        </el-table-column>
        <el-table-column property="detailed_address" label="详细地址">
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="quxiao">取 消</el-button>
        <el-button type="primary" @click="sureorder">确 定</el-button>
      </div>

    </el-dialog>
  </div>
</div>
</template>

<script>
import {globalVar} from "@/utils/globalVar";
import request from "@/utils/request";

export default {
  name: "productdetails",
  data(){
    return{
      globalVar:globalVar,
      comments:[],
      currentSelectSpec:-1,
      FData:{
      },
      ID:'',
      // id:'1',
      amount:1,
      images:[],
      activeNames:'1',
      selectedSpecifications: {},
      selectedQuality: '',
      selectedFlavor:'',
      selectedSpec: "", // 当前选中的规格,
      input:'',
      specificationsType:[],
      pi:{},
      price:"",
      totalPrice:"",
      soecCom:{},
      richTextContent: '<p>这是一个富文本示例，包含<strong>文字样式</strong>和图片：</p><p><img style="width: 70%;' +
          ' padding: 30px;"  src="http://124.70.51.6:8000/static/OIP-C_1689177163120.924.jpg" alt="图片"></p>',
      specifications_price:[],
      productDetails:[],
      pageNum:1,
      pageSize:10,
      total:0,
      user_id:'1',
      commodity_id:'',
      specification_price_id:'',
      dialogVisible: false,
      tableData:[],
      currentRow: null,
    }
  },
  created() {
    this.addDictData()
    this.getproductDetails()
  },
  // mounted() {
  //   console.log(this.productDetails)
  //   // this.soecCom["重量"]="";
  //   // this.soecCom["口味"]="";
  //   this.processSpecifications(this.productDetails.specifications_price);
  // },
  computed: {

    weights() {
      // 返回重量数组

      return this.productDetails.specifications_price.map(item => {
        return item.specifications.find(spec => spec.type === '重量').specification_name;
      });


    },
    flavors() {
      // 返回口味数组
      // 返回去重后的口味数组
      const flavors = this.productDetails.specifications_price.flatMap(item => {
        return item.specifications.filter(spec => spec.type === '味道').map(spec => spec.specification_name);
      });

      return [...new Set(flavors)];
    },
    // prices(){
    //   return this.productDetails.specifications_price.map(item => item.price);
    // },
    // specifications() {
    //   // 返回specifications数组
    //   return this.productDetails.specifications_price.flatMap(
    //       item => item.specifications
    //   );
    // }
  },
  methods: {
    setCurrent(row) {
      this.$refs.singleTable.setCurrentRow(row);
    },
    handleCurrentChange1(val) {
      this.currentRow = val;
      console.log("val")
      console.log(val)
    },
    handleCurrentChange(pageNum){
      this.pageNum=pageNum
      this.getcomment()
    },
    unfold(index){
      console.log("展开")
      this.comments[index]["unfolded"] = !this.comments[index].unfolded;
      console.log(this.comments[index]["unfolded"])
      console.log(this.comments)
      this.$forceUpdate()
      // this.unfolded = !this.unfolded; // 切换展开状态
    },
    // 点击规格按钮时触发，更新所选规格信息和价格
    selectOption(option) {
      console.log(option)
      console.log(option.specifications_id)
      this.currentSelectSpec = option.specifications_id;
      this.specification_price_id=option.specifications_id;
      this.price = option.price;
    },
    // 点击重量按钮时触发，更新所选规格信息和价格
    selectWeight(weightOption) {
      this.selectedSpec.Object = weightOption;
      console.log(weightOption)
      console.log(this.selectedSpec.Object)
    },
    handleChange(val) {
      console.log(val);
      if(val.includes("2")){
        console.log(2)
        this.getcomment();
        this.gettotalcomment();
      }
    },
    addShip(){
      //添加到购物车

      console.log(this.user_id)
      console.log(this.commodity_id)
      console.log(this.currentSelectSpec)
      // console.log(this.specification_price_id)
      console.log(this.amount)
      const requestBody = [{
        commodity_id: this.commodity_id,
        specification_price_id: this.currentSelectSpec,
        amount: this.amount
      }];

      const params = {
        user_id: this.user_id
      };
      request({method:"POST",url:globalVar.HOST_NAME+"/shopcart/addtoshopcart",data:{"infoList":requestBody},
        params:params}).then(res=>{
        console.log("加入购物车")
        this.$message({
          message: '成功加入购物车',
          type: 'success'
        });
      }).then(res=>{
        console.log(res);
      }).catch(error=>{
        console.error('加入购物车失败!!!!', error);
      })
    },
    gotoShip(){
      console.log("买买买")

      this.dialogVisible=true
      request.get(globalVar.HOST_NAME+"/user/addresslist",{
        params:{
          user_id:"34"
        }
      }).then(res=>{
        console.log(res)
        console.log(res.data)
        this.tableData=res.data
      }).catch(err=>{
        this.$message({
          message: '买不了洛',
          type: 'warning'
        });
      })

    },
    // pingjie(address){
    //   return
    // }
    quxiao(){
      this.dialogVisible=false
    },
    sureorder(){

      request({url:"http://428207b5.r9.cpolar.top"+"/user_order/create_one",method:"POST",data:{
          user_id:"34",
          order_address_id:this.currentRow.id,
          commodity_id:this.commodity_id,
          specification_price_id: this.currentSelectSpec,
          num:this.amount
      }}).then(res=>{
        console.log(res.data)
        this.$router.push({name:"order",path:"/frontpage/order"}).catch(err=>err)
      }).catch(err=>{
        console.log("买不了")
      })
      this.dialogVisible=false
    },
    getPriceBySpecificationId(specId) {
      const foundSpecification = this.productDetails.specifications_price.find(
          item => item.specifications.some(spec => spec.id === specId)
      );
      if (foundSpecification) {
        return foundSpecification.price;
      }
      return null;
    },
    // processSpecifications(specifications_price){
    //   for(var i = 0;i<specifications_price.length;i++){
    //     var item = specifications_price[i];
    //     for(var j =0;j<item.specifications.length;j++){
    //       var jitem = item.specifications[j];
    //       console.log(jitem);
    //       if(!this.specificationsType.includes(jitem.type)){
    //         this.specificationsType.push(jitem.type)
    //       }
    //     }
    //
    //   }
    //   console.log("处理")
    //   console.log(this.specificationsType)
    // },
    // isUnique(item) {
    //   // 检查是否为唯一的元素
    //   return this.items.filter(i => i.name === item.name).length === 1;
    // },
    getPriceBySpec(spec) {
      // 根据选中的规格获取对应的价格
      const matchedItem = this.productDetails.specifications_price.find(item => {
        return item.specifications.some(specification => specification.specification_name === spec);
      });

      if (matchedItem) {
        return matchedItem.price;
      } else {
        return '0';
      }
    },
    pickItem(item){
      console.log(this.FData)
      console.log("============")
      return;
      console.log(item)
      // this.$set(this.soecCom, item.type,{"id":item.id,"name":item.specification_name});
      // this.soecCom[item.type]=item.specification_name
      console.log(this.soecCom)
      for (var soecComKey in this.soecCom) {
          console.log(this.soecCom[soecComKey])
      }
      var flag=0;
      var price = 0;
      console.log(Object.keys(this.soecCom).length)
      if(Object.keys(this.soecCom).length==this.specificationsType.length){
        for(var i = 0;i<this.productDetails.specifications_price.length;i++){
          var item = this.productDetails.specifications_price[i];
          for(var j = 0;j<item.specifications.length;j++){
            var jitem = item.specifications[j];
            var zh_type = jitem.type;
            if(this.soecCom[zh_type].id==jitem.id){
              flag=1;
              price = item.price;
            }else{
              flag=0;
              break;
            }
          }
        }
      }
      console.log("价格")
      console.log(price)
    },
    selectQuality(quality) {
      this.selectedQuality = quality;
      this.input+=quality
    },
    selectFlavor(flavor) {
      this.selectedFlavor = flavor;
      this.input+=flavor
    },
    addDictData(){
      console.log("传参成功")
      // 通过 this.$route.query + 参数键  接收参数
      console.log(this.$route.query.ID)
      this.ID = this.$route.query.ID
      console.log("ID:",this.ID)
    },
    getproductDetails(){
      request.get(globalVar.HOST_NAME+"/commodity/details",{
        params:{
          id:this.ID
        }
      }).then(res=>{
        console.log("获取商品详情成功")
        console.log(res)
        console.log(res.data)
        this.productDetails=res.data
        this.currentSelectSpec = this.productDetails.commodity.specification_price[0].specifications_id;
        this.price = this.productDetails.commodity.specification_price[0].price;
        // const aaa= res.data.commodity.imgs.split(',')
        const images=res.data.commodity.imgs.map(aa=>globalVar.STATIC_NAME+aa.trim())
        console.log(res)
        console.log(images)
        this.images=images
        this.commodity_id=this.productDetails.commodity.id

      }).catch(error=>{
        console.error('获取商品详情失败!!!!', error);
      })
    },
    //获得评论
    getcomment(){
      console.log("获取评论")
      request.get(globalVar.HOST_NAME+"/comment/listbyCommodityId",{
        params:{
          commodity_id:this.ID,
          pageNum:this.pageNum,
          pageSize:this.pageSize
        }
      }).then(res=>{
        console.log("获得评论")
        console.log(res.data)
        this.comments = res.data;
        for(var i = 0;i<this.comments.length;i++){
          this.comments[i]["unfolded"]=false;
        }
      })

    },
    gettotalcomment(){
      request.get(globalVar.HOST_NAME+"/comment/sumComment",{
        params:{
          commodity_id:this.ID
        }
      }).then(res=>{
        this.total=res.data.count
      })
    }

  }

}
</script>

<style scoped>
.sub-comment-header{
  display: flex;
  flex-direction: row;
  align-items: center;
}
.comment-inner-box {
  margin-left: 30px;
  box-sizing: border-box;
  /* 这里设置初始的宽度 */
  height: 0;
  overflow: hidden;
}

.unfolded {
  /* 当unfolded为true时，宽度变为fit-content */
  height: fit-content;
  overflow: hidden;
}
.export-btn{
  color: gray;
  user-select: none;
  cursor: default; /* 设置鼠标光标为箭头 */
}
.time{
  display: flex;
  flex-direction: row;
  /*border:1px solid red;*/
  font-size: 4px;
  color: gray;
  width: 20%;
  margin-left: 30px;
}
.inner-box{
  padding-bottom: 10px;
}
.comment-box{
  margin-top: 10px;
  border-bottom: 1px solid gray;
}
.comment-content{
  padding-left: 50px;
}
.comment-header{
  /*border:1px solid red;*/
  width: 100%;
}
.username-box{
  /*border: 1px solid red;*/
  box-sizing: border-box;
  margin-left: 20px;
}
.username-box,.comment-header{
  display: flex;
  flex-direction: row;
  align-items: center;
}
  .comment-area{
    display: flex;
    flex-direction: column;

  }
.details{
  margin-top: 20px;
  margin-left: 200px;
  /*background-color: #C5DFF8;*/
}
.detailsCard{
  height: 600px;
  margin-left: 10px;
  display: flex;
  flex-direction:row;
  justify-content:flex-start;
}
.card-content1{
  padding: 10px;
}
.card-details{
  margin: 10px;
 display: flex;
  flex-direction:column;
}
.item22{
  flex: 1;
  padding: 10px;
  /*border: 1px solid #ccc;*/
  margin: 5px;
}
.details-image{
  width:400px;
  height: 400px;
  /*margin: 10px 0 0 35px;*/

}

</style>