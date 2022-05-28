<template>
  <header class="header d-flex row align-items-center justify-content-center">
    <div class="header__logo">
      <img src="../assets/logo.png" alt="arbuz logo" />
    </div>
    <nav class="header__nav d-flex row align-items-center">
      <div class="burger-menu">
        <i class="material-icons menu">menu</i>
      </div>
      <div class="logo-phone hidden-notification">
        <img src="../assets/logo.png" alt="arbuz logo" />
      </div>
      <div class="search-input d-flex row align-items-center">
        <input type="text" placeholder="Начните вводить название товара" />
        <i class="material-icons green">search</i>
      </div>
      <div class="address-info d-flex row align-items-center">
        <i class="material-icons green">location_on</i>
        <div class="info">
          <h5>Алматы:</h5>
          <h5>Сегодня, 19:00 - 21:00</h5>
        </div>
      </div>
      <div class="actions-btn d-flex row align-items-center">
        <button class="btn-login">Войти</button>
        <button class="btn-cart">
          <i class="material-icons">shopping_cart</i>
          {{ itemsInCart }}
        </button>
      </div>
    </nav>
  </header>
</template>

<script lang="ts">
export default {
  name: "LayoutHeader",
  data: () => ({
    itemsInCart: 0,
  }),
};
</script>

<style scoped lang="scss">
.header {
  height: 60px;
  border-bottom: 1px solid rgb(240, 240, 240);
  width: 100vw;
  &__logo {
    margin-right: 30px;
    & img {
      width: 155px;
      cursor: pointer;
    }
  }
  &__nav {
    & .burger-menu {
      border: 1px solid rgb(240, 240, 240);
      border-radius: 10px;
      margin-right: 15px;
      & .menu {
        font-size: 32px;
        padding: 6px 10px;
      }
    }
    & .search-input {
      background-color: #f5f5f5;
      border-radius: 8px;
      margin-right: 20px;
      & input {
        all: unset;
        height: 45px;
        border: none;
        width: 24vw;
        padding-left: 15px;
      }
      & i {
        padding-right: 15px;
      }
    }
    & .address-info {
      margin-right: 10vw;
      & i {
        font-size: 35px;
      }
      &:hover {
        color: #46ad4d;
        cursor: pointer;
      }
      & .info {
        & h5 {
          font-weight: 100;
        }
      }
    }
    & .actions-btn {
      & button {
        all: unset;
        width: 4vw;

        border-radius: 10px;
        height: 40px;
        text-align: center;
        font-size: 16px;
        font-weight: bold;
        cursor: pointer;
      }
      & .btn-cart {
        background-color: $green-primary;
        color: white;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
      }
      & .btn-login {
        background-color: $gray;
        color: $gray-dark;
        margin-right: 10px;
      }
    }
  }
}
@media screen and (max-width: $screen) {
  .header {
    height: 50px;
    width: 100%;
    &__logo {
      display: none;
    }
    &__nav {
      width: 95%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .logo-phone {
        display: flex;
        margin-left: 60px;
        & img {
          width: 90px;
          cursor: pointer;
        }
      }
      & .burger-menu {
        border-radius: 8px;
        & .menu {
          font-size: 28px;
          padding: 5px 8px;
        }
      }
      & .search-input {
        display: none;
      }
      & .address-info {
        margin-right: 5px;
        & i {
          font-size: 20px;
        }
        & .info {
          & h5 {
            font-weight: 100;
            font-size: 8px;
          }
        }
      }
      & .actions-btn {
        display: none;
      }
    }
  }
}
</style>
