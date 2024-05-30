<template>
    <div class="countdown-timer">
      <div>{{ formatTime }}</div>
    </div>
  </template>
  
  <script>
  import { computed, ref, onMounted, onUnmounted } from 'vue';
  
  export default {
    setup() {
      const countdownSeconds = ref(60); // Initial countdown time in seconds
      let countdownInterval = null; // Interval ID for countdown
  
      const formatTime = computed(() => {
        // Format countdown time as minutes:seconds
        let minutes = Math.floor(countdownSeconds.value / 60);
        let seconds = countdownSeconds.value % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
      });
  
      const startCountdown = () => {
        countdownInterval = setInterval(() => {
          countdownSeconds.value--;
          if (countdownSeconds.value <= 0) {
            clearInterval(countdownInterval);
            // Countdown finished, you can add your logic here
          }
        }, 1000); // Update every second
      };
  
      onMounted(() => {
        // Start countdown when component is mounted
        startCountdown();
      });
  
      onUnmounted(() => {
        // Clean up interval when component is destroyed
        clearInterval(countdownInterval);
      });
  
      return {
        formatTime
      };
    }
  };
  </script>
  
  <style scoped>
  .countdown-timer {
    /* Add your Frappe UI styles here */
  }
  </style>