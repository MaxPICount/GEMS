<template>
  <fieldset>
    <input
        v-model="education.school"
        placeholder="Школа"
        class="border p-2 w-full mb-2"
    >
    <input
        v-model="education.degree"
        placeholder="Степень"
        class="border p-2 w-full mb-2"
    >
    <input
        v-model="education.period"
        placeholder="Период"
        class="border p-2 w-full mb-2"
    >
    <textarea
        v-model="education.description"
        placeholder="Описание"
        class="border p-2 w-full mb-2"
    ></textarea>
    <button
        @click="$emit('remove')"
        class="text-red-500 hover:text-red-700"
    >
      Удалить
    </button>
  </fieldset>
</template>


<script setup>
defineProps(['education'])
</script>
