import { Concept } from '../types';

export const concepts: Concept[] = [
  // ==========================================
  // 1. PHYSICS
  // ==========================================
  {
    id: 'ohms-law',
    title: "Ohm's Law: Voltage, Current, and Resistance",
    subjectId: 'physics',
    subjectName: 'Physics',
    category: 'Engineering',
    difficulty: 'Beginner',
    readingTime: '6 min read',
    shortDescription: 'The foundational electrical relationship between electric potential, electron flow rate, and circuit resistance.',
    learn: {
      definition: "Ohm's Law states that the electric current flowing through a conductor between two points is directly proportional to the voltage across the two points and inversely proportional to the resistance of the conductor.",
      textbookExplanation: "In any direct-current electrical circuit, voltage (V) acts as the driving electrical pressure or force pushing electrons. Current (I) is the actual flow rate of electrical charge (Coulombs per second, or Amperes). Resistance (R) measures the opposition a material exerts against this electron flow. As voltage rises with constant resistance, current surges proportionally. Conversely, if resistance doubles while voltage remains fixed, current is halved.",
      keyTerms: [
        { term: 'Voltage (V)', definition: 'Electric potential difference measured in Volts (V); the push moving electrons.' },
        { term: 'Current (I)', definition: 'The rate of electrical charge flow measured in Amperes (A), where 1 A = 1 Coulomb/second.' },
        { term: 'Resistance (R)', definition: 'Opposition to charge movement measured in Ohms (Ω), governed by material resistivity, length, and cross-section.' }
      ],
      formula: 'I = \\frac{V}{R} \\quad \\iff \\quad V = I \\times R \\quad \\iff \\quad R = \\frac{V}{I}',
      formulaExplanation: 'Where I is current in Amperes (A), V is potential difference in Volts (V), and R is resistance in Ohms (Ω).',
      workedExample: {
        problem: 'A smartphone fast-charging brick supplies a constant voltage of 5.0 V across an internal diagnostic resistor of 2.5 Ω. Calculate the current delivered to the load.',
        solution: 'I = 5.0 V / 2.5 Ω = 2.0 A (Amperes)',
        steps: [
          'Identify known quantities: Voltage V = 5.0 V, Resistance R = 2.5 Ω.',
          'Recall Ohm’s Law rearranged for current: I = V / R.',
          'Substitute values: I = 5.0 / 2.5 = 2.0.',
          'Append correct electrical units: 2.0 Amperes (A).'
        ]
      },
      keyTakeaways: [
        'Higher voltage produces higher current if resistance remains unchanged.',
        'Higher resistance chokes current down for any given fixed voltage source.',
        'Short circuits occur when R approaches zero, causing massive dangerous current spikes.'
      ]
    },
    connect: {
      realWorldSummary: "From smartphone thermal throttlers to household dimmer switches and surge fuses, Ohm's Law governs modern electrical engineering.",
      examples: [
        {
          title: 'Smartphone Fast-Charging & Thermal Throttling',
          context: 'When your phone charges rapidly, battery management chips adjust internal resistance and voltage steps to prevent excessive current that could overheat the lithium-ion cells.',
          whyItMatters: 'Applying Ohm’s Law keeps your battery healthy without causing hazardous thermal runaways.',
          badge: 'Consumer Electronics'
        },
        {
          title: 'Household Light Dimmers & Potentiometers',
          context: 'Rotating a manual room light dimmer increases the circuit’s variable resistance. Because the house mains voltage stays fixed at 120V/240V, increasing resistance reduces current, dimming the filament.',
          whyItMatters: 'Provides convenient control over room illumination and reduces domestic electrical consumption.',
          badge: 'Home Automation'
        },
        {
          title: 'Automotive Headlights and Blown Fuses',
          context: 'Car electrical harnesses operate on 12V DC batteries. A 4-ohm headlight draws 3A. If insulation wears out and wires touch chassis ground with near-zero resistance, current spikes past 100A, instantly melting the safety fuse to prevent engine bay fires.',
          whyItMatters: 'Fuses are deliberate sacrificial weak points designed using Ohm’s Law to avert catastrophes.',
          badge: 'Automotive Safety'
        }
      ],
      diagramType: 'circuit-diagram'
    },
    apply: {
      problemStatement: "A USB-powered portable cooling fan requires a current of 0.5 A to spin at normal speed. If connected to a standard 5.0 V USB-A port, what must its total internal motor circuit resistance be?",
      scenario: 'You are designing a miniature personal desk fan powered by a computer port. You need to verify that the motor winding and resistor combo will safely operate without pulling overcurrent.',
      questionType: 'multiple-choice',
      options: [
        { id: 'opt1', text: '2.5 Ω', isCorrect: false, feedback: 'Incorrect: 5.0 V / 2.5 Ω would produce 2.0 A, which would overload the fan motor.' },
        { id: 'opt2', text: '10.0 Ω', isCorrect: true, feedback: 'Correct! Using R = V / I = 5.0 V / 0.5 A = 10.0 Ohms.' },
        { id: 'opt3', text: '0.1 Ω', isCorrect: false, feedback: 'Incorrect: 0.1 Ω would draw 50 A, causing a short circuit.' },
        { id: 'opt4', text: '25.0 Ω', isCorrect: false, feedback: 'Incorrect: 25.0 Ω would restrict current down to 0.2 A, causing the fan to stall.' }
      ],
      explanation: 'Using the algebraic rearrangement R = V / I, divide the source voltage (5.0 V) by the required target current (0.5 A) to obtain 10.0 Ω.'
    },
    simulationId: 'ohms-law',
    relatedConceptIds: ['mechanical-levers', 'household-energy-calc', 'binary-search']
  },
  {
    id: 'newtons-third-law',
    title: "Newton's Third Law: Action and Reaction Forces",
    subjectId: 'physics',
    subjectName: 'Physics',
    category: 'Everyday Science',
    difficulty: 'Beginner',
    readingTime: '5 min read',
    shortDescription: 'Every physical interaction involves matched action-reaction pairs acting on opposite bodies.',
    learn: {
      definition: 'For every action force exerted by body A on body B, there exists an equal in magnitude, opposite in direction reaction force exerted simultaneously by body B on body A.',
      textbookExplanation: 'Forces never exist in isolation; they always occur in matched interaction pairs. Crucially, the action and reaction forces act on different objects, meaning they do not cancel each other out on a single free-body diagram.',
      keyTerms: [
        { term: 'Action-Reaction Pair', definition: 'Simultaneous, equal-magnitude forces acting on two mutually interacting objects.' },
        { term: 'Normal Force', definition: 'The perpendicular contact force exerted by a solid surface back against an object resting on it.' }
      ],
      formula: '\\vec{F}_{A \\to B} = -\\vec{F}_{B \\to A}',
      formulaExplanation: 'Force exerted by A onto B is vectorially opposite and equal in scalar size to force exerted by B onto A.',
      workedExample: {
        problem: 'A 70 kg sprinter pushes backward on the starting blocks with a horizontal force of 450 N. What force do the starting blocks exert on the sprinter?',
        solution: 'The starting blocks exert exactly 450 N in the forward direction on the sprinter.',
        steps: [
          'Sprinter applies 450 N backward on blocks.',
          'By Newton’s Third Law, blocks push forward on sprinter with identical magnitude 450 N.',
          'This forward ground force accelerates the sprinter down the track.'
        ]
      },
      keyTakeaways: [
        'Action and reaction forces act on distinct bodies, which is why movement occurs.',
        'Rockets do not need air to push against; they push against their own expelling exhaust gas.'
      ]
    },
    connect: {
      realWorldSummary: 'Rocket propulsion in the vacuum of deep space and human walking on pavement rely directly on reactive force pairs.',
      examples: [
        {
          title: 'Space Rocket Propulsion in Vacuum',
          context: 'Rockets burn propellant and forcefully expel high-velocity gas exhaust backward through the nozzle. The reaction force pushes the rocket vehicle forward, allowing propulsion without any surrounding atmosphere.',
          whyItMatters: 'Enables satellite launches and interplanetary space exploration.',
          badge: 'Aerospace'
        },
        {
          title: 'Swimming and Kayak Paddling',
          context: 'When paddling, you push gallons of water backward with your oar blade. The water pushes back forward against the blade with equal force, propelling your boat across the lake.',
          whyItMatters: 'Explains fluid locomotion across nature and human watercraft.',
          badge: 'Biomechanics'
        }
      ]
    },
    apply: {
      problemStatement: 'When you step out of a small unanchored rowboat onto a dock, why does the rowboat slide backward away from the dock?',
      scenario: 'You are docking after a morning fishing trip and attempt to step firmly onto the wooden pier.',
      questionType: 'multiple-choice',
      options: [
        { id: 'opt1', text: 'Because your feet push the boat backward while the boat pushes your body forward.', isCorrect: true, feedback: 'Correct! Your foot applies a backward action force to the boat floor to propel your torso forward.' },
        { id: 'opt2', text: 'Because gravity pulls the boat away from high docks.', isCorrect: false, feedback: 'Incorrect: Gravity acts downward toward Earth center.' },
        { id: 'opt3', text: 'Because water currents always pull floating vessels outward.', isCorrect: false, feedback: 'Incorrect: The movement occurs even in dead-calm indoor pools.' }
      ],
      explanation: 'To move forward onto the dock, your leg exerts a backward force against the boat. Because the water offers little friction to the hull, the boat accelerates backward.'
    },
    relatedConceptIds: ['ohms-law', 'mechanical-levers']
  },
  {
    id: 'total-internal-reflection',
    title: 'Total Internal Reflection & Fiber Optics',
    subjectId: 'physics',
    subjectName: 'Physics',
    category: 'Technology',
    difficulty: 'Intermediate',
    readingTime: '7 min read',
    shortDescription: 'How light rays trap completely inside transparent media to transmit terabits of global internet data.',
    learn: {
      definition: 'Total Internal Reflection (TIR) occurs when a light wave traveling in a higher refractive index medium strikes the boundary of a lower refractive index medium at an angle greater than the critical angle, bouncing back with 100% reflectance.',
      textbookExplanation: 'When light moves into an optically less dense medium (e.g. from glass core to cladding air or polymer), it bends away from the normal. At a specific angle called the critical angle, the refracted ray skims the surface (90°). At any steeper angle of incidence, no light escapes; all energy reflects internally with zero absorption losses.',
      keyTerms: [
        { term: 'Critical Angle (θc)', definition: 'The angle of incidence where the refracted angle reaches exactly 90 degrees.' },
        { term: 'Refractive Index (n)', definition: 'Ratio of speed of light in vacuum to speed in the medium: n = c / v.' }
      ],
      formula: '\\sin(\\theta_c) = \\frac{n_2}{n_1} \\quad (n_1 > n_2)',
      formulaExplanation: 'Where n1 is the higher refractive index of the core material and n2 is the lower index of the boundary cladding.',
      workedExample: {
        problem: 'A glass fiber core has n1 = 1.50 and cladding has n2 = 1.00 (air). Find the critical angle θc.',
        solution: 'θc = arcsin(1.00 / 1.50) = arcsin(0.667) ≈ 41.8°',
        steps: [
          'Calculate ratio: 1.00 / 1.50 = 0.6667.',
          'Take inverse sine: arcsin(0.6667) = 41.81°.',
          'Any ray hitting above 41.8° reflects internally without loss.'
        ]
      },
      keyTakeaways: [
        'TIR requires light to travel from a denser to a less dense optical medium.',
        'The angle of incidence must strictly exceed the critical angle.',
        'Unlike ordinary silver mirrors, TIR achieves 100% theoretical optical reflectance.'
      ]
    },
    connect: {
      realWorldSummary: 'Subsea fiber-optic cables carrying 99% of international web traffic and surgical endoscopes depend on TIR.',
      examples: [
        {
          title: 'Subsea Transoceanic Fiber Internet Cables',
          context: 'Ultra-pure silica glass fibers under the Atlantic and Pacific oceans bounce infrared laser pulses thousands of kilometers between continents without light escaping.',
          whyItMatters: 'Enables global cloud connectivity, streaming, and international financial networks.',
          badge: 'Telecommunications'
        },
        {
          title: 'Medical Endoscopy Cameras',
          context: 'Surgeons insert flexible optical fiber bundles through tiny keyholes to illuminate and inspect internal organs without invasive major surgeries.',
          whyItMatters: 'Dramatically accelerates patient recovery times and reduces surgical trauma.',
          badge: 'Healthcare Tech'
        }
      ]
    },
    apply: {
      problemStatement: 'If an optical fiber cable is bent too sharply around a tight corner inside a wall conduit, the internet connection drops. Why?',
      scenario: 'A network technician accidentally pinches an optical patch cord around a sharp sharp drywall corner.',
      questionType: 'multiple-choice',
      options: [
        { id: 'opt1', text: 'The sharp curve makes the angle of incidence smaller than the critical angle, allowing light to leak out of the core.', isCorrect: true, feedback: 'Correct! The acute curvature reduces the incident angle relative to the boundary normal below θc, causing severe optical loss.' },
        { id: 'opt2', text: 'The glass atoms become compressed and block electric currents.', isCorrect: false, feedback: 'Incorrect: Fiber optics transmits photon beams, not electric currents.' },
        { id: 'opt3', text: 'The speed of light drops to zero when turned around corners.', isCorrect: false, feedback: 'Incorrect: Light maintains its medium velocity v = c / n.' }
      ],
      explanation: 'Fiber guides light only when the angle of incidence exceeds θc. Sharp bends reduce the angle at the wall, causing light to refract out into the buffer coating.'
    },
    relatedConceptIds: ['ohms-law', 'binary-search']
  },

  // ==========================================
  // 2. CHEMISTRY
  // ==========================================
  {
    id: 'acids-and-bases',
    title: 'Acids, Bases, and the pH Scale',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    category: 'Everyday Science',
    difficulty: 'Beginner',
    readingTime: '7 min read',
    shortDescription: 'The chemistry of hydrogen ion donor-acceptor balances in living organisms, cooking, and environmental oceans.',
    learn: {
      definition: 'Acids are chemical substances that donate hydrogen ions (H+ / protons) in aqueous solution, while bases accept protons or donate hydroxide ions (OH-). The pH scale measures proton concentration logarithmically from 0 to 14.',
      textbookExplanation: 'In water at 25°C, pure neutral water auto-ionizes with equal [H+] and [OH-] concentrations of 10^-7 M, yielding pH 7. Solutions with higher [H+] (pH < 7) are acidic; solutions with lower [H+] (pH > 7) are basic or alkaline. Because pH is a base-10 logarithmic scale, each whole pH unit represents a ten-fold change in acidity. A liquid at pH 4 is ten times more acidic than pH 5, and 1,000 times more acidic than pH 7.',
      keyTerms: [
        { term: 'pH', definition: 'Potential of Hydrogen, defined mathematically as pH = -log10[H+].' },
        { term: 'Arrhenius & Brønsted-Lowry', definition: 'Models defining acids as proton (H+) donors and bases as proton acceptors.' },
        { term: 'Buffer Solution', definition: 'A mixture of a weak acid and its conjugate base that resists drastic pH changes when small amounts of acid or base are added.' }
      ],
      formula: '\\text{pH} = -\\log_{10}[\\text{H}^+] \\quad \\iff \\quad [\\text{H}^+] = 10^{-\\text{pH}}',
      formulaExplanation: 'Where [H+] is the molar concentration of hydronium/hydrogen ions in moles per liter (mol/L).',
      workedExample: {
        problem: 'Gastric stomach acid has a hydronium ion concentration of approximately 0.01 M (10^-2 mol/L). Calculate its pH value.',
        solution: 'pH = -log10(10^-2) = -(-2) = 2.0',
        steps: [
          'Express molarity in scientific notation: 0.01 M = 10^-2 M.',
          'Apply the pH formula: pH = -log10(10^-2).',
          'Evaluate log: -(-2) = 2.0.',
          'Result: Gastric acid operates at an intensely acidic pH of 2.0.'
        ]
      },
      keyTakeaways: [
        'The pH scale is logarithmic: each single integer step changes proton concentration by 10x.',
        'Human blood must be tightly regulated between pH 7.35 and 7.45 using bicarbonate buffers.',
        'Neutralization reactions between acids and bases produce water and mineral salts: Acid + Base → Salt + Water.'
      ]
    },
    connect: {
      realWorldSummary: 'From swimming pool sanitation to human stomach acid and ocean acidification, acid-base balance is critical for life.',
      examples: [
        {
          title: 'Stomach Acid and Antacid Tablets',
          context: 'Hydrochloric acid (HCl) in our stomach sits at pH 1.5–2.0 to activate digestive proteases like pepsin. When excess acid causes heartburn, antacids containing magnesium hydroxide (Mg(OH)2) or calcium carbonate neutralize the acid into neutral salt and water.',
          whyItMatters: 'Relieves gastrointestinal pain and protects esophagus tissue from chemical burns.',
          badge: 'Human Health'
        },
        {
          title: 'Ocean Acidification and Coral Bleaching',
          context: 'Excess atmospheric carbon dioxide dissolves into seawater forming carbonic acid (H2CO3), lowering ocean pH from historical 8.2 to 8.1. That 0.1 pH decrease represents a 30% surge in hydrogen ions, stripping carbonate ions needed by corals and shellfish to build shells.',
          whyItMatters: 'Threatens global marine biodiversity and fisheries.',
          badge: 'Ecosystems'
        },
        {
          title: 'Baking Soda vs. Baking Powder in Cooking',
          context: 'Baking soda (pure sodium bicarbonate) requires an acidic kitchen ingredient like buttermilk, lemon, or vinegar to react and generate CO2 bubbles. Baking powder pre-mixes sodium bicarbonate with dry cream of tartar acid, activating as soon as water is added.',
          whyItMatters: 'Enables bread, cakes, and pastries to rise light and fluffy.',
          badge: 'Culinary Science'
        }
      ]
    },
    apply: {
      problemStatement: 'Black coffee has a pH of 5.0, while freshly squeezed lemon juice has a pH of 2.0. By what factor is the lemon juice more acidic in hydrogen ion concentration than the coffee?',
      scenario: 'You are preparing a marinade recipe and want to evaluate how much more aggressive the citrus acid is compared to brewed coffee.',
      questionType: 'multiple-choice',
      options: [
        { id: 'opt1', text: '3 times more acidic', isCorrect: false, feedback: 'Incorrect: The pH scale is logarithmic, not arithmetic (do not simply subtract 5 - 2 = 3).' },
        { id: 'opt2', text: '30 times more acidic', isCorrect: false, feedback: 'Incorrect: 10^3 is 1,000, not 30.' },
        { id: 'opt3', text: '1,000 times more acidic', isCorrect: true, feedback: 'Correct! The pH difference is 5 - 2 = 3 units. Because each unit is 10x, 10^3 = 1,000 times higher [H+] concentration.' },
        { id: 'opt4', text: '100 times more acidic', isCorrect: false, feedback: 'Incorrect: 100x corresponds to a 2-unit pH difference.' }
      ],
      explanation: 'Since pH = -log10[H+], a difference of ΔpH = 3 corresponds to a 10^3 = 1,000-fold difference in hydronium ion concentration.'
    },
    relatedConceptIds: ['human-digestion', 'exothermic-reactions', 'ecosystems-trophic']
  },
  {
    id: 'exothermic-reactions',
    title: 'Exothermic and Endothermic Chemical Reactions',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    category: 'Everyday Science',
    difficulty: 'Intermediate',
    readingTime: '6 min read',
    shortDescription: 'How chemical bonds break and form to release ambient warmth or absorb chilling heat.',
    learn: {
      definition: 'Exothermic reactions release thermal energy to their surroundings as stronger chemical bonds form in products than were broken in reactants. Endothermic reactions absorb thermal energy from their surroundings, cooling the environment.',
      textbookExplanation: 'Breaking chemical bonds always requires an input of energy (endothermic bond dissociation). Forming chemical bonds releases energy (exothermic stabilization). When the energy released by newly formed bonds exceeds the energy required to break starting reactant bonds, the net enthalpy change (ΔH) is negative, radiating heat outward.',
      keyTerms: [
        { term: 'Enthalpy Change (ΔH)', definition: 'Net heat change of a reaction system at constant pressure; negative for exothermic, positive for endothermic.' },
        { term: 'Activation Energy (Ea)', definition: 'Minimum kinetic energy colliding molecules must possess to initiate a chemical transformation.' }
      ],
      formula: '\\Delta H = \\sum \\text{Energy of Bonds Broken} - \\sum \\text{Energy of Bonds Formed}',
      formulaExplanation: 'If ΔH < 0, heat is released (exothermic); if ΔH > 0, heat is absorbed (endothermic).',
      workedExample: {
        problem: 'Combustion of 1 mole of methane (CH4 + 2O2 → CO2 + 2H2O) yields ΔH = -890 kJ/mol. Is this exothermic or endothermic?',
        solution: 'Because ΔH is negative (-890 kJ), the reaction is exothermic and releases 890 kJ of thermal energy.',
        steps: [
          'Observe the negative sign on ΔH.',
          'A negative enthalpy indicates net heat output to surroundings.',
          'Therefore, combustion is exothermic.'
        ]
      },
      keyTakeaways: [
        'Exothermic processes raise the temperature of the container or surrounding air.',
        'Endothermic processes pull heat inward, causing the surrounding container to feel freezing cold.'
      ]
    },
    connect: {
      realWorldSummary: 'Instant athletic cold packs and winter pocket hand warmers provide direct portable thermal chemistry.',
      examples: [
        {
          title: 'Disposable Winter Iron Hand Warmers',
          context: 'When air enters the packet, finely ground iron reacts with atmospheric oxygen and water to form rust (4Fe + 3O2 → 2Fe2O3). This controlled oxidation releases sustained warmth up to 55°C (130°F) for 10 hours.',
          whyItMatters: 'Prevents frostbite during winter mountaineering and cold-weather work.',
          badge: 'Consumer Tech'
        },
        {
          title: 'Instant First-Aid Chemical Cold Packs',
          context: 'Squeezing the pouch ruptures an inner water pouch, dissolving ammonium nitrate (NH4NO3). Dissolving the crystal lattice absorbs ambient thermal energy, chilling the pack to near 0°C within seconds.',
          whyItMatters: 'Reduces athletic swelling, sprains, and sports inflammation without requiring a freezer.',
          badge: 'Sports Medicine'
        }
      ]
    },
    apply: {
      problemStatement: 'When solid sodium hydroxide (NaOH) pellets are dissolved in water in a laboratory beaker, the glass beaker becomes very hot to the touch. What is occurring?',
      scenario: 'A student prepares a cleaning reagent and observes the thermometer rising from 20°C to 48°C.',
      questionType: 'multiple-choice',
      options: [
        { id: 'opt1', text: 'The dissolution process is exothermic (ΔH < 0), releasing heat into the water.', isCorrect: true, feedback: 'Correct! Solvation releases more hydration enthalpy than the lattice energy consumed, heating the solution.' },
        { id: 'opt2', text: 'An endothermic reaction is absorbing cold from the air.', isCorrect: false, feedback: 'Incorrect: Cold is not a physical substance that can be absorbed.' },
        { id: 'opt3', text: 'The beaker is undergoing nuclear fission.', isCorrect: false, feedback: 'Incorrect: Dissolution is a standard chemical solvation process.' }
      ],
      explanation: 'Exothermic dissolution releases heat into the surrounding solution, raising its temperature.'
    },
    relatedConceptIds: ['acids-and-bases', 'cellular-respiration']
  },
  {
    id: 'polymers-and-materials',
    title: 'Polymers, Monomers, and Material Science',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    category: 'Engineering',
    difficulty: 'Intermediate',
    readingTime: '6 min read',
    shortDescription: 'How repeating molecular monomer chains give rise to plastics, rubber, DNA, and bulletproof Kevlar fibers.',
    learn: {
      definition: 'A polymer is a large macromolecule composed of repeating structural subunits called monomers, linked through covalent bonds.',
      textbookExplanation: 'Small molecules (monomers like ethylene) can undergo addition or condensation polymerization to form long molecular chains tens of thousands of units long. The entanglement, branching, and intermolecular forces (such as hydrogen bonding) between adjacent polymer chains dictate whether a plastic is flexible like cling wrap or rigid like Kevlar armor.',
      keyTerms: [
        { term: 'Monomer', definition: 'The small single chemical unit that bonds repeatedly to create a polymer chain.' },
        { term: 'Cross-linking', definition: 'Chemical covalent bonds linking one polymer chain to another, increasing stiffness and heat resistance.' }
      ],
      keyTakeaways: [
        'Natural polymers include cellulose, silk, wool, and DNA.',
        'Synthetic polymers include polyethylene, nylon, Teflon, and Kevlar.',
        'Cross-linked polymers (thermosets) cannot be melted down and re-molded, unlike thermoplastics.'
      ]
    },
    connect: {
      realWorldSummary: 'Modern aviation, athletic sneakers, and waterproof apparel are built on synthetic polymers.',
      examples: [
        {
          title: 'Kevlar Body Armor',
          context: 'Poly-paraphenylene terephthalamide forms dense parallel crystalline chains linked by extensive hydrogen bonds. When a bullet strikes, the polymer chains dissipate energy across the entire fabric weave.',
          whyItMatters: 'Protects law enforcement and military personnel from ballistic impacts.',
          badge: 'Defense Tech'
        },
        {
          title: 'Carbon-Fiber Reinforced Polymers in Aviation',
          context: 'Modern airliners like the Boeing 787 Dreamliner use carbon-fiber epoxy polymers for over 50% of the airframe, reducing weight by 20% compared to traditional aluminum alloys.',
          whyItMatters: 'Saves millions of gallons of aviation fuel and reduces carbon emissions.',
          badge: 'Aerospace'
        }
      ]
    },
    apply: {
      problemStatement: 'Why does vulcanized rubber (rubber heated with sulfur to create sulfur cross-links) retain its shape after stretching, whereas raw natural latex sags and deforms permanently?',
      scenario: 'You are evaluating why car tires can endure thousands of miles of pavement deformation without permanently stretching out.',
      questionType: 'multiple-choice',
      options: [
        { id: 'opt1', text: 'Sulfur cross-links tie polymer chains together, pulling them back to their original configuration when stress is removed.', isCorrect: true, feedback: 'Correct! Cross-links prevent polymer chains from sliding permanently past each other.' },
        { id: 'opt2', text: 'Vulcanization turns the rubber into a metal alloy.', isCorrect: false, feedback: 'Incorrect: Rubber remains an organic polymer.' },
        { id: 'opt3', text: 'The sulfur makes the rubber completely porous to air.', isCorrect: false, feedback: 'Incorrect: Tires must maintain hermetic air retention.' }
      ],
      explanation: 'Cross-linking acts like molecular springs that prevent individual polymer chains from slipping irreversibly past each other under mechanical load.'
    },
    relatedConceptIds: ['structural-trusses', 'acids-and-bases']
  },

  // ==========================================
  // 3. BIOLOGY
  // ==========================================
  {
    id: 'cellular-respiration',
    title: 'Cellular Respiration and ATP Generation',
    subjectId: 'biology',
    subjectName: 'Biology',
    category: 'Health and Nutrition',
    difficulty: 'Intermediate',
    readingTime: '7 min read',
    shortDescription: 'The biochemical engine that converts dietary glucose and oxygen into cellular fuel (ATP).',
    learn: {
      definition: 'Cellular respiration is the metabolic pathway that breaks down glucose in the presence of oxygen to produce Adenosine Triphosphate (ATP), carbon dioxide, and water.',
      textbookExplanation: 'Through three sequential stages—Glycolysis in the cytoplasm, the Krebs Cycle in the mitochondrial matrix, and the Electron Transport Chain across the inner mitochondrial membrane—cells extract high-energy electrons from glucose bonds. ATP synthase uses a proton gradient to generate up to 36–38 ATP molecules per glucose molecule.',
      keyTerms: [
        { term: 'ATP (Adenosine Triphosphate)', definition: 'The primary energetic currency of biological cells.' },
        { term: 'Mitochondria', definition: 'The double-membraned organelle responsible for aerobic cellular respiration.' }
      ],
      formula: '\\text{C}_6\\text{H}_{12}\\text{O}_6 + 6\\text{O}_2 \\longrightarrow 6\\text{CO}_2 + 6\\text{H}_2\\text{O} + 36\\text{ ATP}',
      formulaExplanation: 'One molecule of glucose plus 6 oxygen molecules yield 6 carbon dioxide, 6 water, and ~36 ATP energy units.',
      keyTakeaways: [
        'Aerobic respiration requires oxygen and produces high amounts of ATP.',
        'Anaerobic fermentation occurs when oxygen is depleted, producing lactic acid in muscle fibers.'
      ]
    },
    connect: {
      realWorldSummary: 'Sprint athletics, baking sourdough, and mitochondrial health rely on cellular respiration dynamics.',
      examples: [
        {
          title: 'Marathon Runners vs. 100m Sprinters',
          context: 'Sprinters rely on anaerobic glycolysis for explosive energy bursts, accumulating lactic acid fatigue within 15 seconds. Marathon runners maintain aerobic zone pacing, continuously oxidizing fats and glucose with steady oxygen delivery.',
          whyItMatters: 'Shapes athletic training regimens and endurance pacing.',
          badge: 'Sports Science'
        },
        {
          title: 'Carbon Monoxide Poisoning',
          context: 'Carbon monoxide (CO) binds to hemoglobin 200x tighter than oxygen, blocking oxygen delivery to mitochondrial electron transport chains and halting ATP synthesis.',
          whyItMatters: 'Explains why home carbon monoxide detectors are life-saving safety devices.',
          badge: 'Emergency Medicine'
        }
      ]
    },
    apply: {
      problemStatement: 'During intense high-intensity interval training (HIIT), your muscles burn and cramp. What metabolic shift is occurring inside the muscle cells?',
      scenario: 'You are on the final set of sprint intervals and feel muscle heaviness.',
      questionType: 'multiple-choice',
      options: [
        { id: 'opt1', text: 'Oxygen demand exceeds delivery, forcing muscle cells into anaerobic lactic acid fermentation to regenerate NAD+.', isCorrect: true, feedback: 'Correct! Without enough O2, electron transport stalls, and cells shift to lactic fermentation.' },
        { id: 'opt2', text: 'The mitochondria run out of water and crack open.', isCorrect: false, feedback: 'Incorrect: Water is an abundant cellular byproduct.' },
        { id: 'opt3', text: 'Cells switch to photosynthesis to make their own glucose.', isCorrect: false, feedback: 'Incorrect: Human animal cells cannot perform photosynthesis.' }
      ],
      explanation: 'When oxygen cannot reach muscle cells fast enough, glycolysis bypasses mitochondria through lactic fermentation, yielding quick ATP at the cost of lactate buildup.'
    },
    relatedConceptIds: ['human-digestion', 'exothermic-reactions']
  },
  {
    id: 'human-digestion',
    title: 'Human Digestion and Nutrient Absorption',
    subjectId: 'biology',
    subjectName: 'Biology',
    category: 'Health and Nutrition',
    difficulty: 'Beginner',
    readingTime: '6 min read',
    shortDescription: 'The mechanical and chemical breakdown of dietary food into absorbable micro-molecules.',
    learn: {
      definition: 'Digestion is the biological process of breaking complex macronutrients (carbohydrates, proteins, lipids) into microscopic absorbable units using mechanical churning and enzymatic catalysis.',
      textbookExplanation: 'Digestion starts in the mouth with salivary amylase. In the stomach, hydrochloric acid and pepsin break down protein polymers. The small intestine (duodenum, jejunum, ileum) receives bile from the liver to emulsify fats and pancreatic enzymes to complete digestion. Millions of microvilli maximize surface area to absorb nutrients into bloodstream capillaries.',
      keyTerms: [
        { term: 'Peristalsis', definition: 'Involuntary smooth-muscle wave contractions propelling food along the gastrointestinal tract.' },
        { term: 'Villi and Microvilli', definition: 'Finger-like microscopic folds lining the intestinal wall that expand absorption surface area to the size of a tennis court.' }
      ],
      keyTakeaways: [
        'Enzymes are substrate-specific: amylase targets starches, proteases target proteins, lipases target fats.',
        'The large intestine absorbs water and hosts trillions of beneficial microbiome bacteria.'
      ]
    },
    connect: {
      realWorldSummary: 'Dietary wellness, lactose intolerance, and celiac disease are direct consequences of digestive biochemistry.',
      examples: [
        {
          title: 'Lactose Intolerance in Adults',
          context: 'Lactose is a disaccharide milk sugar. When individuals stop producing the enzyme lactase in the small intestine, unabsorbed lactose travels to the large intestine where gut bacteria ferment it into gas and organic acids.',
          whyItMatters: 'Explains why taking over-the-counter lactase enzyme pills before eating dairy prevents discomfort.',
          badge: 'Digestive Health'
        },
        {
          title: 'Dietary Fiber and Cardiovascular Health',
          context: 'Soluble fiber forms a gel-like matrix that binds bile acids in the gut, forcing the liver to pull LDL cholesterol out of the bloodstream to synthesize fresh bile salts.',
          whyItMatters: 'Explains how eating oats and legumes naturally lowers circulating cholesterol levels.',
          badge: 'Preventive Nutrition'
        }
      ]
    },
    apply: {
      problemStatement: 'Why does celiac disease (an autoimmune reaction flattening intestinal villi) cause chronic nutrient deficiencies and anemia even when the patient eats large amounts of food?',
      scenario: 'A doctor reviews blood tests showing severe iron and vitamin deficiency despite normal calorie intake.',
      questionType: 'multiple-choice',
      options: [
        { id: 'opt1', text: 'Flattened villi drastically reduce the surface area available for nutrient transport into capillaries.', isCorrect: true, feedback: 'Correct! Loss of microvilli architecture destroys the mucosal surface area needed for absorption.' },
        { id: 'opt2', text: 'The stomach acid neutralizes all incoming food molecules.', isCorrect: false, feedback: 'Incorrect: Celiac pathology is localized in the small intestine villi.' },
        { id: 'opt3', text: 'The digestive tract runs in reverse peristalsis permanently.', isCorrect: false, feedback: 'Incorrect: Food still traverses normal peristalsis.' }
      ],
      explanation: 'Microvilli multiply intestinal surface area by 600 times. When autoimmune inflammation blunts villi, nutrient molecules pass straight through unabsorbed.'
    },
    relatedConceptIds: ['cellular-respiration', 'acids-and-bases']
  },
  {
    id: 'ecosystems-trophic',
    title: 'Ecosystems, Food Webs, and Trophic Cascades',
    subjectId: 'biology',
    subjectName: 'Biology',
    category: 'Environment',
    difficulty: 'Intermediate',
    readingTime: '6 min read',
    shortDescription: 'How apex predators and energy flow govern the biodiversity and stability of entire landscapes.',
    learn: {
      definition: 'A trophic cascade is an ecological phenomenon triggered by the addition or removal of top apex predators, causing reciprocal changes across successive lower trophic levels throughout the food web.',
      textbookExplanation: 'In any ecosystem, energy flows upward through trophic levels: primary producers (plants) → primary consumers (herbivores) → secondary consumers (carnivores) → apex predators. According to Lindeman’s 10% rule, only about 10% of energy transfers between adjacent levels, limiting food chain length.',
      keyTerms: [
        { term: 'Keystone Species', definition: 'A species whose presence has a disproportionate structural influence on maintaining ecosystem biodiversity.' },
        { term: '10% Energy Rule', definition: 'Only ~10% of chemical energy stored in biomass transfers from one trophic level to the next.' }
      ],
      keyTakeaways: [
        'Removing a keystone predator can lead to herbivore overpopulation and ecosystem collapse.',
        'Energy diminishes rapidly with each step up the food pyramid.'
      ]
    },
    connect: {
      realWorldSummary: 'Reintroducing gray wolves to Yellowstone National Park reshaped rivers and restored plant life.',
      examples: [
        {
          title: 'The Reintroduction of Wolves to Yellowstone (1995)',
          context: 'When wolves were reintroduced after 70 years, they controlled elk populations and altered elk grazing behavior. Overgrazed riverbanks regrew with willows and aspens, bringing back beavers, songbirds, and stabilizing riverbanks against soil erosion.',
          whyItMatters: 'Proves how apex predators can physically reshape geography and restore wild ecosystems.',
          badge: 'Conservation Ecology'
        },
        {
          title: 'Sea Otters and Kelp Forests',
          context: 'Sea otters eat sea urchins. Where otters were hunted out, urchin barrens developed, destroying kelp forests. Protecting otters restored lush underwater kelp habitats that shelter hundreds of fish species.',
          whyItMatters: 'Kelp forests sequester massive amounts of atmospheric carbon.',
          badge: 'Marine Conservation'
        }
      ]
    },
    apply: {
      problemStatement: 'Based on the 10% ecological energy transfer rule, if grassland plants produce 10,000 kJ of biomass energy, approximately how much energy reaches secondary carnivores (like foxes)?',
      scenario: 'You are modeling energy flow in a meadow food web.',
      questionType: 'multiple-choice',
      options: [
        { id: 'opt1', text: '100 kJ', isCorrect: true, feedback: 'Correct! Plants (10,000 kJ) → Herbivores (1,000 kJ) → Secondary carnivores (100 kJ).' },
        { id: 'opt2', text: '1,000 kJ', isCorrect: false, feedback: 'Incorrect: 1,000 kJ is the energy available to primary herbivores.' },
        { id: 'opt3', text: '10 kJ', isCorrect: false, feedback: 'Incorrect: 10 kJ would be available to tertiary apex predators.' },
        { id: 'opt4', text: '5,000 kJ', isCorrect: false, feedback: 'Incorrect: 50% transfer does not occur in biological food webs.' }
      ],
      explanation: 'With two trophic transfers, apply 10% twice: 10,000 kJ × 0.10 × 0.10 = 100 kJ.'
    },
    relatedConceptIds: ['acids-and-bases', 'rain-shadow-effect']
  },

  // ==========================================
  // 4. MATHEMATICS
  // ==========================================
  {
    id: 'probability',
    title: 'Probability and Expected Value',
    subjectId: 'mathematics',
    subjectName: 'Mathematics',
    category: 'Everyday Science',
    difficulty: 'Beginner',
    readingTime: '7 min read',
    shortDescription: 'The mathematical rules governing uncertainty, independent events, and the Law of Large Numbers.',
    learn: {
      definition: 'Probability quantifies the likelihood of an event occurring, bounded strictly between 0 (impossible) and 1 (certain). Expected value is the long-term average outcome of a random process after infinite repetitions.',
      textbookExplanation: 'Theoretical probability calculates outcomes based on equally likely sample space states: P(A) = favorable outcomes / total outcomes. Experimental probability records observed empirical frequencies. The Law of Large Numbers proves that as the number of trials approaches infinity, the experimental probability converges asymptotically toward the theoretical expectation.',
      keyTerms: [
        { term: 'Sample Space (S)', definition: 'The set containing all possible distinct outcomes of a random experiment.' },
        { term: 'Law of Large Numbers', definition: 'A fundamental theorem stating that sample mean approaches expected value as sample size grows large.' },
        { term: 'Expected Value (E[X])', definition: 'The probability-weighted sum of all potential numerical outcomes.' }
      ],
      formula: 'P(A) = \\frac{n(A)}{n(S)}, \\quad E[X] = \\sum_{i=1}^k x_i \\cdot P(x_i)',
      formulaExplanation: 'P(A) is favorable states over total states; E[X] multiplies each payoff xi by its probability P(xi).',
      workedExample: {
        problem: 'A fair 6-sided die is rolled. Calculate the theoretical probability of rolling an even number (2, 4, or 6), and compute the expected value of a single roll.',
        solution: 'P(Even) = 3 / 6 = 0.50 (50%). Expected Value E[X] = 3.5.',
        steps: [
          'Sample space: {1, 2, 3, 4, 5, 6}, total n(S) = 6.',
          'Favorable even outcomes: {2, 4, 6}, count n(A) = 3.',
          'P(Even) = 3 / 6 = 1/2 = 0.50.',
          'Expected value: (1+2+3+4+5+6)/6 = 21/6 = 3.5.'
        ]
      },
      keyTakeaways: [
        'Probabilities never exceed 1.0 (100%) or drop below 0.0 (0%).',
        'Independent events do not have memories; past coin flips do not affect future flips (Gambler’s Fallacy).',
        'The Law of Large Numbers guarantees casino and insurance company profitability over millions of events.'
      ]
    },
    connect: {
      realWorldSummary: 'Actuarial insurance pricing, financial risk modeling, and clinical drug trials depend on probability theory.',
      examples: [
        {
          title: 'Insurance Underwriting and Premium Pricing',
          context: 'Health and auto insurance companies do not guess who will have an accident. By pooling risk across hundreds of thousands of policyholders, the Law of Large Numbers makes their claims cost statistically predictable within fractions of a percent.',
          whyItMatters: 'Guarantees financial solvency while protecting families from catastrophic expenses.',
          badge: 'Financial Services'
        },
        {
          title: 'Spam Email Filters (Bayesian Probability)',
          context: 'Email spam detectors calculate the conditional probability that a message is spam given the presence of words like "wire transfer" or "free crypto", automatically updating probabilities as new spam patterns appear.',
          whyItMatters: 'Keeps inboxes clean of phishing and cyber threats.',
          badge: 'Cybersecurity'
        },
        {
          title: 'The Gambler’s Fallacy in Real Life',
          context: 'If a roulette wheel lands on Red 10 times in a row, gamblers incorrectly believe Black is "due". In reality, the probability of Black on the 11th spin is still exactly 18/38 on a double-zero wheel.',
          whyItMatters: 'Saves individuals from catastrophic cognitive money traps.',
          badge: 'Behavioral Finance'
        }
      ]
    },
    apply: {
      problemStatement: 'A raffle sells 200 tickets for $5 each. There is a single grand prize of $600. What is the expected mathematical value of purchasing one ticket?',
      scenario: 'A student charity raffle asks you to buy a $5 ticket. You want to calculate your expected financial return.',
      questionType: 'multiple-choice',
      options: [
        { id: 'opt1', text: '-$2.00 (a net expected loss of $2)', isCorrect: true, feedback: 'Correct! Expected payoff = (1/200 × $600) - $5 = $3 - $5 = -$2.00.' },
        { id: 'opt2', text: '+$3.00 (a net expected gain of $3)', isCorrect: false, feedback: 'Incorrect: You must subtract the $5 ticket purchase price.' },
        { id: 'opt3', text: '$0.00 (a fair bet)', isCorrect: false, feedback: 'Incorrect: The raffle operator retains $400 in net profit.' },
        { id: 'opt4', text: '+$595.00', isCorrect: false, feedback: 'Incorrect: You do not win the prize with certainty.' }
      ],
      explanation: 'Expected Value = (Probability of Win × Prize) - Ticket Cost = (1/200 × $600) - $5 = $3 - $5 = -$2.00 per ticket.'
    },
    simulationId: 'probability',
    relatedConceptIds: ['compound-interest', 'cognitive-biases', 'binary-search']
  },
  {
    id: 'pythagorean-theorem',
    title: 'The Pythagorean Theorem & GPS Triangulation',
    subjectId: 'mathematics',
    subjectName: 'Mathematics',
    category: 'Technology',
    difficulty: 'Beginner',
    readingTime: '5 min read',
    shortDescription: 'How right-triangle geometry enables satellite navigation, roof framing, and distance geometry.',
    learn: {
      definition: 'In any right-angled triangle, the square of the length of the hypotenuse is equal to the sum of the squares of the lengths of the other two sides: a^2 + b^2 = c^2.',
      textbookExplanation: 'Discovered in antiquity, this fundamental relation in Euclidean space allows calculating Euclidean distance between any two Cartesian coordinates (x1, y1) and (x2, y2). GPS satellites use this 3D sphere distance formula to pinpoint smartphone locations.',
      keyTerms: [
        { term: 'Hypotenuse', definition: 'The longest side of a right triangle, situated directly opposite the 90° right angle.' },
        { term: 'Euclidean Distance', definition: 'Straight-line distance between points: d = √((Δx)^2 + (Δy)^2).' }
      ],
      formula: 'a^2 + b^2 = c^2 \\quad \\iff \\quad c = \\sqrt{a^2 + b^2}',
      formulaExplanation: 'Where a and b are perpendicular legs, and c is the hypotenuse.',
      workedExample: {
        problem: 'A construction ladder is placed 3 meters away from a building wall, reaching a window 4 meters above the ground. How long must the ladder be?',
        solution: 'c = √(3^2 + 4^2) = √(9 + 16) = √25 = 5 meters.',
        steps: [
          'Identify legs: a = 3 m, b = 4 m.',
          'Square both: 3^2 = 9, 4^2 = 16.',
          'Sum: 9 + 16 = 25.',
          'Take square root: √25 = 5 m.'
        ]
      },
      keyTakeaways: [
        'Applies only to right-angled triangles in flat Euclidean space.',
        'Extends into 3D space as d = √(x^2 + y^2 + z^2) for aerospace navigation.'
      ]
    },
    connect: {
      realWorldSummary: 'GPS satellite receivers, carpentry 3-4-5 squaring, and video game 3D physics depend on the theorem.',
      examples: [
        {
          title: 'Smartphone GPS Trilateration',
          context: 'At least four GPS satellites broadcast ultra-precise atomic clock time stamps. Your smartphone calculates its distance to each satellite using the 3D Pythagorean distance formula, solving for your exact latitude, longitude, and elevation.',
          whyItMatters: 'Powers Google Maps, ride-sharing, and emergency rescue services.',
          badge: 'Navigation'
        },
        {
          title: 'Carpentry and Framing 3-4-5 Rule',
          context: 'Builders verify that corner foundations are perfectly 90° square by measuring 3 feet along one wall, 4 feet along the adjacent wall, and verifying that the diagonal measures exactly 5 feet.',
          whyItMatters: 'Prevents houses from being built crooked or structurally unsound.',
          badge: 'Civil Construction'
        }
      ]
    },
    apply: {
      problemStatement: 'You walk 60 meters East and then 80 meters North across an open park field. How far are you from your starting point in a direct straight line?',
      scenario: 'You want to check if cutting straight across the park grass will save you walking distance.',
      questionType: 'multiple-choice',
      options: [
        { id: 'opt1', text: '100 meters', isCorrect: true, feedback: 'Correct! √(60^2 + 80^2) = √(3600 + 6400) = √10000 = 100 meters.' },
        { id: 'opt2', text: '140 meters', isCorrect: false, feedback: 'Incorrect: 140 m is the perimeter path distance (60 + 80), not the straight-line hypotenuse.' },
        { id: 'opt3', text: '120 meters', isCorrect: false, feedback: 'Incorrect: 120^2 = 14400, which exceeds 10000.' }
      ],
      explanation: 'Apply the Pythagorean theorem: c = √(60^2 + 80^2) = √(3600 + 6400) = √10000 = 100 meters.'
    },
    relatedConceptIds: ['probability', 'structural-trusses']
  },
  {
    id: 'compound-interest',
    title: 'Compound Interest and Exponential Growth',
    subjectId: 'mathematics',
    subjectName: 'Mathematics',
    category: 'Economics and Money',
    difficulty: 'Beginner',
    readingTime: '6 min read',
    shortDescription: 'The mathematical snowball effect of earning returns on accumulated returns over time.',
    learn: {
      definition: 'Compound interest is interest calculated on the initial principal and also on the accumulated interest of previous periods, leading to exponential growth over time.',
      textbookExplanation: 'Unlike simple interest (which grows linearly), compounding accelerates because each year’s base increases. The famous Rule of 72 provides a quick mental approximation: dividing 72 by the annual interest rate percentage gives the number of years required for an investment to double.',
      keyTerms: [
        { term: 'Principal (P)', definition: 'The initial lump sum invested or borrowed.' },
        { term: 'Rule of 72', definition: 'Years to double ≈ 72 / (annual rate percentage).' }
      ],
      formula: 'A = P \\left(1 + \\frac{r}{n}\\right)^{nt}',
      formulaExplanation: 'Where A is the final amount, P is principal, r is annual nominal rate, n is compounding frequency per year, and t is years.',
      workedExample: {
        problem: 'You invest $1,000 at an 8% annual return compounded annually. How much is your investment worth after 10 years?',
        solution: 'A = 1,000 × (1 + 0.08)^10 = 1,000 × 2.1589 ≈ $2,158.92',
        steps: [
          'Principal P = $1,000, rate r = 0.08, n = 1, t = 10.',
          'Factor: (1.08)^10 = 2.158925.',
          'Multiply: 1,000 × 2.158925 = $2,158.92.',
          'Your money more than doubles without adding any extra deposits.'
        ]
      },
      keyTakeaways: [
        'Time is the most powerful multiplier in compounding; starting early matters far more than starting with large amounts.',
        'Compounding works against borrowers on credit card debt, compounding balances higher.'
      ]
    },
    connect: {
      realWorldSummary: 'Retirement savings growth, credit card debt traps, and epidemic disease spread follow exponential compounding.',
      examples: [
        {
          title: 'The Advantage of Starting Early in Retirement Investing',
          context: 'A 20-year-old investing $200/month until age 30 (10 years total) will often accumulate more wealth by age 65 than a 30-year-old who invests $200/month continuously from age 30 to 65 (35 years total), due to extra compounding decades.',
          whyItMatters: 'Empowers young people to start investing even small amounts early.',
          badge: 'Personal Finance'
        },
        {
          title: 'Credit Card Minimum Payment Traps',
          context: 'Credit cards charge 24% APR compounded daily. Making only minimum payments pays mostly monthly accrued interest, dragging a $3,000 balance out for over 15 years.',
          whyItMatters: 'Teaches financial literacy to avoid high-interest consumer debt.',
          badge: 'Consumer Debt'
        }
      ]
    },
    apply: {
      problemStatement: 'Using the Rule of 72, approximately how many years will it take for an investment to double in value at a steady 9% annual interest rate?',
      scenario: 'You are planning a savings portfolio and estimating timeline milestones.',
      questionType: 'multiple-choice',
      options: [
        { id: 'opt1', text: '8 years', isCorrect: true, feedback: 'Correct! 72 / 9 = 8 years.' },
        { id: 'opt2', text: '12 years', isCorrect: false, feedback: 'Incorrect: 72 / 12 = 6%.' },
        { id: 'opt3', text: '18 years', isCorrect: false, feedback: 'Incorrect: 72 / 4 = 18 years.' }
      ],
      explanation: 'Divide 72 by the percentage rate: 72 / 9 = 8 years to double.'
    },
    relatedConceptIds: ['inflation-and-money', 'probability']
  },

  // ==========================================
  // 5. COMPUTER SCIENCE
  // ==========================================
  {
    id: 'binary-search',
    title: 'Binary Search & Algorithmic Efficiency',
    subjectId: 'computer-science',
    subjectName: 'Computer Science',
    category: 'Technology',
    difficulty: 'Intermediate',
    readingTime: '6 min read',
    shortDescription: 'How logarithmic divide-and-conquer algorithms search billions of records in milliseconds.',
    learn: {
      definition: 'Binary Search is an efficient algorithm for finding an item from a sorted list of items by repeatedly dividing the search interval in half.',
      textbookExplanation: 'Linear search scans items one by one in O(N) time. Binary search leverages sorted order: compare the target value to the middle element. If unequal, eliminate the half in which the target cannot lie, reducing the remaining search space by 50% each iteration. Its time complexity is O(log2 N). Searching 1,000,000 items takes at most 20 steps; searching 4,000,000,000 items takes at most 32 steps.',
      keyTerms: [
        { term: 'O(log N)', definition: 'Logarithmic time complexity, where operations grow with the logarithm of input size.' },
        { term: 'Sorted Invariant', definition: 'The prerequisite that elements must already be organized in ascending or descending sequence.' }
      ],
      formula: '\\text{Steps} \\le \\lceil \\log_2(N) \\rceil',
      formulaExplanation: 'The maximum comparisons required to locate an element or determine its absence in a list of N elements.',
      workedExample: {
        problem: 'How many maximum comparisons does binary search need to find a username in a sorted database of 1,048,576 registered users?',
        solution: 'log2(1,048,576) = 20 comparisons.',
        steps: [
          'Recall that 2^10 = 1,024 and 2^20 = 1,048,576.',
          'Take base-2 log: log2(2^20) = 20.',
          'At most 20 checks are needed versus up to 1,048,576 for linear scan.'
        ]
      },
      keyTakeaways: [
        'Requires sorted data as a strict prerequisite.',
        'Scales gracefully to massive petabyte databases.'
      ]
    },
    connect: {
      realWorldSummary: 'SQL database B-Tree indexes, git bisect bug finding, and autocomplete systems rely on binary search.',
      examples: [
        {
          title: 'Database B-Tree Indexing in PostgreSQL',
          context: 'When you query an indexed user profile, the database does not scan every row in the disk table. It traverses a B-Tree index using binary search principles to locate the exact row pointer in sub-milliseconds.',
          whyItMatters: 'Allows websites with 500 million users to respond to queries in under 5 milliseconds.',
          badge: 'Database Engineering'
        },
        {
          title: 'Debugging with `git bisect`',
          context: 'When a regression bug is discovered in a repository with 5,000 commits, git bisect tests the midpoint commit. By dividing good and bad commit ranges in half, engineers isolate the offending commit in just 12 tests.',
          whyItMatters: 'Saves software development teams days of manual troubleshooting.',
          badge: 'Software Engineering'
        }
      ]
    },
    apply: {
      problemStatement: 'You are playing a number guessing game between 1 and 100 where the host tells you "Too High" or "Too Low". What is the maximum number of guesses needed to guarantee finding the number using binary search?',
      scenario: 'You want to write an optimal bot for a number guessing challenge.',
      questionType: 'multiple-choice',
      options: [
        { id: 'opt1', text: '7 guesses', isCorrect: true, feedback: 'Correct! 2^6 = 64 < 100, while 2^7 = 128 > 100. Thus, at most 7 guesses are required.' },
        { id: 'opt2', text: '50 guesses', isCorrect: false, feedback: 'Incorrect: 50 is the expected cost of linear search.' },
        { id: 'opt3', text: '14 guesses', isCorrect: false, feedback: 'Incorrect: You do not need twice the log value.' }
      ],
      explanation: 'Because 2^7 = 128, seven halving steps can narrow down any integer range of size up to 128 to a single known value.'
    },
    relatedConceptIds: ['public-key-crypto', 'graph-theory-algorithms']
  },
  {
    id: 'public-key-crypto',
    title: 'Public-Key Cryptography & HTTPS Security',
    subjectId: 'computer-science',
    subjectName: 'Computer Science',
    category: 'Technology',
    difficulty: 'Advanced',
    readingTime: '7 min read',
    shortDescription: 'How mathematical one-way functions secure online payments, banking, and confidential chats.',
    learn: {
      definition: 'Public-key (asymmetric) cryptography is a cryptographic system that uses pairs of keys: a public key which may be disseminated widely, and a private key which is kept secret by the owner.',
      textbookExplanation: 'Traditional symmetric ciphers require both parties to share a secret key beforehand—an impossible hurdle for strangers connecting across the public internet. Asymmetric crypto solves this: anyone can encrypt a message using the recipient’s public key, but only the recipient possesses the paired private key capable of decrypting it. It relies on mathematical trapdoor functions (e.g., prime factorization in RSA or elliptic curve discrete logarithms).',
      keyTerms: [
        { term: 'Asymmetric Keypair', definition: 'A mathematically linked pair of public (encryption) and private (decryption) keys.' },
        { term: 'Trapdoor Function', definition: 'A mathematical operation that is easy to compute in one direction but virtually impossible to invert without specialized secret knowledge.' }
      ],
      keyTakeaways: [
        'The public key encrypts; only the private key decrypts.',
        'Digital signatures work in reverse: the private key signs, and anyone with the public key can verify authenticity.'
      ]
    },
    connect: {
      realWorldSummary: 'The padlock icon on HTTPS websites, Apple Pay tokens, and cryptocurrency wallets run on public-key cryptography.',
      examples: [
        {
          title: 'TLS/HTTPS Web Encryption',
          context: 'When you open your online bank, your browser uses the bank’s public SSL/TLS certificate to negotiate an encrypted session key, shielding passwords and card numbers from Wi-Fi eavesdroppers.',
          whyItMatters: 'Enables global e-commerce and secure digital communication.',
          badge: 'Web Security'
        },
        {
          title: 'End-to-End Encrypted Messaging (Signal / WhatsApp)',
          context: 'Your chat messages are encrypted directly on your smartphone using your friend’s public identity key. Even the chat company’s server routers cannot read the message contents in transit.',
          whyItMatters: 'Protects personal privacy against mass surveillance and data leaks.',
          badge: 'Privacy Tech'
        }
      ]
    },
    apply: {
      problemStatement: 'Alice wants to send an encrypted secret file to Bob across a public, unsecured cafe Wi-Fi network. Whose key should Alice use to encrypt the file?',
      scenario: 'You are implementing an encrypted messaging protocol.',
      questionType: 'multiple-choice',
      options: [
        { id: 'opt1', text: 'Bob’s public key', isCorrect: true, feedback: 'Correct! Encrypting with Bob’s public key ensures that only Bob (using his private key) can decrypt the file.' },
        { id: 'opt2', text: 'Alice’s private key', isCorrect: false, feedback: 'Incorrect: Encrypting with Alice’s private key creates a digital signature that anyone with Alice’s public key could read.' },
        { id: 'opt3', text: 'The cafe router’s password', isCorrect: false, feedback: 'Incorrect: Anyone on the cafe network knows this password.' }
      ],
      explanation: 'To keep data confidential to Bob, encrypt with Bob’s public key. Only Bob’s secret private key can invert the trapdoor mathematical function.'
    },
    relatedConceptIds: ['binary-search', 'graph-theory-algorithms']
  },
  {
    id: 'graph-theory-algorithms',
    title: 'Graph Theory & Shortest Path Navigation',
    subjectId: 'computer-science',
    subjectName: 'Computer Science',
    category: 'Technology',
    difficulty: 'Intermediate',
    readingTime: '6 min read',
    shortDescription: 'How mathematical graphs of vertices and edges power GPS route planning and social networks.',
    learn: {
      definition: 'A graph is a discrete mathematical structure consisting of a set of vertices (nodes) connected by edges. Shortest path algorithms find the minimum-cost route between two nodes in a weighted graph.',
      textbookExplanation: 'Dijkstra’s Algorithm and the A* heuristic search explore nodes outward in order of cumulative distance or transit time. Road intersections act as nodes; road segments with speed limits and traffic congestion represent weighted edges. These algorithms evaluate millions of route alternatives in milliseconds.',
      keyTerms: [
        { term: 'Vertex / Node', definition: 'A discrete entity or location in the network graph.' },
        { term: 'Weighted Edge', definition: 'A connection between two nodes carrying a cost value such as distance, transit time, or toll cost.' }
      ],
      keyTakeaways: [
        'Graphs can be directed (one-way streets) or undirected (two-way streets).',
        'Dijkstra’s algorithm finds the shortest path by greedily expanding the closest unvisited node.'
      ]
    },
    connect: {
      realWorldSummary: 'Google Maps dynamic navigation, airline flight scheduling, and LinkedIn connection degrees operate on graph theory.',
      examples: [
        {
          title: 'Google Maps Live Traffic Rerouting',
          context: 'When an accident occurs on the highway, Google Maps updates the edge weights of affected roads and re-runs pathfinding algorithms to direct traffic onto alternate arterials.',
          whyItMatters: 'Reduces commute delays and fuel consumption worldwide.',
          badge: 'Logistics'
        },
        {
          title: 'Social Network "People You May Know"',
          context: 'Social platforms represent users as nodes and friendships as edges. Algorithms analyze common neighbors (triadic closure) to suggest high-probability connections.',
          whyItMatters: 'Powers engagement algorithms across modern social platforms.',
          badge: 'Social Networks'
        }
      ]
    },
    apply: {
      problemStatement: 'In a route-planning graph, if a sudden rainstorm slows average speeds on a highway from 100 km/h to 30 km/h, how should the routing algorithm adjust the highway’s edge weight?',
      scenario: 'You are updating real-time edge costs in a navigation engine.',
      questionType: 'multiple-choice',
      options: [
        { id: 'opt1', text: 'Increase the edge weight (cost in minutes) proportionally, causing Dijkstra’s algorithm to explore alternative lower-cost routes.', isCorrect: true, feedback: 'Correct! Longer traversal times mean higher edge costs.' },
        { id: 'opt2', text: 'Decrease the edge weight to attract more drivers.', isCorrect: false, feedback: 'Incorrect: Lower edge weight indicates faster travel.' },
        { id: 'opt3', text: 'Delete all nodes in the city.', isCorrect: false, feedback: 'Incorrect: Roads remain physical assets in the graph.' }
      ],
      explanation: 'Since transit time = distance / speed, a drop in speed increases travel time, increasing the edge weight in a time-optimized graph.'
    },
    relatedConceptIds: ['binary-search', 'pythagorean-theorem']
  },

  // ==========================================
  // 6. GEOGRAPHY
  // ==========================================
  {
    id: 'plate-tectonics',
    title: 'Plate Tectonics & Continental Drift',
    subjectId: 'geography',
    subjectName: 'Geography',
    category: 'Everyday Science',
    difficulty: 'Beginner',
    readingTime: '6 min read',
    shortDescription: 'The dynamic movement of Earth’s lithospheric plates that creates mountains, earthquakes, and oceans.',
    learn: {
      definition: 'Plate tectonics is the scientific theory explaining how Earth’s outer shell (lithosphere) is divided into several massive plates that glide over the ductile asthenosphere.',
      textbookExplanation: 'Driven by mantle convection currents and slab pull, tectonic plates interact at three primary boundary types: Convergent (plates collide, forming mountain ranges or subduction trenches), Divergent (plates pull apart, creating mid-ocean ridges and rift valleys), and Transform (plates grind horizontally, building shear stress released in earthquakes).',
      keyTerms: [
        { term: 'Subduction Zone', definition: 'A boundary where a denser oceanic plate slides beneath a lighter continental plate into the hot mantle.' },
        { term: 'Ring of Fire', definition: 'A Pacific basin perimeter where 75% of Earth’s volcanoes and 90% of earthquakes occur.' }
      ],
      keyTakeaways: [
        'Continental crust is lighter and thicker than dense oceanic basalt crust.',
        'The Himalayas continue rising approximately 5 mm per year as the Indian plate pushes into the Eurasian plate.'
      ]
    },
    connect: {
      realWorldSummary: 'Earthquake-resistant building engineering and geothermal energy plants rely on tectonic knowledge.',
      examples: [
        {
          title: 'Tokyo Skytree Earthquake Dampers',
          context: 'Because Japan sits atop four converging tectonic plates, skyscrapers like Tokyo Skytree incorporate tuned liquid dampers and central shimbashira pillars that swing out-of-phase during earthquakes.',
          whyItMatters: 'Protects millions of urban residents from tectonic seismic collapses.',
          badge: 'Structural Engineering'
        },
        {
          title: 'Iceland’s 100% Geothermal Energy Grid',
          context: 'Iceland sits directly atop the divergent Mid-Atlantic Ridge where tectonic magma sits near the surface. The nation taps this volcanic heat to provide renewable power and heating to over 90% of its homes.',
          whyItMatters: 'Serves as a global model for fossil-fuel-free clean geothermal power.',
          badge: 'Clean Energy'
        }
      ]
    },
    apply: {
      problemStatement: 'Why do deep ocean trenches and explosive composite volcanoes typically form together along the western coast of South America?',
      scenario: 'You are analyzing geological survey maps of the Andes mountain range.',
      questionType: 'multiple-choice',
      options: [
        { id: 'opt1', text: 'The dense oceanic Nazca plate subducts under the continental South American plate, carving a trench and melting into magma.', isCorrect: true, feedback: 'Correct! Subduction forces water-laden oceanic crust down, causing mantle melting that fuels volcanoes.' },
        { id: 'opt2', text: 'Tidal waves scooped out the trench and stacked up the mountains.', isCorrect: false, feedback: 'Incorrect: Surface ocean waves cannot deform solid continental rock.' },
        { id: 'opt3', text: 'Meteorite impacts struck in a straight line.', isCorrect: false, feedback: 'Incorrect: The alignment matches tectonic plate subduction lines.' }
      ],
      explanation: 'Convergent subduction forces the dense oceanic slab downward, forming the Peru-Chile trench while melting crust fuels the volcanic Andes range above.'
    },
    relatedConceptIds: ['rain-shadow-effect', 'structural-trusses']
  },
  {
    id: 'rain-shadow-effect',
    title: 'The Rain Shadow Effect & Climate Zones',
    subjectId: 'geography',
    subjectName: 'Geography',
    category: 'Environment',
    difficulty: 'Beginner',
    readingTime: '5 min read',
    shortDescription: 'Why lush temperate rain forests and parched deserts often sit on opposite sides of the same mountain.',
    learn: {
      definition: 'A rain shadow is a dry, arid area on the leeward (downwind) side of a mountainous area, created when mountains block moisture-carrying storm systems.',
      textbookExplanation: 'Moist oceanic air hits the windward side of a mountain range and is forced upward (orographic lift). As air rises, it expands and cools adiabatically, condensing water vapor into clouds and heavy precipitation. Once the air crests the peak and descends the leeward slope, it compresses and warms adiabatically, absorbing moisture and leaving the leeward side arid.',
      keyTerms: [
        { term: 'Orographic Lift', definition: 'The forced upward movement of air when encountering elevated mountain terrain.' },
        { term: 'Adiabatic Warming', definition: 'The temperature increase of descending air caused by atmospheric compression.' }
      ],
      keyTakeaways: [
        'The windward slope receives heavy rainfall and supports dense vegetation.',
        'The leeward slope forms deserts and dry scrublands (the rain shadow).'
      ]
    },
    connect: {
      realWorldSummary: 'Explains the contrast between green Seattle and the desert in Eastern Washington, or California’s Sierra Nevada and Death Valley.',
      examples: [
        {
          title: 'The Sierra Nevada and Death Valley',
          context: 'Pacific moisture dumps snow and rain onto the western slopes of California’s Sierra Nevada. By the time clouds cross Mount Whitney, the dry descending air leaves Death Valley as one of the driest, hottest places on Earth.',
          whyItMatters: 'Shapes water aqueducts and agricultural irrigation across the American West.',
          badge: 'Regional Geography'
        },
        {
          title: 'The Himalayas and the Tibetan Plateau',
          context: 'The Indian summer monsoon drops torrential rains over India and Nepal. The Tibetan Plateau and Gobi Desert behind the Himalayan peaks receive virtually no rain, creating high-altitude cold deserts.',
          whyItMatters: 'Directly influences food security and water supplies for 1.4 billion people.',
          badge: 'Climatology'
        }
      ]
    },
    apply: {
      problemStatement: 'A farmer wants to plant rain-fed fruit orchards. Wind blows predominantly from West to East across a high north-south mountain range. Which side of the mountain should the farmer purchase?',
      scenario: 'You are consulting for an agricultural investment firm.',
      questionType: 'multiple-choice',
      options: [
        { id: 'opt1', text: 'The Western (windward) slope, because orographic cooling produces reliable rainfall.', isCorrect: true, feedback: 'Correct! The windward slope receives the vast majority of precipitation as air rises and condenses.' },
        { id: 'opt2', text: 'The Eastern (leeward) slope, because dry air protects fruit trees from all moisture.', isCorrect: false, feedback: 'Incorrect: Rain-fed crops need regular moisture to survive.' },
        { id: 'opt3', text: 'The peak summit, where clouds never touch.', isCorrect: false, feedback: 'Incorrect: Mountain peaks have poor soil and freezing temperatures.' }
      ],
      explanation: 'Air arriving from the West ascends the western windward slope, cooling and dropping its rain before descending dry onto the eastern leeward side.'
    },
    relatedConceptIds: ['plate-tectonics', 'ecosystems-trophic']
  },
  {
    id: 'coriolis-effect',
    title: 'The Coriolis Effect & Atmospheric Circulation',
    subjectId: 'geography',
    subjectName: 'Geography',
    category: 'Everyday Science',
    difficulty: 'Intermediate',
    readingTime: '6 min read',
    shortDescription: 'How Earth’s planetary rotation curves ocean currents, flight paths, and hurricane rotations.',
    learn: {
      definition: 'The Coriolis Effect is the apparent deflection of moving objects (such as air parcels and ocean currents) when viewed from a rotating frame of reference like Earth.',
      textbookExplanation: 'Because Earth is a sphere rotating eastward, points at the equator move much faster (~1,670 km/h) than points near the poles (~0 km/h). Air moving northward from the equator carries its eastward momentum, curving to the right in the Northern Hemisphere and to the left in the Southern Hemisphere.',
      keyTerms: [
        { term: 'Equatorial Velocity', definition: 'Rotational linear speed of Earth surface, highest at equator and zero at poles.' },
        { term: 'Cyclonic Rotation', definition: 'Counter-clockwise storm rotation in the Northern Hemisphere, clockwise in the Southern Hemisphere.' }
      ],
      keyTakeaways: [
        'Deflects moving fluid flows to the right in the Northern Hemisphere and to the left in the Southern Hemisphere.',
        'Zero effect at the equator, which is why hurricanes never form within 5 degrees of the equator.'
      ]
    },
    connect: {
      realWorldSummary: 'Transatlantic commercial flight planning and hurricane tracking depend on Coriolis physics.',
      examples: [
        {
          title: 'Commercial Flight Path Calculations',
          context: 'Pilots flying from New York to London take advantage of eastward jet streams shaped by the Coriolis effect, reducing flight time by over an hour and saving thousands of pounds of fuel.',
          whyItMatters: 'Saves the global aviation industry millions of dollars in fuel annually.',
          badge: 'Commercial Aviation'
        },
        {
          title: 'Why Hurricanes Spin in Opposite Directions',
          context: 'Low pressure draws air inward from all directions. In the Northern Hemisphere, rightward Coriolis deflection creates counter-clockwise hurricane rotation; in the Southern Hemisphere, leftward deflection creates clockwise cyclone rotation.',
          whyItMatters: 'Crucial for meteorologists issuing tropical storm evacuation warnings.',
          badge: 'Meteorology'
        }
      ]
    },
    apply: {
      problemStatement: 'Why do tropical cyclones and hurricanes never cross the equator from one hemisphere into the other?',
      scenario: 'A student notices on storm tracking radar that tropical cyclones spin away from the equator.',
      questionType: 'multiple-choice',
      options: [
        { id: 'opt1', text: 'At the equator, the Coriolis parameter drops to zero, depriving the storm of rotational torque and causing it to dissipate.', isCorrect: true, feedback: 'Correct! Without Coriolis force at latitude 0°, the pressure gradient fills directly without spinning.' },
        { id: 'opt2', text: 'The equator has an invisible electromagnetic wall that repels clouds.', isCorrect: false, feedback: 'Incorrect: Atmospheric circulation is governed by fluid dynamics and thermodynamics.' },
        { id: 'opt3', text: 'Ocean water is too cold at the equator to sustain storms.', isCorrect: false, feedback: 'Incorrect: Equatorial ocean waters are among the warmest on Earth.' }
      ],
      explanation: 'The Coriolis parameter f = 2Ω sin(latitude). At latitude 0°, sin(0) = 0, so rotational torque vanishes, preventing cyclonic circulation.'
    },
    relatedConceptIds: ['rain-shadow-effect', 'plate-tectonics']
  },

  // ==========================================
  // 7. HISTORY
  // ==========================================
  {
    id: 'printing-press',
    title: 'The Printing Press & Information Democratization',
    subjectId: 'history',
    subjectName: 'History',
    category: 'Society and Human Behaviour',
    difficulty: 'Beginner',
    readingTime: '6 min read',
    shortDescription: 'How Gutenberg’s movable metal type sparked the Scientific Revolution, Reformation, and mass literacy.',
    learn: {
      definition: 'The movable type printing press, invented by Johannes Gutenberg around 1440, mechanized the mass production of books using durable metal type, oil-based ink, and a wooden screw press.',
      textbookExplanation: 'Before the printing press, European books were hand-copied by scribes onto parchment, taking months per book and costing more than a laborer’s annual wage. Gutenberg’s press reduced book production times by over 99%, driving costs down by 80%. This triggered an explosion of shared knowledge: Martin Luther’s 95 Theses spread across Europe within weeks, and scientific treatises by Copernicus, Galileo, and Newton could be verified globally.',
      keyTerms: [
        { term: 'Movable Type', definition: 'Individual reusable metal letter castings composed of a lead-tin-antimony alloy.' },
        { term: 'Democratization of Knowledge', definition: 'The transition of literacy and scientific publications from elite clergy to the general public.' }
      ],
      keyTakeaways: [
        'Reduced book reproduction costs by over 80% within decades.',
        'Standardized national languages and accelerated the European Renaissance, Reformation, and Scientific Revolution.'
      ]
    },
    connect: {
      realWorldSummary: 'The printing press was the 15th-century equivalent of the internet, fundamentally transforming communication.',
      examples: [
        {
          title: 'The Spread of the Scientific Method',
          context: 'Before 1450, an astronomer in Poland could not easily read astronomical data collected in Italy. Printing allowed scientists across continents to review and replicate each other’s mathematical proofs and experiments.',
          whyItMatters: 'Directly sparked the modern Scientific Revolution.',
          badge: 'History of Science'
        },
        {
          title: 'Parallels with the Open Web and Wikipedia',
          context: 'Just as Gutenberg broke the monastic monopoly on written knowledge, web browsers and open-access repositories broke corporate and institutional gatekeeping on information.',
          whyItMatters: 'Demonstrates how technological distribution shifts social power.',
          badge: 'Media History'
        }
      ]
    },
    apply: {
      problemStatement: 'Why was Gutenberg’s use of a durable metal alloy (lead, tin, and antimony) critical for commercial success compared to wooden block printing?',
      scenario: 'You are analyzing technological innovations of the Renaissance.',
      questionType: 'multiple-choice',
      options: [
        { id: 'opt1', text: 'Metal type could withstand thousands of screw-press impressions without warping or splintering, ensuring uniform legible letters.', isCorrect: true, feedback: 'Correct! The durable alloy could be cast quickly, resisted high compression forces, and did not absorb moisture.' },
        { id: 'opt2', text: 'Metal letters were lighter than feathers.', isCorrect: false, feedback: 'Incorrect: Lead alloys are dense and heavy.' },
        { id: 'opt3', text: 'Wood was completely illegal in 15th-century Europe.', isCorrect: false, feedback: 'Incorrect: Wood was the most common building material of the era.' }
      ],
      explanation: 'Wooden type soaked up ink, swelled, and splintered under heavy screw pressure. Gutenberg’s metal alloy maintained precise margins across tens of thousands of pages.'
    },
    relatedConceptIds: ['industrial-revolution', 'binary-search']
  },
  {
    id: 'industrial-revolution',
    title: 'The Industrial Revolution & Steam Mechanization',
    subjectId: 'history',
    subjectName: 'History',
    category: 'Engineering',
    difficulty: 'Intermediate',
    readingTime: '6 min read',
    shortDescription: 'The transition from agrarian manual labor to steam engines, factories, and urbanized economies.',
    learn: {
      definition: 'The Industrial Revolution (circa 1760–1840) was the global transition from manual artisan craftsmanship to factory machine manufacturing, catalyzed by coal combustion and Watt’s steam engine.',
      textbookExplanation: 'Beginning in Great Britain, innovations in textile spinning (Spinning Jenny), metallurgy (coke-fueled blast furnaces), and steam power severed human productivity limits from muscle and draft animal power. This triggered massive rural-to-urban migration, created modern corporate structures, and prompted early labor reform laws.',
      keyTerms: [
        { term: 'Watt Steam Engine', definition: 'A condenser-equipped steam engine that converted coal combustion heat into continuous rotary mechanical motion.' },
        { term: 'Urbanization', definition: 'The rapid population migration from rural agricultural villages into dense manufacturing cities.' }
      ],
      keyTakeaways: [
        'Shifted global production from hand tools to machine-driven factories.',
        'Spurred rail transportation networks and globalized trade.'
      ]
    },
    connect: {
      realWorldSummary: 'Modern factory robotics, 40-hour work weeks, and climate change origins trace directly back to the Industrial Revolution.',
      examples: [
        {
          title: 'The Modern 8-Hour Workday and Labor Laws',
          context: 'Early textile mills ran 14-to-16-hour shifts using child labor. Worker strikes and union organizing in 19th-century Manchester and Chicago led to the establishment of the weekend, workplace safety standards, and minimum wage legislation.',
          whyItMatters: 'Shapes labor protections and employment rights worldwide today.',
          badge: 'Social History'
        },
        {
          title: 'The Origins of Anthropogenic Carbon Emissions',
          context: 'Ice core samples from Greenland and Antarctica show atmospheric CO2 remaining stable at ~280 ppm for thousands of years until the late 1700s, when coal burning kicked off the upward climb to over 420 ppm today.',
          whyItMatters: 'Connects historical technological transitions with contemporary climate policy.',
          badge: 'Environmental History'
        }
      ]
    },
    apply: {
      problemStatement: 'Why was James Watt’s invention of the separate condenser in 1769 such a breakthrough over Thomas Newcomen’s earlier steam engine?',
      scenario: 'You are studying thermodynamic improvements in early industrial machinery.',
      questionType: 'multiple-choice',
      options: [
        { id: 'opt1', text: 'The separate condenser kept the main cylinder hot continuously, cutting coal fuel consumption by more than 75%.', isCorrect: true, feedback: 'Correct! Newcomen engines repeatedly cooled and reheated the main cylinder, wasting immense amounts of thermal energy.' },
        { id: 'opt2', text: 'It eliminated the need for water or steam entirely.', isCorrect: false, feedback: 'Incorrect: Steam was still the working fluid.' },
        { id: 'opt3', text: 'It converted the engine into an electric motor.', isCorrect: false, feedback: 'Incorrect: Electricity was not harnessed for industrial motors until late in the 19th century.' }
      ],
      explanation: 'By keeping the main piston cylinder at steam temperature and condensing steam in a separate chilled chamber, Watt transformed the steam engine from an inefficient mine pump into a practical universal power source.'
    },
    relatedConceptIds: ['printing-press', 'mechanical-levers']
  },
  {
    id: 'silk-road',
    title: 'The Silk Road & Early Global Trade Networks',
    subjectId: 'history',
    subjectName: 'History',
    category: 'Economics and Money',
    difficulty: 'Beginner',
    readingTime: '5 min read',
    shortDescription: 'The ancient trans-Eurasian trade routes that connected Han China, Persia, Rome, and India.',
    learn: {
      definition: 'The Silk Road was an ancient network of Eurasian trade routes active from the Han dynasty (130 BCE) until the Ottoman Empire boycotted trade in the 1450s, facilitating commercial, cultural, and technological exchange.',
      textbookExplanation: 'Few merchants traveled the entire 6,400 km route. Instead, goods, ideas, and technologies moved along relays through oasis caravanserais like Samarkand and Dunhuang. Alongside high-value goods like silk, porcelain, spices, and glass, the Silk Road carried paper-making, gunpowder, mathematical numerals, and world religions.',
      keyTerms: [
        { term: 'Caravanserai', definition: 'Roadside inns spaced one day’s march apart where merchants rested camels, traded goods, and exchanged news.' },
        { term: 'Cultural Diffusion', definition: 'The geographic spread of cultural beliefs, technologies, and social activities across diverse societies.' }
      ],
      keyTakeaways: [
        'Transmitted paper-making, compasses, and zero across continents.',
        'Also inadvertently transmitted pathogens, including the Black Death in 1346.'
      ]
    },
    connect: {
      realWorldSummary: 'Modern container shipping networks and China’s Belt and Road Initiative follow Silk Road historical routes.',
      examples: [
        {
          title: 'The Transfer of Paper-Making from China to Europe',
          context: 'Chinese prisoners captured at the Battle of Talas in 751 CE taught paper-making to the Abbasid Caliphate in Baghdad, which eventually reached Renaissance Europe, paving the way for Gutenberg’s press.',
          whyItMatters: 'Demonstrates how trade and conflict catalyzed technological globalization.',
          badge: 'Technological History'
        },
        {
          title: 'The Spread of the Black Death (Yersinia pestis)',
          context: 'Fleas on rodents traveled in Mongol merchant caravans and supply wagons along Silk Road routes, reaching the Black Sea port of Kaffa before spreading into Europe and killing a third of the continent’s population.',
          whyItMatters: 'Early proof that global trade networks also act as vectors for epidemiological transmission.',
          badge: 'Public Health History'
        }
      ]
    },
    apply: {
      problemStatement: 'Why were goods traded along the overland Silk Road predominantly luxury items with high value-to-weight ratios (like silk, spices, and gems) rather than bulk commodities like grain or timber?',
      scenario: 'You are analyzing trade economics in pre-industrial civilizations.',
      questionType: 'multiple-choice',
      options: [
        { id: 'opt1', text: 'Overland transport by camel caravans over thousands of miles was so expensive that only luxury goods could fetch prices high enough to cover transit costs.', isCorrect: true, feedback: 'Correct! High freight costs meant shipping heavy bulk items like wheat overland was economically impossible.' },
        { id: 'opt2', text: 'Ancient peoples did not eat grain or construct timber homes.', isCorrect: false, feedback: 'Incorrect: Grain was the foundation of all pre-industrial agricultural societies.' },
        { id: 'opt3', text: 'Silk was the mandatory global currency required by all emperors.', isCorrect: false, feedback: 'Incorrect: Coins and silver bullion were standard currencies.' }
      ],
      explanation: 'Extreme logistical friction and high transport costs per kilogram meant overland caravans could only profit on luxury items with exceptional value-to-weight ratios.'
    },
    relatedConceptIds: ['printing-press', 'supply-and-demand']
  },

  // ==========================================
  // 8. CIVICS & POLITICAL SCIENCE
  // ==========================================
  {
    id: 'separation-of-powers',
    title: 'Separation of Powers & Checks and Balances',
    subjectId: 'civics',
    subjectName: 'Civics & Political Science',
    category: 'Society and Human Behaviour',
    difficulty: 'Beginner',
    readingTime: '6 min read',
    shortDescription: 'How constitutional democracies divide authority between Legislative, Executive, and Judicial branches to prevent tyranny.',
    learn: {
      definition: 'Separation of Powers is a governance doctrine originating from Montesquieu, dividing state responsibilities into distinct Legislative, Executive, and Judicial branches, with each branch exercising checks to constrain abuse by the others.',
      textbookExplanation: 'In a constitutional republic, the Legislative branch writes laws and controls taxation; the Executive branch enforces laws and administers government agencies; the Judicial branch interprets laws and adjudicates disputes under the constitution. Cross-branch checks (e.g., presidential veto, legislative budget power, and judicial review) ensure that ambition counteracts ambition.',
      keyTerms: [
        { term: 'Judicial Review', definition: 'The power of independent courts to declare executive actions or legislative statutes unconstitutional.' },
        { term: 'Veto and Override', definition: 'The executive power to reject a bill passed by the legislature, which can be overridden by a supermajority vote.' }
      ],
      keyTakeaways: [
        'No single individual or branch holds absolute authority.',
        'Deliberately introduces constitutional friction to prevent hasty authoritarian rule.'
      ]
    },
    connect: {
      realWorldSummary: 'Supreme Court rulings, parliamentary votes of no confidence, and congressional budget disputes reflect checks and balances.',
      examples: [
        {
          title: 'Judicial Invalidation of Executive Orders',
          context: 'When an executive president or prime minister issues a decree that exceeds statutory authority, independent supreme or constitutional courts can strike down the order, protecting citizen civil liberties.',
          whyItMatters: 'Ensures the rule of law applies equally to heads of state.',
          badge: 'Constitutional Law'
        },
        {
          title: 'Legislative "Power of the Purse"',
          context: 'An executive branch cannot wage prolonged wars or fund government initiatives without appropriation bills passed by elected legislators, giving representatives leverage to stop executive overreach.',
          whyItMatters: 'Guarantees taxpayers have a direct voice in how public revenues are spent.',
          badge: 'Democratic Governance'
        }
      ]
    },
    apply: {
      problemStatement: 'A president passes a decree banning all criticism of government economic policies in news broadcasts. Which constitutional check is best suited to overturn this action?',
      scenario: 'You are reviewing a civics scenario testing freedom of speech and constitutional safeguards.',
      questionType: 'multiple-choice',
      options: [
        { id: 'opt1', text: 'Judicial review by the courts, ruling the decree unconstitutional under constitutional free speech protections.', isCorrect: true, feedback: 'Correct! Independent judicial review specifically safeguards constitutional liberties from executive decrees.' },
        { id: 'opt2', text: 'Appealing to the military to dissolve the courts.', isCorrect: false, feedback: 'Incorrect: Military coups destroy democratic governance.' },
        { id: 'opt3', text: 'Allowing the president to rewrite the constitution unilaterally.', isCorrect: false, feedback: 'Incorrect: Authoritarian unilateral decree violates the separation of powers.' }
      ],
      explanation: 'Independent judicial courts possess the authority to review executive actions against constitutional rights, declaring unlawful executive orders null and void.'
    },
    relatedConceptIds: ['rule-of-law', 'electoral-systems']
  },
  {
    id: 'electoral-systems',
    title: 'First-Past-The-Post vs. Proportional Representation',
    subjectId: 'civics',
    subjectName: 'Civics & Political Science',
    category: 'Society and Human Behaviour',
    difficulty: 'Intermediate',
    readingTime: '6 min read',
    shortDescription: 'How voting system mathematics shape two-party dominance, third parties, and coalition governments.',
    learn: {
      definition: 'Electoral systems are the institutional voting rules by which citizen ballots are translated into legislative seats and executive leadership.',
      textbookExplanation: 'In First-Past-The-Post (FPTP) single-member districts, the candidate with the most votes wins the seat, regardless of whether they achieve an absolute majority. Duverger’s Law states that FPTP naturally produces two-party systems due to strategic voting and "spoiler" effects. In Proportional Representation (PR), parties receive seats in direct proportion to their overall national vote share, encouraging multiparty coalition governments.',
      keyTerms: [
        { term: 'Duverger’s Law', definition: 'The political science principle that single-member district plurality voting tends to favor a stable two-party system.' },
        { term: 'Coalition Government', definition: 'A government formed when multiple political parties cooperate to command a legislative majority.' }
      ],
      keyTakeaways: [
        'FPTP tends to produce decisive single-party majorities, but can leave minority parties underrepresented.',
        'PR accurately reflects broad voter sentiment, but can give small fringe parties disproportionate leverage in coalition talks.'
      ]
    },
    connect: {
      realWorldSummary: 'Explains why the US and UK have two dominant parties while Germany, the Netherlands, and New Zealand have multi-party coalitions.',
      examples: [
        {
          title: 'The German Bundestag MMP System',
          context: 'Germany uses Mixed-Member Proportional voting. Voters cast two votes: one for a local district representative and one for a party list. This combines local representation with national proportional fairness.',
          whyItMatters: 'Shows how voting system design can combine stable local representation with proportional democracy.',
          badge: 'Comparative Politics'
        },
        {
          title: 'Ranked-Choice Voting in Australia and Maine',
          context: 'In ranked-choice (instant-runoff) elections, voters rank candidates in order of preference. If no candidate wins an outright majority, lowest-ranking candidates are eliminated and second preferences transferred, eliminating the "spoiler" effect.',
          whyItMatters: 'Allows voters to support third-party candidates without inadvertently helping their least-preferred option.',
          badge: 'Electoral Reform'
        }
      ]
    },
    apply: {
      problemStatement: 'In an election with four candidates running in a single-member FPTP district, the votes are: Candidate A (32%), Candidate B (29%), Candidate C (25%), Candidate D (14%). Who wins the seat?',
      scenario: 'You are calculating election outcomes under plurality voting rules.',
      questionType: 'multiple-choice',
      options: [
        { id: 'opt1', text: 'Candidate A wins the seat, even though 68% of voters voted against them.', isCorrect: true, feedback: 'Correct! Under FPTP, whoever has the most votes (a plurality) wins the seat, even without a majority.' },
        { id: 'opt2', text: 'Candidates A and B share the seat 50/50.', isCorrect: false, feedback: 'Incorrect: Single-member districts can only send one representative.' },
        { id: 'opt3', text: 'The election is cancelled because nobody reached 50%.', isCorrect: false, feedback: 'Incorrect: Plurality rules do not require an absolute majority.' }
      ],
      explanation: 'First-Past-The-Post awards victory to the plurality winner. Candidate A takes 100% of the representation with 32% of the vote, illustrating common FPTP representation disparities.'
    },
    relatedConceptIds: ['separation-of-powers', 'rule-of-law']
  },
  {
    id: 'rule-of-law',
    title: 'The Rule of Law vs. Arbitrary Power',
    subjectId: 'civics',
    subjectName: 'Civics & Political Science',
    category: 'Society and Human Behaviour',
    difficulty: 'Beginner',
    readingTime: '5 min read',
    shortDescription: 'The foundational legal principle that all persons, institutions, and leaders are accountable to established public laws.',
    learn: {
      definition: 'The Rule of Law is the principle that law should govern a nation, as opposed to being governed by arbitrary decisions of individual government officials.',
      textbookExplanation: 'Dating back to the Magna Carta (1215), the Rule of Law requires that laws be publicly promulgated, equally enforced, independently adjudicated, and consistent with international human rights norms. In contrast, "Rule by Law" occurs in authoritarian regimes where rulers use statutes as instruments of state coercion while placing themselves above accountability.',
      keyTerms: [
        { term: 'Due Process', definition: 'The legal requirement that the state must respect all legal rights owed to a person before depriving them of liberty or property.' },
        { term: 'Habeas Corpus', definition: 'A legal recourse through which a prisoner can report an unlawful detention to a court.' }
      ],
      keyTakeaways: [
        'Nobody is above the law, including presidents, prime ministers, and judges.',
        'Requires an independent judiciary free from political interference.'
      ]
    },
    connect: {
      realWorldSummary: 'Contract enforcement, fair criminal trials, and investor confidence rely on the Rule of Law.',
      examples: [
        {
          title: 'Commercial Contracts and Economic Prosperity',
          context: 'Global companies invest billions in countries with predictable court systems because they know independent judges will enforce contracts and protect property rights without requiring bribes.',
          whyItMatters: 'Directly correlates with national GDP per capita and economic development.',
          badge: 'Law & Economics'
        },
        {
          title: 'The Right to an Attorney (Gideon v. Wainwright)',
          context: 'In 1963, the US Supreme Court ruled that indigent defendants facing felony charges are entitled to state-provided defense counsel, establishing that fair trials cannot depend on personal wealth.',
          whyItMatters: 'Guarantees due process and legal protections for marginalized citizens.',
          badge: 'Civil Rights'
        }
      ]
    },
    apply: {
      problemStatement: 'What separates the "Rule of Law" from "Rule by Law"?',
      scenario: 'You are analyzing legal definitions in an international human rights report.',
      questionType: 'multiple-choice',
      options: [
        { id: 'opt1', text: 'Under the Rule of Law, government officials are bound by and accountable to the same laws as citizens; under Rule by Law, the regime uses the law as a tool to control the populace while placing itself above it.', isCorrect: true, feedback: 'Correct! Rule by Law is an authoritarian tool; Rule of Law is a constitutional constraint on rulers.' },
        { id: 'opt2', text: 'Rule of Law means police carry weapons; Rule by Law means they do not.', isCorrect: false, feedback: 'Incorrect: Enforcement mechanisms exist in both.' },
        { id: 'opt3', text: 'There is no difference between the two terms.', isCorrect: false, feedback: 'Incorrect: The distinction is central to modern political science and international law.' }
      ],
      explanation: 'True Rule of Law binds rulers to legal limits, protecting individual liberties, whereas authoritarian regimes use "Rule by Law" as an instrument of state control.'
    },
    relatedConceptIds: ['separation-of-powers', 'electoral-systems']
  },

  // ==========================================
  // 9. ECONOMICS
  // ==========================================
  {
    id: 'supply-and-demand',
    title: 'Supply, Demand, and Market Equilibrium',
    subjectId: 'economics',
    subjectName: 'Economics',
    category: 'Economics and Money',
    difficulty: 'Beginner',
    readingTime: '6 min read',
    shortDescription: 'How buyers and sellers interact to discover prices and balance production in market economies.',
    learn: {
      definition: 'The Law of Supply states that as price rises, sellers produce more goods; the Law of Demand states that as price rises, buyers purchase less. Market equilibrium occurs at the price where quantity supplied equals quantity demanded.',
      textbookExplanation: 'When demand exceeds supply at a given price, a shortage occurs, exerting upward pressure on prices. Higher prices attract new manufacturers and encourage buyers to ration consumption. When supply exceeds demand, a surplus results, forcing price discounts. The price mechanism operates as a decentralized information system, coordinating resource allocation without central planners.',
      keyTerms: [
        { term: 'Equilibrium Price (P*)', definition: 'The market clearing price where quantity demanded equals quantity supplied.' },
        { term: 'Price Elasticity of Demand', definition: 'The responsiveness of quantity demanded to changes in price: %ΔQ / %ΔP.' }
      ],
      formula: 'Q_s(P) = Q_d(P) \\quad \\text{at Equilibrium}',
      formulaExplanation: 'The intersection point of the upward-sloping supply curve and downward-sloping demand curve.',
      workedExample: {
        problem: 'Suppose demand is Qd = 100 - 4P and supply is Qs = 20 + 4P. Find the equilibrium price P*.',
        solution: '100 - 4P = 20 + 4P  =>  8P = 80  =>  P* = $10.',
        steps: [
          'Set Qd equal to Qs: 100 - 4P = 20 + 4P.',
          'Add 4P to both sides: 100 = 20 + 8P.',
          'Subtract 20: 80 = 8P.',
          'Divide by 8: P = 10. Equilibrium price is $10.'
        ]
      },
      keyTakeaways: [
        'Prices balance consumer willingness to pay against supplier production costs.',
        'Price ceilings below equilibrium cause shortages; price floors above equilibrium cause surpluses.'
      ]
    },
    connect: {
      realWorldSummary: 'Airline surge ticket pricing, concert ticket scalping, and ride-sharing surge rates reflect supply and demand dynamics.',
      examples: [
        {
          title: 'Uber and Lyft Dynamic Surge Pricing',
          context: 'When it starts raining heavily after a stadium concert, ride requests spike while driver supply remains flat. Algorithms raise ride fares by 2.5x, which both rations demand and motivates nearby drivers to log on, re-balancing the local market.',
          whyItMatters: 'Shows real-time algorithmic price discovery in action.',
          badge: 'Platform Economics'
        },
        {
          title: 'Concert Ticket Scalping and Resale Markets',
          context: 'When artists price stadium tickets artificially below equilibrium to stay accessible to fans, demand drastically outstrips supply, spawning secondary ticket resale markets where scalpers resell tickets at actual market equilibrium prices.',
          whyItMatters: 'Demonstrates why price ceilings naturally produce secondary black or gray markets.',
          badge: 'Consumer Markets'
        }
      ]
    },
    apply: {
      problemStatement: 'A city introduces a strict rent control price ceiling set 30% below the market equilibrium rent. What is the predictable long-term economic outcome?',
      scenario: 'You are analyzing municipal housing policy proposals.',
      questionType: 'multiple-choice',
      options: [
        { id: 'opt1', text: 'A chronic housing shortage: developers build fewer new rental units while more tenants seek subsidized apartments.', isCorrect: true, feedback: 'Correct! Setting prices below equilibrium reduces quantity supplied while increasing quantity demanded, creating a persistent shortage.' },
        { id: 'opt2', text: 'A massive surplus of empty, unrented luxury apartments.', isCorrect: false, feedback: 'Incorrect: Surpluses occur when prices are held artificially above equilibrium.' },
        { id: 'opt3', text: 'Immediate 100% home ownership for all residents.', isCorrect: false, feedback: 'Incorrect: Rent control affects rental markets, not home purchases.' }
      ],
      explanation: 'Artificial price ceilings below equilibrium reduce supplier incentive to build and maintain rental properties while stimulating demand, generating persistent housing shortages.'
    },
    relatedConceptIds: ['inflation-and-money', 'opportunity-cost']
  },
  {
    id: 'inflation-and-money',
    title: 'Inflation, Purchasing Power, and Central Banks',
    subjectId: 'economics',
    subjectName: 'Economics',
    category: 'Economics and Money',
    difficulty: 'Intermediate',
    readingTime: '6 min read',
    shortDescription: 'Why prices rise over time, how central banks use interest rates, and how purchasing power erodes.',
    learn: {
      definition: 'Inflation is the rate at which the general level of prices for goods and services rises, eroding the purchasing power of a currency unit over time.',
      textbookExplanation: 'Inflation arises through two main mechanisms: Demand-Pull (aggregate demand outstripping productive capacity) and Cost-Push (rising input costs like energy or raw materials). Central banks (like the Federal Reserve or ECB) manage inflation by adjusting baseline interest rates: raising rates makes borrowing more expensive, dampening excess spending and slowing inflation.',
      keyTerms: [
        { term: 'Consumer Price Index (CPI)', definition: 'A statistical measure tracking the weighted price basket of consumer goods and services over time.' },
        { term: 'Purchasing Power', definition: 'The quantity of goods and services that one unit of currency can buy.' }
      ],
      formula: '\\text{Real Interest Rate} \\approx \\text{Nominal Interest Rate} - \\text{Inflation Rate}',
      formulaExplanation: 'The Fisher Equation, showing the true inflation-adjusted return on savings or debt.',
      keyTakeaways: [
        'Moderate predictable inflation (around 2% per year) encourages economic investment over cash hoarding.',
        'High inflation acts as a stealth tax on savings, eroding real purchasing power.'
      ]
    },
    connect: {
      realWorldSummary: 'Mortgage interest rate hikes, wage negotiations, and grocery bill increases reflect macroeconomic inflation.',
      examples: [
        {
          title: 'Central Bank Interest Rate Hikes',
          context: 'When post-pandemic inflation spiked to 9%, central banks raised benchmark rates from near 0% to over 5%. This raised mortgage and business loan costs, slowing consumer spending and cooling inflation back toward 2–3%.',
          whyItMatters: 'Directly impacts home loan payments and national employment levels.',
          badge: 'Monetary Policy'
        },
        {
          title: 'The Erosion of Cash Savings Over Time',
          context: 'Keeping $10,000 cash in a safe at 3% annual inflation means that after 24 years, that same $10,000 will only buy about half as much food, fuel, and housing as it did initially.',
          whyItMatters: 'Highlights why long-term wealth preservation requires investments that outpace inflation.',
          badge: 'Personal Wealth'
        }
      ]
    },
    apply: {
      problemStatement: 'You earn 5% nominal annual interest on a bank certificate of deposit (CD), while national inflation is running at 3%. What is your true real purchasing power gain?',
      scenario: 'You are calculating the real yield on your savings account.',
      questionType: 'multiple-choice',
      options: [
        { id: 'opt1', text: '+2% real return', isCorrect: true, feedback: 'Correct! Real rate ≈ 5% nominal - 3% inflation = 2% real gain in purchasing power.' },
        { id: 'opt2', text: '+8% real return', isCorrect: false, feedback: 'Incorrect: Inflation erodes your return, it does not add to it.' },
        { id: 'opt3', text: '-2% real return', isCorrect: false, feedback: 'Incorrect: Nominal return exceeds inflation, so the real return remains positive.' }
      ],
      explanation: 'Subtract the inflation rate from the nominal interest rate: 5% - 3% = 2% real gain in purchasing power.'
    },
    relatedConceptIds: ['compound-interest', 'supply-and-demand', 'opportunity-cost']
  },
  {
    id: 'opportunity-cost',
    title: 'Opportunity Cost and Economic Trade-offs',
    subjectId: 'economics',
    subjectName: 'Economics',
    category: 'Economics and Money',
    difficulty: 'Beginner',
    readingTime: '5 min read',
    shortDescription: 'The value of the next best alternative given up whenever a choice is made.',
    learn: {
      definition: 'Opportunity cost is the loss of potential gain from other alternatives when one alternative is chosen.',
      textbookExplanation: 'Because resources (time, money, labor, factory capacity) are fundamentally scarce, choosing to allocate a resource toward one option precludes using it for another. Economic cost includes both explicit out-of-pocket costs and implicit opportunity costs.',
      keyTerms: [
        { term: 'Scarcity', definition: 'The fundamental economic condition of having unlimited human wants in a world of limited resources.' },
        { term: 'Production Possibilities Frontier (PPF)', definition: 'A graphical curve depicting the maximum output possibilities for two goods given fixed resources.' }
      ],
      keyTakeaways: [
        'Nothing is truly free; every expenditure of time or capital carries an opportunity cost.',
        'Sunk costs should be ignored when making forward-looking opportunity cost decisions.'
      ]
    },
    connect: {
      realWorldSummary: 'College tuition decisions, corporate capital allocation, and daily time budgeting reflect opportunity costs.',
      examples: [
        {
          title: 'The Real Cost of Attending College',
          context: 'The cost of college is not just tuition and textbooks. It also includes the four years of forgone full-time wages you would have earned had you entered the workforce immediately after high school.',
          whyItMatters: 'Ensures students and families evaluate education investments comprehensively.',
          badge: 'Career Economics'
        },
        {
          title: 'Corporate R&D vs. Stock Buybacks',
          context: 'When an automaker spends $5 billion repurchasing company shares instead of developing electric battery platforms, the opportunity cost is falling behind competitors in next-generation technology.',
          whyItMatters: 'Shapes strategic corporate planning and market competition.',
          badge: 'Corporate Finance'
        }
      ]
    },
    apply: {
      problemStatement: 'You have a free Saturday afternoon. Option A: work an overtime shift earning $120. Option B: study for an upcoming professional certification exam. If you choose to study, what is your opportunity cost?',
      scenario: 'You are weighing weekend time management options.',
      questionType: 'multiple-choice',
      options: [
        { id: 'opt1', text: 'The $120 in forgone wages you chose not to earn.', isCorrect: true, feedback: 'Correct! The forgone $120 earnings represents the value of your next best alternative.' },
        { id: 'opt2', text: '$0, because studying at home did not require spending any money.', isCorrect: false, feedback: 'Incorrect: Opportunity cost accounts for forgone benefits, not just out-of-pocket cash expenses.' },
        { id: 'opt3', text: 'The cost of your laptop computer.', isCorrect: false, feedback: 'Incorrect: The laptop was already purchased and is a sunk asset.' }
      ],
      explanation: 'Opportunity cost measures the value of the forgone next-best option—in this case, the $120 you would have earned working overtime.'
    },
    relatedConceptIds: ['supply-and-demand', 'inflation-and-money']
  },

  // ==========================================
  // 10. ENGINEERING & TECHNOLOGY
  // ==========================================
  {
    id: 'mechanical-levers',
    title: 'Levers and Mechanical Advantage',
    subjectId: 'engineering',
    subjectName: 'Engineering & Technology',
    category: 'Engineering',
    difficulty: 'Beginner',
    readingTime: '7 min read',
    shortDescription: 'How simple rigid bars and pivot points amplify human physical strength to lift massive loads.',
    learn: {
      definition: 'A lever is a simple machine consisting of a rigid beam pivoted at a fixed hinge or fulcrum. Mechanical advantage (MA) is the factor by which the lever amplifies the input effort force applied to lift an output load.',
      textbookExplanation: 'Operating on the principle of conservation of energy (Work = Force × Distance), a lever cannot create free energy. To amplify force at the load end, the effort force must travel through a proportionally greater distance. The ratio of the effort arm length (distance from fulcrum to effort) to the load arm length (distance from fulcrum to load) defines the Ideal Mechanical Advantage (IMA). Levers are grouped into three classes based on the relative positions of the fulcrum, effort, and load.',
      keyTerms: [
        { term: 'Fulcrum', definition: 'The fixed pivot point about which the lever arm rotates.' },
        { term: 'Effort Arm', definition: 'The perpendicular distance from the fulcrum to the point where effort force is applied.' },
        { term: 'Load Arm', definition: 'The perpendicular distance from the fulcrum to the point where the resisting load is located.' },
        { term: 'Mechanical Advantage (MA)', definition: 'The ratio of output load force to input effort force: MA = Load / Effort.' }
      ],
      formula: '\\text{IMA} = \\frac{\\text{Effort Arm}}{\\text{Load Arm}}, \\quad \\text{Load Force} = \\text{Effort Force} \\times \\text{IMA}',
      formulaExplanation: 'Where Effort Arm and Load Arm are measured in meters (m), and Effort Force is in Newtons (N).',
      workedExample: {
        problem: 'You use a 2.0-meter crowbar. The fulcrum pivot is positioned 0.2 meters from a heavy rock load. If you apply a downward effort force of 150 N at the far handle end (effort arm = 1.8 m), calculate the ideal mechanical advantage and the load lifting force.',
        solution: 'IMA = 1.8 m / 0.2 m = 9.0. Load Force = 150 N × 9.0 = 1,350 N.',
        steps: [
          'Identify lengths: Effort Arm = 1.8 m, Load Arm = 0.2 m.',
          'Calculate IMA: 1.8 / 0.2 = 9.0.',
          'Calculate ideal output force: 150 N × 9.0 = 1,350 N.',
          'A modest 150 N push lifts a heavy 1,350 N boulder (~137 kg).'
        ]
      },
      keyTakeaways: [
        'Energy is conserved: a lever trade-offs distance for force amplification.',
        'Class 1 levers (crowbars, seesaws) place the fulcrum between effort and load.',
        'Class 2 levers (wheelbarrows, nutcrackers) place the load between fulcrum and effort, always providing IMA > 1.',
        'Class 3 levers (tweezers, human forearm) place effort in the middle, sacrificing force to gain speed and range of motion.'
      ]
    },
    connect: {
      realWorldSummary: 'Construction crowbars, automobile jacks, nail clippers, and the human arm operate as levers.',
      examples: [
        {
          title: 'Heavy Duty Crowbars and Pry Bars',
          context: 'When demolition workers need to pull nails out of solid timber, a crowbar uses a long 90 cm handle and a short 3 cm curved foot. This produces a 30:1 mechanical advantage, turning a 200 N human push into 6,000 N of extraction force.',
          whyItMatters: 'Allows workers to handle structural demolition without motorized tools.',
          badge: 'Construction Tools'
        },
        {
          title: 'Wheelbarrows (Class 2 Levers)',
          context: 'The wheel axle acts as the fulcrum, the heavy gravel load sits in the middle tub, and the handles are lifted at the far ends. Because the load arm is roughly half the effort arm, lifting 100 kg of concrete only requires lifting 50 kg of effective weight.',
          whyItMatters: 'Enables safe manual transport of heavy bulk materials on job sites.',
          badge: 'Everyday Engineering'
        },
        {
          title: 'The Human Bicep Forearm (Class 3 Lever)',
          context: 'Your elbow joint is the fulcrum. The bicep tendon inserts just 4 cm forward of the elbow, while the hand is 35 cm away. Because the effort arm is shorter than the load arm (IMA ≈ 0.11), the bicep must exert 9x more force than the weight held, but gains rapid hand movement speed.',
          whyItMatters: 'Explains human musculoskeletal biomechanics and joint leverage.',
          badge: 'Human Biomechanics'
        }
      ]
    },
    apply: {
      problemStatement: 'You need to lift a 600 N machinery crate using a Class 1 lever. If your maximum comfortable effort push is 150 N, what is the minimum required ratio of Effort Arm to Load Arm (IMA)?',
      scenario: 'You are setting up rigging equipment in a factory warehouse.',
      questionType: 'multiple-choice',
      options: [
        { id: 'opt1', text: '4.0 to 1', isCorrect: true, feedback: 'Correct! IMA = Load / Effort = 600 N / 150 N = 4.0. Your effort arm must be at least 4 times longer than the load arm.' },
        { id: 'opt2', text: '0.25 to 1', isCorrect: false, feedback: 'Incorrect: A ratio of 0.25 would require an effort force of 2,400 N.' },
        { id: 'opt3', text: '1.5 to 1', isCorrect: false, feedback: 'Incorrect: 1.5 × 150 N is only 225 N, insufficient to lift 600 N.' },
        { id: 'opt4', text: '10.0 to 1', isCorrect: false, feedback: 'Incorrect: While 10:1 would work, the question asks for the minimum required ratio.' }
      ],
      explanation: 'To lift a 600 N load with an effort of 150 N, the required mechanical advantage is 600 N / 150 N = 4.0. Therefore, the effort arm must be at least 4 times longer than the load arm.'
    },
    simulationId: 'mechanical-lever',
    relatedConceptIds: ['gear-ratios', 'structural-trusses', 'ohms-law']
  },
  {
    id: 'gear-ratios',
    title: 'Gear Ratios and Torque Transmission',
    subjectId: 'engineering',
    subjectName: 'Engineering & Technology',
    category: 'Engineering',
    difficulty: 'Intermediate',
    readingTime: '6 min read',
    shortDescription: 'How interlocking toothed wheels trade rotational speed for mechanical torque in gearboxes.',
    learn: {
      definition: 'A gear ratio is the ratio of the angular velocity of the input gear to the angular velocity of the output gear, directly proportional to the ratio of their tooth counts.',
      textbookExplanation: 'When a smaller drive gear with fewer teeth turns a larger driven gear with more teeth, the output gear rotates more slowly, but its rotational torque is magnified by the gear ratio. Conversely, gearing up increases rotational speed while sacrificing output torque.',
      keyTerms: [
        { term: 'Torque (τ)', definition: 'Rotational force measured in Newton-meters (N·m).' },
        { term: 'Gear Ratio', definition: 'Driven gear tooth count divided by driving gear tooth count: GR = N_out / N_in.' }
      ],
      formula: '\\text{Gear Ratio} = \\frac{N_{\\text{out}}}{N_{\\text{in}}}, \\quad \\tau_{\\text{out}} = \\tau_{\\text{in}} \\times \\text{Gear Ratio}',
      formulaExplanation: 'Where N represents tooth counts and τ represents rotational torque.',
      keyTakeaways: [
        'Gearing down (large gear driven by small gear) multiplies torque for climbing steep hills.',
        'Gearing up (small gear driven by large gear) maximizes road speed at the cost of torque.'
      ]
    },
    connect: {
      realWorldSummary: 'Bicycle gear shifters, wind turbine generators, and electric vehicle reduction gearboxes rely on gear ratios.',
      examples: [
        {
          title: 'Multi-Speed Mountain Bicycles',
          context: 'When climbing a steep hill, a cyclist shifts into the smallest front chainring and largest rear cassette cog. This low gear ratio requires minimal pedaling effort while allowing the bike to climb smoothly.',
          whyItMatters: 'Enables cyclists to climb steep terrain efficiently.',
          badge: 'Everyday Mechanics'
        },
        {
          title: 'Electric Vehicle Single-Speed Reduction Gears',
          context: 'Tesla and other EV motors spin at up to 18,000 RPM. A fixed 9:1 reduction gearbox reduces drive wheel rotational speed to ~2,000 RPM while multiplying motor torque by 9x for rapid acceleration.',
          whyItMatters: 'Eliminates complex multi-clutch transmissions, boosting EV drivetrain reliability.',
          badge: 'Automotive Engineering'
        }
      ]
    },
    apply: {
      problemStatement: 'An electric motor produces 20 N·m of torque and spins at 1,200 RPM. It drives a 10-tooth pinion gear meshed to a 40-tooth spur gear. What are the output speed and torque?',
      scenario: 'You are calculating mechanical parameters for a robotic arm joint.',
      questionType: 'multiple-choice',
      options: [
        { id: 'opt1', text: '300 RPM speed and 80 N·m torque', isCorrect: true, feedback: 'Correct! Gear ratio is 40/10 = 4. Speed is divided by 4 (1200/4 = 300 RPM), and torque is multiplied by 4 (20 × 4 = 80 N·m).' },
        { id: 'opt2', text: '4,800 RPM speed and 5 N·m torque', isCorrect: false, feedback: 'Incorrect: The output gear is larger, which reduces speed and increases torque.' },
        { id: 'opt3', text: '1,200 RPM speed and 20 N·m torque', isCorrect: false, feedback: 'Incorrect: A 10:40 gear pair changes both speed and torque.' }
      ],
      explanation: 'Gear Ratio = 40 / 10 = 4. Output speed = 1,200 / 4 = 300 RPM. Output torque = 20 × 4 = 80 N·m.'
    },
    relatedConceptIds: ['mechanical-levers', 'structural-trusses']
  },
  {
    id: 'structural-trusses',
    title: 'Structural Trusses & Triangle Rigidity',
    subjectId: 'engineering',
    subjectName: 'Engineering & Technology',
    category: 'Engineering',
    difficulty: 'Intermediate',
    readingTime: '6 min read',
    shortDescription: 'Why bridges, construction cranes, and roof rafters are assembled out of interconnected triangles.',
    learn: {
      definition: 'A truss is a structural framework composed of straight members joined at nodes to form rigid triangular units that channel external loads into pure tension and compression forces.',
      textbookExplanation: 'A quadrilateral frame can easily deform into a parallelogram under lateral shear. A triangle, however, is geometrically rigid: its angles cannot change unless the lengths of its sides physically change. Trusses decompose complex bending stresses into pure axial compression (pushing) and tension (pulling), allowing slender steel or timber members to carry heavy loads with minimal material.',
      keyTerms: [
        { term: 'Axial Force', definition: 'A force directed along the longitudinal axis of a member (either tension or compression).' },
        { term: 'Pin Joint', definition: 'A connection between truss members that allows rotation but transfers no internal bending moments.' }
      ],
      keyTakeaways: [
        'Triangles are the only geometrically stable geometric polygon under load.',
        'Eliminates internal bending moments, allowing lighter structures that carry higher loads.'
      ]
    },
    connect: {
      realWorldSummary: 'Railroad bridges, construction tower cranes, and residential roof rafters are built on truss frameworks.',
      examples: [
        {
          title: 'Pratt and Warren Railroad Truss Bridges',
          context: 'Heavy freight trains weighing thousands of tons cross wide rivers supported by open steel truss frameworks. Diagonal members carry tension while vertical members absorb compression, distributing loads safely to river pier abutments.',
          whyItMatters: 'Enabled rail networks to span major geographical obstacles.',
          badge: 'Civil Engineering'
        },
        {
          title: 'Construction Tower Cranes',
          context: 'Tower cranes that assemble skyscrapers withstand strong wind gusts because their horizontal booms are triangular lattice trusses, offering high stiffness with minimal wind surface area.',
          whyItMatters: 'Ensures stability when lifting multi-ton construction materials at high altitudes.',
          badge: 'Construction Equipment'
        }
      ]
    },
    apply: {
      problemStatement: 'Why does adding a single diagonal strut across a wobbly rectangular wooden fence gate instantly make the entire gate sturdy and rigid?',
      scenario: 'You are repairing a wooden garden fence gate that is sagging at the latch corner.',
      questionType: 'multiple-choice',
      options: [
        { id: 'opt1', text: 'The diagonal divides the flexible four-sided rectangle into two rigid triangles whose internal angles cannot shift without altering side lengths.', isCorrect: true, feedback: 'Correct! Triangulation prevents shear deformation by turning bending stresses into axial tension/compression.' },
        { id: 'opt2', text: 'The diagonal strut acts as an electrical lightning rod.', isCorrect: false, feedback: 'Incorrect: Wood is an electrical insulator.' },
        { id: 'opt3', text: 'The diagonal adds extra weight to pull the gate into the dirt.', isCorrect: false, feedback: 'Incorrect: Adding excess weight is undesirable; the benefit comes from geometric rigidity.' }
      ],
      explanation: 'A four-sided polygon can shear without changing side lengths. Adding a diagonal strut creates two fixed triangles, preventing angular deformation.'
    },
    relatedConceptIds: ['mechanical-levers', 'pythagorean-theorem']
  },

  // ==========================================
  // 11. PSYCHOLOGY
  // ==========================================
  {
    id: 'cognitive-biases',
    title: 'Confirmation Bias & Cognitive Heuristics',
    subjectId: 'psychology',
    subjectName: 'Psychology',
    category: 'Society and Human Behaviour',
    difficulty: 'Beginner',
    readingTime: '6 min read',
    shortDescription: 'How the human brain prioritizes information that confirms pre-existing beliefs while ignoring conflicting evidence.',
    learn: {
      definition: 'Confirmation bias is the cognitive tendency to search for, interpret, favor, and recall information in a way that confirms or supports prior personal beliefs or hypotheses.',
      textbookExplanation: 'Faced with information overload, the brain relies on mental shortcuts (heuristics) to save metabolic energy. When confronted with complex issues, people subconsciously interpret ambiguous data as supporting their existing viewpoint, while subjecting contradictory evidence to heightened skepticism. In the digital age, social media recommendation algorithms amplify this bias into algorithmic echo chambers.',
      keyTerms: [
        { term: 'Cognitive Heuristic', definition: 'A mental shortcut that allows people to solve problems and make judgments quickly and efficiently.' },
        { term: 'Echo Chamber', definition: 'An environment where a person only encounters information or opinions that reflect and reinforce their own.' }
      ],
      keyTakeaways: [
        'Affects information search, data interpretation, and memory recall.',
        'Overcoming it requires actively seeking disconfirming evidence through the scientific method.'
      ]
    },
    connect: {
      realWorldSummary: 'Stock market bubbles, medical misdiagnoses, and social media polarization are fueled by confirmation bias.',
      examples: [
        {
          title: 'Algorithmic Social Media Echo Chambers',
          context: 'When a user clicks on articles supporting a specific political viewpoint, recommendation algorithms prioritize similar content to maximize watch time, reinforcing their perspective and making alternative viewpoints seem marginal.',
          whyItMatters: 'Deepens social polarization and hinders collaborative civic dialogue.',
          badge: 'Digital Culture'
        },
        {
          title: 'Diagnostic Anchoring in Emergency Medicine',
          context: 'If a doctor quickly assumes an ER patient has standard acid reflux based on an initial symptom, confirmation bias can cause them to overlook subtle indicators of an atypical myocardial infarction (heart attack).',
          whyItMatters: 'Highlights why medical protocols require structured diagnostic checklists.',
          badge: 'Clinical Psychology'
        }
      ]
    },
    apply: {
      problemStatement: 'An investor firmly believes that a new startup’s stock will surge. When reviewing financial statements, they focus on revenue growth while dismissing mounting debt and falling cash flow. What cognitive bias is at play?',
      scenario: 'You are analyzing behavioral biases in investment portfolio management.',
      questionType: 'multiple-choice',
      options: [
        { id: 'opt1', text: 'Confirmation bias', isCorrect: true, feedback: 'Correct! The investor selects data that validates their initial thesis while dismissing disconfirming indicators.' },
        { id: 'opt2', text: 'Hindsight bias', isCorrect: false, feedback: 'Incorrect: Hindsight bias is the belief after an event that one predicted it all along.' },
        { id: 'opt3', text: 'Placebo effect', isCorrect: false, feedback: 'Incorrect: The placebo effect describes physiological responses to inert treatments.' }
      ],
      explanation: 'Selectively highlighting data supporting a preferred hypothesis while discounting contradictory evidence is the hallmark of confirmation bias.'
    },
    relatedConceptIds: ['probability', 'working-memory']
  },
  {
    id: 'operant-conditioning',
    title: 'Operant Conditioning & Habit Formation',
    subjectId: 'psychology',
    subjectName: 'Psychology',
    category: 'Society and Human Behaviour',
    difficulty: 'Beginner',
    readingTime: '6 min read',
    shortDescription: 'How positive reinforcement and variable reward schedules shape animal and human behaviors.',
    learn: {
      definition: 'Operant conditioning is a method of learning developed by B.F. Skinner that uses rewards and punishments to modify voluntary behaviors over time.',
      textbookExplanation: 'Behaviors followed by positive reinforcement (favorable outcomes) are strengthened and repeated. Behaviors followed by punishment are diminished. Crucially, Skinner discovered that variable-ratio schedules (where rewards are dispensed unpredictably after an average number of responses) produce the highest response rates and strongest resistance to extinction.',
      keyTerms: [
        { term: 'Positive Reinforcement', definition: 'Introducing a desirable stimulus following a behavior to increase the likelihood of that behavior recurring.' },
        { term: 'Variable-Ratio Schedule', definition: 'A reinforcement schedule where a behavior is rewarded after an unpredictable number of occurrences.' }
      ],
      keyTakeaways: [
        'Variable-ratio reinforcement creates the most persistent, addiction-resistant behavioral loops.',
        'Positive reinforcement is generally more effective for long-term behavioral change than punishment.'
      ]
    },
    connect: {
      realWorldSummary: 'Smartphone notifications, casino slot machines, and dog obedience training run on operant conditioning.',
      examples: [
        {
          title: 'Smartphone Notification Feeds and Slot Machines',
          context: 'Pulling down to refresh an Instagram or TikTok feed uses the same variable-ratio reward schedule as a casino slot machine: sometimes you find an exciting video, sometimes nothing. This unpredictability triggers dopamine spikes, encouraging compulsive checking.',
          whyItMatters: 'Helps users recognize persuasive UI patterns to build healthier digital habits.',
          badge: 'Product Design'
        },
        {
          title: 'Clicker Training in Domestic Pets',
          context: 'Trainers pair the distinct click of a clicker with a food treat. The click becomes a conditioned reinforcer, marking the exact moment a dog sits correctly so the animal clearly connects the action with the reward.',
          whyItMatters: 'Demonstrates clear behavioral reinforcement in animal learning.',
          badge: 'Animal Behavior'
        }
      ]
    },
    apply: {
      problemStatement: 'Why are slot machines in casinos far more addictive and resistant to extinction than a vending machine that delivers a soda every single time you put in money?',
      scenario: 'You are studying behavioral psychology reinforcement schedules.',
      questionType: 'multiple-choice',
      options: [
        { id: 'opt1', text: 'Slot machines operate on a variable-ratio reinforcement schedule, which produces steady, compulsive behavior that resists extinction.', isCorrect: true, feedback: 'Correct! Unpredictable reward intervals trigger persistent dopamine-driven engagement.' },
        { id: 'opt2', text: 'Vending machines emit hypnotic sound frequencies.', isCorrect: false, feedback: 'Incorrect: Vending machines use a continuous 1:1 reinforcement schedule.' },
        { id: 'opt3', text: 'Slot machines are legally required to pay out more money than players put in.', isCorrect: false, feedback: 'Incorrect: Slot machines are mathematically programmed to retain an expected house edge.' }
      ],
      explanation: 'A variable-ratio schedule delivers rewards unpredictably, making the behavior exceptionally durable and resistant to extinction.'
    },
    relatedConceptIds: ['cognitive-biases', 'probability']
  },
  {
    id: 'working-memory',
    title: 'Working Memory & Miller’s Law (The Rule of 7±2)',
    subjectId: 'psychology',
    subjectName: 'Psychology',
    category: 'Technology',
    difficulty: 'Intermediate',
    readingTime: '5 min read',
    shortDescription: 'The cognitive limits of human short-term memory and how chunking optimizes UI/UX design.',
    learn: {
      definition: 'Working memory is the cognitive system responsible for temporarily holding and manipulating information for complex tasks. George Miller’s Law suggests humans can hold approximately 7 (plus or minus 2) items in conscious working memory simultaneously.',
      textbookExplanation: 'Working memory acts like a computer’s RAM: it is fast and accessible, but strictly limited in capacity and volatile over time. To handle complex information, the brain uses "chunking"—grouping individual data points into meaningful higher-level units. For example, a 10-digit phone number is split into three chunks (area code, prefix, line number).',
      keyTerms: [
        { term: 'Chunking', definition: 'The process of grouping individual pieces of information into meaningful, cohesive units to enhance memory capacity.' },
        { term: 'Cognitive Load', definition: 'The total amount of mental effort being used in working memory at any given moment.' }
      ],
      keyTakeaways: [
        'Un-rehearsed short-term memory decays within 15–30 seconds.',
        'Splitting information into meaningful chunks reduces cognitive load and improves comprehension.'
      ]
    },
    connect: {
      realWorldSummary: 'Website navigation menus, credit card formatting, and air traffic control commands are designed around working memory limits.',
      examples: [
        {
          title: 'Credit Card Number Grouping (4x4)',
          context: 'Credit card numbers are formatted as four groups of four digits (1234 5678 9012 3456) rather than a continuous 16-digit string. This lets our working memory handle four distinct chunks instead of exceeding its 7±2 capacity limit.',
          whyItMatters: 'Reduces typographical entry errors when purchasing goods online.',
          badge: 'UI/UX Design'
        },
        {
          title: 'Air Traffic Control Brevity Codes',
          context: 'Air traffic controllers issue flight commands in standardized sequences of 3–4 items (Callsign, Altitude, Heading, Squawk) to prevent pilot working memory overload during critical flight phases.',
          whyItMatters: 'Prevents aviation communication errors and runway incursions.',
          badge: 'Aviation Safety'
        }
      ]
    },
    apply: {
      problemStatement: 'A software engineer designs a navigation menu with 22 top-level dropdown items. Users regularly report feeling overwhelmed and struggle to locate key pages. What UI/UX principle should be applied?',
      scenario: 'You are redesigning an enterprise software navigation bar.',
      questionType: 'multiple-choice',
      options: [
        { id: 'opt1', text: 'Group the 22 items into 5 to 7 logical categories (chunking), bringing the top-level choices within Miller’s Law working memory capacity.', isCorrect: true, feedback: 'Correct! Chunking items into 5–7 thematic categories respects working memory limits and reduces cognitive load.' },
        { id: 'opt2', text: 'Increase the total number of items to 40 so all options are visible at once.', isCorrect: false, feedback: 'Incorrect: Adding more items further overloads working memory.' },
        { id: 'opt3', text: 'Make all text flash in alternating neon colors.', isCorrect: false, feedback: 'Incorrect: Flashing elements create visual distraction and accessibility barriers.' }
      ],
      explanation: 'Organizing 22 items into 5–7 logical categories uses chunking to fit user working memory capacity, lowering cognitive load and speeding up navigation.'
    },
    relatedConceptIds: ['cognitive-biases', 'visual-hierarchy']
  },

  // ==========================================
  // 12. ART & DESIGN
  // ==========================================
  {
    id: 'golden-ratio',
    title: 'The Golden Ratio and the Rule of Thirds',
    subjectId: 'art-design',
    subjectName: 'Art & Design',
    category: 'Art and Design',
    difficulty: 'Beginner',
    readingTime: '6 min read',
    shortDescription: 'The mathematical proportion (1.618...) found in nature, Renaissance masterpieces, and camera viewfinders.',
    learn: {
      definition: 'The Golden Ratio (represented by the Greek letter Phi, φ ≈ 1.618) is a mathematical proportion where the ratio of the whole to the larger segment equals the ratio of the larger segment to the smaller segment.',
      textbookExplanation: 'In geometry, dividing a segment such that (a+b)/a = a/b produces the irrational constant φ = (1 + √5)/2 ≈ 1.618033... In visual arts and photography, the Rule of Thirds provides a practical simplification: dividing a composition into a 3x3 grid places key focal elements along grid lines and intersection points, producing dynamic, balanced compositions rather than static center-weighted images.',
      keyTerms: [
        { term: 'Phi (φ)', definition: 'The Golden Ratio irrational constant: approximately 1.6180339887...' },
        { term: 'Rule of Thirds', definition: 'A composition guideline that places subjects along horizontal and vertical third lines to create visual balance.' }
      ],
      formula: '\\phi = \\frac{1 + \\sqrt{5}}{2} \\approx 1.6180339887...',
      formulaExplanation: 'The unique positive solution to the quadratic equation x^2 - x - 1 = 0.',
      keyTakeaways: [
        'Appears in Fibonacci phyllotaxis spirals in sunflowers, nautilus shells, and pinecones.',
        'Used by architects and painters from the Parthenon and Da Vinci to modern digital typography scale systems.'
      ]
    },
    connect: {
      realWorldSummary: 'Smartphone camera grid overlays, architectural facades, and modern web typographic scales use these proportions.',
      examples: [
        {
          title: 'Smartphone Camera 3x3 Grid Guidelines',
          context: 'When you turn on the grid overlay on your iPhone or Android camera, it displays a 3x3 grid. Placing a subject’s eyes or the landscape horizon along these grid lines creates balanced, professional-looking photos.',
          whyItMatters: 'Empowers millions of everyday smartphone users to take well-composed photographs.',
          badge: 'Digital Photography'
        },
        {
          title: 'Web Design Modular Typographic Scales',
          context: 'Designers set font sizes using a 1.618 golden scale multiplier (16px body, 26px subhead, 42px heading, 68px hero). This creates harmonious visual hierarchy across responsive screens.',
          whyItMatters: 'Builds clean, readable typography hierarchies across websites and apps.',
          badge: 'UI/UX Typography'
        }
      ]
    },
    apply: {
      problemStatement: 'You are framing a portrait photo of a friend standing on an ocean beach. According to the Rule of Thirds, where should you place the horizon line and your friend’s eye level?',
      scenario: 'You are learning photographic composition principles.',
      questionType: 'multiple-choice',
      options: [
        { id: 'opt1', text: 'Align the horizon along the lower or upper third grid line, and place their eyes at an upper third intersection point.', isCorrect: true, feedback: 'Correct! Off-center third placements create dynamic visual tension and balance.' },
        { id: 'opt2', text: 'Place the horizon directly across the exact dead center and their nose on the center pixel.', isCorrect: false, feedback: 'Incorrect: Centered compositions can feel static and visually flat.' },
        { id: 'opt3', text: 'Angle the camera at 45 degrees so all lines are diagonal.', isCorrect: false, feedback: 'Incorrect: Dutch angles serve specific dramatic moods, but do not represent the Rule of Thirds.' }
      ],
      explanation: 'Aligning horizons and focal points with the 1/3 and 2/3 grid lines creates natural visual flow and balanced composition.'
    },
    relatedConceptIds: ['visual-hierarchy', 'color-theory']
  },
  {
    id: 'color-theory',
    title: 'Color Theory, Harmonies, and Contrast',
    subjectId: 'art-design',
    subjectName: 'Art & Design',
    category: 'Art and Design',
    difficulty: 'Beginner',
    readingTime: '5 min read',
    shortDescription: 'How the color wheel, complementary palettes, and luminance contrast govern aesthetics and accessibility.',
    learn: {
      definition: 'Color theory is the practical guidance to color mixing and the visual effects of specific color combinations based on the color wheel and human optical perception.',
      textbookExplanation: 'Colors opposite each other on the color wheel (such as blue and orange) are complementary; when placed side by side, they maximize visual contrast. In digital UI design, color conveys meaning, brand identity, and status (green for success, red for error). Crucially, the Web Content Accessibility Guidelines (WCAG) require at least a 4.5:1 luminance contrast ratio for normal text to ensure readability for users with color vision deficiencies.',
      keyTerms: [
        { term: 'Complementary Colors', definition: 'Colors located directly opposite each other on the color wheel that maximize visual contrast.' },
        { term: 'WCAG Contrast Ratio', definition: 'A metric measuring the difference in relative luminance between foreground text and background surfaces.' }
      ],
      keyTakeaways: [
        'Light blue and dark navy provide strong readability and an approachable, professional aesthetic.',
        'Never rely solely on color to communicate critical status; pair colors with icons or text labels for accessibility.'
      ]
    },
    connect: {
      realWorldSummary: 'Hospital emergency signs, brand identity design, and web accessibility standards depend on color theory.',
      examples: [
        {
          title: 'Call-to-Action Buttons in Web Design',
          context: 'An e-commerce site using a calm blue-and-white layout often selects a warm amber or coral for the primary checkout button. The complementary contrast draws the user’s eye naturally to the desired action.',
          whyItMatters: 'Improves usability and conversion rates on digital platforms.',
          badge: 'Design Strategy'
        },
        {
          title: 'Color Blindness and Accessible UI Design',
          context: 'Roughly 8% of men experience red-green color deficiency (deuteranomaly). Accessible software pairs red error states with an exclamation mark icon, ensuring users can understand alerts without relying on color perception alone.',
          whyItMatters: 'Ensures software is inclusive and usable for all people.',
          badge: 'Accessibility'
        }
      ]
    },
    apply: {
      problemStatement: 'Under WCAG AA standards, normal body text requires a minimum contrast ratio of 4.5:1 against its background. Why is light gray text (#A0AEC0) on a pure white background (#FFFFFF) considered poor design?',
      scenario: 'You are conducting an accessibility audit on an educational website.',
      questionType: 'multiple-choice',
      options: [
        { id: 'opt1', text: 'Its contrast ratio falls well below 4.5:1, making it difficult or impossible to read for users with visual impairments or on low-brightness mobile screens.', isCorrect: true, feedback: 'Correct! The low contrast fails WCAG accessibility guidelines and impairs readability.' },
        { id: 'opt2', text: 'The color gray causes computer monitors to overheat.', isCorrect: false, feedback: 'Incorrect: Pixel color does not cause hardware overheating.' },
        { id: 'opt3', text: 'Gray text cannot be rendered by modern web browsers.', isCorrect: false, feedback: 'Incorrect: All modern browsers render gray without issue.' }
      ],
      explanation: 'Text with insufficient luminance contrast strains the eyes and fails accessibility standards. High-contrast typography (such as dark navy on light sky blue) ensures readability for all users.'
    },
    relatedConceptIds: ['golden-ratio', 'visual-hierarchy']
  },
  {
    id: 'visual-hierarchy',
    title: 'Visual Hierarchy & Gestalt Principles',
    subjectId: 'art-design',
    subjectName: 'Art & Design',
    category: 'Art and Design',
    difficulty: 'Beginner',
    readingTime: '6 min read',
    shortDescription: 'How scale, whitespace, proximity, and layout guide the human eye effortlessly through complex information.',
    learn: {
      definition: 'Visual hierarchy is the arrangement of elements in a way that implies importance and guides the viewer’s eye through content in a deliberate, structured sequence.',
      textbookExplanation: 'Originating from Gestalt psychology in the 1920s, visual perception principles explain how humans group visual elements: Proximity (items close together are perceived as related), Similarity (items sharing colors or shapes belong together), and Continuation. In layout design, varying font weight, element size, color contrast, and whitespace directs viewers through headline → summary → details.',
      keyTerms: [
        { term: 'Law of Proximity', definition: 'The perceptual tendency to group objects that are positioned close to one another.' },
        { term: 'F-Shaped Scanning Pattern', definition: 'The common eye-tracking pattern where web users read horizontally across top headers and then scan down the left margin.' }
      ],
      keyTakeaways: [
        'Whitespace is functional: it gives eyes breathing room and groups related content together.',
        'Visual hierarchy allows users to scan and understand page structure in seconds.'
      ]
    },
    connect: {
      realWorldSummary: 'Clean news layouts, airport terminal directional signage, and modern educational dashboards rely on visual hierarchy.',
      examples: [
        {
          title: 'Airport Terminal Directional Signage',
          context: 'Signs at major international airports use bold, high-contrast typography, large gate numbers, and clear directional arrows grouped by proximity. Rushing passengers can spot their gate direction in a split second.',
          whyItMatters: 'Prevents passenger confusion in high-stress transit environments.',
          badge: 'Wayfinding Design'
        },
        {
          title: 'Educational Course Card Scanning',
          context: 'An effective online course card places a clear subject badge at top, a bold 20px title, a 2-line summary, and an action button pinned at bottom with consistent padding, making scanning multiple courses effortless.',
          whyItMatters: 'Reduces visual fatigue and makes learning catalogs intuitive to navigate.',
          badge: 'Product Design'
        }
      ]
    },
    apply: {
      problemStatement: 'In a web form, a submit button is placed 2px below a "Cancel" button, but 40px away from the form input fields. Users keep accidentally clicking Cancel. What Gestalt principle explains this problem?',
      scenario: 'You are diagnosing usability issues in an educational app form.',
      questionType: 'multiple-choice',
      options: [
        { id: 'opt1', text: 'The Law of Proximity: placing the buttons too close together causes users to perceive them as a single clustered target, increasing mis-clicks.', isCorrect: true, feedback: 'Correct! Grouping buttons too tightly together without adequate spacing leads to accidental clicks and visual ambiguity.' },
        { id: 'opt2', text: 'The Doppler effect', isCorrect: false, feedback: 'Incorrect: The Doppler effect relates to wave frequency shifts.' },
        { id: 'opt3', text: 'The Law of Diminishing Marginal Returns', isCorrect: false, feedback: 'Incorrect: That is an economic production principle.' }
      ],
      explanation: 'The Gestalt Law of Proximity dictates that items placed close together are mentally grouped. Proper spacing and distinct visual styling prevent accidental mis-clicks.'
    },
    relatedConceptIds: ['golden-ratio', 'color-theory', 'working-memory']
  }
];
