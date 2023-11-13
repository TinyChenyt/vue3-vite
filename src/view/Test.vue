<!--
 * @Author: TinyChen 2454046178@qq.com
 * @Date: 2023-11-13 09:42:34
 * @LastEditors: TinyChen 2454046178@qq.com
 * @LastEditTime: 2023-11-13 14:18:38
 * @FilePath: \vue3-vite\src\view\Home.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
let count = ref(0);
const m = () => {
    console.log('mounted');
}
onMounted(() => {
    m();
})
const question = ref('');
const answer = ref('answer');

watch(question, async(newQuestion) => {
    if(newQuestion.indexOf('?') > -1) {
        answer.value = 'thinking';
    }
})
watch(count, (newCount) => {
    answer.value = `add${newCount}`;
},{immediate: true})
</script>

<template>
    <div>
        <p>
            <input v-model="question" type="text">
        </p>
        <p>{{ answer }}</p>
        <button @click="count++">add</button>
    </div>
</template>
