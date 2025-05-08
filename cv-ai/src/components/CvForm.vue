<!-- CvForm.vue -->
<template>
  <div>
    <input
        v-model="form.position"
        type="text"
        placeholder="Должность"
        class="border p-2 w-full mb-2"
    />
    <PersonalSection :form="form"/>
    <ExperienceSection :form="form"/>
    <EducationSection :form="form"/>
    <LanguagesSection :form="form"/>
    <SkillsSection :form="form"/>

    <button
        @click="$emit('submit', form)"
        class="bg-blue-500 text-white px-4 py-2 rounded"
    >Сохранить</button>
  </div>
</template>

<script setup>
defineProps(['form'])
</script>
<script>
import ExperienceSection from './ExperienceSection.vue'
import EducationSection from './EducationSection.vue'
import LanguageSection from './LanguageSection.vue'
import SkillsSection from './SkillsSection.vue'
import PersonalSection from "./PersonalSection.vue";

export default {
  props: {
    form: Object, // можно передавать извне или сделать локально
  },
  components: {
    PersonalSection,
    ExperienceSection,
    EducationSection,
    LanguagesSection: LanguageSection,
    SkillsSection,
  },
}
</script>
