<template>
  <div class="prose w-full max-w-2xl h-9">
    <h1>Log in to {{ title }}</h1>
    <button
      class="bg-blue-500 text-white font-bold py-2 px-4 rounded"
      @click="login"
    >
      Log in with Github
    </button>
    <NuxtLink
      class="underline"
      to="course/chapter/1-chapter-1/lesson/1-introduction-to-typescript-with-vue-js-3"
      >Go to first lesson</NuxtLink
    >
    <!-- <button
      class="bg-blue-500 text-white font-bold py-2 px-4 rounded mx-2"
      @click="loginWithSupabase"
    >
      Log in with Github Supabase
    </button>
    <button
      class="bg-blue-300 text-white font-bold py-2 px-4 rounded mx-2"
      @click="loginWithSupabaseTwitter"
    >
      Log in with Twitter Supabase
    </button> -->
  </div>
</template>

<script setup lang="ts">
import { User } from "~/types/User";
import { useAuth } from "../stores/auth";

import {
  GithubAuthProvider,
  signInWithPopup,
  signInWithCredential,
} from "firebase/auth";
const { title } = useCourse();
const githubToken = useLocalStorage("github_token", "");
const { $auth, $loginWithGithubToken } = useNuxtApp();
const auth = useAuth();
const provider = new GithubAuthProvider();
const { query } = useRoute();
const redirect = (query.redirect as string) ?? "/course";
definePageMeta({
  middleware: ["guest"],
});
const useLoginWithGithubToken = async (token: string) => {
  await signInWithCredential($auth, GithubAuthProvider.credential(token))
    .then((result) => {
      const user = result.user;
      const currentUser: User = {
        email: user.email,
        name: user.displayName,
        photo: user.photoURL,
        phone: user.phoneNumber,
      };
      auth.login(currentUser);
      navigateTo(redirect, { replace: true });
      // navigateTo("/course");
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // ...
    });
};
const useLoginWithGithubRedirect = async () => {
  await signInWithPopup($auth, provider)
    .then((result) => {
      // This gives you a GitHub Access Token. You can use it to access the GitHub API.
      const credential = GithubAuthProvider.credentialFromResult(result);
      //   const token = credential.accessToken;
      // The signed-in user info.
      githubToken.value = credential?.accessToken;
      const user = result.user;
      const currentUser: User = {
        email: user.email,
        name: user.displayName,
        photo: user.photoURL,
        phone: user.phoneNumber,
      };
      auth.login(currentUser);
      navigateTo(redirect, { replace: true });
      // navigateTo("/course");
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GithubAuthProvider.credentialFromError(error);
      // ...
    });
};
// const supabase = useSupabaseClient();

const login = async () => {
  if (githubToken.value.length)
    await $loginWithGithubToken(githubToken.value).then(() => {
      if (auth.isSigned) navigateTo("/course");
    });

  // await useLoginWithGithubToken(githubToken.value);
  if (githubToken.value.length != 0) return;
  await useLoginWithGithubRedirect();
};
// const loginWithSupabase = async () => {
//   const { error } = await supabase.auth.signInWithOAuth({
//     provider: "github",
//   });
//   if (error) console.log(error);
// };
// const loginWithSupabaseTwitter = async () => {
//   const { error } = await supabase.auth.signInWithOAuth({
//     provider: "twitter",
//   });
//   if (error) console.log(error);
// };
</script>

<style scoped></style>
