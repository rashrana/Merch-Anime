<template>
    <div id="exampleModalLong" v-show="visible" class="myModal myModal-open">
        <div class="modal-content">
            <div class="modal-header">
                <span>{{ title }}</span>
                <span class="material-icons" @click="$emit('closePopup')">close</span>
            </div>
            <hr class="separator">
            <div class="modal-body">
                {{ content }}
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'MyDialog',
    data() {
        return {
            dialog: false,

        }
    },
    props: {
        visible: Boolean,
        title: String,
        content: String
    }
}



</script>

<style scoped>

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

.separator {
    width: 106%;
    left: -3% !important;
    position: relative;
    margin-top: 20px;
    margin-bottom: 30px;
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

