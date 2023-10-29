<template>
    <div class="commentField" style="margin-left: 20px; margin-left: 20px;">
        <div style="display: flex;">
            <div style="text-align: right; margin-left: auto; display: flex;">
                <div ref="avatar" style="width: 35px; height: 35px; background-color: blue; margin-right: 5px;"></div>
                <div style="height: 35px; display: flex; align-items: center;">
                    {{ this.item.username }}
                </div>
            </div>
            <div v-if="this.item.tag == 'collection'"
                style="width: 65px; height: 35px; background-color: white; margin-left: 5px; align-items: center; text-align: center; display: flex; border-radius: 5px;"
                @click="$emit('remove-collection')">
                Remove
            </div>
        </div>

        <div style="margin-top: 10px; display: flex;">
            <div ref="previewImage" style="width: 15%; aspect-ratio: 1/1; background-color: aqua;"></div>
            <div class="textField" style="width: 85%;">
                <ClickableText :text="this.item.itemName" :size="'20px'" @text-trigger="jumpToItem"></ClickableText>
                <div>{{ this.item.orderDate }}</div>

                <div style="position: absolute;bottom: 0; display: flex; width: 100%;">
                    <div>${{ this.item.itemPrice }}</div>
                    <RoundCornerButton style="right: 0px; bottom: 0px; position: absolute;" :width="'100px'" :height="'40px'"
                        :text="tagKeyPairs[this.item.status]"></RoundCornerButton>
                    <RoundCornerButton v-if="this.comment" style="right: 0px; bottom: -43px; position: absolute;" :width="'100px'" :height="'40px'"
                        :text="'Comment'"></RoundCornerButton>
                        
                </div>

            </div>

        </div>


    </div>
</template>

<script>
import RoundCornerButton from '../Common/RoundCornerButton.vue';
import ClickableText from '../Common/ClickableText.vue';
export default {
    name: "ItemRecordComponent",
    components: {
        RoundCornerButton,
        ClickableText
    },
    props: {
        item: {
            type: Object,
            required: true
        },
        comment:{
            type: Object,
            required: true
        }
    },
    data() {
        return {
            tagKeyPairs: {
                "unshipped": this.$t('Unshipped'),
                "unreceived": this.$t('Unreceived'),
                "unrated": this.$t('Unrated'),
                "refund": this.$t('Refund')
            },
        }
    },
    methods: {
        jumpToItem() {
            this.$router.push('/userhome/itemdetailpage/' + this.item.productId)
        }
    },
    mounted() {
        if ('image' in this.item && this.item.image != '') {

            var previewImage = this.$refs.previewImage;
            previewImage.style.backgroundImage = `url(${this.item.image})`;
            previewImage.style.backgroundSize = "cover";
        } else {
            console.log('no img')
            var previewImage = this.$refs.previewImage;
            previewImage.style.backgroundImage = 'none';
        }

        if('avatar' in this.item){
            var avatar = this.$refs.avatar;
            avatar.style.backgroundImage = `url(${this.item.avatar})`;
            avatar.style.backgroundSize = "cover";
        }


    },
    updated(){
        if ('image' in this.item && this.item.image != '') {

            var previewImage = this.$refs.previewImage;
            previewImage.style.backgroundImage = `url(${this.item.image})`;
            previewImage.style.backgroundSize = "cover";
        } else {
            console.log('no img')
            var previewImage = this.$refs.previewImage;
            previewImage.style.backgroundImage = 'none';
        }

        if('avatar' in this.item){
            var avatar = this.$refs.avatar;
            avatar.style.backgroundImage = `url(${this.item.avatar})`;
            avatar.style.backgroundSize = "cover";
        }
    }
}
</script>

<style scoped>
.commentField {
    align-items: left;
    width: 95%;
    height: 180px;
    margin-bottom: 5px;
    margin-top: 5px;
}

.textField {
    margin-left: 15px;
    position: relative;
}

.textField>* {
    text-align: left;
}
</style>