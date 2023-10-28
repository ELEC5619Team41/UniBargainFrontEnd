<template>
    <div class="interfaceFrame">
        <div class="leftSection">
            <div class="searchbar">
                <input class="inputBar" v-model="this.searchInput">
                <div class="searchButton" @click="SearchList"></div>
            </div>
            <div class="contactField">
                <div v-for="(item, num) in this.Contacts" v-on:click="ChangeChatRoom(num, true)">
                    <ContactItem :contactDetail="item" :class="item.user.id == this.CurrentTalkTo ? 'selected' : ''">
                    </ContactItem>
                </div>
            </div>

        </div>
        <div class="rightSection">
            <div class="chatHeader">
                <div style="width: 48px; height: 48px; background-color: white;"></div>
                <div onclick="" v-if="this.Show">{{ this.Contacts[CurrentRoom].user.name }}</div>

            </div>


            <div id="chatWindow" class="chatWindow" @scroll="onScroll">
                <div v-if="this.Show">
                    <div :class="[message.sendUserId == this.myUserID ? 'self' : '', 'messageOutLine']"
                        class="messageOutLine" v-for="message in this.ChatInfo">
                        <div class="bubble">
                            <div v-if="typeof (message.message.text) == 'string'">
                                <div v-if="message.message.text.startsWith('data:text/calendar;')">
                                    In Text Calendar
                                    <InTextCalendar :url="message.message.text"></InTextCalendar>
                                </div>
                                <div v-else>{{ message.message.text }}</div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>


            <div class="horizonLine"></div>

            <div class="chatFooter">
                <!-- todo: Four buttoms functionality -->
                <!-- <div style="height: 30px; background-color: gray; width: 100%;"></div> -->
                <div style="display: flex; background-color: rgb(222, 222, 222);">
                    <el-icon size="30px" style="margin-left: 10px;" @click="emojiPickerDisplay">
                        <ChatRound />
                    </el-icon>


                    <div style="background-color:white">
                        <EmojiPicker v-if="this.showEmoji" :native="true" @select="onSelectEmoji"
                            style="position: absolute; margin-top: -200px; margin-left: 50px;" />
                    </div>

                    <el-icon :size="'30px'" style="margin-left: 30px;" @click="dateSelect">
                        <Calendar />
                    </el-icon>
                    <!-- get location -->

                    <el-icon size="30px" style="margin-left: 30px;" @click="this.chatInput += this.deliveryAddress">
                        <Location />
                    </el-icon>



                </div>


                <textarea class="inputTextArea" @keydown="userTextAreaInput" v-model="this.chatInput"></textarea>
            </div>
        </div>
    </div>
</template>

<script>
import MessageSearchBar from '@/components/Message/MessageSearchBar.vue'
import ContactItem from '@/components/Message/ContactItem.vue'
import { formatDate } from '@fullcalendar/core';
import { io } from "socket.io-client"
import UserPost from "@/components/Message/UserPost";
import { useRoute } from 'vue-router';
import EmojiPicker from 'vue3-emoji-picker'
import 'vue3-emoji-picker/css'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import iCalendarPlugin from '@fullcalendar/icalendar'

import InTextCalendar from '@/components/Message/InTextCalendar.vue';


export default {
    name: "UserMessagePage",
    components: {
        MessageSearchBar,
        ContactItem,
        EmojiPicker,
        FullCalendar,
        InTextCalendar,
    },
    data() {
        return {
            windowsHeight: 0,
            CurrentRoom: 0,
            CurrentTalkTo: -1,
            Contacts: [

            ],
            ChatInfo: {
            },
            chatInput: "",
            myUserID: 1, // should be store in vuex, get when login
            restHeight: 0,
            timer: null,
            searchRaw: {},
            chatRoom: false,
            Show: false,
            searchInput: '',
            showEmoji: false,
            showCalendar: false,
            currentScroll: 0,
            deliveryAddress: '',
            calendarOptions: {
                plugins: [interactionPlugin, dayGridPlugin],
                initialView: 'dayGridMonth',
                selectable: true,
                dateClick: this.dateSelect.bind(this),
                events: {
                    format: 'ics',
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                    }
                }
            },
            inTextCalendarOptions: {
                plugins: [timeGridPlugin, iCalendarPlugin],
                initialView: 'timeGridWeek',
                headerToolbar: {
                    left: 'prev,next',
                    center: 'title',
                    right: 'timeGridWeek,timeGridDay' // user can switch between the two
                },
                events: {
                    format: 'ics',
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                    }
                }
            },
            needUpdate: true
        }
    },
    methods: {
        onSelectEmoji(emoji) {
            this.chatInput += (emoji.i);
        },
        emojiPickerDisplay() {
            this.showEmoji = !this.showEmoji;
            if (this.showEmoji) {
                this.showCalendar = false;
            }
        },
        async dateSelect() {
            await this.SendMessage(this.calendarOptions.events.url);
        },
        async getTimetable() {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("username", this.$store.state.username);
            myHeaders.append("token", this.$store.state.token);

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                redirect: 'follow'
            };

            await fetch("http://localhost:28888/course/get", requestOptions).then(response => response.json()).then(result => {
                if (result['message'] == 'success') {

                    this.calendarOptions.events.url = result['data']['file']
                }
            }).catch(error => console.log('error', error));
        },
        async getAddress() {
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

            await fetch("http://localhost:28888/user/get", requestOptions)
                .then(response => response.json())
                .then(data => {
                    if (!('address' in data.data['extend']) || data.data['extend']['address'].length == 0) {
                        alert('Please add your address first');
                        return;
                    }
                    var addressList = data.data['extend']['address'];
                    for (let i = 0; i < addressList.length; i++) {
                        if (addressList[i].isDefault) {
                            this.deliveryAddress = addressList[i].address + ", " + addressList[i].city
                                + ", " + addressList[i].state + ", " + addressList[i].zip + ", " + addressList[i].country;
                            break;
                        }
                    }
                })
                .catch(error => console.log('error', error));
        },
        async userTextAreaInput(e) {
            if (e.which == 13 && e.shiftKey) {
            } else if (e.which == 13) {
                await this.SendMessage(this.chatInput);
            }


        },
        async SendMessage(content) {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("username", this.$store.state.username);
            myHeaders.append("token", this.$store.state.token);
            const raw = {
                opposingUserId: this.Contacts[this.CurrentRoom].user.id,
                message:
                {
                    text: content
                }
            };
            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: JSON.stringify(raw),
                redirect: 'follow'
            };

            await fetch("http://localhost:28888/chat/sendMessage", requestOptions)
                .then(response => { response.json() })
                .then(result => this.ChangeChatRoom(this.FindChatRoom(this.CurrentTalkTo), true))
                .catch(error => console.log('error', error));
            this.chatInput = "";
            this.showEmoji = false;

        },
        FindChatRoom(id) {
            if (id == -1) {
                return 0;
            }
            for (let i = 0; i < this.Contacts.length; i++) {
                if (this.Contacts[i].user.id == id) {
                    return i;
                }
            }
            return -1;

        },
        async ChangeChatRoom(num, manual) {
            this.CurrentRoom = num;
            let id = this.Contacts[this.CurrentRoom].user.id;
            this.CurrentTalkTo = id;
            this.chatRoom = true;

            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("username", this.$store.state.username);
            myHeaders.append("token", this.$store.state.token);

            const raw = {
                "opposingUserId": id
            };

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: JSON.stringify(raw),
                redirect: 'follow'
            };

            await fetch("http://localhost:28888/chat/getListByOpposingUserId", requestOptions)
                .then(response => response.json())
                .then(result => { this.needUpdate = true; this.ChatInfo = result.data; this.Show = true; this.ChatInfo = this.ChatInfo.reverse() })
                .catch(error => console.log('error', error));

            if (manual) {
                const div = document.getElementById("chatWindow");
                this.currentScroll = 10000;
                div.scrollTop = this.currentScroll;
            }
        },
        onScroll({ target: { scrollTop, offsetHeight, scrollHeight } }) {
            this.currentScroll = scrollTop
            if (scrollTop == 0) {
                const div = document.getElementById("scrollBar");
                this.restHeight = scrollHeight;
                this.$emit("scrollview-hit-top");
            }
            if (scrollTop >= scrollHeight - offsetHeight) {
                clearTimeout(this.timer)
                this.timer = setTimeout(() => {
                    this.$emit("scrollview-hit-bottom");
                }, 100)

            }
        },
        async SearchList() {

            //todo: problem here
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("username", this.$store.state.username);
            myHeaders.append("token", this.$store.state.token);

            if (this.searchInput == '') {
                this.searchRaw = {};
            }
            else {
                this.searchRaw = { "searchName": this.searchInput };
            }



            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: JSON.stringify(this.searchRaw),
                redirect: 'follow'
            };

            await fetch("http://localhost:28888/chat/getPreviewList", requestOptions)
                .then(response => response.json())
                .then(result => {
                    console.log('preveiw: ', result)
                    if (result.data.length != 0) {
                        this.Contacts = result.data;
                        console.log(this.Contacts)
                        if (this.Contacts.length !== 0) {
                            this.ChangeChatRoom(0, false);
                            this.searchInput = '';
                        }
                    }


                })
                .catch(error => console.log('error', error));
        }





    },

    created() {

    },

    updated() {

        if (this.needUpdate) {
            this.needUpdate = false;
            const div = document.getElementById("chatWindow");
            div.scrollTop = this.currentScroll
        }
    },
    async mounted() {
        this.myUserID = this.$store.state.id;
        console.log('chat-id', this.$route.params.id == '')

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("username", this.$store.state.username);
        myHeaders.append("token", this.$store.state.token);
        var raw = this.searchRaw

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(raw),
            redirect: 'follow'
        };

        fetch("http://localhost:28888/chat/getPreviewList", requestOptions)
            .then(response => response.json())
            .then(async (result) => {
                this.Contacts = result.data;
                console.log(this.Contacts)

                if (this.$route.params.id != '') {
                    var exist = false;
                    for (let i = 0; i < this.Contacts.length; i++) {
                        if (this.Contacts[i].user.id == this.$route.params.id) {
                            exist = true;
                            break;
                        }
                    }
                    if (!exist) {
                        var myHeaders = new Headers();
                        myHeaders.append("Content-Type", "application/json");
                        myHeaders.append("username", this.$store.state.username);
                        myHeaders.append("token", this.$store.state.token);
                        const raw = {
                            opposingUserId: this.$route.params.id,
                            message:
                            {
                                text: 'Hello, I want to talk about trade'
                            }
                        };
                        var requestOptions = {
                            method: 'POST',
                            headers: myHeaders,
                            body: JSON.stringify(raw),
                            redirect: 'follow'
                        };

                        await fetch("http://localhost:28888/chat/sendMessage", requestOptions)
                            .then(response => {
                                console.log(response); 
                                if(response.status == 200){
                                    this.$router.push('/userhome/usermessagepage/')
                                    this.$router.go()
                                }
                                response.json()
                            })
                    }
                } else if (this.Contacts != null && this.Contacts.length != 0) {
                    this.ChangeChatRoom(this.FindChatRoom(this.CurrentTalkTo), true)

                    setInterval(() => {
                        var myHeaders = new Headers();
                        myHeaders.append("Content-Type", "application/json");
                        myHeaders.append("username", this.$store.state.username);
                        myHeaders.append("token", this.$store.state.token);

                        var raw = this.searchRaw
                        var requestOptions = {
                            method: 'POST',
                            headers: myHeaders,
                            body: JSON.stringify(raw),
                            redirect: 'follow'
                        };

                        fetch("http://localhost:28888/chat/getPreviewList", requestOptions)
                            .then(response => response.json())
                            .then(result => { this.Contacts = result.data; this.ChangeChatRoom(this.FindChatRoom(this.CurrentTalkTo), false) })
                            .catch(error => console.log('error', error));
                    }, 1000)

                    await this.getTimetable()
                    await this.getAddress()

                } else {
                    alert('No message found, why not go to the homepage and find someone to talk to?')
                    this.$router.push('/userhome/userhomepage')
                    return
                }

            })
            .catch(error => console.log('error', error));





        this.windowsHeight = window.innerHeight;
    }
}
</script>

<style scoped>
.leftSection {
    width: 28%;
    height: 100%;

}

.rightSection {
    width: 68%;
    height: 100%;
    background-color: gray;
    position: relative;

    border-radius: 15px;
    overflow: hidden;
}

.horizonLine {
    width: 100%;
    height: 1px;
    background: black;
}

.interfaceFrame {
    height: calc(100vh - 150px);
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
}

.contactField {
    height: calc(100% - 40px - 15px);
    margin-top: 15px;
    overflow-y: scroll;

    -ms-overflow-style: none;
    scrollbar-width: none;

    border-radius: 15px;
}

.contactField::-webkit-scrollbar {
    display: none;
}

.chatHeader {
    height: 70px;
    width: 100%;
    background-color: rgb(209, 209, 209);
    display: flex;
    align-items: center;
}

.chatHeader>* {
    margin-left: 15px;
}

.chatFooter {
    position: relative;
    height: 150px;
    width: 100%;
    bottom: 0;
    background-color: rgb(244, 244, 244);
    position: absolute;

}

.chatWindow {
    width: 100%;
    height: calc(100% - 70px - 150px - 1px);
    background-color: rgb(244, 244, 244);
    overflow-y: scroll;
}

.chatWindow::-webkit-scrollbar {
    display: none;
}

.inputTextArea {
    height: 120px;
    width: 100%;
    border: none;
    background-color: rgb(244, 244, 244);
    resize: none;
}

.inputTextArea:focus {
    outline: none;
}

.messageOutLine {
    width: 100%;
}

.messageOutLine.self {
    width: 100%;
    justify-content: flex-end;
    display: flex;
}

.bubble {
    border-radius: 10px;
    background-color: aquamarine;
    position: relative;
    margin-top: 5px;
    margin-bottom: 5px;
    padding: 10px 20px;
    width: fit-content;
    max-width: 60%;
    text-wrap: break-word;
    text-align: left;
    overflow-wrap: break-word;
    white-space: break-spaces;
}



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

.selected {
    background-color: rgb(209, 209, 209);
}
</style>



