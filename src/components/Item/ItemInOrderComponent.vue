<template>

  <div class="commentField" style="margin-left: 20px; margin-left: 20px;">
    <div style="display: flex;">
      <div style="height: 35px; display: flex; align-items: center;">
        {{ $t('OrderNumber') }} {{ this.item.orderNumber }}
      </div>
      <div style="text-align: right; margin-left: auto; display: flex;">
        <div style="width: 35px; height: 35px; background-color: blue; margin-right: 5px;"></div>
        <div style="height: 35px; display: flex; align-items: center;">
          {{ this.item.username }}
        </div>
      </div>
    </div>

    <div style="margin-top: 10px; display: flex;">
      <div style="width: 15%; aspect-ratio: 1/1; background-color: aqua;"></div>
      <div class="textField" style="width: 85%;">
        <div>{{ this.item.itemName }}</div>
        <div>{{ this.item.orderDate }}</div>
        <div style="position: absolute;bottom: 0; display: flex; width: 100%;">
          <div>{{ this.item.itemPrice }}</div>
          <!-- <div style="right: 0; position: absolute;">Hello</div> -->
<!--          <RoundCornerButton style="right: 0; bottom: 0; position: absolute;" :width="'100px'" :height="'40px'"-->
<!--                             :text="tagKeyPairs[this.item.status]"></RoundCornerButton>-->
        </div>

      </div>


    </div>


  </div>
</template>

<script>
export default {
  name: "ItemInOrderComponent",
  props: {
    item: {
      type: Object,
      required: true
    }
  },
}
</script>

<style scoped>
.commentField {
  align-items: left;
  width: 80%;
  height: 180px;
  margin-bottom: 5px;
  margin-top: 5px;
}

.textField {
  margin-left: 5px;
  position: relative;
}

.textField>* {
  text-align: left;
}
</style>