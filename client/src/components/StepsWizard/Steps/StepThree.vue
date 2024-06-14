<script setup>
import { ref, watch, computed, reactive } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, email, helpers } from '@vuelidate/validators'

const props = defineProps(['modelValue'])
const emits = defineEmits(['update:modelValue'])

const localValue = ref({ ...props.modelValue })

const minLength = helpers.withMessage(
	'A senha deve ter pelo menos 8 caracteres.',
	(value) => value && value.length >= 8
)
const hasUppercase = helpers.withMessage(
	'A senha deve conter pelo menos 1 letra maiúscula.',
	(value) => /[A-Z]/.test(value)
)
const hasSpecialChar = helpers.withMessage(
	'A senha deve conter pelo menos 1 caractere especial.',
	(value) => /[!@#$%^&*(),.?":{}|<>]/.test(value)
)
const hasNumber = helpers.withMessage(
	'A senha deve conter pelo menos 1 numero.',
	(value) => /[0-9]/.test(value)
)

watch(localValue, (newVal) => {
	// console.log("watch localValue")
	emits('update:modelValue', newVal.password)
}, { deep: true })

const rules = {
	localValue: {
		password: {
			required: helpers.withMessage('Este campo é obrigatório', required),
			minLength,
			hasUppercase,
			hasSpecialChar,
			hasNumber
		},
	}
}

const v$ = useVuelidate(rules, { localValue })

</script>

<template>
	<div>

		<h2 class="text-2xl font-bold mb-3">Senha de Acesso</h2>

		<div class="mb-3">
			<label for="input-password" class="block mb-2 text-sm text-gray-900">Sua senha</label>
			<input id="input-password" type="password" @focus="v$.localValue.password.$touch"
				:class="{ 'outline outline-offset-1 outline-red-300': v$.localValue.password.$errors.length }"
				class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
				autocomplete="off" v-model="localValue.password" placeholder="Digite a sua senha">
		</div>

		<div v-if="v$.localValue.password.$dirty && v$.localValue.password.$invalid"
			class="p-4 mt-2 mb-3 text-sm text-red-800 rounded-lg bg-red-50">
			<p v-for="error in v$.localValue.password.$errors" :key="error.$uid">
				<strong>•</strong> {{ error.$message }}
			</p>
		</div>

		<div class="grid grid-cols-2 gap-4">

			<button @click="$emit('prev')"
				class="flex-initial text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none rounded-lg text-sm px-5 py-2.5 text-center">
				Voltar
			</button>

			<button @click="$emit('next')" :disabled="v$.localValue.$invalid"
				class="flex-initial text-white bg-yellow hover:bg-yellow-600 disabled:bg-gray-200 rounded-lg text-sm px-5 py-2.5">Continuar</button>

		</div>

	</div>
</template>

<style lang="scss" scoped></style>