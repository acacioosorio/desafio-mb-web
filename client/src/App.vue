<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { storeToRefs } from 'pinia'

import { useUIStore } from '@/stores/';
const uiStore = useUIStore();
const { getToast } = storeToRefs(uiStore);

import Toast from '@/components/ui/toast.vue';

</script>

<template>
	<Toast :show="getToast.show" :message="getToast.message" type="success" />

	<RouterView />
</template>

<style lang="scss" scoped></style>
