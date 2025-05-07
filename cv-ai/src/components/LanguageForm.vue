<template>
  <fieldset>
    <input
        v-model="language.name"
        type="text"
        placeholder="Язык"
        class="border p-2 w-full mb-2"
    />
    <input
        v-model="language.level"
        type="text"
        placeholder="Уровень"
        class="border p-2 w-full mb-2"
    />
    <button
        class="text-red-500 hover:text-red-700"
        @click="$emit('remove')"
    >
      Удалить
    </button>
  </fieldset>

</template>

<script setup>
defineProps(['language'])
</script>

