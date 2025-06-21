<script setup>
import { useDataStore } from '@/stores/store'

const dataStore = useDataStore()

const props = defineProps({
	userId: {
		type: Number,
		required: true,
	},
})

const emit = defineEmits(['toggleModal'])

function sendModalData() {}
</script>

<template>
	<div class="modal">
		<form class="modal__content">
			<h2 class="modal__content-title">Отправить картинку</h2>
			<label class="modal__content-input">
				<span>URL</span>
				<input type="text" placeholder="URL" v-model="imgUrl" required />
			</label>
			<label class="modal__content-input">
				<span>URL</span>
				<input v-model="comment" type="text" placeholder="Комментарий" />
			</label>
			<div class="modal__buttons">
				<button class="modal__buttons-cancel" @click="emit('toggleModal')">
					Отмена
				</button>
				<button
					type="submit"
					class="modal__buttons-send"
					@click="
						() => {
							dataStore.sendMessage(userId, imgUrl, comment)
							emit('toggleModal')
						}
					"
				>
					Отправить
				</button>
			</div>
		</form>
	</div>
</template>

<style></style>
