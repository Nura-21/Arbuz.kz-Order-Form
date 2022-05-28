import { createApp } from "vue";
import App from "./App.vue";
import DeliveryPicker from "./components/DeliveryPicker.vue";
import ClientInfo from "./components/ClientInfo.vue";
const app = createApp(App);
app.component("DeliveryPicker", DeliveryPicker);
app.component("ClientInfo", ClientInfo);
app.mount("#app");
