---
id: velocidades
num: 4
title: Bimotores y velocidades de referencia
icon: gauge
wiki: https://wiki.es.ivao.aero/books/piloto-privado-senior-spp/page/velocidades-de-referencia
---

## La aeronave del examen

La prueba práctica SPP se vuela con un **bimotor CS-23** (certificación EASA): hélice o turbohélice, con MTOW de **8 618 kg**. Por su diseño, estos aviones tienen problemas de **controlabilidad con un motor parado**, y eso es lo que hay que dominar.

### Factores que afectan a las performances

- **Aeródromo**: elevación, pendiente y contaminación de la pista.
- **Meteorología**: temperatura, presión, precipitación, viento.
- **Aeronave**: peso bruto, centro de gravedad, flaps, sistemas (sangrado, packs, antihielo, antiskid…).

## Motor crítico

### Fuerzas de cada motor

Cada motor produce **tracción** (que con los dos se suma hacia delante) y una **corriente acelerada (propwash)** que pasa por el ala, el estabilizador y el timón, más fuerte cuanta más tracción.

Un motor parado genera **resistencia extra**, sobre todo si **no está abanderado**: el aire hace girar la hélice sin producir tracción (**efecto molinillo / windmilling**). La resistencia es mínima con la hélice **abanderada y parada**.

### Factor P

La **pala descendente** tiene más ángulo de ataque y produce más tracción, así que el punto de aplicación de la tracción no está en el buje sino desplazado hacia el lado de la pala que baja:

- Hélice que gira en **sentido horario** (vista desde atrás/arriba con el morro hacia delante) → tracción desplazada a la **derecha** del buje.
- Sentido **antihorario** → a la **izquierda**.

### Momentos sobre el CG

Cada tracción, multiplicada por su distancia al CG (brazo), crea un **momento**. Con los dos motores iguales funcionando los momentos casi se anulan.

| Motor izq. | Motor der. | Momento resultante |
|---|---|---|
| Horario | Horario | Desplazado a la **derecha** del CG → ligera guiñada a la **izquierda** |
| Antihorario | Antihorario | Desplazado a la **izquierda** → ligera guiñada a la **derecha** |
| Horario | Antihorario | **En el CG**: configuración ideal |
| Antihorario | Horario | En el CG |

### Fallo de motor: efectos

| Efecto | Se compensa con | Por qué |
|---|---|---|
| **Guiñada hacia el motor inoperativo** | **Timón**: pedal hacia el lado del **motor operativo** | El momento de tracción resultante se desplaza hacia el motor que funciona |
| **Alabeo hacia el motor inoperativo** | **Alerones** hacia el motor operativo | El ala del motor parado pierde el flujo acelerado (menos sustentación) y, en molinillo, tiene más resistencia |

### Qué motor es el crítico

> [!key] El **motor crítico** es aquel cuyo fallo afecta **más** a la controlabilidad (exige más timón y alerón). Es el que hace su tracción **más cerca del CG**: si falla, el otro tira desde más lejos y genera un momento mayor.

| Motor izq. | Motor der. | Motor crítico |
|---|---|---|
| Horario | Horario | **Izquierdo** |
| Antihorario | Antihorario | **Derecho** |
| Horario | Antihorario | **Ninguno** |
| Antihorario | Horario | **Ninguno** (pero peor controlabilidad que el caso anterior) |

![fig:motorcritico|Bimotor con ambas hélices girando en sentido horario: el izquierdo es el crítico]

Las performances y limitaciones se calculan siempre suponiendo que **falla el crítico** y el otro queda a **máxima potencia continua**.

## Velocidades con un motor parado

La controlabilidad depende de la **velocidad (CAS)**: por debajo de ciertas velocidades los mandos no tienen flujo suficiente para contrarrestar la guiñada y el alabeo con el motor operativo a máxima potencia continua.

| Velocidad | Significado |
|---|---|
| **VMCG** | Mínima de control direccional **en tierra** con el motor crítico inoperativo |
| **VMCA** | Mínima de control direccional **en el aire** con el crítico inoperativo y **alabeo máximo de 5°**. **Marca roja** en el anemómetro |
| **VYSE** | Mejor **régimen** de ascenso con el crítico inoperativo. **Marca azul** en el anemómetro |

### Qué hacer según cuándo falla

| Situación | Acción |
|---|---|
| En carrera **antes de VMCG** | Sin control direccional aerodinámico: **reducir la potencia del motor operativo** |
| Entre **VMCG y VMCA** | Control en tierra posible, pero hay que **acelerar hasta VMCA antes de rotar** |
| **Después de VMCA** | Controlable; en el aire mantener **más de VMCA** con potencia máxima continua y ascender a **VYSE** si se puede |
| En ascenso **por encima de VYSE** | **Decelerar a VYSE** (mejor régimen) |
| Motores a ralentí **por debajo de VMCA** | Controlable ahora, pero no si se mete potencia: **acelerar por encima de VMCA** antes de aplicar máxima continua |
| **Pérdida con potencia** | Vs < VMCA: tras el fallo **reducir la potencia del operativo** para mantener el control, acelerar a VMCA y luego subir potencia |

## Velocidades de referencia (V-speeds)

### Despegue

| Velocidad | Nombre | Definición |
|---|---|---|
| **VMCG** | Mínima de control en tierra | Control direccional en tierra con crítico inoperativo |
| **V1** | De decisión | Máxima a la que se debe iniciar la primera acción para **abortar** y poder parar dentro de la **ASDA** |
| **VMCA** | Mínima de control en el aire | Marca roja |
| **VR** | De rotación | Para levantar el morro |
| **V2** | De seguridad en despegue | Mínima que garantiza ascenso positivo con fallo de motor tras V1 |

### Ascenso

| Velocidad | Nombre | Definición |
|---|---|---|
| **VX** | Mejor **ángulo** | Más altura por **distancia** horizontal |
| **VXSE** | VX con motor inoperativo | |
| **VY** | Mejor **régimen** | Más altura por unidad de **tiempo** |
| **VYSE** | VY con motor inoperativo | Marca azul |

### Diseño

| Velocidad | Nombre | Definición |
|---|---|---|
| **VA** | De maniobra | Máxima a la que se pueden deflectar a tope los mandos sin daño estructural por factor de carga |
| **VNO** | De operación normal | Máxima en turbulencia en operación normal sin daño estructural |
| **VNE** | Nunca exceder | Máxima en aire en calma; por encima no se garantiza el control y puede haber daño estructural |
| **VS** | De pérdida | VS limpio; **VS0/VSL** en configuración de aterrizaje; VS1… según flaps |

### Aproximación y aterrizaje

| Velocidad | Nombre | Definición |
|---|---|---|
| **VMD** | Mínima resistencia | Velocidad de máximo planeo (menos altura perdida por distancia) |
| **VFE** | Flaps extendidos | Máxima con flaps (puede haber VFE0, VFE1…) |
| **VLO** | Tren operando | Máxima para **mover** el tren |
| **VLE** | Tren extendido | Máxima con el tren **fuera** |
| **VREF** | De referencia | Aproximación final = **1,3 × VS0** |
| **VMCL** | Mínimo control en aterrizaje | Control direccional en configuración de aterrizaje con crítico inoperativo |

### En el anemómetro

| Marca | Rango |
|---|---|
| **Arco blanco** | De **VSL (VS0)** a **VFE** |
| **Arco verde** | De **VS** a **VNO** |
| **Arco amarillo** | De **VNO** a **VNE** |
| **Línea roja** | **VNE** (y otra roja en **VMCA**) |
| **Línea azul** | **VYSE** |

![fig:anemometro|Marcas del anemómetro de un bimotor ligero]
