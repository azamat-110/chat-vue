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

// const user.messageInput = defineModel()
const showModal = ref(false)
const photoButton = new URL('@/assets/images/photoButton.png', import.meta.url)
const sendButton = new URL('@/assets/images/sendButton.png', import.meta.url)

// let userIsTyping = computed(() => defineProps.user.isTyping)

function toggleModal() {
	showModal.value = !showModal.value
	dataStore.currentUserId = defineProps.user.id
}

function sendCurrentMessage() {
	defineProps.user.messageInput
		? dataStore.sendMessage(defineProps.user.id, defineProps.user.messageInput)
		: toggleModal(defineProps.user.id)
	defineProps.user.messageInput = ''
}
let timeout
function input() {
	if (timeout) {
		clearTimeout(timeout)
		timeout = undefined
	}
	const find = dataStore.users.find(a => a.id != defineProps.user.id)
	if (!find) return
	if (!find.isTyping) dataStore.updateTypingStatus(find.id, true)
	timeout = setTimeout(() => {
		dataStore.updateTypingStatus(find.id, false)
	}, 2_000)
}
</script>

<template>
	<div class="chat-screen">
		<header class="header">
			<img :src="user.avatar" alt="person avatar" class="avatar" />
			<div class="userinfo">
				<h1 class="username">{{ user.name }}</h1>
				<p class="status">
					{{ user.isTyping ? 'Печатает...' : 'Онлайн' }}
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

		<form class="footer" @submit.prevent="sendCurrentMessage">
			<input
				type="text"
				class="message-input"
				id="messageInput"
				placeholder="Написать сообщение..."
				v-model="user.messageInput"
				@input="input"
			/>

			<button class="send-button" type="submit">
				<img
					:src="user.messageInput ? sendButton : photoButton"
					alt="send-button"
					class="send-icon"
				/>
			</button>
			<SendImageModal
				v-if="showModal"
				@toggleModal="toggleModal"
				:userId="user.id"
			/>
		</form>
	</div>
</template>

<style></style>
