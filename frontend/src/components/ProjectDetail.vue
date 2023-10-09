<template>
    <div v-if="isLoading" class="flex justify-center items-center min-h-screen">
        <div class="loading loading-infinity loading-lg"></div>
    </div>

    <div class="p-20">
        <div class="flex">
            <div class="flex-grow p-4 border-r border-gray-300">
                <div class="flex justify-between items-center mb-4">
                    <h1 class="text-gray-600 text-2xl">{{ this.projectDetail?.name }}</h1>
                    <button class="btn btn-outline btn-sm">New Issue</button>
                </div>

                <p class="text-gray-600 mb-4">{{ this.projectDetail?.description }}</p>
            </div>

            <div class="w-1/4 pl-4 border-l border-gray-300">
                <div class="text-center mb-4">
                    <div class="avatar placeholder">
                        <div
                            class="bg-neutral-focus text-neutral-content text-blue-500 w-20 h-20 flex items-center justify-center">
                            <span class="text-xl">
                                {{ this.projectDetail?.name.substring(0, 2).toUpperCase() }}
                            </span>
                        </div>
                    </div>
                </div>

                <h2 class="text-gray-600 text-lg text-center mb-2">About</h2>
                <div class="text-gray-500 text-sm mb-1">Owned By Appcent Tech</div>
                <div class="text-gray-500 text-xs">Created on {{ new Date(this.projectDetail?.createdDate).toLocaleDateString()}}</div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {

    props: ['id'],
    data() {
        return {
            isLoading: true,
            projectDetail: null,
        };
    },
    async mounted() {
        await this.fetchProjectDetails();
    },
    methods: {
        async fetchProjectDetails() {
            try {
                const response = await axios.get(`${process.env.VUE_APP_API_ENDPOINT}/projects/${this.id}`);
                this.projectDetail = response.data;
                this.isLoading = false;
            } catch (error) {
                console.error("An error occurred:", error);
                this.isLoading = false;
            }
        },
    }

};
</script>
