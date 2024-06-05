<template>
	<Dialog
		v-model="show"
		:options="{
			title: __('Add a User'),
			size: 'sm',
			actions: [
				{
					label: 'Submit',
					variant: 'solid',
					onClick: (close) => addStudent(close),
				},
			],
		}"
	>
		<template #body-content>
			<div class="flex flex-col gap-4">
                <TextInput
                    label="Email"
                    type="text"
                    placeholder="Email"
                    v-model="email"
                    :debounce="300"
                    class="flex-1"
                />
                <TextInput
                    label="First Name"
                    type="text"
                    placeholder="First Name"
                    v-model="first_name"
                    :debounce="300"
                    class="flex-1"
                />
				
			</div>
		</template>
	</Dialog>
</template>
<script setup>
import { TextInput, Dialog, createResource } from 'frappe-ui'
import { ref } from 'vue'
import Link from '@/components/Controls/Link.vue'

const students = defineModel('reloadStudents')
const email = ref()
const first_name = ref()
const show = defineModel()

const props = defineProps({
	courseName: {
		type: String,
		default: null,
	},
})

const studentResource = createResource({
	url: 'frappe.client.insert',
	makeParams(values) {
		return {
			doc: {
				doctype: 'User',
				// parent: props.courseName,
				// parenttype: 'LMS Batch',
				// parentfield: 'students',
				first_name: first_name.value,
				email: email.value,
			},
		}
	},
})

const addStudent = (close) => {
	studentResource.submit(
		{},
		{
			onSuccess() {
				students.value.reload()
				instructor.value.reload()
				close()
				student.value = null
				instructor.value = null
			},
		}
	)
}
</script>
