<template>
    <div class="searchbar">
        <input class="inputBar" v-model="this.searchbar.input">
        <div class="clearButton" @click="clear()"></div>
        <div style="width: 1px; height: 50%; background: black; margin-left: 15px;"></div>
        <h3 style="margin-left: 15px;">Goods</h3>
        <div class="searchButton"></div>
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
    height: 20px;
    width: 20px;
    border-radius: 20px;
    background-color: black;
}

.searchButton {
    height: 30px;
    width: 30px;
    border-radius: 30px;
    background-color: black;
    right: 20px;
    position: absolute
}

</style>