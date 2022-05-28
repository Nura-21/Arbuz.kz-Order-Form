<template>
  <div class="order-page d-flex column align-items-center">
    <order-form
      :water-melons-matrix="waterMelonsMatrix"
      @pickEvent="catchPick"
      @addedToCart="wasAddedToCart"
      @addOrder="catchOrder"
    ></order-form>
    <h5 class="hidden-notification" id="success" style="color: green">
      Успешно
    </h5>
    <section class="order-wrap">
      <div class="order-list" v-for="(order, index) in orders" :key="index">
        <div class="order-item">
          <div class="order-item__img">
            <div
              class="blocks d-flex align-items-center justify-content-center"
              v-for="(slot, index) in order.watermelons"
              :key="index"
            >
              <img :style="{ content: setBackgroundImg(slot.status) }" />
            </div>
          </div>
          <div class="order-item__info">
            <div class="weight">
              <i class="material-icons" style="color: #e54241">scale</i>
              <h4>Общий вес: {{ getSumWeight(index) }}кг</h4>
            </div>
            <div class="date">
              <i class="material-icons" style="color: #e54241">event</i>
              <h4>Дата: {{ order.date.date }}</h4>
            </div>
            <div class="time">
              <i class="material-icons" style="color: #e54241">alarm</i>
              <h4>
                Время:
                {{ order.time.startHour + ":00-" + order.time.endHour + ":00" }}
              </h4>
            </div>
            <div class="address">
              <i class="material-icons-outlined" style="color: #e54241"
                >maps_home_work</i
              >
              <h4>{{ getTotalAddress(index) }}</h4>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import OrderForm from "./OrderForm.vue";
import { Watermelon, Order } from "../types/types";

export default defineComponent({
  name: "OrderPage",
  components: {
    OrderForm,
  },
  data: () => ({
    pickedArbuz: {} as Watermelon,
    orders: [] as Order[],
  }),
  methods: {
    getRandomInt(min: number, max: number) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    catchPick(row: number, col: number) {
      this.pickedArbuz = { ...this.waterMelonsMatrix[row][col] };
      console.log(this.pickedArbuz);
      //
    },
    wasAddedToCart(row: number, col: number, status: number) {
      this.waterMelonsMatrix[row][col].status = status;
    },
    catchOrder(orderObject: Order) {
      if (Object.keys(orderObject).length !== 0) {
        this.orders.push(orderObject);
      }
    },
    setBackgroundImg(status: number) {
      let iconUrl = "https://api.iconify.design/";
      let iconSource = "mdi/";
      let iconType = "fruit-watermelon.svg";
      let iconColorSetter = "?color=%23";
      let color = "19ab4b";
      if (status === 0) {
        iconSource = "iconoir/";
        iconType = "cancel.svg";
      }
      if (status === 1) {
        color = "19ab4b";
      } else if (status === 2) {
        color = "fad24e";
      } else if (status === 3) {
        color = "e54241";
      } else if (status === 4) {
        color = "80d7fc";
      }
      return (
        "url(" + iconUrl + iconSource + iconType + iconColorSetter + color + ")"
      );
    },
    getSumWeight(index: number) {
      return this.orders[index].watermelons.reduce((acc, el) => {
        return acc + el.weight;
      }, 0);
    },
    getTotalAddress(index: number) {
      let temp = this.orders[index].client;
      return `ул ${temp.address}, д ${temp.house}, кв ${temp.houseNumber}, ${temp.doorNumber}`;
    },
  },
  computed: {
    waterMelonsMatrix() {
      let res = [];
      for (let i = 0; i < 8; i++) {
        let temp: Watermelon[] = [];
        for (let j = 0; j < 9; j++) {
          temp.push({
            row: i,
            col: j,
            status: this.getRandomInt(1, 3),
            weight: this.getRandomInt(3, 10),
          } as Watermelon);
        }
        res.push(temp);
      }

      return res;
    },
  },
});
</script>

<style lang="scss">
.order-wrap {
  width: 75vw;
  margin-top: 40px;
  margin-bottom: 100px;
  & .order-list {
    display: flex;
    flex-direction: column;
    // align-items: center;
    & .order-item {
      height: 150px;
      width: 70%;
      border: 2px solid $gray;
      box-shadow: $shadow-size $shadow-size $shadow-size $shadow-size $gray;
      border-radius: 20px;
      display: flex;
      flex-direction: row;
      margin-bottom: 30px;
      &__img {
        border-right: 2px solid $gray;
        width: 32%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;

        & .blocks {
          margin: 10px;
        }
      }
      &__info {
        width: 100%;
        display: flex;
        flex-direction: row;
        & .weight,
        .date,
        .time,
        .address {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border-right: 1px solid $gray;
          padding: 8px;
          & h4 {
            font-size: 16px;
            font-weight: 500;
            text-align: center;
          }
          & i {
            margin-bottom: 20px;
            font-size: 28px;
          }
        }
        & .address {
          width: 45%;
          border: none;
        }
      }
    }
  }
}
@media screen and (max-width: $screen) {
  .order-wrap {
    width: 90%;
    & .order-list {
      & .order-item {
        height: 200px;
        width: 100%;
        border-radius: 15px;
        &__img {
          flex-direction: column;

          & .blocks {
            margin: 10px;
            width: 50px;
            height: 50px;
            border-radius: 12px;
            margin: 5px;
          }
        }
        &__info {
          width: 100%;
          display: flex;
          flex-direction: row;
          & .weight,
          .date,
          .time,
          .address {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            border-right: 1px solid $gray;
            padding: 4px;
            & h4 {
              font-size: 15px;
              font-weight: 500;
              text-align: center;
            }
            & i {
              margin-bottom: 20px;
              font-size: 24px;
            }
          }
          & .address {
            width: 45%;
            border: none;
          }
        }
      }
    }
  }
}
</style>
