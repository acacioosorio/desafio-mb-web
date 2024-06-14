<script setup>
import { ref, computed, watch } from 'vue';

import StepOne from './Steps/StepOne.vue';
import StepTwoJurisdicPerson from './Steps/StepTwoJurisdicPerson.vue';
import StepTwoLegalPerson from './Steps/StepTwoLegalPerson.vue';
import StepThree from './Steps/StepThree.vue';
import StepFour from './Steps/StepFour.vue';
import { useHeightTransition } from '@/composables/useHeightTransition';
import { storeToRefs } from 'pinia'

// Pinia Users Store
import { useUsersStore } from '@/stores/users';
const usersStore = useUsersStore();
const { getsignInStatus } = storeToRefs(usersStore);

// Pinia UI Application Store
import { useUIStore } from '@/stores/';
const uiStore = useUIStore();
const { getToast } = storeToRefs(uiStore);

const { beforeEnter, enter, afterEnter, beforeLeave, leave, afterLeave, adjustHeight } = useHeightTransition();
const step = ref(1);
const form = ref({
	email: '',
	type: '',
	legalPerson: {
		name: '',
		cpf: '',
		birthday: '',
		phone: '',
	},
	jurisdicPerson: {
		name: '',
		cnpj: '',
		openingDate: '',
		phone: '',
	},
	password: '',
});

const isObjectFilled = (obj) => {
	if (obj.length === 0) return false
	for (let key in obj) {
		if (typeof obj[key] === 'object' && obj[key] !== null) {
			if (!isObjectFilled(obj[key])) return false;
		} else {
			if (typeof obj[key] !== 'string' || obj[key].trim() === '') return false;
		}
	}
	return true;
}

const currentStepComponent = computed(() => {
	// console.log("currentStepComponent", form.value)
	switch (step.value) {
		case 1: return StepOne;
		case 2: return form.value.type === "pessoaJuridica" ? StepTwoJurisdicPerson : StepTwoLegalPerson;
		case 3: return StepThree;
		case 4: return StepFour;
	}
});

const formSection = computed(() => {
	switch (step.value) {
		case 1: return { email: form.value.email, type: form.value.type }
		case 2: return form.value.type === "pessoaJuridica" ? form.value.jurisdicPerson : form.value.legalPerson
		case 3: return { password: form.value.password }
		case 4: return form.value
	}
})

const updateFormSection = (newSection) => {
	// console.log("updateFormSection", newSection)
	switch (step.value) {
		case 1:
			form.value.email = newSection.email
			form.value.type = newSection.type
			break
		case 2:
			if (form.value.type === "pessoaJuridica") form.value.jurisdicPerson = newSection
			else form.value.legalPerson = newSection
			break
		case 3:
			console.log("case 3", newSection)
			form.value.password = newSection
			break
		case 4:
			form.value.password = newSection.password
			break
	}
}

const nextStep = () => {
	if (step.value < 4) step.value++;
};

const prevStep = () => {
	if (step.value > 1) step.value--;
};

const handleSubmit = async () => {
	try {
		let data = await usersStore.signInUser(form.value);
		uiStore.showToast(true, data.message, "success", 5000);
		form.value = {
			email: '',
			type: '',
			legalPerson: {
				name: '',
				cpf: '',
				birthday: '',
				phone: '',
			},
			jurisdicPerson: {
				name: '',
				cnpj: '',
				openingDate: '',
				phone: '',
			},
			password: '',
		}
		step.value = 1

	} catch (error) {
		console.log(error)
		uiStore.showToast(true, error.message, "error", 5000);
	}
};

const handleUpate = (data) => {
	console.log(data);
}

const isStep1Blocked = computed(() => {
	return !isObjectFilled({ email: form.value.email, type: form.value.type });
});

const isStep2Blocked = computed(() => {
	return isStep1Blocked.value || (!isObjectFilled(form.value.legalPerson) && !isObjectFilled(form.value.jurisdicPerson));
});

const isStep3Blocked = computed(() => {
	return isStep2Blocked.value || form.value.password.trim() === '';
});

watch(() => form.value.type, () => {
	form.value.legalPerson = {
		name: '',
		cpf: '',
		birthday: '',
		phone: '',
	};
	form.value.jurisdicPerson = {
		name: '',
		cnpj: '',
		openingDate: '',
		phone: '',
	};
});

watch(step, adjustHeight);
</script>

<template>

	<div class="steps-wizard">
		<div class="steps-indicator">
			Etapa <span>{{ step }}</span> de 4

			<ul class="steps-indicator__list">
				<li @click="step = 1" :class="{ 'active': step === 1, 'filled': !isStep1Blocked }">
					<a href="#">
						<span class="number">1.</span>
					</a>
				</li>
				<li @click="!isStep1Blocked ? step = 2 : null"
					:class="{ 'active': step === 2, 'filled': !isStep2Blocked }">
					<a href="#">
						<span class="number">2</span>
					</a>
				</li>
				<li @click="!isStep1Blocked && !isStep2Blocked ? step = 3 : null"
					:class="{ 'active': step === 3, 'filled': !isStep3Blocked }">
					<a href="#">
						<span class="number">3</span>
					</a>
				</li>
				<li @click="!isStep1Blocked && !isStep2Blocked ? step = 4 : null" :class="{ 'active': step === 4 }">
					<a href="#">
						<span class="number">4</span>
					</a>
				</li>
			</ul>

		</div>

		<transition name="height" mode="out-in" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter"
			@before-leave="beforeLeave" @leave="leave" @after-leave="afterLeave">
			<component :is="currentStepComponent" @next="nextStep" @prev="prevStep" @submit="handleSubmit"
				:modelValue="formSection" @update:modelValue="updateFormSection" />
		</transition>

	</div>
</template>

<style lang="scss" scoped>
.height-enter-active,
.height-leave-active {
	transition: height 0.5s ease;
}

.height-enter,
.height-leave-to {
	height: 0;
	overflow: hidden;
}

.steps-wizard {
	background: #fff;
	padding: 65px 75px;
	box-shadow: 0px 0px 20px 5px rgba(0, 0, 0, 0.2);
	height: auto;
	transition: all 0.5s ease;
	overflow: hidden;

	.steps-indicator {
		font-size: .875rem;
		margin-bottom: 1rem;

		&>span {
			color: $yellow;
		}

		&__list {
			display: flex;

			li {
				width: 20%;
				margin-right: 0.5rem;

				&.active {
					a {
						background-color: $yellow;
					}
				}

				&.filled {
					a {
						background-color: #1bbc27;
					}
				}

				a {
					display: inline-block;
					width: 100%;
					height: 7px;
					background: #e6e6e6;
					border-radius: 3.5px;

					&>span {
						display: none;
					}
				}
			}
		}
	}

	@media (max-width: 768px) {
		padding: 32px 37px;
	}
}
</style>