<template>
    <div>
        <div class="userProfile">
            <div ref="commenterAvatar" style="width: 50px; height: 50px;"></div>
            <div>{{ this.comment.username }}</div>
            <div style="width: 30px; height: 30px; " v-for="index in this.comment.commentRating"></div>
            <div>{{ this.comment.rating }}</div>

            <!-- <div style="margin-left: auto;">2023-Sep-13 16:47</div> -->
        </div>
        <div class="comment">
            {{ comment.comment }}
        </div>
    </div>
</template>

<script>
export default {
    name: "ItemCommentComponent",
    components: {
    },
    props: {
        comment: {
            type: Object,
        }
    },
    updated(){
        var avatar = this.$refs.commenterAvatar;
        avatar.style.backgroundImage = `url(${this.comment.userAvatar})`;
        avatar.style.backgroundSize = "cover";
    }
    ,
    // updated(){
    //     var commAva = document.getElementById("comment-ava");
    //     commAva.style.backgroundImage = "url(" + this.comment.userAvatar + ")";
    //     commAva.style.backgroundSize = "cover";
    // }
}
</script>

<style scoped>
.userProfile {
    display: flex;
    width: 100%;
    flex-direction: row;
    align-items: center;
}

.userProfile>* {
    margin-left: 5px;
    margin-right: 5px;
}

.comment{
    text-align: left;
    margin-top: 15px;
}

.commentImg>*{
    margin-left: 5px;
    margin-right: 5px;
}
</style>