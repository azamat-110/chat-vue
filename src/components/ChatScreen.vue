<script setup>
import IncomeMessage from '@/components/IncomeMessage.vue'
import SendImageModal from '@/components/SendImageModal.vue'
import { useDataStore } from '@/stores/store'
import { ref } from 'vue'

const dataStore = useDataStore()
const defineProps = defineProps({
	user: {
		type: Object,
		required: true,
	},
})

if (defineProps.user.messageInput) {
	console.log('user.messageInput: ', defineProps.user.messageInput)
}
const showModal = ref(false)
const photoButton = new URL('@/assets/images/photoButton.png', import.meta.url)
const sendButton = new URL('@/assets/images/sendButton.png', import.meta.url)

// let userIsTyping = computed(() => defineProps.user.isTyping)

function toggleModal() {
	showModal.value = !showModal.value
	dataStore.currentUserId = defineProps.user.id
}

function sendCurrentMessage() {
	return defineProps.user.messageInput
		? dataStore.sendMessage(defineProps.user.id)
		: toggleModal(defineProps.user.id)
}
</script>

<template>
	<div class="chat-screen">
		<SendImageModal
			v-if="showModal"
			@toggleModal="toggleModal"
			:userId="user.id"
		/>
		<header class="header">
			<img :src="user.avatar" alt="person avatar" class="avatar" />
			<div class="userinfo">
				<h1 class="username">{{ user.name }}</h1>
				<p class="status">
					{{ false ? 'typing...' : 'online' }}
				</p>
			</div>
		</header>
		<div class="messages">
			<IncomeMessage
				v-for="message in dataStore.messages"
				:key="message.id"
				:messageData="message"
				:userId="user.id"
			/>
		</div>
		<form class="footer" @submit.prevent="sendCurrentMessage()">
			<input
				type="text"
				class="message-input"
				placeholder="Написать сообщение..."
				v-model="user.messageInput"
			/>
			<button class="send-button" type="submit">
				<img
					:src="user.messageInput ? sendButton : photoButton"
					alt="send-button"
					class="send-icon"
				/>
			</button>
		</form>
	</div>
</template>

<style></style>
