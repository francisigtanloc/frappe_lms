<template>
	<Dialog
		v-model="show"
		:options="{
			title: __('Add a Student'),
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

				<Link
					label="Student"
					doctype="User"
					v-model="student"
					:filters="{ ignore_user_type: 1}"
				/>
				<Link
					label="Instructor"
					doctype="Course Instructor"
					v-model="instructor"
					:filters="{ parent : props.courseName}"
				/>
			</div>
		</template>
	</Dialog>
</template>
<script setup>
import { Dialog, createResource } from 'frappe-ui'
import { ref } from 'vue'
import Link from '@/components/Controls/Link.vue'

const students = defineModel('reloadStudents')
const student = ref()
const instructor = ref()
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
				doctype: 'LMS Enrollment',
				// parent: props.courseName,
				// parenttype: 'LMS Batch',
				// parentfield: 'students',
				member: student.value,
				course: props.courseName,
				instructor: instructor.value,

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
