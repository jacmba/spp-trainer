---
id: esperas
num: 2
title: Esperas e hipódromos IFR
icon: loop
wiki: https://wiki.es.ivao.aero/books/piloto-privado-senior-spp/chapter/esperas-e-hipodromos-ifr
---

## Espera vs hipódromo

Un **circuito de espera** es un procedimiento instrumental predefinido en el que la aeronave se mantiene dentro de un espacio aéreo protegido **esperando una autorización posterior**. Es el equivalente IFR de las órbitas VFR: sirve para **retrasar** a la aeronave de forma segura.

- **Por instrucción del ATC**: para separar y secuenciar (p. ej. varias llegadas a la vez).
- **A petición de la tripulación**: para ganar tiempo (checklists por un problema, cambio de pista o de aproximación que exige reconfigurar y hacer briefing…).

Un **hipódromo** (racetrack) parece igual pero tiene otro fin: forma parte del **segmento de aproximación inicial** y permite descender o alinearse con el curso de acercamiento cuando no es práctico un viraje de inversión (viraje de base o reglamentario 45/180°, 80/260°).

> [!key] Ejemplo: en la ILS Z RWY 29 de Asturias, sobre el VOR VES hay una **espera** (opcional, según el tráfico) y un **hipódromo** (parte de la aproximación inicial para alinearse con el final). Pueden tener **distinto tramo de alejamiento y distintas altitudes mínimas**: hay que leer bien la carta.

## Diseño de la espera

El **fijo de la espera** puede ser un VOR, un NDB, un fijo RNAV o una posición definida por ellos. **En el examen SPP solo se evalúan esperas sobre VOR.**

- **Estándar**: virajes a la **derecha**.
- **No estándar**: virajes a la **izquierda**.

![fig:espera|Elementos de un circuito de espera estándar]

Tramos: **tramo de acercamiento** (inbound, recto, termina en el fijo) → **viraje de alejamiento** → **tramo de alejamiento** (outbound, recto y opuesto) → **viraje de acercamiento**.

### Área de espera

- **Área básica**: protege el circuito teniendo en cuenta velocidad, viento, errores de cronometraje…
- **Área de entrada**: protege las trayectorias de los procedimientos de entrada.
- **Área tope (buffer)**: **5 NM** más allá del área básica; sus obstáculos cuentan para fijar la MHA.

### Tramos de precisión y no precisión

> [!key] **El único tramo de precisión es el de acercamiento**: es el único que se vuela sobre un QDM/QDR de la radioayuda. Por eso se habla de **curso de acercamiento** pero de **rumbo de alejamiento**. Los dos virajes y el alejamiento son de no precisión.

Si se sospecha un error de navegación que pueda sacar a la aeronave del área protegida: **proceder directo al fijo**, identificar el sector de entrada desde ahí y volver a entrar.

### Altitud mínima de espera (MHA)

Garantiza franqueamiento de obstáculos en el área: al menos **1 000 ft** sobre terreno llano y **2 000 ft** sobre terreno montañoso. Puede haber también una altitud **máxima**.

### Velocidad máxima de espera

Si la carta no indica otra, se aplica la de OACI:

| Nivel | Condiciones normales | En turbulencia |
|---|---|---|
| **Hasta 14 000 ft** | **230 kt** (esperas limitadas a CAT A y B: **170 kt**) | **280 kt** |
| **14 001 – 20 000 ft** | **240 kt** (en aerovías: 280 kt) | Con autorización ATC, la menor de **280 kt** o **M0,8** |
| **20 001 – 34 000 ft** | **265 kt** (en aerovías: 280 kt) | Ídem |
| **Por encima de 34 000 ft** | **M0,83** | M0,83 |

### Tramo de alejamiento

Si la carta no dice nada, está limitado por **tiempo**:

| Altitud de la espera | Duración |
|---|---|
| **14 000 ft o inferior** | **1 minuto** |
| **Por encima de 14 000 ft** | **1,5 minutos** |

> [!key] El cronómetro empieza **al través (abeam) del fijo** o **al terminar el viraje de alejamiento**, **lo que ocurra más tarde**.

También puede limitarse por **distancia DME** o por un **radial limitador**. En el examen SPP solo se evalúan esperas con alejamiento **por tiempo** (la sección de evaluación también menciona DME).

### Alabeo y viento

- Virajes de **3°/s** (régimen estándar) con **25° de alabeo máximo**.
- La corrección por viento **no se evalúa en SPP** (es temario CP).

### Salida de la espera

Si se conoce la hora de salida, se acortan los tramos para estar **pasando por el fijo a esa hora**.

## Entrada en la espera

Según el sector desde el que se llega al fijo (lo decide el **rumbo magnético** con el que se vuela hacia el fijo):

| Sector | Entrada | Amplitud | Comentario |
|---|---|---|---|
| **1** | **Paralela** (falsa) | 110° | La más peligrosa: toda de no precisión |
| **2** | **En gota** (offset / teardrop) | 70° | La más segura: de precisión |
| **3** | **Directa** | 180° | La más sencilla |

Hay una **zona de flexibilidad de ±5°** en cada límite entre sectores en la que se puede elegir. Preferencias: entre directa y paralela → **directa**; entre directa y gota → **gota**; entre paralela y gota → **gota**.

![fig:sectores|Sectores de entrada de una espera estándar (virajes a la derecha)]

> [!key] **En el examen SPP solo se evalúa la entrada DIRECTA.** Paralela, gota y entradas especiales VOR/DME son temario CP.

### Entrada directa (sector 3)

1. Pasar por el fijo.
2. Virar al **rumbo de alejamiento**, en el mismo sentido que el resto de virajes de la espera.
3. Al través del fijo (o al terminar el viraje, lo más tarde) empieza el tramo de alejamiento: cronometrar el tiempo (o la distancia).
4. Virar e **interceptar el curso de acercamiento**.
5. Al pasar **por segunda vez** sobre el fijo, la entrada ha terminado.

### Regla de la mano

Para identificar el sector en vuelo sin dibujar:

- Mano **derecha** si la espera es **estándar**; **izquierda** si es **no estándar**.
- Tres dedos: entre **pulgar e índice ≈ 110°** (sector 1) y entre **índice y corazón ≈ 70°** (sector 2).
- Se pone el **índice sobre el rumbo con el que se vuela al fijo** (en el girodireccional, RMI o HSI) y se busca entre qué dedos cae el **rumbo de alejamiento**.

| Espera derecha, rumbo al fijo 230° | Espera izquierda, rumbo al fijo 230° |
|---|---|
| Alejamiento entre 120° y 230° → **paralela** | Entre 230° y 340° → **paralela** |
| Entre 230° y 300° → **gota** | Entre 160° y 230° → **gota** |
| Entre 300° y 120° → **directa** | Entre 340° y 160° → **directa** |

> [!key] Fórmula equivalente (rumbo al fijo **H**, rumbo de alejamiento **O**). Espera **derecha**: O en [H−110, H] → paralela; O en [H, H+70] → gota; resto → directa. Espera **izquierda**: O en [H, H+110] → paralela; O en [H−70, H] → gota; resto → directa.

## Instrucciones de espera del ATC

- **Espera publicada** en una carta: basta con "EC-ABC, espere sobre PISAV".
- **Espera no publicada**: el ATC da los datos. Lo que no diga se sobreentiende así:

| Dato | Si no se especifica… |
|---|---|
| Fijo | (siempre se da) |
| Curso de acercamiento | El curso con el que se llega a la estación |
| Sentido de los virajes | **Estándar (derecha)** |
| Fin del alejamiento | **1 minuto** |
| Altitud | La **última autorizada** |
| Velocidad máxima | Las **máximas OACI** |
| Hora de salida | Si aplica |

> EC-ABC, espere en CRISA, derrota de acercamiento 150 grados, viraje a la derecha, tiempo de alejamiento 1 minuto, 5 000 pies, velocidad máxima 210 nudos.
