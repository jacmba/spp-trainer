---
id: cartas
num: 3
title: Interpretación de cartas IFR
icon: map
wiki: https://wiki.es.ivao.aero/books/piloto-privado-senior-spp/chapter/interpretacion-de-cartas-ifr
---

## Características generales

Saber leer las cartas es vital: contienen todo lo necesario para operar con seguridad. Hay varios originadores (los Estados en sus AIP, Jeppesen, Lido, Navblue…) y la presentación cambia algo entre ellos, así que conviene entender el **contenido** para leerlas rápido sea cual sea la fuente. Aquí se usan las del **AIP España**.

Elementos comunes (ejemplo: ILS Z 18L de Madrid):

- **Encabezado**: tipo de carta (p. ej. aproximación por instrumentos con criterios OACI), **elevación del aeródromo**, **variación magnética** y su fecha, **frecuencias** de voz, nombre del aeropuerto y procedimientos incluidos.
- **Vista en planta**: los procedimientos, con obstáculos, curvas de nivel, zonas P/R/D, fauna, campos de vuelo… Se indican las unidades y el **equipamiento adicional** requerido.
- **Perfil y pie de página**: notas, registro de cambios y fecha de entrada en vigor.

![wiki:https://wiki.es.ivao.aero/uploads/images/gallery/2024-09/scaled-1680-/wvTimage.png|Carta ILS Z 18L de Madrid (AIP)]

> [!key] El AIP español empieza a incluir valores de **MOCA** (en letras blancas sobre fondo gris) en rutas, llegadas, esperas y algunos tramos de aproximación. La **MOCA solo garantiza franqueamiento de obstáculos**: puede ser inferior a la altitud mínima publicada del procedimiento, que **sigue siendo la aplicable**.

Simbología: en el AIP España, **GEN 2.2** (abreviaturas) y **GEN 2.3** (símbolos de cartas). Para Jeppesen/Navigraph, sus guías "Introduction to Jeppesen Navigation Charts".

### Restricciones de altitud

| Restricción | Cómo se representa |
|---|---|
| **Ventana** | Dos valores, uno encima de otro, con línea encima del superior y debajo del inferior: entre ambos (p. ej. entre 10 000 y 17 000) |
| **Mínima** | Valor **subrayado** (línea debajo): a esa altitud **o superior** |
| **Máxima** | Valor con **línea encima**: a esa altitud **o inferior** |
| **Obligatoria** | Valor con línea **encima y debajo**: exactamente esa |
| **Recomendada** | Valor sin líneas: altitud recomendada del procedimiento |
| **Esperada** | "Expect 6000" / "Expect FL080" |

### AIP España vs Jeppesen

No hay una más correcta: muestran la misma información con distinto formato.

- Jeppesen pone el número de carta y la fecha de entrada en vigor **arriba**, junto al encabezado; el registro de cambios va **abajo**.
- Jeppesen incluye la **MSA** e información de terreno en más cartas; en el AIP la MSA está en las cartas de **aproximación (IAC)**.
- El AIP puede reunir todas las STAR de un aeropuerto en una carta (ej. LEST); Jeppesen las divide.
- En las SID suele darse la pendiente mínima también como **régimen de ascenso** (ft/min) según la velocidad sobre el suelo, más cómodo para el piloto.

## Carta de salida normalizada (SID)

Lo específico de una SID es la **pendiente de diseño del procedimiento (PDG)**.

> [!key] Si la SID no indica nada, la **PDG estándar es 3,3 %**. Si exige más, se indica: p. ej. la **FORNO2A de LEST** pide **4,3 % hasta 3 000 ft**. El piloto debe comprobar con el manual del avión (pendiente neta de ascenso, tablas de régimen en ft/min) que puede cumplirla.

## Carta de llegada normalizada (STAR)

Ejemplo: Santiago (LEST) en el AIP. Partes:

1. **Encabezado**.
2. **Perfil horizontal** (planta) y su **descripción escrita** en la página siguiente (útil para contrastar los puntos). Incluye **esperas** (por si el ATC las instruye) y **Altitudes Mínimas de Área (AMA)**, clave para la conciencia situacional.
3. **Pie de página**: fecha de entrada en vigor y ciclo AIRAC asociado (ej. 21-mar-2024, AIRAC 02/24) y número de carta (ej. STAR 1.1 de LEST). **Comprobarlos** para usar la carta vigente.
4. **Registro de cambios** (margen izquierdo).

> [!key] **Descender durante una STAR requiere autorización ATC.** Si se llega al **IAF sin autorización** para la aproximación, hay que hacer la **espera publicada**.

## Carta de aproximación por instrumentos (IAC)

Las más complejas.

### Designadores

Se componen de:

- **Aeropuerto**.
- **Sistema de guiado en final**: VOR, ILS, NDB, LOC, RNP, GLS…
- **Letra adicional** si hay varias aproximaciones con el mismo guiado a la misma pista: con mínimos de aproximación directa, la de **más ventajas operativas es Z**, luego Y, X, W…; si solo tienen mínimos de **circuito**, se usan **A, B, C…**
- **Pista**, solo si tiene mínimos de aproximación directa (las de circuito **no** llevan pista).

| Designador | Lectura |
|---|---|
| **LEMD ILS Z RWY 32L** | Hay varias ILS a la 32L; la Z es la preferente (mejores mínimos, radioayudas principales, IAF más adecuados…) |
| **LEGR VOR RWY 09** | Única aproximación VOR a la 09 (sin letra) |
| **LESO RNP Z RWY 22 (CAT A, B & C)** | Requiere RNP APCH; solo categorías A, B y C (no D ni E) |
| **LESO NDB A (CAT A & B)** | Guiado NDB con mínimos solo de **circuito** (letra A, sin pista); solo CAT A y B |

El designador solo dice el guiado en final: el **equipamiento adicional** requerido aparece en las **notas** de la carta. El piloto debe comprobar que su avión lo lleva.

### Planta y perfil

Se complementan: puede haber elementos solo en uno de los dos (p. ej. una marca a 13,5 DME ILS que solo aparece en el perfil). Las IAC también muestran la **altitud de transición**, limitaciones al circuito y la **MSA**.

### Mínimos: OCA/H, DA/H y MDA/H

| Mínimo | Definición |
|---|---|
| **OCA/H** – Obstacle Clearance Altitude/Height | La más baja (sobre umbral o aeródromo) que respeta el franqueamiento de obstáculos. **Es la que publican los Estados en el AIP.** |
| **MDA/H** – Minimum Descent Altitude/Height | En aproximación de **no precisión** o circuito: no se baja de ella sin referencias visuales |
| **DA/H** – Decision Altitude/Height | En aproximación **3D**: si no hay referencia visual, se inicia la frustrada |

> [!key] DA/H y MDA/H se obtienen **sumando márgenes a la OCA/H** y **nunca son inferiores a ella**. Ej.: la DH mínima de un ILS CAT I es **200 ft**; si la OCH es menor, la DH queda en 200 ft. Por eso el AIP (OCA/H) y Jeppesen (DA/H) pueden mostrar valores distintos. Para SPP basta con asumir OCA/H ≈ DA/H o MDA/H.
