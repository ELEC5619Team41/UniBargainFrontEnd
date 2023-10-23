<template>
    <div>
        <div class="userProfile">
            <div style="width: 50px; height: 50px; `background-image:url(${this.comment.userAvatar})`;"></div>
            <div>{{ this.comment.username }}</div>
            <div style="width: 30px; height: 30px; background-color: blue" v-for="index in this.comment.commentRating"></div>
            <div>{{ this.comment.rating }}</div>

            <div style="margin-left: auto;">2023-Sep-13 16:47</div>
        </div>
        <div class="comment">
            {{ comment.comment }}
        </div>

        <!-- <div class="commentImg" style="display: flex; margin: 20px">
            <div style="width: 200px; height: 200px; background-color: blue" v-for="img in this.comment.images"></div>
        </div> -->
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
    }
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