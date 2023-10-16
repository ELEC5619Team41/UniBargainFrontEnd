<template>

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
  }
}
</script>

<style scoped>

</style>