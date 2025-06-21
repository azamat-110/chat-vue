import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

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

	const users = reactive([
		{
			id: 0,
			name: 'Александр',
			avatar: 'public/images/alexAvatar.png',
			isTyping: false,
			messageInput: '',
		},
		{
			id: 1,
			name: 'Евгений',
			avatar: 'public/images/evgenyAvatar.png',
			isTyping: false,
			messageInput: '',
		},
	])

	function sendMessage(userId, messageInput, imgUrl = '', comment = '') {
		const hours =
			new Date().getHours() < 10
				? '0' + new Date().getHours()
				: new Date().getHours()

		const minutes =
			new Date().getMinutes() < 10
				? '0' + new Date().getMinutes()
				: new Date().getMinutes()

		const newMessage = {
			id: messages.value.length + 1,
			userId: userId,
			messageText: comment || users[userId].messageInput,
			messageTime: hours + ':' + minutes,
			imgUrl: imgUrl || '',
		}
		messages.value.push(newMessage)
	}

	function updateTypingStatus(userId, isTyping) {
		const find = users.find(a => a.id == userId)
		if (!find) return
		find.isTyping = isTyping
	}

	return {
		users,
		messages,
		sendMessage,
		updateTypingStatus,
		currentUserId,
	}
})
