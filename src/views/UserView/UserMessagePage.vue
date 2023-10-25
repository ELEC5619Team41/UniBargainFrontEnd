<template>
    <div class="interfaceFrame">
        <div class="leftSection">
          <div class="searchbar">
            <input class="inputBar" v-model="searchInput">
            <div class="searchButton" v-on:click="SearchList"></div>
          </div>
            <div class="contactField">
              <div v-for="(item,num) in this.Contacts" v-on:click="ChangeChatRoom(num)" >
                <ContactItem  :contactDetail="item" ></ContactItem>
              </div>
            </div>

        </div>
        <div class="rightSection">
            <div class="chatHeader">
                <div style="width: 48px; height: 48px; background-color: white;"></div>
                <div onclick="" v-if="this.Show">{{ this.Contacts[CurrentRoom].user.name}}</div>
            </div>


            <div id="chatWindow" class="chatWindow" @scroll="onScroll" >
              <div v-if="this.Show">
                <div :class="[message.sendUserId == this.myUserID ? 'self' : '', 'messageOutLine']" class="messageOutLine"
                     v-for="message in this.ChatInfo">
                  <div class="bubble" >
                    {{ message.message.text }}
                </div>
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
import {io} from"socket.io-client"
import SocketIoService from "@/service/socketio.service";
import UserPost from "@/components/Message/UserPost";
import { useRoute } from 'vue-router';

export default {
    name: "UserMessagePage",
    components: {
        MessageSearchBar,
        ContactItem
    },
    data() {
        return {
            windowsHeight: 0,
            CurrentRoom:0,
            Contacts: [

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
            service: new SocketIoService(),
            chatRoom:false,
            Show:false,
            searchInput:'',
            defaultMessage:'talk about the trade',

        }
    },
  // mounted() {
    //     this.windowsHeight = window.innerHeight;
    // },
    methods: {
        userTextAreaInput(e) {
            console.log("userTextAreaInput" + e.which);
            if (e.which == 13 && e.shiftKey) {
                console.log("new line");
                this.chatInput += "\n";
            } else if (e.which == 13) {
                e.preventDefault();
                console.log("send message");
                var myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
                myHeaders.append("username", this.$store.state.username);
                myHeaders.append("token", this.$store.state.token);
                const raw = {
                opposingUserId: this.Contacts[this.CurrentRoom].user.id,
                  message:
                      {
                        text:this.chatInput
                      }
                };
                var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: JSON.stringify(raw),
                redirect: 'follow'
                };
                console.log(requestOptions);

                fetch("http://localhost:28888/chat/sendMessage", requestOptions)
                  .then(response=>{response.json();console.log(response)})
                  .then(result => this.ChangeChatRoom(this.CurrentRoom))
                  .catch(error => console.log('error', error));
                this.chatInput = "";
            }
            console.log(this.chatInput);

        },
        ChangeChatRoom(num)
        {
          this.CurrentRoom=num;
          let id = this.Contacts[this.CurrentRoom].user.id;
          console.log(id);
          this.chatRoom=true;
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

          fetch("http://localhost:28888/chat/getListByOpposingUserId", requestOptions)
              .then(response=>response.json())
              .then(result => {this.ChatInfo= result.data; console.log(result);this.Show=true; this.ChatInfo=this.ChatInfo.reverse()})
              .catch(error => console.log('error', error));
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
        SearchList()
        {
          var myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");
          myHeaders.append("username", this.$store.state.username);
          myHeaders.append("token", this.$store.state.token);
          var raw = {"searchName":this.searchInput};

          var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(raw),
            redirect: 'follow'
          };

          fetch("http://localhost:28888/chat/getPreviewList", requestOptions)
              .then(response => response.json())
              .then(result => {

                this.Contacts=result.data;
                if(this.Contacts.length!==0)
                {
                  this.ChangeChatRoom(0);
                  this.searchInput='';
                }
                else {

                }


              })
              .catch(error => console.log('error', error));
        }





    },
  activated() {


    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("username", this.$store.state.username);
    myHeaders.append("token", this.$store.state.token);
    var raw = {"searchname":"null"};

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(raw),
      redirect: 'follow'
    };

    fetch("http://localhost:28888/chat/getPreviewList", requestOptions)
        .then(response => response.json())
        .then(result => {this.Contacts=result.data})
        .catch(error => console.log('error', error));


  },
  created() {
      const route = useRoute();
      this.myUserID= this.$store.state.id;
      console.log(this.myUserID+"id")
      if(route.query.UserID!=null) {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("username", this.$store.state.username);
        myHeaders.append("token", this.$store.state.token);

        const raw = {
          opposingUserId: route.query.UserID,
          message:
              {
                text:'Hello, I want to talk about trade'
              }
        };

        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: JSON.stringify(raw),
          redirect: 'follow'
        };

        fetch("http://localhost:28888/chat/sendMessage", requestOptions)
            .then(response=>response.json())
            .then(result => console.log(result['user']))
            .catch(error => console.log('error', error));
      }
      else {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("username", this.$store.state.username);
        myHeaders.append("token", this.$store.state.token);
        var raw = {"searchname":"null"};

        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: JSON.stringify(raw),
          redirect: 'follow'
        };

        fetch("http://localhost:28888/chat/getPreviewList", requestOptions)
            .then(response => response.json())
            .then(result => {this.Contacts=result.data;this.ChangeChatRoom(0)})
            .catch(error => console.log('error', error));
      }

      setInterval(()=>{
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("username", this.$store.state.username);
        myHeaders.append("token", this.$store.state.token);
        var raw = {"searchname":"null"};

        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: JSON.stringify(raw),
          redirect: 'follow'
        };

        fetch("http://localhost:28888/chat/getPreviewList", requestOptions)
            .then(response => response.json())
            .then(result => {this.Contacts=result.data})
            .catch(error => console.log('error', error));
      },1000)

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
      this.windowsHeight = window.innerHeight;
    },




  // created() {
  //   // const service =this.service;
  //   // service.setupSocketConnection();
  //   // service.socket.on("connect", () => {
  //   //   console.log(service.socket.id); // true
  //   // });
  //   // service.socket.on("disconnect", () => {
  //   //   console.log(service.socket.id); // undefined
  //   // });
  //   // service.socket.on("receiveMessage", (message) => {
  //   //   console.log(message);
  //   // })
  //   // service.socket.on("RoomFound",(id)=>{
  //   //   this.chatRoom=id;
  //   // })
  // },
  // setUpChat()
  // {
  //
  // }
  // submitChatMessage()
  // {
  //   this.service.socket.emit("sendMessage",this.chatInput,this.chatRoom)
  //   // server push message
  //
  // },
  // JoinRoom()
  // {
  //   this.service.socket.emit("joinRoom",this.chatRoom)
  // },
  // StartChat()
  // {
  //   this.service.socket.emit("startChat",this.myUserID)
  // },
  // findChat(userid)
  // {
  //   this.service.socket.emit("findChat",this.service.socket.id,userid)
  // },
  // backToOwnRoom()
  // {
  //   this.service.socket.emit("findChat",this.service.socket.id,this.myUserID)
  // }
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



