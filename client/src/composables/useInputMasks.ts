// src/composables/useInputMasks.js
import { ref } from 'vue'

export function useCpfMask(initialValue = '') {
	const cpf = ref(initialValue)

	const applyCpfMask = (event: { target: { value: string } }) => {
		let value = event.target.value.replace(/\D/g, '')

		if (value.length > 11) {
			value = value.slice(0, 11)
		}

		if (value.length > 3) value = value.slice(0, 3) + '.' + value.slice(3)
		if (value.length > 7) value = value.slice(0, 7) + '.' + value.slice(7)
		if (value.length > 11) value = value.slice(0, 11) + '-' + value.slice(11, 13)

		cpf.value = value
	}

	return {
		cpf,
		applyCpfMask
	}
}

export function useDateMask(initialValue = '') {
	const date = ref(initialValue)

	const applyDateMask = (event: { target: { value: string } }) => {
		let value = event.target.value.replace(/\D/g, '')

		if (value.length > 10) {
			value = value.slice(0, 10)
		}

		if (value.length > 2) value = value.slice(0, 2) + '/' + value.slice(2)
		if (value.length > 4) value = value.slice(0, 5) + '/' + value.slice(4)

		date.value = value
	}

	return {
		date,
		applyDateMask
	}
}
