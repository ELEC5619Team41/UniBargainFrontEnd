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
      <b-alert v-model="showDismissibleAlert" variant="danger" dismissible>
        Dismissible Alert!
      </b-alert>


    </div>


    <div class="division">
      <h3>item description</h3>
      <input style="width: 80%; align-items: center; height: 100px; margin-bottom: 50px; border-radius: 10px; border: gray solid" type="text">
    </div>

    <div class="division" >
      <h3 style="left: ">item image</h3>
      <div >
        add image
      </div>
    </div>

    <div class="division">
      <div style="display: flex; flex-direction: row">

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
      <div>
        <h3>address</h3>
      </div>
      <input style="width: 80%; align-items: center; height: 100px; margin-bottom: 50px; border-radius: 10px; border: gray solid" type="text">
    </div>

    <div class="division" style="float: bottom ; display: flex">
      <round-corner-button text="submit" style="margin-left: 20%"></round-corner-button>
      <round-corner-button text="cancel" style="margin-left: 40%; margin-right: 20%"></round-corner-button>

    </div>




  </div>
</template>
<script>
import RoundCornerButton from "@/components/Common/RoundCornerButton";
export default {
  name: "PublishIdlePage",
  components: {RoundCornerButton},
  methods:{
    Submit(){

    }
  }
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