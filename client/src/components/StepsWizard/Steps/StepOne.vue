<script setup>
import { ref, watch, computed } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'

const props = defineProps(['modelValue'])
const emits = defineEmits(['update:modelValue'])

const localValue = ref({ ...props.modelValue })

const rules = {
	localValue: {
		email: { required, email },
		type: { required }
	}
}

const v$ = useVuelidate(rules, { localValue })

watch(localValue, (newVal) => {
	emits('update:modelValue', newVal)
}, { deep: true })

</script>

<template>
	<div>

		<h2 class="text-2xl font-bold mb-3">Seja bem vindo(a)</h2> 

		<div class="mb-3">
			<label for="email-address-icon" class="block mb-2 text-sm text-gray-900">Endereço de e-mail</label>
			<div class="relative">
				<div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">

					<i class="fa-solid fa-envelope w-5 h-5 text-gray-400"></i>

				</div>
				<input type="email" @focus="v$.localValue.email.$touch"
					class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full ps-10 p-2.5"
					v-model="localValue.email" placeholder="nome@email.com.br">
			</div>

			<div v-if="v$.localValue.email.$dirty && v$.localValue.email.$invalid" class="p-4 mt-2 text-sm text-red-800 rounded-lg bg-red-50">
				<p v-for="error in v$.localValue.email.$errors" :key="error.$uid">
					{{ error.$message }}
				</p>
			</div>

		</div>

		<div class="flex mb-3">
			<div class="flex items-center me-4">
				<input id="inline-2-radio" v-model="localValue.type" type="radio" value="pessoaFisica"
					name="inline-radio-group"
					class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500">
				<label for="inline-2-radio" class="ms-2 text-sm text-gray-500"> Pessoa Física</label>
			</div>
			<div class="flex items-center me-4">
				<input id="inline-2-radio" v-model="localValue.type" type="radio" value="pessoaJuridica"
					name="inline-radio-group"
					class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500">
				<label for="inline-2-radio" class="ms-2 text-sm text-gray-500">Pessoa jurídica</label>
			</div>
		</div>

		<div v-if="v$.localValue.type.$dirty && v$.localValue.type.$invalid" class="p-4 mt-2 text-sm text-red-800 rounded-lg bg-red-50">
			<p v-for="error in v$.localValue.type.$errors" :key="error.$uid">
				{{ error.$message }}
			</p>
		</div>

		<button @click="$emit('next')" :disabled="v$.localValue.$invalid"
			class="w-full text-white bg-yellow hover:bg-yellow-600 disabled:bg-gray-200 rounded-lg text-sm px-5 py-2.5">Continuar</button>

	</div>
</template>

<style lang="scss" scoped></style>