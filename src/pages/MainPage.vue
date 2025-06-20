<script setup>
import ChatScreen from '@/components/ChatScreen.vue'
import SendImageModal from '@/components/SendImageModal.vue'
import { useDataStore } from '@/stores/store'

const dataStore = useDataStore()
</script>

<template>
	<div class="main-page">
		<SendImageModal v-if="dataStore.showModal" />
		<ChatScreen :user="dataStore.users[1]" />
		<ChatScreen :user="dataStore.users[2]" />
	</div>
</template>

<style scoped src="@/assets/style/mainPage.scss"></style>
