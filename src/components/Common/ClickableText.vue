<template>
  <p
    @click="$emit('text-trigger')"
    :style="{ fontSize: this.size , textDecoration: this.decoration, color: this.color, cursor: 'pointer'}"
  >
    {{ text }}
  </p>
</template>

<script>
export default {
  name: "ClickableText",
  props: {
    text: {
      type: String,
      default: "",
    },
    size: {
      type: String,
      default: "15px",
    },
    decoration: {
      type: String,
      default: "underline",
    },
    color: {
      type: String,
      default: "black",
    },
  },
  emits: ['text-trigger'],
};
</script>
