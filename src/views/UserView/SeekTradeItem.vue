<template>

  <div>
    <top-search-bar></top-search-bar>
    <div style="display: flex">
      <el-button-group style="width: 30%">
        <el-button autofocus @click="SetDetail">Detailed</el-button>
        <el-button @click="SetExplore">Explore</el-button>
        <el-button @click="SetMyPost">My Post</el-button>
      </el-button-group>
      <div style="width: 70%">
        <div v-if="Detail">
          <div v-for="post in PostData">
            <UserPost :post="post"></UserPost>
          </div>
        </div>

        <div v-if="Explore"
             style="display: flex; max-width: 1124px; flex-wrap: wrap; justify-content:space-around;width: 100%">
          <div v-for="item in GalleryItem">
            <GalleryItemcomponent :ItemData="item"></GalleryItemcomponent>
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
import TopSearchBar from "@/components/Common/TopSearchBar";
import UserPost from "@/components/Message/UserPost";
import GalleryItemcomponent from "@/components/HomePage/GalleryItemcomponent";

export default {
  name: "SeekTradeItem",

  components: {
    GalleryItemcomponent,
    TopSearchBar, UserPost

  },
  methods: {
    SetExplore() {
      this.Explore = true;
      this.MyPost = false;
      this.Detail = false;
    },
    SetDetail() {
      this.Explore = false;
      this.MyPost = false;
      this.Detail = true;
    },
    SetMyPost() {
      this.Explore = false;
      this.MyPost = true;
      this.Detail = false;
    }

  },
  data() {
    return {
      PostData: [{
        UserName: "DJ",
        UserID:"13",
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
      GalleryItem: [{
        id: "1a2b3c4d",
        description: "A breathtaking view of a colorful and serene sunset over the calm ocean waves, creating a mesmerizing blend of orange, pink, and purple hues that stretch across the horizon. Captured by JohnDoe123.",
        uploader: "JohnDoe123",
        rating: 9.5
      },
        {
          id: "5e6f7g8h",
          description: "A vintage car show featuring classic automobiles from the golden era of automotive design. Each car tells a unique story of innovation and craftsmanship. Uploaded by CarEnthusiast.",
          uploader: "CarEnthusiast",
          rating: 8.8
        },
        {
          id: "9i0j1k2l",
          description: "Immerse yourself in the tranquility of nature as you explore lush green forests, listen to the gentle rustling of leaves, and breathe in the crisp, fresh air. NatureLover45 shares this moment of serenity.",
          uploader: "NatureLover45",
          rating: 9.2
        },
        {
          id: "3m4n5o6p",
          description: "An abstract masterpiece that invites viewers to interpret its intricate patterns and vibrant colors in their own unique ways. Created by the talented artist ArtisticMind.",
          uploader: "ArtisticMind",
          rating: 7.9
        },
        {
          id: "7q8r9s0t",
          description: "Gaze upon the dazzling lights of a cityscape at night, where skyscrapers reach for the stars and neon signs create a vibrant, bustling atmosphere. UrbanExplorer captures the urban beauty.",
          uploader: "UrbanExplorer",
          rating: 8.7
        },
        {
          id: "1u2v3w4x",
          description: "Indulge your senses in a delectable food platter featuring a symphony of flavors, textures, and colors. FoodieEats showcases culinary artistry at its finest.",
          uploader: "FoodieEats",
          rating: 9.6
        },
        {
          id: "5y6z7a8b",
          description: "Embark on an adventurous hike through rugged terrain, where every step leads to breathtaking vistas and a sense of accomplishment. OutdoorAdventurer shares the thrill of exploration.",
          uploader: "OutdoorAdventurer",
          rating: 9.0
        },
        {
          id: "9c0d1e2f",
          description: "Witness the sheer joy and boundless energy of a cute and playful puppy as it frolics in the sunshine, capturing hearts everywhere. Uploaded by PetLover123.",
          uploader: "PetLover123",
          rating: 9.8
        },
        {
          id: "3g4h5i6j",
          description: "Experience the glamour and style of a high-fashion runway, where designers showcase their creative visions and models strut their stuff. FashionistaStyle captures the essence of fashion.",
          uploader: "FashionistaStyle",
          rating: 8.5
        },
        {
          id: "7k8l9m0n",
          description: "Dive into the mysterious underwater world teeming with vibrant marine life, where colorful coral reefs and exotic creatures create a mesmerizing spectacle. Shared by MarineExplorer.",
          uploader: "MarineExplorer",
          rating: 9.3
        },
        {
          id: "1o2p3q4r",
          description: "Explore a historical landmark that echoes the stories of the past, offering a glimpse into bygone eras and the enduring legacy of human civilization. Shared by HistoryBuff.",
          uploader: "HistoryBuff",
          rating: 8.9
        },
        {
          id: "5s6t7u8v",
          description: "Peer into the vast, starry night sky, where celestial wonders twinkle and inspire awe. AstroPhotographer captures the beauty of the cosmos in all its splendor.",
          uploader: "AstroPhotographer",
          rating: 9.7
        }],
      MyItems: [],
      Explore: false,
      Detail: true,
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