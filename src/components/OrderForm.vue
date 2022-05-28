<template>
  <article class="article-title"><h1>Оформление арбузов</h1></article>
  <main class="arbuz-main">
    <section class="arbuz-picker">
      <div class="arbuz-wrap" id="arbuz-wrap">
        <div
          class="arbuz-row"
          v-for="(row, index) in waterMelonsMatrix"
          :key="index"
        >
          <div
            class="arbuz-item"
            v-for="each in row"
            :key="String(each.row + each.col)"
          >
            <div
              class="arbuz-img d-flex align-items-center justify-content-center"
              @click="each.status !== 3 && pickArbuz(each.row, each.col)"
              tabindex="-1"
            >
              <img
                src=""
                alt=""
                :style="{ content: setBackgroundImg(each.status) }"
              />
            </div>
          </div>
        </div>
      </div>
      <button class="btn" id="btn-add-to-cart" @click="addToCart">
        <i class="material-icons">shopping_cart</i> Добавить
      </button>
      <h5 class="hidden-notification" id="error">Заполните все поля</h5>
      <h5 class="hidden-notification" id="no-in-cart">Нет арбузов в корзине</h5>
      <h5 class="hidden-notification" id="no-date">Дата и время не выбраны</h5>
      <h5 class="hidden-notification" id="no-info">
        Не правильно введены поля
      </h5>
      <div class="cart">
        <h3>Корзина</h3>
        <div class="in-cart">
          <div
            class="blocks d-flex align-items-center justify-content-center"
            v-for="(slot, index) in threeSlot"
            :key="index"
          >
            <img :style="{ content: setBackgroundImg(slot.status) }" />
            <button class="btn-cancel" @click="takeOutSlot(index)">
              <i class="material-icons">cancel</i>
            </button>
          </div>
        </div>
      </div>
    </section>
    <div class="rightSide">
      <section class="informations">
        <aside class="informations-static">
          <div class="arbuz-info">
            <i class="material-icons">info</i>
            <h3>Спелый</h3>
            <img
              src=""
              alt="arbuz-from-iconify"
              :style="{ content: setBackgroundImg(1) }"
            />
          </div>
          <div class="arbuz-info">
            <i class="material-icons">info</i>
            <h3>Не спелый</h3>
            <img
              src=""
              alt="arbuz-from-iconify"
              :style="{ content: setBackgroundImg(2) }"
            />
          </div>
          <div class="arbuz-info">
            <i class="material-icons">info</i>
            <h3>Сорван</h3>
            <img
              src=""
              alt="arbuz-from-iconify"
              :style="{ content: setBackgroundImg(3) }"
            />
          </div>
        </aside>
        <aside>
          <div class="picked-arbuz-info">
            <div class="arbuz-position">
              <i
                class="material-icons"
                :style="{
                  color:
                    pickedArbuz.status === 1
                      ? '#19ab4b'
                      : pickedArbuz.status === 2
                      ? '#fad24e'
                      : 'gray',
                }"
                >explore</i
              >
              <div class="arbuz-position__text flex-start">
                <h5>Ряд: {{ pickedArbuz.row + 1 || "-" }}</h5>
                <h5>Колонна: {{ pickedArbuz.col + 1 || "-" }}</h5>
              </div>
            </div>
            <div class="arbuz-weight flex-start">
              <h4>
                <i
                  class="material-icons"
                  :style="{
                    color:
                      pickedArbuz.status === 1
                        ? '#19ab4b'
                        : pickedArbuz.status === 2
                        ? '#fad24e'
                        : 'gray',
                  }"
                  >scale</i
                >Вес: {{ pickedArbuz.weight || "-" }}кг
              </h4>
            </div>
            <div class="arbuz-status flex-start">
              <h4>
                <i
                  class="material-icons"
                  v-if="pickedArbuz.status === 1"
                  style="color: #19ab4b"
                  >sentiment_satisfied_alt</i
                >
                <i
                  class="material-icons"
                  v-if="pickedArbuz.status === 2"
                  style="color: #fad24e"
                  >sentiment_neutral</i
                >
                <i
                  class="material-icons"
                  v-if="pickedArbuz.status !== 1 && pickedArbuz.status !== 2"
                  style="color: gray"
                  >help</i
                >
                Спелость:
                {{
                  pickedArbuz.status === 1
                    ? "Спелый"
                    : pickedArbuz.status === 2
                    ? "Не спелый"
                    : "-"
                }}
              </h4>
            </div>
          </div>
        </aside>
      </section>
      <section class="delivery-picker">
        <delivery-picker
          @dateWasPicked="catchDate"
          @hourWasPicked="catchHour"
          ref="delivery"
        ></delivery-picker>
      </section>
      <section class="client-info">
        <client-info
          @clientInfoSaved="catchClientInfo"
          ref="client"
        ></client-info>
      </section>
      <div class="optional">
        <input type="checkbox" v-model="sliced" />
        <h4>Порезать дольками</h4>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Watermelon, Dates, Hours, Client, Order } from "../types/types";
import DeliveryPicker from "./DeliveryPicker.vue";
import ClientInfo from "./ClientInfo.vue";

export default defineComponent({
  name: "OrderForm",
  component: { DeliveryPicker, ClientInfo },
  props: {
    waterMelonsMatrix: {
      type: Array as PropType<Watermelon[][]>,
      required: true,
    },
  },
  emits: ["pickEvent", "addedToCart", "addOrder"],
  data: () => ({
    pickedArbuz: {} as Watermelon,
    pickedDate: {} as Dates,
    pickedHour: {} as Hours,
    clientInfo: {} as Client,
    sliced: false,
    threeSlot: [
      { status: 0 } as Watermelon,
      { status: 0 } as Watermelon,
      { status: 0 } as Watermelon,
    ],
  }),
  methods: {
    showNotification(id: string) {
      const elem = document.getElementById(id);
      elem?.classList.remove("hidden-notification");
      elem?.classList.add("show-notification");
    },

    hideNotification(id: string) {
      const elem = document.getElementById(id);
      elem?.classList.remove("show-notification");
      elem?.classList.add("hidden-notification");
    },

    callNotification(id: string) {
      this.showNotification(id);
      setTimeout(() => {
        this.hideNotification(id);
      }, 1000);
    },

    takeOutSlot(index: number) {
      if (this.threeSlot[index].status !== 0) {
        console.log(this.threeSlot[index]);
        this.$emit(
          "addedToCart",
          this.threeSlot[index].row,
          this.threeSlot[index].col,
          this.threeSlot[index].status
        );
      }

      this.threeSlot[index] = { status: 0 } as Watermelon;
    },

    addToCart() {
      for (let each of this.threeSlot) {
        if (
          each.status === 0 &&
          (this.pickedArbuz.status === 1 || this.pickedArbuz.status === 2)
        ) {
          each.status = this.pickedArbuz.status;
          each.row = this.pickedArbuz.row;
          each.col = this.pickedArbuz.col;
          each.weight = this.pickedArbuz.weight;
          this.$emit(
            "addedToCart",
            this.pickedArbuz.row,
            this.pickedArbuz.col,
            4
          );
          break;
        }
      }
    },

    pickArbuz(row: number, col: number) {
      this.pickedArbuz = this.waterMelonsMatrix[row][col];
      this.$emit("pickEvent", row, col);
    },

    clearPick() {
      this.pickedArbuz = {} as Watermelon;
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

    catchDate(pickedDate: Dates) {
      if (Object.keys(pickedDate).length !== 0) {
        this.pickedDate = pickedDate;
      } else {
        this.pickedDate = {} as Dates;
      }
    },

    catchHour(pickedHours: Hours) {
      if (Object.keys(pickedHours).length !== 0) {
        this.pickedHour = pickedHours;
      } else {
        this.pickedHour = {} as Hours;
      }
    },

    catchClientInfo(clientInfo: Client) {
      this.clientInfo = clientInfo;
    },

    clearData() {
      this.pickedArbuz = {} as Watermelon;
      this.pickedDate = {} as Dates;
      this.pickedHour = {} as Hours;
      this.clientInfo = {} as Client;
      this.sliced = false;
      this.threeSlot = [
        { status: 0 } as Watermelon,
        { status: 0 } as Watermelon,
        { status: 0 } as Watermelon,
      ];
    },
  },
  mounted() {
    let ignoreClickOnMeElement = document.getElementById("arbuz-wrap");
    document.addEventListener("click", (event) => {
      if (event.target instanceof Element) {
        let isClickInsideElement = ignoreClickOnMeElement?.contains(
          event.target
        );
        if (!isClickInsideElement) {
          this.pickedArbuz = {} as Watermelon;
        }
      }
    });

    const buttonSubmit = document.getElementById("submit-order");
    buttonSubmit?.addEventListener("click", () => {
      const elements = document.getElementsByClassName("show-notification");
      if (!elements.length) {
        if (
          this.threeSlot.some((each) => each.status === 1 || each.status === 2)
        ) {
          if (
            Object.keys(this.pickedDate).length !== 0 &&
            Object.keys(this.pickedHour).length !== 0
          ) {
            if (
              Object.keys(this.clientInfo).length !== 0 &&
              !document.getElementsByClassName("show-notification").length
            ) {
              for (let each of this.threeSlot) {
                if (each.status !== 0) {
                  this.$emit("addedToCart", each.row, each.col, 3);
                }
              }
              this.callNotification("success");
              this.$emit("addOrder", {
                watermelons: this.threeSlot.filter((each) => each.status !== 0),
                date: this.pickedDate,
                time: this.pickedHour,
                client: this.clientInfo,
                sliced: this.sliced,
              } as Order);

              (this.$refs["delivery"] as any).clearData();
              (this.$refs["client"] as any).clearData();
              this.clearData();
            } else {
              this.callNotification("no-info");
            }
          } else {
            this.callNotification("no-date");
          }
        } else {
          this.callNotification("no-in-cart");
        }
      } else {
        this.callNotification("error");
      }
    });
  },
});
</script>

<style scoped lang="scss">
.article-title {
  margin: 10px;
  & h1 {
    color: $green-dark;
    font-size: 20px;
  }
}
.arbuz-main {
  width: 80vw;
  display: flex;
  flex-direction: row;

  & .rightSide {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 40vw;
  }
  & .informations {
    width: 100%;
    display: flex;
    flex-direction: row-reverse;
    gap: 27%;
    align-items: center;
  }
  & .arbuz-info {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 10px;
    box-shadow: $shadow-size $shadow-size $shadow-size $shadow-size $gray;
    border-radius: 15px;
    margin: 5px 0 12px 0;
    width: 200px;
    height: 40px;
    justify-content: space-between;
    & .material-icons {
      color: $gray-light;
      font-size: 24px;
    }
    & img {
      left: auto;
      width: 30px;
    }
    & h3 {
      font-weight: 100;
    }
  }

  & .picked-arbuz-info {
    width: 16vw;
    border: 2.5px solid $gray;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 15px;
    height: 150px;
    & .arbuz-position {
      border-bottom: 1px solid $gray;
      padding: 12px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      width: 100%;
    }
    & .arbuz-weight {
      border-bottom: 1px solid $gray;
      padding: 12px;
    }
    & .arbuz-status {
      padding: 12px;
    }
    & h4,
    h5 {
      display: flex;
      align-items: center;
    }
    & .material-icons {
      margin-right: 10px;
      font-size: 20px;
    }
  }
  .arbuz-picker {
    width: 60%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    & .arbuz-wrap {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;

      & .arbuz-row {
        display: flex;
        flex-direction: row;
        & .arbuz-item {
          & .arbuz-img {
            width: 55px;
            height: 50px;
            border: 1.8px solid $gray;
            box-shadow: $shadow-size $shadow-size $shadow-size $shadow-size
              $gray;
            border-radius: 15px;
            margin: 3px;
            transition: all 0.2s ease-in-out;
            & img {
              width: 90%;
              height: 90%;
              user-select: none;
            }

            &:hover {
              transform: scale(1.1);
              cursor: pointer;
              border: 1.8px solid $gray-light;
            }
            &:focus {
              border: 2.5px solid $blue-accent;
            }
          }
        }
      }
    }
    & .btn {
      margin: 15px 0 15px 5px;
      display: flex;
      align-items: center;
      padding: 0px 20px;
      font-size: 14px;
      & i {
        font-size: 18px;
      }
    }
    & .cart {
      width: 60%;
      height: 140px;
      border-radius: 15px;
      display: flex;
      flex-direction: column;
      align-items: center;
      box-shadow: $shadow-size $shadow-size $shadow-size $shadow-size $gray;
      border: 1.8px solid $gray;

      & h3 {
        text-align: center;
        width: 100%;
        padding: 10px;
        border-bottom: 1px solid $gray-light;
      }
      & .in-cart {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-evenly;
      }
    }
  }

  .delivery-picker {
    width: 100%;
    margin-top: 5px;
  }

  .client-info {
    width: 100%;
  }

  .optional {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    gap: 10px;
    & input[type="checkbox"] {
      width: 18px;
      height: 18px;
      background: $green-primary;
    }
  }
}

@media screen and (max-width: $screen) {
  .arbuz-main {
    width: 100%;
    flex-direction: column;
    align-items: center;
    .arbuz-picker {
      width: 100%;
      & .arbuz-wrap {
        justify-content: flex-start;

        & .arbuz-row {
          & .arbuz-item {
            & .arbuz-img {
              width: 35px;
              height: 35px;
              margin: 2px;
              border-radius: 10px;
            }
          }
        }
      }
      & .btn {
        margin: 15px 0 5px 5px;
        font-size: 12px;
        & i {
          font-size: 16px;
        }
      }
      & .cart {
        width: 90%;
      }
    }
    & .rightSide {
      width: 90%;
      margin-top: 10px;
    }
    & .informations {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 10%;
      align-items: center;
      & .informations-static {
        display: flex;
        flex-direction: row;
      }
    }
    & .arbuz-info {
      border-radius: 10px;
      margin: 5px 10px 12px 0;
      width: 110px;
      justify-content: space-evenly;
      & .material-icons {
        font-size: 14px;
      }
      & img {
        width: 15px;
      }
      & h3 {
        font-size: 12px;
        text-align: center;
      }
    }

    & .picked-arbuz-info {
      width: 90vw;
    }
  }
}
</style>
