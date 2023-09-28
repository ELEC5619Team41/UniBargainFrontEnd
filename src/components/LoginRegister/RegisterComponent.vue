<template>
  <div>
    <p style="font-weight: bold; font-size: 40px; margin-left: 150px">
      {{ $t("CreateANewAccount") }}
    </p>

    <div style="display: flex">
      <div>
        <LabelTextField :text="$t('Username')" v-model:inputText="this.form.username"></LabelTextField>
        <LabelTextField :text="$t('EmailAddress')" v-model:inputText="this.form.email"></LabelTextField>
        <LabelTextField :text="$t('Password')" :isPassword="true" v-model:inputText="this.form.password"></LabelTextField>
        <LabelTextField :text="$t('ConfirmPassword')" :isPassword="true" v-model:inputText="this.form.confirmPassword">
        </LabelTextField>
        <BirthDaySelect v-model:year="this.form.year" v-model:month="this.form.month" v-model:day="this.form.day">
        </BirthDaySelect>
        <LabelTextField :text="$t('Gender')" v-model:inputText="this.form.gender"></LabelTextField>

        <div style="display: flex; margin: 10px">
          <div style="
              width: 300px;
              text-align: right;
              margin-right: 20px;
              flex-shrink: 0;
            "></div>
          <input type="checkbox" v-model="this.form.agreement" />
          <label style="margin-left: 15px; font-size: 15px">{{
            $t("Agreement")
          }}</label>
        </div>

        <div style="display: flex; margin: 10px; margin-top: 30px">
          <div style="
              width: 300px;
              text-align: right;
              margin-top: 8px;
              margin-right: 20px;
              flex-shrink: 0;
            "></div>
          <RoundCornerButton :text="'Submit'" @button-click="requestRegister"></RoundCornerButton>
        </div>

        <div style="display: flex; margin: 10px">
          <div style="
              width: 300px;
              text-align: right;
              margin-right: 20px;
              flex-shrink: 0;
            "></div>
          <ClickableText @text-trigger="$emit('change-to-login')" :text="$t('HaveAccount')"></ClickableText>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LabelTextField from "../Common/LabelTextField.vue";
import RoundCornerButton from "../Common/RoundCornerButton.vue";
import BirthDaySelect from "./BirthDaySelect.vue";
import ClickableText from "../Common/ClickableText.vue";
export default {
  name: "RegisterComponent",
  components: {
    LabelTextField,
    RoundCornerButton,
    BirthDaySelect,
    ClickableText,
  },
  emits: ["change-to-login"],
  data() {
    return {
      form: {
        agreement: false,
        year: 1990,
        month: 1,
        day: 1,
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        gender: "",
      },
    };
  },
  methods: {
    requestRegister() {
      console.log(this.form);
    },
  },
};
</script>