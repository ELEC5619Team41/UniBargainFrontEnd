<template>
    <div style="display: flex; width: 100%; position: relative; margin-bottom: 10px;">

        <div style="margin-top: 10px; width: 20px;" v-if="this.showToggle">
            <input type="checkbox" v-model="outputData">
        </div>

        <div class="commentField">
            <div style="margin-top: 10px; display: flex; height: 95%; width: 100%;">
                <div ref="ProductImage" style="width: 175px; height: 175px; aspect-ratio: 1/1; ;"></div>
                <div class="textField" style="max-width: 70%; width: 80%; min-width: 20%">
                    <div style="width: 80%; overflow-wrap: break-word; overflow: hidden; max-height: 70%;">{{
                        this.item.itemName }}</div>
                    <div style="position: absolute;bottom: 0; display: flex; width: 60%;">
                        <div>$ {{ this.item.itemPrice }} </div>
                    </div>
                </div>

            </div>

        </div>

        <div style=" margin-top: 10px; width: 15%; height: 95%; position: absolute; right: 0;">
            <div style="display: flex;  align-items: center;">
                <div ref="sellerAvatar" style="width: 48px; height: 48px;"></div>
                <div style="margin-left: 10px;">{{this.item.sellerName}}</div>
            </div>
            <div style="display: flex; position: absolute; bottom: 0; align-items: center;">
                <div style="width: 48px; height: 48px;"></div>
                <ClickableText :text="$t('Delete')" @text-trigger="$emit('delete-cart-item', this.item.productId)"></ClickableText>
            </div>
        </div>

    </div>
</template>

<script>
import ClickableText from '../Common/ClickableText.vue'
export default {
    name: "ItemShoppingCartComponent",
    components: {
        ClickableText
    },
    props: {
        item: {
            type: Object,
            required: true
        },
        selectItemComputePrice: {
            type: Object,
            default: () => {
                return {
                    id: '',
                    checked: false
                }
            }
        },
        showToggle: {
            type: Boolean,
            default: true
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
    updated(){
        if (('itemImage' in this.item) && this.item.itemImage != '') {  
            console.log(this.item);    
            var imageBG = this.$refs.ProductImage;
            imageBG.style.backgroundImage = "url(" + this.item["itemImage"] + ")";
            imageBG.style.backgroundSize = "cover";
        }
        if (('sellerAvatar' in this.item) && this.item.sellerAvatar != '') { 
            console.log(this.item);
            var sellerAvatar = this.$refs.sellerAvatar;
            sellerAvatar.style.backgroundImage = "url(" + this.item["sellerAvatar"] + ")";
            sellerAvatar.style.backgroundSize = "cover";
        }
    },
    computed: {
        outputData: {
            get() {
                return this.selectItemComputePrice.checked
            },
            set(value) {
                console.log('set value', value)
                this.selectItemComputePrice.checked = value
                this.$emit('update:selectItemComputePrice', {
                    id: this.item.productId,
                    checked: value
                })
            }
        }
    }
}
</script>

<style scoped>
.commentField {
    align-items: left;
    width: 80%;
    height: 180px;
    margin-bottom: 5px;
    margin-top: 5px;
}

.textField {
    margin-left: 5px;
    position: relative;
}

.textField>* {
    text-align: left;
}
</style>