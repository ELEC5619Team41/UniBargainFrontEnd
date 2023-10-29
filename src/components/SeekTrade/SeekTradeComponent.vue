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
            <el-button v-else @click="deletePost">Delete Post</el-button>
        </div>
    </div>
    <div class="commentFrame">

        <div v-if="this.isNotSelf" style="width:100%; height:30px; background-color: white; display: flex; ">
            <input style="width:80%" v-model="this.commentInput" />
            <el-button style="width:20%" @click="leaveComment">Comment</el-button>
        </div>



        <div style="display: flex;" v-for="comment in this.commentList">
            <div style="background-color: white; display: flex; margin-top: 5px; word-wrap: break-word; text-align: left"
                :style="{ 'width': comment.info.username == this.$store.state.username ? '95%' : '100%' }">
                {{ comment.info.username + ": " + comment.info.commentContent }}
            </div>
            <div v-if="comment.info.username == this.$store.state.username"
                style=" display: flex; width: 5%; align-items: center; justify-content: center;">
                <el-icon @click="deleteComment(comment.id)">
                    <Delete />
                </el-icon>
            </div>
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
            isNotSelf: false,
            commentInput: '',
            commentList: []
        }
    },
    methods: {
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
            this.$router.push({
                path: 'usermessagepage/',
                query: {
                    id: this.ItemData.userId
                }
            })
        },
        async deletePost() {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("username", this.$store.state.username);
            myHeaders.append("token", this.$store.state.token);
            myHeaders.append("Access-Control-Allow-Origin", '*');
            myHeaders.append("Access-Control-Allow-Methods", 'GET, POST, PUT, DELETE, OPTIONS');

            var data = { id: this.ItemData.id };

            var requestOptions = {
                method: 'DELETE',
                headers: myHeaders,
                body: JSON.stringify(data),
                redirect: 'follow'
            };

            await fetch("http://localhost:28888/things/delete", requestOptions)
                .then(response => response.json())
                .then(data => {
                    this.$router.go()
                })
                .catch(error => console.log('error', error));
        },
        leaveComment() {

            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("username", this.$store.state.username);
            myHeaders.append("token", this.$store.state.token);

            var data = { thingsId: this.ItemData.id, info: { commentContent: this.commentInput } };

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: JSON.stringify(data),
                redirect: 'follow'
            };

            var user = '';

            fetch("http://localhost:28888/thingsComments/add", requestOptions)
                .then(response => response.json())
                .then(data => {

                    console.log(data);
                    data.data.info.username = this.$store.state.username;
                    this.commentList.push(data.data);
                    this.commentInput = ''
                })
                .catch(error => console.log('error', error));
            return user;
        },
        async deleteComment(id) {
            //todo: cannot delete from api
            console.log(id);
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("username", this.$store.state.username);
            myHeaders.append("token", this.$store.state.token);

            var data = { "id": id };

            var requestOptions = {
                method: 'DELETE',
                headers: myHeaders,
                body: JSON.stringify(data),
                redirect: 'follow'
            };

            await fetch("http://localhost:28888/thingsComments/delete", requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    this.commentList = this.commentList.filter((item) => {
                        return item.id != id;
                    })
                })
                .catch(error => console.log('error', error));
        },
        async getComment(input) {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("username", this.$store.state.username);
            myHeaders.append("token", this.$store.state.token);

            var data = { thingsId: input };

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: JSON.stringify(data),
                redirect: 'follow'
            };

            var user = '';

            await fetch("http://localhost:28888/thingsComments/getList", requestOptions)
                .then(response => response.json())
                .then(data => {
                    user = data.data;
                })
                .catch(error => console.log('error', error));
            return user;
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
        this.getComment(this.ItemData.id).then(async (data) => {

            this.commentList = data;
            for (var i = 0; i < this.commentList.length; i++) {
                var user = await this.getUser(this.commentList[i].userId);
                this.commentList[i].info.username = user.username;
            }
            this.commentList.reverse();
            console.log(this.ItemData.id, data);
        })
    },
    updated() {

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
    /* background-color: gray; */


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

.selfComment {
    width: 100%;
}
</style>