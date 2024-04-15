<script lang="ts">
import { GoogleAuthProvider } from 'firebase/auth'
import router from '@/router'
export const googleAuthProvider = new GoogleAuthProvider()
</script>
<script setup lang="ts">
import {
  getRedirectResult,
  signInWithRedirect,
  signInWithPopup,
} from 'firebase/auth'
import { useCurrentUser, useFirebaseAuth } from 'vuefire'
import { ref, onMounted } from "vue"
import { oAuthLogin, oAuthRegister } from '@/api/account'
import swal from 'sweetalert2';

const auth = useFirebaseAuth() // only exists on client side
const user = useCurrentUser()
const loginUser = ref();
const loginDTO = ref({
  email: '',
  username: '',
}
);
const registerDTO = ref({
  email: '',
  username: '',
  first_name: '',
  last_name: '',
});

const signinPopup = async (type: string) => {
  error.value = null
  // @ts-ignore
  signInWithPopup(auth, googleAuthProvider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      if (credential === null) {
        throw new Error('Failed to get credential')
      } else {
        const token = credential.accessToken;
      }

      loginUser.value = result.user
      loginDTO.value = {
        email: result["user"]["email"]!,
        username: result['user']['email']!,
      }
      registerDTO.value = {
        email: result["user"]["email"]!,
        username: result['user']['email']!,
        first_name: result['user']['displayName']!,
        last_name: result['user']['displayName']!,
      }
      if (type == 'register') {
        oauthRegister();
      } else {
        oauthLogin();
      }


    })
    .catch((reason) => {
      console.error('Failed sign', reason)
      error.value = reason
    })
}
const oauthRegister = async () => {
  const res = await oAuthRegister(registerDTO.value);
  if (res.status == 200) {
    console.log("res", res)
    swal.fire("註冊成功", "成功註冊自動導向訂單管理", "success")
    router.push({ name: 'Order' });
  } else {
    swal.fire("註冊失敗", "註冊失敗，請檢閱您的 Google 帳戶條款", "error")
  }
}
const oauthLogin = async () => {
  const res = await oAuthLogin(loginDTO.value);
  if (res.status == 200) {
    swal.fire("登入成功", "成功登入自動導向訂單管理", "success")
    router.push({ name: 'Order' });
  } else {
    swal.fire("登入失敗", "登入失敗，請先註冊帳戶", "error")
  }
}
const register = async () => {
  await signinPopup("register");
}
const login = async () => {
  await signinPopup("login");

}
// display errors if any
const error = ref(null)
function signinRedirect() {
  // @ts-ignore
  signInWithRedirect(auth, googleAuthProvider).catch((reason) => {
    console.error('Failed signinRedirect', reason)
    error.value = reason
  })
}

// only on client side
onMounted(() => {
  // @ts-ignore
  getRedirectResult(auth).catch((reason) => {
    console.error('Failed redirect result', reason)
    error.value = reason
  })
})
</script>
<template>
  <v-container>
    <v-row>
      <v-col cols=12>
        <h1 id="create-title">帳戶管理</h1>
      </v-col>
    </v-row>
    <v-row>

      <v-col cols="12">
        {{ loginUser }}
        <v-btn prepend-icon="mdi-google" @click="register">Google 註冊</v-btn>
        <v-btn prepend-icon="mdi-google" @click="login">Google 登入</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
<style></style>
