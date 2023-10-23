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
  >
  </el-upload>
  <el-dialog v-model="dialogVisible">
    <img w-full :src="ImageUrl" alt="Preview Image" />
  </el-dialog>
</template>

<script>

import SendRequestComponent from "@/components/Common/SendRequestComponent";

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
       const file = e.target.files||e.dataTransfer.files;
       Image.push(file);
       console.log(file);
    },
    OnPreview(uploadFile)
    {
      this.dialogVisible=true;
      this.ImageUrl=uploadFile.url;

    },
    OnRemove(uploadFile,uploadFiles)
    {
      console.log(uploadFile,uploadFiles);

    },
  }
  ,
  data()
  {
    return{
      Image:[
        {
          name:'2',
          src:'../favicon.ico',
        },
        {
          name:'1',
          src: '../1.webp',
        }
      ],
      ImageUrl:'',
      dialogVisible:false


    }
  }
}
</script>

<style scoped>

</style>