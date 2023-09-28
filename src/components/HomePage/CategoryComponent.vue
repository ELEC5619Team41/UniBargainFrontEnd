<template>
    <div style="display: flex">
        <div class="labelImg"></div>
        <div style="margin-left: 5px; margin-right: 5px;">
            <div class="labelContent" style="font-size: 20px; font-weight: bold; white-space: nowrap;">{{ label }}</div>
            <div class="labelContent">{{ GoodsNum }} Goods</div>
        </div>
    </div>
</template>

<script>
export default {
    name: "CategoryComponent",
    components: {
    },
    props: {
        label: String,
        GoodsNum: String,
    },
}
</script>

<style scoped>
.labelImg {
    width: 50px;
    height: 50px;
    background-color: red;
    border-radius: 10px;
}

.labelContent {
    height: 50%;
    width: 200px;
    align-items: center;
    display: flex;
    text-overflow: ellipsis;
    overflow: hidden;
}
</style>