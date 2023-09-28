<template>
  <div>
    <p style="font-weight: bold; font-size: 40px; margin-left: 150px">
      {{ $t("Login") }}
    </p>
    <div style="display: flex">
      <div>
        <LabelTextField :text="$t('EmailAddress')" v-model:inputText="this.email"></LabelTextField>
        <LabelTextField
          :text="$t('Password')"
          :isPassword="true"
          v-model:inputText="password"
        ></LabelTextField>

        <div style="display: flex; margin: 10px; margin-top: 30px">
          <div
            style="
              width: 300px;
              text-align: right;
              margin-top: 8px;
              margin-right: 20px;
              flex-shrink: 0;
            "
          ></div>
          <RoundCornerButton :text="'Login'" @button-click="requestLogin"></RoundCornerButton>
        </div>

        <div style="display: flex; margin: 10px">
          <div
            style="
              width: 300px;
              text-align: right;
              margin-right: 20px;
              flex-shrink: 0;
            "
          ></div>
          <ClickableText
            @text-trigger="$emit('change-to-login')"
            :text="$t('NotHaveAccount')"
          ></ClickableText>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ClickableText from "../Common/ClickableText.vue";
import LabelTextField from "../Common/LabelTextField.vue";
import RoundCornerButton from "../Common/RoundCornerButton.vue";
export default {
  name: "LoginComponent",
  components: {
    ClickableText,
    LabelTextField,
    RoundCornerButton,
  },
  data() {
    return {
        email: '',
        password: '',
    };
  },
  emits: ["change-to-login"],
  methods:{
    requestLogin(){
        console.log('email', this.email, ', password', this.password)
        this.$router.push('/userhome')
    }
  }
};
</script>