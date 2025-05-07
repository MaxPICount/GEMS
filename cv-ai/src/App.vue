<template>
  <div class="min-h-screen bg-gray-100">
    <div class="container mx-auto py-8">
      <h1 class="text-3xl font-bold mb-6 text-center">CV Generator</h1>

      <div class="bg-white shadow-md rounded p-6 flex gap-6">
        <!-- Левая часть — форма -->
        <div class="w-1/2">
      <CvForm :form="form" @submit="handleSubmit"/>
    </div>

        <!-- Правая часть — превью -->
        <div class="w-1/2 border-l pl-6 text-gray-600">
          <h2 class="text-xl font-semibold mb-4">Preview</h2>
          <p class="italic text-sm text-gray-400">Здесь будет предпросмотр резюме</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import CvForm from './components/CvForm.vue'

export default {
  components: { CvForm },
  setup() {
    const form = ref({
      name: '',
      email: '',
      phone: '',
      experience: [],
      education: [],
      skills: [],
      languages: [],
    })

    const handleSubmit = (data) => {
      console.log('Сохраняем:', data)
    }

    return { form, handleSubmit }
  }
}
</script>
