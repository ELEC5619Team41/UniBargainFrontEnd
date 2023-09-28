<template>
    <CommonHeader></CommonHeader>
    <router-view class="root"></router-view>
    <CommonFooter></CommonFooter>
</template>
<script>
import CommonHeader from '@/components/Common/CommonHeader.vue';
import CommonFooter from '@/components/Common/CommonFooter.vue';
export default{
    name: "UserCommonView",
    components: {
        CommonHeader, CommonFooter
    }
}
</script>
<style scoped>
.root{
    max-width: 1124px;
    width: 100%;
    margin: 0 auto;
    height: 100%;
}
</style>