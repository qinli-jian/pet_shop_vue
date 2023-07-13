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
          <div class="card-content1">
            <img :src="productDetails.commodity.imgs"  class="details-image">
          </div>
          <div class="card-content1" >
            <div class="card-details">
              <div class="item22">
                <h3 style="margin-top: 20px " >{{ productDetails.commodity.name }}</h3>
                <p style="margin-top: 20px;color: red">{{ productDetails.commodity.description }} </p>
              </div>
              <hr>
              <div class="item22">
                <div style="display: flex;flex-direction:column">
                  <h3>规格:</h3>
                  <div v-for="stype in specificationsType" :key="stype" style="display: flex;flex-direction: row;align-items: center "  @click="pickItem">

                        <el-radio-group v-model="FData[stype]">
                          <el-radio-button v-bind:label="item.id" v-for="item in specifications" :key="item.id"  size="mini" style="margin-bottom: 10px"
                                       v-if="item.type===stype">{{ item.specification_name }}
                          </el-radio-button>
                        </el-radio-group>

                  </div>
<!--                  <h3>口味:</h3>-->
<!--                  <el-button v-for="flavor in flavors" :key="flavor"  size="mini" style="margin: 10px"-->
<!--                             v-model="selectedFlavor" @click="selectFlavor(flavor)">{{ flavor }}</el-button>-->
                </div>
                <hr>
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
                <div>

                </div>

              </div>
              <hr>
              <div class="item22"><b style="margin-top: 10px ;color: red;">总价:{{ getPriceBySpec(soecCom.重量)*num1}}元</b></div>
<!--              <div class="item22"><del style="margin-top: 10px; color: gray;">{{ productDetails.price }}.00元</del></div>-->

            </div>
            <div style="display: flex;justify-content: center;align-items: center;">
              <div style="width: 200px;height:60px; background-color: forestgreen;margin: 20px;
            display: flex;justify-content: center;align-items: center;" @click="addShip">
                <h1 style="color: #FDFDFD">加入购物车</h1>
              </div>

              <div style="width: 200px;height:60px; background-color: forestgreen;margin: 20px;
            display: flex;justify-content: center;align-items: center;" @click="addShip">
                <h1 style="color: #FDFDFD">立即购买</h1>
              </div>
            </div>


          </div>
        </div>

      </el-card>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "productdetails",
  data(){
    return{
      FData:{
      },
      num1:1,
      selectedSpecifications: {},
      selectedQuality: '',
      selectedFlavor:'',
      selectedSpec: "", // 当前选中的规格,
      input:'',
      specificationsType:[],
      pi:{},
      soecCom:{},
      specifications:[
          {
            "id": "1",
            "specification_name": "10kg",
            "commodity_id": "1",
            "type": "重量",
            "inventory": null,
            "sales_volume": 10,
            "create_time": "2023-07-11T08:26:39.000+00:00",
            "images": "[\"text1.jpg\"]"
          },
          {
            "id": "2",
            "specification_name": "20kg",
            "commodity_id": "1",
            "type": "重量",
            "inventory": null,
            "sales_volume": 99,
            "create_time": "2023-07-11T08:27:32.000+00:00",
            "images": "[\"text2.jpg\"]"
          },
          {
            "id": "3",
            "specification_name": "草莓味",
            "commodity_id": "1",
            "type": "味道",
            "inventory": null,
            "sales_volume": 99,
            "create_time": "2023-07-11T08:37:10.000+00:00",
            "images": "[]"
          },
          {
            "id": "1129011020661133312",
            "specification_name": "牛肉",
            "commodity_id": "1129011019990044672",
            "type": "味道",
            "inventory": null,
            "sales_volume": null,
            "create_time": "2023-07-13T03:26:44.000+00:00",
            "images": null
          },
          {
            "id": "1129011021084758016",
            "specification_name": "鼠肉",
            "commodity_id": "1129011019990044672",
            "type": "味道",
            "inventory": null,
            "sales_volume": null,
            "create_time": "2023-07-13T03:26:44.000+00:00",
            "images": null
          },
          {
            "id": "1129011021499994112",
            "specification_name": "1kg",
            "commodity_id": "1129011019990044672",
            "type": "重量",
            "inventory": null,
            "sales_volume": null,
            "create_time": "2023-07-13T03:26:44.000+00:00",
            "images": null
          },
          {
            "id": "1129011021919424512",
            "specification_name": "2kg",
            "commodity_id": "1129011019990044672",
            "type": "重量",
            "inventory": null,
            "sales_volume": null,
            "create_time": "2023-07-13T03:26:44.000+00:00",
            "images": null
          },
          {
            "id": "1129074081480708096",
            "specification_name": "白色",
            "commodity_id": "1129074080960614400",
            "type": "颜色",
            "inventory": null,
            "sales_volume": null,
            "create_time": "2023-07-13T07:37:19.000+00:00",
            "images": null
          },
          {
            "id": "1129074082025967616",
            "specification_name": "黄色",
            "commodity_id": "1129074080960614400",
            "type": "颜色",
            "inventory": null,
            "sales_volume": null,
            "create_time": "2023-07-13T07:37:19.000+00:00",
            "images": null
          },
          {
            "id": "1129074082621558784",
            "specification_name": "小",
            "commodity_id": "1129074080960614400",
            "type": "尺寸",
            "inventory": null,
            "sales_volume": null,
            "create_time": "2023-07-13T07:37:19.000+00:00",
            "images": null
          },
          {
            "id": "1129074083133263872",
            "specification_name": "中",
            "commodity_id": "1129074080960614400",
            "type": "尺寸",
            "inventory": null,
            "sales_volume": null,
            "create_time": "2023-07-13T07:37:19.000+00:00",
            "images": null
          },
          {
            "id": "1129074083728855040",
            "specification_name": "大",
            "commodity_id": "1129074080960614400",
            "type": "尺寸",
            "inventory": null,
            "sales_volume": null,
            "create_time": "2023-07-13T07:37:20.000+00:00",
            "images": null
          }
        ],

      productDetails:{
          categoryLevel1:'后狗狗',
          categoryLevel2:'狗粮',
          commodity:{
            name:'加拿大原装进口纽顿nutram number无谷低升糖系列 T28鲑鱼&鳟鱼配方小型&玩赏犬粮 6kg',
            imgs:require('../../assets/images/5.png'),
            description:'青春是一个短暂的美梦, 当你醒来时, 它早已消失无踪',
          },
          specifications_price:[
            {
              price:10.00,
              specifications:[
                {
                  id:'1',
                  specification_name:"10kg",
                  commodity_id:'1',
                  type: "重量",
                  sales_volume:'4924'
                },
                {
                  id:'3',
                  specification_name:"草莓味",
                  commodity_id:'1',
                  type: "味道",
                  sales_volume:'4924'
                }

              ]
            },
            {
              price:20.00,
              specifications:[
                {
                  id:'4',
                  specification_name:"20kg",
                  commodity_id:'1',
                  type: "重量",
                  sales_volume:'99'
                },
                {
                  id:'3',
                  specification_name:"shit味",
                  commodity_id:'1',
                  type: "味道",
                  sales_volume:'99'
                }

              ]
            },

          ]


      }
    }
  },
  mounted() {
    console.log(this.productDetails)
    // this.soecCom["重量"]="";
    // this.soecCom["口味"]="";
    this.processSpecifications(this.productDetails.specifications_price);
  },
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
    prices(){
      return this.productDetails.specifications_price.map(item => item.price);
    },
    specifications() {
      // 返回specifications数组
      return this.productDetails.specifications_price.flatMap(
          item => item.specifications
      );
    }
  },
  methods: {
    addShip(){
      //添加到购物车
      console.log("加入购物车")
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
    testbtn(){
      console.log(this.soecCom);
    },
    processSpecifications(specifications_price){
      for(var i = 0;i<specifications_price.length;i++){
        var item = specifications_price[i];
        for(var j =0;j<item.specifications.length;j++){
          var jitem = item.specifications[j];
          console.log(jitem);
          if(!this.specificationsType.includes(jitem.type)){
            this.specificationsType.push(jitem.type)
          }
        }

      }
      console.log("处理")
      console.log(this.specificationsType)
    },
    isUnique(item) {
      // 检查是否为唯一的元素
      return this.items.filter(i => i.name === item.name).length === 1;
    },
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
      this.$set(this.soecCom, item.type,{"id":item.id,"name":item.specification_name});
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
  /*height: 600px;*/
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
  width:300px;
  height: 300px;
  margin: 100px 30px 30px 50px

}
</style>