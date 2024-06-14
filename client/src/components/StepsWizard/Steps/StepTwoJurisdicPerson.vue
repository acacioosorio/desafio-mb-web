<script setup>
import { ref, watch, computed, reactive } from 'vue'
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

watch(localValue, (newVal) => {
	// console.log("watch localValue")
	emits('update:modelValue', newVal)
}, { deep: true })

const cnpjValidator = helpers.withMessage('Formato do CNPJ é invalido', helpers.regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/));
const validDateFormat = (value) => moment(value, 'DD/MM/YYYY', true).isValid();

const rules = {
	localValue: {
		name: {
			required: helpers.withMessage('Nome é obrigatório', required),
			minLength: helpers.withMessage('Necessário pelo menos 4 caracteres', minLength(4))
		},
		cnpj: {
			required: helpers.withMessage('CNPJ is required', required),
			cnpjValidator: cnpjValidator
		},
		openingDate: {
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

		<!-- <pre class="debug" style="left: auto; right: 0; overflow: scroll;">
			{{ v$.localValue.openingDate }}
		</pre> -->

		<h2 class="text-2xl font-bold mb-3">Pessoa Jurídica</h2>

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
			<label for="input-cnpj" class="block mb-2 text-sm text-gray-900">CNPJ</label>
			<input id="input-cnpj" type="text" v-maska="'##.###.###/####-##'" @focus="v$.localValue.cnpj.$touch"
				:class="{ 'outline outline-offset-1 outline-red-300': v$.localValue.cnpj.$errors.length }"
				class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
				autocomplete="off" v-model="localValue.cnpj" placeholder="Digite seu CNPJ, apenas números.">
		</div>

		<div v-if="v$.localValue.cnpj.$dirty && v$.localValue.cnpj.$invalid"
			class="p-4 mt-2 mb-3 text-sm text-red-800 rounded-lg bg-red-50">
			<p v-for="error in v$.localValue.cnpj.$errors" :key="error.$uid">
				{{ error.$message }}
			</p>
		</div>

		<div class="mb-3">
			<label for="input-openingDate" class="block mb-2 text-sm text-gray-900">Data de Abertura</label>
			<input id="input-openingDate" type="text" v-maska="'##/##/####'" @focus="v$.localValue.openingDate.$touch"
				:class="{ 'outline outline-offset-1 outline-red-300': v$.localValue.openingDate.$errors.length }"
				class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
				autocomplete="off" v-model="localValue.openingDate"
				placeholder="Digite sua data de nascimento, apenas números.">
		</div>

		<div v-if="v$.localValue.openingDate.$dirty && v$.localValue.openingDate.$invalid"
			class="p-4 mt-2 mb-3 text-sm text-red-800 rounded-lg bg-red-50">
			<p v-for="error in v$.localValue.openingDate.$errors" :key="error.$uid">
				<strong>•</strong> {{ error.$message }}
			</p>
		</div>

		<div class="mb-3">
			<label for="input-phone" class="block mb-2 text-sm text-gray-900">Telefone</label>
			<input id="input-cpf" type="text" v-maska="phoneMask" @focus="v$.localValue.phone.$touch"
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