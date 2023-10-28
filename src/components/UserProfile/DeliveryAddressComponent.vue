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


        <div v-if="!showList" style="display: flex; flex-wrap: wrap; justify-content: space-between; ">
            <LabelTextFieldHorizontal :text="$t('Name')" v-model:inputText="this.addressUploadData.name"
                :defaultValue="this.addressUploadData.name" style="width: 43%;">
            </LabelTextFieldHorizontal>
            <LabelTextFieldHorizontal :text="$t('Address')" v-model:inputText="this.addressUploadData.address"
                :defaultValue="this.addressUploadData.address" style="width: 43%;">
            </LabelTextFieldHorizontal>
            <LabelTextFieldHorizontal :text="$t('City')" v-model:inputText="this.addressUploadData.city"
                :defaultValue="this.addressUploadData.city" style="width: 43%;">
            </LabelTextFieldHorizontal>
            <LabelTextFieldHorizontal :text="$t('State')" v-model:inputText="this.addressUploadData.state"
                :defaultValue="this.addressUploadData.state" style="width: 43%;">
            </LabelTextFieldHorizontal>
            <LabelTextFieldHorizontal :text="$t('Zip')" v-model:inputText="this.addressUploadData.zip"
                :defaultValue="this.addressUploadData.zip" style="width: 43%;">
            </LabelTextFieldHorizontal>
            <LabelTextFieldHorizontal :text="$t('Country')" v-model:inputText="this.addressUploadData.country"
                :defaultValue="this.addressUploadData.country" style="width: 43%;">
            </LabelTextFieldHorizontal>
            <LabelTextFieldHorizontal :text="$t('MobileNumber')" v-model:inputText="this.addressUploadData.mobileNumber"
                :defaultValue="this.addressUploadData.mobileNumber" style="width: 43%;">
            </LabelTextFieldHorizontal>
            <LabelTextFieldHorizontal :text="$t('EmailAddress')" v-model:inputText="this.addressUploadData.emailAddress"
                :defaultValue="this.addressUploadData.emailAddress" style="width: 43%;">
            </LabelTextFieldHorizontal>


            <!-- <div style="width:50%; height:1px;"></div> -->

            <div style="width: 43%; display: flex; margin-top: 35px;">
                <input type="checkbox" style="width: 20px; height: 20px;" v-model="this.addressUploadData.isDefault" />
                <label style="font-size: 20px; margin-left: 5px;">{{
                    $t("DefaultAddress")
                }}</label>
            </div>
        </div>




        <div style="margin-top: 35px; padding-bottom:70px;">
            <RoundCornerButton v-if="!showList" :text="$t('Back')" @button-click="CancelAddNewAddress" style="margin: 5px;">
            </RoundCornerButton>
            <RoundCornerButton :text="this.isModifyData ? $t('UpdateNewAddress') : $t('AddNewAddress')"
                @button-click="AddNewAddress" style="margin: 5px;">
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
            addressUploadData: {
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
            uploadData: {
                image: null,
                firstname: '',
                lastname: '',
                emailAddress: '',
                gender: '',
                mobileNumber: '',
                addressList: [],
            },
            addressList: [
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
            this.updateData()
        },
        GetDefualtForm() {
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
                if (!this.isModifyData) {
                    this.addressUploadData = this.GetDefualtForm()
                }
                this.showList = false
                return
            } else {
                if (this.isModifyData) {
                    this.addressList = this.addressList.map((address) =>
                        address.id === this.addressUploadData.id ? this.addressUploadData : address
                    )
                    if (this.addressUploadData.isDefault) {
                        this.SetAsDefault(this.addressUploadData.id)
                    }
                } else {
                    this.addressUploadData.id = Math.floor(Math.random() * 100000)
                    if (this.addressUploadData.isDefault || this.addressList.length === 0) {
                        this.addressUploadData.isDefault = true
                        this.SetAsDefault(this.addressUploadData.id)
                    }
                    this.addressList.push(this.addressUploadData)
                }

                this.showList = true
                this.isModifyData = false
            }
            this.updateData()
        },
        CancelAddNewAddress() {
            this.showList = true
            this.isModifyData = false
        },
        ModifyData: function (inputData) {
            this.isModifyData = true
            this.AddNewAddress()
            this.addressUploadData = inputData
            this.updateData()
        },
        DeleteData: function (inputData) {
            if (inputData.isDefault) {
                this.addressList = this.addressList.filter((address) => address.id !== inputData.id)
                if (this.addressList.length !== 0) {
                    this.addressList[0].isDefault = true
                }
            } else {
                this.addressList = this.addressList.filter((address) => address.id !== inputData.id)
            }
            this.updateData()
        },
        initData() {

            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("username", this.$store.state.username);
            myHeaders.append("token", this.$store.state.token);

            var data = '';

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: JSON.stringify(data),
                redirect: 'follow'
            };

            fetch("http://localhost:28888/user/get", requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log("data");

                    console.log(data);
                    this.uploadData['firstname'] = data.data['name'].split(' ')[0];
                    this.uploadData['lastname'] = data.data['name'].split(' ')[1];
                    this.uploadData['emailAddress'] = data.data['extend']['email'];
                    this.uploadData['gender'] = data.data['extend']['gender'];
                    this.uploadData['mobileNumber'] = data.data['extend']['mobile'];
                    this.addressList = 'address' in data.data['extend'] ? data.data['extend']['address']: [];
                    this.uploadData['addressList'] = this.addressList;
                })
                .catch(error => console.log('error', error));
        },
        async updateData(){

            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("username", this.$store.state.username);
            myHeaders.append("token", this.$store.state.token);

            var data = {"extend":{"email": this.uploadData['emailAddress'], "gender": this.uploadData['gender'], "mobile": this.uploadData['mobileNumber'], "address": this.addressList}};

            var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(data),
            redirect: 'follow'
            };

            await fetch("http://localhost:28888/user/setExtend", requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
            .catch(error => console.log('error', error));
        }
    },
    mounted(){
        // this.updateData()
        this.initData()
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
}
</style>