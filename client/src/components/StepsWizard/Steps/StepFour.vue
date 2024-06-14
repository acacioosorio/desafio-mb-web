<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useUsersStore } from '@/stores/users';
const usersStore = useUsersStore();
const { getsignInStatus } = storeToRefs(usersStore);

const props = defineProps(['modelValue'])
const emits = defineEmits(['update:modelValue'])

const localValue = ref({ ...props.modelValue })

</script>

<template>
	<div>

		<h2 class="text-2xl font-bold mb-3">Revise suas informações</h2>

		<div class="mb-3">
			<label for="input-email" class="block mb-2 text-sm text-gray-900">Endereço de Email</label>
			<input id="input-email" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
				disabled v-model="localValue.email">
		</div>

		<template v-if="localValue.type === 'pessoaFisica'">
			<div class="mb-3">
				<label for="input-name" class="block mb-2 text-sm text-gray-900">Nome</label>
				<input id="input-name" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
					disabled v-model="localValue.legalPerson.name">
			</div>

			<div class="mb-3">
				<label for="input-cpf" class="block mb-2 text-sm text-gray-900">CPF</label>
				<input id="input-cpf" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
					disabled v-model="localValue.legalPerson.cpf">
			</div>

			<div class="mb-3">
				<label for="input-phone" class="block mb-2 text-sm text-gray-900">Telefone</label>
				<input id="input-phone" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
					disabled v-model="localValue.legalPerson.phone">
			</div>
		</template>

		<template v-else>
			<div class="mb-3">
				<label for="input-name" class="block mb-2 text-sm text-gray-900">Nome</label>
				<input id="input-name" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
					disabled v-model="localValue.jurisdicPerson.name">
			</div>

			<div class="mb-3">
				<label for="input-cnpj" class="block mb-2 text-sm text-gray-900">Nome</label>
				<input id="input-cnpj" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
					disabled v-model="localValue.jurisdicPerson.cnpj">
			</div>

			<div class="mb-3">
				<label for="input-phone" class="block mb-2 text-sm text-gray-900">Telefone</label>
				<input id="input-phone" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
					disabled v-model="localValue.jurisdicPerson.phone">
			</div>

		</template>

		<div class="mb-3">
			<label for="input-password" class="block mb-2 text-sm text-gray-900">Senha</label>
			<input id="input-password" type="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
				disabled v-model="localValue.password">
		</div>

		<div class="grid grid-cols-2 gap-4">

			<button @click="$emit('prev')" :disabled="getsignInStatus != 'init'"
				class="flex-initial text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none rounded-lg text-sm px-5 py-2.5 text-center">
				Voltar
			</button>

			<button @click="$emit('submit')" :disabled="getsignInStatus != 'init'"
				class="flex-initial text-white bg-yellow hover:bg-yellow-600 disabled:bg-yellow-200 rounded-lg text-sm px-5 py-2.5">
				<span v-if="getsignInStatus === 'init'">Cadastrar</span>
				<span v-else>Salvando <i class="fa-solid fa-spinner fa-spin-pulse"></i></span>
			</button>

		</div>

	</div>
</template>

<style lang="scss" scoped></style>