<!--<template>-->
<!--  <div class="login-container">-->
<!--    <div class="login-box">-->
<!--      &lt;!&ndash; 로그인 페이지 제목 &ndash;&gt;-->
<!--      <h1 class="login-title">로그인 페이지</h1>-->
<!--      <form @submit.prevent="handleLogin">-->
<!--        <div class="form-group">-->
<!--          <input-->
<!--            type="text"-->
<!--            v-model="username"-->
<!--            placeholder="Username or Email"-->
<!--            required-->
<!--          />-->
<!--        </div>-->
<!--        <div class="form-group">-->
<!--          <input-->
<!--            type="password"-->
<!--            v-model="password"-->
<!--            placeholder="Password"-->
<!--            required-->
<!--          />-->
<!--        </div>-->
<!--        <div class="form-options">-->
<!--          &lt;!&ndash; 텍스트 색상을 검정색으로 설정 &ndash;&gt;-->
<!--          <label class="checkbox-label">-->
<!--            <input type="checkbox" v-model="rememberMe" />-->
<!--            아이디/패스워드 저장-->
<!--          </label>-->
<!--          <a href="#" class="forgot-password">Forgot Password?</a>-->
<!--        </div>-->
<!--        <button type="submit" class="login-button">LOGIN</button>-->
<!--      </form>-->
<!--      <p class="signup-link">-->
<!--        Don’t have an account? <router-link to="/signup">Sign up</router-link>-->
<!--      </p>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--export default {-->
<!--  name: "Signin",-->
<!--  data() {-->
<!--    return {-->
<!--      username: "",-->
<!--      password: "",-->
<!--      rememberMe: false,-->
<!--    };-->
<!--  },-->
<!--  methods: {-->
<!--    handleLogin() {-->
<!--      if (this.username && this.password) {-->
<!--        // 로그인 로직-->
<!--        localStorage.setItem("isLoggedIn", true);-->
<!--        this.$router.push("/");-->
<!--      } else {-->
<!--        alert("Please enter valid credentials!");-->
<!--      }-->
<!--    },-->
<!--  },-->
<!--};-->
<!--</script>-->

<!--<style scoped>-->
<!--/* 전체 배경 */-->
<!--.login-container {-->
<!--  display: flex;-->
<!--  justify-content: center;-->
<!--  align-items: center;-->
<!--  height: 100vh;-->
<!--  background: url('/path/to/background.jpg') no-repeat center center;-->
<!--  background-size: cover;-->
<!--}-->

<!--/* 로그인 박스 */-->
<!--.login-box {-->
<!--  background-color: white;-->
<!--  border-radius: 12px;-->
<!--  padding: 30px;-->
<!--  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);-->
<!--  width: 300px;-->
<!--  text-align: center;-->
<!--}-->

<!--/* 제목 스타일 */-->
<!--.login-title {-->
<!--  font-size: 24px;-->
<!--  margin-bottom: 20px;-->
<!--  color: black; /* 제목을 검정색으로 설정 */-->
<!--}-->

<!--/* 입력 필드 스타일 */-->
<!--.form-group input {-->
<!--  width: 100%;-->
<!--  padding: 10px;-->
<!--  margin-bottom: 10px;-->
<!--  border: 1px solid #ddd;-->
<!--  border-radius: 6px;-->
<!--  box-sizing: border-box;-->
<!--  font-size: 14px;-->
<!--}-->

<!--/* 옵션 섹션 */-->
<!--.form-options {-->
<!--  display: flex;-->
<!--  justify-content: space-between;-->
<!--  align-items: center;-->
<!--  margin-bottom: 20px;-->
<!--}-->

<!--.checkbox-label {-->
<!--  font-size: 14px;-->
<!--  color: black; /* 체크박스 텍스트를 검정색으로 설정 */-->
<!--}-->

<!--.forgot-password {-->
<!--  font-size: 14px;-->
<!--  text-decoration: none;-->
<!--  color: #007bff;-->
<!--}-->

<!--/* 로그인 버튼 */-->
<!--.login-button {-->
<!--  width: 100%;-->
<!--  padding: 10px;-->
<!--  background-color: #007bff;-->
<!--  color: white;-->
<!--  border: none;-->
<!--  border-radius: 6px;-->
<!--  font-size: 16px;-->
<!--  cursor: pointer;-->
<!--}-->

<!--.login-button:hover {-->
<!--  background-color: #0056b3;-->
<!--}-->

<!--/* 회원가입 링크 */-->
<!--.signup-link {-->
<!--  font-size: 14px;-->
<!--  margin-top: 20px;-->
<!--  color: black; /* 회원가입 텍스트 색상도 검정색으로 설정 */-->
<!--}-->

<!--.signup-link a {-->
<!--  color: #007bff;-->
<!--  text-decoration: none;-->
<!--}-->
<!--</style>-->
<template>
  <div class="signup-container">
    <div class="signup-box">
      <h1 class="signup-title">회원가입 페이지</h1>
      <form @submit.prevent="handleSignup">
        <div class="form-group">
          <input
            type="text"
            v-model="username"
            placeholder="Username"
            required
          />
        </div>
        <div class="form-group">
          <input
            type="email"
            v-model="email"
            placeholder="Email"
            required
          />
        </div>
        <div class="form-group">
          <input
            type="password"
            v-model="password"
            placeholder="Password"
            required
          />
        </div>
        <div class="form-group">
          <input
            type="password"
            v-model="confirmPassword"
            placeholder="Confirm Password"
            required
          />
        </div>
        <button type="submit" class="signup-button">Sign Up</button>
      </form>

      <!-- 카카오 회원가입 버튼 -->
      <button @click="kakaoSignup" class="kakao-signup-button">
        카카오로 회원가입
      </button>

      <p class="login-link">
        Already have an account? <router-link to="/signin">Log in</router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Signup",
  data() {
    return {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  },
  methods: {
    handleSignup() {
      if (!this.validateEmail(this.email)) {
        alert("Please enter a valid email address!");
        return;
      }

      if (this.password !== this.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }

      // 회원가입 로직
      const user = {
        username: this.username,
        email: this.email,
        password: this.password,
      };

      // 데이터를 LocalStorage에 저장
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const emailExists = users.some((u) => u.email === this.email);

      if (emailExists) {
        alert("Email already exists. Please log in.");
        return;
      }

      users.push(user);
      localStorage.setItem("users", JSON.stringify(users));

      alert("회원가입이 완료되었습니다!");
      this.$router.push("/signin");
    },
    validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    },

    // 카카오 회원가입
    kakaoSignup() {
      const redirectUri = import.meta.env.VITE_KAKAO_REDIRECT_URI;
      window.Kakao.Auth.authorize({
        redirectUri,
      });
    },
  },
};
</script>

<style scoped>
/* 회원가입 페이지 스타일 */
.signup-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: url('/path/to/background.jpg') no-repeat center center;
  background-size: cover;
  background-color: #f8f9fa; /* 배경 이미지가 없을 경우를 위한 기본 배경 */
}

.signup-box {
  background-color: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  width: 320px;
  text-align: center;
}

.signup-title {
  font-size: 24px;
  margin-bottom: 20px;
  color: black;
}

.form-group input {
  width: 100%;
  padding: 12px;
  margin-bottom: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-sizing: border-box;
  font-size: 16px;
}

.signup-button {
  width: 100%;
  padding: 12px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.signup-button:hover {
  background-color: #218838;
}

/* 카카오 회원가입 버튼 스타일 */
.kakao-signup-button {
  width: 100%;
  padding: 12px;
  background-color: #fee500; /* 카카오 색상 */
  color: #3e1d03; /* 카카오 텍스트 색상 */
  border: none;
  border-radius: 8px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 15px;
}

.kakao-signup-button:hover {
  background-color: #f8d800;
}

.login-link {
  font-size: 14px;
  margin-top: 20px;
  color: black;
}

.login-link a {
  color: #007bff;
  text-decoration: none;
}

.login-link a:hover {
  text-decoration: underline;
}
</style>
