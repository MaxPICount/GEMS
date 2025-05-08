<template>
  <div class="my-4">
    <h2 class="text-xl font-semibold mb-2">Образование</h2>
    <EducationForm
        v-for="(edu, index) in form.education"
        :key="index"
        :education="edu"
        @remove="() => form.education.splice(index, 1)"
    />
    <button
        @click="add"
        class="bg-blue-500 text-white px-4 py-2 rounded"
    >
      Добавить образование
    </button>
  </div>
</template>

<script>
import EducationForm from "./EducationForm.vue"

export default {
  components: {EducationForm},
  props: {
    form: Object,
  },
  methods: {
    add() {
      this.form.education.push({
        school: '',
        degree: '',
        period: [],
        description: '',
      });
    },
  },
};
</script>
