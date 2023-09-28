<template>
    <div class="itemFrame" @click="clickItem()">
        <div class="itemImg"></div>
        <div class="itemDescription">
            {{this.ItemData.description}}
        </div>
        <div style="display: flex; align-items: center;">
            <div style="margin-left: 15px; width: 30px; height: 30px; background-color: gray; border-radius: 10px;"></div>
            <div style="margin-left: 25px; width: 100px; white-space: nowrap; text-overflow: ellipsis; overflow: hidden; text-align: left;">{{this.ItemData.uploader}}</div>
            <div style="margin-left: 25px; "> {{this.ItemData.rating}}</div>
        </div>
    </div>
</template>

<script>
export default {
    name: "GalleryItemcomponent",
    components: {
    },
    props: {
        ItemData: Object
    },
    methods: {
        clickItem(){
            this.$router.push('/userhome/itemdetailpage/'+this.ItemData.id)
        }
    }
}
</script>

<style scoped>
.itemFrame {
    width: 300px;
    height: 400px;
    background-color: white;
    margin: 10px;
    border-radius: 10px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
}

.itemImg {
    width: 280px;
    height: 240px;
    background-color: gray;
    margin-left: 10px;
    margin-top: 10px;
    border-radius: 10px;
}

.itemDescription {
    width: 280px;
    height: 110px;
    margin-left: 10px;
    word-wrap: break-word;
    overflow: hidden;
    text-overflow: ellipsis;

    display: -webkit-box;
    -webkit-line-clamp: 6;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>