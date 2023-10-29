<template>
  <button class="button" type="button" :style="{'width': width, 'height': height}" @click="$emit('button-click')">{{ text }}</button>
</template>

<script>
export default {
  name: "RoundCornerButton",
  props: {
    text: {
      type: String,
      default: "Button",
    },
    width: {
      type: String,
      default: "300px",
    },
    height: {
      type: String,
      default: "50px",
    },
  },
  emits: ['button-click']
};
</script>

<style scoped>
.button {
  background-color: #7dd1df;
  border: none;
  outline: none;
  width: 300px;
  height: 50px;
  border-radius: 5px;
  color: white;
}
</style>