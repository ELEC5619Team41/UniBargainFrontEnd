<template>
    <div>
        <div class="searchbarBackground">
            <TopSearchBar v-model:inputText="this.searchText" @searchFunction="search"></TopSearchBar>
        </div>

        <!-- <div style="height: 350px; display: flex; align-items: center;">
            <div class="block">
                <CatergoryComponent style="margin: 10px; margin-top: 20px;" v-for="(item, num) in this.CategoryList"
                    :label="item.label" :GoodsNum="item.GoodsNum">
                </CatergoryComponent>
            </div>
        </div> -->

        <div class="galleryBackground">
            <div>
                <h1>Homepage Gallery</h1>
                <div class="galleryContentBlock">
                    <GalleryItemcomponent v-for="(item, num) in this.galleryItemData" :ItemData="item">
                    </GalleryItemcomponent>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import CatergoryComponent from '@/components/HomePage/CategoryComponent.vue'
import GalleryItemcomponent from '@/components/HomePage/GalleryItemcomponent.vue';
import TopSearchBar from '@/components/Common/TopSearchBar.vue';
export default {
    name: "UserHomePage",
    components: {
        CatergoryComponent,
        GalleryItemcomponent,
        TopSearchBar
    },
    data() {
        return {
            searchText: '',
            CategoryList: [
                {
                    label: "Women's Dresses",
                    GoodsNum: "70000+"
                },
                {
                    label: "Electronics Gadgets",
                    GoodsNum: "50000+"
                },
                {
                    label: "Men's Footwear",
                    GoodsNum: "60000+"
                },
                {
                    label: "Home Appliances",
                    GoodsNum: "45000+"
                },
                {
                    label: "Books and Mags",
                    GoodsNum: "30000+"
                },
                {
                    label: "Sporting Goods",
                    GoodsNum: "35000+"
                },
                {
                    label: "Health and Beauty",
                    GoodsNum: "55000+"
                },
                {
                    label: "Toys and Games",
                    GoodsNum: "40000+"
                },
                {
                    label: "Furniture and Decor",
                    GoodsNum: "48000+"
                },
                {
                    label: "Jewelry and Acces",
                    GoodsNum: "25000+"
                },
                {
                    label: "Food and Beverages",
                    GoodsNum: "7000+"
                },
                {
                    label: "Automotive Parts",
                    GoodsNum: "42000+"
                }
            ],
            galleryItemData: [
                {
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
                }
            ]



        }
    },
    async created() {
        await this.getRecommend(12);
        // await this.getProductInfo();
    },
    methods: {
        search() {
            var url = '/userhome/search/' + this.searchText;
            this.$router.push(url);
        },
        async getProductInfo() {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("username", this.$store.state.username);
            myHeaders.append("token", this.$store.state.token);


            for (let i = 0; i < this.galleryItemData.length; i++) {

                var data = { "productId": this.galleryItemData[i]["id"] };

                var requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: JSON.stringify(data),
                    redirect: 'follow'
                };

                await fetch("http://localhost:28888/product/getAvgScore", requestOptions)
                    .then(response => response.json())
                    .then(data => {
                        if (data.data['score'] != null) {
                            this.galleryItemData[i]["rating"] = parseInt(data.data['score']).toFixed();
                        } else {
                            this.galleryItemData[i]["rating"] = "No ratings";
                        }
                    })
                    .catch(error => console.log('error', error));

                var data = { "userId": this.galleryItemData[i]["uploaderId"] };

                var requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: JSON.stringify(data),
                    redirect: 'follow'
                };

                await fetch("http://localhost:28888/user/getByUserId", requestOptions)
                    .then(response => response.json())
                    .then(data => {
                        this.galleryItemData[i]["uploader"] = data.data['username'];
                        this.galleryItemData[i]["uploaderAvatar"] = data.data["avatar"];
                    })
                    .catch(error => console.log('error', error));

                var data = { "id": this.galleryItemData[i]["id"] };

                var requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: JSON.stringify(data),
                    redirect: 'follow'
                };

                await fetch("http://localhost:28888/product/get", requestOptions)
                    .then(response => response.json())
                    .then(data => {
                        if (data.data['info']['images'] == undefined) {
                            this.galleryItemData[i]["productImage"] = '';
                        } else {
                            this.galleryItemData[i]["productImage"] = data.data['info']['images'][0];
                        }
                    })
                    .catch(error => console.log('error', error));
            }
        },
        async getRecommend(count) {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("username", this.$store.state.username);
            myHeaders.append("token", this.$store.state.token);

            var data = { "count": count };

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: JSON.stringify(data),
                redirect: 'follow'
            };

            await fetch("http://localhost:28888/product/getRecommendList", requestOptions)
                .then(response => response.json())
                .then(async(data) => {
                    console.log(data);
                    var ls = []
                    console.log(data.data.length)
                    var dataLength = data.data.length;
                    var dataArray = data.data;
                    for (let i = 0; i < dataLength; i++) {
                        var content = {
                            id: dataArray[i]["id"],
                            name: dataArray[i]["info"]["name"],
                            uploader: "",
                            uploaderId: dataArray[i]["userId"],
                            rating: 0,
                            productImage: "",
                            uploaderAvatar: "",
                        }

                        var data = { "productId": content["id"] };

                        var requestOptions = {
                            method: 'POST',
                            headers: myHeaders,
                            body: JSON.stringify(data),
                            redirect: 'follow'
                        };

                        await fetch("http://localhost:28888/product/getAvgScore", requestOptions)
                            .then(response => response.json())
                            .then(data => {
                                if (data.data['score'] != null) {
                                    content["rating"] = parseInt(data.data['score']).toFixed();
                                } else {
                                    content["rating"] = "No ratings";
                                }
                            })
                            .catch(error => console.log('error', error));

                        var data = { "userId": content["uploaderId"] };

                        var requestOptions = {
                            method: 'POST',
                            headers: myHeaders,
                            body: JSON.stringify(data),
                            redirect: 'follow'
                        };

                        await fetch("http://localhost:28888/user/getByUserId", requestOptions)
                            .then(response => response.json())
                            .then(data => {
                                content["uploader"] = data.data['username'];
                                content["uploaderAvatar"] = data.data["avatar"];
                            })
                            .catch(error => console.log('error', error));

                        var data = { "id": content["id"] };

                        var requestOptions = {
                            method: 'POST',
                            headers: myHeaders,
                            body: JSON.stringify(data),
                            redirect: 'follow'
                        };

                        await fetch("http://localhost:28888/product/get", requestOptions)
                            .then(response => response.json())
                            .then(data => {
                                if (data.data['info']['images'] == undefined) {
                                    content["productImage"] = '';
                                } else {
                                    content["productImage"] = data.data['info']['images'][0];
                                }
                            })
                            .catch(error => console.log('error', error));


                        ls.push(content);
                    }
                    this.galleryItemData = ls;
                })
                .catch(error => console.log('error', error));
        }
    }
}
</script>

<style scoped>
.searchbarBackground {
    background-color: rgb(244, 244, 244);
    height: 60px;

    display: flex;
    justify-content: center;
    align-items: center;

    width: 100vw;
    position: relative;
    left: calc(-50vw + 50%);
}

.block {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.galleryBackground {
    background-color: rgb(244, 244, 244);
    /* height: fit-content; */

    display: flex;
    justify-content: center;

    width: 100vw;
    position: relative;
    left: calc(-50vw + 50%);
    padding-bottom: 5rem;
}

.galleryContentBlock {
    max-width: 1124px;
    width: 100%;
    height: fit-content;

    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
</style>