<template>
    <div class="box">
        <div class="square">
            <div>
                <el-form label-width="100px" :model="formData">
                    <el-form-item
                        label="地址信息">
                        <el-cascader
                            v-bind:placeholder="this.text"
                            v-model="formData.area"
                            size="large"
                            class="width"
                            :options="pcaTextArr"
                        >
                        </el-cascader>
                    </el-form-item>
                    <el-form-item
                        label="详细地址">
                        <el-input class="width"
                                  type="textarea"
                                  v-model="formData.detailed_address">
                        </el-input>
                    </el-form-item>
                    <el-form-item
                        label="邮政编码">
                        <el-input class="width" v-model="formData.postcode"></el-input>
                    </el-form-item>
                    <el-form-item
                        label="收货人姓名">
                        <el-input class="width" v-model="formData.addressee"></el-input>
                    </el-form-item>
                    <el-form-item
                        label="手机号码">
                        <el-input class="width" v-model="formData.phone"></el-input>
                    </el-form-item>

                    <el-checkbox v-model="formData.defaultAddress">设置为默认收货地址</el-checkbox>
                </el-form>
                <el-button style="margin-top: 30px " type="success" plain @click="save">保存</el-button>

            </div>
            <el-divider></el-divider>
            <el-alert
                :title="'已保存了' + number + '地址还能保存' + surplus + '条地址'"
                type="info"
                show-icon
                :closable="false">
            </el-alert>
            <div style="margin-top: 30px">
                <el-table
                    :data="tableData"
                    border
                    style="width: 100%"
                    >
                    <el-table-column
                        prop="addressee"
                        label="收货人"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="province"
                        label="省">
                    </el-table-column>
                    <el-table-column
                        prop="city"
                        label="市">
                    </el-table-column>
                    <el-table-column
                        prop="country"
                        label="区/县">
                    </el-table-column>
                    <el-table-column
                        prop="detailed_address"
                        label="详细地址">
                    </el-table-column>
                    <el-table-column
                        prop="postcode"
                        label="邮编">
                    </el-table-column>
                    <el-table-column
                        prop="phone"
                        label="电话/手机">
                    </el-table-column>
                    <el-table-column
                        prop="option"
                        label="操作">
                        <template v-slot="scope">
                            <el-button type="text" @click="onupdate(scope.row)">修改</el-button>
                            <el-button type="text" @click="ondelete(scope.row)">删除</el-button>

                        </template>

                    </el-table-column>

                </el-table>
            </div>
        </div>
    </div>

</template>

<script>
import axios from "axios";
import {pcaTextArr} from 'element-china-area-data';
import {globalVar} from "@/utils/globalVar";

export default {
    name: "ShippingAddress",
    data() {
        return {

            hostname:globalVar,
            pcaTextArr,
            tableData: [{
                province:'',
                city: '',
                county:'',
                detailed_address: '',
                addressee: '',
                postcode: '',
                phone: '',
                defaultAddress: 0,
            }],
            formData: {
                area: [],
                detailed_address: '',
                addressee: '',
                postcode: '',
                phone: '',
                defaultAddress: 0,
            },
            number: 0,
            surplus: 10,
            total: 10,
            text:'',
        };
    },
    created() {
         this.load();
        console.log(this.tableData)
    },
    methods: {

        ondelete(row){
            console.log(row.id);
            axios.delete(globalVar.HOST_NAME+"/user/deleteAddress",{
                params:{
                    user_id:sessionStorage.getItem('id'),
                    address_id:row.id,
                }
            })
                .then(response=>{
                    if(response.data.code==="200"){
                        this.$message({
                            message: '删除成功',
                            center: true,
                            showClose: true,
                            type: 'success'
                        });
                        this.load();
                    }
                })
                .catch(error=>{
                    console.log(error);
                })

        },
        onupdate(row){

            this.formData=row;
            this.text=row.province+"/"+row.city+"/"+row.county;
            window.scrollTo({
                top: 0,
                behavior: 'smooth' // 平滑滚动
            });
        },
        load() {

            axios.get(globalVar.HOST_NAME+"/user/addresslist", {
                params: {
                    user_id: sessionStorage.getItem('id'),
                }
            })
                .then(response => {

                    this.tableData=response.data.data;
                    console.log(response.data)
                    this.number=response.data.data.length;
                    this.surplus=this.total-this.number;
                })
                .catch(error => {
                    console.log(error);
                })
        },
        save() {
            if(this.formData.id==null){
                if(this.number===10){
                    this.$message({
                        message: '收货地址已满',
                        center: true,
                        showClose: true,
                        type: 'success'
                    });
                    return;
                }
                console.log("新增")
                console.log(this.formData);
                console.log(this.formData.area[0]);
                let address = {
                    addressee: this.formData.addressee,
                    province:this.formData.area[0],
                    city:this.formData.area[1],
                    county:this.formData.area[2],
                    detailed_address: this.formData.detailed_address,
                    postcode: this.formData.postcode,
                    phone: this.formData.phone,
                    defaultAddress: this.formData.defaultAddress,

                }
                console.log(JSON.stringify(address));
                console.log(sessionStorage.getItem('id'));
                axios.post(globalVar.HOST_NAME+"/user/addaddress",{
                    user_id:sessionStorage.getItem('id'),
                    address:JSON.stringify(address),
                })
                    .then(response => {
                        if (response.data.code === "200") {
                            this.$message({
                                message: '操作成功',
                                center: true,
                                showClose: true,
                                type: 'success'
                            });
                            this.load();
                            this.formData.area='';
                            this.formData.addressee='';
                            this.formData.phone='';
                            this.formData.postcode='';
                            this.formData.detailed_address='';
                            this.formData.defaultAddress=0;
                        }

                    })
                    .catch(error => {
                        console.log(error);
                    })
            }else{
                let address;
                console.log("修改")
                console.log(this.formData);
                if(this.formData.area==null){
                    address = {
                        id:this.formData.id,
                        addressee: this.formData.addressee,
                        province:this.formData.province,
                        city:this.formData.city,
                        county:this.formData.county,
                        detailed_address: this.formData.detailed_address,
                        postcode: this.formData.postcode,
                        phone: this.formData.phone,
                        defaultAddress: this.formData.defaultAddress,

                    }
                }
                else {
                    address = {
                        id:this.formData.id,
                        addressee: this.formData.addressee,
                        province:this.formData.area[0],
                        city:this.formData.area[1],
                        county:this.formData.area[2],
                        detailed_address: this.formData.detailed_address,
                        postcode: this.formData.postcode,
                        phone: this.formData.phone,
                        defaultAddress: this.formData.defaultAddress,

                    }
                }

                console.log("----------");
                console.log(address);
                axios.post(globalVar.HOST_NAME+"/user/updateaddress",{
                    user_id:sessionStorage.getItem('id'),
                    address:JSON.stringify(address),
                })
                    .then(response => {
                        console.log(response.data.code);
                        if (response.data.code === "200") {
                            this.$message({
                                message: '操作成功',
                                center: true,
                                showClose: true,
                                type: 'success'
                            });
                            this.load();
                        }

                    })
                    .catch(error => {
                        console.log(error);
                    })
            }

        }


    }
}

</script>

<style scoped>
.box {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.square {
    width: 800px;
    height: auto;
    border: 1px solid black;
    padding: 30px;
}

.width {
    width: 400px;
}
</style>
