<template>

  <div  class="commentField">
    <el-row justify="space-between">
      <el-col :span="4" ><div>Item Name</div><el-input v-model="ItemName"></el-input></el-col>
      <el-col :span="4"><div>Price</div> <el-input v-model="ItemPrice" type="number"></el-input></el-col>
      <el-col :span="4"><div>Mailing method</div><el-cascader :options="option" v-model="mailMethod"></el-cascader> </el-col>
    </el-row>

    <el-row justify="space-between">
      <el-col :span="24"><div>Item Description</div>
      <el-input v-model="ItemDescription"></el-input></el-col>
    </el-row>

    <el-row justify="space-between">
      <el-col :span="24"><div>Item Image</div>
        <el-upload
            ref="upload"
            class="upload-demo"
            v-model:file-list="FileList"
            list-type="picture-card"
            :on-preview="OnPreview"
            :on-remove="OnRemove"
            :auto-upload="false"
            :on-change="change"
        >
        </el-upload>
        <el-dialog v-model="dialogVisible">
          <img w-full :src="ImageUrl" alt="Preview Image" />
        </el-dialog>
      </el-col>
    </el-row>

    <el-row justify="space-between">
      <el-col :span="4"><div>Brand</div><el-input v-model="ItemBrand"></el-input></el-col>
      <el-col :span="4"><div>Quality</div><el-cascader :options="status" v-model="statusValue"></el-cascader></el-col>
      <el-col :span="4"><div>Sale Status</div>

        <el-date-picker
            v-model="date"
            type="date"
            placeholder="Pick a day"
            v-on:change="CheckTime"
        />
        <el-alert title="input the right time" type="error" effect="dark" v-if="timeAlert"/>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24" ></el-col>
    </el-row>

    <el-row justify="center">
      <el-col :span="4"><el-button>Cancel</el-button></el-col>
      <el-col :span="4"><el-button v-on:click="Submit">Submit</el-button></el-col>
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

      var myHeaders = new Headers();
      myHeaders.append("username", this.$store.state.username);
      myHeaders.append("token", this.$store.state.token);
      myHeaders.append("Content-Type", "application/json");
      const formData = new FormData();
      if (this.DataList) {
        this.DataList.forEach((item) => {
          // console.log(item)
          formData.append("picture", item);
        });
      }
      var raw = {
        info:{
          mailMethod:this.mailMethod,
          statusValue:this.statusValue,
          ItemName:this.itemName,
          ItemPrice:this.ItemPrice,
          ItemDescription:this.ItemDescription,
          ItemBrand:this.ItemBrand,
          date:this.date,
          FormData:formData
        }
      }

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(raw),
        redirect: 'follow'
      };

      fetch("http://localhost:28888/product/add", requestOptions)
          .then(response => response.text())
          .then(result => console.log(result))
          .catch(error => console.log('error', error));

    },
    CheckTime(e)
    {
      if(new Date(this.date)>Date.now()-86400000)
      {
        this.date='';
        this.timeAlert = true
      }
    },
    change(file,fileList)
    {
      var arr= [];
      fileList.forEach((item) => {
        arr.push(item.raw);
      });
      this.DataList = arr;
      console.log(this.DataList);
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
      statusValue:'new',
      ItemName:'',
      ItemPrice:'',
      ItemDescription:'',
      ItemBrand:'',
      date:'',
      timeAlert:false,
      FileList:[],
      DataList:[]
    }
  },

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