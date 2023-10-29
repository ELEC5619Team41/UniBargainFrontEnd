<template>
  <div style="display: flex; width: 100%; position: relative; flex-direction: column; padding-bottom: 5rem">
    <div style="display: flex; flex-direction: column; margin-bottom: 10px" class="address">
      <div style="font-size: 35px;">{{ $t('ConfirmDeliveryAddress') }}</div>

      <div v-for="(item, index) in this.addressList" style="width: 100%; display: flex;">
        <button @click="changeAddress(index)"
          :class="'centerButton ' + (this.deliveryAddress == index ? 'selected' : '')">{{ item.address + ", " + item.city
            + ", " + item.state + ", " + item.zip + ", " + item.country }}</button>
      </div>

    </div>
    <div class="order" style="display: flex; flex-direction: column">
      <div style="font-size: 35px;">{{ $t('ConfirmOrderInformation') }}</div>
      <div class="itemField">
        <div v-for="(itemData, index) in this.itemsData"
          style="width: 100%; align-items: center; justify-content: center; display: flex; flex-direction: column; background-color: rgb(241, 241, 241);">
          <ItemShoppingCartComponent :showToggle="false" @delete-cart-item="deleteOneItem" :item="itemData">
          </ItemShoppingCartComponent>
        </div>
      </div>
      <div style="text-align: right; font-size: 25px; color: green;">{{ $t('TotalPrice') + this.totalPrice }}</div>
    </div>

    <div class="payment" style="display: flex; flex-direction: column">
      <div style="font-size: 35px;">{{ $t('ConfirmPaymentMethod') }}</div>
      <div class="payment_method">
        <div class="method" v-for="method in this.PaymentMethods">
          <h3>{{ method.name }}</h3>
        </div>
      </div>
      <div style="display: flex; margin-top: 15px; margin-right: 15px; margin-bottom: 15px">
        <round-corner-button style="margin-left: auto" :text="$t('Proceed')"
          @button-click="processPayment"></round-corner-button>
      </div>
    </div>

  </div>
</template>

<script>
import TopSearchBar from "@/components/Common/TopSearchBar";
import RoundCornerButton from "@/components/Common/RoundCornerButton";
import ItemRecordComponent from "@/components/Item/ItemRecordComponent";
import ItemShoppingCartComponent from "@/components/Item/ItemShoppingCartComponent";
import ItemInOrderComponent from "@/components/Item/ItemInOrderComponent";



export default {
  name: "TransactionPage",
  components: {
    ItemShoppingCartComponent,
    TopSearchBar,
    RoundCornerButton,
    ItemRecordComponent,
    ItemInOrderComponent,
  },
  properties: {

  },
  data() {
    return {
      totalPrice: 0,
      Signal: false,
      Address: [
        {
          num: "01",
          address: "123 Main Street Springfield, IL 62701 USA"
        },
        {
          num: "02",
          address: "123 Main Street Springfield, IL 62701 USA"
        }
      ],
      addressList: [],
      itemsData: [],
      PaymentMethods: [
        {
          index: 1,
          name: "master/visa"
        },
        {
          index: 2,
          name: "paypal"
        },
        {
          index: 3,
          name: "after-pay"
        }
      ],
      deliveryAddress: 0,
    }
  },
  async mounted() {

    let price = 0;
    this.itemsData.forEach(item => {
      price = price + item.itemPrice
    })
    console.log(price);
    this.totalPrice = parseFloat(price).toFixed(2)
    await this.initData();
    console.log(this.$route.params.id == '')
    if (this.$route.params.id == '') {
      //shopping cart
      await this.getList();
      for (let i = 0; i < this.itemsData.length; i++) {
        await this.getSellerInfo(this.itemsData[i]["sellerId"], i);
        await this.getProductInfo(this.itemsData[i]["productId"], i);
      }
    } else {
      //buy now
      let itemParamArray = JSON.parse(this.$route.params.id)
      console.log(itemParamArray)
      for (let i = 0; i < itemParamArray.length; i++) {
        var content = {
          "productId": itemParamArray[i],
          "sellerId": '',
          "sellerName": '',
          "itemName": '',
          "itemPrice": 0,
          "itemImage": '',
          "sellerAvatar": '',
          "selected": false
        };
        this.itemsData.push(content);
        await this.getProductInfo(this.itemsData[i]["productId"], i);
        console.log(this.itemsData[i])
        await this.getSellerInfo(this.itemsData[i]["sellerId"], i);
      }

        // var content = {
        //   "productId": this.$route.params.id,
        //   "sellerId": '',
        //   "sellerName": '',
        //   "itemName": '',
        //   "itemPrice": 0,
        //   "itemImage": '',
        //   "sellerAvatar": '',
        //   "selected": false
        // };
        // this.itemsData.push(content);
        // await this.getProductInfo(this.itemsData[0]["productId"], 0);
        // await this.getSellerInfo(this.itemsData[0]["sellerId"], 0);
      }
    },
    methods: {
      processPayment(){
        this.itemsData.forEach(item => {
          this.buy(item["productId"]);
          this.deleteOneItem(item["productId"]);
        })
        this.$router.push('/userhome/transactionendpage/');

      },
      setSignal(signal) {
        this.signal = signal;
      },
      redirect() {
        if (this.signal) {

        }
      },
    async initData() {

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("username", this.$store.state.username);
        myHeaders.append("token", this.$store.state.token);

        var data = '';

        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: JSON.stringify(data),
          redirect: 'follow'
        };

        await fetch("http://localhost:28888/user/get", requestOptions)
          .then(response => response.json())
          .then(data => {
            this.addressList = data.data['extend']['address'];
            console.log(this.addressList)
            for (let i = 0; i < this.addressList.length; i++) {
              if (this.addressList[i].isDefault) {
                this.deliveryAddress = i;
                break;
              }
            }
          })
          .catch(error => console.log('error', error));
      },
      deleteOneItem(productId) {

        let itemDetail = this.itemsData.find(item => item.productId == productId)
        if (itemDetail.selected) {
          this.totalPrice = parseFloat(this.totalPrice - itemDetail.itemPrice).toFixed(2)
          this.selectedCount -= 1
        }

        this.itemsData = this.itemsData.filter(item => item.productId != productId)
        this.removeFromCart(productId);
      },
      changeAddress(index) {
        this.deliveryAddress = index;
      },
    async getProductInfo(id, input) {
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



        await fetch("http://localhost:28888/product/get", requestOptions)
          .then(response => response.json())
          .then(data => {
            this.itemsData[input]['itemPrice'] = parseInt(data.data['info']["price"]);
            this.itemsData[input]['itemImage'] = data.data['info']["images"][0];
            this.itemsData[input]['sellerId'] = data.data["userId"];
            this.itemsData[input]['itemName'] = data.data['info']["name"];
          })
          .catch(error => console.log('error', error));

        this.totalPrice = Number(Number(this.totalPrice) + Number(parseFloat(this.itemsData[input]['itemPrice']).toFixed(2)))
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
    async removeFromCart(productId) {
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

        await fetch("http://localhost:28888/shoppingCart/remove", requestOptions)
          .then(response => response.json())
          .then(data => {
            // this.itemData['addedCart'] = false;
          })
          .catch(error => console.log('error', error));
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
    async buy(id) {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("username", this.$store.state.username);
        myHeaders.append("token", this.$store.state.token);

        var data = { "productId": id, "info": null };

        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: JSON.stringify(data),
          redirect: 'follow'
        };

        await fetch("http://localhost:28888/buyProduct/add", requestOptions)
          .then(response => response.json())
          .then(data => {
            console.log(data);
          })
          .catch(error => console.log('error', error));
      }
    }

  }
</script>

<style scoped>
.address {
  margin-top: 15px;
  overflow: hidden;
}

.order {
  overflow: hidden;
}

.payment {
  margin-top: 15px;
  display: flex;
  overflow: hidden;
  flex-direction: row;
  margin-bottom: 15px;
}

.payment_method {
  display: flex;
  flex-direction: row;
  margin-left: 15px;
}

.method {
  width: 150px;
  height: 100px;
  margin-left: 150px;
}

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