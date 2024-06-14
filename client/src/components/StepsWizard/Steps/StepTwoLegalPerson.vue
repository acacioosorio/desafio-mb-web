<script setup>
import { ref, watch, reactive, computed } from 'vue'
import { useCpfMask, useDateMask } from '@/composables/useInputMasks'
import { vMaska } from "maska/vue"
import { useVuelidate } from '@vuelidate/core'
import { required, email, helpers, minLength } from '@vuelidate/validators'
import moment from 'moment';

const phoneMask = reactive({
	mask: (value) => value.length > 18 ? '+55 (##) #####-####' : '+55 (##) ####-####',
	eager: true
})

const props = defineProps(['modelValue'])
const emits = defineEmits(['update:modelValue'])

const localValue = ref({ ...props.modelValue })

const cpfValidator = helpers.withMessage('Formato do CPF é invalido', helpers.regex(/([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/));
const validDateFormat = (value) => moment(value, 'DD/MM/YYYY', true).isValid();

watch(localValue, (newVal) => {
	// console.log("watch localValue")
	emits('update:modelValue', newVal)
}, { deep: true })

const rules = {
	localValue: {
		name: {
			required: helpers.withMessage('Nome é obrigatório', required),
			minLength: helpers.withMessage('Necessário pelo menos 4 caracteres', minLength(4))
		},
		cpf: {
			required: helpers.withMessage('CPF is required', required),
			cpfValidator: cpfValidator
		},
		birthday: {
			required: helpers.withMessage('Este campo é obrigatório', required),
			validDateFormat: helpers.withMessage('Data invalida', validDateFormat),
		},
		phone: { required: helpers.withMessage('Este campo é obrigatório', required) },
	}
}

const v$ = useVuelidate(rules, { localValue })

</script>

<template>
	<div>

		<h2 class="text-2xl font-bold mb-3">Pessoa Física</h2>

		<div class="mb-3">
			<label for="input-name" class="block mb-2 text-sm text-gray-900">Nome</label>
			<input id="input-name" type="text" @focus="v$.localValue.name.$touch"
				:class="{ 'outline outline-offset-1 outline-red-300': v$.localValue.name.$errors.length }"
				class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
				autocomplete="off" v-model="localValue.name" placeholder="Digite seu nome completo.">
		</div>

		<div v-if="v$.localValue.name.$dirty && v$.localValue.name.$invalid"
			class="p-4 mt-2 mb-3 text-sm text-red-800 rounded-lg bg-red-50">
			<p v-for="error in v$.localValue.name.$errors" :key="error.$uid">
				<strong>•</strong> {{ error.$message }}
			</p>
		</div>

		<div class="mb-3">
			<label for="input-cpf" class="block mb-2 text-sm text-gray-900">CPF</label>
			<input id="input-cpf" type="text" v-maska="'###.###.###-##'" @focus="v$.localValue.cpf.$touch"
				:class="{ 'outline outline-offset-1 outline-red-300': v$.localValue.cpf.$errors.length }"
				class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
				autocomplete="off" v-model="localValue.cpf" placeholder="Digite seu CPF, apenas números.">
		</div>

		<div v-if="v$.localValue.cpf.$dirty && v$.localValue.cpf.$invalid"
			class="p-4 mt-2 mb-3 text-sm text-red-800 rounded-lg bg-red-50">
			<p v-for="error in v$.localValue.cpf.$errors" :key="error.$uid">
				{{ error.$message }}
			</p>
		</div>

		<div class="mb-3">
			<label for="input-birthday" class="block mb-2 text-sm text-gray-900">Data de Nascimento</label>
			<input id="input-birthday" type="text" v-maska="'##/##/####'" @focus="v$.localValue.birthday.$touch"
				:class="{ 'outline outline-offset-1 outline-red-300': v$.localValue.birthday.$errors.length }"
				class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
				autocomplete="off" v-model="localValue.birthday"
				placeholder="Digite sua data de nascimento, apenas números.">
		</div>

		<div v-if="v$.localValue.birthday.$dirty && v$.localValue.birthday.$invalid"
			class="p-4 mt-2 mb-3 text-sm text-red-800 rounded-lg bg-red-50">
			<p v-for="error in v$.localValue.birthday.$errors" :key="error.$uid">
				<strong>•</strong> {{ error.$message }}
			</p>
		</div>

		<div class="mb-3">
			<label for="name-phone" class="block mb-2 text-sm text-gray-900">Telefone</label>
			<input id="name-cpf" type="text" v-maska="phoneMask" @focus="v$.localValue.phone.$touch"
				:class="{ 'outline outline-offset-1 outline-red-300': v$.localValue.phone.$errors.length }"
				class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
				autocomplete="off" v-model="localValue.phone" placeholder="Digite seu telefone, apenas números.">
		</div>

		<div v-if="v$.localValue.phone.$dirty && v$.localValue.phone.$invalid"
			class="p-4 mt-2 mb-3 text-sm text-red-800 rounded-lg bg-red-50">
			<p v-for="error in v$.localValue.phone.$errors" :key="error.$uid">
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