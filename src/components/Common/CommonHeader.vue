<template>
    <div class="background" style="display: flex;">
        <div style="width: 20%; height: 100%; justify-content: center; display: flex; align-items: center;">
            <div class="headerLogo" style="height: 40px; width: 70px;"></div>
        </div>
        <div style="width: 60%; height: 100%; display: flex;">
            <button v-for="(item, index) in this.itemNames" @click="buttonOnClick(index, item)"
                :class="'centerButton ' + (selectedButton == index ? 'selected' : '')">{{ item.title }}</button>
        </div>
        <div style="width: 5%; height: 100%; justify-content: center; display: flex; align-items: center;">
            <div ref="uploadImageField" style="height: 30px; width: 30px; "
                @click="buttonOnClick(-1, { title: this.$t('UserProfile'), link: '/userhome/userprofilepage' })"></div>
        </div>
        <div style="width: 5%; height: 100%; color: white; justify-content: center; display: flex; align-items: center;" @click="logout()">Log Out
        </div>
    </div>
</template>

<script>
export default {
    name: "CommonHeader",
    methods: {
        buttonOnClick(e, item) {
            this.selectedButton = e
            this.$router.push(item.link)
        },
        SendRequest() {

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
                    var imageBG = this.$refs.uploadImageField;
                    imageBG.style.backgroundImage = "url(" + data.data['avatar'] + ")";
                    imageBG.style.backgroundSize = "cover";
                })
                .catch(error => console.log('error', error));
        },
        logout(){
        this.$store.commit('update', { "username": '', "token": '', "id": ''});
        this.$router.push('/loginregister');    
    }
    },
    data() {
        return {
            selectedButton: 0,
            itemNames: [
                { title: this.$t('Home'), link: '/userhome/userhomepage' }, { title: this.$t('Trading'), link: '/userhome/usertradingpage' }, { title: this.$t('Shopping Cart'), link: '/userhome/usershoppingcartpage' }, { title: this.$t('Message'), link: '/userhome/usermessagepage' },
                { title: this.$t('Publish Item'), link: '/userhome/publishidlepage' }, { title: this.$t('Seek Trade'), link: '/userhome/seektradepage' }
            ]
        }
    },
    created() {
        var url = this.$router.currentRoute.value.fullPath
        if (url == '/userhome/userprofilepage') {
            this.selectedButton = -1
        } else if (url == '/userhome/transactionendpage') {
            this.selectedButton = 5
        }
        for (let index = 0; index < this.itemNames.length; index++) {
            let questionmark = url.indexOf('?');
            let Url;
            if (questionmark !== 0) {
                Url = url.substring(0, questionmark)
            }
            else {
                Url = url;
            }
            if (this.itemNames[index].link == Url) {
                this.selectedButton = index
            }
        }
    },
    mounted() {
        this.SendRequest();
    },

}
</script>

<style scoped>
.background {
    width: 100%;
    height: 50px;
    background-color: #1e95d4;
}

.centerButton {
    height: 100%;
    width: 20%;
    background-color: #1e95d4;
    outline: none;
    border: none;
}

.selected {
    background-color: #7dd1df;
}

.headerLogo{
    background-image: url("../../assets/unibargain logo.png");
    background-size: 100% 100%;
}

button{
    color:white;
}
</style>