document.getElementById('cvForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));

    const templateHtml = await fetch('templates/cv-template.html').then(r => r.text());
    const html = templateHtml
        .replace('{{name}}', data.name)
        .replace('{{role}}', data.role)
        .replace('{{experience}}', data.experience)
        .replace('{{education}}', data.education)
        .replace('{{skills}}', data.skills);

    const preview = document.getElementById('preview');
    preview.innerHTML = html;

    document.getElementById('downloadBtn').style.display = 'inline-block';
});

document.getElementById('downloadBtn').addEventListener('click', () => {
    const element = document.getElementById('preview');
    html2pdf().from(element).save('cv.pdf');
});
