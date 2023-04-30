<template>
    <footer id="footer" >
        <div class="footerItem"><h3>Total Amount: <span class="totalAmount">{{ currency(totalAmount) }}</span></h3></div>
        <div class="footerItem"><button class="order" @click="placeOrder()">Place Order</button></div>
    <MyDialog @closePopup="closePopup" :title="dialogTitle" :content="dialogContent" :visible="showDialog"/>
    </footer>
</template>
<script>
import MyDialog from './MyDialog.vue'
import { sharedData } from '../shared/SharedData';

export default {
    name: 'MerchFooter',
    props: {
        totalAmount: Number,
        cart: Array
    },
    data() {
        return {
            showDialog:false,
            dialogTitle: "Order Successful",
            dialogContent: "Yahoo! Order placed. Thank you for ordering!"
        }
    },
    methods: {
        currency(amount) {
            return `$${Number.parseFloat(amount).toFixed(2)}`;
        },
        async placeOrder() {
            const order = {
                orderid: new Date().toLocaleDateString(),
                items: this.cart
            }
            sharedData.loader = true;
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type" : "application/json", "accept": "*", "Connection": "keep-alive" },
                body: JSON.stringify(order),
                // mode: 'no-cors'
            }
            // let orderPlaced = false;
            await fetch("https://merch-anime-nodejs.vercel.app/placeOrder", requestOptions).then((response) => {
                response.json();
            }).then(data => {
                console.log(data);
                sharedData.loader = false;
                this.showDialog = true;
                // orderPlaced = true;
            }).catch(e => {
                console.log("Error while placing order!", e);
                sharedData.loader = false;
            });
            // if(orderPlaced) {
            // }
            
        },
        closePopup() {
            this.showDialog = false;
            sharedData.loader = true;
            setTimeout(() => {
                this.$emit('orderPlaced');
                sharedData.loader = false;
            }, 2000);
        }
    },
    components: {
        MyDialog
    }
}
</script>
<style scoped>
    .totalAmount {
        padding: 2px;
        border-radius: 4px;
        color: white;
        background: #cc0000;
    }
    #footer {
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: center;
        padding: 5px;
    }
    #footer .footerItem, #footer .navIfooterItemtem {
        display: inline-block;
    }

    button {
        width:fit-content;
        padding-left: 20px;
        padding-right: 20px;
        padding-top: 8px;
        padding-bottom: 8px;
        font-size: 1em;
        color: white;
        background-color: brown;
        border: 1px solid brown;
        border-radius: 5px;
        height: 40px;
    }
</style>
