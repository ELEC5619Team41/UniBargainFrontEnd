<template>

  <div class="commentField" style="padding-bottom: 5rem; display: flex; flex-direction: column">
    <div class="division">
      <div class="item-basic-info">
        <div class="item-basic-info-element">
          <h3>basic information</h3>
          <input class="info-input" type="text">
        </div>

        <div class="item-basic-info-element">
          <h3>basic information</h3>
          <input class="info-input" type="text">
        </div>

        <div class="item-basic-info-element">
          <h3>basic information</h3>
          <input class="info-input" type="text">
        </div>
      </div>
    </div>


    <div class="division">
      <h3>item description</h3>
      <input style="width: 80%; align-items: center; height: 100px; margin-bottom: 50px; border-radius: 10px; border: gray solid">
    </div>

    <div class="division">
      <h3>item image</h3>
    </div>

    <div class="division">
      <h3>item image</h3>
    </div>





  </div>
</template>
<script>
export default {
  name: "PublishIdlePage"
}
</script>

<style scoped>
.item-basic-info
{
  display: flex;
  flex-direction: row;

}
.commentField {
  align-items: left;
  width: 80%;
  height: 180px;
  margin-bottom: 5px;
  margin-top: 5px;
}
.item-basic-info-element {
  display: flex;
  flex-direction: column;
  border: gray 2px solid;
  border-radius: 10px;
  margin-left: 10%;
  width: 200px;
}
.info-input{
  border-radius:5px;
  height: 20px;
  border: 1px gray solid;
  margin-bottom: 15px;
  margin-left: 15px;
  margin-right: 15px;

}
.division_basic_info
{


}

.division{
  /*border: gray solid;*/
  margin-top: 15px;
}
</style>