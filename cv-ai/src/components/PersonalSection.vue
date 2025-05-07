<template>
  <div class="my-4">
    <fieldset>
      <input
          v-model="form.name"
          type="text"
          placeholder="Имя"
          class="border p-2 w-full mb-2"
      />
      <input
          v-model="form.email"
          type="text"
          placeholder="Email"
          class="border p-2 w-full mb-2"
      />
      <input
          v-model="form.phone"
          type="text"
          placeholder="Телефон"
          class="border p-2 w-full mb-2"
      />
    </fieldset>
  </div>
</template>

<script>
export default {
  props: {
    form: Object,
  },
};
</script>
