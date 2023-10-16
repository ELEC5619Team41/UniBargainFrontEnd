<template>

</template>

<script>
export default {
  name: "SendRequestComponent",
  method: {
    Request(body) {

      const myHeaders = new Headers();
      myHeaders.append("username", "{{username}}");
      myHeaders.append("token", "{{token}}");
      myHeaders.append("User-Agent", "Apifox/1.0.0 (https://apifox.com)");
      myHeaders.append("Content-Type", "application/json");
      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: body,
        redirect: 'follow'
      };

      return requestOptions;
    }
// send out post request and get response and transfer them into json.
  }
}
</script>

<style scoped>

</style>