<template>
    <div style="padding-bottom: 5rem;">
        <TopSearchBar style="margin-top: 10px;"></TopSearchBar>

        <div style="display: flex; position: relative; height: 80px; align-items: center;">
            <div>
                {{ $t('ShoppingCart') }} ({{ this.itemsData.length }})
            </div>
            <div style="position: absolute; right: 0; display: flex; align-items: center;">
                <div style="margin-right: 30px;">{{ this.totalPrice }} $</div>
                <RoundCornerButton :height="'50px'" :width="'150px'" :text="$t('Settle')"
                    @button-click="goCheckOut"></RoundCornerButton>
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
                <ItemShoppingCartComponent :selectItemComputePrice.sync="checkStatus[itemData.productId]"
                    @update:selectItemComputePrice="selectOneItem" @delete-cart-item="deleteOneItem" :item="itemData">
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
        goCheckOut(){
            let selectedItem = [];
            for(var key in this.checkStatus){
                if(this.checkStatus[key].checked){
                    selectedItem.push(this.checkStatus[key].id);
                }
            }
            if(selectedItem.length == 0){
                this.$message({
                    message: this.$t('PleaseSelectItem'),
                    type: 'warning'
                });
                return;
            }
            this.$router.push('/userhome/transactionpage/' + JSON.stringify(selectedItem))
            // console.log(selectedItem)
        },
        selectAllItem() {
            this.totalPrice = 0
            if (this.allItemSelect)
                this.selectedCount = this.itemsData.length
            else
                this.selectedCount = 0
            for (var key in this.checkStatus) {

                this.checkStatus[key].checked = this.allItemSelect
                this.itemsData.find(item => item.productId == key).selected = this.allItemSelect

                if (this.allItemSelect) {
                    this.totalPrice += this.itemsData.find(item => item.productId == key).itemPrice
                }
            }
            this.totalPrice = parseFloat(this.totalPrice).toFixed(2)
        },
        selectOneItem(itemStatusData) {

            this.checkStatus[itemStatusData.id].checked = itemStatusData.checked
            this.itemsData.find(item => item.productId == itemStatusData.id).selected = itemStatusData.checked

            this.totalPrice = Number(this.totalPrice)

            if (itemStatusData.checked) {
                this.totalPrice += this.itemsData.find(item => item.productId == itemStatusData.id).itemPrice
                this.totalPrice = parseFloat(this.totalPrice).toFixed(2)
                this.selectedCount += 1
            } else {
                this.totalPrice -= this.itemsData.find(item => item.productId == itemStatusData.id).itemPrice
                this.totalPrice = parseFloat(this.totalPrice).toFixed(2)
                this.selectedCount -= 1
            }

            if (this.selectedCount === this.itemsData.length && this.selectedCount != 0) {
                this.allItemSelect = true
            } else {
                this.allItemSelect = false
            }
        },
        deleteOneItem(productId) {

            let itemDetail = this.itemsData.find(item => item.productId == productId)
            if (itemDetail.selected) {
                this.totalPrice = parseFloat(this.totalPrice - itemDetail.itemPrice).toFixed(2)
                this.selectedCount -= 1
            }

            this.itemsData = this.itemsData.filter(item => item.productId != productId)
            delete this.checkStatus[productId]
            this.removeFromCart(productId);

            if (this.selectedCount === this.itemsData.length && this.selectedCount != 0) {
                this.allItemSelect = true
            } else {
                this.allItemSelect = false
            }
        },
        DeleteAllSelected() {

            for (var key in this.checkStatus) {
                if (this.checkStatus[key].checked) {
                    this.buy(this.checkStatus[key].productId, "");
                    this.deleteOneItem(key);
                }
            }
        },
        getSellerInfo(id, input) {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("username", this.$store.state.username);
            myHeaders.append("token", this.$store.state.token);

            var data = { userId: id };

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: JSON.stringify(data),
                redirect: 'follow'
            };


            return fetch("http://localhost:28888/user/getByUserId", requestOptions)
                .then(response => response.json())
                .then(data => {
                    this.itemsData[input]['sellerName'] = data.data['username'];
                    this.itemsData[input]['sellerAvatar'] = data.data['avatar'];

                })
                .catch(error => console.log('error', error));
        },
        getProductInfo(id, input) {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("username", this.$store.state.username);
            myHeaders.append("token", this.$store.state.token);

            var data = { "id": id };

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: JSON.stringify(data),
                redirect: 'follow'
            };

            return fetch("http://localhost:28888/product/get", requestOptions)
                .then(response => response.json())
                .then(data => {
                    this.itemsData[input]['itemPrice'] = parseInt(data.data['info']["price"]);
                    this.itemsData[input]['itemImage'] = data.data['info']["images"][0];
                })
                .catch(error => console.log('error', error));
        },
        buy(id, address) {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("username", this.$store.state.username);
            myHeaders.append("token", this.$store.state.token);

            var data = { "productId": id, "info": { "address": address } };

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: JSON.stringify(data),
                redirect: 'follow'
            };

            fetch("http://localhost:28888/buyProduct/add", requestOptions)
                .then(response => response.json())
                .then(data => {
                    // console.log(data);
                })
                .catch(error => console.log('error', error));
        },
        async getList() {
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

            await fetch("http://localhost:28888/shoppingCart/getList", requestOptions)
                .then(response => response.json())
                .then(data => {
                    var ls = []
                    // console.log(data);
                    for (let i = 0; i < data.data.length; i++) {
                        var content = {
                            "productId": data.data[i]['productId'],
                            "sellerId": data.data[i]['productUserId'],
                            "sellerName": '',
                            "itemName": data.data[i]['productInfo']['name'],
                            "itemPrice": 0,
                            "itemImage": '',
                            "sellerAvatar": '',
                            "selected": false
                        };
                        ls.push(content);
                    }
                    this.itemsData = ls;
                    
                })
                .catch(error => console.log('error', error));
        },
        removeFromCart(productId) {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("username", this.$store.state.username);
            myHeaders.append("token", this.$store.state.token);

            var data = { "productId": productId };

            var requestOptions = {
                method: 'DELETE',
                headers: myHeaders,
                body: JSON.stringify(data),
                redirect: 'follow'
            };

            fetch("http://localhost:28888/shoppingCart/remove", requestOptions)
                .then(response => response.json())
                .then(data => {
                    this.itemData['addedCart'] = false;
                })
                .catch(error => console.log('error', error));
        }

    },
    async mounted() {
        await this.getList();
        for (let i = 0; i < this.itemsData.length; i++) {
            await this.getSellerInfo(this.itemsData[i]["sellerId"], i);
            await this.getProductInfo(this.itemsData[i]["productId"], i);
        }
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
        // console.log(this.checkStatus)
        this.totalPrice = parseFloat(this.totalPrice).toFixed(2);
    },
    data() {
        return {
            totalPrice: {
                type: Number,
                default: 0
            },
            checkStatus: {},
            allItemSelect: false,
            selectedCount: 0,
            itemsData: [
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