<template>
  <div class="my-4">
    <h2 class="text-xl font-semibold mb-2">Практика</h2>
    <ExperienceForm
        v-for="(exp, index) in form.experience"
        :key="index"
        :experience="exp"
        @remove="() => form.experience.splice(index, 1)"
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
import ExperienceForm from "./ExperienceForm.vue";

export default {
  components: {ExperienceForm},
  props: {
    form: Object,
  },
  methods: {
    add() {
      this.form.experience.push({
        company: '',
        position: '',
        period: '',
        description: '',
      });
    },
  },
};
</script>
