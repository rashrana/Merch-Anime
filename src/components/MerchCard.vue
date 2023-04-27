<template>
    merch
</template>

<script>

export default {
    name: 'MerchCard',
    props: {
        merch: Array
    },
    created() {
        console.log(this.merch);
    }
}
</script>

<style>

</style>