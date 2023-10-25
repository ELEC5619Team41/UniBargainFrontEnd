<template>
    <div class="searchbar">
        <input class="inputBar" v-model="this.searchbar.input">
        <div class="clearButton" @click="clear()"><div class="buttonText">Clear</div></div>
        <div style="width: 1px; height: 50%; background: black; margin-left: 15px;"></div>
        <h5 style="margin-left: 5px; margin-top:5px;">Goods</h5>
        <div class="searchButton"><div class="buttonText" @click="search()">Search</div></div>
    </div>
</template>

<script>
export default {
    name: "TopSearchBar",
    components: {
    },
    data() {
        return {
            searchbar: {
                input: "",
            }
        }
    },
    methods: {
        clear() {
            this.searchbar.input = ""
        },
        search(){
            const url = '/userhome/search/'+this.searchbar.input;
            this.$router.push(url);
        }
    }
}
</script>

<style scoped>
.searchbar {
    display: flex;
    align-items: center;
    overflow: hidden;
    height: 40px;
    width: 100%;
    border-radius: 80px;
    border: 1px solid black;
    max-width: 1124px;
    background-color: white;
    position: relative;
}

.inputBar {
    width: 80%;
    height: 100%;
    border: none;
    padding-left: 10px;
}

.inputBar:focus {
    outline: none;
}

.clearButton {
    height: 30px;
    border-radius: 20px;
    background-color: black;
}

.buttonText {
    color: white;
    font-size:17px;
    padding:1px;
    margin-left:5px;
    margin-right:5px;
}

.searchButton {
    height: 30px;
    border-radius: 30px;
    background-color: black;
    right: 20px;
    position: absolute
}

</style>