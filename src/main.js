// import { createApp } from "vue";
// import App from "./App.vue";
// import router from "./router";
//
// createApp(App).use(router).mount("#app");
// 수정
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);

// Kakao SDK 초기화
if (window.Kakao) {
  window.Kakao.init(import.meta.env.VITE_KAKAO_JS_KEY);
  console.log("Kakao SDK initialized:", window.Kakao.isInitialized());
}

app.use(router).mount("#app");
