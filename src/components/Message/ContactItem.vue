<template>
    <div class="background">
        <div style="margin: 10px; display: flex; align-items: center;">
            <div id="avatar" style="width: 48px; height: 48px; background-color: gray;"></div>
            <!-- {{ this.contactDetail }} -->
            <div style="margin-left: 10px; width: calc(100%-48px); overflow: hidden;">
                <p class="contactName">
                    {{ this.contactDetail.user.name }}</p>
                <p class="contactMessage">
                    {{ this.contactDetail.message.text }}</p>
            </div>
        </div>
<!--        <p class="contactTime">-->
<!--&lt;!&ndash;            {{ this.humanTimeFromISO }}</p>&ndash;&gt; need to add timestamp-->
    </div>
</template>

<script>
export default {
    name: "ContactItem",
    components: {
    },
    data() {
        return {
        }
    },
    computed: {
        humanTimeFromISO() {
            let date = new Date(this.contactDetail.timestamp);
            return date.getHours().toString().padStart(2, '0') + ':' + date.getMinutes().toString().padStart(2, '0');
        }
    },
    props: {
        contactDetail:Object
    },
    methods: {
    },
    mounted(){
        var avatar = document.getElementById("avatar");
        avatar.style.backgroundImage = `url(${this.contactDetail.user.avatar})`;
        avatar.style.backgroundSize = "cover";
    
    }
}
</script>

<style scoped>
.background {
    height: 80px;
    width: 100%;
    background-color: rgb(241, 241, 241);
    align-items: center;
    display: flex;
    position: relative;
}

.contactName {
    margin: 0px;
    width: 100%;
    font-size: 20px;
    text-align: left;
    text-overflow: ellipsis;
    text-wrap: nowrap;

}

.contactMessage {
    margin: 0px;
    width: 100%;
    overflow: hidden;
    font-size: 15px;
    text-align: left;
    text-overflow: ellipsis;
    text-wrap: nowrap;
}

.contactTime{
    margin: 0px;
    width: 100%;
    font-size: 15px;
    text-align: right;
    text-overflow: ellipsis;
    text-wrap: nowrap;
    position: absolute;
    right: 5px;
    top: 15px;
}
</style>