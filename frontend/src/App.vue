<template>
  <div class="bg-[#1d232a] text-white shadow-md">
    <div class="container mx-auto px-4 py-2 flex items-center justify-between">

      <!-- Left Side: Logo and Navigation -->
      <div class="flex items-center">

        <!-- Logo and YouTrack Name -->
        <!-- <img src="logo.png" alt="Logo" class="h-8 w-8 mr-2" /> -->
        <span class="font-semibold text-lg">Express V2</span>

        <!-- Navigation -->
        <nav class="ml-6 space-x-4">
          <btn class="btn btn-ghost btn-xs text-[#70b1e6] hover:text-white">Issues
          </btn>
          <btn class="btn btn-ghost btn-xs text-[#70b1e6] hover:text-white">Dashboards
          </btn>
          <btn class="btn btn-ghost btn-xs text-[#70b1e6] hover:text-white">Agile
            Boards</btn>
          <btn class="btn btn-ghost btn-xs text-[#70b1e6] hover:text-white">Reports
          </btn>
          <btn class="btn btn-ghost btn-xs text-[#70b1e6] hover:text-white">Reports
          </btn>
          <router-link to="/projects"
            class="btn btn-ghost btn-xs text-[#70b1e6] hover:text-white"
            :class="{ 'text-[#80929d] bg-[#1d232a] border-[#1d232a]': $route.path === '/projects', 'text-[#70b1e6] border-[#70b1e6]': $route.path !== '/projects' }">Projects</router-link>
          <btn class="btn btn-ghost btn-xs text-[#70b1e6] hover:text-white">Knowledge
            Base</btn>
          <btn class="btn btn-ghost btn-xs text-[#70b1e6] hover:text-white">Gantt
            Charts</btn>
        </nav>
      </div>

      <!-- Right Side: Notifications, Help, Profile -->
      <div class="flex items-center space-x-4">
        <btn class="btn btn-circle btn-ghost">
          <i class="fas fa-bell"></i>
        </btn>
        <btn class="btn btn-circle btn-ghost">
          <i class="fas fa-question-circle"></i>
        </btn>
        <!-- <img src="path_to_profile_pic.png" alt="Profile Badge" class="h-8 w-8 rounded-full" /> -->
      </div>
    </div>
  </div>
  <router-view></router-view>
  <!-- <div>
    <div id="logo">
      <img :src="'./logo.png'" />
    </div>
  </div>
  <h2>Hi, I Am SAM</h2>
  <hr />
  <h3>Create User</h3>
  <CreateItem class="form-section" />
  <hr />
  <h3>Get User By ID</h3>
  <GetItemById class="form-section" />
  <hr />
  <h3>Get All Users</h3>
  <GetItems class="form-section" />
  <button class="btn">Hello daisyui</button> -->
</template>

<script>
// import CreateItem from './components/CreateItem'
// import GetItems from './components/GetItems'
// import GetItemById from './components/GetItemById'
export default {
  name: 'App',
  components: {
  },
}
</script>

<style>body {
  font-family: system-ui, -apple-system, Segoe UI, Roboto, Noto Sans, Ubuntu, Cantarell, Helvetica Neue, Arial, sans-serif;
}</style>
