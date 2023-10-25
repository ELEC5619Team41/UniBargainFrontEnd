<template>

  <div class="post">
    <div class="owner">
      <div style="width: 10%; height: 20px;" >
        <img :src="post.UserImageUrl" style="height: 30px;width: 30px">
      </div>
      <div style="margin-left: 10px"><div>{{this.post.UserName}}</div></div>
      <div style="margin-left: 60%"> <el-button class="centerButton" @click="ReDirect"> chat now</el-button></div>
    </div>
    <div class="post">
      <div style="margin-top: 15px"><div style="display: inline-flex">{{this.post.PostName}}</div> </div>
      <div style="display: inline-flex"><div>{{this.post.PostMsg}}</div></div>
      <div style="display: flex; flex-direction: row; align-items: center">
<!--        <div v-for="pic in this.post.PostPictureUrl">-->
<!--          <img src="{{pic}}" alt="item_image">-->
<!--        </div>-->
        <PictureViewer :ItemId = post.ItemId :ItemUrl = post.ItemUrl></PictureViewer>
      </div>

    </div>
    <div class="comment">
      <div>comment</div>
      <div class="commentItem" v-for="comment in this.post.Comment">
        <div style="display: inline-flex"><div class="words">{{comment.name}}</div> <div style="margin-left: auto">{{comment.time}}</div></div>
        <div style="display: inline-flex">
          <div>{{comment.content}}</div></div>
      </div>
    </div>
  </div>
</template>

<script>
import PictureViewer from "@/components/Common/PictureViewer";
import { useRoute } from 'vue-router';
export default {
  name: "UserPost",
  components:{
    PictureViewer
  },
  props: {
    post:Object

      },
  methods:{
    ReDirect()
    {
      this.$router.push({name:'messages', query:{UserID:this.post.UserID}}).then(()=>{
        this.$router.go()
      });
    },
  },
  data(){
    return{
      defaultMessage:'hello,I want to talk about the trade'
    }
  }

  // mounted()
  // {
  //   console.log(this.post);
  // }
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
.words{
  font-family: Arial, sans-serif;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  line-height: 1.5;


}
button:hover {background-color: rgb(209,209,209);}
</style>