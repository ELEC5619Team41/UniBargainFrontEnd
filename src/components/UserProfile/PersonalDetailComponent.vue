<template>
    <div style="display: flex;">
        <h1>{{$t('PersonalDetails')}}</h1>
    </div>
    <div style="display: flex; flex-wrap: wrap; justify-content: space-between;">
        <LabelTextFieldHorizontal :text="$t('FirstName')" v-model:inputText="this.uploadData.firstname" :defaultValue="this.uploadData.firstname" style="width: 43%;">
        </LabelTextFieldHorizontal>
        <LabelTextFieldHorizontal :text="$t('LastName')" v-model:inputText="this.uploadData.lastname" :defaultValue="this.uploadData.lastname" style="width: 43%;">
        </LabelTextFieldHorizontal>
        <LabelTextFieldHorizontal :text="$t('EmailAddress')" v-model:inputText="this.uploadData.emailAddress" :defaultValue="this.uploadData.emailAddress" 
            style="width: 43%;">
        </LabelTextFieldHorizontal>
        <LabelTextFieldHorizontal :text="$t('Gender')" v-model:inputText="this.uploadData.gender" :defaultValue="this.uploadData.gender" style="width: 43%;">
        </LabelTextFieldHorizontal>
        <LabelTextFieldHorizontal :text="$t('MobileNumber')" v-model:inputText="this.uploadData.mobileNumber" :defaultValue="this.uploadData.mobileNumber" 
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

    <RoundCornerButton @button-click="submitData" :text="$t('Post')" style="margin-bottom: 70px;"></RoundCornerButton>
</template>

<script>
import LabelTextFieldHorizontal from '@/components/Common/LabelTextFieldHorizontal.vue'
import RoundCornerButton from '@/components/Common/RoundCornerButton.vue'
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
    mounted() {
        this.SendRequest();
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
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("username", this.$store.state.username);
            myHeaders.append("token", this.$store.state.token);

            var data = {"name": this.uploadData['firstname']+' '+this.uploadData['lastname']};

            var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(data),
            redirect: 'follow'
            };

            fetch("http://localhost:28888/user/setName", requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
            .catch(error => console.log('error', error));

            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("username", this.$store.state.username);
            myHeaders.append("token", this.$store.state.token);

            var data = {"extend":{"email": this.uploadData['emailAddress'], "gender": this.uploadData['gender'], "mobile": this.uploadData['mobileNumber']}};

            var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(data),
            redirect: 'follow'
            };

            fetch("http://localhost:28888/user/setExtend", requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
            .catch(error => console.log('error', error));

            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("username", this.$store.state.username);
            myHeaders.append("token", this.$store.state.token);

            var data = {"avatar": this.preview};

            var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(data),
            redirect: 'follow'
            };

            fetch("http://localhost:28888/user/setAvatar", requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.$router.go('/userhome/userprofilepage');
            })
            .catch(error => console.log('error', error));
            
        },
        SendRequest(){

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
                console.log(data);
                this.uploadData['firstname'] = data.data['name'].split(' ')[0];
                this.uploadData['lastname'] = data.data['name'].split(' ')[1];
                this.uploadData['emailAddress'] = data.data['extend']['email'];
                this.uploadData['gender'] = data.data['extend']['gender'];
                this.uploadData['mobileNumber'] = data.data['extend']['mobile'];
                var imageBG = document.getElementById("uploadImageField");
                imageBG.style.backgroundImage = "url(" + data.data['avatar'] + ")";
                imageBG.style.backgroundSize = "cover";
            })
            .catch(error => console.log('error', error));
        }// send request to back end
    }
}

</script>