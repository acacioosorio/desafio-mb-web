<script setup>
import { ref, computed, watch } from 'vue';

const emit = defineEmits(['update:show']);

const props = defineProps({
	show: {
		type: Boolean,
		default: false
	},
	message: {
		type: String,
		default: ''
	},
	type: {
		type: String,
		default: 'primary',
		validator: value => ['success', 'warning', 'danger', 'primary'].includes(value)
	}
});

const toastClasses = computed(() => {
	switch (props.type) {
		case 'success':
			return 'bg-green-100 text-green-800';
		case 'warning':
			return 'bg-yellow-100 text-yellow-800';
		case 'danger':
			return 'bg-red-100 text-red-800';
		case 'primary':
			return 'bg-blue-100 text-blue-800';
		default:
			return 'bg-gray-100 text-gray-800';
	}
});

watch(
	() => props.show,
	(newVal) => {
		if (newVal) {
			setTimeout(() => {
				emit('update:show', false);
			}, 500);
		}
	}
);

// watch(() => show, (newVal) => {
// 	console.log("newVal")
// 	if (newVal) {
// 		setTimeout(() => {
// 			show = false
// 			emit('update:show', false);
// 		}, 1000)
// 	}
// })

</script>

<template lang="">
    <transition>
		<div v-if="props.show" class="fixed flex items-center w-full max-w-xs p-4 space-x-4 rounded-lg shadow top-5 right-5" :class="toastClasses">
			<div class="text-sm font-normal">{{ props.message }}</div>
		</div>
	</transition>
</template>

<style lang="scss" scoped>
.v-enter-active,
.v-leave-active {
	transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
	opacity: 0;
}
</style>