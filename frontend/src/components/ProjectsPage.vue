<template>
    <div>
        <div v-if="isLoading" class="flex justify-center items-center min-h-screen">
            <div class="loading loading-infinity loading-lg"></div>
        </div>
    </div>
    <div class="h-screen p-6">


        <div class="max-w-3xl mx-auto">
            <div class="flex justify-between items-center mb-6">
                <h1 class="text-2xl">Projects</h1>

                <div class="relative search-container">
                    <input type="text" v-model="searchQuery" @input="filterProjects" placeholder="Filter by name"
                        class="search-input px-4 py-2 border rounded-lg">
                    <button class="search-button absolute right-2 top-2">
                        <i class="fas fa-search"></i>
                    </button>
                </div>
            </div>

            <div v-if="!isLoading" class="divide-y divide-gray-200">
                <div v-for="project in projects" :key="project.id" class="flex justify-between items-center py-4"
                    @click="goToDetailPage(project.projectId)">

                    <div class="flex items-center">
                        <div class="avatar placeholder">
                            <div
                                class="bg-neutral-focus text-neutral-content text-blue-500 w-12 h-12 flex items-center justify-center mr-4">
                                {{ project.name.substring(0, 2).toUpperCase() }}
                            </div>
                        </div>
                        <div>
                            <div class="font-semibold">{{ project.name }}</div>
                            <div class="text-gray-500 text-sm">{{ project.description }}</div>
                        </div>
                    </div>

                    <div class="flex items-center space-x-2">
                        <!-- <img src="logo.png" alt="Team member 1" class="h-6 w-6 rounded-full">
                        <img src="logo.png" alt="Team member 2" class="h-6 w-6 rounded-full"> -->
                        <div class="avatar online placeholder">
                            <div class="bg-neutral-focus text-neutral-content rounded-full w-6 h-6">
                                <span class="text-sm">OA</span>
                            </div>
                        </div>
                        <div class="avatar online placeholder">
                            <div class="bg-neutral-focus text-neutral-content rounded-full w-6 h-6">
                                <span class="text-sm">SL</span>
                            </div>
                        </div>
                        <div class="avatar online placeholder">
                            <div class="bg-neutral-focus text-neutral-content rounded-full w-6 h-6">
                                <span class="text-sm">MA</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="mt-6 text-center">
                <button v-if="!isLoadingMore" class="btn btn-sm" @click="fetchProjects">Show more
                    projects</button>
                <div v-if="isLoadingMore" class="loading loading-infinity loading-md"></div>

            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            isLoading: true,
            projects: [],
            limit: 10,  // Define the default page size as you need
            lastEvaluatedKey: null, // Initialized to null for the first fetch
            isLoadingMore: false,  // NEW
            allProjects: [],
            searchQuery: ''


        };
    },
    async mounted() {
        await this.fetchProjects();
    },
    methods: {
        async fetchProjects() {
            try {

                this.isLoadingMore = true;

                const response = await axios.get(process.env.VUE_APP_API_ENDPOINT + 'projects', {
                    params: {
                        'limit': this.limit,
                        'lastEvaluatedKey': this.lastEvaluatedKey
                    }
                });


                this.allProjects = [...this.projects, ...response.data];

                this.projects = this.allProjects;

                // Update the lastEvaluatedKey to the projectId of the last item
                if (response.data.length > 0) {
                    this.lastEvaluatedKey = response.data[response.data.length - 1].projectId;
                }

                this.isLoading = false;
                this.isLoadingMore = false;

            } catch (error) {
                console.error("An error occurred:", error);
                this.isLoading = false;
            }
        },
        filterProjects() {

            if (this.searchQuery) {
                this.projects = this.allProjects.filter(project =>
                    project.name.toLowerCase().includes(this.searchQuery.toLowerCase())
                );
            } else {
                this.projects = [...this.allProjects];
            }
        },
        goToDetailPage(id) {
            this.$router.push({ name: 'project-detail', params: { id } });
        }
    }
};
</script>


<style scoped>
.loader {
    border-top-color: #3498db;
    animation: spin 1s linear infinite;
}


.search-input {
    width: 100%;
    opacity: 0.7;
}

.search-button {
    transition: opacity 0.4s ease-in-out;
    opacity: 0;
}

.search-container:hover,
.search-container:focus-within {
    width: 200px;
    /* Expanded width */
}

.search-container:hover .search-button,
.search-container:focus-within .search-button {
    opacity: 1;
}

.search-container {
    width: 150px;
    /* Adjusted width to fit the placeholder text */
    transition: width 0.4s ease-in-out;
}

.search-input {
    width: 100%;
    opacity: 1;
    /* Make it fully visible by default */
}

.search-button {
    transition: opacity 0.4s ease-in-out;
    opacity: 1;
}

.search-container:focus-within {
    width: 250px;
    /* Width when the input is focused */
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>
