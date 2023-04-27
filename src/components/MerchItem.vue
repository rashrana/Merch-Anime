<template>
    <div class="card">
        <span>{{ merch.productId }}</span>
    </div>
</template>
<script>

export default {
    name: 'MerchItem',
    props: {
        merch: Array,
    },
    created() {
        console.log(this.merch);
    }
}
</script>
<style scoped>
    .card {
        height: 400px;
        width: 300px;
        box-shadow: 5px 6px 20px rgba(22,22,22, 0.5);
    }
</style>
