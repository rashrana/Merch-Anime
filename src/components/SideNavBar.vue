<template>
    <div class="side-bar">
        <div @click="openOrders()" class="menu-options">
            Orders
        </div>
        <OrdersPopup @closePopup="openOrders()" :visible="showOrders" :orders="orders"/>
    </div>
</template>

<script>
import OrdersPopup from './OrdersPopup.vue';


export default {
    name: 'SideNavBar',
    props: {
        orders: Array
    },
    components: {
        OrdersPopup
    },
    data() {
        return {
            showOrders: false,
        }
    },
    methods: {
        openOrders() {
            this.showOrders = !this.showOrders;
        }
    }
}
</script>

<style>
.menu-options {
    padding: 15px;
    font-size: 1.2em;
    font-weight: 600;
    border-bottom: 1px solid rgba(22,22,22,0.1);
    cursor: pointer;
}
</style>