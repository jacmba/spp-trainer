---
id: aproximaciones
num: 7
title: Aproximaciones instrumentales
icon: ils
wiki: https://wiki.es.ivao.aero/books/piloto-privado-senior-spp/chapter/aproximaciones-por-instrumentos
---

## Qué es una aproximación instrumental

Según el **Doc 8168 de OACI**, es una serie de maniobras predeterminadas por referencia a los instrumentos, con **protección específica frente a obstáculos**, desde el fijo de aproximación inicial (o el inicio de una llegada) hasta un punto desde el que se puede aterrizar, y, si no se aterriza, hasta una posición en espera o en ruta donde el franqueamiento esté asegurado.

## Segmentos

| Segmento | Desde → hasta | Para qué |
|---|---|---|
| **Inicial** | **IAF → IF** | Dejar la ruta/llegada y maniobrar hacia el intermedio |
| **Intermedio** | **IF → FAF/FAP** | Ajustar **velocidad y configuración**: pendiente lo más plana posible (ideal, nivelado) |
| **Final** | **FAF/FAP → pista** | Alineación y descenso final |
| **Frustrada** | Desde DA/H (3D) o MAPt a la MDA/H (2D) | Diseño sencillo (inicial, intermedio y final "transparentes"); **una sola** por procedimiento |

![fig:segmentos|Segmentos de una aproximación instrumental]

> [!key] No todas las aproximaciones tienen todos los puntos: una aproximación NDB puede no tener **IF ni FAF** porque un NDB solo no puede marcarlos. El punto más tardío para iniciar la frustrada es la **DA/H** (3D) o el **MAPt** a la **MDA/H** (2D).

## Clasificación

### Por procedimiento (Doc 8168)

| Procedimiento | Diseñado para |
|---|---|
| **NPA** (no precisión) | Operación **2D tipo A** |
| **APV** (con guiado vertical) | Procedimiento **PBN**, operación **3D tipo A** |
| **PA** (precisión): ILS, MLS, GLS, SBAS CAT I | Operación **3D tipo B** |

### Por guiado

- **2D**: solo guiado **lateral**.
- **3D**: guiado **lateral y vertical**.

A nivel operativo, esta clasificación 2D/3D es la más relevante.

### Por mínimos (Anexo 6)

| Tipo | DH o MDH |
|---|---|
| **A** | **≥ 250 ft** |
| **B** | **< 250 ft**: subdividido en **CAT I, II y III** |

> [!key] Los procedimientos convencionales (VOR/DME, NDB, LOC, ILS, MLS) solo pueden ser **NPA (tipo A, 2D)** o **PA (tipo B, 3D)**. En SPP se estudia a fondo el **ILS**; PBN, SBAS, GLS… son temario CP.

## ILS

El **Instrument Landing System** guía con precisión hacia la pista en los dos planos:

- **Localizador (LOC)**: guiado **horizontal**.
- **Senda de planeo (GS / glide slope)**: guiado **vertical**.
- Opcional: **DME** (distancia) y, en su ausencia, **radiobalizas OM, MM, IM**.

### Categorías

| Categoría | Altura de decisión | Visibilidad / RVR |
|---|---|---|
| **CAT I** | **≥ 200 ft** | Visibilidad ≥ 800 m o RVR ≥ 550 m |
| **CAT II** | **Hasta 100 ft** | RVR ≥ 300 m (CAT A, B, C) · ≥ 350 m (CAT D) |
| **CAT III A** | **< 100 ft** | RVR ≥ 200 m |
| **CAT III B** | **< 50 ft** | RVR ≥ 75 m |
| **CAT III C** | **Sin DH** | Sin RVR requerido |

### DA/H

**Decision Altitude/Height**: altitud o altura a la que hay que tener **contacto visual** con las referencias requeridas para continuar y aterrizar; si no, **frustrada**. Las referencias exigidas (y la iluminación) dependen de la categoría y se comprueban **antes** de iniciar la aproximación.

### RVR

**Runway Visual Range**: visibilidad que tendría el piloto desde la cabina alineado en la pista. La miden los **transmisómetros** (o difusómetros de dispersión frontal), situados en la zona de toma de contacto, cerca del eje y a veces en el centro de la pista. Se da en el **ATIS** cuando es relevante (visibilidad **< 2 000 m**, a menudo solo **< 1 500 m**) y en el **METAR**.

## Aproximaciones de no precisión

"Precisión" se refiere a la capacidad del sistema para llevar el avión **cerca y alineado** con la pista con meteorología marginal. Un ILS te deja alineado y cerca; una NPA **no siempre** está alineada con el eje o te deja más lejos y más alto.

- Ejemplo: la **VOR RWY 27 de Sevilla** tiene el curso final **desalineado** con la pista (indicado en la ficha).
- La **VOR B de Pamplona** tiene el MAPt bastante lejos de la cabecera.

En SPP **no** hay que saber volar aproximaciones que no sean ILS (es temario CP).

## Aproximación frustrada

### Cuándo frustrar

- Sin **autorización para aterrizar**.
- Objeto o riesgo en pista o en la senda (aeronave, vehículo, persona, aves).
- **No estabilizado** por debajo de **1 000 ft (IMC)** o **500 ft (VMC)**.
- Sin referencias visuales al llegar a la **DA/H, MDA/H o MAPt**.
- Toma pasada de la TDZ con pista insuficiente, o demasiado bajo cerca de tomar.
- **Lo instruye el ATC**.
- Cualquier situación en la que el piloto lo considere necesario.

### Cómo se hace

1. **Potencia de despegue** (o TO/GA con autothrottle).
2. **Retraer flaps** según el procedimiento del avión.
3. Con **ascenso positivo**, **tren arriba**.
4. Transición inmediata al **vuelo instrumental**.
5. Seguir la **frustrada publicada** en la IAC (perfil vertical y horizontal). Salvo indicación contraria, **rumbo de pista hasta pasar el umbral** y luego el perfil horizontal (excepto instrucción del ATC o procedimientos de paralelas).
6. **Notificar al ATC**.

(Tras una aproximación **visual** se puede frustrar e incorporarse al circuito.)

### En la carta

- Siempre en **líneas discontinuas**, con perfil horizontal, vertical y explicación escrita.
- Una línea perpendicular a un tramo significa **"al alcanzar"** (altitud, DME, radial…) y luego seguir la siguiente instrucción.
- Puede haber límites de velocidad (IAS MAX 210 kt) o distancia (no pasar de 15 DME).
- Suele terminar en una **espera**, a menudo sobre un IAF.
- Ej. ILS 24 Ibiza: rumbo **242** hasta **2 000 ft**, luego izquierda directo al NDB **IZA**. ILS 30 Valencia: restricción de velocidad y directo al NDB de Sagunto al llegar a **4,5 NM** del VOR VLC.

> [!key] La frustrada es **parte de la aproximación**: se prepara **antes del IAF** con un briefing, las radioayudas configuradas (NAV, ADF, rumbo en el HSI, altitud de frustrada) y los datos anotados. Garantiza obstáculos y no entrar en espacio aéreo peligroso.

### Aproximación estabilizada

| Criterio | Valor |
|---|---|
| Trayectoria | Sin desviaciones apreciables (**½ punto** en ILS; 0,1 XTK en RNAV) |
| Velocidad | Velocidad de aproximación final (margen típico −5 / +10 kt) |
| Configuración | Flaps finales y **tren abajo** |
| Checklist | Lista final completada |
| **Altura mínima de estabilización** | **1 000 ft** sobre el aeródromo en **IMC** · **500 ft** en **VMC** |

> [!key] Si no está estabilizado al llegar a esa altura (o por debajo), **frustrada siempre**.
