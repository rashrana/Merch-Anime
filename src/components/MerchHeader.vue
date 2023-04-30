<template>
  <nav id="navBar" class="nav">
    <div class="burger">
      <a href="javascript:void(0);" @click="$emit('handleSideBar')"
        ><span class="material-icons">menu</span></a
      >
    </div>
    <div class="navItem"><h1>Merch-Anime</h1></div>
    <div class="navItem">
      <span
        v-show="getCartItem() > 0"
        class="badge"
        >{{ getCartItem() }}</span
      ><span class="material-icons"
        @click="showCart = !showCart">shopping_cart</span>
    </div>

    <!-- <v-btn prepend-icon="mdi-vuetify" append-icon="mdi-vuetify" variant="plain">
      Button
    </v-btn> -->
    <!-- <CartPopup/> -->
    <CartPopup
    v-model:visible="showCart"
    title="modal"
    :cart="cart"
    @closePopup="closePopup"
  />
  </nav>
</template>
<script>
// import CartPopup from './CartPopup.vue'

// import { defineEmits, defineProps } from 'vue'
import CartPopup from './CartPopup.vue'


export default {
  name: "MerchHeader",
  data() {
    return {
      cartItem: 0,
      showCart: false
    };
  },
  methods: {
    openMenu() {},
    getCartItem() {
      const items = this.cart.reduce((inc, item) => (inc += item.qty), 0);
      console.log(items);
      return items;
    },
    closePopup() {
      this.showCart = false;
    }
  },
  props: {
    cart: Array,
  },
  components: {
    // CartPopup
    CartPopup
  },
};
</script>
<style scoped>
#navBar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  position: sticky;
    top: 0;
    background: white;
    z-index: 10;
}
#navBar .burger,
#navBar .navItem {
  display: inline-block;
}
.burger span,
.navItem span {
  font-size: 2em;
  color: black;
}

.logo {
  height: 80px;
  width: 200px;
}
.badge {
  position: absolute;
  font-size: 13px !important;
  float: right;
  background-color: red;
  color: white;
  border-radius: 50%;
  height: 18px;
  width: 18px;
  right: 4px !important;
  top: 2px;
  text-align: center;
  z-index: -10;
}
</style>
