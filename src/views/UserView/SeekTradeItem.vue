<template>

<div class="commentField">
  <div style="margin-top: 10px">
    <TopSearchBar></TopSearchBar>
  </div>

  <div style="display: flex; flex-direction: row">
    <div >
      <button class="centerButton">discovery</button>
      <button class="centerButton">discovery</button>
      <button class="centerButton">discovery</button>
    </div>

    <div class="right-section" v-if="PostData">
      <div  v-for="postItem in PostData" style="margin-top: 15px" >
        <UserPost :post="postItem"
                  ></UserPost>
      </div>

    </div>
  </div>

</div>
</template>

<script>
import TopSearchBar from "@/components/Common/TopSearchBar";
import UserPost from "@/components/Message/UserPost";

export default {
  name: "SeekTradeItem",

  components:{
    TopSearchBar,UserPost

  },
  data() {
    return {
      PostData: [{
      UserName:"DJ",
          UserImageUrl: "./assets/logo.png",
          PostName: "Relx5",
          PostMsg: "idle relx5,good price and quality",
          Comment:
      [
        {
          name: "wang ape",
          content: "traditional cigar is better.",
          time:"2023-9-10"
        },
        {
          name: "love0",
          content: "need this in usa",
          time:"2023-9-12"

        }

      ]
    },
        {
          UserName:"DJ",
          UserImageUrl: "./assets/logo.png",
          PostName: "Relx5",
          PostMsg: "idle relx5,good price and quality",
          Comment:
              [
                {
                  name: "wang ape",
                  content: "traditional cigar is better.",
                  time:"2023-9-10"
                },
                {
                  name: "love0",
                  content: "need this in usa",
                  time:"2023-9-12"

                }

              ]
        }]
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
.right-section{
  width: 73%;
  display: flex;
  flex-direction: column;

}
.left-section{
  width: 27%; background-color: rgb(244,244,244);
}
.left-section-item{
  background-color: rgb(244,244,244);
  height: 30px;
}
.centerButton {
  padding: 15px;
  width: 100%;
  background-color: rgb(241, 241, 241);
  /* outline: none; */
  border: none;
}


button:hover {
  background-color: rgb(209, 209, 209);
}

button:active {
  background-color: rgb(209, 209, 209);
}
</style>