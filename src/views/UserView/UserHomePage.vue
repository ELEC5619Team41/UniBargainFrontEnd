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
            galleryItemData: []
            



        }
    },
    async created() {
        await this.getRecommend(9);
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
                    var ls = []
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
    background-color: rgb(255, 255, 255);
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
    background-color: rgb(255, 255, 255);
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