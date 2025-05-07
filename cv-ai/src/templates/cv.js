export default (formData) => {
    return {
        content: [
            {text: 'Резюме', style: 'header'},
            {text: `Имя: ${formData.name}`, style: 'subheader'},
            {text: `Email: ${formData.email}`},
            {text: `Телефон: ${formData.phone}`},
            {text: 'Опыт работы', style: 'sectionHeader'},
            {
                table: {
                    widths: ['*', '*', '*'],
                    body: [
                        ['Компания', 'Должность', 'Описание'],
                        ...formData.experience.map(exp => [exp.company, exp.position, exp.description])
                    ]
                }
            },
            {text: 'Образование', style: 'sectionHeader'},
            {
                table: {
                    widths: ['*', '*', '*'],
                    body: [
                        ['Учебное заведение', 'Степень', 'Период'],
                        ...formData.education.map(edu => [edu.school, edu.degree, edu.period])
                    ]
                }
            },
            {text: 'Навыки', style: 'sectionHeader'},
            {ul: formData.skills}
        ],
        styles: {
            header: {fontSize: 22, bold: true, margin: [0, 0, 0, 10]},
            subheader: {fontSize: 16, bold: true, margin: [0, 10, 0, 5]},
            sectionHeader: {fontSize: 14, bold: true, margin: [0, 10, 0, 5]}
        }
    }
};