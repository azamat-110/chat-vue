<script setup>
import ChatScreen from '@/components/ChatScreen.vue'
import { useDataStore } from '@/stores/store'

const dataStore = useDataStore()
</script>

<template>
	<div class="main-page">
		<ChatScreen v-for="user in dataStore.users" :user="user" :key="user.id" />
	</div>
</template>

<style></style>
