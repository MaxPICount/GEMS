<template>
  <fieldset>
    <input
        v-model="experience.company"
        placeholder="Компания"
        class="border p-2 w-full mb-2"
    />
    <input
        v-model="experience.position"
        placeholder="Должность"
        class="border p-2 w-full mb-2"
    />
    <VueDatePicker
        v-model="experience.period"
        range
        year-picker
        placeholder="Годы работы"
        class="border p-2 w-full mb-2"
    />
    <textarea
        v-model="experience.description"
        placeholder="Описание"
        class="border p-2 w-full mb-2"
    ></textarea>
    <button
        class="text-red-500 hover:text-red-700"
        @click="$emit('remove')"
    >
      Удалить
    </button>
  </fieldset>

</template>

<script setup>
import VueDatePicker from "@vuepic/vue-datepicker";
import '@vuepic/vue-datepicker/dist/main.css'

defineProps(['experience'])
</script>

