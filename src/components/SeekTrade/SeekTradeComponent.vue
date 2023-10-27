<template>
    <div class="itemFrame">
        <div style="position: relative; top: 10px; display: flex; overflow: auto">
            <div v-for="img in this.ItemData.info.images" class="itemImg"
                :style="{ 'background-image': 'url(' + img + ')', 'background-size': 'cover' }"></div>
            <div ref="firstImg" class="itemImg"></div>
        </div>

        <div class="itemName">
            {{ this.ItemData.info.name }}
        </div>

        <div style="height: 140px; text-align: left; margin-left: 10px; margin-right:10px">
            {{ this.ItemData.info.description }}
        </div>

        <div style="display: flex; align-items: center;">
            <div ref="uploaderAvatar"
                style="margin-left: 15px; width: 30px; height: 30px; border-radius: 10px; background-color: red;">
            </div>
            <div
                style="margin-left: 25px; width: 100px; white-space: nowrap; text-overflow: ellipsis; overflow: hidden; text-align: left;">
                {{ this.user.username }}</div>
            <el-button v-if="this.isNotSelf" @click="goChat">Chat Now</el-button>
        </div>
    </div>
    <div class="commentFrame">

        <div style="width:100%; height:30px; background-color: white; display: flex; ">
            <input style="width:80%" />
            <el-button style="width:20%">Comment</el-button>
        </div>

        <div style="width:100%; background-color: white; display: flex; margin-top: 5px; word-wrap: break-word; text-align: left">
            someone: awieofiuewahuiawwwwwwwwwwwww wwwwwwwwwwwwwwwwwwwwwwwwwwwnewaigol neeeeeeeeeeeeeeeeeeeeee eeeeeeeeeeeeeeeeeeeeeee qdwdqwd
        </div>

        <div style="width:100%; background-color: white; display: flex; margin-top: 5px; word-wrap: break-word; text-align: left">
            someone: awieofiuewahuiawwwwwwwwwwwww wwwwwwwwwwwwwwwwwwwwwwwwwwwnewaigol neeeeeeeeeeeeeeeeeeeeee eeeeeeeeeeeeeeeeeeeeeee qdwdqwd
        </div>

        <div style="width:100%; background-color: white; display: flex; margin-top: 5px; word-wrap: break-word; text-align: left">
            someone: awieofiuewahuiawwwwwwwwwwwww wwwwwwwwwwwwwwwwwwwwwwwwwwwnewaigol neeeeeeeeeeeeeeeeeeeeee eeeeeeeeeeeeeeeeeeeeeee qdwdqwd
        </div>

        <div style="width:100%; background-color: white; display: flex; margin-top: 5px; word-wrap: break-word; text-align: left">
            someone: awieofiuewahuiawwwwwwwwwwwww wwwwwwwwwwwwwwwwwwwwwwwwwwwnewaigol neeeeeeeeeeeeeeeeeeeeee eeeeeeeeeeeeeeeeeeeeeee qdwdqwd
        </div>
    </div>
</template>

<script>
export default {
    name: "SeekTradeComponent",
    components: {
    },
    props: {
        ItemData: Object
    },
    data: function () {
        return {
            user: Object,
            isNotSelf: false
        }
    },
    methods: {
        clickItem() {
            this.$router.push('/userhome/itemdetailpage/' + this.ItemData.id)
        },
        async getUser(input) {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("username", this.$store.state.username);
            myHeaders.append("token", this.$store.state.token);

            var data = { userId: input };

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: JSON.stringify(data),
                redirect: 'follow'
            };

            var user = '';

            await fetch("http://localhost:28888/user/getByUserId", requestOptions)
                .then(response => response.json())
                .then(data => {
                    user = data.data;
                })
                .catch(error => console.log('error', error));
            return user;
        },
        goChat() {
            this.$router.push('usermessagepage/' + this.ItemData.userId)
        },
    },
    mounted() {
        this.getUser(this.ItemData.userId).then((data) => {
            this.user = data;
            this.isNotSelf = this.$store.state.username != this.user.username;
            console.log(data);
            if (('avatar' in this.user) && this.user.avatar != '' && this.user.avatar != null) {
                var uploaderAvatar = this.$refs.uploaderAvatar
                uploaderAvatar.style.backgroundImage = "url(" + this.user.avatar + ")";
                uploaderAvatar.style.backgroundSize = "cover";
            }
        })

        // if (('image' in this.ItemData) && this.ItemData.image != '') {
        //     console.log('this.ItemData', this.ItemData)
        //     var firstImg = this.$refs.firstImg
        //     this.text='load'
        //     firstImg.style.backgroundImage = "url(" + this.ItemData.image + ")";
        //     firstImg.style.backgroundSize = "cover";
        // }
    }
}
</script>

<style scoped>
.itemFrame {
    width: 100%;
    height: 500px;
    background-color: white;
    margin: 10px;
    border-radius: 10px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
}

.commentFrame {
    width: 100%;
    background-color: rgb(240, 240, 240);
    margin: 10px;
    border-radius: 10px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);

}

.itemImg {
    width: 240px;
    height: 240px;
    margin-left: 10px;
    border-radius: 10px;
    flex: 0 0 240px;
    background-color: gray;


}

.itemName {
    height: 50px;
    margin-left: 10px;
    margin-top: 10px;
    word-wrap: break-word;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: left;

    font-size: 30px;
}
</style>