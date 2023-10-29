<template>
    <div class="background" style="display: flex;">
        <div style="width: 30%; height: 100%; justify-content: center; display: flex; align-items: center;">
            <div class="footerLogo" style="height: 40px; width: 70px; "></div>
            <p class="text" style="padding-left: 30px;"></p>
        </div>
        <div style="width: 70%; display: flex; align-items: center; justify-content: right; margin-right: 50px;">
            <ClickableText class="text" :text="this.$t('ContactUs')" v-on:click="this.$router.push('contact')"></ClickableText>
            <ClickableText class="text" :text="this.$t('Complain')" v-on:click="this.$router.push('makeComplaints')"></ClickableText>
        </div>
    </div>
</template>

<script>
import ClickableText from './ClickableText.vue';

export default {
    name: "CommonFooter",
    components: { ClickableText }
}
</script>

<style scoped>
.background {
    width: 100%;
    height: 50px;
    background-color: #1e95d4;
    bottom: 0;
    position: fixed;
}

.centerButton {
    height: 100%;
    width: 20%;
    background-color: #1e95d4;
    outline: none;
    border: none;
}

.selected {
    background-color: #b5e5e7;
}

.text{
    color: white;
    margin-right: 80px;
}

.footerLogo{
    background-image: url("../../assets/unibargain logo.png");
    background-size: 100% 100%;
}
</style>