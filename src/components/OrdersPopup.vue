<template>
    <div id="exampleModalLong" v-show="visible" class="myModal myModal-open">
        <div class="modal-content">
            <!-- inside each order -->
            <div class="modal-header">
                <h2>Orders</h2>
                <span class="material-icons" @click="$emit('closePopup')">close</span>
            </div>
            <hr class="separator">
            <div class="modal-body">
                <div v-show="orders.length > 0" class="order-item" v-for="(item, index) of orders" :key="index">
                    <div class="order-title">
                        <h3 class="order-id"><span>{{ item._id }}</span><span>{{ item.orderid }}</span></h3>
                    </div>
                    <div class="order-body">
                        <div class="item" v-for="(merch, index) of item.items" :key="index">
                            <img :src="merch.image" height="60" width="60"/>
                            <div class="product-description">
                                <h3 class="productName">{{ merch.productName }}</h3>
                                <div class="priceQuantity">
                                    <span class="price">{{ merch.price }}</span>
                                    <span class="quantity"> X {{ merch.qty }}</span>
                                </div>
                            </div>
                            <hr v-if="index !== (item.items.length  - 1)">
                        </div>
                        
                    </div>
                </div>
                <div v-show="orders.length === 0" class="no-items">
                    <h3>No any orders!</h3>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'OrdersPopup',
    data() {
        return {
            dialog: false,
        }
    },
    props: {
        orders: Array,
        visible: Boolean
    }
}



</script>

<style>

.myModal {
    /* modals are hidden by default */

    /* modal container fixed across whole screen */
    position: fixed;
    inset: 0;

    /* z-index must be higher than everything else on the page */
    z-index: 10000;
    
    /* semi-transparent black background exposed by padding */
    background-color: white;
    padding: 40px;

    /* enables scrolling for tall modals */
    overflow: auto;
    height: fit-content;
    min-height: 200px;
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
.order-title {
    border: 1px solid rgba(44,44,44,0.4);
    box-shadow: 2px 4px 5px rgba(22,22,22,0.4);
    border-radius: 5px;
    padding: 10px;
    color: grey;
    margin-bottom: 0px;
}
.order-item {
    margin-bottom: 20px;
}
.order-item * {
    vertical-align: middle;
}
.order-id {
    display: flex;
    justify-content: space-between;
}
.order-body {
    background: rgba(220,220,220,0.3);
}
.item {
    padding: 5px;
    /* background: rgba(220,220,220,0.3);
    border: 1px solid rgba(200,200,200, 0.3);
    border-radius: 5px; */
}
.item *{
    vertical-align: middle;
}
.product-description {
    display: inline-block;
    margin-left: 15px;
    width: 80%;
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

