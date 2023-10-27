<template>
  <div>
    <div style="margin-bottom: 50px; margin-top: 15px;">
      <top-search-bar v-model:inputText="this.searchText" @searchFunction="search"></top-search-bar>

      <div style="display: flex; max-width: 1124px; flex-wrap: wrap; justify-content:space-around;width: 100%">
        <div v-for="item in this.GalleryItem">
          <GalleryItemcomponent :ItemData="item"></GalleryItemcomponent>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TopSearchBar from "@/components/Common/TopSearchBar";
import GalleryItemcomponent from "@/components/HomePage/GalleryItemcomponent";

export default {
  name: "SearchResultPage",
  components: {
    GalleryItemcomponent,
    TopSearchBar
  },
  async mounted() {
    await this.getlist(this.$route.params.search);
    await this.getProductInfo();
    this.GalleryItem = this.PreGalleryItem;
  },
  methods: {
    search() {

      var url = '/userhome/search/' + this.searchText;
      console.log(url)
      this.$router.push(url).then(() => {
        window.location.reload();
      });
    },
    async getlist(input) {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("username", this.$store.state.username);
      myHeaders.append("token", this.$store.state.token);

      var data = { 'search': input };

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(data),
        redirect: 'follow'
      };

      await fetch("http://localhost:28888/product/getList", requestOptions)
        .then(response => response.json())
        .then(data => {
          // console.log(data);
          var ls = []
          for (let i = 0; i < data.data.length; i++) {
            var content = {
              id: data.data[i]["id"],
              name: data.data[i]["info"]["name"],
              uploader: "",
              uploaderId: data.data[i]["userId"],
              rating: 0,
              image: "",
              uploaderAvatar: "",
            }
            ls.push(content);
          }
          this.PreGalleryItem = ls;
        })
        .catch(error => console.log('error', error));
    },
    async getProductInfo() {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("username", this.$store.state.username);
      myHeaders.append("token", this.$store.state.token);


      for (let i = 0; i < this.PreGalleryItem.length; i++) {

        var data = { "productId": this.PreGalleryItem[i]["id"] };

        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: JSON.stringify(data),
          redirect: 'follow'
        };

        await fetch("http://localhost:28888/product/getAvgScore", requestOptions)
          .then(response => response.json())
          .then(data => {
            // console.log(data);
            if (data.data['score'] != null) {
              this.PreGalleryItem[i]["rating"] = parseInt(data.data['score']).toFixed();
            } else {
              this.PreGalleryItem[i]["rating"] = "No ratings";
            }
          })
          .catch(error => console.log('error', error));

        var data = { "userId": this.PreGalleryItem[i]["uploaderId"] };

        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: JSON.stringify(data),
          redirect: 'follow'
        };

        await fetch("http://localhost:28888/user/getByUserId", requestOptions)
          .then(response => response.json())
          .then(data => {
            console.log(data);
            this.PreGalleryItem[i]["uploader"] = data.data['username'];

            if (!('avatar' in data.data) || data.data['avatar'] == null) {
              this.PreGalleryItem[i]["uploaderAvatar"] = '';
            } else {
              this.PreGalleryItem[i]["uploaderAvatar"] = data.data["avatar"];
              console.log('save')
            }
          })
          .catch(error => console.log('error', error));

        var data = { "id": this.PreGalleryItem[i]["id"] };

        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: JSON.stringify(data),
          redirect: 'follow'
        };

        await fetch("http://localhost:28888/product/get", requestOptions)
          .then(response => response.json())
          .then(data => {
            // console.log(data);
            if (!('images' in data.data['info']) || data.data['info']['images'].length == 0) {
              this.PreGalleryItem[i]["image"] = '';
            } else {
              this.PreGalleryItem[i]["image"] = data.data['info']['images'][0];
            }
          })
          .catch(error => console.log('error', error));
      }
    }

  },
  data() {
    return {
      searchText: '',
      PreGalleryItem: [{
        id: "1a2b3c4d",
        description: "A breathtaking view of a colorful and serene sunset over the calm ocean waves, creating a mesmerizing blend of orange, pink, and purple hues that stretch across the horizon. Captured by JohnDoe123.",
        uploader: "JohnDoe123",
        rating: 9.5
      },],
      GalleryItem: []
    }
  }
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