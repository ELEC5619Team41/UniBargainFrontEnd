<template>
  <div class="horizontal-layout">
    <div style="width: 35%; height: 100%; background-color: rgb(180, 180, 180)"></div>
    <div class="parent-container" style="width: 65%; height: 100%; background-color: white">
      <LoginComponent v-if="isLoginInterface" @change-to-login="setLoginRegister"></LoginComponent>
      <RegisterComponent v-else @change-to-login="setLoginRegister"></RegisterComponent>
    </div>
  </div>
</template>

<script>
import RegisterComponent from "../components/LoginRegister/RegisterComponent.vue";
import LoginComponent from "@/components/LoginRegister/LoginComponent.vue";
import SendRequestComponent from "@/components/Common/SendRequestComponent";
export default {
  name: "loginregister",
  components: {
    RegisterComponent, LoginComponent,SendRequestComponent
  },
  data() {
    return{
      isLoginInterface: true
    }
  },
  methods:{
    setLoginRegister(){
      this.isLoginInterface = !this.isLoginInterface
    },
  }
};
</script>

<style scoped>
.parent-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>