<template>
    <div id="exampleModalLong" v-show="visible" class="myModal myModal-open">
        <div class="modal-content">
            <div class="modal-header">
                <h2>Cart</h2>
                <span class="material-icons" @click="$emit('closePopup')">close</span>
            </div>
            <hr class="separator">
            <div class="modal-body">
                <div v-show="cart.length > 0" class="cart-item" v-for="(item, index) of cart" :key="index">
                    <img :src="item.image" height="100" width="100"/>
                    <div class="product-description">
                        <h3 class="productName">{{ item.productName }}</h3>
                        <div class="priceQuantity">
                            <span class="price">{{ item.price }}</span>
                            <span class="quantity"> X {{ item.qty }}</span>
                        </div>
                    </div>
                </div>
                <div v-show="cart.length === 0" class="no-items">
                    <h3>No items added to cart!</h3>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'CartPopup',
    data() {
        return {
            dialog: false,

        }
    },
    props: {
        title: String,
        visible: Boolean,
        cart: Array
    }
}



</script>

<style scoped>

.myModal {
    position: fixed;
    margin-bottom: 100px !important;
    margin-top: 70px !important;
    inset: 0;
    z-index: 10000;
    background-color: white;
    padding: 40px;
    overflow: hidden;
    height: fit-content;
    max-height: 70vh;
    width: fit-content;
    min-width: 600px;
    margin: auto;
    border-radius: 10px;
    box-shadow: 5px 6px 16px rgba(22,22,22,0.6);
}

.myModal.open {
    display: block;
}

.modal-header {
    display: flex;
    justify-content: space-between;
}
.modal-header * {
    vertical-align: middle;
}

.modal-body {
    overflow-y: scroll;
    height: fit-content;
    max-height: 50vh;
}

.separator {
    width: 106%;
    left: -3% !important;
    position: relative;
    margin-top: 20px;
    margin-bottom: 30px;
}

.cart-item {
    padding: 5px;
    background: rgba(220,220,220,0.3);
    border: 1px solid rgba(200,200,200, 0.3);
    border-radius: 5px;
}

.cart-item * {
    vertical-align: middle;
}

.product-description {
    display: inline-block;
    margin-left: 15px;
    width: 70%;
}
.productName {
    white-space: nowrap;
    overflow: hidden;
}

.price {
    color: green;
    font-weight: 600;
}
.quantity {
    font-weight: 600;
    float: right;
}
@media (max-width: 1000px) {
  .myModal {
    height: fit-content !important;
    min-height: fit-content !important;
    max-height: 90vh;
    width: fit-content !important;
    min-width: 90vw !important;
  }
}
</style>

