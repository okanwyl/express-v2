<template>
  <div class="bg-[#1d232a] text-white shadow-md">
    <div class="container mx-auto px-4 py-2 flex items-center justify-between">

      <div class="flex items-center">

        <span class="font-semibold text-lg">Express V2</span>

        <nav class="ml-6 space-x-4">
          <btn class="btn btn-ghost btn-xs text-[#70b1e6] hover:text-white">Issues
          </btn>
          <btn class="btn btn-ghost btn-xs text-[#70b1e6] hover:text-white">Dashboards
          </btn>
          <btn class="btn btn-ghost btn-xs text-[#70b1e6] hover:text-white">Agile
            Boards
          </btn>
          <btn class="btn btn-ghost btn-xs text-[#70b1e6] hover:text-white">Reports
          </btn>
          <router-link to="/projects" class="btn btn-ghost btn-xs" :class="{
            'text-[#80929d] bg-[#1d232a] border-[#1d232a]': isOnProjectPage,
            'text-[#70b1e6] hover:text-white': !isOnProjectPage
          }">Projects
          </router-link>
          <btn class="btn btn-ghost btn-xs text-[#70b1e6] hover:text-white">Knowledge
            Base
          </btn>
          <btn class="btn btn-ghost btn-xs text-[#70b1e6] hover:text-white">Gantt
            Charts
          </btn>
        </nav>
      </div>

      <div class="flex items-center space-x-4">
        <btn class="btn btn-circle btn-ghost">
          <i class="fas fa-bell"></i>
        </btn>
        <btn class="btn btn-circle btn-ghost">
          <i class="fas fa-question-circle"></i>
        </btn>

        <button v-if="!authenticatedUser" @click="showLoginModal = true"
                class="btn btn-ghost btn-xs text-[#70b1e6] hover:text-white">Login
        </button>

        <div v-if="authenticatedUser" class="flex items-center space-x-4">
          <button @click="handleLogout" class="btn btn-ghost btn-xs text-[#70b1e6] hover:text-white">Logout</button>
        </div>
        <LoginModal :visible="showLoginModal" @close="showLoginModal = false" @user-logged-in="updateAuthenticatedUser"/>


      </div>
    </div>
  </div>
  <router-view></router-view>
</template>

<script>
import LoginModal from "@/components/LoginModal.vue";
import {userPool} from "@/cognito";

export default {
  name: 'App',
  components: {
    LoginModal
  },

  data() {
    return {
      showLoginModal: false,
      authenticatedUser: userPool.getCurrentUser() // Initialize it directly here

    }
  },

  computed: {
    isOnProjectPage() {
      console.log(this.$route.params);
      return this.$route.path.startsWith('/projects');
    },
  },
  methods: {
    handleLogout() {
      if (this.authenticatedUser) {
        this.authenticatedUser.signOut();
        this.authenticatedUser = null; // Clear the authenticated user
        this.$router.push('/'); // or wherever you want to redirect after logout
      }
    },
    updateAuthenticatedUser(user) {
      this.authenticatedUser = user;
    }
  },

  watch: {
    authenticatedUser(newVal, oldVal) {
      console.log(newVal);
      console.log(oldVal);
    }
  },


}

</script>

<style>
body {
  font-family: system-ui, -apple-system, Segoe UI, Roboto, Noto Sans, Ubuntu, Cantarell, Helvetica Neue, Arial, sans-serif;
}
</style>
