<template>
    <div class="container">
        <template v-for="merch of merchs" :key="merch.productId">
            <!-- <MerchItem :merch=merch /> -->
            <!-- <MerchCard :merch=merch /> -->
            <div class="card">
                <div class="image">
                    <img class="img" :src=merch.image alt="Product Image" />
                </div>
                <hr>
                <div class="description">
                    <h3 class="productName">{{ merch.productName }}</h3>
                    <div class="priceQty">
                        <span class="price">{{ currency(merch.price) }}</span>
                        <button v-show="merch.qty === 0" class="addMerch" @click="$emit('addToCart', merch)">Add to Cart</button>
                        <div v-show="merch.qty !== 0" class="quantityModifier">
                            <div class="decreament" @click="$emit('removeFromcart', merch)">-</div>
                            <input class="qtyInput" type="number" v-model="merch.qty" min="0" max="5" disabled>
                            <div class="increament" @click="merch.qty !== 5 ? $emit('addToCart', merch) : null" >+</div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>
<script>
// import MerchCard from './MerchCard.vue'
// import MerchItem from './MerchItem.vue';

export default {
    name: 'MerchList',
    props: {
        merchs: Array
    },
    components: [
        // MerchItem,
        // MerchCard
    ],
    methods: {
        currency(amount) {
            return `$${Number.parseFloat(amount).toFixed(2)}`;
        },
    },
    watch: {
        merchs: function() {
            this.merchs.forEach(merch => {
                merch.qty = 0;
            });
        }
    }
}
</script>
<style scoped>
    .container {
        display: flex;
        flex-wrap: wrap;
        margin: 1.5rem;
    }
    .card {
        height: 380px;
        width: 300px;
        box-shadow: 5px 6px 15px rgba(22,22,22, 0.2);
        margin:12px;
        border-radius: 8px;
    }
    .image {
        height: 70%;
    }
    .img {
        height: 100%;
        width: 100%;
    }
    hr {
        background-color: rgba(0,0,0,0.2);
        border: none;
    }
    .description {
        height: 30%;
        padding: 3%;
    }
    .addMerch {
        background-color: black;
        color: white;
        border: 1px solid black;
        border-radius: 5px;
        padding: 6px;
    }

    .productName {
        white-space: nowrap;
        overflow: hidden;
    }
    .priceQty {
        display: flex;
        justify-content: space-between;
    }

    .priceQty *,.quantityModifier * {
        display: inline-block;
    }

    .price {
        font-weight: 600;
        color: green;
    }

    .qtyInput {
        height: 80%;
        width: 30px;
        text-align: center;
        font-size: 16px;
        padding: 1px;
    }

    .increament {
        background: black;
        color: white;
        padding: 5px;
        padding-left: 9px;
        padding-right: 9px;
        border-radius: 5px;
        margin-left: 5px;
        margin-right: 5px;
    }

    .decreament {
        background: black;
        color: white;
        padding: 5px;
        padding-left: 10px;
        padding-right: 10px;
        border-radius: 5px;
        margin-left: 5px;
        margin-right: 5px;
    }
</style>