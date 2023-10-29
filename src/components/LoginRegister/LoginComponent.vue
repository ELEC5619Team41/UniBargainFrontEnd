<template>
  <div>
    <p style="font-weight: bold; font-size: 40px; margin-left: 150px">
      {{ $t("Login") }}
    </p>
    <div style="display: flex">
      <div>
        <LabelTextField :text="$t('EmailAddress')" v-model:inputText="this.email"></LabelTextField>
        <LabelTextField :text="$t('Password')" :isPassword="true" v-model:inputText="password"></LabelTextField>

        <div style="display: flex; margin: 10px; margin-top: 30px">
          <div style="
              width: 300px;
              text-align: right;
              margin-top: 8px;
              margin-right: 20px;
              flex-shrink: 0;
            "></div>
          <RoundCornerButton :text="'Login'" @button-click="requestLogin"></RoundCornerButton>
        </div>

        <div style="display: flex; margin: 10px">
          <div style="
              width: 300px;
              text-align: right;
              margin-right: 20px;
              flex-shrink: 0;
            "></div>
          <ClickableText @text-trigger="$emit('change-to-login')" :text="$t('NotHaveAccount')"></ClickableText>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ClickableText from "../Common/ClickableText.vue";
import LabelTextField from "../Common/LabelTextField.vue";
import RoundCornerButton from "../Common/RoundCornerButton.vue";
import SendRequestComponent from "@/components/Common/SendRequestComponent";
export default {
  name: "LoginComponent",
  components: {
    ClickableText,
    LabelTextField,
    RoundCornerButton,

    SendRequestComponent
  },
  data() {
    return {
      email: '',
      password: '',
      url: '/user/login'
    };
  },
  emits: ["change-to-login"],
  methods: {
    requestLogin() {
      console.log('email', this.email, ', password', this.password);
      this.SendLoginRequest();


    },
    SendLoginRequest() {

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var data = { "username": this.email, "password": this.password };

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(data),
        redirect: 'follow'
      };

      fetch("http://localhost:28888/user/login", requestOptions)
        .then(response => response.json())
        .then(data => {
          if (data.code == 400) {
            this.$message({
              message: 'Wrong username or password',
              type: 'warning'
            });
            return;
          }
          console.log(data)
          this.$store.commit('update', { "username": this.email, "token": data.data['token'], "id": data.data.id });
          this.$router.push('/userhome/userhomepage');
        })
        .catch(error => console.log('error', error));
    }// send request to back end
  }
};
</script>