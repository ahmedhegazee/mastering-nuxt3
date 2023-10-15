
import { defineStore } from 'pinia'
import { User } from '../types/User';

export const useAuth = defineStore({
  id: 'auth',
  state: () => ({
    user: null as User | null,
    isSignedIn: false as boolean,
  }),
  getters: {
    getUserName(state) {
      return state.user?.name ?? 'Guest';
    },
    isSigned(state) {
      return state.isSignedIn;
    }
  },
  actions: {
    login(user: User) {
      this.user = user;
      this.isSignedIn = true;
    },
    logout() {
      this.user = null;
      this.isSignedIn = false;
      localStorage.removeItem("github_token");
    }
  },
})
