<template>
    <div>
        <div style="display: flex;">
            <h1>{{ $t('Addresses') }}</h1>
        </div>


        <li class="block" v-if="showList">

            <!-- id here should be generate by server actually, this part should be modify after the server is up -->
            <AddressBlockComponent v-for="(item, index) in this.addressList" :inputData="item"
                @set-as-default="SetAsDefault" @modify-data="ModifyData" @delete-data="DeleteData"></AddressBlockComponent>


        </li>


        <div v-if="!showList" style="display: flex; flex-wrap: wrap; justify-content: space-between;">
            <LabelTextFieldHorizontal :text="$t('Name')" v-model:inputText="this.uploadData.name"
                :defaultValue="this.uploadData.name" style="width: 43%;">
            </LabelTextFieldHorizontal>
            <LabelTextFieldHorizontal :text="$t('Address')" v-model:inputText="this.uploadData.address"
                :defaultValue="this.uploadData.address" style="width: 43%;">
            </LabelTextFieldHorizontal>
            <LabelTextFieldHorizontal :text="$t('City')" v-model:inputText="this.uploadData.city"
                :defaultValue="this.uploadData.city" style="width: 43%;">
            </LabelTextFieldHorizontal>
            <LabelTextFieldHorizontal :text="$t('State')" v-model:inputText="this.uploadData.state"
                :defaultValue="this.uploadData.state" style="width: 43%;">
            </LabelTextFieldHorizontal>
            <LabelTextFieldHorizontal :text="$t('Zip')" v-model:inputText="this.uploadData.zip"
                :defaultValue="this.uploadData.zip" style="width: 43%;">
            </LabelTextFieldHorizontal>
            <LabelTextFieldHorizontal :text="$t('Country')" v-model:inputText="this.uploadData.country"
                :defaultValue="this.uploadData.country" style="width: 43%;">
            </LabelTextFieldHorizontal>
            <LabelTextFieldHorizontal :text="$t('MobileNumber')" v-model:inputText="this.uploadData.mobileNumber"
                :defaultValue="this.uploadData.mobileNumber" style="width: 43%;">
            </LabelTextFieldHorizontal>
            <LabelTextFieldHorizontal :text="$t('EmailAddress')" v-model:inputText="this.uploadData.emailAddress"
                :defaultValue="this.uploadData.emailAddress" style="width: 43%;">
            </LabelTextFieldHorizontal>


            <!-- <div style="width:50%; height:1px;"></div> -->

            <div style="width: 43%; display: flex; margin-top: 35px;">
                <input type="checkbox" style="width: 20px; height: 20px;" v-model="this.uploadData.isDefault" />
                <label style="font-size: 20px; margin-left: 5px;">{{
                    $t("DefaultAddress")
                }}</label>
            </div>
        </div>




        <div style="margin-top: 35px;">
            <RoundCornerButton v-if="!showList" :text="$t('Back')" @button-click="CancelAddNewAddress" style="margin: 5px;">
            </RoundCornerButton>
            <RoundCornerButton :text="this.isModifyData?$t('UpdateNewAddress') : $t('AddNewAddress')" @button-click="AddNewAddress" style="margin: 5px;">
            </RoundCornerButton>
        </div>


    </div>
</template>

<script >
import AddressBlockComponent from './AddressBlockComponent.vue'
import RoundCornerButton from '../Common/RoundCornerButton.vue';
import LabelTextFieldHorizontal from '../Common/LabelTextFieldHorizontal.vue'
export default {
    name: "DeliveryAddressComponent",
    components: {
        AddressBlockComponent,
        RoundCornerButton,
        LabelTextFieldHorizontal
    },
    data() {
        return {
            uploadData: {
                id: -1,
                name: '',
                address: '',
                city: '',
                zip: '',
                country: '',
                emailAddress: '',
                state: '',
                mobileNumber: '',
                isDefault: false,
            },
            addressList: [
                {
                    id: 0,
                    name: 'John Doe',
                    address: '1234 Main St',
                    city: 'Anytown',
                    state: 'CA',
                    zip: '12345',
                    country: 'United States',
                    mobileNumber: '(555) 555-5555',
                    emailAddress: 'johndoe@gmail.com',
                    isDefault: true,
                },
                {
                    id: 1,
                    name: 'John Doe',
                    address: '1234 Main St',
                    city: 'Anytown',
                    state: 'CA',
                    zip: '12345',
                    country: 'United States',
                    mobileNumber: '(555) 555-5555',
                    emailAddress: 'none',
                    isDefault: false,
                },
                {
                    id: 2,
                    name: 'John Doe',
                    address: '1234 Main St',
                    city: 'Anytown',
                    state: 'CA',
                    zip: '12345',
                    country: 'United States',
                    mobileNumber: '(555) 555-5555',
                    emailAddress: 'none',
                    isDefault: false,
                },
                {
                    id: 3,
                    name: 'John Doe',
                    address: '1234 Main St',
                    city: 'Anytown',
                    state: 'CA',
                    zip: '12345',
                    country: 'United States',
                    mobileNumber: '(555) 555-5555',
                    emailAddress: 'none',
                    isDefault: false,
                },
            ],
            showList: true,
            isModifyData: false,
        }
    },
    methods: {
        SetAsDefault: function (e) {
            this.addressList.forEach(element => {
                element.isDefault = false
            });
            this.addressList = this.addressList.map((address) =>
                address.id === e ? { ...address, isDefault: true } : address
            )
        },
        GetDefualtForm(){
            return {
                id: -1,
                name: '',
                address: '',
                city: '',
                zip: '',
                country: '',
                emailAddress: '',
                state: '',
                mobileNumber: '',
                isDefault: false,
            }
        },
        AddNewAddress() {
            if (this.showList) {
                if(!this.isModifyData){
                    this.uploadData = this.GetDefualtForm()
                }
                this.showList = false
                return
            } else {
                if (this.isModifyData) {
                    this.addressList = this.addressList.map((address) =>
                        address.id === this.uploadData.id ? this.uploadData : address
                    )
                    if(this.uploadData.isDefault){
                        this.SetAsDefault(this.uploadData.id)
                    }
                } else {
                    this.uploadData.id = Math.floor(Math.random() * 100000)
                    if (this.uploadData.isDefault || this.addressList.length === 0) {
                        this.uploadData.isDefault = true
                        this.SetAsDefault(this.uploadData.id)
                    }
                    this.addressList.push(this.uploadData)
                }

                this.showList = true
                this.isModifyData = false
            }

        },
        CancelAddNewAddress() {
            this.showList = true
            this.isModifyData = false
        },
        ModifyData: function (inputData) {
            this.isModifyData = true
            this.AddNewAddress()
            this.uploadData = inputData
        },
        DeleteData: function (inputData) {
            if (inputData.isDefault) {
                this.addressList = this.addressList.filter((address) => address.id !== inputData.id)
                if(this.addressList.length !== 0){
                    this.addressList[0].isDefault = true
                }
            } else {
                this.addressList = this.addressList.filter((address) => address.id !== inputData.id)
            }
        },
    }
}
</script>

<style scoped>
.block {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

}


@media (max-width: 1099px) {
    .block {
        justify-content: space-around;
    }
}</style>