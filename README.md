# Cabina SPP — entrenador para el examen SPP de IVAO España

Material de estudio personal basado en el libro «Piloto Privado Sénior (SPP)» de la wiki de IVAO España
(https://wiki.es.ivao.aero/books/piloto-privado-senior-spp). El texto está redactado de nuevo y reorganizado;
ante cualquier duda mandan la documentación oficial de la división, el AIP y las cartas vigentes.

## Estructura

```
content/                 ← fuente única de verdad (editar aquí)
  topics/NN-*.md         temario por tema (markdown con extensiones, ver abajo)
  summaries.md           "Lo esencial" de cada tema (# id-del-tema)
  flashcards.json        [{topic, front, back}]
  questions.json         banco fijo [{t, q, o[], a[], m?, e}]  (a = índices correctos; m = múltiple)
  scenarios.json         escenarios de la Cabina IFR (ver formato abajo)
  diagrams/*.svg         diagramas propios (app y PDF)
app/
  index.html             shell + estilos (sin dependencias, sin build)
  js/rules.js            reglas: entrada en espera (regla de la mano), velocidades de espera, interceptaciones
                         (DC 30 / CD 45 / ruta pasada), regla semicircular, motor crítico, CAT ILS, TAS…
  js/generators.js       14 generadores paramétricos de preguntas (algunos con instrumento RMI o espera dibujado)
  js/data.js             GENERADO desde content/ (no editar)
  js/app.js              vistas: temario, resúmenes, flashcards (Leitner), test, cabina IFR, chuleta
                         + renderizadores SVG de instrumentos: viz({kind:'rmi'|'cdi'|'hold'|'asi'})
build/
  build_data.py          content/ → app/js/data.js
  build_pdf.py           content/ → build/Manual_SPP_IVAO_ES.pdf (reportlab + DejaVu)
  cheatsheet.md          chuleta de tablas (app y apéndice A del PDF)
  smoke_test.js          prueba de humo con jsdom (recorre vistas, test, escenarios y simuladores)
```

## Comandos

```bash
python3 build/build_data.py          # regenerar datos de la app
python3 build/build_pdf.py           # regenerar el PDF (requiere reportlab; diagramas PNG en build/diagrams)
python3 -c "import cairosvg,glob,os; [cairosvg.svg2png(url=f, write_to='build/diagrams/'+os.path.basename(f)[:-4]+'.png', output_width=1520) for f in glob.glob('content/diagrams/*.svg')]"
node build/smoke_test.js             # tras npm i jsdom@24
npx serve app                        # o abrir app/index.html directamente
```

## Formato de escenario

```json
{ "id": "c15", "title": "…", "cat": "Esperas", "diff": 1-3,
  "setup": { "ac": "PA34 Seneca", "route": "LEVC → LEAL", "metar": "…", "notes": "…" },
  "steps": [ { "viz": {"kind": "hold", "inb": 230, "h": 210, "right": true},
               "sit": "situación", "q": "pregunta", "o": ["correcta", "…"], "a": [0], "e": "explicación",
               "sev": "loss" | "minor" } ] }
```

`viz`: `rmi {qdm, hdgAc}` · `cdi {crs, to}` · `hold {inb, h, right, sectors?}` · `asi {ias}` · `none`.
Las opciones se barajan al jugar; `sev: "loss"` marca decisiones que en el examen serían suspenso.

## Extensiones de markdown

- `> [!key] texto` → recuadro CLAVE · `> [!ivao] texto` → recuadro IVAO
- `> línea` (sin [!]) → bloque de fraseología
- `![fig:nombre|pie]` → diagrama de content/diagrams · `![wiki:URL|pie]` → enlace a imagen de la wiki

## Ideas para seguir en Claude Code

- Más escenarios (c15+): SIDs/STARs concretas, frustradas, fallos de com en distintas fases.
- Un simulador de CDI/HSI (dar posición, leer el radial) y otro de cálculo de EET/autonomía.
- Animar la entrada en espera trazando la trayectoria.

## Datos que no vienen de la wiki (marcados en el texto)

- La tabla de la regla semicircular se da como regla general OACI.
- La regla rápida TAS ≈ IAS + 2 % por cada 1 000 ft.
