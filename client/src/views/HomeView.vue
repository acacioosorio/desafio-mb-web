<script setup lang="ts">
import StepsWizard from '@/components/StepsWizard/StepsWizard.vue'

console.log(import.meta.env.MODE)
console.log(import.meta)

</script>

<template>
	<main>

		<div class="image-holder">
			<img src="@/assets/images/crypto-image.svg" alt="">
		</div>

		<div class="forms">
			<StepsWizard />
		</div>

	</main>
</template>

<style lang="scss" scoped>

main {
    max-width: 1200px;
    height: 100vh;
    margin: auto;
    display: flex;
    align-items: center;
	padding: 2rem;
	.image-holder {
		width: 51%;
		padding: 3rem;
	}

	.forms {
		width: 49%;
	}

	@media (max-width: 768px) {
		flex-direction: column-reverse;
		justify-content: center;
		align-items: center;
		
		.image-holder {
            display: none;
        }

        .forms {
            width: 100%;
        }

	}
}
	
</style>
