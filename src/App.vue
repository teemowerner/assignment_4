<!--<template>-->
<!--  <div id="app">-->
<!--    <Header />-->
<!--    <router-view />-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--import Header from "@/components/Header.vue";-->
<!--import "@fortawesome/fontawesome-free/css/all.css";-->
<!--import "@fortawesome/fontawesome-free/js/all.js";-->


<!--export default {-->
<!--  name: "App",-->
<!--  components: {-->
<!--    Header,-->
<!--  },-->
<!--};-->
<!--</script>-->

<!--<style>-->
<!--/* 전체 스타일은 여기에 추가 */-->
<!--body {-->
<!--  background-color: #121212; /* 원하는 배경색 */-->
<!--  color: white; /* 텍스트를 하얀색으로 */-->
<!--  margin: 0;-->
<!--  font-family: 'Noto Sans KR', sans-serif;-->
<!--}-->

<!--</style>-->
<template>
  <div id="app">
    <Header />
    <router-view />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";

export default {
  name: "App",
  components: {
    Header,
  },
  created() {
    const url = new URL(window.location.href);
    const code = url.searchParams.get("code");
    if (code) {
      this.kakaoCallback(code);
    }
  },
  methods: {
    async kakaoCallback(code) {
      try {
        const response = await fetch(
          `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${import.meta.env.VITE_KAKAO_JS_KEY}&redirect_uri=${import.meta.env.VITE_KAKAO_REDIRECT_URI}&code=${code}`,
          { method: "POST" }
        );
        const data = await response.json();
        console.log("Kakao token:", data);
      } catch (error) {
        console.error("Kakao login error:", error);
      }
    },
  },
};
</script>

<style>
/* 전체 스타일은 여기에 추가 */
body {
  background-color: #121212; /* 원하는 배경색 */
  color: white; /* 텍스트를 하얀색으로 */
  margin: 0;
  font-family: 'Noto Sans KR', sans-serif;
}
</style>
