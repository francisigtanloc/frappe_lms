<template>


        <Button class="float-right mb-3" variant="solid" @click="openUserModal()">
            <template #prefix>
                <Plus class="h-4 w-4" />
            </template>
            {{ __('Add User') }}
        </Button>
        <div class="text-lg font-semibold mb-4">
            {{ __('Users') }}
        </div>
        <div v-if="users.data?.length">
            <ListView
                :columns="getStudentColumns()"
                :rows="users.data"
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
                    <ListRow :row="row" v-for="row in users.data">
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
            {{ __('There are no users added. Please add more users.') }}
        </div>
	<UserModal
		:courseName=courseName
		v-model="showUserModal"
		v-model:reloadStudents="users"
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
import UserModal from '@/components/Modals/UserModal.vue'

const showUserModal = ref(false)


const users = createResource({
	url: 'lms.lms.utils.get_users',
	cache: ['user', '0'],
	params: {
		user: '0',
	},
	auto: true,
})
console.log(users)
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
			label: 'Creation',
			key: 'creation',
			align: 'center',
		},
		{
			label: 'Role Profile Name',
			key: 'role_profile_name',
			align: 'center',
		},
		{
			label: 'Last Active',
			key: 'last_active',
		},
	]
}

const openUserModal = () => {
	showUserModal.value = true
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
		users.reload()
		unselectAll()
	}, 500)
}
</script>
