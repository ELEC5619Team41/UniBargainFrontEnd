<template>

<!--  <input type="file" @change="AddImage" multiple="multiplt" >-->
  <el-upload
      ref="upload"
      class="upload-demo"
      v-model:file-list="Image"
      list-type="picture-card"
      :on-preview="OnPreview"
      :on-remove="OnRemove"
      :auto-upload="false"
      :on-change = "AddImage"
  >
  </el-upload>
  <el-dialog v-model="dialogVisible">
    <img w-full :src="ImageUrl" alt="Preview Image" />
  </el-dialog>
</template>

<script>

import SendRequestComponent from "@/components/Common/SendRequestComponent";
import { read } from "@popperjs/core";

export default {
  name: "FileUploadComponent",
  components: {
    SendRequestComponent
  },

  methods:{
    uploadFile(url,header,body)
    {
      SendRequestComponent.method.Request(url,'post',body,header);
    },
    deleteFile(url,header,body)
    {
      SendRequestComponent.method.Request(url,'delete',body,header);
    },
    AddImage(e)
    { 
       console.log(e);
       if(e){
        this.Image.push(e.url);
        var reader = new FileReader();
        reader.readAsDataURL(e.raw);
        reader.onload= (event)=>{
          this.img.push(event.target.result);
        }
       }
       this.$emit('show-image', this.img);
    },
    OnPreview(uploadFile)
    {
      this.dialogVisible=true;
      this.ImageUrl=uploadFile.url;

    },
    OnRemove(uploadFile,uploadFiles)
    {
      console.log(uploadFile,uploadFiles);
      console.log(this.img);

    },
    get(){
      return this.img;
    }
  }
  ,
  data()
  {
    return{
      Image:[
      ],
      ImageUrl:'',
      dialogVisible:false,
      img:[

      ]


    }
  }
}
</script>

<style scoped>

</style>