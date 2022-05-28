<template>
  <h4>Адрес</h4>
  <div class="client-address">
    <input
      id="input-address"
      type="text"
      placeholder="Ваш адрес"
      v-model="clientAddress"
    />
    <h5 class="hidden-notification" id="address-notification">
      Адрес не может быть пустым
    </h5>
    <div class="address-details">
      <input
        id="input-details-house"
        type="text"
        placeholder="Дом"
        v-model="clientHouse"
      />
      <input
        id="input-details-house-number"
        type="number"
        placeholder="Номер квартиры"
        v-model="clientHouseNumber"
      />
      <input
        id="input-details-door-number"
        type="number"
        placeholder="Номер домофона"
        v-model="clientDoorNumber"
      />
    </div>
    <h5 class="hidden-notification" id="details-notification">
      Поля введены не полностью
    </h5>
  </div>
  <h4>Контактный номер</h4>
  <div class="client-phone">
    <div class="phone-operator">+7</div>
    <input
      id="input-phone"
      type="number"
      placeholder="(___)___-__-__"
      v-model="clientPhone"
    />
  </div>
  <h5 class="hidden-notification" id="phone-notification">
    Это поле не может быть пустым
  </h5>
  <h4>Комментарий к заказу</h4>
  <div class="client-comments">
    <textarea
      name=""
      id="input-comments"
      placeholder="Комментарий"
      v-model="clientComments"
    ></textarea>
    <button class="btn" id="submit-order">Оформить заказ</button>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { Client } from "../types/types";
export default defineComponent({
  name: "ClientInfo",
  data: () => ({
    clientAddress: "",
    clientHouse: "",
    clientHouseNumber: "",
    clientDoorNumber: "",
    clientPhone: "",
    clientComments: "",
    clientInfo: {} as Client,
  }),
  emits: ["clientInfoSaved"],
  methods: {
    validateAddress(inputStr: string) {
      if (inputStr === "") {
        return false;
      } else {
        return true;
      }
    },

    validateNumbers(inputNumber: number) {
      if (inputNumber < 1 || inputNumber > 1000) {
        return false;
      } else {
        return true;
      }
    },

    validatePhoneNumber(phone: string) {
      let re = /^([7]{1})([0-9]{9})$/;
      return re.test(phone);
    },

    checkAddressTyping() {
      const notification = document.getElementById("address-notification");
      if (!this.validateAddress(this.clientAddress)) {
        notification?.classList.remove("hidden-notification");
        notification?.classList.add("show-notification");
      } else {
        notification?.classList.remove("show-notification");
        notification?.classList.add("hidden-notification");
      }
    },

    checkDetailsTyping() {
      const notification = document.getElementById("details-notification");
      if (
        !this.validateAddress(this.clientHouse) ||
        !this.validateNumbers(+this.clientHouseNumber) ||
        !this.validateNumbers(+this.clientDoorNumber)
      ) {
        notification?.classList.remove("hidden-notification");
        notification?.classList.add("show-notification");
      } else {
        notification?.classList.remove("show-notification");
        notification?.classList.add("hidden-notification");
      }
    },

    checkPhoneTyping() {
      const notification = document.getElementById("phone-notification");
      if (!this.validatePhoneNumber(this.clientPhone)) {
        notification?.classList.remove("hidden-notification");
        notification?.classList.add("show-notification");
      } else {
        notification?.classList.remove("show-notification");
        notification?.classList.add("hidden-notification");
      }
    },

    saveData() {
      const elements = document.getElementsByClassName("show-notification");
      if (!elements.length) {
        this.clientInfo = {
          address: this.clientAddress || "",
          house: this.clientHouse || "",
          houseNumber: this.clientHouseNumber || "",
          doorNumber: this.clientDoorNumber || "",
          phone: this.clientPhone || "",
          comment: this.clientComments || "",
        };
        this.$emit("clientInfoSaved", this.clientInfo);
      }
    },

    clearData() {
      this.clientAddress = "";
      this.clientHouse = "";
      this.clientHouseNumber = "";
      this.clientDoorNumber = "";
      this.clientPhone = "";
      this.clientComments = "";
    },
  },

  mounted() {
    const buttonSubmit = document.getElementById("submit-order");

    buttonSubmit?.addEventListener("click", this.checkAddressTyping);
    buttonSubmit?.addEventListener("click", this.checkDetailsTyping);
    buttonSubmit?.addEventListener("click", this.checkDetailsTyping);
    buttonSubmit?.addEventListener("click", this.checkDetailsTyping);
    buttonSubmit?.addEventListener("click", this.checkPhoneTyping);
    buttonSubmit?.addEventListener("click", this.saveData);
  },
});
</script>
<style scoped lang="scss">
input {
  all: unset;
  border: 1px solid $gray-light;
  border-radius: 7px;
  padding: 6px;
  font-size: 14px;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}

.client-address,
.client-comments,
.client-phone {
  margin-top: 7px;
  margin-bottom: 5px;
}

.client-address {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  & #input-address {
    width: 90%;
    height: 30px;
  }
  & .address-details {
    width: 90%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: 10px;
    & #input-details-house,
    #input-details-house-number,
    #input-details-door-number {
      width: 30%;
      margin-right: 10px;
    }
  }
}

.client-phone {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 35px;
  border: 1px solid $gray-light;
  border-radius: 7px;
  width: 40%;
  .phone-operator {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    border-right: 1px solid $gray-light;
    margin-right: 15px;
  }
  & #input-phone {
    all: unset;
    font-size: 18px;
  }
}

.client-comments {
  display: flex;
  flex-direction: row;
  align-items: center;
  & #input-comments {
    max-width: 70%;
    max-height: 100px;
    width: 60%;
    height: 70px;
  }
}
.btn {
  margin-left: 3vw;
  background-color: #e54241;
  padding: 8px 14px;
  font-size: 18px;
  text-align: center;
}

@media screen and (max-width: $screen) {
  .client-phone {
    width: 60%;
  }
}
</style>
