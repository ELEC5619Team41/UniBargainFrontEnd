<template>
    <div class="itemFrame" @click="clickItem()">
        <!-- <div class="itemImg" style:{background-image="url(`${this.ItemData.image}`)" }></div> -->
        <img v-bind:src="`${this.ItemData.image}`" class="itemImg">
        <div class="itemName">
            {{this.ItemData.name}}
        </div>
        <div style="display: flex; align-items: center;">
            
            <div style="margin-left: 15px; width: 30px; height: 30px; background-image: `url(${this.ItemData.uploaderAvatar})`; border-radius: 10px;"></div>
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
    margin-left: 10px;
    margin-top: 10px;
    border-radius: 10px;
}

.itemName {
    width: 280px;
    height: 110px;
    margin-left: 10px;
    word-wrap: break-word;
    overflow: hidden;
    text-overflow: ellipsis;

    font-size:30px;
    display: -webkit-box;
    -webkit-line-clamp: 6;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>