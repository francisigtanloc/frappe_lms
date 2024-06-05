<template>
	<div v-if="quiz.data">
		<div class="bg-blue-100 py-2 px-2 mb-4 rounded-md text-sm text-blue-800">
			<div class="leading-relaxed">
				{{
					__('This quiz consists of {0} questions.').format(
						quiz.data.questions.length
					)
				}}
			</div>
			<div v-if="quiz.data.passing_percentage" class="leading-relaxed">
				{{
					__(
						'You will have to get {0}% correct answers in order to pass the quiz.'
					).format(quiz.data.passing_percentage)
				}}
			</div>
			<div v-if="quiz.data.max_attempts" class="leading-relaxed">
				{{
					__('You can attempt this quiz {0}.').format(
						quiz.data.max_attempts == 1
							? '1 time'
							: `${quiz.data.max_attempts} times`
					)
				}}
			</div>
			<div v-if="quiz.data.time" class="leading-relaxed">
				{{
					__(
						'The quiz has a time limit. For each question you will be given {0} seconds.'
					).format(quiz.data.time)
				}}
			</div>
		</div>
		<div v-if="activeQuestion == 0">
			<div class="border text-center p-20 rounded-md">
				<div class="font-semibold text-lg">
					{{ quiz.data.title }}
				</div>
				<Button
					v-if="
						!quiz.data.max_attempts ||
						attempts.data?.length < quiz.data.max_attempts
					"
					@click="startQuiz"
					class="mt-2"
				>
					<span>
						{{ __('Start') }}
					</span>
				</Button>
				<div v-else>
					{{
						__(
							'You have already exceeded the maximum number of attempts allowed for this quiz.'
						)
					}}
				</div>
			</div>
		</div>
		<div v-else-if="!quizSubmission.data">
			<div v-for="(question, qtidx) in quiz.data.questions">
				<div
					v-if="qtidx == activeQuestion - 1 && questionDetails.data"
					class="border rounded-md p-5" id="quiz-form"
				>
					<div  class="flex justify-between">
						<div class="text-sm">
							<span class="mr-2">
								{{ __('Question {0}').format(activeQuestion) }}:
							</span>
							<span>
								{{
									questionDetails.data.multiple
										? __('Choose all answers that apply')
										: __('Choose one answer')
								}}
							</span>
						</div>
						<div class="text-gray-900 text-sm font-semibold item-left">
							{{ question.marks }}
							{{ question.marks == 1 ? __('Mark') : __('Marks') }}
						</div>
					</div>
					<div
						class="text-gray-900 font-semibold mt-2"
						v-html="questionDetails.data.question"
					></div>
					<div v-if="questionDetails.data.type == 'Choices' && !quiz.data.shuffle_answers" v-for="index in 4">
						<label
							v-if="questionDetails.data[`option_${index}`]"
							class="flex items-center bg-gray-200 rounded-md p-3 mt-4 w-full cursor-pointer focus:border-blue-600"
						>
							<input
								v-if="!showAnswers.length && !questionDetails.data.multiple"
								type="radio"
								:name="encodeURIComponent(questionDetails.data.question)"
								class="w-3.5 h-3.5 text-gray-900 focus:ring-gray-200"
								@change="markAnswer(index)"
							/>

							<input
								v-else-if="!showAnswers.length && questionDetails.data.multiple"
								type="checkbox"
								:name="encodeURIComponent(questionDetails.data.question)"
								class="w-3.5 h-3.5 text-gray-900 rounded-sm focus:ring-gray-200"
								@change="markAnswer(index)"
							/>

							<div
								v-else-if="quiz.data.show_answers"
								v-for="(answer, idx) in showAnswers"
							>
								<div v-if="index - 1 == idx ">
									<div v-if="!quiz.data.hide_correct_answer">
											<CheckCircle v-if="answer" class="w-4 h-4 text-green-500" />
											<MinusCircle
												v-else-if="questionDetails.data[`is_correct_${index}`]"
												class="w-4 h-4 text-green-500"
											/>
											<XCircle
												v-else-if="answer == 0"
												class="w-4 h-4 text-red-500"
											/>
											<MinusCircle v-else class="w-4 h-4" />
									</div>
									<div v-else >
											<CheckCircle v-if="answer" class="w-4 h-4 text-green-500" />
											<MinusCircle v-else-if="questionDetails.data[`is_correct_${index}`]" class="w-4 h-4" />
											<XCircle
												v-else-if="answer == 0"
												class="w-4 h-4 text-red-500"
											/>
											<MinusCircle v-else class="w-4 h-4" />
									</div>
								</div>



							</div>
							<span
								class="ml-2"
								v-html="questionDetails.data[`option_${index}`]"
							>
							</span>
						</label>
						<div
							v-if="questionDetails.data[`explanation_${index}`]"
							class="mt-2 text-xs"
							v-show="showAnswers.length"
						>
							{{ questionDetails.data[`explanation_${index}`] }}
						</div>
					</div>
					<div v-else v-for="index in shuffledArray">
						<label
							v-if="questionDetails.data[`option_${index}`]"
							class="flex items-center bg-gray-200 rounded-md p-3 mt-4 w-full cursor-pointer focus:border-blue-600"
						>
							<input
								v-if="!showAnswers.length && !questionDetails.data.multiple"
								type="radio"
								:name="encodeURIComponent(questionDetails.data.question)"
								class="w-3.5 h-3.5 text-gray-900 focus:ring-gray-200"
								@change="markAnswer(index)"
							/>

							<input
								v-else-if="!showAnswers.length && questionDetails.data.multiple"
								type="checkbox"
								:name="encodeURIComponent(questionDetails.data.question)"
								class="w-3.5 h-3.5 text-gray-900 rounded-sm focus:ring-gray-200"
								@change="markAnswer(index)"
							/>

							<div
								v-else-if="quiz.data.show_answers"
								v-for="(answer, idx) in showAnswers"
							>
								<div v-if="index - 1 == idx ">
									<div v-if="!quiz.data.hide_correct_answer">
											<CheckCircle v-if="answer" class="w-4 h-4 text-green-500" />
											<MinusCircle
												v-else-if="questionDetails.data[`is_correct_${index}`]"
												class="w-4 h-4 text-green-500"
											/>
											<XCircle
												v-else-if="answer == 0"
												class="w-4 h-4 text-red-500"
											/>
											<MinusCircle v-else class="w-4 h-4" />
									</div>
									<div v-else >
											<CheckCircle v-if="answer" class="w-4 h-4 text-green-500" />
											<MinusCircle v-else-if="questionDetails.data[`is_correct_${index}`]" class="w-4 h-4" />
											<XCircle
												v-else-if="answer == 0"
												class="w-4 h-4 text-red-500"
											/>
											<MinusCircle v-else class="w-4 h-4" />
									</div>
								</div>



							</div>
							<span
								class="ml-2"
								v-html="questionDetails.data[`option_${index}`]"
							>
							</span>
						</label>
						<div
							v-if="questionDetails.data[`explanation_${index}`]"
							class="mt-2 text-xs"
							v-show="showAnswers.length"
						>
							{{ questionDetails.data[`explanation_${index}`] }}
						</div>
					</div>
					<div class="progress timer w-100 flex mt-20" data-time="{{ quiz.data.time }}">
						
						<div class="progress-bar"
						:style="{ width: percentTime.percent_time + '%', backgroundColor: percentTime.color }"
						:aria-valuenow="percentTime.percent_time"
						:aria-valuemax="percentTime.percent_time">
						</div>
					</div>
					<div class="flex items-center justify-between mt-4">
						
						<div class="countdown-timer">
							<div>Remaining Time : {{ formatTime }} seconds</div>
							
						</div>
						<div>
							{{
								__('Question {0} of {1}').format(
									activeQuestion,
									quiz.data.questions.length
								)
							}}
						</div>
						<Button
							v-if="quiz.data.show_answers && !showAnswers.length"
							@click="checkAnswer()"
						>
							<span>
								{{ __('Check') }}
							</span>
						</Button>
						<Button
							v-else-if="activeQuestion != quiz.data.questions.length"
							@click="nextQuetion()"
						>
							<span>
								{{ __('Next') }}
							</span>
						</Button>
						<Button v-else @click="submitQuiz()">
							<span>
								{{ __('Submit') }}
							</span>
						</Button>
					</div>
				</div>
			</div>
		</div>
		<div v-else class="border rounded-md p-20 text-center">
			<div class="text-lg font-semibold">
				{{ __('Quiz Summary') }}
			</div>
			<div>
				{{
					__(
						'You got {0}% correct answers with a score of {1} out of {2}'
					).format(
						Math.ceil(quizSubmission.data.percentage),
						quizSubmission.data.score,
						quizSubmission.data.score_out_of
					)
				}}
			</div>
			<Button
				@click="resetQuiz()"
				class="mt-2"
				v-if="
					!quiz.data.max_attempts ||
					attempts?.data.length < quiz.data.max_attempts
				"
			>
				<span>
					{{ __('Try Again') }}
				</span>
			</Button>
		</div>
		<div
			v-if="quiz.data.show_submission_history && attempts?.data"
			class="mt-10"
		>
			<ListView
				:columns="getSubmissionColumns()"
				:rows="attempts?.data"
				row-key="name"
				:options="{ selectable: false, showTooltip: false }"
			>
			</ListView>
			<div>
				<table>
				<thead>
					<tr>
						<th v-for="(columns, index) in  getSubmissionColumns()" :key="index">{{ columns.label }}</th>
					</tr>
				</thead>
				<tbody>
					<template v-for="(attempt, index) in attempts?.data" :key="index">
        <tr>
						<td>{{ attempt.idx }}</td>
						<td>{{ attempt.creation }}</td>
						<td>{{ attempt.score }}</td>
						<td>{{ attempt.score_out_of }}</td>
						<td>{{ attempt.percentage }}</td>
						<td>
							<button @click="toggleSlide(index)">
							{{ isOpen[index] ? 'Hide Details' : 'Show Details' }}
							</button>
						</td>
						</tr>
						<tr v-show="isOpen[index]"  :class="{ 'slide-in': isOpen[index], 'slide-out': !isOpen[index] }">
						<td colspan="6">
							<div>
							<!-- Pagination buttons -->
							<div class="pagination">
							<Button v-for="(item, index) in people" :key="index" @click="scrollToItem(item.name)" :class="{ 'bg-red-400': index == 0 ,'bg-green-400': index == 2 }">
								{{ index + 1 }}
							</Button>
							</div>
							
							<!-- List items -->
							<div class="list" ref="list">
							<div v-for="(item, index) in people" :key="index" class="item" :id = "item.name" :submission="item.name" >
								name : {{ item.name }} <br></br>
								email : {{ item.email }} <br></br>
								age :{{ item.age }} <br></br>
							</div>
							</div>
						</div>
						</td>
						</tr>
					</template>
					
				</tbody>
				</table>
			</div>
			
			
		</div>
	</div>
</template>
<script setup>
import {
	createDocumentResource,
	Button,
	createResource,
	ListView,
} from 'frappe-ui'
import { ref, watch, reactive, inject } from 'vue'
import { computed, onMounted, onUnmounted } from 'vue';
import { createToast } from '@/utils/'
import { CheckCircle, XCircle, MinusCircle, ExternalLinkIcon } from 'lucide-vue-next'
import { timeAgo } from '@/utils'
const user = inject('$user')

const activeQuestion = ref(0)
const currentQuestion = ref('')
const selectedOptions = reactive([0, 0, 0, 0])
const showAnswers = reactive([])
const countdownSeconds = reactive([]); // Initial countdown time in seconds
var countdownInterval = null; // Interval ID for countdown

var items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5']

const people = [
        { name: 'John', email: 'john@example.com', age: 25, address: '123 Main St' },
        { name: 'Alice', email: 'alice@example.com', age: 30, address: '456 Elm St' },
        { name: 'Bob', email: 'bob@example.com', age: 28, address: '789 Oak St' }
      ];
var isOpen = reactive([])


const toggleSlide = (index) => {
	isOpen[index] = !isOpen[index];
};


const scrollToItem = (index) => {
	const targetDiv = document.getElementById(index);
    if (targetDiv) {
		targetDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
	  
    }
      
}


const props = defineProps({
	quizName: {
		type: String,
		required: true,
	},
	// submissionName: {
	// 	type: String,
	// 	required: true,
	// },
})

const quiz = createResource({
	url: 'frappe.client.get',
	makeParams(values) {
		console.log(props.quizName)
		return {
			doctype: 'LMS Quiz',
			name: props.quizName,
		}
	},
	cache: ['quiz', props.quizName],
	auto: true,
	onSuccess(data) {
		if (data.shuffle_questions) {
			data.questions = data.questions.sort(() => Math.random() - 0.5)
		}
	},
})
// const submission = createResource({
// 	url: 'frappe.client.get',
// 	makeParams(values) {
// 		return {
// 			doctype: 'LMS Quiz',
// 			name: props.submissionName,
// 		}
// 	},
// 	cache: ['submissionName', props.submissionName],
// 	auto: true,
// 	onSuccess(data) {
// 		if (data.shuffle_questions) {
// 			data.questions = data.questions.sort(() => Math.random() - 0.5)
// 		}
// 	},
// })


const attempts = createResource({
	url: 'frappe.client.get_list',
	makeParams(values) {
		return {
			doctype: 'LMS Quiz Submission',
			filters: {
				member: user.data?.name,
				quiz: quiz.data?.name,
			},
			fields: [
				'name',
				'creation',
				'score',
				'score_out_of',
				'percentage',
				'passing_percentage',
				'result',
				
			],
			order_by: 'creation desc',
		}
	},
	transform(data) {
		data.forEach((submission, index) => {
			// submission.creation = timeAgo(submission.creation)
			submission.idx = index + 1
			 // Create button element
			 
			// submission.button = '<button id="view_submission" data-id="x">Click me</button>'
			// submission.button.textContent = 'Click me'; // Change the text content as needed
			
			// // Set id attribute of the button
			// submission.button.id = 'view_submission';
			
			// // Add data-id attribute to "x"
			// submission.button.setAttribute('data-id', 'x');

			submission.result = createResource({
			url: 'frappe.client.get_list',
			makeParams(values) {
				return {
					doctype: 'LMS Quiz Result',
					filters: {
					},
					fields: [
						'name'
					],
					order_by: 'creation desc',
				}
			},
			transform(data) {
				
			},
			})


			
		})
	},
})
console.log(attempts);

watch(
	() => quiz.data,
	() => {
		if (quiz.data) {
			attempts.reload()
			resetQuiz()
		}
	}
)


const quizSubmission = createResource({
	url: 'lms.lms.doctype.lms_quiz.lms_quiz.quiz_summary',
	makeParams(values) {
		return {
			quiz: quiz.data.name,
			results: localStorage.getItem(quiz.data.title),
		}
	},
})

const questionDetails = createResource({
	url: 'lms.lms.utils.get_question_details',
	makeParams(values) {
		return {
			question: currentQuestion.value,
		}
	},
})

watch(activeQuestion, (value) => {
	if (value > 0) {
		currentQuestion.value = quiz.data.questions[value - 1].question
		questionDetails.reload()
	}
})

watch(
	() => props.quizName,
	(newName) => {
		if (newName) {
			quiz.reload()
		}
	},
	// () => props.submissionName,
	// (newName) => {
	// 	if (newName) {
	// 		quiz.reload()
	// 	}
	// }
)

const startQuiz = () => {
	startTimer()
	activeQuestion.value = 1
	localStorage.removeItem(quiz.data.title)
}
// var formatTime = computed(() => {
	
// 	return countdownSeconds.value;
// });


const shuffledArray = computed(() => {
	let array = [1,2,3,4]
	let currentIndex = array.length;
	let temporaryValue, randomIndex;

	// While there remain elements to shuffle...
	while (currentIndex !== 0) {
	// Pick a remaining element...
	randomIndex = Math.floor(Math.random() * currentIndex);
	currentIndex--;

	// And swap it with the current element.
	temporaryValue = array[currentIndex];
	array[currentIndex] = array[randomIndex];
	array[randomIndex] = temporaryValue;
	}

	return array;
})


const markAnswer = (index) => {
	if (!questionDetails.data.multiple)
		selectedOptions.splice(0, selectedOptions.length, ...[0, 0, 0, 0])
	selectedOptions[index - 1] = selectedOptions[index - 1] ? 0 : 1
}

const getAnswers = () => {
	let answers = []
	selectedOptions.forEach((value, index) => {
		if (selectedOptions[index])
			answers.push(questionDetails.data[`option_${index + 1}`])
	})
	return answers
}

const checkAnswer = () => {
	
	let answers = getAnswers()
	if(!quiz.data.time){
		if (!answers.length) {
			createToast({
				title: 'Please select an option',
				icon: 'alert-circle',
				iconClasses: 'text-yellow-600 bg-yellow-100 rounded-full',
				position: 'top-center',
			})
			return
		}
	}
	

	createResource({
		url: 'lms.lms.doctype.lms_quiz.lms_quiz.check_answer',
		params: {
			question: currentQuestion.value,
			type: questionDetails.data.type,
			answers: JSON.stringify(answers),
		},
		auto: true,
		onSuccess(data) {
			selectedOptions.forEach((option, index) => {
				if (option) {
					showAnswers[index] = option && data[index]
				} else if (questionDetails.data[`is_correct_${index + 1}`]) {
					showAnswers[index] = 0
				} else {
					showAnswers[index] = undefined
				}
			})
			addToLocalStorage()
			if (!quiz.data.show_answers) {
				resetQuestion()
			}
		},
	})
}

const addToLocalStorage = () => {
	let quizData = JSON.parse(localStorage.getItem(quiz.data.title))
	let questionData = {
		question_index: activeQuestion.value,
		answer: getAnswers().join(),
		is_correct: showAnswers.filter((answer) => {
			return answer != undefined
		}),
	}
	quizData ? quizData.push(questionData) : (quizData = [questionData])
	localStorage.setItem(quiz.data.title, JSON.stringify(quizData))
}
const scrollToDiv = () => {
	const targetDiv = document.getElementById('quiz-form');
    if (targetDiv) {
		targetDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
		// window.scrollTo(0, objDiv.getBoundingClientRect().top + window.pageYOffset); 

	  
    }
      
}
const nextQuetion = () => {
	
	if (!quiz.data.show_answers) {
		checkAnswer()
	} else {
		resetQuestion()
	}
}

const resetQuestion = () => {
	scrollToDiv()
	countdownSeconds.value = quiz.data.time
	startTimer()
	if (activeQuestion.value == quiz.data.questions.length) return
	activeQuestion.value = activeQuestion.value + 1
	selectedOptions.splice(0, selectedOptions.length, ...[0, 0, 0, 0])
	showAnswers.length = 0
}

const submitQuiz = () => {
	if (!quiz.data.show_answers) {
		checkAnswer()
		setTimeout(() => {
			createSubmission()
		}, 500)
		return
	}
	createSubmission()
}

const createSubmission = () => {
	quizSubmission.reload().then(() => {
		attempts.reload()
	})
}

const resetQuiz = () => {
	activeQuestion.value = 0
	selectedOptions.splice(0, selectedOptions.length, ...[0, 0, 0, 0])
	showAnswers.length = 0
	quizSubmission.reset()
}

const getSubmissionColumns = () => {
	return [
		{
			label: 'No.',
			key: 'idx',
		},
		{
			label: 'Date',
			key: 'creation',
		},
		{
			label: 'Score',
			key: 'score',
			align: 'center',
		},
		{
			label: 'Score out of',
			key: 'score_out_of',
			align: 'center',
		},
		{
			label: 'Percentage',
			key: 'percentage',
			align: 'center',
		},
		{
			label: 'Action',
			key: 'action',
			align: 'center',
		},
		
	]
}

const startTimer = () => {
	countdownSeconds.value = quiz.data.time

	// onMounted(() => {

		countdownInterval = setInterval(() => {
			// alert(countdownSeconds--) ;
			countdownSeconds.value--; 
			if (countdownSeconds.value <= 0) {
				clearInterval(countdownInterval);
				checkAnswer()
			// Countdown finished, you can add your logic here
			}
		}, 1000); // Update every second
	// })
	
  };
var formatTime = computed(() => {

	return countdownSeconds.value;
});
var percentTime = computed(() => {
	// alert ((countdownSeconds.value / quiz.data.time) * 100);
	// return (countdownSeconds.value  / quiz.data.time) * 100;
	let percent_time = (countdownSeconds.value  / quiz.data.time) * 100;
	return { percent_time: percent_time, 
			 color: (percent_time < 20 ? 'red' : 'black'), 
			  }
});

// var progressBarWidth = computed(() => {
// 	console.log(percentTime)
// 	return percentTime;

// });
// var progressBarColor = computed(() => {

// 	return percentTime < 100 ? 'red' : 'var(--primary-color)';

// });

	



</script>


<!-- <style>
/* Hidden row styles */
.hidden-details {
    display: none;
}

/* Transition for slide down effect */
.details-content {
    transition: max-height 0.5s ease-in-out;
    max-height: 0;
    overflow: hidden;
}

/* Show details when expanded */
.show-details .details-content {
    max-height: 1000px; /* Adjust based on content height */
}
</style> -->

<style scoped>
.progress {
    width: 100%;
    height: 4px;
	margin-top: 10px;
}
.progress, .progress-bar {
    box-shadow: none;
}
.slide-in {
  transition: max-height 0.5s ease-in-out;
  max-height: 100px; /* Set a reasonable max height */
}
.w-75 {
    width: 75% !important;
}
.progress {
    display: flex;
    height: 1rem;
    overflow: hidden;
    line-height: 0;
    font-size: 0.75rem;
    background-color: #ededed;
    border-radius: var(--border-radius);
}

.slide-out {
  transition: max-height 0.5s ease-in-out;
  max-height: 0;
  overflow: hidden;
}

.pagination {
  margin-bottom: 10px;
}

.pagination button {
  margin: 0 5px;
  padding: 5px 10px;
}

.list {
  overflow-y: auto;
  max-height: 200px; /* Set a max height for scrollable list */
}

.item {
  padding: 10px;
  border-bottom: 1px solid #ccc;
}
</style>