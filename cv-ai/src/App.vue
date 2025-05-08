<template>
  <div class="min-h-screen bg-gray-100">
    <div class="container mx-auto py-8">
      <h1 class="text-3xl font-bold mb-6 text-center">CV Generator</h1>
      <div class="bg-white shadow-md rounded p-6 flex gap-6">
        <!-- Левая часть — форма -->
        <div
            class="w-1/2"
            @dragover.prevent="dragging = true"
            @dragleave.prevent="dragging = false"
            @drop.prevent="(event) => {handleDrop(event); dragging = false}"
            :class="dragging ? 'border-blue-500 bg-blue-50' : ''"
        >
          <CvForm :form="form" />
        </div>

        <!-- Правая часть — превью -->
        <div class="w-1/2 border-l pl-6 text-gray-600">
          <iframe
              v-if="iframeSrc"
              :src="iframeSrc"
              class="w-full h-full border"
          />
        </div>
      </div>
      <div class="mt-6 flex justify-end">
        <button @click="exportForm">Экспорт</button>
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
  position: '',
  name: '',
  email: '',
  phone: '',
  experience: [],
  education: [],
  skills: [],
  languages: [],
  about: '',
}),
    dragging = ref(false)


const iframeSrc = ref(null)

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

watch(form, previewRegenerateWithDelay, { deep: true })

const exportForm = () => {
  const blob = new Blob([JSON.stringify(toRaw(form), null, 2)], {
    type: 'application/json'
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${form.position}-${form.name}.json`;
  link.click();
  URL.revokeObjectURL(url);
}

const handleDrop = async (event) => {
  const file = event.dataTransfer.files[0];
  if (!file || file.type !== 'application/json') {
    alert('Пожалуйста, перетащите JSON-файл');
    return;
  }

  const text = await file.text();
  try {
    const data = JSON.parse(text);
    Object.assign(form, data);
    console.log('Загружено:', form);
  } catch (e) {
    alert('Ошибка чтения JSON-файла');
  }
}

</script>