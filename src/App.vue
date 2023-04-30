<template>
  <v-app>
      <v-content>

      
    <MerchHeader @handleSideBar="handleSideBar" :cart="cart" class="myHeader" />
    <SideNavBar  :orders="orders" v-show="showSideBar" class="side-bar"/>
    <div class="category-container">
      <select name="category" id="category-filter" @change="filterChange">
        <option value="">--Select Category--</option>
        <template v-for="(cat, ind) of category" :key="ind">
          <option :value="cat.value">{{ cat.key }}</option>
        </template>
      </select>
    </div>
    <MerchList
      @addToCart="addToCart"
      @removeFromcart="removeFromcart"
      :merchs="merchs"
      :filter=filter
    />

    <LoaderComponent v-show="loader()"/>
    <MerchFooter
      v-show="calculateAmount() > 0"
      class="myFooter"
      :totalAmount="totalAmount"
      :cart=cart
      @orderPlaced="orderPlaced"
    />
    <head>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
    </head>
  </v-content>
  </v-app>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
    />
</template>

<script>
import MerchHeader from "./components/MerchHeader.vue";
import MerchList from "./components/MerchList.vue";
import MerchFooter from "./components/MerchFooter.vue";
import LoaderComponent from "./components/LoaderComponent.vue";
import SideNavBar from "./components/SideNavBar.vue";
import * as data from "./shared/SharedData";

export default {
  name: "App",
  components: {
    MerchHeader,
    MerchList,
    MerchFooter,
    SideNavBar,
    LoaderComponent
  },
  computed: {
    
  },
  data() {
    return {
      category: [
        {key:"Airpod case cover", value:"Airpod case cover"},
        {key:"Car Accessory", value:"Car Accessory"}
      ],
      filter: "",
      filtered: [],
      show: "",
      totalAmount: 0,
      merchs: [],
      cart: [],
      orders: [],
      showSideBar: false
    };
  },
  methods: {
    async fetchMerchs() {
      this.showLoader();
      const res = await fetch("https://merch-anime-node.vercel.app/api");
      const data = await res.json();
      this.hideLoader();
      return data;
    },
    async getOrders() {
      this.showLoader();
      const res = await fetch("https://merch-anime-nodejs.vercel.app/getOrder");
      const data = await res.json();
      this.hideLoader();
      return data;
      
    },
    addToCart(merch) {
      const mItem = this.cart.find((item) => {
        return item.productId === merch.productId;
      });
      merch.qty += 1;
      if (mItem == null) {
        this.cart.push(merch);
      }
    },
    removeFromcart(merch) {
      const mItem = this.cart.findIndex((item) => {
        return item.productId === merch.productId;
      });
      if (merch.qty === 1 && mItem != -1) {
        merch.qty -= 1;
        this.cart.splice(mItem, 1);
      } else if (merch.qty > 1 && mItem != -1) {
        merch.qty -= 1;
      }
    },
    calculateAmount() {
      this.totalAmount = this.cart.reduce(
        (inc, item) => (inc += item.qty * item.price),
        0
      );
      return this.totalAmount;
    },
    showLoader() {
      this.loading = true;
    },
    hideLoader() {
      this.loading = false;
    },
    loader() {
      return data.sharedData.loader;
    },
    async orderPlaced() {
      this.cart.forEach((merch) => {
        merch.qty = 0;
      })
      this.cart = [];
      this.orders = await this.getOrders();
      this.orders = this.orders.reverse();
    },
    handleSideBar() {
      this.showSideBar = !this.showSideBar;
    },
    filterChange(event) {
      this.filter = event.target.value;
    },
  },
  watch: {
    cart: function () {
      this.totalAmount = this.cart.reduce((inc, item) => {
        inc += item.price;
      }, 0);
      console.log(this.totalAmount);
    },
  },
  async created() {
    this.merchs = await this.fetchMerchs();
    this.merchs.forEach(merch => {
      merch.qty = 0;
    });
    this.orders = await this.getOrders();
    this.orders = this.orders.reverse();
  },

};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@300&display=swap");
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: "Montserrat", sans-serif;
}

.myHeader {
  box-shadow: 5px -6px 20px rgba(22, 22, 22, 0.2);
}

.category-container {
  margin: 1.5rem;
}
#category-filter {
  width: 30%;
    height: 40px;
    background: white;
    border: 1px solid rgba(22,22,22,0.2);
    border-radius: 5px;
}


.myFooter {
  position: sticky;
  bottom: 0;
  background-color: white;
  box-shadow: 5px -6px 20px rgba(22, 22, 22, 0.2);
}
/* .container {
  max-width: 400px;
  margin: 30px auto;
  overflow: auto;
  min-height: 300px;
  border: 0.3em solid black;
  padding: 30px;
  border-radius: 5px;
} */

div {
  margin-bottom: 0.5em;
}

span {
  cursor: pointer;
}

.side-bar {
  position: fixed;
  float: left;
  height: 100vh;
  width: 20vw;
  background-color: white;
  z-index: 0;
  box-shadow: 5px 2px 20px rgba(22,22,22,0.2);
}
@media (max-width: 700px) {
  .side-bar {
    width: 50vw;
  }
}
</style>
