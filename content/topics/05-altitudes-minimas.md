---
id: altitudes-minimas
num: 5
title: Altitudes mínimas
icon: mountain
wiki: https://wiki.es.ivao.aero/books/piloto-privado-senior-spp/page/altitudes-minimas
---

## Para qué sirven

En IFR se vuela sin referencias visuales, a menudo de noche o con mal tiempo, y a veces fuera de los procedimientos publicados. Las altitudes mínimas persiguen uno o varios de estos objetivos:

- **Franqueamiento de obstáculos**: normalmente **1 000 ft** de margen; **1 500 o 2 000 ft** en terreno montañoso (donde el viento fuerte puede inducir errores de altímetro y problemas de control).
- **Cobertura CNS**: a baja altura puede perderse la radio, la radioayuda o el radar.
- **Compatibilidad con el espacio aéreo**.

## Resumen de altitudes

| Sigla | Nombre | Qué garantiza | Dónde aparece |
|---|---|---|---|
| **MHA** | Altitud mínima de espera | Señal de navegación, comunicaciones, obstáculos y espacio aéreo en la espera | Cartas con esperas (puede haber también máxima) |
| **MSA** | Altitud mínima del sector | **Solo obstáculos**, en un círculo de **25 NM (46 km)** + **5 NM** de margen alrededor de una radioayuda o del ARP | Cartas de aproximación (IAC) |
| **MVA / MRVA** | Altitud mínima de vectorización radar | Obstáculos (≥ 3 NM laterales), **cobertura radar y comunicaciones**; corregida por temperatura | AIP España: cartas **ATCSMAC** |
| **MOCA** | Altitud mínima de franqueamiento de obstáculos | **Solo obstáculos**: 1 000 ft (300 m), más en montaña, en un tramo | Rutas; puede dejar fuera de cobertura radar y de radioayudas |
| **MRA** | Altitud mínima de recepción | Recepción de las radioayudas del tramo | No todos los países la publican |
| **MEA** | Altitud mínima en ruta | La **mayor** de: MOCA, recepción de radioayudas, recepción de comunicaciones y estructura ATS | Cartas en ruta, AIP ENR 3, Insignia. **Obligatoria** |
| **MORA** | Altitud mínima fuera de ruta (Jeppesen) | Obstáculos a **10 NM** a cada lado de la aerovía (y 10 NM más allá de sus puntos) | Jeppesen |
| **Grid MORA / AMA** | Altitud mínima de área | Obstáculos dentro de una cuadrícula de paralelos y meridianos; **no** asegura comunicaciones ni navegación | AIP: cuadrícula de **medio grado** (SID/STAR, en ruta); Jeppesen: **un grado**. Valor en cientos de pies (**76 = 7 600 ft**) |
| **MCA** | Altitud mínima de cruce | Cruzar un punto pudiendo luego subir normalmente a la MEA siguiente | Cartas FAA (ej. `JESSY V231 13000N`) |

## MHA

La más baja prescrita para un circuito de espera que asegura señal de navegación, comunicaciones, obstáculos y espacio aéreo. Ejemplo del AIP: MHA 10 000 ft con máximo FL140. Al preparar el descenso, prever siempre una posible espera.

## MSA

> [!key] **MSA**: la altitud más baja que da protección frente a obstáculos dentro de un sector de un círculo de **25 NM (46 km)** centrado en una radioayuda (lo habitual) o en el **ARP** (sobre todo en aproximaciones RNP), con un **margen adicional de 5 NM**. No existe en OACI la expresión "altitud mínima de seguridad" como término definido.

- Puede tener **un solo sector** o **varios** para aprovechar terreno más bajo (ej. AGP: con un solo sector sería 9 000 ft, con cuatro hay zonas de 4 200 ft).
- Los sectores se delimitan por el **curso magnético de acercamiento** al punto de referencia; a veces también por distancias DME. También puede centrarse en un NDB.
- En aproximaciones RNP existe la **TAA** (Terminal Arrival Altitude), con varios puntos de referencia (IAF, IF): solo informativo, no evaluable en SPP.

**Cuándo usarla**: volando IFR en área terminal **fuera de un procedimiento publicado y sin vectores radar**, la MSA garantiza el franqueamiento. Solo se puede estar por debajo si se siguen las altitudes publicadas de la ruta o si el ATC asigna una altitud compatible con las MRVA.

## MVA / MRVA

Altitud más baja a la que un controlador radar puede autorizar cuando **vectoriza** o recorta la ruta. Otros nombres: **MFA**, **MRVA**, **ASMA**. En España se publican en las cartas **ATCSMAC** del AIP (ej. Tenerife: más altas cerca del terreno elevado).

- Tiene en cuenta obstáculos (con margen lateral de al menos **3 NM**, más si el sector está lejos del radar), **cobertura radar y de comunicaciones**, y se **corrige por temperatura** (con frío la altitud real es menor que la indicada).
- **Es habitual que la MVA sea inferior a la MSA.**

### Responsabilidades

> [!key] **Piloto**: responsable del franqueamiento de obstáculos **excepto cuando está siendo vectorizado** o recibe un directo asistido por radar. Si acepta un directo **sin servicio radar**, debe respetar la **MSA**. Debe vigilar su posición y la comunicación; si el ATC deja de dar instrucciones en un tiempo razonable o hay **fallo de comunicaciones** mientras le vectorizan, **subir de inmediato a la MSA**. Si cree que una altitud autorizada le pone en riesgo, avisar al ATC enseguida.

> [!key] **ATC**: sus objetivos **no incluyen** evitar colisiones con el terreno, pero al vectorizar fuera de ruta debe dar autorizaciones con franqueamiento en todo momento hasta que el piloto reanude su propia navegación, y puede asignar altitudes **por debajo de la MSA** si respetan la MVA.

## MOCA, MRA y MEA

- **MOCA**: solo obstáculos (1 000 ft / 300 m, más en montaña). Puede dejar a la aeronave por debajo de la cobertura radar y de la **MRA**. (En EE. UU. asegura además recepción VOR a 22 NM.) Siempre va asociada a una **MEA**.
- **MRA**: recepción de las radioayudas; cuanto más separadas, más alta.
- **MEA**: la más alta entre MOCA, recepción de navegación, de comunicaciones y estructura ATS. El piloto debe tratarla como **obligatoria**. En España: AIP **ENR 3** (ENR 3.1 aerovías convencionales, ENR 3.2 PBN; España está pasando a **RNAV 5**) e **Insignia** (capas Enroute → Rutas ATS).

## MORA, Grid MORA / AMA y MCA

- **MORA** (Jeppesen): obstáculos a 10 NM a cada lado de la aerovía.
- **Grid MORA** (Jeppesen) o **AMA** (OACI, AIP España): altitud mínima en IMC dentro de una cuadrícula. Útil si hay que salir de la aerovía (descenso de emergencia por despresurización, directo lejano). Revisarla en la planificación.
- **MCA**: altitud mínima para cruzar un punto al entrar o seguir por una aerovía, de modo que luego se pueda subir con normalidad a la MEA; hay que alcanzarla **antes** del punto. `JESSY V231 13000N` = en JESSY, aerovía V231, MCA 13 000 ft volando hacia el norte.
