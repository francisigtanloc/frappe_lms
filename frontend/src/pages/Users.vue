<template>
	<LayoutHeader v-if="user.data">
		<template #left-header>
			<Breadcrumbs :items="breadcrumbs" />
		</template>
	</LayoutHeader>
	<div v-if="user.data" class="flex h-full flex-col overflow-hidden">
		<FileUploader @success="changeUserImage" :validateFile="validateFile">
			<template #default="{ openFileSelector, error }">
				<div class="flex items-start justify-start gap-6 p-5 sm:items-center">
					<div class="group relative h-24 w-24">
						<Avatar
							size="3xl"
							class="h-24 w-24"
							:label="user.data.full_name"
							:image="user.data.image"
						/>
						<component
							:is="user.data.image ? Dropdown : 'div'"
							v-bind="user.data.image
								? {
										options: [
											{
												icon: 'upload',
												label: user.data.image
													? __('Change image')
													: __('Upload image'),
												onClick: openFileSelector,
											},
											{
												icon: 'trash-2',
												label: __('Remove image'),
												onClick: () => changeUserImage(''),
											},
										],
								  }
								: { onClick: openFileSelector }"
							class="!absolute bottom-0 left-0 right-0"
						>
							<div
								class="z-1 absolute bottom-0 left-0 right-0 flex h-14 cursor-pointer items-center justify-center rounded-b-full bg-black bg-opacity-40 pt-3 opacity-0 duration-300 ease-in-out group-hover:opacity-100"
								style="-webkit-clip-path: inset(12px 0 0 0); clip-path: inset(12px 0 0 0);"
							>
								<CameraIcon class="h-6 w-6 cursor-pointer text-white" />
							</div>
						</component>
					</div>
					<div class="flex flex-col gap-2 truncate sm:gap-0.5">
						<div class="truncate text-3xl font-semibold">
							<span v-if="user.data.salutation">
								{{ user.data.salutation + '. ' }}
							</span>
							<span>{{ user.data.full_name }}</span>
						</div>
						<div class="flex flex-col flex-wrap gap-3 text-base text-gray-700 sm:flex-row sm:items-center sm:gap-2">
							<div v-if="user.data.email_id" class="flex items-center gap-1.5">
								<EmailIcon class="h-4 w-4" />
								<span>{{ user.data.email_id }}</span>
							</div>
							<span v-if="user.data.email_id" class="hidden text-3xl leading-[0] text-gray-600 sm:flex">
								&middot;
							</span>
							<component :is="callEnabled ? Tooltip : 'div'" :text="__('Make Call')" v-if="user.data.actual_mobile_no">
								<div class="flex items-center gap-1.5" :class="callEnabled ? 'cursor-pointer' : ''" @click="callEnabled && makeCall(user.data.actual_mobile_no)">
									<PhoneIcon class="h-4 w-4" />
									<span>{{ user.data.actual_mobile_no }}</span>
								</div>
							</component>
							<span v-if="user.data.actual_mobile_no" class="hidden text-3xl leading-[0] text-gray-600 sm:flex">
								&middot;
							</span>
							<div v-if="user.data.company_name" class="flex items-center gap-1.5">
								<Avatar size="xs" :label="user.data.company_name" :image="getOrganization(user.data.company_name)?.organization_logo" />
								<span>{{ user.data.company_name }}</span>
							</div>
							<span v-if="user.data.company_name" class="hidden text-3xl leading-[0] text-gray-600 sm:flex">
								&middot;
							</span>
							<Button
								v-if="user.data.email_id || user.data.mobile_no || user.data.company_name"
								variant="ghost"
								:label="__('More')"
								class="w-fit cursor-pointer hover:text-gray-900 sm:-ml-1"
								@click="() => {
									detailMode = true
									showUserModal = true
								}"
							/>
						</div>
						<div class="mt-2 flex gap-1.5">
							<Button :label="__('Edit')" size="sm" @click="() => {
								detailMode = false
								showUserModal = true
							}">
								<template #prefix>
									<EditIcon class="h-4 w-4" />
								</template>
							</Button>
							<Button :label="__('Delete')" theme="red" size="sm" @click="deleteUser">
								<template #prefix>
									<FeatherIcon name="trash-2" class="h-4 w-4" />
								</template>
							</Button>
						</div>
						<ErrorMessage :message="__(error)" />
					</div>
				</div>
			</template>
		</FileUploader>
		<Tabs class="overflow-hidden" v-model="tabIndex" :tabs="tabs">
			<template #tab="{ tab, selected }">
				<button
					class="group flex items-center gap-2 border-b border-transparent py-2.5 text-base text-gray-600 duration-300 ease-in-out hover:border-gray-400 hover:text-gray-900"
					:class="{ 'text-gray-900': selected }"
				>
					<component v-if="tab.icon" :is="tab.icon" class="h-5" />
					{{ __(tab.label) }}
					<Badge class="group-hover:bg-gray-900" :class="[selected ? 'bg-gray-900' : 'bg-gray-600']" variant="solid" theme="gray" size="sm">
						{{ tab.count }}
					</Badge>
				</button>
			</template>
			<template #default="{ tab }">
				<div v-if="!rows.length" class="grid flex-1 place-items-center text-xl font-medium text-gray-500">
					<div class="flex flex-col items-center justify-center space-y-3">
						<component :is="tab.icon" class="!h-10 !w-10" />
						<div>{{ __('No {0} Found', [__(tab.label)]) }}</div>
					</div>
				</div>
			</template>
		</Tabs>
	</div>
	<UserModal v-model="showUserModal" :user="user" :options="{ detailMode }" />
</template>
<script setup>
import {
	Breadcrumbs,
	Avatar,
	FileUploader,
	Tooltip,
	Tabs,
	call,
	createResource,
} from 'frappe-ui'
import Dropdown from '@/components/frappe-ui/Dropdown.vue'
import LayoutHeader from '@/components/LayoutHeader.vue'
import EmailIcon from '@/components/Icons/EmailIcon.vue'
import PhoneIcon from '@/components/Icons/PhoneIcon.vue'
import EditIcon from '@/components/Icons/EditIcon.vue'
import CameraIcon from '@/components/Icons/CameraIcon.vue'
import DealsIcon from '@/components/Icons/DealsIcon.vue'
import UserModal from '@/components/Modals/UserModal.vue'
import {
	dateFormat,
	dateTooltipFormat,
	timeAgo,
} from '@/utils'
import { globalStore } from '@/stores/global.js'
import { usersStore } from '@/stores/users.js'
import { organizationsStore } from '@/stores/organizations.js'
import { callEnabled } from '@/composables/settings'
import { ref, computed, h } from 'vue'
import { useRouter } from 'vue-router'

const { $dialog, makeCall } = globalStore()
const { getUser } = usersStore()
const { getOrganization } = organizationsStore()

const props = defineProps({
	userId: {
		type: String,
		required: true,
	},
})

const router = useRouter()

const showUserModal = ref(false)
const detailMode = ref(false)

const breadcrumbs = computed(() => {
	let items = [{ label: __('Users'), route: { name: 'Users' } }]
	items.push({
		label: user.data?.full_name,
		route: { name: 'User', params: { userId: props.userId } },
	})
	return items
})

function validateFile(file) {
	let extn = file.name.split('.').pop().toLowerCase()
	if (!['png', 'jpg', 'jpeg'].includes(extn)) {
		return __('Only PNG and JPG images are allowed')
	}
}

async function changeUserImage(file) {
	await call('frappe.client.set_value', {
		doctype: 'User',
		name: props.userId,
		fieldname: 'image',
		value: file?.file_url || '',
	})
	user.reload()
}

async function deleteUser() {
	$dialog({
		title: __('Delete user'),
		message: __('Are you sure you want to delete this user?'),
		actions: [
			{
				label: __('Delete'),
				theme: 'red',
				variant: 'solid',
				async onClick(close) {
					await call('frappe.client.delete', {
						doctype: 'User',
						name: props.userId,
					})
					close()
					router.push({ name: 'Users' })
				},
			},
		],
	})
}

const tabIndex = ref(0)
const tabs = [
	{
		label: 'Activities',
		icon: h(DealsIcon, { class: 'h-4 w-4' }),
		count: computed(() => activities.data?.length),
	},
]

const user = createResource({
	url: 'lms.api.user.get_user',
	cache: ['user', props.userId],
	params: {
		name: props.userId,
	},
	auto: true,
	transform: (data) => {
		return {
			...data,
			actual_mobile_no: data.mobile_no,
			mobile_no: data.mobile_no,
		}
	},
})

const activities = createResource({
	url: 'lms.api.user.get_linked_activities',
	cache: ['activities', props.userId],
	params: {
		user: props.userId,
	},
	auto: true,
})

const rows = computed(() => {
	if (!activities.data || activities.data == []) return []
	return activities.data.map((row) => getActivityRowObject(row))
})

const columns = computed(() => activityColumns)

function getActivityRowObject(activity) {
	return {
		name: activity.name,
		organization: {
			label: activity.organization,
			logo: getOrganization(activity.organization)?.organization_logo,
		},
		status: {
			label: activity.status,
			color: getActivityStatus(activity.status)?.iconColorClass,
		},
		email: activity.email,
		mobile_no: activity.mobile_no,
		activity_owner: {
			label: activity.activity_owner && getUser(activity.activity_owner).full_name,
			...(activity.activity_owner && getUser(activity.activity_owner)),
		},
		modified: {
			label: dateFormat(activity.modified, dateTooltipFormat),
			timeAgo: __(timeAgo(activity.modified)),
		},
	}
}

const activityColumns = [
	{
		label: __('Organization'),
		key: 'organization',
		width: '11rem',
	},
	{
		label: __('Status'),
		key: 'status',
		width: '10rem',
	},
	{
		label: __('Email'),
		key: 'email',
		width: '12rem',
	},
	{
		label: __('Mobile no'),
		key: 'mobile_no',
		width: '11rem',
	},
	{
		label: __('Activity owner'),
		key: 'activity_owner',
		width: '10rem',
	},
	{
		label: __('Last modified'),
		key: 'modified',
		width: '8rem',
	},
]
</script>
<style scoped>
:deep(.form-control input),
:deep(.form-control select),
:deep(.form-control button) {
	border-color: transparent;
	background: white;
}

:deep(.form-control button) {
	gap: 0;
}

:deep(.form-control button > div) {
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

:deep(.form-control button svg) {
	color: white;
	width: 0;
}

:deep(:has(> .dropdown-button)) {
	width: 100%;
}

:deep(.dropdown-button > button > span) {
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
</style>

