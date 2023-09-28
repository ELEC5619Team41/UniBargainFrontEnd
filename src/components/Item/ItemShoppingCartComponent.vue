<template>
    <div style="display: flex; width: 100%; position: relative; margin-bottom: 10px;">

        <div style="margin-top: 10px; width: 20px;">
            <input type="checkbox" v-model="outputData">
        </div>

        <div class="commentField">
            <div style="margin-top: 10px; display: flex; height: 95%; width: 100%;">
                <div style="width: 175px; height: 175px; aspect-ratio: 1/1; background-color: aqua;"></div>
                <div class="textField" style="max-width: 70%; width: 80%; min-width: 20%">
                    <div style="width: 80%; overflow-wrap: break-word; overflow: hidden; max-height: 70%;">{{
                        this.item.itemName }}</div>
                    <div style="width: 80%;">{{ this.item.orderDate }}</div>
                    <div style="position: absolute;bottom: 0; display: flex; width: 60%;">
                        <div>{{ this.item.itemPrice }} $</div>
                    </div>
                </div>

            </div>

        </div>

        <div style=" margin-top: 10px; width: 15%; height: 95%; position: absolute; right: 0;">
            <div style="display: flex;  align-items: center;">
                <div style="width: 48px; height: 48px; background-color: green;"></div>
                <div style="margin-left: 10px;">{{this.item.username}}</div>
            </div>
            <div style="display: flex; position: absolute; bottom: 0; align-items: center;">
                <div style="width: 48px; height: 48px;"></div>
                <ClickableText :text="$t('Delete')" @text-trigger="$emit('delete-cart-item', this.item.orderNumber)"></ClickableText>
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
            required: true,
            default: () => {
                return {
                    id: '',
                    checked: false
                }
            }
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
    computed: {
        outputData: {
            get() {
                return this.selectItemComputePrice.checked
            },
            set(value) {
                console.log('set value', value)
                this.selectItemComputePrice.checked = value
                this.$emit('update:selectItemComputePrice', {
                    id: this.item.orderNumber,
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