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
              <div class="item22">
                <h3 style="margin-top: 20px " >{{ productDetails.commodity.name }}</h3>
                <p style="margin-top: 20px;color: red">{{ productDetails.commodity.description }} </p>
                <p>销量: {{productDetails.commodity.selnum}}</p>
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

<!--                  </div>-->
                  <div v-for="items in productDetails.commodity.specifications" key="items" style="display: flex;flex-direction: row;align-items: flex-start">
                      <el-radio-button v-bind:label="items" v-for="items in productDetails.commodity.specifications" size="mini">
                        {{items.specification_name }}
                      </el-radio-button>
                  </div>
                  <h3>口味:</h3>
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
                <el-input-number size="small" v-model="num1" style="margin: 5px"></el-input-number>
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
              <div class="item22"><b style="margin-top: 10px ;color: red;">总价:{{ price*num1}}元</b></div>


            </div>
            <div style="display: flex;justify-content: center;align-items: center; margin-bottom: 20px">
              <div style="width: 200px;height:60px; background-color: forestgreen;margin: 20px;
            display: flex;justify-content: center;align-items: center;" :plain="true" @click="addShip">
                <h1 style="color: #FDFDFD">加入购物车</h1>
              </div>

              <div style="width: 200px;height:60px; background-color: forestgreen;margin: 20px;
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
          <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
          <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
        </el-collapse-item>
        <el-collapse-item title="商品描述3" name="3">
          <div>简化流程：设计简洁直观的操作流程；</div>
          <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
          <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
        </el-collapse-item>
        <el-collapse-item title="商品描述4" name="4">
          <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
          <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
        </el-collapse-item>
      </el-collapse>
    </div>
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
      FData:{
      },
      ID:'',
      id:'',
      num1:1,
      images:[],
      activeNames:'1',
      selectedSpecifications: {},
      selectedQuality: '',
      selectedFlavor:'',
      selectedSpec: "", // 当前选中的规格,
      input:'',
      specificationsType:[],
      pi:{},
      price:1062,
      soecCom:{},
      richTextContent: '<p>这是一个富文本示例，包含<strong>文字样式</strong>和图片：</p><p><img style="width: 70%;' +
          ' padding: 30px;"  src="http://124.70.51.6:8000/static/OIP-C_1689177163120.924.jpg" alt="图片"></p>',
      specifications_price:[],
      productDetails:[],
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
    handleChange(val) {
      console.log(val);
    },
    addShip(){
      //添加到购物车
      console.log("加入购物车")
      this.$message({
        message: '成功加入购物车',
        type: 'success'
      });

    },
    gotoShip(){
      console.log("买买买")
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
        // const aaa= res.data.commodity.imgs.split(',')
        const images=res.data.commodity.imgs.map(aa=>globalVar.STATIC_NAME+aa.trim())
        console.log(res)
        console.log(images)
        this.images=images

      }).catch(error=>{
        console.error('获取商品详情失败!!!!', error);
      })
    }

  }

}
</script>

<style scoped>

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
  margin: 30px;
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