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
          <iframe
              v-if="iframeSrc"
              :src="iframeSrc"
              class="w-full h-full border mt-4"
          />
        </div>
      </div>
      <div class="mt-6 flex justify-end">
        <button
            @click="generatePDF"
            class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Скачать PDF
        </button>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, reactive, toRaw, watch } from 'vue'
import CvForm from './components/CvForm.vue'
import generateCvTemplate from './templates/cv.js'
import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'

pdfMake.vfs = pdfFonts.vfs

// реактивные данные
const form = reactive({
  name: '',
  email: '',
  phone: '',
  experience: [],
  education: [],
  skills: [],
  languages: [],
})

const iframeSrc = ref(null)

// функция сохранения (если нужно)
const handleSubmit = (data) => {
  console.log('Сохраняем:', data)
}

let previewRegenerateTimer = null;
const previewRegenerateWithDelay = () => {
  clearTimeout(previewRegenerateTimer);

  previewRegenerateTimer = setTimeout(
      previewRegenerate,
      2000
  );
}

const previewRegenerate = () => {
  const docDefinition = generateCvTemplate(toRaw(form))

  pdfMake.createPdf(docDefinition).getBlob((blob) => {
    const url = URL.createObjectURL(blob)
    iframeSrc.value && URL.revokeObjectURL(iframeSrc.value)
    iframeSrc.value = url
  })
}

// вот тут Composition-style watch
watch(form, previewRegenerateWithDelay, { deep: true })
</script>