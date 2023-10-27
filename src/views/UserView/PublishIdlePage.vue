<template>
  <div>
    <div style="margin-top: 25px;">
      <div v-if="this.postAsItem" style="font-size: 45px;">{{ $t('UploadYourNewItem') }}</div>
      <div v-else style="font-size: 45px;">{{ $t('UploadYourNewRequest') }}</div>
    </div>
    <div class="commentField">
      <el-form :model="form" label-width="120px">
        <el-form-item label="Item Name">
          <el-input v-model="this.form.name" />
        </el-form-item>
        <el-form-item label="Item Price">
          <el-input v-model="this.form.price" :type="'number'" />
        </el-form-item>

        <el-form-item label="Item Description">
          <el-input v-model="this.form.description" type="textarea" :autosize="true" />
        </el-form-item>



        <el-row justify="space-between">
          <el-col :span="24">
            <div>Upload item images</div>
            <file-upload-component @show-image="receiveEmit"></file-upload-component>
          </el-col>
        </el-row>

        <el-switch v-model="this.postAsItem" :active-text="$t('PostItem')" :inactive-text="$t('PostRequest')" />
        <div>
          <RoundCornerButton @button-click="Submit" :text="$t('Post')"></RoundCornerButton>
        </div>
      </el-form>
    </div>

  </div>
</template>
<script>
import RoundCornerButton from "@/components/Common/RoundCornerButton";
import AddressBlockComponent from "@/components/UserProfile/AddressBlockComponent";
import FileUploadComponent from "@/components/Common/FileUploadComponent";

export default {
  name: "PublishIdlePage",
  components: { FileUploadComponent, AddressBlockComponent, RoundCornerButton },
  methods: {
    receiveEmit(input) {
      console.log('add image')
      this.form.images.push(input);
    },
    async Submit() {

      if (this.form.name == '' || this.form.description == '' || this.form.images.length == 0) {
        alert("Please fill in all the information");
        return;
      }
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("username", this.$store.state.username);
      myHeaders.append("token", this.$store.state.token);

      var data = {
        "info": {
          "name": this.form.name,
          "price": this.form.price,
          "description": this.form.description,
          "images": this.form.images,
        }
      };


      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(data),
        redirect: 'follow'
      };

      if (this.postAsItem) {
        var localData;
        await fetch("http://localhost:28888/product/add", requestOptions)
          .then(response => response.json())
          .then(data => {
            console.log(data);
            localData = data;
          })
          .catch(error => console.log('error', error));

        var url = '/userhome/itemdetailpage/' + localData.data["id"];
        this.$router.push(url);
      } else {
        await fetch("http://localhost:28888/things/add", requestOptions)
          .then(response => response.json())
          .then(data => {
            console.log(data);
            var url = '/userhome/seektradepage/';
            this.$router.push(url);
          })
          .catch(error => console.log('error', error));
      }
    }
  },
  data() {
    return {
      form: {
        name: '',
        price: 0,
        description: '',
        images: [],
      },
      postAsItem: true,
    }
  }
}
</script>

<style scoped>
.item-basic-info {
  display: flex;
  flex-direction: row;

}

.commentField {
  align-items: left;
  width: 100%;
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

.info-input {
  border-radius: 5px;
  height: 20px;
  border: 1px gray solid;
  margin-bottom: 15px;
  margin-left: 15px;
  margin-right: 15px;

}

.division_basic_info {}

.division {
  /*border: gray solid;*/
  margin-top: 15px;
}

.el-row {
  margin-bottom: 20px;
}
</style>