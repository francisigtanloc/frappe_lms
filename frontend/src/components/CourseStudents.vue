<template>
	<Button class="float-right mb-3" variant="solid" @click="openStudentModal()">
		<template #prefix>
			<Plus class="h-4 w-4" />
		</template>
		{{ __('Add Student') }}
	</Button>
	<div class="text-lg font-semibold mb-4">
		{{ __('Students') }}
	</div>
	<div v-if="students.data?.length">
		<ListView
			:columns="getStudentColumns()"
			:rows="students.data"
			row-key="name"
			:options="{ showTooltip: false }"
		>
			<ListHeader
				class="mb-2 grid items-center space-x-4 rounded bg-gray-100 p-2"
			>
				<ListHeaderItem :item="item" v-for="item in getStudentColumns()">
					<template #prefix="{ item }">
						<component
							v-if="item.icon"
							:is="item.icon"
							class="h-4 w-4 stroke-1.5 ml-4"
						/>
					</template>
				</ListHeaderItem>
			</ListHeader>
			<ListRows>
				<ListRow :row="row" v-for="row in students.data">
					<template #default="{ column, item }">
						<ListRowItem :item="row[column.key]" :align="column.align">
							<template #prefix>
								<div v-if="column.key == 'full_name'">
									<Avatar
										class="flex items-center"
										:image="row['user_image']"
										:label="item"
										size="sm"
									/>
								</div>
							</template>
							<div>
								{{ row[column.key] }}
							</div>
						</ListRowItem>
					</template>
				</ListRow>
			</ListRows>
			<ListSelectBanner>
				<template #actions="{ unselectAll, selections }">
					<div class="flex gap-2">
						<Button
							variant="ghost"
							@click="removeStudents(selections, unselectAll)"
						>
							<Trash2 class="h-4 w-4 stroke-1.5" />
						</Button>
					</div>
				</template>
			</ListSelectBanner>
		</ListView>
	</div>
	<div v-else class="text-sm italic text-gray-600">
		{{ __('There are no students in this Course.') }}
	</div>
	<StudentModal
		:courseName=courseName
		v-model="showStudentModal"
		v-model:reloadStudents="students"
	/>
</template>
<script setup>
import {
	createResource,
	ListHeader,
	ListHeaderItem,
	ListSelectBanner,
	ListRow,
	ListRows,
	ListView,
	ListRowItem,
	Avatar,
	Button,
} from 'frappe-ui'
import { Trash2, Plus } from 'lucide-vue-next'
import { ref } from 'vue'
import StudentModal from '@/components/Modals/StudentModal.vue'

const showStudentModal = ref(false)

const props = defineProps({
	courseName: {
		type: String,
		default: null,
	},
})
// const students = {data: [
//         { full_name: 'John', email: 'john@example.com', quiz_completed: "1", assessments_completed: '2',last_login: "2024-02-04" },
//         { full_name: 'Alice', email: 'alice@example.com', quiz_completed: "2", assessments_completed: '2',last_login: "2024-06-01" },
//         { full_name: 'Bob', email: 'bob@example.com', quiz_completed: "3", assessments_completed: '1',last_login: "2024-03-24" }
//       ]};
const students = createResource({
	url: 'lms.lms.utils.get_course_students',
	cache: ['students', props.courseName],
	params: {
		course: props.courseName,
	},
	auto: true,
})
console.log(students)
const getStudentColumns = () => {
	return [
		{
			label: 'Full Name',
			key: 'full_name',
			width: 2,
		},
        {
			label: 'Email',
			key: 'email',
			align: 'center',
		},
		{
			label: 'Quiz Completed',
			key: 'quiz_completed',
			align: 'center',
		},
		{
			label: 'Instructor',
			key: 'instructor',
			align: 'center',
		},
		{
			label: 'Last Login',
			key: 'last_login',
		},
	]
}

const openStudentModal = () => {
	showStudentModal.value = true
}

const removeStudent = createResource({
	url: 'frappe.client.delete',
	makeParams(values) {
		return {
			doctype: 'Batch Student',
			name: values.student,
		}
	},
})

const removeStudents = (selections, unselectAll) => {
	selections.forEach(async (student) => {
		removeStudent.submit({ student })
	})
	setTimeout(() => {
		students.reload()
		unselectAll()
	}, 500)
}
</script>
