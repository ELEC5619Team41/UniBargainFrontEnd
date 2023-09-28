<template>
    <div style="align-items: center; justify-content: center; display: flex; margin-top: 20px;">
        <div style="min-height: 200px; width: 80%; display: flex; justify-content: space-between;">

            <!-- select bar -->
            <div style="width: 15%; height: fit-content; border-radius: 15px; overflow: hidden;">
                <button v-for="(item, index) in this.itemNames" @click="buttonOnClick(index)"
                    :class="'centerButton ' + (selectedButton == index ? 'selected' : '')">{{ item }}</button>
            </div>

            <!-- content -->
            <div style="width: 75%; height: fit-content; ">
                <PersonalDetailComponent v-if="selectedButton == 0"></PersonalDetailComponent>
                <DeliveryAddressComponent v-else-if="selectedButton == 2"></DeliveryAddressComponent>
                <MyFullCalendar v-else-if="selectedButton == 3"></MyFullCalendar>
            </div>
        </div>
    </div>
</template>

<script>
import PersonalDetailComponent from '@/components/UserProfile/PersonalDetailComponent.vue'
import DeliveryAddressComponent from '@/components/UserProfile/DeliveryAddressComponent.vue'
import MyFullCalendar from '@/components/UserProfile/MyFullCalendar.vue'

export default {
    name: "UserProfilePage",
    components: {
        PersonalDetailComponent,
        DeliveryAddressComponent,
        MyFullCalendar
    },
    data() {
        return {
            selectedButton: 0,
            itemNames: [
                this.$t('PersonalDetail'), this.$t('PaymentSetup'), this.$t('DeliveryAddress'), this.$t('ClassSchedule'),
            ]
        }
    },
    methods: {
        buttonOnClick(e) {
            this.selectedButton = e
        }
    },
}
</script>

<style scoped>
.centerButton {
    padding: 15px;
    width: 100%;
    background-color: rgb(241, 241, 241);
    /* outline: none; */
    border: none;
}

.selected {
    background-color: rgb(209, 209, 209);
}
</style>