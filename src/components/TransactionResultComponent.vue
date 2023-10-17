<template>

    <div style="display: flex; width: 100%; position: relative; flex-direction: column; padding-bottom: 5rem" class="transacationEndContainer">

        <h2 style="flex-direction: column; display: inline-flex;  margin-top: 80px;" v-if="this.sucess">Payment sucessed!</h2>
        <h2 style="flex-direction: column; display: inline-flex;  margin-top: 80px;" v-else>Payment failed.</h2>
        <h2 style="flex-direction: column; display: inline-flex;  margin-top: 10px;" v-if="this.sucess">Thank you for purchasing!</h2>
        <h2 style="flex-direction: column; display: inline-flex;  margin-top: 10px;" v-else>Please try again or contact our staff for further clarification for this payment failure.</h2>
        <div class="buttonContainer" style="margin-top: 20px"> 
            <router-link :to="{ path: '/userhome/userhomepage' }" ><round-corner-button  text="Back to home page"></round-corner-button></router-link>
            <router-link :to="{ path: '/userhome/usershoppingcartpage' }" style="margin-left:100px"><round-corner-button  text="Back to shopping cart" ></round-corner-button></router-link>
        </div>
    </div>
  
  </template>

<script>

import RoundCornerButton from "@/components/Common/RoundCornerButton";
export default {
    
    name: "TransactionResultComponent",
    components:{
      RoundCornerButton
    },
    props: {
        sucess: {
            type: Boolean,
            required: true
        }
    }
};
</script>