<template>

  <div style="display: flex; width: 100%; position: relative; flex-direction: column; padding-bottom: 5rem">
    <div style="display: flex; flex-direction: column; margin-bottom: 10px" class="address">

        <h2 style="position: relative; display: inline-flex; margin-left: 10px">confirm delivery address</h2>
        <div  style = "position: relative; display: flex; margin-bottom: 10px" v-for="i in this.Address" >
          <div>
            <input type="checkbox">
            {{i.address}}
          </div>
        </div>
  </div>
    <div class="order" style="display: flex; flex-direction: column">
      <h2 style="position: relative; display: inline-flex; margin-left: 10px" >confirm order information</h2>
     <div v-for="items in this.itemsData">
       <ItemInOrderComponent :item="items" >
       </ItemInOrderComponent>
     </div>
      <div style="text-align: right">total price:{{this.totalPrice}}</div>
    </div>

    <div class="payment" style="display: flex; flex-direction: column">
      <h2 style="position: relative; display: inline-flex; margin-left: 10px" >confirm payment method</h2>
      <div class="payment_method" >
        <div class="method" v-for="method in this.PaymentMethods"><h3>{{method.name}}</h3></div>
      </div>
      <div style="display: flex; margin-top: 15px; margin-right: 15px; margin-bottom: 15px">
        <round-corner-button style="margin-left: auto" text="proceed">proceed</round-corner-button>
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
  components:{
    ItemShoppingCartComponent,
    TopSearchBar,
    RoundCornerButton,
    ItemRecordComponent,
    ItemInOrderComponent,
  },
  properties:{

  },
  data(){
    return {
      totalPrice: 0,
      Address:[
        {
          num:"01",
          address:"123 Main Street Springfield, IL 62701 USA"
        },
        {
          num:"02",
          address:"123 Main Street Springfield, IL 62701 USA"
        }
      ],
      itemsData: [
        {
          "orderNumber": "12345",
          "username": "john_doe",
          "itemName": "Product AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
          "orderDate": "2023-09-18",
          "itemPrice": 19.99,
          "tag": "posted",
          "status": "unshipped",
          "selected": true
        },
        {
          "orderNumber": "67890",
          "username": "jane_smith",
          "itemName": "Product B",
          "orderDate": "2023-09-19",
          "itemPrice": 24.99,
          "tag": "bought",
          "status": "unreceived",
          "selected": false
        },
        {
          "orderNumber": "54321",
          "username": "bob_jones",
          "itemName": "Product C",
          "orderDate": "2023-09-20",
          "itemPrice": 14.99,
          "tag": "sold",
          "status": "unrated",
          "selected": true
        },
        {
          "orderNumber": "98765",
          "username": "alice_smith",
          "itemName": "Product D",
          "orderDate": "2023-09-21",
          "itemPrice": 29.99,
          "tag": "collection",
          "status": "refund",
          "selected": false
        },
        {
          "orderNumber": "24680",
          "username": "sam_jackson",
          "itemName": "Product E",
          "orderDate": "2023-09-22",
          "itemPrice": 39.99,
          "tag": "posted",
          "status": "unshipped",
          "selected": true
        }
      ],
      PaymentMethods:[
        {
          index: 1,
          name:"master/visa"
        },
        {
          index: 2,
          name:"paypal"
        },
        {
          index: 3,
          name:"after-pay"
        }
      ]




      // OrderInfo:[{
      //   orderNumber:"01",
      //   orderName:"TurboCharge Pro Wireless Earbuds",
      //   quality:8
      // }]
    }
  },
  mounted() {

      let price=0;
      this.itemsData.forEach(item=>
      {
        price=price+item.itemPrice
      })
      console.log(price);
      this.totalPrice= parseFloat(price).toFixed(2)

  },

}
</script>

<style scoped>

.address {
  margin-top: 15px;
  border-radius: 10px;
  overflow: hidden;
  border: solid black;
}
.order{
  border: solid black;
  overflow: hidden;
  border-radius: 10px;
}
.payment{
  margin-top: 15px;
  display: flex;
  overflow: hidden;
  flex-direction: row;
  border: solid black;
  margin-bottom: 15px;
  border-radius: 10px;
}
.payment_method{
  display: flex;
  flex-direction: row;
  margin-left: 15px;
}
.method{
  border: black solid;
  width: 150px;
  height: 100px;
  margin-left: 150px;
}
</style>