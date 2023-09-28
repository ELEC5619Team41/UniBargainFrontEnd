<template>
  <div class="item">
    <div class="label">{{ text }}</div>
    <input
      :type="isPassword ? 'password' : ''"
      class="content"
      @input="$emit('update:inputText', $event.target.value)"
    />
  </div>
</template>


<script>
export default {
  name: "LabelTextField",
  props: {
    text: {
      type: String,
      default: "",
    },
    isPassword: {
      type: Boolean,
      default: false,
    }
  }
};
</script>

<style scoped>
.item {
  display: flex;
  margin: 20px;
}

.label {
  width: 300px;
  text-align: right;
  margin-top: 12px;
  margin-right: 10px;
  flex-shrink: 0;
  font-size: 20px;
}

.content {
  flex: auto;
  padding: 2px;
  width: 300px;
  height: 40px;
  border-radius: 5px;
  background-color: rgb(244, 244, 244);
  outline: none;
  border: none;

  padding-left: 20px;
}
</style>