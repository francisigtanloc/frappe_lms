<template>
	<div v-if="user.data?.is_moderator || isStudent" class="">
		<header
			class="sticky top-0 z-10 flex items-center justify-between border-b bg-white px-3 py-2.5 sm:px-5"
		>
			<Breadcrumbs class="h-7" :items="breadcrumbs" />
            <Button v-if="user.data?.is_moderator" @click="openAnnouncementModal()">
				<span>
					{{ __('Make an Announcement') }}
				</span>
				<template #suffix>
					<SendIcon class="h-4 stroke-1.5" />
				</template>
			</Button>
			
		</header>
        <div class="grid grid-cols-[70%,30%] h-screen">
			<div class="border-r-2">
				<Tabs v-model="tabIndex" :tabs="tabs" tablistClass="overflow-x-visible">
					<template #tab="{ tab, selected }" class="overflow-x-hidden">
						<div>
							<button
								class="group -mb-px flex items-center gap-1 border-b border-transparent py-2.5 text-base text-gray-600 duration-300 ease-in-out hover:border-gray-400 hover:text-gray-900"
								:class="{ 'text-gray-900': selected }"
							>
								<component
									v-if="tab.icon"
									:is="tab.icon"
									class="h-4 stroke-1.5"
								/>
								{{ __(tab.label) }}
								<Badge
									v-if="tab.count"
									:class="{
										'text-gray-900 border border-gray-900': selected,
									}"
									variant="subtle"
									theme="gray"
									size="sm"
								>
									{{ tab.count }}
								</Badge>
							</button>
						</div>
					</template>
					<template #default="{ tab }">
						<div class="pt-5 px-10 pb-10">
							<div v-if="tab.label == 'Courses'">
								<BatchCourses :batch="batch.data.name" />
							</div>
							<div v-else-if="tab.label == 'Dashboard'">
								<BatchDashboard :batch="batch" :isStudent="isStudent" />
							</div>
							<div v-else-if="tab.label == 'Live Class'">
								<LiveClass :batch="batch.data.name" />
							</div>
							<div v-else-if="tab.label == 'Students'">
								<courseStudents :batch="courseName" />
							</div>
							<div v-else-if="tab.label == 'Assessments'">
								<Assessments :batch="batch.data.name" />
							</div>
							<div v-else-if="tab.label == 'Announcements'">
								<Announcements :batch="batch.data.name" />
							</div>
							<div v-else-if="tab.label == 'Discussions'">
								<Discussions
									doctype="LMS Batch"
									:docname="batch.data.name"
									title="Discussions"
									:key="batch.data.name"
									:singleThread="true"
								/>
							</div>
						</div>
					</template>
				</Tabs>
			</div>
			
			<AnnouncementModal
				v-model="showAnnouncementModal"
				batch="testsr"
				:students="[]"
			/>
		</div>
		
	</div>
	
</template>
<script setup>
import { Breadcrumbs, Button, createResource, Tabs, Badge } from 'frappe-ui'
import { computed, inject, ref } from 'vue'
import {
	Clock,
	LayoutDashboard,
	BookOpen,
	Laptop,
	BookOpenCheck,
	Contact2,
	Mail,
	SendIcon,
	MessageCircle,
} from 'lucide-vue-next'
import { formatTime } from '@/utils'
import BatchDashboard from '@/components/BatchDashboard.vue'
import BatchCourses from '@/components/BatchCourses.vue'
import LiveClass from '@/components/LiveClass.vue'
import BatchStudents from '@/components/BatchStudents.vue'
import courseStudents from '@/components/CourseStudents.vue'
import Assessments from '@/components/Assessments.vue'
import Announcements from '@/components/Annoucements.vue'
import AnnouncementModal from '@/components/Modals/AnnouncementModal.vue'
import Discussions from '@/components/Discussions.vue'
import DateRange from '@/components/Common/DateRange.vue'

const user = inject('$user')
const showAnnouncementModal = ref(false)
const tabIndex = ref(0)
const tabs = computed(() => {
	let batchTabs = []
	if (isStudent.value) {
		batchTabs.push({
			label: 'Dashboard',
			icon: LayoutDashboard,
		})
	}
	if (user.data?.is_moderator) {
		batchTabs.push({
			label: 'Students',
			icon: Contact2,
		})
		batchTabs.push({
			label: 'Assessments',
			icon: BookOpenCheck,
		})
	}
	batchTabs.push({
		label: 'Live Class',
		icon: Laptop,
	})
	batchTabs.push({
		label: 'Announcements',
		icon: Mail,
	})
	batchTabs.push({
		label: 'Discussions',
		icon: MessageCircle,
	})
	return batchTabs
})

const props = defineProps({
	courseName: {
		type: String,
		required: true,
	},
})
const isStudent = computed(() => {
	return false
})

// const course = createResource({
// 	url: 'lms.lms.utils.get_course_details',
// 	cache: ['batch', props.courseName],
// 	params: {
// 		batch: props.courseName,
// 	},
// 	auto: true,
// })

const breadcrumbs = computed(() => {
	let crumbs = [{ label: 'All Courses', route: { name: 'Courses' } }]
	
	crumbs.push({
		label: props.courseName,
		route: { name: 'ManageCourse', params: { "Test": "test" } },
	})
	return crumbs
})

const openAnnouncementModal = () => {
	showAnnouncementModal.value = true
}
</script>
