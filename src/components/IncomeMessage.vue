<script setup>
const defineProps = defineProps({
	messageData: {
		type: Object,
		required: true,
	},
	userId: {
		type: Number,
		required: true,
	},
})
</script>

<template>
	<div class="send-message" :class="messageData.userId === userId ? 'end' : ''">
		<div v-if="messageData.userId === userId" class="message-time">
			{{ messageData.messageTime }}
		</div>
		<div
			class="message-text"
			:class="
				messageData.userId === userId ? 'outcome-message' : 'income-message'
			"
		>
			<img v-if="messageData.imgUrl" :src="messageData.imgUrl" alt="img" />
			<p :class="messageData.imgUrl ? 'with-img' : 'without-img'">
				{{ messageData.messageText }}
			</p>
		</div>
		<div v-if="messageData.userId !== userId" class="message-time">
			{{ messageData.messageTime }}
		</div>
	</div>
</template>

<style></style>
