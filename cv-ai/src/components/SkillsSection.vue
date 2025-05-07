<template>
  <div class="my-4">
    <h2 class="text-xl font-semibold mb-2">Навыки</h2>
    <Vue3TagsInput
        :tags="form.skills"
        @on-tags-changed="tags => form.skills = tags"
        placeholder="Введите навыки"
        :max-tags="10"
        :allow-duplicates="false"
        class="border p-2 w-full mb-2"
    />
  </div>
</template>

<script>
import Vue3TagsInput from 'vue3-tags-input';

export default {
  props: {
    form: Object,
  },
  components: {
    Vue3TagsInput,
  },
};
</script>
