# GEMS

# AI-Powered CV & Cover Letter Generator

<p align="center">
  <img src="https://img.shields.io/badge/Vue.js-4FC08D?logo=vue.js&logoColor=white" alt="Vue.js Badge">
  <img src="https://img.shields.io/badge/Bootstrap-7952B3?logo=bootstrap&logoColor=white" alt="Bootstrap Badge">
  <img src="https://img.shields.io/badge/jsPDF-FF8000?logo=javascript&logoColor=white" alt="jsPDF Badge">
  <img src="https://img.shields.io/badge/autoTable-FFB300?logo=javascript&logoColor=white" alt="autoTable Badge">
  <img src="https://img.shields.io/badge/DeepSeek%20AI-00BFFF?logo=openai&logoColor=white" alt="DeepSeek Badge">
  <a href="https://gems-p4o3.onrender.com/" target="_blank">
    <img src="https://img.shields.io/badge/Live%20Demo-00C853?logo=firefox-browser&logoColor=white" alt="Live Demo">
  </a>
</p>

This project is a web-based application that helps users generate a professional CV and Cover Letter using AI assistance and export them into a nicely formatted PDF file.

The project is live at: [https://gems-p4o3.onrender.com/](https://gems-p4o3.onrender.com/)

## Features

- AI-assisted generation of CV (Curriculum Vitae) and Cover Letter texts.
- Dynamic form inputs for personal and professional details.
- Real-time preview of the generated CV and Cover Letter.
- Exporting CV and Cover Letter into a single PDF file.
- Clean and structured PDF layout using tables and text formatting.

## How It Works

1. The user fills out forms providing their basic information, work experience, education, and professional details.
2. The system assists in generating CV and Cover Letter content using AI (currently DeepSeek via OpenRouter).
3. The filled data is compiled into a PDF using **jsPDF** and **autoTable** libraries.
4. The CV is displayed as a structured table, while the Cover Letter is placed below without borders.
5. The user can preview and download the generated PDF.

## Technologies Used

- [Vue.js](https://vuejs.org/) — Reactive front-end framework for building dynamic UI.
- [Bootstrap](https://getbootstrap.com/) — Responsive CSS framework for layout and styling.
- [jsPDF](https://github.com/parallax/jsPDF) — PDF generation library for JavaScript.
- [jspdf-autotable](https://github.com/simonbengtsson/jsPDF-AutoTable) — Plugin for creating tables in PDF files.
- [DeepSeek](https://deepseek.com/) (via OpenRouter) — AI model for content generation.

## Installation

No installation required.  
Simply open the `index.html` file in any modern browser (tested on Chrome and Edge).

## TODO

- Hide API keys and sensitive data (use AI requests through backend instead of frontend).
- Migrate the project to proper module-based architecture (ES modules, npm).
- Improve UX/UI (date period pickers, skill tags, better form validations).
- Add flexible PDF templates (different layouts/styles).
- Add multilingual support (Hebrew, Russian, Ukrainian, and more).

---

Made with ❤️ to make job applications easier and smarter!
