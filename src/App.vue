<template>

    <MerchHeader :cart="cart" class="myHeader" />
    <MerchList
      @addToCart="addToCart"
      @removeFromcart="removeFromcart"
      :merchs="merchs"
    />

    <LoaderComponent v-show="loader()"/>
    <MerchFooter
      v-show="calculateAmount() > 0"
      class="myFooter"
      :totalAmount="totalAmount"
    />
    <head>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
    </head>
    <!--Step 3 use the component-->
    <!-- <template v-for="book,index in books" :key=index>
    <h3> {{ index + ". " + book.title }}</h3>
  </template> 
  <div v-if="meal == 'breakfast'">Gwacomolli</div>
  <div v-else-if="meal == 'lunch'">Pulao</div>
  <div v-else-if="meal == 'dinner'">Chicken Curry</div>
  <div v-else>Nice Snacks</div>
  <div v-show="show">I'm hidden</div>
  
  <img v-bind:src=wallpaper :alt="alternate"/>
  <MyHeader bookName="Game of Thrones" authorName="George RR Martins" yourName="Prashant Rana"/> 
  <BookBox :books=books />
  -->
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
    />
</template>

<script>
// Step: 1 Import the components
// import MyHeader from './components/MyHeader.vue'
// import BookBox from './components/BookBox.vue'
import MerchHeader from "./components/MerchHeader.vue";
import MerchList from "./components/MerchList.vue";
import MerchFooter from "./components/MerchFooter.vue";
import LoaderComponent from "./components/LoaderComponent.vue";
import * as data from "./shared/SharedData";

export default {
  name: "App",
  // Step 2: Register the components
  components: {
    MerchHeader,
    MerchList,
    MerchFooter,
    LoaderComponent
    // MyHeader,
    // BookBox
  },
  computed: {
    
  },
  data() {
    return {
      books: [],
      wallpaper: require("./assets/wallpaper.jpg"),
      alternate: "Wallpaper",
      meal: "lunch",
      show: "",
      totalAmount: 0,
      merchs: [],
      cart: []
    };
  },
  updated() {
    console.log(this.loader);
  },
  // created() {
  //   fetch('https://upadhayay.github.io/db.json').then((response) => {
  //     return response.json();
  //   }).then((data) => {
  //     this.books = data.books;
  //     console.log(this.books);
  //   })
  // },
  methods: {
    //promoises
    async fetchMerchs() {
      const res = await fetch("http://localhost:5960/merchs");
      const data = await res.json();
      // console.log(data)
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
      console.log(this.cart);
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
      console.log(this.cart);
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
    }
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
  },

  // data() => this.data books
  // method => this.method => fetchbook
  // life cycle hooks created() => call our method here
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
</style>
