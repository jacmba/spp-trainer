---
id: navegacion
num: 6
title: Navegación IFR e interceptaciones
icon: compass
wiki: https://wiki.es.ivao.aero/books/piloto-privado-senior-spp/chapter/navegacion-general-ifr
---

## QDM, QDR, QUJ y QTE

En IFR se navega sin ver el terreno, solo con los instrumentos: hay que entender cómo presentan la información. Cuatro códigos Q describen direcciones entre aeronave y radioayuda:

| Código | Norte | Medido desde… hacia… |
|---|---|---|
| **QDM** | **Magnético** | **La aeronave → la radioayuda** |
| **QDR** | **Magnético** | **La radioayuda → la aeronave** |
| **QUJ** | Verdadero | La aeronave → la radioayuda |
| **QTE** | Verdadero | La radioayuda → la aeronave |

> [!key] QDM y QDR **no dependen del rumbo** de la aeronave (solo de su posición) y son siempre **recíprocos: difieren 180°**.

![fig:qdmqdr|QDM, QDR y radial]

## Curso deseado y radial

- **Curso**: dirección de un punto A a un punto B.
- **Curso deseado**: el curso por el que se quiere **entrar o salir** de la radioayuda. **No es un QDM.** Dice cómo navegar.
- **Radial**: dirección magnética que **sale** de un VOR. **Un radial es un QDR.** Dice dónde estás.

## Instrumentos

| Instrumento | Qué muestra | Cómo leer el radial |
|---|---|---|
| **RMI** | Rosa que gira con el rumbo + aguja: la **cabeza** marca el **QDM** y la **cola** el **QDR** | **Mirar la cola** |
| **CDI** | Curso seleccionado con el **OBS**, barra de desviación y bandera **TO/FROM**. **No indica el rumbo del avión** | Girar el OBS hasta centrar la barra **con bandera FROM**: el curso es el radial |
| **HSI** | Combina la rosa giratoria del RMI con la selección de curso, desviación y TO/FROM del CDI (a veces también selector de rumbo, "mosca") | Igual que el CDI |

> [!key] Escala del CDI: la deflexión máxima equivale a **10°**. Con **5 puntos**, cada punto = **2°**. Con **2 puntos** (HSI del G1000), cada punto = **5°**.

Ejemplo de HSI: alineado en el curso **195° con bandera TO** → estás en el **radial 015°** (el recíproco).

## Interceptaciones: las cuatro reglas

| | **Acercamiento** (inbound) | **Alejamiento** (outbound) |
|---|---|---|
| **Ruta directa** (diferencia < 90°) | **DC 30**: Deseada → Cabeza → **30°** más allá | **CD 45**: Cola → Deseada → **45°** más allá |
| **Ruta pasada** (diferencia > 90°) | **Rumbo radial**; al través de la estación, **1 minuto**; luego **90° hacia la estación** e interceptar | **Rumbo radial**; al través de la estación, **45° hacia la estación** e interceptar |

### Método en cinco pasos

1. **Interpretar la instrucción** y obtener el **curso deseado**. Si te piden acercarte **por un radial**, el curso deseado es su **recíproco** (radial 330 inbound → curso 150).
2. **¿Dónde estoy?** Leer **cabeza (QDM)** y **cola (QDR / radial)** en el RMI (o con el CDI).
3. **¿Ruta directa o pasada?** En acercamiento compara **cabeza y deseada**; en alejamiento, **cola y deseada**. Más de **90°** → ruta pasada.
4. **Aplicar la regla** y obtener el **rumbo de interceptación**.
5. **Volar, verificar e interceptar**: la aguja debe ir acercándose al curso; virar justo antes de que se alinee.

> [!key] Los 30° o 45° se suman **en el mismo sentido** en que se va de la primera a la segunda referencia. DC 30: si D = 030 y C = 070, rumbo = 070 + 30 = **100**; si D = 070 y C = 030, rumbo = 030 − 30 = **360**.

![fig:interceptacion|Ruta directa en acercamiento (DC 30)]

### Ejemplos resueltos

| Caso | Datos | Razonamiento | Rumbo |
|---|---|---|---|
| **Directa, acercamiento** | Cabeza 070 (cola 250). Interceptar curso de acercamiento **030** | Diferencia 40° < 90° → DC 30: 030 → 070 → +30 | **100** |
| **Directa, alejamiento** | Cabeza 140, cola 320. Alejarse por el **QDR 340** | Cola 320 vs 340 → 20° → CD 45: 320 → 340 → +45 | **025** |
| **Pasada, acercamiento** | CDI centrado **TO 290** (cabeza 290). Acercarse por el **radial 330** → curso 150 | 290 vs 150 = 140° > 90° → rumbo radial **330**; al través, 1 min; 90° hacia la estación | 330, luego viraje a cuchillo |
| **Pasada, alejamiento** | CDI centrado **TO 090** → cola 270. Alejarse por el **radial 030** | 270 vs 030 = 120° > 90° → rumbo radial **030**; al través, 45° hacia la estación | 030, luego 45° |

> [!key] En la ruta pasada en acercamiento, el último giro de 90° es una **"interceptación a cuchillo"**: el CDI se mueve rápido, hay que anticipar el viraje sin pasar de **30° de alabeo**. Al través de la estación es cuando la bandera cambia **FROM ↔ TO**.
