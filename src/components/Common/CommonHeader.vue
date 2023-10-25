<template>
    <div class="background" style="display: flex;">
        <div style="width: 20%; height: 100%; justify-content: center; display: flex; align-items: center;">
            <div style="height: 40px; width: 40px; background-color: white; "></div>
        </div>
        <div style="width: 60%; height: 100%; display: flex;">
            <button v-for="(item, index) in this.itemNames" @click="buttonOnClick(index, item)"
                :class="'centerButton ' + (selectedButton == index ? 'selected' : '')">{{ item.title }}</button>
        </div>
        <div style="width: 20%; height: 100%; justify-content: center; display: flex; align-items: center;">
            <div style="height: 30px; width: 30px; background-color: white; " @click="buttonOnClick(-1, { title: this.$t('UserProfile'), link: '/userhome/userprofilepage' })"></div>
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
        }
    },
    data() {
        return {
            selectedButton: 0,
            itemNames: [
                { title: this.$t('Home'), link: '/userhome/userhomepage' }, { title: this.$t('Trading'), link: '/userhome/usertradingpage' }, { title: this.$t('ShoppingCart'), link: '/userhome/usershoppingcartpage' }, { title: this.$t('Request'), link: '/userhome/userrequestpage' }, { title: this.$t('Message'), link: '/userhome/usermessagepage' },
              { title: this.$t('Transaction'), link: '/userhome/transactionpage' },{ title: this.$t('PublishIdleItem'), link: '/userhome/publishidlepage' },{ title: this.$t('SeekTrade'), link: '/userhome/seektradepage' }
            ]
        }
    //        add more links
    },
    created(){
        var url = this.$router.currentRoute.value.fullPath
        if(url == '/userhome/userprofilepage')
        {
            this.selectedButton = -1
        }else if(url == '/userhome/transactionendpage'){
            this.selectedButton = 5
        }
        for (let index = 0; index < this.itemNames.length; index++) {
          let questionmark = url.indexOf('?');
          let Url;
          if(questionmark!==0)
          {
            Url = url.substring(0,questionmark)
          }
          else
          {
            Url=url;
          }
            if(this.itemNames[index].link == Url)
            {
                this.selectedButton = index
            }
        }
    }
}
</script>

<style scoped>
.background {
    width: 100%;
    height: 50px;
    background-color: rgb(87, 87, 87);
}

.centerButton {
    height: 100%;
    width: 20%;
    background-color: rgb(87, 87, 87);
    outline: none;
    border: none;
}

.selected {
    background-color: rgb(196, 196, 196);
}
</style>