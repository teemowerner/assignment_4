
<!--<template>-->
<!--  <div>OAuth 처리 중...</div>-->
<!--</template>-->

<!--<script>-->
<!--export default {-->
<!--  created() {-->
<!--    const url = new URL(window.location.href);-->
<!--    const code = url.searchParams.get("code");-->
<!--    if (code) {-->
<!--      console.log('Received code:', code); // code 값 확인-->
<!--      this.kakaoCallback(code);-->
<!--    } else {-->
<!--      console.error('No code parameter found in URL');-->
<!--    }-->
<!--  },-->
<!--  methods: {-->
<!--    async kakaoCallback(code) {-->
<!--      try {-->
<!--        const response = await fetch(-->
<!--          `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${import.meta.env.VITE_KAKAO_JS_KEY}&redirect_uri=${import.meta.env.VITE_KAKAO_REDIRECT_URI}&code=${code}`,-->
<!--          {-->
<!--            method: "POST",-->
<!--            headers: {-->
<!--              "Content-Type": "application/x-www-form-urlencoded", // 이 헤더가 필요할 수 있음-->
<!--            },-->
<!--          }-->
<!--        );-->

<!--        if (!response.ok) {-->
<!--          throw new Error(`Failed to fetch: ${response.statusText}`);-->
<!--        }-->

<!--        const data = await response.json();-->
<!--        console.log("Kakao token:", data);-->

<!--        if (data.access_token) {-->
<!--          // 토큰을 성공적으로 받아왔을 때 처리-->
<!--          console.log("Access Token:", data.access_token);-->
<!--          // 여기서 토큰을 저장하거나, 원하는 추가 작업을 할 수 있음-->
<!--        } else {-->
<!--          console.error("Failed to get access token from Kakao.");-->
<!--        }-->
<!--      } catch (error) {-->
<!--        console.error("Kakao login error:", error);-->
<!--      }-->
<!--    },-->
<!--  },-->
<!--};-->
<!--</script>-->

<template>
  <div>
    <h1>로그인 중...</h1>
  </div>
</template>

<script>
export default {
  name: "OAuthHandler",
  async created() {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    try {
      const response = await fetch("https://kauth.kakao.com/oauth/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          grant_type: "authorization_code",
          client_id: import.meta.env.VITE_KAKAO_REST_API_KEY,
          redirect_uri: import.meta.env.VITE_KAKAO_REDIRECT_URI,
          code,
        }),
      });

      if (!response.ok) throw new Error(`Failed to fetch: ${response.statusText}`);
      const data = await response.json();

      // 토큰 저장
      localStorage.setItem("authToken", data.access_token);

      // 회원 정보 조회
      const userInfoResponse = await fetch("https://kapi.kakao.com/v2/user/me", {
        headers: { Authorization: `Bearer ${data.access_token}` },
      });

      if (!userInfoResponse.ok) throw new Error(`Failed to fetch user info`);
      const userInfo = await userInfoResponse.json();

      // 사용자 정보 전달 및 리다이렉트
      this.$emit("update-user", {
        name: userInfo.properties.nickname,
        profile_image: userInfo.properties.profile_image,
      });
      this.$router.push("/");
    } catch (error) {
      console.error("로그인 오류:", error);
      alert("로그인에 실패했습니다.");
      this.$router.push("/signin");
    }
  },
};
</script>
