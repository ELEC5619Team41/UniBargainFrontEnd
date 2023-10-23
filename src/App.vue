<template>
  <router-view/>
</template>

<script>
import  SocketIoService from './service/socketio.service';
export default {
  name:'App',
  components:{},

}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.horizontal-layout {
  display: flex;
  flex-direction: row;
  height: 100vh;
}

body{
  margin: 0;
  padding: 0;
}
</style>
