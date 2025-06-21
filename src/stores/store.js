import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useDataStore = defineStore('data', () => {
	let currentUserId = ref(null)

	const messages = ref([
		{
			id: 0,
			userId: 0,
			messageText: 'Привет, как дела?',
			messageTime: '00:00',
		},
		{
			id: 1,
			userId: 1,
			messageText: 'Хорошо, а у тебя?',
			messageTime: '00:01',
		},
	])

	const users = [
		{
			id: 0,
			name: 'Александр',
			avatar: 'public/images/alexAvatar.png',
			messageInput: '',
			isTyping: false,
		},
		{
			id: 1,
			name: 'Евгений',
			avatar: 'public/images/evgenyAvatar.png',
			messageInput: '',
			isTyping: true,
		},
	]

	function sendMessage(userId, imgUrl = '', comment = '') {
		const hours =
			new Date().getHours() < 10
				? '0' + new Date().getHours()
				: new Date().getHours()

		const minutes =
			new Date().getMinutes() < 10
				? '0' + new Date().getMinutes()
				: new Date().getMinutes()

		const user = users[userId]

		const newMessage = {
			id: messages.value.length + 1,
			userId: userId,
			messageText: comment || user.messageInput,
			messageTime: hours + ':' + minutes,
			imgUrl: imgUrl || '',
		}
		messages.value.push(newMessage)
		user.messageInput = ''
	}

	function updateTypingStatus(userId, isTyping) {
		if (users[userId]) {
			users[userId].isTyping = isTyping
		}
	}

	return {
		users,
		messages,
		sendMessage,
		updateTypingStatus,
		currentUserId,
	}
})
