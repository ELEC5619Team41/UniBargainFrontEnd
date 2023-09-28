<template>
    <div class="interfaceFrame">
        <div class="leftSection">
            <MessageSearchBar></MessageSearchBar>
            <div class="contactField">
                <ContactItem v-for="item in this.Contacts" :contactDetail="item"></ContactItem>
            </div>

        </div>
        <div class="rightSection">
            <div class="chatHeader">
                <div style="width: 48px; height: 48px; background-color: white;"></div>
                <div>{{ this.ChatInfo.contact_name }}</div>
            </div>


            <div id="chatWindow" class="chatWindow" @scroll="onScroll">
                <div :class="[message.userid == this.myUserID ? 'self' : '', 'messageOutLine']" class="messageOutLine"
                    v-for="message in this.ChatInfo.messages">
                    <div class="bubble">
                        {{ message.message }}
                    </div>
                </div>
            </div>


            <div class="horizonLine"></div>
            <div class="chatFooter">
                <!-- todo: Four buttoms functionality -->
                <div style="height: 30px; background-color: gray; width: 100%;"></div>
                <textarea class="inputTextArea" @keydown="userTextAreaInput" v-model="this.chatInput"></textarea>
            </div>
        </div>
    </div>
</template>

<script>
import MessageSearchBar from '@/components/Message/MessageSearchBar.vue'
import ContactItem from '@/components/Message/ContactItem.vue'
import { formatDate } from '@fullcalendar/core';
export default {
    name: "UserMessagePage",
    components: {
        MessageSearchBar,
        ContactItem
    },
    data() {
        return {
            windowsHeight: 0,
            Contacts: [
                {
                    "contact_name": "Alice",
                    "last_message": "Hello!",
                    "timestamp": "2023-09-21T08:15:00Z"
                },
                {
                    "contact_name": "Bob",
                    "last_message": "Hi there!",
                    "timestamp": "2023-09-21T07:30:00Z"
                },
                {
                    "contact_name": "Charlie",
                    "last_message": "Good morning!",
                    "timestamp": "2023-09-20T09:45:00Z"
                },
                {
                    "contact_name": "David",
                    "last_message": "How are you?",
                    "timestamp": "2023-09-20T12:20:00Z"
                },
                {
                    "contact_name": "Eva",
                    "last_message": "Hey!",
                    "timestamp": "2023-09-19T15:40:00Z"
                },
                {
                    "contact_name": "Frank",
                    "last_message": "What's up?",
                    "timestamp": "2023-09-19T17:10:00Z"
                },
                {
                    "contact_name": "Grace",
                    "last_message": "Hi!",
                    "timestamp": "2023-09-18T18:25:00Z"
                },
                {
                    "contact_name": "Hannah",
                    "last_message": "Good evening!",
                    "timestamp": "2023-09-18T20:55:00Z"
                },
                {
                    "contact_name": "Ian",
                    "last_message": "Hello!",
                    "timestamp": "2023-09-17T22:00:00Z"
                },
                {
                    "contact_name": "Julia",
                    "last_message": "Hi there!",
                    "timestamp": "2023-09-17T23:30:00Z"
                },
                {
                    "contact_name": "Kurt",
                    "last_message": "Good morning!",
                    "timestamp": "2023-09-16T09:10:00Z"
                },
                {
                    "contact_name": "Linda",
                    "last_message": "How are you?",
                    "timestamp": "2023-09-16T11:45:00Z"
                },
                {
                    "contact_name": "Mike",
                    "last_message": "Hey!",
                    "timestamp": "2023-09-15T14:20:00Z"
                },
                {
                    "contact_name": "Nina",
                    "last_message": "What's up?",
                    "timestamp": "2023-09-15T16:35:00Z"
                },
                {
                    "contact_name": "Oliver",
                    "last_message": "Hi!",
                    "timestamp": "2023-09-14T17:50:00Z"
                },
                {
                    "contact_name": "Alice",
                    "last_message": "Hello!",
                    "timestamp": "2023-09-21T08:15:00Z"
                },
                {
                    "contact_name": "Bob",
                    "last_message": "Hi there!",
                    "timestamp": "2023-09-21T07:30:00Z"
                },
                {
                    "contact_name": "Charlie",
                    "last_message": "Good morning!",
                    "timestamp": "2023-09-20T09:45:00Z"
                },
                {
                    "contact_name": "David",
                    "last_message": "How are you?",
                    "timestamp": "2023-09-20T12:20:00Z"
                },
                {
                    "contact_name": "Eva",
                    "last_message": "Hey!",
                    "timestamp": "2023-09-19T15:40:00Z"
                },
                {
                    "contact_name": "Frank",
                    "last_message": "What's up?",
                    "timestamp": "2023-09-19T17:10:00Z"
                },
                {
                    "contact_name": "Grace",
                    "last_message": "Hi!",
                    "timestamp": "2023-09-18T18:25:00Z"
                },
                {
                    "contact_name": "Hannah",
                    "last_message": "Good evening!",
                    "timestamp": "2023-09-18T20:55:00Z"
                },
                {
                    "contact_name": "Ian",
                    "last_message": "Hello!",
                    "timestamp": "2023-09-17T22:00:00Z"
                },
                {
                    "contact_name": "Julia",
                    "last_message": "Hi there!",
                    "timestamp": "2023-09-17T23:30:00Z"
                },
                {
                    "contact_name": "Kurt",
                    "last_message": "Good morning!",
                    "timestamp": "2023-09-16T09:10:00Z"
                },
                {
                    "contact_name": "Linda",
                    "last_message": "How are you?",
                    "timestamp": "2023-09-16T11:45:00Z"
                },
                {
                    "contact_name": "Mike",
                    "last_message": "Hey!",
                    "timestamp": "2023-09-15T14:20:00Z"
                },
                {
                    "contact_name": "Nina",
                    "last_message": "What's up?",
                    "timestamp": "2023-09-15T16:35:00Z"
                },
                {
                    "contact_name": "Oliver",
                    "last_message": "Hi!",
                    "timestamp": "2023-09-14T17:50:00Z"
                },
                {
                    "contact_name": "Alice",
                    "last_message": "Hello!",
                    "timestamp": "2023-09-21T08:15:00Z"
                },
                {
                    "contact_name": "Bob",
                    "last_message": "Hi there!",
                    "timestamp": "2023-09-21T07:30:00Z"
                },
                {
                    "contact_name": "Charlie",
                    "last_message": "Good morning!",
                    "timestamp": "2023-09-20T09:45:00Z"
                },
                {
                    "contact_name": "David",
                    "last_message": "How are you?",
                    "timestamp": "2023-09-20T12:20:00Z"
                },
                {
                    "contact_name": "Eva",
                    "last_message": "Hey!",
                    "timestamp": "2023-09-19T15:40:00Z"
                },
                {
                    "contact_name": "Frank",
                    "last_message": "What's up?",
                    "timestamp": "2023-09-19T17:10:00Z"
                },
                {
                    "contact_name": "Grace",
                    "last_message": "Hi!",
                    "timestamp": "2023-09-18T18:25:00Z"
                },
                {
                    "contact_name": "Hannah",
                    "last_message": "Good evening!",
                    "timestamp": "2023-09-18T20:55:00Z"
                },
                {
                    "contact_name": "Ian",
                    "last_message": "Hello!",
                    "timestamp": "2023-09-17T22:00:00Z"
                },
                {
                    "contact_name": "Julia",
                    "last_message": "Hi there!",
                    "timestamp": "2023-09-17T23:30:00Z"
                },
                {
                    "contact_name": "Kurt",
                    "last_message": "Good morning!",
                    "timestamp": "2023-09-16T09:10:00Z"
                },
                {
                    "contact_name": "Linda",
                    "last_message": "How are you?",
                    "timestamp": "2023-09-16T11:45:00Z"
                }
            ],
            ChatInfo: {
                "contact_name": "Alice",
                "messages": [
                    {
                        "userid": 1,
                        "timestamp": "2023-09-28T10:00:00Z",
                        "message": "Hello, User 2!"
                    },
                    {
                        "userid": 2,
                        "timestamp": "2023-09-28T10:05:00Z",
                        "message": "Hi there, User 1! How can I help you today?"
                    },
                    {
                        "userid": 1,
                        "timestamp": "2023-09-28T10:10:00Z",
                        "message": "I just wanted to catch up. How's everything going?"
                    },
                    {
                        "userid": 2,
                        "timestamp": "2023-09-28T10:15:00Z",
                        "message": "Everything's going well on my end. Thanks for asking!"
                    },
                    {
                        "userid": 1,
                        "timestamp": "2023-09-28T10:20:00Z",
                        "message": "That's great to hear. Anything exciting happening lately?"
                    },
                    {
                        "userid": 2,
                        "timestamp": "2023-09-28T10:25:00Z",
                        "message": "Not much, just the usual routine. How about you?"
                    },
                    {
                        "userid": 1,
                        "timestamp": "2023-09-28T10:30:00Z",
                        "message": "I've been busy with work, but things are going well overall."
                    },
                    {
                        "userid": 2,
                        "timestamp": "2023-09-28T10:35:00Z",
                        "message": "That's good to hear. Make sure to take some breaks!"
                    },
                    {
                        "userid": 1,
                        "timestamp": "2023-09-28T10:40:00Z",
                        "message": "Thanks, I'll keep that in mind. How's your family?"
                    },
                    {
                        "userid": 2,
                        "timestamp": "2023-09-28T10:45:00Z",
                        "message": "They're doing well, thanks for asking. How's your family?"
                    },
                    {
                        "userid": 1,
                        "timestamp": "2023-09-28T10:00:00Z",
                        "message": "Hello, User 2!"
                    },
                    {
                        "userid": 2,
                        "timestamp": "2023-09-28T10:05:00Z",
                        "message": "Hi there, User 1! How can I help you today?"
                    },
                    {
                        "userid": 1,
                        "timestamp": "2023-09-28T10:10:00Z",
                        "message": "I just wanted to catch up. How's everything going?"
                    },
                    {
                        "userid": 2,
                        "timestamp": "2023-09-28T10:15:00Z",
                        "message": "Everything's going well on my end. Thanks for asking!"
                    },
                    {
                        "userid": 1,
                        "timestamp": "2023-09-28T10:20:00Z",
                        "message": "That's great to hear. Anything exciting happening lately?"
                    },
                    {
                        "userid": 2,
                        "timestamp": "2023-09-28T10:25:00Z",
                        "message": "Not much, just the usual routine. How about you?"
                    },
                    {
                        "userid": 1,
                        "timestamp": "2023-09-28T10:30:00Z",
                        "message": "I've been busy with work, but things are going well overall."
                    },
                    {
                        "userid": 2,
                        "timestamp": "2023-09-28T10:35:00Z",
                        "message": "That's good to hear. Make sure to take some breaks!"
                    },
                    {
                        "userid": 1,
                        "timestamp": "2023-09-28T10:40:00Z",
                        "message": "Thanks, I'll keep that in mind. How's your family?"
                    },
                    {
                        "userid": 2,
                        "timestamp": "2023-09-28T10:45:00Z",
                        "message": "They're doing well, thanks for asking. How's your family?"
                    },
                    {
                        "userid": 1,
                        "timestamp": "2023-09-28T10:00:00Z",
                        "message": "Hello, User 2!"
                    },
                    {
                        "userid": 2,
                        "timestamp": "2023-09-28T10:05:00Z",
                        "message": "Hi there, User 1! How can I help you today?"
                    },
                    {
                        "userid": 1,
                        "timestamp": "2023-09-28T10:10:00Z",
                        "message": "I just wanted to catch up. How's everything going?"
                    },
                    {
                        "userid": 2,
                        "timestamp": "2023-09-28T10:15:00Z",
                        "message": "Everything's going well on my end. Thanks for asking!"
                    },
                    {
                        "userid": 1,
                        "timestamp": "2023-09-28T10:20:00Z",
                        "message": "That's great to hear. Anything exciting happening lately?"
                    },
                    {
                        "userid": 2,
                        "timestamp": "2023-09-28T10:25:00Z",
                        "message": "Not much, just the usual routine. How about you?"
                    },
                    {
                        "userid": 1,
                        "timestamp": "2023-09-28T10:30:00Z",
                        "message": "I've been busy with work, but things are going well overall."
                    },
                    {
                        "userid": 2,
                        "timestamp": "2023-09-28T10:35:00Z",
                        "message": "That's good to hear. Make sure to take some breaks!"
                    },
                    {
                        "userid": 1,
                        "timestamp": "2023-09-28T10:40:00Z",
                        "message": "Thanks, I'll keep that in mind. How's your family?"
                    },
                    {
                        "userid": 2,
                        "timestamp": "2023-09-28T10:45:00Z",
                        "message": "They're doing well, thanks for asking. How's your family?"
                    }
                ]
                ,
                "timestamp": "2023-09-21T08:15:00Z"
            },
            chatInput: "",
            myUserID: 1, // should be store in vuex, get when login
            restHeight: 0,
            timer: null,

        }
    },
    mounted() {
        this.windowsHeight = window.innerHeight;
    },
    methods: {
        userTextAreaInput(e) {
            console.log("userTextAreaInput" + e.which);
            if (e.which == 13 && e.shiftKey) {
                console.log("new line");
                this.chatInput += "\n";
            } else if (e.which == 13) {
                e.preventDefault();
                console.log("send message");
                this.chatInput = "";
            }
            console.log(this.chatInput);
        },
        onScroll({ target: { scrollTop, offsetHeight, scrollHeight } }) {
            if (scrollTop == 0) {
                console.log("Top!");
                const div = document.getElementById("scrollBar");
                this.restHeight = scrollHeight;
                this.$emit("scrollview-hit-top");
            }
            if (scrollTop >= scrollHeight - offsetHeight) {
                clearTimeout(this.timer)
                this.timer = setTimeout(() => {
                    console.log("Bottom!");
                    this.$emit("scrollview-hit-bottom");
                }, 100)

            }
        },
    },
    updated() {
        // if (!this.needUpdate) {
        //     return
        // }
        const div = document.getElementById("chatWindow");
        console.log("update")
        div.scrollTop = div.scrollHeight - this.restHeight;
    },
    mounted() {
        const div = document.getElementById("chatWindow");
        div.scrollTop = div.scrollHeight;
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
}
</style>