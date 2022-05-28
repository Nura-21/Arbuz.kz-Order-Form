<template>
  <h4>Дата доставки</h4>
  <div class="dates-wrap">
    <div
      class="dates"
      v-for="(each, index) in resultDates"
      :key="each.date"
      :id="'dates-' + String(index)"
      @click="pickDate(index)"
    >
      <h6 class="date-block">{{ each.date }}</h6>
    </div>
  </div>
  <h4>Время доставки</h4>
  <div class="times-wrap">
    <div
      class="times"
      v-for="(each, index) in resultHours"
      :key="String(each.startHour + each.endHour)"
      :id="'times-' + String(index)"
      @click="pickTime(index)"
    >
      <h6 class="time-block">{{ each.startHour }}:00-{{ each.endHour }}:00</h6>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { Dates, Hours } from "../types/types";
export default defineComponent({
  name: "DeliveryPicker",
  emits: ["dateWasPicked", "hourWasPicked"],
  setup(props, { emit }) {
    let date = new Date();

    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();
    let hour = date.getHours() + 1;

    let pickedDate = ref({});
    let pickedHour = ref({});

    // day = 28;
    // month = 11;
    // hour = 12;

    let currentDateIndex = -1;
    let currentTimeIndex = -1;
    let dayCnt = day + 1;

    let resultDates: Dates[] = [];
    let resultHours: Hours[] = reactive([]);

    let daysOfYear = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let monthOfYear = [
      "Января",
      "Февраля",
      "Марта",
      "Апреля",
      "Мая",
      "Июня",
      "Июля",
      "Августа",
      "Сентября",
      "Октября",
      "Ноября",
      "Декабря",
    ];

    const dateFormat = (day: number, month: number, year: number) => {
      return {
        date: `${day} ${monthOfYear[month]} `,
        day: day,
        month: month,
        year: year,
      };
    };

    resultDates.push(dateFormat(day, month, year));

    for (let i = 0; i < 9; i++) {
      if (dayCnt === daysOfYear[month]) {
        resultDates.push(dateFormat(dayCnt, month, year));
        if (month === 11) {
          year++;
          month = 0;
        } else {
          month++;
        }
        dayCnt = 1;
      } else {
        resultDates.push(dateFormat(dayCnt, month, year));
        dayCnt++;
      }
    }

    const generateHours = (hour: number) => {
      resultHours.splice(0);
      while (hour < 21) {
        if (hour < 10) {
          hour = 10;
        }
        resultHours.push({ startHour: hour, endHour: hour + 2 });
        hour++;
      }
    };

    generateHours(hour);

    function pickDate(index: number) {
      const dateElem = document.getElementById("dates-" + index);
      const prev = document.getElementById("dates-" + currentDateIndex);

      if (index !== currentDateIndex) {
        if (prev?.classList.contains("pickedBlock")) {
          prev?.classList.remove("pickedBlock");
        }
        currentDateIndex = index;
        pickedDate.value = resultDates[index];
      } else {
        pickedDate.value = {} as Dates;
        currentDateIndex = -1;
      }

      dateElem?.classList.toggle("pickedBlock");
      if (index !== 0) {
        generateHours(0);
      } else {
        generateHours(hour);
      }
      emit("dateWasPicked", pickedDate);
    }

    function pickTime(index: number) {
      const timeElem = document.getElementById("times-" + index);
      const prev = document.getElementById("times-" + currentTimeIndex);
      if (index !== currentTimeIndex) {
        if (prev?.classList.contains("pickedBlock")) {
          prev?.classList.remove("pickedBlock");
        }
        currentTimeIndex = index;
        pickedHour.value = resultHours[index];
      } else {
        pickedHour.value = {} as Hours;
        currentTimeIndex = -1;
      }
      timeElem?.classList.toggle("pickedBlock");

      emit("hourWasPicked", pickedHour);
    }

    function clearData() {
      const prevTime = document.getElementById("times-" + currentTimeIndex);
      const prevDate = document.getElementById("dates-" + currentDateIndex);
      prevTime?.classList.remove("pickedBlock");
      prevDate?.classList.remove("pickedBlock");
      pickedHour.value = {} as Hours;
      pickedDate.value = {} as Dates;
      currentTimeIndex = -1;
      currentDateIndex = -1;
      generateHours(hour);
    }

    return {
      resultDates,
      resultHours,
      pickDate,
      pickTime,
      pickedDate,
      pickedHour,
      clearData,
    };
  },
});
</script>

<style scoped lang="scss">
.dates-wrap {
  display: flex;
  flex-direction: row;
  margin-top: 10px;
  margin-bottom: 10px;

  & .dates {
    width: 65px;
    user-select: none;
    cursor: pointer;
    margin: 3px;
    padding: 5px 10px;
    border-radius: 10px;
    background-color: $green-primary;
    color: white;
    transition: all 0.2s ease-in-out;

    &:hover {
      transform: scale(1.1);
    }

    &:focus {
      background-color: white;
      color: $green-primary;
      border: 1px solid $green-primary;
    }

    & h6 {
      font-size: 14px;
      text-align: center;
      font-weight: 100;
    }
  }
}
.times-wrap {
  display: flex;
  flex-direction: row;

  & .times {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100px;
    height: 40px;
    user-select: none;
    cursor: pointer;
    margin: 5px;
    padding: 5px 10px;
    border-radius: 10px;
    background-color: $green-primary;
    color: white;
    transition: all 0.2s ease-in-out;

    &:hover {
      transform: scale(1.1);
    }

    &:focus {
      background-color: white;
      color: $green-primary;
      border: 1px solid $green-primary;
    }

    & h6 {
      font-size: 13px;
      text-align: center;
      font-weight: 100;
    }
  }
}

.pickedBlock {
  background-color: white !important;
  color: $green-primary !important;
  border: 1px solid $green-primary !important;
}

@media screen and (max-width: $screen) {
  .dates-wrap {
    & .dates {
      width: 50px;
      margin: 1px;
      padding: 2px 4px;
      border-radius: 5px;
      & h6 {
        font-size: 9px;
      }
    }
  }
  .times-wrap {
    & .times {
      width: 50px;
      height: 30px;
      margin: 1px;
      padding: 2px 4px;
      border-radius: 5px;

      & h6 {
        font-size: 7px;
      }
    }
  }
}
</style>
