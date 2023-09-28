<template>
    <div class="block">
        <div class="edit-delete">
            <div style="width: 44px; height: 44px; background-color: gray; cursor: pointer;" @click="$emit('delete-data', this.inputData)"></div>
            <div style="width: 44px; height: 44px; background-color: black; cursor: pointer;" @click="$emit('modify-data', this.inputData)"></div>
        </div>
        <div style="margin-left: 5px;">
            <h3 style="text-align: left;">{{this.inputData.name}}</h3>
            <h5 style="text-align: left;">{{this.inputData.address}}</h5>
            <h5 style="text-align: left;">{{this.inputData.city}}</h5>
            <h5 style="text-align: left;">{{this.inputData.state}} {{this.inputData.zip}} {{this.inputData.country}}</h5>
            <h5 style="text-align: left;">{{this.inputData.mobileNumber}}</h5>
            <h5 style="text-align: left;">{{this.inputData.emailAddress}}</h5>
            <ClickableText :text="inputData.isDefault?'default':'set as default'" :size="'20px'" :decoration="inputData.isDefault?'':'underline'" :color="inputData.isDefault? 'green':''" @text-trigger="$emit('set-as-default', this.inputData.id);"></ClickableText>
        </div>
    </div>
</template>

<script>
import ClickableText from '../Common/ClickableText.vue';
export default {
    name: "AddressBlockComponent",
    components: { ClickableText },
    props: {
        inputData: null,
    },
}
</script>

<style scoped>
.block {
    outline: 1px solid black;
    width: 48%;
    min-width: 20rem;
    aspect-ratio: 2/1;
    margin: 5px;
    text-align: left;

    position: relative;
}

.edit-delete {
    position: absolute;
    top: 10px;
    right: 10px;
}
</style>