---
id: reglas-ifr
num: 8
title: Reglas de vuelo por instrumentos
icon: rules
wiki: https://wiki.es.ivao.aero/books/piloto-privado-senior-spp/page/reglas-de-vuelo-por-instrumentos
---

## Qué son las IFR

Las **reglas de vuelo por instrumentos** permiten operar con seguridad usando solo la información de los instrumentos. Se puede volar IFR **también en VMC**: es una elección de la tripulación.

## Requisitos

La aeronave debe llevar los **instrumentos y equipos de navegación** adecuados a la ruta. En espacio aéreo controlado, un IFR debe:

- Cumplir la **autorización ATC**.
- Cumplir el **plan de vuelo**.
- Dar **informes de posición** cuando sea necesario.
- Mantener **comunicación bidireccional** con la dependencia ATC.

| Espacio | Exigencias |
|---|---|
| **Controlado** (total o parcialmente) | **Autorización ATC**; escucha continua de voz y comunicación bidireccional |
| **No controlado (F y G)** | Mantener **escucha** en la frecuencia apropiada y comunicación bidireccional, según sea necesario, con quien preste **FIS** |

> [!ivao] En IVAO, algunas posiciones dan información de vuelo fuera de su área controlada; por ejemplo, las **_FSS** son no controladas y prestan FIS en su zona. En oceánico, el **SELCAL** cumple el requisito de escucha.

## Restricciones de nivel

### Altitud mínima

Salvo despegue, aterrizaje o permiso de la autoridad, todo IFR vuela:

1. **No por debajo de la altitud mínima publicada** por la normativa local (cartas).
2. Si no hay una publicada, en **zona montañosa**: al menos **2 000 ft (600 m)** sobre el obstáculo más alto en un radio de **8 km** de su posición estimada.
3. Si no hay una publicada, **en el resto**: al menos **1 000 ft (300 m)** sobre el obstáculo más alto en **8 km**.

**No hay altitud máxima** IFR; el nivel controlado máximo suele ser **FL660**.

### Niveles de crucero

> [!key] En crucero IFR: altitudes que terminan en **000** (5 000, 6 000 ft…) y niveles que terminan en **0** (FL50, FL60…), eligiendo según la **regla semicircular** por la derrota.

| Derrota magnética | Niveles IFR (por debajo de FL290 / tabla RVSM) |
|---|---|
| **000° – 179°** (hacia el este) | **Impares**: FL50, 70, 90, 110…, 270, 290, 310…, 410 |
| **180° – 359°** (hacia el oeste) | **Pares**: FL40, 60, 80, 100…, 280, 300, 320…, 400 |

Los VFR usan los mismos criterios **+500 ft** (FL55, FL65…). *La wiki remite a la documentación de reglas semicirculares; esta tabla es la regla OACI/RVSM general que aplica en España.*

## Cancelar el IFR

Si un IFR entra en VMC, **no cancela** salvo que prevea continuar un tiempo razonable en **VMC ininterrumpidas**. Para pasar a VFR:

- Notificar explícitamente: **"CANCELO MI VUELO IFR / CANCELLING MY IFR FLIGHT"**.
- Comunicar al ATC los cambios en el plan de vuelo.

**El IFR es obligatorio** por debajo de las mínimas VMC (5 km / 8 km sobre FL100, 1 500 m y 1 000 ft de nubes; ver mínimas VFR del rango PP).

## Fallo de comunicaciones (SERA.14083, desde 1-may-2025)

**Antes**: comprobar que el fallo es real (conexión de cascos, volumen y sensibilidad del micrófono) e intentar contactar con la dependencia anterior, otras dependencias o aeronaves por todos los medios (data link, satélite, móvil).

| Situación | Procedimiento |
|---|---|
| **General** | Transpondedor **7600** en modo A (o ADS-B indicando fallo) |
| **En el circuito de aeródromo** | Esperar **señales visuales** |
| **VFR** | Seguir en **VMC**, aterrizar en el aeródromo adecuado **más cercano** y avisar a la dependencia ATS cuanto antes |
| **IFR** | Ver abajo |
| **IFR que está en VMC** y decide aterrizar | **7601** en modo A, aterrizar en el aeródromo adecuado más cercano y avisar cuanto antes |
| **SID/STAR con procedimiento propio de fallo** | **Prevalece** sobre lo general |

**IFR con fallo de comunicaciones:**

1. Mantener **la última velocidad y nivel asignados** (o la altitud mínima si es mayor) durante **20 minutos** desde que pone el **7600** o desde la última notificación fallida.
2. Después, ajustar nivel y velocidad al **plan de vuelo**.
3. Si estaba **vectorizado** o con offset RNAV: con límite de autorización, seguir hasta él y retomar la ruta; o retomar la ruta **antes del siguiente punto significativo**.
4. Seguir la ruta hasta el fijo que sirve al aeródromo de destino.
5. Iniciar el descenso lo más cerca posible de la **EAT** (si la tiene) o de la **hora prevista de llegada**.
6. Hacer la aproximación instrumental y **aterrizar en los 30 minutos** siguientes a esa hora.

## Instrumentos y estimación de velocidades

El examen pregunta por el funcionamiento de los instrumentos básicos, el calaje del altímetro y la **estimación de TAS y GS**. Reglas prácticas habituales (no vienen en la wiki del SPP):

- **TAS ≈ IAS + 2 % por cada 1 000 ft** de altitud. Ej.: 150 kt IAS a 8 000 ft → ≈ 150 × 1,16 ≈ **174 kt TAS**.
- **GS = TAS ± componente de viento** (cola suma, cara resta).
- Calaje: **QNH** por debajo de la TA, **1013** por encima del TL (ver el rango ADC/PP).
