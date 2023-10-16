<template>
    <div style="display: flex;">
        <h1>{{$t('PersonalDetails')}}</h1>
    </div>
    <div style="display: flex; flex-wrap: wrap; justify-content: space-between;">
        <LabelTextFieldHorizontal :text="$t('FirstName')" v-model:inputText="this.uploadData.firstname" style="width: 43%;">
        </LabelTextFieldHorizontal>
        <LabelTextFieldHorizontal :text="$t('LastName')" v-model:inputText="this.uploadData.lastname" style="width: 43%;">
        </LabelTextFieldHorizontal>
        <LabelTextFieldHorizontal :text="$t('EmailAddress')" v-model:inputText="this.uploadData.emailAddress"
            style="width: 43%;">
        </LabelTextFieldHorizontal>
        <LabelTextFieldHorizontal :text="$t('Gender')" v-model:inputText="this.uploadData.gender" style="width: 43%;">
        </LabelTextFieldHorizontal>
        <LabelTextFieldHorizontal :text="$t('MobileNumber')" v-model:inputText="this.uploadData.mobileNumber"
            style="width: 43%;">
        </LabelTextFieldHorizontal>
        <div style="width:50%; height:1px;"></div>

        <div style="margin-top: 10px; margin-bottom:10px; width: 43%; aspect-ratio: 1/1;">
            <div class="label"
                style="text-align: left; margin-top: 12px; font-weight: bolder; color: black; font-size: 25px;">{{
                    $t('Avatar') }}</div>

            <div id="uploadImageField" style="display: flex; background-color: gray; width: 50%; aspect-ratio: 1/1;">
                <input type="file" accept="image/*" @change="previewImage" style="opacity: 0;" />
            </div>
        </div>

    </div>

    <RoundCornerButton @button-click="submitData" :text="$t('Post')" style="margin-top: 20px;"></RoundCornerButton>
</template>

<script>
import LabelTextFieldHorizontal from '@/components/Common/LabelTextFieldHorizontal.vue'
import RoundCornerButton from '@/components/Common/RoundCornerButton.vue'
import SendRequestComponent from "@/components/Common/SendRequestComponent";
export default {
    name: "UserProfilePage",
    components: {
        LabelTextFieldHorizontal,
        RoundCornerButton
    },
    data() {
        return {
            uploadData: {
                image: null,
                firstname: '',
                lastname: '',
                emailAddress: '',
                gender: '',
                mobileNumber: '',

            },
          url:'',

            preview: null,

        }
    },
    methods: {
        previewImage: function (event) {
            var input = event.target;
            if (input.files) {
                var reader = new FileReader();
                reader.onload = (e) => {
                    this.preview = e.target.result;
                    var imageBG = document.getElementById("uploadImageField");
                    imageBG.style.backgroundImage = "url(" + this.preview + ")";
                    imageBG.style.backgroundSize = "cover";
                }
                this.uploadData.image = input.files[0];
                reader.readAsDataURL(input.files[0]);
            }
        },

        submitData() {
            console.log(this.uploadData);
            fetch(this.url,SendRequestComponent.method.Request(this.uploadData));
        }
    }
}

</script>