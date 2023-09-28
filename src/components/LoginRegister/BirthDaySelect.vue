<template>
  <div class="item">
    <div class="label">
      {{ $t("Birthday") }}
    </div>
    <select
      v-model="selectedYear"
      id="year"
      class="dropdown"
      @change="$emit('update:year', $event.target.value)"
    >
      <option v-for="year in this.years" :value="year" :key="year">
        {{ year }}
      </option>
    </select>
    <select
      v-model="selectedMonth"
      class="dropdown"
      style="margin-left: 25px"
      @change="$emit('update:month', $event.target.value)"
    >
      <option value="1" selected="selected">Jan</option>
      <option value="2">Feb</option>
      <option value="3">Mar</option>
      <option value="4">Apr</option>
      <option value="5">May</option>
      <option value="6">Jun</option>
      <option value="7">Jul</option>
      <option value="8">Aug</option>
      <option value="9">Sep</option>
      <option value="10">Oct</option>
      <option value="11">Nov</option>
      <option value="12">Dec</option>
    </select>

    <select
      id="day"
      v-model="selectedDay"
      class="dropdown"
      style="margin-left: 25px"
      @change="$emit('update:day', $event.target.value)"
    >
      <option v-for="day in this.totalDays" :value="day" :key="day">
        {{ day }}
      </option>
    </select>
  </div>
</template>



<script>
export default {
  name: "BirthDaySelect",
  data() {
    return {
      selectedMonth: 1,
      selectedYear: 1990,
      selectedDay: 1,
    };
  },
  computed: {
    years() {
      const year = new Date().getFullYear();
      return Array.from(
        { length: year - 1900 },
        (value, index) => 1900 + index
      );
    },
    totalDays() {
      return new Date(this.selectedYear, this.selectedMonth, 0).getDate();
    },
  },
};
</script>

<style scoped>
.dropdown {
  /* flex: auto; */
  width: 90px;
  height: 50px;
  text-align: center;
  outline: none;
  border-radius: 5px;
  border: none;
  background-color: rgb(244, 244, 244);
}

.item {
  display: flex;
  margin: 20px;
}

.label {
  width: 300px;
  text-align: right;
  margin-top: 15px;
  margin-right: 10px;
  flex-shrink: 0;
  font-size: 20px;
}
</style>