<template>
  <div v-if="user" class="rounded p-3 flex items-center space-x-3 bg-white">
    <img
      class="rounded-full w-12 h-12 border-2 border-blue-400"
      :src="profile"
    />
    <div class="text-right">
      <div class="font-medium">{{ name }}</div>
      <button class="text-sm underline text-slate-500" @click="logout()">
        Log out
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const auth = useAuth();
const user = auth.user;
// const name = "";
// const profile = "";
// import { User } from "@supabase/gotrue-js";
import { useAuth } from "../stores/auth";
// const user: Ref<User | null> = useSupabaseUser();
// const name = computed(() => user.value?.user_metadata.full_name);
// const profile = computed(() => user.value?.user_metadata.avatar_url);
const name = computed(() => auth.getUserName);
const profile = computed(() => auth.user?.photo ?? "");
// const supabase = useSupabaseClient();
const logout = async () => {
  auth.logout();
  //   const { error } = await supabase.auth.signOut();
  //   if (error) {
  //     throw createError(error.message);
  //   }
  navigateTo("/login");
};
</script>
