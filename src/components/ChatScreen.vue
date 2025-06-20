<script setup>
import IncomeMessage from '@/components/IncomeMessage.vue'
import { useDataStore } from '@/stores/store'
import { ref, watch } from 'vue'

const dataStore = useDataStore()

const defineProps = defineProps({
	user: {
		type: Object,
		required: true,
	},
})

document.addEventListener('keypress', event => {
	if (event.keyCode === 13 && defineProps.user.messageInput) {
		dataStore.sendMessage(defineProps.user.id)
	}
})
</script>

<template>
	<div class="chat-screen">
		<header class="header">
			<img :src="user.avatar" alt="person avatar" class="avatar" />
			<div class="userinfo">
				<h1 class="username">{{ user.name }}</h1>
				<p class="status">
					{{
						dataStore.users[user.id].messageInput &&
						dataStore.users[user.id] !== user.userId
							? 'typing...'
							: 'online'
					}}
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
		<footer class="footer">
			<input
				type="text"
				class="message-input"
				placeholder="Написать сообщение..."
				v-model="user.messageInput"
			/>

			<button
				class="send-button"
				@click="
					user.messageInput
						? dataStore.sendMessage(user.id)
						: dataStore.toggleModal(user.id)
				"
			>
				<img
					:src="
						user.messageInput ? dataStore.sendButton : dataStore.photoButton
					"
					alt="send-button"
					class="send-icon"
				/>
			</button>
		</footer>
	</div>
</template>

<style scoped lang="scss" src="@/assets/style/chatScreen.scss"></style>
