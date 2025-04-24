document.addEventListener(
    "DOMContentLoaded",
    async () => {
        let
            previewObjectURL = '',
            previewRegenerateTimer = null;

        const
            previewRegenerateDelay = 2000,
            OpenRouteApiKey = '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',
            OpenRouteModel = 'deepseek/deepseek-r1:free',
            app = Vue
                .createApp({
                    data() {
                        return {
                            form: {
                                name: '',
                                email: '',
                                phone: '',
                                position: '',
                                experience: [],
                                education: [],
                                skills: '',
                                hobbies: '',
                                languages: '',
                            },
                            currentExperience: {
                                company: '',
                                position: '',
                                period: '',
                                description: '',
                            },
                            currentEducation: {
                                school: '',
                                degree: '',
                                period: '',
                                description: '',
                            },
                            editIndex: null,
                            aiSuggestions: {
                                introduction: '',
                                body: '',
                                closing: '',
                            },
                            isWaitingAI: false
                        };
                    },
                    watch: {
                        form: {
                            handler: 'previewRegenerateWithDelay',
                            deep: true,
                        },
                        aiSuggestions: {
                            handler: 'previewRegenerateWithDelay',
                            deep: true,
                        },
                    },
                    methods: {
                        async customizeWithAI() {
                            const
                                {form, aiSuggestions} = this,
                                prompt = `
User details in JSON format:
${JSON.stringify(form, null, 2)}
`;

                            try {
                                this.isWaitingAI = true;
                                const
                                    response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                                        method: "POST",
                                        headers: {
                                            "Authorization": `Bearer ${OpenRouteApiKey}`,
                                            "Content-Type": "application/json"
                                        },
                                        body: JSON.stringify({
                                            model: OpenRouteModel,
                                            messages: [
                                                // {role: "system", content: "You are a helpful assistant that helps users tailor CVs."},
                                                {
                                                    "role": "system",
                                                    "content": `
*) You are a helpful assistant that helps users tailor CVs with cover letter
*) The cover letter should follow a structured format (introduction, body, closing) and be tailored to the job's position.
*) You returns responses in strict JSON format. Do not use Markdown, quotes, or any explanatory text. Only output a plain JSON object with the following :
{
    "introduction": "One-paragraph professional summary",
    "body": "A short personalized cover letter (up to 120 words)",
    "actual_skills": ["Skill 1", "Skill 2", "Skill 3"]
    "closing": "Shortest total conclusion"
}
`
                                                },
                                                {role: "user", content: prompt}
                                            ]
                                        })
                                    }),
                                    result = await response.json(),
                                    content = result.choices?.[0]?.message?.content || "{}";

                                let parsed;
                                try {
                                    parsed = JSON.parse(content);
                                    console.log(parsed);
                                } catch (e) {
                                    const error = 'Incorrect JSON response from AI';
                                    console.error(`${error}:${content}`, content);
                                    alert(error);
                                    return;
                                }

                                (
                                    {
                                        introduction: aiSuggestions.introduction = '',
                                        body: aiSuggestions.body = '',
                                        closing: aiSuggestions.closing = '',
                                    }
                                        = parsed
                                );

                            } catch (err) {
                                const error = 'AI API error';
                                console.error(`${error}:${err}`);
                                alert(error);
                            } finally {
                                this.isWaitingAI = false;
                            }
                        },

                        openModalExperience(index = null) {
                            this.editIndex = index;
                            this.currentExperience = {...this.form.experience[index]};
                            bootstrap.Modal.getOrCreateInstance(document.getElementById('experienceModal')).show();
                        },
                        affectExperience() {
                            if (!this.currentExperience.company || !this.currentExperience.position) {
                                alert("Please fill in all required fields.");
                                return;
                            }
                            this.editIndex === null
                                ? this.form.experience.push({...this.currentExperience})
                                : this.form.experience[this.editIndex] = {...this.currentExperience};
                            bootstrap.Modal.getInstance(document.getElementById('experienceModal')).hide();
                        },
                        removeExperience(index) {
                            this.form.experience.splice(index, 1);
                        },

                        openModalEducation(index = null) {
                            this.editIndex = index;
                            this.currentEducation = {...this.form.education[index]};
                            bootstrap.Modal.getOrCreateInstance(document.getElementById('educationModal')).show();
                        },
                        affectEducation() {
                            if (!this.currentEducation.school || !this.currentEducation.degree) {
                                alert("Please fill in all fields.");
                                return;
                            }
                            this.editIndex === null
                                ? this.form.education.push({...this.currentEducation})
                                : this.form.education[this.editIndex] = {...this.currentEducation};
                            bootstrap.Modal.getInstance(document.getElementById('educationModal')).hide();
                        },
                        removeEducation(index) {
                            this.form.education.splice(index, 1);
                        },

                        previewRegenerateWithDelay() {
                            clearTimeout(previewRegenerateTimer);

                            previewRegenerateTimer = setTimeout(
                                this.previewRegenerate,
                                previewRegenerateDelay
                            );
                        },

                        previewRegenerate() {
                            const
                                pdf = (new window.jspdf.jsPDF())
                                    .autoTable(// print CV into PDF
                                        {
                                            html: document.querySelector('#cv-template>table'),
                                            useCss: true,
                                            pageBreak: 'auto',

                                            rowPageBreak: 'avoid',
                                            styles: {
                                                overflow: 'linebreak',
                                            },
                                            columnStyles: {
                                                0: {
                                                    cellWidth: 35,
                                                }
                                            },
                                            showHead: 'everyPage',
                                            showFoot: 'never',
                                            theme: 'plain',
                                            didDrawPage: function ({doc}) {
                                                const
                                                    pageSize = doc.internal.pageSize,
                                                    pageHeight = pageSize.height || pageSize.getHeight(),
                                                    pageWidth = pageSize.width || pageSize.getWidth(),
                                                    pageNumber = doc.internal.getNumberOfPages();

                                                doc.setFontSize(8);
                                                doc.text('Page ' + pageNumber, pageWidth / 2, pageHeight - 10, {align: 'center'});
                                            }
                                        }
                                    );

                            if (pdf.getNumberOfPages() === 1)
                                pdf.addPage();


                            pdf.addPage();
                            pdf.autoTable({// print Cover Letter into PDF
                                html: document.querySelector('#cover-letter-template>table'),
                                useCss: true,
                                theme: 'plain',
                            });
                            URL.revokeObjectURL(previewObjectURL);// free previous

                            previewObjectURL = URL.createObjectURL(
                                pdf.output('blob')
                            );

                            document.getElementById('preview').src = previewObjectURL;
                        }
                    }
                });

        // Load CV template
        document.getElementById('cv-template').innerHTML = await (await fetch('templates/cv.html')).text();
        // Load Cover Letter template
        document.getElementById('cover-letter-template').innerHTML = await (await fetch('templates/cover-letter.html')).text();

        // jsPDF-autoTable do not understanding '\n' in multiline text. But '<br/>' - yes
        app.config.globalProperties.$escapeNl2br = (text) => text
            ?.split('\n')
            .map(line => {
                const div = document.createElement('div');
                div.textContent = line;
                return div.innerHTML;
            })
            .join('<br/>');

        app.mount('#app');
    }
);