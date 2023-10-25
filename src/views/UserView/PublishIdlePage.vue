<template>

  <div  class="commentField">
    <el-form :model="form" label-width="120px">
        <el-form-item label="Item Name">
          <el-input v-model="this.form.name" />
        </el-form-item>
        <el-form-item label="Item Price">
          <el-input v-model="this.form.price" />
        </el-form-item>
        <!-- <el-col :span="4"><div>Mailing method</div><el-cascader :options="option" v-model="mailMethod"></el-cascader> </el-col> -->

        <el-form-item label="Item Description">    
          <el-input
            v-model="this.form.description"
            type="textarea"
            />
        </el-form-item>



    <el-row justify="space-between">
      <el-col :span="24"><div>Upload item images</div>
      <file-upload-component @show-image="receiveEmit"></file-upload-component></el-col>
    </el-row>

    <!-- <el-row justify="space-between">
      <el-col :span="4"><div>Brand</div><el-input ></el-input></el-col>
      <el-col :span="4"><div>Quality</div><el-input ></el-input></el-col>
      <el-col :span="4"><div>Sale Status</div><el-cascader :options="status" v-model="statusValue"></el-cascader></el-col>
    </el-row> -->
    <!-- <el-row>
      <el-col :span="24" ><address-block-component :input-data="[]"></address-block-component></el-col>
    </el-row> -->

    <el-form-item>
      <el-col :span="4"><el-button>Cancel</el-button></el-col>
      <el-col :span="4"><el-button @click="Submit">Submit</el-button></el-col>
    </el-form-item>
  </el-form>
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
    receiveEmit(input){
      this.form.images = input;
    },
    Submit(){
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("username", this.$store.state.username);
      myHeaders.append("token", this.$store.state.token);

      var data = {"info": {
        "name" : this.form.name,
        "price" : this.form.price,
        "description" : this.form.description,
        "images" : this.form.images,
      }};


      var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(data),
      redirect: 'follow'
      };

      fetch("http://localhost:28888/product/add", requestOptions)
      .then(response => response.json())
      .then(data => {
          console.log(data);
          var url = '/userhome/itemdetailpage/'+data.data["id"];
          console.log(url);
          this.$router.push(url);
      })
      .catch(error => console.log('error', error));
    }
  },
  data()
  {
    return{
      form: {
        name: '',
        price: 0,
        description: '',
        images: [],
      },
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