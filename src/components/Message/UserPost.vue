<template>

  <div class="post">
    <div class="owner">
      <div style="width: 10%; height: 20px; background-color: #42b983;">
<!--        <img src="" alt="userimage">-->
       <div></div>
      </div>
      <div style="margin-left: 10%"><h2>{{this.post.UserName}}</h2></div>
      <div style="margin-left: 60%"> <button class="centerButton"> chat </button></div>
    </div>
    <div class="post">
      <div style="margin-top: 15px"><h2 style="display: inline-flex">{{this.post.PostName}}</h2> </div>
      <div style="display: inline-flex"><h2>{{this.post.PostMsg}}</h2></div>
      <div style="display: flex; flex-direction: row; align-items: center">
<!--        <div v-for="pic in this.post.PostPictureUrl">-->
<!--          <img src="{{pic}}" alt="item_image">-->
<!--        </div>-->
        <div style="width: 100%; height: 500px;background-color: #42b983; ">
          <div></div>
        </div>
      </div>

    </div>
    <div class="comment">
      <h2> comment</h2>
      <div class="commentItem" v-for="comment in this.post.Comment">
        <div style="display: inline-flex"><h3 ref="">{{comment.name}}</h3> <h3 style="margin-left: auto">{{comment.time}}</h3></div>
        <div style="display: inline-flex">
          <h3>{{comment.content}}</h3></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserPost",
  props: {
    post:Object

      }
  //     {
  //   UserName:{
  //     type:String,
  //     required:true,
  //   },
  //   UserImageUrl:{
  //     type:Object,
  //     required:true,
  //   },
  //   PostName:{
  //     type:Object,
  //     required: true,
  //   },
  //   PostPictureUrl:{
  //     type:Array,
  //   },
  //   PostMsg:{
  //     type:Object,
  //     required:true,
  //   },
  //
  //   Comment:{
  //     type:Array
  //   },
  // },

}
</script>

<style scoped>
.owner{
  display: flex;
  flex-direction: row;
}
.post{
  margin-top: 15px;
  display: flex;
  flex-direction: column;

}
.comment{
  display: flex;
  flex-direction: column;
}
.commentItem{
  display: flex;
  flex-direction: column;
  background-color: rgb(241,241,241);
  margin-top: 15px;
}
.centerButton {
  padding: 15px;
  width: 100%;
  background-color: rgb(241, 241, 241);
  /* outline: none; */
  border: none;
}
button:hover {background-color: rgb(209,209,209);}
</style>