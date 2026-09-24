# ISIS3710-ParcialPractico-202620
# Nombre: Jose Luis Almonacid Peñaranda
# Codigo: 202320415
# Las carpetas de auth y plans junto con los archivos page.tsx y layout.tsx, se movieron a la carpeta [lang]

## Hallazgos

| # | Ubicación (archivo y línea) | Herramienta que lo detectó | Regla o principio incumplido | Por qué es un problema | Corrección |
|---|---|---|---|---|---|
| 1 | Inicio: `src/app/[lang]/page.tsx:67–69` y `src/app/globals.css:22–26` | Lighthouse | WCAG 1.4.3: contraste del texto | El texto de ejemplo del buscador se ve muy tenue. No muestra el detalle de contraste de Lighthouse para este elemento. | Se estableció `#475569` como color de los placeholders y se dio un nombre accesible al buscador. |
| 2 | Login: `src/app/globals.css:6,22–26` | Lighthouse: contraste insuficiente | WCAG 1.4.3: contraste | Lighthouse muestra un aviso de contraste en la página. El CSS anterior podía poner texto claro sobre el fondo claro del formulario. | Se fijó `color-scheme: light`, se eliminó esa combinación de colores y se oscurecieron los placeholders. |
| 3 | Registro: `src/app/globals.css:6,22–26` | Lighthouse: contraste insuficiente | WCAG 1.4.3: contraste | Lighthouse muestra el mismo aviso en registro. La captura no despliega cuál de sus elementos falló. | La corrección global de colores y placeholders se aplica también a esta página. |
| 4 | Detalle: `src/app/[lang]/plans/[id]/page.tsx:121,136` | Lighthouse: contraste insuficiente en el número de “likes” | WCAG 1.4.3: contraste | El número heredaba un color de texto muy claro sobre un fondo naranja claro. | Se añadió `text-slate-900` al contenedor del contador y `text-slate-700` a la etiqueta. |
| 5 | Login: `src/app/[lang]/auth/login/page.tsx:32` | Lighthouse: “Document does not have a main landmark” | Buena práctica: región principal (`main`) | Los lectores de pantalla no podían identificar directamente la región principal de la página. | Se envolvió el contenido en `<main>`. |
| 6 | Registro: `src/app/[lang]/auth/register/page.tsx:34` | Lighthouse: “Document does not have a main landmark” | Buena práctica: región principal (`main`) | La página de registro presentaba el mismo problema. | Se envolvió el contenido en `<main>`. |