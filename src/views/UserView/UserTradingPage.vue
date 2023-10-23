<template>
    <div style="padding-bottom: 5rem;">
        <TopSearchBar style="margin-top: 10px;"></TopSearchBar>
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
                        <ItemRecordComponent :item="itemData"></ItemRecordComponent>
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
                this.$t('Posted'), this.$t('Bought'), this.$t('Sold'), this.$t('Collection'),
            ],
            itemStatusTags: [
                this.$t('All'), this.$t('Unshipped'), this.$t('Unreceived'), this.$t('Unrated'), this.$t('Refund')
            ],
            statusKeyPairs: {
                1: "unshipped",
                2: "unreceived",
                3: "unrated",
                4: "refund",
                "unshipped": 1,
                "unreceived": 2,
                "unrated": 3,
                "refund": 4,
            },
            tagKeyPairs: {
                0: "posted",
                1: "bought",
                2: "sold",
                3: "collection",
                "posted": 0,
                "bought": 1,
                "sold": 2,
                "collection": 3
            },
            items: [
                {
                    "orderNumber": "12345",
                    "username": "john_doe",
                    "itemName": "Product A",
                    "orderDate": "2023-09-18",
                    "itemPrice": 19.99,
                    "tag": "posted",
                    "status": "unshipped"
                },
                {
                    "orderNumber": "67890",
                    "username": "jane_smith",
                    "itemName": "Product B",
                    "orderDate": "2023-09-19",
                    "itemPrice": 24.99,
                    "tag": "bought",
                    "status": "unreceived"
                },
                {
                    "orderNumber": "54321",
                    "username": "bob_jones",
                    "itemName": "Product C",
                    "orderDate": "2023-09-20",
                    "itemPrice": 14.99,
                    "tag": "sold",
                    "status": "unrated"
                },
                {
                    "orderNumber": "98765",
                    "username": "alice_smith",
                    "itemName": "Product D",
                    "orderDate": "2023-09-21",
                    "itemPrice": 29.99,
                    "tag": "collection",
                    "status": "refund"
                },
                {
                    "orderNumber": "24680",
                    "username": "sam_jackson",
                    "itemName": "Product E",
                    "orderDate": "2023-09-22",
                    "itemPrice": 39.99,
                    "tag": "posted",
                    "status": "unshipped"
                },
                {
                    "orderNumber": "13579",
                    "username": "emily_wilson",
                    "itemName": "Product F",
                    "orderDate": "2023-09-23",
                    "itemPrice": 49.99,
                    "tag": "bought",
                    "status": "refund"
                },
                {
                    "orderNumber": "11223",
                    "username": "david_smith",
                    "itemName": "Product G",
                    "orderDate": "2023-09-24",
                    "itemPrice": 9.99,
                    "tag": "collection",
                    "status": "unrated"
                },
                {
                    "orderNumber": "45678",
                    "username": "susan_davis",
                    "itemName": "Product H",
                    "orderDate": "2023-09-25",
                    "itemPrice": 54.99,
                    "tag": "posted",
                    "status": "unshipped"
                },
                {
                    "orderNumber": "98765",
                    "username": "alice_smith",
                    "itemName": "Product I",
                    "orderDate": "2023-09-26",
                    "itemPrice": 34.99,
                    "tag": "bought",
                    "status": "unreceived"
                },
                {
                    "orderNumber": "24680",
                    "username": "sam_jackson",
                    "itemName": "Product J",
                    "orderDate": "2023-09-27",
                    "itemPrice": 29.99,
                    "tag": "sold",
                    "status": "unrated"
                },
                {
                    "orderNumber": "13579",
                    "username": "emily_wilson",
                    "itemName": "Product K",
                    "orderDate": "2023-09-28",
                    "itemPrice": 19.99,
                    "tag": "collection",
                    "status": "unshipped"
                },
                {
                    "orderNumber": "11223",
                    "username": "david_smith",
                    "itemName": "Product L",
                    "orderDate": "2023-09-29",
                    "itemPrice": 9.99,
                    "tag": "posted",
                    "status": "refund"
                },
                {
                    "orderNumber": "45678",
                    "username": "susan_davis",
                    "itemName": "Product M",
                    "orderDate": "2023-09-30",
                    "itemPrice": 34.99,
                    "tag": "bought",
                    "status": "unreceived"
                },
                {
                    "orderNumber": "98765",
                    "username": "alice_smith",
                    "itemName": "Product N",
                    "orderDate": "2023-10-01",
                    "itemPrice": 54.99,
                    "tag": "sold",
                    "status": "unrated"
                },
                {
                    "orderNumber": "54321",
                    "username": "bob_jones",
                    "itemName": "Product O",
                    "orderDate": "2023-10-02",
                    "itemPrice": 14.99,
                    "tag": "collection",
                    "status": "refund"
                },
                {
                    "orderNumber": "12345",
                    "username": "john_doe",
                    "itemName": "Product P",
                    "orderDate": "2023-10-03",
                    "itemPrice": 19.99,
                    "tag": "posted",
                    "status": "unshipped"
                },
                {
                    "orderNumber": "24680",
                    "username": "sam_jackson",
                    "itemName": "Product Q",
                    "orderDate": "2023-10-04",
                    "itemPrice": 39.99,
                    "tag": "bought",
                    "status": "unreceived"
                },
                {
                    "orderNumber": "13579",
                    "username": "emily_wilson",
                    "itemName": "Product R",
                    "orderDate": "2023-10-05",
                    "itemPrice": 29.99,
                    "tag": "sold",
                    "status": "refund"
                },
                {
                    "orderNumber": "11223",
                    "username": "david_smith",
                    "itemName": "Product S",
                    "orderDate": "2023-10-06",
                    "itemPrice": 9.99,
                    "tag": "collection",
                    "status": "unrated"
                }
            ]
            ,
            displayItems: []

        }
    },
    methods: {
        categoryOnClick(e) {
            this.categorySelectedButton = e
            this.statusSelectedButton = 0
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
        findBoughts(){
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
            .then(data => {
                console.log(data);
                var ls = [];
                for (let i = 0; i < data.data.length; i++){
                    var content= {
                        "productId": data.data[i]['productId'],
                        "username": data.data[i]['productUserId'],
                        "itemName": data.data[i]['productInfo']['name'],
                        "orderDate": "",
                        "itemPrice": data.data[i]['productInfo']['price'],
                        "tag": "bought",
                        "status": "unrated"
                    }
                    ls.push(content);
                }

            })
            .catch(error => console.log('error', error));
        }
    },
    mounted() {
        this.displayItems = this.items.filter(item => (item.tag == this.tagKeyPairs[this.categorySelectedButton]));
        this.findBoughts();
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