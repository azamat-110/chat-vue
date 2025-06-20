<script setup>
import { useDataStore } from '@/stores/store'

const dataStore = useDataStore()
</script>

<template>
	<div class="modal">
		<div class="modal__content">
			<h2 class="modal__content-title">Отправить картинку</h2>
			<label class="modal__content-input">
				<span>URL</span>
				<input type="text" placeholder="URL" />
			</label>
			<label class="modal__content-input">
				<span>URL</span>
				<input
					aria-label="
			Комментарий к картинке"
					type="text"
					placeholder="Комментарий"
				/>
			</label>
			<div class="modal__buttons">
				<button class="modal__buttons-cancel" @click="dataStore.toggleModal()">
					Отмена
				</button>
				<button
					class="modal__buttons-send"
					@click="dataStore.sendMessage(dataStore.currentUserId)"
				>
					Отправить
				</button>
			</div>
		</div>
	</div>
</template>

<style scoped src="@/assets/style/sendImageModal.scss"></style>
