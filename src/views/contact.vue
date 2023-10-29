<template>
  <div style="margin-top: 10%">
    <el-text class="mx-1" type="primary" tag="b" size="large">Hello,Welcome to contact us. You can choose to call us or through an Email. We will value your feed back and convey our sincere gratitude </el-text>

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
  name: "contact"
}
</script>

<style scoped>

</style>