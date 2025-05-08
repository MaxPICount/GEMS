export default (formData) => {
    return {
        version: '1.7',
        subset: 'PDF/A-1a',
        tagged: true,
        displayTitle: true,

        pageSize: 'A4',
        pageOrientation: 'portrait',

        // language: 'cs-CZ',
        compress: true,

        // pageBreakBefore: (currentNode, followingNodesOnPage, nodesOnNextPage, previousNodesOnPage) =>
        //     currentNode.headlineLevel === 1 && followingNodesOnPage.length === 0,

        info: {
            title: `${formData.position || 'Резюме'} - ${formData.name}`,
            author: "CV Generator",
            subject: "CV",
            keywords: formData.position || 'cv',
            creator: "CV Generator",
        },

        footer: (currentPage, pageCount) => [
            {text: `${currentPage} / ${pageCount}`, alignment: 'center', fontSize: 9, color: 'gray'},
        ],

        content: [
            {
                table: {
                    widths: ['25%', '*'],
                    body: [
                        ['Имя', formData.name],
                        ['Email', formData.email],
                        ['Телефон', formData.phone],
                        formData.position ? ['Желаемая должность', formData.position] : null,
                        formData.about ? ['О себе', formData.about] : null,

                        ...formData.experience.length
                            ? [
                                [{text: 'Опыт работы', style: 'sectionHeader', colSpan: 2}, ''],
                                ...formData.experience.map(exp => [
                                    `${exp.position}\n${exp.period.join(' - ')}\n${exp.company}`,
                                    exp.description
                                ])
                            ]
                            : [],

                        ...formData.education.length
                            ? [
                                [{text: 'Образование', style: 'sectionHeader', colSpan: 2}, ''],
                                ...formData.education.map(edu => [
                                    `${edu.school}\n${edu.degree}\n${edu.period.join(' - ')}`,
                                    edu.description
                                ])
                            ]
                            : [],

                        ...formData.skills.length
                            ? [
                                [{text: 'Навыки', style: 'sectionHeader', colSpan: 2}, ''],
                                [{text: formData.skills.join(', '), colSpan: 2}, '']
                            ]
                            : [],

                        ...formData.languages.length
                            ? [
                                [{text: 'Языки', style: 'sectionHeader', colSpan: 2}, ''],
                                [{text: formData.languages.map( lang => `${lang.name} - ${lang.level}`).join(', '), colSpan: 2}, '']
                            ]
                            : [],
                    ].filter(Boolean),
                },
                layout: 'lightHorizontalLines'
            },
        ],
        styles: {
            sectionHeader: {
                bold: true,
                fontSize: 13,
                margin: [0, 10, 0, 4],
                fillColor: '#f5f5f5'
            }
        }
    };
};
