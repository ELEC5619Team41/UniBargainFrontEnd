<template>
    <div style="padding-bottom: 5rem;">
        <TopSearchBar style="margin-top: 10px;"></TopSearchBar>

        <div style="display: flex; position: relative; height: 80px; align-items: center;">
            <div>
                Shopping Cart (21)
            </div>
            <div style="position: absolute; right: 0; display: flex; align-items: center;">
                <div style="margin-right: 30px;">{{ this.totalPrice }} $</div>
                <RoundCornerButton :height="'50px'" :width="'150px'" :text="$t('Settle')"
                    @button-click="console.log(this.checkStatus); console.log(this.itemsData)"></RoundCornerButton>
            </div>
        </div>

        <div style="width: 100%; height: 1px; background: black;"></div>

        <div style="display: flex; height: 50px; align-items: center;">
            <input type="checkbox" v-model="allItemSelect" @change="selectAllItem">
            <div>Select All</div>
        </div>

        <div class="itemField">
            <div v-for="(itemData, index) in this.itemsData"
                style="width: 100%; align-items: center; justify-content: center; display: flex; flex-direction: column; background-color: rgb(241, 241, 241);">
                <ItemShoppingCartComponent :selectItemComputePrice.sync="checkStatus[itemData.productId]" @update:selectItemComputePrice="selectOneItem"
                @delete-cart-item="deleteOneItem"
                    :item="itemData">
                </ItemShoppingCartComponent>
            </div>
        </div>

        <div style="display: flex; position: relative; height: 80px; align-items: center;">
            <div style="position: absolute; right: 0; display: flex; align-items: center;">
                <RoundCornerButton :height="'50px'" :width="'150px'" :text="$t('DeleteAllSelected')"
                    @button-click="DeleteAllSelected"></RoundCornerButton>
            </div>
        </div>

    </div>
</template>

<script>
import TopSearchBar from '@/components/Common/TopSearchBar.vue';
import RoundCornerButton from '@/components/Common/RoundCornerButton.vue';
import ItemShoppingCartComponent from '@/components/Item/ItemShoppingCartComponent.vue';
export default {
    name: "UserShoppingCartPage",
    components: {
        TopSearchBar,
        RoundCornerButton,
        ItemShoppingCartComponent
    },
    methods: {
        selectAllItem() {
            this.totalPrice = 0
            if(this.allItemSelect)
                this.selectedCount = this.itemsData.length
            console.log('select all')
            for (var key in this.checkStatus) {

                this.checkStatus[key].checked = this.allItemSelect
                this.itemsData.find(item => item.productId == key).selected = this.allItemSelect

                if (this.allItemSelect) {
                    this.totalPrice += this.itemsData.find(item => item.productId == key).itemPrice
                }
            }
            this.totalPrice = parseFloat(this.totalPrice).toFixed(2)
        },
        selectOneItem(itemStatusData){

            this.checkStatus[itemStatusData.id].checked = itemStatusData.checked
            this.itemsData.find(item => item.productId == itemStatusData.id).selected = itemStatusData.checked

            if (itemStatusData.checked) {
                this.totalPrice += this.itemsData.find(item => item.productId == itemStatusData.id).itemPrice
                this.totalPrice = parseFloat(this.totalPrice).toFixed(2)
                this.selectedCount += 1
            } else {
                this.totalPrice -= this.itemsData.find(item => item.productId == itemStatusData.id).itemPrice
                this.totalPrice = parseFloat(this.totalPrice).toFixed(2)
                this.selectedCount -= 1
            }
            if(this.selectedCount === this.itemsData.length && this.selectedCount != 0){
                this.allItemSelect = true
            } else {
                this.allItemSelect = false
            }
        },
        deleteOneItem(productId){

            let itemDetail = this.itemsData.find(item => item.productId == productId)
            if(itemDetail.selected){
                this.totalPrice = parseFloat(this.totalPrice - itemDetail.itemPrice).toFixed(2)
                this.selectedCount -= 1
            }

            this.itemsData = this.itemsData.filter(item => item.productId != productId)
            delete this.checkStatus[productId]
            this.removeFromCart(0);

            if(this.selectedCount === this.itemsData.length && this.selectedCount != 0){
                this.allItemSelect = true
            } else {
                this.allItemSelect = false
            }
        },
        DeleteAllSelected(){
            
            for (var key in this.checkStatus) {
                if(this.checkStatus[key].checked){
                    this.buy(this.checkStatus[key].productId,"");
                    this.deleteOneItem(key);
                }
            }
        },
        getSellerInfo(input){
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("username", this.$store.state.username);
            myHeaders.append("token", this.$store.state.token);

            var data = {userId : input};

            var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(data),
            redirect: 'follow'
            };

            var name = '';
            var img = '';

            fetch("http://localhost:28888/user/getByUserId", requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                name = data.data['username'];
                img = data.data['avatar'];

            })
            .catch(error => console.log('error', error));
            return [name,img];
        },
        getProductInfo(id){
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("username", this.$store.state.username);
            myHeaders.append("token", this.$store.state.token);

            var data = {"id": id};

            var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(data),
            redirect: 'follow'
            };

            var price = 0;
            var image = '';

            fetch("http://localhost:28888/product/get", requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                price = data.data['info']["price"];
                image = data.data['info']["image"];
            })
            .catch(error => console.log('error', error));

            return [price,image];
        },
        buy(id, address){
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("username", this.$store.state.username);
            myHeaders.append("token", this.$store.state.token);

            var data = {"productId": id, "info": {"address": address}};

            var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(data),
            redirect: 'follow'
            };

            fetch("http://localhost:28888//buyProduct/add", requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
            .catch(error => console.log('error', error));
        },
        getList(){
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

            fetch("http://localhost:28888/shoppingCart/getList", requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                var ls =[]
                for(let i = 0; i<data.data.length;i++){
                    var ls1 = [];
                    ls1 = this.getSellerInfo(data.data[i]['productUserId']);
                    var ls2 = [];
                    ls2 = this.getProductInfo(data.data[i]['productId']);
                    var content = { "productId": data.data[i]['productId'],
                                    "sellerName": ls1[0],
                                    "itemName": data.data[i]['productInfo']['name'],
                                    "itemPrice": parseInt(ls2[0]),
                                    "itemImage": ls2[1],
                                    "sellerAvatar": ls1[1],
                                    "selected": false};
                    ls.push(content);  
                }
                this.itemsData = ls;
            })
            .catch(error => console.log('error', error));
        },
        removeFromCart(productId){
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("username", this.$store.state.username);
            myHeaders.append("token", this.$store.state.token);

            var data = {"productId": productId};

            var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            body: JSON.stringify(data),
            redirect: 'follow'
            };

            fetch("http://localhost:28888/shoppingCart/remove", requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.itemData['addedCart'] = false;
    ;        })
            .catch(error => console.log('error', error));
        }
        
    },
    mounted: function () {
        this.getList();
        this.totalPrice = 0
        this.itemsData.forEach(item => {
            this.checkStatus[item.productId] = {
                id: item.productId,
                checked: item.selected
            }
            if (item.selected) {
                this.totalPrice += item.itemPrice
                this.selectedCount += 1
            }
        })
        this.totalPrice = parseFloat(this.totalPrice).toFixed(2)
    },
    data() {
        return {
            totalPrice: 0,
            checkStatus: {},
            allItemSelect: false,
            selectedCount: 0,
            itemsData: [
                {
                //     "orderNumber": "12345",
                //     "username": "john_doe",
                //     "itemName": "Product AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
                //     "orderDate": "2023-09-18",
                //     "itemPrice": 19.99,
                //     "tag": "posted",
                //     "status": "unshipped",
                //     "selected": true
                // },
                // {
                //     "orderNumber": "67890",
                //     "username": "jane_smith",
                //     "itemName": "Product B",
                //     "orderDate": "2023-09-19",
                //     "itemPrice": 24.99,
                //     "tag": "bought",
                //     "status": "unreceived",
                //     "selected": false
                // },
                // {
                //     "orderNumber": "54321",
                //     "username": "bob_jones",
                //     "itemName": "Product C",
                //     "orderDate": "2023-09-20",
                //     "itemPrice": 14.99,
                //     "tag": "sold",
                //     "status": "unrated",
                //     "selected": true
                // },
                // {
                //     "orderNumber": "98765",
                //     "username": "alice_smith",
                //     "itemName": "Product D",
                //     "orderDate": "2023-09-21",
                //     "itemPrice": 29.99,
                //     "tag": "collection",
                //     "status": "refund",
                //     "selected": false
                // },
                // {
                //     "orderNumber": "24680",
                //     "username": "sam_jackson",
                //     "itemName": "Product E",
                //     "orderDate": "2023-09-22",
                //     "itemPrice": 39.99,
                //     "tag": "posted",
                //     "status": "unshipped",
                //     "selected": true
                }
            ]
        }
    }
}
</script>

<style scoped>
.itemField {
    margin-top: 15px;
    border-radius: 10px;
    overflow: hidden;
}
</style>