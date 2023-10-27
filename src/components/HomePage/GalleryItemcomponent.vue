<template>
    <div class="itemFrame" @click="clickItem()">
        <div ref="firstImg" class="itemImg"></div>
        <div class="itemName">
            {{ this.ItemData.name }}
        </div>
        <div style="display: flex; align-items: center;">

            <div ref="uploaderAvatar"
                style="margin-left: 15px; width: 30px; height: 30px; border-radius: 10px; background-color: red;">
            </div>
            <div
                style="margin-left: 25px; width: 100px; white-space: nowrap; text-overflow: ellipsis; overflow: hidden; text-align: left;">
                {{ this.ItemData.uploader }}</div>
            <div style="margin-left: 25px; "> {{ this.ItemData.rating }}</div>
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
        clickItem() {
            this.$router.push('/userhome/itemdetailpage/' + this.ItemData.id)
        }
    },
    mounted() {
        
        if (('image' in this.ItemData) && this.ItemData.image != '') {
            console.log('this.ItemData', this.ItemData)
            var firstImg = this.$refs.firstImg
            this.text='load'
            firstImg.style.backgroundImage = "url(" + this.ItemData.image + ")";
            firstImg.style.backgroundSize = "cover";
        }

        if(('uploaderAvatar' in this.ItemData) &&this.ItemData.uploaderAvatar != ''){
            console.log('this.ItemData', this.ItemData)
            var uploaderAvatar = this.$refs.uploaderAvatar
            uploaderAvatar.style.backgroundImage = "url(" + this.ItemData.uploaderAvatar + ")";
            uploaderAvatar.style.backgroundSize = "cover";
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
    position: relative;
    width: 280px;
    height: 240px;
    margin-left: 10px;
    top: 10px;
    border-radius: 10px;

    background-color: gray;
}

.itemName {
    width: 280px;
    height: 110px;
    margin-left: 10px;
    word-wrap: break-word;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-top: 10px;

    font-size: 30px;
    display: -webkit-box;
    -webkit-line-clamp: 6;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
}</style>