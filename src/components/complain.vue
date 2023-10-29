<template>
<div style="margin-top: 10%">
  <el-text class="mx-5" type="primary" tag="b" size="large">We are sorry for causing issues for you. You can choose to contact our agent by number or send an email to us. We will do our best to solve the issues. </el-text>

  <el-row style="margin-top: 10%" :gutter="130">
    <el-col :span=" 12">
      <el-card >
        <el-text type="success"> phone number: xxxxxxx</el-text>

      </el-card>
    </el-col>

    <el-col :span=" 12" s>
      <el-card >
        <el-text type="success"> email address: xxxxx@gmail.com</el-text>

      </el-card>
    </el-col>
  </el-row>
</div>

</template>

<script>
export default {
  name: "complain"
}
</script>

<style scoped>

</style>