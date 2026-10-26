# plan-de-vuelo

- Reglas: **I**, **V**, **Y = IFR→VFR**, **Z = VFR→IFR**. Tipo: **S** regular (o reservado en IVAO), **N** no regular, **G** general, **M** militar, **X** otros (escuela, pruebas).
- Equipamiento: **S** = VHF+ADF+VOR+ILS; **D** DME; **G** GNSS; **R** RNAV; **W** RVSM; **Y** 8,33 kHz; **Z** otro → COM/ NAV/ DAT/ en casilla 18; **J** data link (indicar tipo).
- Velocidad y nivel de crucero **INICIALES**; en Europa velocidad en **N (nudos TAS)**. A050 = 5 000 ft; F080 = FL80.
- Ruta = puntos y aerovías alternos (`CENTA A33 TURIA`, `SVL DCT CCS`). Directos como último recurso, **≤ 30 min o 200 NM**. Cambios en ruta: `VASTO/N454F360` (obligatorios).
- Alternativo: suficientemente cerca y, si se puede, fuera del mismo mal tiempo; no tiene que estar en ruta.
- Casilla 18: **EET/** (entradas en FIR), **REG/** (obligatorio si no va en el indicativo), OPR/, COM/, NAV/, RALT/, RMK/. "IFPS reroute accepted" y DOF/ no aportan en IVAO.
- Examen: **EET y autonomía precisas**, sin tiempo extra.

# esperas

- **Espera** = retrasar en un espacio protegido (ATC o tripulación). **Hipódromo** = parte de la aproximación inicial para descender/alinearse.
- **Estándar = virajes a la derecha**; no estándar = izquierda. En SPP: **solo esperas sobre VOR** y **solo entrada directa**.
- **Único tramo de precisión: el de acercamiento** (curso de acercamiento vs rumbo de alejamiento).
- Área tope = **5 NM** más. **MHA**: ≥ 1 000 ft (llano) / 2 000 ft (montaña).
- Velocidad máxima: **≤ 14 000 ft 230 kt** (CAT A/B 170, turbulencia 280) · **14 001–20 000 240 kt** · **20 001–34 000 265 kt** · **> 34 000 M0,83**.
- Alejamiento: **1 min ≤ 14 000 ft**, **1,5 min > 14 000 ft**; empieza **al través del fijo o al acabar el viraje, lo más tarde**.
- Virajes a **3°/s**, máx. **25°** de alabeo. Sin corrección de viento en SPP.
- Sectores: **1 paralela (110°)**, **2 gota (70°)**, **3 directa (180°)**; ±5° de flexibilidad; preferir directa a paralela y gota a las demás.
- Regla de la mano: índice en el rumbo al fijo; derecha: O en [H−110, H] paralela, [H, H+70] gota; izquierda: [H, H+110] paralela, [H−70, H] gota; resto directa.
- Espera no publicada, por defecto: curso = el de llegada, **virajes a la derecha**, **1 min**, **última altitud autorizada**, velocidades OACI.

# cartas

- Encabezado: tipo, **elevación**, **variación magnética**, frecuencias, procedimiento. Simbología AIP: **GEN 2.2 y 2.3**.
- **MOCA** = solo obstáculos; manda la altitud del procedimiento.
- Restricciones: **subrayada = mínima**, **línea encima = máxima**, **ambas = obligatoria**, ventana = dos valores, sin líneas = recomendada, "Expect".
- SID: **PDG estándar 3,3 %**; si no, se publica (FORNO2A LEST: **4,3 % hasta 3 000 ft**).
- STAR: **descender requiere autorización**; en el **IAF sin autorización → espera publicada**. Comprobar fecha/AIRAC y número de carta.
- Designador IAC: guiado + letra (**Z = más ventajas**, Y, X…; circuito **A, B, C** y **sin pista**) + pista. Equipamiento extra en las notas.
- **OCA/H** (AIP) ≤ **DA/H** (3D) / **MDA/H** (2D); DH mínima ILS CAT I **200 ft**.

# velocidades

- Examen con **bimotor CS-23** (MTOW 8 618 kg).
- **Factor P**: la pala descendente tira más; giro horario → tracción a la derecha del buje.
- Fallo de motor: **guiñada y alabeo hacia el motor parado** → timón y alerones **hacia el motor operativo**. Abanderar para evitar el **molinillo**.
- **Motor crítico** = el que tira más cerca del CG. Ambas horarias → **izquierdo**; ambas antihorarias → **derecho**; contrarrotatorias → **ninguno**.
- **VMCG** (control en tierra), **VMCA** (control en el aire, ≤ 5° de alabeo, **línea roja**), **VYSE** (mejor régimen con un motor, **línea azul**).
- Fallo antes de VMCG → reducir el motor bueno; entre VMCG y VMCA → acelerar a VMCA antes de rotar; en ascenso → VYSE.
- V1 (decisión, parar en ASDA), VR, V2 (seguridad); VX ángulo, VY régimen; VA maniobra, VNO, VNE; VFE, VLO (mover tren), VLE (tren fuera); **VREF = 1,3 × VS0**.
- Arcos: **blanco VS0–VFE**, **verde VS–VNO**, **amarillo VNO–VNE**.

# altitudes-minimas

- Márgenes de obstáculos: **1 000 ft**; montaña 1 500–2 000 ft.
- **MSA**: obstáculos, **25 NM + 5 NM**, sectores por curso de acercamiento; en la IAC. Fuera de procedimiento y sin vectores → respetar MSA.
- **MVA/MRVA** (ATCSMAC en España): obstáculos + radar + comunicaciones, corregida por temperatura; suele ser **menor que la MSA**.
- **MOCA** (solo obstáculos) · **MRA** (recepción) · **MEA** = la mayor de todo (obligatoria) · **MORA** (10 NM) · **Grid MORA/AMA** (cuadrícula; 76 = 7 600 ft) · **MCA** (cruce para subir a la MEA).
- Piloto responsable del terreno salvo **vectorizado**; fallo de comunicaciones vectorizado → **subir a la MSA**.

# navegacion

- **QDM** = magnético aeronave→estación; **QDR** = estación→aeronave; recíprocos (180°). **Radial = QDR**. QUJ/QTE = verdaderos.
- **RMI**: cabeza QDM, **cola = radial**. **CDI/HSI**: centrar con **FROM** → radial. TO 195 centrado → radial **015**.
- CDI: deflexión máx. **10°**; 5 puntos → 2°/punto; 2 puntos → 5°/punto. El CDI no da el rumbo.
- Reglas: acercamiento directa **DC 30**; alejamiento directa **CD 45**; acercamiento pasada: rumbo radial, al través **1 min**, **90°** hacia la estación; alejamiento pasada: rumbo radial, al través **45°** hacia la estación.
- Pasada si la diferencia (cabeza–deseada o cola–deseada) es **> 90°**.
- "Acercarse por el radial X" → curso deseado = **X ± 180**.

# aproximaciones

- Segmentos: **inicial IAF→IF**, **intermedio IF→FAF** (velocidad y configuración), **final**, **frustrada** (una por procedimiento).
- NPA = 2D tipo A · APV = PBN 3D tipo A · PA = 3D tipo B. **Tipo A: DH/MDH ≥ 250 ft; tipo B < 250 ft (CAT I, II, III)**.
- ILS = **LOC** (horizontal) + **GS** (vertical) + DME o balizas OM/MM/IM.
- **CAT I ≥ 200 ft** (vis 800 m / RVR 550 m) · **CAT II ≥ 100 ft** (RVR 300/350 m) · **III A < 100 ft** (RVR 200) · **III B < 50 ft** (RVR 75) · **III C** sin límites.
- RVR por transmisómetros; en el ATIS si vis < 2 000 m (a menudo < 1 500 m).
- Frustrada: potencia, flaps, **ascenso positivo → tren arriba**, instrumentos, **frustrada publicada** (rumbo de pista hasta el umbral salvo indicación), notificar. Prepararla **antes del IAF**.
- Estabilizada a **1 000 ft IMC / 500 ft VMC**: senda (½ punto), velocidad, flaps, tren, checklist. Si no → frustrada.

# reglas-ifr

- IFR en controlado: autorización, plan de vuelo, informes, comunicación bidireccional. En F/G: escucha y FIS.
- Altitud mínima sin publicación: **2 000 ft** sobre el obstáculo más alto en **8 km** (montaña) / **1 000 ft** en el resto. Sin altitud máxima (FL660 típico).
- Crucero IFR en miles enteros; **semicircular: 000–179 impares, 180–359 pares** (VFR +500).
- Cancelar IFR: "**cancelo mi vuelo IFR**", solo si se prevé seguir en VMC.
- Fallo de comunicaciones: **7600**; IFR mantiene nivel/velocidad **20 min**, luego plan de vuelo; descenso hacia la **EAT**/ETA; **aterrizar en 30 min**. IFR en VMC que decide aterrizar: **7601**. El procedimiento SID/STAR específico prevalece.
- TAS ≈ IAS + 2 % por 1 000 ft; GS = TAS ± viento.

# examen

- **PP + 2 meses**, **100 h**.
- Teoría primero: si suspendes VMCA/VYSE/VS/motor crítico, no hay práctica.
- Bimotor IFR con **2 VOR, 1 ILS, 1 ADF, 1 DME**; vuelo de al menos **50 NM**.
- Evalúa: FPL, salida, ruta, interceptaciones, llegada, **espera VOR (entrada directa)**, **ILS**, **motor y al aire**, fraseología con parte en inglés.
- No evalúa: inversiones, hipódromos, arcos DME, viento en espera.
- Suspenso: sin cartas, **2 intentos fallidos de interceptación**, aproximación sin autorización, mal ILS, **bajar de la altitud mínima**, **level bust**, pausar el simulador, zona P, colisión.
