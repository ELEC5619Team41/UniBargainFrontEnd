<template>
  <div style="padding-bottom: 5rem">
    <div style="display: flex; margin-top: 15px;">
      <el-button-group style="display:flex; width: 10%; flex-direction: column;">
        <el-button @click="SetExplore">Explore</el-button>
        <el-button @click="SetMyPost">My Post</el-button>
      </el-button-group>
      <div style="width: 85%">

        <div
          style="display: flex; max-width: 1124px; flex-wrap: wrap; justify-content:space-around;width: 100%">
          <div style="width: 100%;" v-for="item in this.postItem">
            <SeekTradeComponent :ItemData="item"></SeekTradeComponent>
          </div>
        </div>

        <div v-if="MyPost"
          style="display: flex; max-width: 1124px; flex-wrap: wrap; justify-content:space-around;width: 100%">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserPost from "@/components/Message/UserPost";
import SeekTradeComponent from "@/components/SeekTrade/SeekTradeComponent";

export default {
  name: "SeekTradeItem",

  components: {
    UserPost,
    SeekTradeComponent

  },
  methods: {
    async SetExplore() {
      this.Explore = true;
      this.MyPost = false;
      await this.getRequestList();
    },
    async SetMyPost() {
      this.Explore = false;
      this.MyPost = true;
      
      await this.getMyRequestList();
    },
    async getRequestList() {
      var myHeaders = new Headers();
      myHeaders.append("username", this.$store.state.username);
      myHeaders.append("token", this.$store.state.token);
      myHeaders.append("Content-Type", "application/json");

      var raw = { };

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(raw),
        redirect: 'follow'
      };

      fetch("http://localhost:28888/things/getList", requestOptions)
        .then(response => response.json())
        .then(result => {
          this.postItem = result.data;
        })
        .catch(error => console.log('error', error));
    },
    async getMyRequestList() {
      var myHeaders = new Headers();
      myHeaders.append("username", this.$store.state.username);
      myHeaders.append("token", this.$store.state.token);
      myHeaders.append("Content-Type", "application/json");

      var raw = { isShow: -1 };

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(raw),
        redirect: 'follow'
      };
      console.log("getMyRequestList")
      fetch("http://localhost:28888/things/getMyList", requestOptions)
        .then(response => response.json())
        .then(result => {
          this.postItem = result.data;
          console.log(this.postItem.length)
        })
        .catch(error => console.log('error', error));
    },

  },
  async mounted(){
    await this.getRequestList();
  },
  data() {
    return {
      PostData: [{
        UserName: "DJ",
        UserID: "13",
        ItemId: '1',
        UserImageUrl: "../1.webp",
        PostName: "Relx5",
        PostMsg: "idle relx5,good price and quality",
        ItemUrl: '../assets/logo.png',
        Comment:
          [
            {
              name: "wang ape",
              content: "traditional cigar is better.",
              time: "2023-9-10"
            },
            {
              name: "love0",
              content: "need this in usa",
              time: "2023-9-12"

            }

          ]
      },
      {
        UserName: "DJ",
        ItemId: '2',
        UserID: "12",
        UserImageUrl: "./assets/logo.png",
        PostName: "Relx5",
        PostMsg: "idle relx5,good price and quality",
        Comment:
          [
            {
              name: "wang ape",
              content: "traditional cigar is better.",
              time: "2023-9-10"
            },
            {
              name: "love0",
              content: "need this in usa",
              time: "2023-9-12"

            }

          ]
      }],
      postItem: [],
      MyItems: [],
      Explore: true,
      MyPost: false,


    }
  },

}
</script>

<style scoped>
.commentField {
  align-items: left;
  width: 80%;
  height: 180px;
  margin-top: 5px;
}

.right-section {
  width: 73%;
  display: flex;
  flex-direction: column;

}

.left-section {
  width: 27%;
  background-color: rgb(244, 244, 244);
}

.left-section-item {
  background-color: rgb(244, 244, 244);
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