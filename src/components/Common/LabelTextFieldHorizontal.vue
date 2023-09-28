<template>
  <div class="item">
    <div class="label">{{ text }}</div>
    <div style="display: flex;">
      <input :type="isPassword ? 'password' : ''" class="content"
        @input="$emit('update:inputText', $event.target.value);" :value="defaultValue" />
    </div>

  </div>
</template>
  
  
<script>
export default {
  name: "LabelTextFieldHorizontal",
  props: {
    text: {
      type: String,
      default: "",
    },
    isPassword: {
      type: Boolean,
      default: false,
    },
    defaultValue: {
      type: String,
      default: "",
    },
  },

};
</script>
  
<style scoped>
.item {
  margin-top: 10px;
  margin-bottom: 10px;
}

.label {
  text-align: left;
  margin-top: 12px;
  font-weight: bolder;
  color: black;
  font-size: 25px;
}

.content {

  height: 40px;
  width: 100%;
  border-radius: 5px;
  background-color: rgb(244, 244, 244);
  outline: none;
  border: none;

  padding-left: 20px;
}
</style>