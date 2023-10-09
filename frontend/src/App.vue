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
            Boards</btn>
          <btn class="btn btn-ghost btn-xs text-[#70b1e6] hover:text-white">Reports
          </btn>
          <router-link to="/projects" class="btn btn-ghost btn-xs" :class="{
            'text-[#80929d] bg-[#1d232a] border-[#1d232a]': isOnProjectPage,
            'text-[#70b1e6] hover:text-white': !isOnProjectPage
          }">Projects</router-link>
          <btn class="btn btn-ghost btn-xs text-[#70b1e6] hover:text-white">Knowledge
            Base</btn>
          <btn class="btn btn-ghost btn-xs text-[#70b1e6] hover:text-white">Gantt
            Charts</btn>
        </nav>
      </div>

      <div class="flex items-center space-x-4">
        <btn class="btn btn-circle btn-ghost">
          <i class="fas fa-bell"></i>
        </btn>
        <btn class="btn btn-circle btn-ghost">
          <i class="fas fa-question-circle"></i>
        </btn>
      </div>
    </div>
  </div>
  <router-view></router-view>
</template>

<script>
export default {
  name: 'App',
  components: {
  },

  computed: {
    isOnProjectPage() {
      console.log(this.$route.params);
      return this.$route.path.startsWith('/projects');
    }
  }

}

</script>

<style>
body {
  font-family: system-ui, -apple-system, Segoe UI, Roboto, Noto Sans, Ubuntu, Cantarell, Helvetica Neue, Arial, sans-serif;
}
</style>
