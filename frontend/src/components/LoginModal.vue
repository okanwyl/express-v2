<template>
  <div v-if="visible" class="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
    <div class="rounded-lg p-8 w-96 shadow-lg relative">

      <button @click="closeModal" class="absolute top-2 right-2">
        X
      </button>

      <h2 class="text-xl font-semibold mb-4">Login</h2>

      <p v-if="errorMessage" class="text-red-500 mb-4">{{ errorMessage }}</p>

      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label for="email" class="block text-sm mb-1">Email:</label>
          <input type="text" id="email" v-model="email" required class="input input-bordered w-full">
        </div>
        <div class="mb-4">
          <label for="password" class="block text-sm mb-1">Password:</label>
          <input type="password" id="password" v-model="password" required class="input input-bordered w-full">
        </div>
        <div>
          <button type="submit" class="btn btn-primary w-full">Login</button>
        </div>
      </form>

      <div v-if="passwordChangeRequired" class="mt-4">
        <h3 class="text-lg font-semibold mb-2">Change Password</h3>
        <input v-model="newPassword" type="password" placeholder="New Password"
               class="input input-bordered w-full mb-2">
        <button @click="completeNewPassword" class="btn btn-secondary w-full">Change Password</button>
      </div>
    </div>

  </div>
</template>

<script>
import {CognitoUser, AuthenticationDetails} from 'amazon-cognito-identity-js';
import {userPool} from "@/cognito";


export default {
  data() {
    return {
      email: '',
      password: '',
      errorMessage: null,
      newPassword: '',
      passwordChangeRequired: false,
      cognitoUser: null,
      showModal: false

    }
  },
  methods: {
    handleLogin() {
      const authenticationData = {
        Username: this.email,
        Password: this.password
      };
      const authenticationDetails = new AuthenticationDetails(authenticationData);

      const userData = {
        Username: this.email,
        Pool: userPool
      };
      const cognitoUser = new CognitoUser(userData);
      this.cognitoUser = cognitoUser; // Store the Cognito user


      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (session) => {
          console.log('Authentication successful:', session);
          // Maybe redirect to a dashboard or main page
          this.$router.push('/projects');
          this.getSession();
          this.closeModal();
          this.$emit('user-logged-in', userPool.getCurrentUser());
        },
        onFailure: (err) => {
          console.error('Authentication failed:', err);
          this.errorMessage = err.message;
        },
        newPasswordRequired: () => {
          this.passwordChangeRequired = true;
        }
      });
    },

    closeModal() {
      this.$emit('close');
    },

    getSession() {
      const cognitoUser = userPool.getCurrentUser();
      if (cognitoUser) {
        cognitoUser.getSession((err, session) => {
          if (err) {
            console.error('Failed to retrieve session:', err);
            return;
          }
          if (session.isValid()) {
            console.log('Session is valid');
          }
        });
      }
    },

    completeNewPassword() {
      console.log("This is cognito user", this.cognitoUser);
      if (this.cognitoUser) {
        this.cognitoUser.completeNewPasswordChallenge(this.newPassword, {}, {
          onSuccess: () => {
            console.log('Password changed successfully');
            this.$router.push('/projects');
          },
          onFailure: (err) => {
            console.error('Password change failed:', err);
            this.errorMessage = err.message;
          }
        });
      }
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.error {
  color: red;
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>