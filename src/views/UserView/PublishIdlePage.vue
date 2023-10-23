<template>

  <div  class="commentField">
    <el-row justify="space-between">
      <el-col :span="4" ><div>Item Name</div><el-input ></el-input></el-col>
      <el-col :span="4"><div>Price</div> <el-input ></el-input></el-col>
      <el-col :span="4"><div>Mailing method</div><el-cascader :options="option" v-model="mailMethod"></el-cascader> </el-col>
    </el-row>

    <el-row justify="space-between">
      <el-col :span="24"><div>Item Description</div>
      <el-input ></el-input></el-col>
    </el-row>

    <el-row justify="space-between">
      <el-col :span="24"><div>Item Image</div>
      <file-upload-component></file-upload-component></el-col>
    </el-row>

    <el-row justify="space-between">
      <el-col :span="4"><div>Brand</div><el-input ></el-input></el-col>
      <el-col :span="4"><div>Quality</div><el-input ></el-input></el-col>
      <el-col :span="4"><div>Sale Status</div><el-cascader :options="status" v-model="statusValue"></el-cascader></el-col>
    </el-row>
    <el-row>
      <el-col :span="24" ><address-block-component :input-data="[]"></address-block-component></el-col>
    </el-row>

    <el-row justify="center">
      <el-col :span="4"><el-button>Cancel</el-button></el-col>
      <el-col :span="4"><el-button>Submit</el-button></el-col>
    </el-row>
  </div>
</template>
<script>
import RoundCornerButton from "@/components/Common/RoundCornerButton";
import AddressBlockComponent from "@/components/UserProfile/AddressBlockComponent";
import FileUploadComponent from "@/components/Common/FileUploadComponent";
export default {
  name: "PublishIdlePage",
  components: {FileUploadComponent, AddressBlockComponent, RoundCornerButton},
  methods:{
    Submit(){

    }
  },
  data()
  {
    return{
      option:[
        {value:'mail',
          label:'mail'
        },
        {
          value: 'pickup',
          label: 'pick up'
        }
      ],
      status:[
        {value:'new',
          label:'new'
        },
        {value:'few flaw',
          label:'few flaw'
        },
        {value:'used',
          label:'used'
        },
      ],
      mailMethod:'mail',
      statusValue:'new'
    }
  }
}
</script>

<style scoped>
.item-basic-info
{
  display: flex;
  flex-direction: row;

}
.commentField {
  align-items: left;
  width: 80%;
  height: 180px;
  margin-bottom: 5px;
  margin-top: 5px;
}
.item-basic-info-element {
  display: flex;
  flex-direction: column;
  border: gray 2px solid;
  border-radius: 10px;
  margin-left: 10%;
  width: 200px;
}
.info-input{
  border-radius:5px;
  height: 20px;
  border: 1px gray solid;
  margin-bottom: 15px;
  margin-left: 15px;
  margin-right: 15px;

}
.division_basic_info
{


}

.division{
  /*border: gray solid;*/
  margin-top: 15px;
}

.el-row{
  margin-bottom: 20px;
}
</style>