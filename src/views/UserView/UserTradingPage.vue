<template>
    <div style="padding-bottom: 5rem;">
        <TopSearchBar style="margin-top: 10px;" v-model:inputText="this.searchText"
            @searchFunction="searchByItemNameAndUserName"></TopSearchBar>
        <div style="min-height: 200px; display: flex; justify-content: space-between;">
            <div style="width: 15%; height: fit-content; border-radius: 15px; overflow: hidden; margin-top: 20px;">
                <button v-for="(item, index) in this.itemCategoryTags" @click="categoryOnClick(index)"
                    :class="'centerButton ' + (categorySelectedButton == index ? 'selected' : '')">{{ item }}</button>
            </div>

            <div style="width: 75%; height: fit-content;">
                <div
                    style="display: flex; height: fit-content; border-radius: 15px; overflow: hidden; margin-top: 20px; justify-content: space-around;">

                    <div v-for="(item, index) in this.itemStatusTags" style="width: 100%; display: flex;">
                        <button @click="stuatusOnClick(index)"
                            :class="'centerButton ' + (statusSelectedButton == index ? 'selected' : '')">{{ item }}</button>
                        <div v-if="index !== this.itemStatusTags.length - 1"
                            style=" display: flex; width: 1px; height: 100%; background: rgb(241, 241, 241); justify-content: center; align-items: center;">
                            <div style="width: 1px; height: 75%; background: black;"></div>
                        </div>
                    </div>
                </div>

                <div class="itemField">
                    <div v-for="(itemData, index) in this.displayItems"
                        style="width: 100%; align-items: center; justify-content: center; display: flex; flex-direction: column; background-color: rgb(241, 241, 241);">
                        <ItemRecordComponent :item="itemData" @remove-collection="removeFromCollection(itemData)">
                        </ItemRecordComponent>
                        <div v-if="index !== this.displayItems.length - 1"
                            style=" display: flex; width: 100%; height: 1px; background: rgb(241, 241, 241); justify-content: center; align-items: center;">
                            <div style="width: 95%; height: 1px; background: black;"></div>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    </div>
</template>

<script>
import TopSearchBar from '@/components/Common/TopSearchBar.vue';
import ItemRecordComponent from '@/components/Item/ItemRecordComponent.vue';
export default {
    name: "UserTradingPage",
    components: {
        TopSearchBar,
        ItemRecordComponent
    },
    data() {
        return {
            categorySelectedButton: 0,
            statusSelectedButton: 0,
            itemCategoryTags: [
                this.$t('Posted'), this.$t('Bought'), this.$t('Sold'), this.$t('Collection'), this.$t('Search'),
            ],
            itemStatusTags: [
                this.$t('All'), this.$t('Unshipped'), this.$t('Unreceived'), this.$t('Unrated'), this.$t('Refund')
            ],
            statusKeyPairs: {
                1: "unshipped",
                2: "unreceived",
                3: "unrated",
                4: "refund",
                5: "search",
                "unshipped": 1,
                "unreceived": 2,
                "unrated": 3,
                "refund": 4,
                "search": 5
            },
            tagKeyPairs: {
                0: "posted",
                1: "bought",
                2: "sold",
                3: "collection",
                4: "search",
                "posted": 0,
                "bought": 1,
                "sold": 2,
                "collection": 3,
                "search": 4
            },
            searchText: "",
            items: [],
            displayItems: [],
            searchItems: []

        }
    },
    methods: {
        categoryOnClick(e) {
            this.categorySelectedButton = e
            this.statusSelectedButton = 0
            if (e == 4) {
                this.displayItems = this.searchItems;
                return;
            }
            this.displayItems = this.items.filter(item => item.tag == this.tagKeyPairs[e])
        },
        stuatusOnClick(e) {
            this.statusSelectedButton = e
            if (e == 0) {
                this.displayItems = this.items.filter(item => (item.tag == this.tagKeyPairs[this.categorySelectedButton]))
            } else {
                this.displayItems = this.items.filter(item => (item.status == this.statusKeyPairs[e] && item.tag == this.tagKeyPairs[this.categorySelectedButton]))
            }
        },
        async findBoughts() {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("username", this.$store.state.username);
            myHeaders.append("token", this.$store.state.token);

            var data = {};

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: JSON.stringify(data),
                redirect: 'follow'
            };

            fetch("http://localhost:28888/buyProduct/getList", requestOptions)
                .then(response => response.json())
                .then(async (data) => {
                    console.log('boughts:')
                    console.log(data);
                    var ls = [];
                    for (let i = 0; i < data.data.length; i++) {
                        var username = await this.getUsername(data.data[i]['productUserId']);
                        var content = {
                            "productId": data.data[i]['productId'],
                            "username": username,
                            "itemName": data.data[i]['productInfo']['name'],
                            "orderDate": "",
                            "itemPrice": data.data[i]['productInfo']['price'],
                            "tag": "bought",
                            "status": "unrated"
                        }
                        ls.push(content);
                    }
                    this.items = this.items.concat(ls);
                })
                .catch(error => console.log('error', error));
        },
        async findSold() {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("username", this.$store.state.username);
            myHeaders.append("token", this.$store.state.token);

            var data = {};

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: JSON.stringify(data),
                redirect: 'follow'
            };

            fetch("http://localhost:28888/buyProduct/getListByProductUser", requestOptions)
                .then(response => response.json())
                .then(async (data) => {
                    console.log('sold:')
                    console.log(data);
                    var ls = [];
                    for (let i = 0; i < data.data.length; i++) {
                        var username = await this.getUsername(data.data[i]['productUserId']);
                        var content = {
                            "productId": data.data[i]['productId'],
                            "username": username,
                            "itemName": data.data[i]['productInfo']['name'],
                            "orderDate": "",
                            "itemPrice": data.data[i]['productInfo']['price'],
                            "tag": "sold",
                            "status": "unrated"
                        }
                        ls.push(content);
                    }
                    this.items = this.items.concat(ls);
                })
                .catch(error => console.log('error', error));
        },
        async findCollection() {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("username", this.$store.state.username);
            myHeaders.append("token", this.$store.state.token);

            var data = {};

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: JSON.stringify(data),
                redirect: 'follow'
            };

            fetch("http://localhost:28888/collect/getList", requestOptions)
                .then(response => response.json())
                .then(async (data) => {
                    console.log('collection:')
                    console.log(data);
                    var ls = [];
                    for (let i = 0; i < data.data.length; i++) {
                        var username = await this.getUsername(data.data[i]['productUserId']);
                        var content = {
                            "productId": data.data[i]['productId'],
                            "username": username,
                            "itemName": String(data.data[i]['productInfo']['name']),
                            "orderDate": "",
                            "itemPrice": data.data[i]['productInfo']['price'],
                            "tag": "collection",
                            "status": "unrated"
                        }
                        ls.push(content);
                    }
                    this.items = this.items.concat(ls);
                })
                .catch(error => console.log('error', error));
        },
        async getUsername(input) {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("username", this.$store.state.username);
            myHeaders.append("token", this.$store.state.token);

            var data = { userId: input };

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: JSON.stringify(data),
                redirect: 'follow'
            };

            var name = '';

            await fetch("http://localhost:28888/user/getByUserId", requestOptions)
                .then(response => response.json())
                .then(data => {
                    name = data.data['username'];

                })
                .catch(error => console.log('error', error));
            return name;
        }
        // async findPosted() {
        //     var myHeaders = new Headers();
        //     myHeaders.append("Content-Type", "application/json");
        //     myHeaders.append("username", this.$store.state.username);
        //     myHeaders.append("token", this.$store.state.token);

        //     var data = {};

        //     var requestOptions = {
        //         method: 'POST',
        //         headers: myHeaders,
        //         body: JSON.stringify(data),
        //         redirect: 'follow'
        //     };

        //     fetch("http://localhost:28888/product/getMyList", requestOptions)
        //         .then(response => response.json())
        //         .then(data => {
        //             console.log('posted:')
        //             console.log(data);
        //             var ls = [];
        //             for (let i = 0; i < data.data.length; i++) {
        //                 var content = {
        //                     "productId": data.data[i]['productId'],
        //                     "username": data.data[i]['productUserId'],
        //                     "itemName": data.data[i]['name'],
        //                     "orderDate": "",
        //                     "itemPrice": data.data[i]['price'],
        //                     "tag": "posted",
        //                     "status": "unshipped"
        //                 }
        //                 ls.push(content);
        //             }
        //             this.items = this.items.concat(ls);
        //         })
        //         .catch(error => console.log('error', error));
        // },
        ,
        searchByItemNameAndUserName() {
            this.searchItems = [];
            for (let i = 0; i < this.items.length; i++) {
                // console.log(this.items[i].itemName.includes(this.searchText));
                if (this.items[i].username.includes(this.searchText) || this.items[i].itemName.includes(this.searchText)) { this.searchItems.push(this.items[i]); console.log("add") }

            }
            this.categoryOnClick(4)
        },
        async removeFromCollection(deleteItem) {
            console.log(deleteItem);
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("username", this.$store.state.username);
            myHeaders.append("token", this.$store.state.token);

            var raw = { productId: deleteItem.productId };
            var requestOptions = {
                method: 'DELETE',
                headers: myHeaders,
                body: JSON.stringify(raw),
                redirect: 'follow'
            };

            fetch("http://localhost:28888/collect/remove", requestOptions)
                .then(response => {
                    return response.text();
                })
                .then(result => {
                    var resultJson = JSON.parse(result);
                    if (resultJson.code == 200) {
                        this.items = this.items.filter(item => (item.productId != deleteItem.productId || item.tag != "collection"));
                        this.displayItems = this.displayItems.filter(item => (item.productId != deleteItem.productId || item.tag != "collection"));
                    } else {
                        console.log(result)
                    }

                })
                .catch(error => console.log('error', error));

        }
    },

    async mounted() {
        this.displayItems = this.items.filter(item => (item.tag == this.tagKeyPairs[this.categorySelectedButton]));
        await this.findBoughts();
        await this.findSold();
        await this.findCollection();
        // await this.findPosted();
    }
}
</script>

<style scoped>
.centerButton {
    padding: 15px;
    width: 100%;
    background-color: rgb(241, 241, 241);
    /* outline: none; */
    border: none;
}


.selected {
    background-color: rgb(209, 209, 209);
}

.itemField {
    margin-top: 15px;
    border-radius: 10px;
    overflow: hidden;
}
</style>