<template>
  <div style="margin-bottom: 50px;">
      <top-search-bar></top-search-bar>
      <div style="display: flex; max-width: 1124px; flex-wrap: wrap; justify-content:space-around;width: 100%">
      <GalleryItemcomponent v-for="(item, num) in this.GalleryItem" :ItemData="item"></GalleryItemcomponent>
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
  async mounted(){
    await this.getlist(this.$route.params.search);
    await this.getProductInfo();
    console.log(this.GalleryItem);
  },
  methods: {
    async getlist(input){
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("username", this.$store.state.username);
        myHeaders.append("token", this.$store.state.token);

        var data = {'search' : input};

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(data),
        redirect: 'follow'
        };

        await fetch("http://localhost:28888/product/getList", requestOptions)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            var ls =[]
            for(let i = 0; i<data.data.length; i++){
                var content = {
                    id: data.data[i]["id"],
                    name : data.data[i]["info"]["name"],
                    uploader: "",
                    uploaderId: data.data[i]["userId"],
                    rating: 0,
                    image: "",
                    uploaderAvatar: "",
                }
                ls.push(content);
            } 
            this.GalleryItem = ls;
        })
        .catch(error => console.log('error', error));
    },
    getProductInfo(){
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("username", this.$store.state.username);
        myHeaders.append("token", this.$store.state.token);


        for(let i = 0; i<this.GalleryItem.length; i++){
            
            var data = {"productId": this.GalleryItem[i]["id"]};

            var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(data),
            redirect: 'follow'
            };

            fetch("http://localhost:28888/product/getAvgScore", requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.data['score']!= null){
                    this.GalleryItem[i]["rating"] = parseInt(data.data['score']).toFixed();
                }else{
                    this.GalleryItem[i]["rating"] = "No ratings";
                }
            })
            .catch(error => console.log('error', error));

            var data = {"userId": this.GalleryItem[i]["uploaderId"]};

            var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(data),
            redirect: 'follow'
            };

            fetch("http://localhost:28888/user/getByUserId", requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.GalleryItem[i]["uploader"] = data.data['username'];
                this.GalleryItem[i]["uploaderAvatar"] = data.data["avatar"];
            })
            .catch(error => console.log('error', error));

            var data = {"id": this.GalleryItem[i]["id"]};

            var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(data),
            redirect: 'follow'
            };

            fetch("http://localhost:28888/product/get", requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if(data.data['info']['images'] == undefined){
                    this.GalleryItem[i]["image"] = '';
                }else{
                    this.GalleryItem[i]["image"] = data.data['info']['images'][0];  
                }
            })
            .catch(error => console.log('error', error));
        }
    }

  },
  data() {
    return {
      GalleryItem: [{
                    id: "1a2b3c4d",
                    description: "A breathtaking view of a colorful and serene sunset over the calm ocean waves, creating a mesmerizing blend of orange, pink, and purple hues that stretch across the horizon. Captured by JohnDoe123.",
                    uploader: "JohnDoe123",
                    rating: 9.5
                },],
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