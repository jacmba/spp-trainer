---
id: plan-de-vuelo
num: 1
title: Plan de vuelo IFR (FPL)
icon: clipboard
wiki: https://wiki.es.ivao.aero/books/piloto-privado-senior-spp/chapter/plan-de-vuelo-presentado
---

## El plan de vuelo IFR

El plan de vuelo ya se conoce desde PP; lo nuevo en SPP es hacer **un plan IFR bien hecho**. Los errores típicos son tres: una ruta mal preparada o sin validar (nunca vista antes), equipamiento mal marcado y una casilla de observaciones recargada o con información inventada.

![wiki:https://wiki.es.ivao.aero/uploads/images/gallery/2024-09/scaled-1680-/v2Cimage.png|Formulario de plan de vuelo de IVAO]

## Casilla a casilla

### 7 – Indicativo

Igual que en PP: designador OACI del operador + número de vuelo, o la matrícula.

### 8 – Reglas y tipo de vuelo

| Reglas | Significado |
|---|---|
| **I** | Todo el vuelo IFR |
| **V** | Todo el vuelo VFR |
| **Y** | Empieza **IFR** y en un punto pasa a **VFR** |
| **Z** | Empieza **VFR** y en un punto pasa a **IFR** |

Y y Z se usan sobre todo cuando un aeródromo no admite una de las dos reglas. Ejemplos: salir de Cuatro Vientos en VFR y pasar a IFR camino de Valencia (**Z**); o salir de Sevilla en VFR, unirse a una aerovía en IFR y llegar a Barajas, donde no se admite VFR (**Z** también).

| Tipo | Uso en IVAO |
|---|---|
| **S** | Regular: simulación de vuelos regulares reales o vuelo reservado en el sistema de reservas de IVAO |
| **N** | No regular (chárter) |
| **G** | Aviación general |
| **M** | Militar |
| **X** | Otros (escuela, pruebas…) |

### 10 – Equipamiento

Uno de los apartados con más fallos en IFR.

| Letra | Equipo | Letra | Equipo |
|---|---|---|---|
| **S** | Estándar: VHF + ADF + VOR + ILS | **R** | RNAV (RNP/RNPC) |
| **A / C** | LORAN A / C | **P** | RNAV de precisión |
| **D** | DME | **T** | TACAN |
| **E** | EGPWS | **U** | UHF RTF |
| **F** | ADF | **V** | VHF |
| **G** | GPS/GNSS | **W** | **RVSM** |
| **H** | HF RTF (p. ej. control oceánico) | **X** | MNPS |
| **I** | Inercial (INS) | **Y** | Radio con separación de **8,33 kHz** |
| **J** | Data link | **Z** | Otro equipo: detallarlo en la casilla 18 con COM/, NAV/ o DAT/ |
| **K** | MLS | **L / O** | ILS / VOR |
| **M** | Omega | | |

Notas útiles:

- Si se marca **S**, no hace falta marcar F, L, O ni V por separado.
- Si se marca **J** (data link), hay que indicar en la casilla 18 qué tipo (VHF, UHF, satélite).
- **X (MNPS)**: en IVAO todos los aviones con techo por encima de FL290 pueden volar RVSM, salvo un fallo que impida cumplir las MNPS. No hace falta poner COM/TCAS.

### 15 – Velocidad, nivel y ruta

- **Velocidad de crucero INICIAL**: **N** (nudos TAS), **M** (Mach) o **K** (km/h). En Europa se usa **N, en TAS**.
- **Nivel de crucero INICIAL**: **F** (nivel de vuelo), **A** (altitud en cientos de pies: A050 = 5 000 ft), S/M (métrico), o **VFR** si no se va a mantener un nivel constante.

**La ruta** alterna puntos y aerovías: el punto es el destino y lo que hay entre medias dice cómo se llega.

| Ruta | Significado |
|---|---|
| `CENTA A33 TURIA` | De CENTA por la aerovía A33 hasta TURIA (siguiendo sus cambios de rumbo) |
| `SVL DCT CCS DCT ZMR` | Directo del VOR de Sevilla al de Cáceres y luego al de Zamora |
| `CENTA A33 VLC DCT ALT` | Combinación de aerovía y directo |
| `VASTO/N454F360` | En VASTO cambia a 454 kt TAS y FL360 |

> [!key] Si hay aerovía, se usa: el **directo es la última opción**, y como norma no debe superar **30 minutos de vuelo o 200 NM** (lo menor). Los **cambios de nivel o velocidad en ruta** (step climb, cambio par/impar, restricciones de aerovía) se indican con **PUNTO/velocidad+nivel** y son obligatorios para que la ruta valide.

Dentro de Europa, la ruta se valida con el validador del CFMU de Eurocontrol; fuera, hay que buscar una ruta real válida o construirla con cuidado (no hay validador).

### 16 – EET y alternativo

- **EET total**: duración estimada del vuelo.
- **Alternativo**: aeródromo al que ir si no se puede aterrizar en destino (salvo emergencias). Debe tener dimensiones suficientes, estar lo bastante **cerca** para llegar pronto y, si es posible, lo bastante **lejos** como para que el mal tiempo no afecte a ambos. No tiene que estar en la ruta: en un LEBL–LEMD, LEVC sirve como alternativo.

### 18 – Otros datos (observaciones)

Información necesaria que no cabe en otras casillas, breve y sin inventar. En este orden:

| Indicador | Contenido |
|---|---|
| **EET/** | Tiempo estimado hasta el punto de entrada en cada FIR (no entre LECM y LECB, ni LECS, que es subdivisión de LECM) |
| **REG/** | Matrícula si no va en el indicativo (**obligatorio**) |
| **SEL/** | Código SELCAL (rango CP) |
| **OPR/** | Operador, si no se deduce del indicativo |
| **COM/ NAV/** | Equipo no recogido en la casilla 10 (habiendo marcado Z) |
| **RALT/** | Alternativo en ruta |
| **RMK/** | Otra información en lenguaje claro (p. ej. `RMK/CALLSIGN XYZ`) |

- **"IFPS REROUTE ACCEPTED"** (o "IFPS changes accepted") en la realidad permite a Eurocontrol corregir la ruta; **en IVAO no tiene sentido**.
- **DOF/** (fecha del vuelo) tampoco hace falta en IVAO.

### 19 – Autonomía

**Endurance**: tiempo total que el avión puede estar en el aire hasta quedarse sin combustible.

> [!key] En el examen, la **EET** y la **autonomía** deben ser **precisas**, y la EET **no** debe incluir tiempo extra para los ejercicios del examen.
