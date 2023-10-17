<template>

    <div style="display: flex; width: 100%; position: relative; flex-direction: column; padding-bottom: 5rem" class="transacationEndContainer">
        <TransactionResultComponent :sucess=true></TransactionResultComponent>
    </div>
  
  </template>
  
  <script>
 
  import TransactionResultComponent from "@/components/TransactionResultComponent.vue";
  
  export default {
    name: "TransactionEndPage",
    components:{
      TransactionResultComponent
    }
  
  }
  </script>
  
  <style scoped>
  
  </style>