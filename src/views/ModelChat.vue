<template>
    <div>
        this is model chat view {{ historyParams }}
    </div>
</template>

<script setup>

import { ref, onMounted, onBeforeUnmount, nextTick, getCurrentInstance } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const historyParams = history.state.data
console.log('model chat route', route.params);

</script>