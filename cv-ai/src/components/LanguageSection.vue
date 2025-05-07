<template>
  <div class="my-4">
    <h2 class="text-xl font-semibold mb-2">Языки</h2>
    <LanguageForm
        v-for="(lang, index) in form.languages" :key="index"
        :language="lang"
        @remove="() => form.languages.splice(index, 1)"
    />

    <button
        @click="add"
        class="bg-blue-500 text-white px-4 py-2 rounded"
    >
      Добавить язык
    </button>
  </div>
</template>

<script>
import LanguageForm from "./LanguageForm.vue";

export default {
  components: {LanguageForm},
  props: {
    form: Object,
  },
  methods: {
    add() {
      this.form.languages.push({
        name: '',
        level: '',
      });
    },
  },
};
</script>
