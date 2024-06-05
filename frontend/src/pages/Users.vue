<template>
	<div class="">
		<header
			class="sticky top-0 z-10 flex items-center justify-between border-b bg-white px-3 py-2.5 sm:px-5"
		>
			<Breadcrumbs class="h-7" :items="breadcrumbs" />
		</header>
        
		<UserList :courseName="courseName" />
	</div>
</template>
<script setup>
import { createResource, Breadcrumbs } from 'frappe-ui'
import { computed, inject } from 'vue'
import UserList from '@/components/UserList.vue'

const props = defineProps({
	courseName: {
		type: String,
		required: true,
	},
})
const breadcrumbs = computed(() => {
	return [
		{
			label: 'Users',
			route: {
				name: 'Users',
			},
		},
	]
})

</script>
