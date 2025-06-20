import { ref, watch } from 'vue'
import { defineStore } from 'pinia'

export const useDataStore = defineStore('data', () => {
	const photoButton = new URL(
		'@/assets/images/photoButton.png',
		import.meta.url
	)
	const sendButton = new URL('@/assets/images/sendButton.png', import.meta.url)
	const showModal = ref(false)
	let currentUserId = ref(0)

	const messages = ref([
		{
			id: 1,
			userId: 1,
			messageText: 'Привет, как дела?',
			messageTime: new Date().getHours() + ':' + new Date().getMinutes(),
		},
	])

	const users = {
		1: {
			id: 1,
			name: 'Александр',
			avatar: 'public/images/alexAvatar.png',
			messageInput: '',
		},
		2: {
			id: 2,
			name: 'Евгений',
			avatar: 'public/images/evgenyAvatar.png',
			messageInput: '',
		},
	}

	function sendMessage(userId) {
		const user = users[userId]
		const newMessage = {
			id: messages.value.length + 1,
			userId: userId,
			messageText: user.messageInput,
			messageTime: new Date().getHours() + ':' + new Date().getMinutes(),
			// imgUrl: imgUrl || '',
		}
		messages.value.push(newMessage)
		user.messageInput = ''
	}

	function toggleModal(id) {
		showModal.value = !showModal.value
		currentUserId.value = id
	}

	return {
		users,
		photoButton,
		sendButton,
		messages,
		sendMessage,
		toggleModal,
		showModal,
		currentUserId,
	}
})
