import { QuizQuestion } from '../types';

export const quizQuestions: QuizQuestion[] = [
  // Physics
  {
    id: 'phys-1',
    subjectId: 'physics',
    topic: "Ohm's Law",
    difficulty: 'Beginner',
    question: "If a circuit maintains a constant voltage of 12 V and the resistance is increased from 3 Ω to 6 Ω, what happens to the current?",
    options: [
      "Current doubles from 4 A to 8 A",
      "Current halves from 4 A to 2 A",
      "Current remains constant at 4 A",
      "Current drops to 0 A"
    ],
    correctAnswerIndex: 1,
    explanation: "By Ohm's Law (I = V / R), doubling the resistance while keeping voltage fixed at 12 V cuts current in half: from 12/3 = 4 A down to 12/6 = 2 A.",
    realWorldContext: "This is how rotary dimmer switches dim lights—by introducing extra resistance to reduce current flow."
  },
  {
    id: 'phys-2',
    subjectId: 'physics',
    topic: "Newton's Third Law",
    difficulty: 'Beginner',
    question: "How can a spacecraft accelerate through the vacuum of outer space where there is no air to push against?",
    options: [
      "It pulls on invisible cosmic magnetic field lines",
      "It pushes forcefully against its own expelled propellant exhaust gas",
      "It uses solar radiation to create friction",
      "It relies on the vacuum pulling it forward"
    ],
    correctAnswerIndex: 1,
    explanation: "Newton's Third Law states that every action has an equal and opposite reaction. The rocket exerts a backward force on the expelling exhaust gases, which simultaneously push the rocket forward.",
    realWorldContext: "Deep-space probes and satellite thrusters depend purely on propellant reaction forces."
  },
  {
    id: 'phys-3',
    subjectId: 'physics',
    topic: 'Fiber Optics',
    difficulty: 'Intermediate',
    question: 'Under what condition does total internal reflection (TIR) occur inside an optical fiber?',
    options: [
      'Light travels into an optically denser material at an angle below 10°',
      'Light travels from a higher-index medium to a lower-index medium at an angle greater than the critical angle',
      'Light passes through an opaque aluminum coating',
      'The fiber cable is bent at a sharp 90-degree corner'
    ],
    correctAnswerIndex: 1,
    explanation: 'TIR requires two conditions: light must travel from a higher refractive index to a lower one (core to cladding), and the angle of incidence must exceed the critical angle.',
    realWorldContext: 'This allows transoceanic fiber-optic internet cables to guide laser pulses thousands of kilometers without loss.'
  },

  // Chemistry
  {
    id: 'chem-1',
    subjectId: 'chemistry',
    topic: 'Acids & Bases',
    difficulty: 'Beginner',
    question: 'A solution has a pH of 3.0, and another solution has a pH of 6.0. How many times more acidic is the first solution?',
    options: [
      '2 times more acidic',
      '3 times more acidic',
      '30 times more acidic',
      '1,000 times more acidic'
    ],
    correctAnswerIndex: 3,
    explanation: 'The pH scale is base-10 logarithmic. A difference of 3 pH units represents 10^3 = 1,000 times higher hydrogen ion [H+] concentration.',
    realWorldContext: 'Explains why gastric acid (pH 2) is drastically more corrosive than black coffee (pH 5).'
  },
  {
    id: 'chem-2',
    subjectId: 'chemistry',
    topic: 'Reaction Energetics',
    difficulty: 'Intermediate',
    question: 'In an instant chemical cold pack used for athletic sprains, ammonium nitrate dissolves in water. Why does the pack become icy cold?',
    options: [
      'The dissolution reaction is endothermic, absorbing heat from its surroundings',
      'The reaction is exothermic and generates cold energy',
      'The water freezes into solid ice cubes immediately',
      'A chemical catalyst absorbs moisture from the air'
    ],
    correctAnswerIndex: 0,
    explanation: 'Dissolving ammonium nitrate absorbs more lattice dissociation energy from surrounding water and air than hydration releases, causing an endothermic temperature drop.',
    realWorldContext: 'Enables coaches to instantly chill injuries on the field without refrigeration.'
  },
  {
    id: 'chem-3',
    subjectId: 'chemistry',
    topic: 'Polymers',
    difficulty: 'Intermediate',
    question: 'Why is vulcanized rubber used in automotive tires instead of raw natural latex rubber?',
    options: [
      'Vulcanization adds sulfur cross-links between polymer chains, preventing permanent deformation',
      'Vulcanization dissolves all carbon bonds in the rubber',
      'Raw latex is too heavy to rotate on wheels',
      'Sulfur turns rubber into a ceramic superconductor'
    ],
    correctAnswerIndex: 0,
    explanation: 'Cross-linking creates covalent sulfur bridges between adjacent polyisoprene chains, preventing them from sliding permanently past each other under mechanical heat and stress.',
    realWorldContext: 'Allows car tires to flex millions of times over highways without deforming.'
  },

  // Biology
  {
    id: 'bio-1',
    subjectId: 'biology',
    topic: 'Cellular Respiration',
    difficulty: 'Intermediate',
    question: 'Why do human muscle cells switch to lactic acid fermentation during maximal all-out sprinting?',
    options: [
      'To regenerate NAD+ so glycolysis can continue producing ATP when oxygen delivery is insufficient',
      'To build extra muscle fibers during the race',
      'Because the heart completely stops beating during sprints',
      'To cool down internal body temperature'
    ],
    correctAnswerIndex: 0,
    explanation: 'When mitochondrial electron transport is oxygen-starved, reducing pyruvate to lactate oxidizes NADH back into NAD+, keeping anaerobic glycolysis alive.',
    realWorldContext: 'Causes the temporary burning sensation and fatigue in track sprinters.'
  },
  {
    id: 'bio-2',
    subjectId: 'biology',
    topic: 'Human Digestion',
    difficulty: 'Beginner',
    question: 'What is the primary anatomical function of the millions of microscopic villi and microvilli lining the human small intestine?',
    options: [
      'To grind coarse food mechanically like teeth',
      'To massively expand the surface area available for absorbing nutrients into the bloodstream',
      'To store excess bile produced by the liver',
      'To prevent stomach acid from entering the duodenum'
    ],
    correctAnswerIndex: 1,
    explanation: 'Microvilli multiply mucosal surface area up to 600-fold (the area of a tennis court), maximizing contact with digested amino acids, sugars, and fatty acids.',
    realWorldContext: 'Damage to villi in celiac disease causes severe malnourishment even with high calorie intake.'
  },
  {
    id: 'bio-3',
    subjectId: 'biology',
    topic: 'Ecosystems & Cascades',
    difficulty: 'Intermediate',
    question: 'According to Lindeman’s ecological 10% rule, if primary producers produce 50,000 kJ of biomass energy, how much reaches secondary consumers (carnivores)?',
    options: [
      '50,000 kJ',
      '5,000 kJ',
      '500 kJ',
      '50 kJ'
    ],
    correctAnswerIndex: 2,
    explanation: 'Plants (50,000 kJ) → Herbivores (10% = 5,000 kJ) → Secondary consumers (10% of 5,000 kJ = 500 kJ).',
    realWorldContext: 'Explains why apex predators like tigers and wolves are relatively scarce in any landscape.'
  },

  // Mathematics
  {
    id: 'math-1',
    subjectId: 'mathematics',
    topic: 'Probability & Odds',
    difficulty: 'Beginner',
    question: 'A fair coin has landed on Heads 8 times in a row. What is the probability that the next flip will land on Heads?',
    options: [
      'Less than 10%, because Tails is overdue',
      'Exactly 50% (0.5), because coin flips are independent events',
      '100%, because the coin is on a lucky streak',
      '75%'
    ],
    correctAnswerIndex: 1,
    explanation: 'Previous flips have no physical or mathematical effect on subsequent flips. The Gambler’s Fallacy incorrectly presumes that independent random trials develop a memory.',
    realWorldContext: 'Saves casino gamblers from losing money assuming black or red numbers are overdue.'
  },
  {
    id: 'math-2',
    subjectId: 'mathematics',
    topic: 'Compound Interest',
    difficulty: 'Beginner',
    question: 'Using the Rule of 72, approximately how long will it take for an investment to double at a constant 6% annual compound return?',
    options: [
      '6 years',
      '12 years',
      '18 years',
      '24 years'
    ],
    correctAnswerIndex: 1,
    explanation: 'Under the Rule of 72: Years to double ≈ 72 / 6 = 12 years.',
    realWorldContext: 'Helps investors quickly estimate portfolio timelines without financial calculators.'
  },
  {
    id: 'math-3',
    subjectId: 'mathematics',
    topic: 'Pythagorean Theorem',
    difficulty: 'Beginner',
    question: 'A television screen has a width of 12 inches and a height of 9 inches. What is the diagonal screen size measured by manufacturers?',
    options: [
      '21 inches',
      '15 inches',
      '18 inches',
      '13.5 inches'
    ],
    correctAnswerIndex: 1,
    explanation: 'By the Pythagorean theorem: c = √(12^2 + 9^2) = √(144 + 81) = √225 = 15 inches (a classic 3-4-5 scaled right triangle).',
    realWorldContext: 'TV and monitor display sizes are always marketed by diagonal length.'
  },

  // Computer Science
  {
    id: 'cs-1',
    subjectId: 'computer-science',
    topic: 'Binary Search',
    difficulty: 'Intermediate',
    question: 'In a sorted phonebook array containing 1,000,000 names, what is the maximum number of comparisons binary search needs to find any contact?',
    options: [
      '1,000,000 comparisons',
      '500,000 comparisons',
      '20 comparisons',
      '100 comparisons'
    ],
    correctAnswerIndex: 2,
    explanation: 'Because binary search cuts the search space in half each step, ceil(log2(1,000,000)) ≈ 20 comparisons (since 2^20 = 1,048,576).',
    realWorldContext: 'Enables high-performance SQL database B-Tree index lookups across millions of rows.'
  },
  {
    id: 'cs-2',
    subjectId: 'computer-science',
    topic: 'Cryptography',
    difficulty: 'Advanced',
    question: 'In public-key (asymmetric) cryptography, which key is used to encrypt a confidential message sent to Bob?',
    options: [
      'Bob’s public key',
      'Bob’s private key',
      'The sender’s private key',
      'A shared Wi-Fi password'
    ],
    correctAnswerIndex: 0,
    explanation: 'Anyone can use Bob’s public key to encrypt a secret message; only Bob’s mathematically matched private key can decrypt it.',
    realWorldContext: 'Secures HTTPS web browsing, banking transactions, and Apple Pay.'
  },
  {
    id: 'cs-3',
    subjectId: 'computer-science',
    topic: 'Graph Algorithms',
    difficulty: 'Intermediate',
    question: 'Which graph pathfinding algorithm is widely used by mapping apps to find the shortest driving route between two intersections?',
    options: [
      'Dijkstra’s Algorithm or A* Search',
      'Bubble Sort',
      'Linear Regression',
      'Breadth-First Generation without weights'
    ],
    correctAnswerIndex: 0,
    explanation: 'Dijkstra’s and A* search explore the lowest-cost edge weights (distance, travel time, traffic delay) between graph vertices.',
    realWorldContext: 'Powers Google Maps dynamic routing around accidents and traffic jams.'
  },

  // Geography
  {
    id: 'geo-1',
    subjectId: 'geography',
    topic: 'Plate Tectonics',
    difficulty: 'Beginner',
    question: 'What occurs at a subduction zone boundary between an oceanic plate and a continental plate?',
    options: [
      'The continental plate slides underneath into the core',
      'The denser oceanic plate slides beneath the lighter continental plate into the mantle',
      'Both plates float up into the atmosphere',
      'The plates lock forever without any earthquakes'
    ],
    correctAnswerIndex: 1,
    explanation: 'Oceanic basalt is denser than continental granite, forcing it to subduct, melt, and trigger volcanic arcs and deep marine trenches.',
    realWorldContext: 'Forms the Pacific "Ring of Fire" and the South American Andes.'
  },
  {
    id: 'geo-2',
    subjectId: 'geography',
    topic: 'Rain Shadow Effect',
    difficulty: 'Beginner',
    question: 'Why does the eastern leeward side of the Cascade mountains in Washington state experience arid desert conditions?',
    options: [
      'The mountains block all sunlight from rising in the east',
      'Rising moist air drops its precipitation on the western slope, leaving dry air to descend and warm on the eastern side',
      'Underground tectonic magma boils all the groundwater away',
      'Winds blow exclusively from east to west'
    ],
    correctAnswerIndex: 1,
    explanation: 'Orographic lift condenses moisture on the windward west slope. As the dry air descends the leeward east slope, it compresses and warms adiabatically, creating a rain shadow.',
    realWorldContext: 'Explains why Seattle is famously lush while Yakima, just 100 miles east, is semi-arid.'
  },
  {
    id: 'geo-3',
    subjectId: 'geography',
    topic: 'Coriolis Effect',
    difficulty: 'Intermediate',
    question: 'In which direction does the Coriolis effect deflect large-scale winds in the Northern Hemisphere?',
    options: [
      'Directly to the right of their path of motion',
      'Directly to the left of their path of motion',
      'Straight upward toward outer space',
      'Straight downward toward sea level'
    ],
    correctAnswerIndex: 0,
    explanation: 'Earth’s counter-clockwise rotation deflects moving parcels of fluid to the right in the Northern Hemisphere and to the left in the Southern Hemisphere.',
    realWorldContext: 'Causes hurricanes in the Northern Hemisphere to rotate counter-clockwise.'
  },

  // History
  {
    id: 'hist-1',
    subjectId: 'history',
    topic: 'The Printing Press',
    difficulty: 'Beginner',
    question: 'What was the revolutionary social impact of Johannes Gutenberg’s movable metal type press in the mid-1400s?',
    options: [
      'It made books rare and only readable by emperors',
      'It reduced book production costs by over 80%, democratizing literacy and spreading the Scientific Revolution',
      'It abolished the use of paper across Europe',
      'It prevented religious debates from occurring'
    ],
    correctAnswerIndex: 1,
    explanation: 'Movable type mechanized text replication, allowing scientific discoveries, religious treatises, and classical literature to be shared rapidly and affordably.',
    realWorldContext: 'Paralleled the modern democratization of information seen with the internet.'
  },
  {
    id: 'hist-2',
    subjectId: 'history',
    topic: 'Industrial Revolution',
    difficulty: 'Intermediate',
    question: 'Why was James Watt’s steam engine with a separate condenser superior to Newcomen’s earlier engine?',
    options: [
      'It used wood rather than water',
      'It kept the main cylinder hot continuously, reducing coal fuel consumption by more than 75%',
      'It could only operate in deep coal mines',
      'It eliminated all mechanical pistons and valves'
    ],
    correctAnswerIndex: 1,
    explanation: 'By condensing steam in an isolated separate chamber, the main cylinder remained at steam temperature, saving massive energy otherwise wasted on cyclic cooling and reheating.',
    realWorldContext: 'Unlocked factory mechanization and locomotive rail transport.'
  },
  {
    id: 'hist-3',
    subjectId: 'history',
    topic: 'The Silk Road',
    difficulty: 'Beginner',
    question: 'Why did merchants along the ancient overland Silk Road primarily trade luxury goods rather than bulk wheat or lumber?',
    options: [
      'Only luxury goods had a high enough value-to-weight ratio to justify expensive, dangerous overland caravan transport',
      'Ancient rulers legally forbade eating bread',
      'Camels could only carry precious gems and fabric',
      'Bulk timber was completely nonexistent along the route'
    ],
    correctAnswerIndex: 0,
    explanation: 'Overland transport costs per ton-mile were immense; only high-value items like silk, spices, porcelain, and jewels could generate profits exceeding transport expenses.',
    realWorldContext: 'Illustrates freight economics and logistics constraints before modern shipping.'
  },

  // Civics & Political Science
  {
    id: 'civ-1',
    subjectId: 'civics',
    topic: 'Checks and Balances',
    difficulty: 'Beginner',
    question: 'Which constitutional check can the judicial branch exercise against unlawful actions by the executive branch?',
    options: [
      'The power of judicial review to declare executive decrees unconstitutional',
      'The power to declare war unilaterally',
      'The power to draft and pass national tax bills',
      'The power to command naval armed forces'
    ],
    correctAnswerIndex: 0,
    explanation: 'Judicial review empowers independent constitutional courts to strike down executive orders or legislative laws that violate constitutional provisions.',
    realWorldContext: 'Protects citizen rights from government overreach.'
  },
  {
    id: 'civ-2',
    subjectId: 'civics',
    topic: 'Electoral Systems',
    difficulty: 'Intermediate',
    question: 'What is Duverger’s Law regarding First-Past-The-Post (plurality) single-member voting districts?',
    options: [
      'It mathematically guarantees a direct democracy with 10 political parties',
      'Single-member plurality voting tends to produce a stable two-party system due to strategic voting and spoiler fears',
      'All candidates must receive 100% of the vote',
      'The military appoints the prime minister'
    ],
    correctAnswerIndex: 1,
    explanation: 'In winner-take-all single-member districts, voters avoid third parties out of fear of wasting their vote, which tends to cement a two-party equilibrium.',
    realWorldContext: 'Explains why the US and UK maintain two dominant parties compared to continental European multiparty coalitions.'
  },
  {
    id: 'civ-3',
    subjectId: 'civics',
    topic: 'The Rule of Law',
    difficulty: 'Beginner',
    question: 'What is the core distinction between the "Rule of Law" and authoritarian "Rule by Law"?',
    options: [
      'Under the Rule of Law, government leaders are bound by and accountable to the same laws as citizens; under Rule by Law, rulers use statutes to control citizens while remaining above accountability',
      'Rule of Law requires police officers to ride horses',
      'There is no difference between the two concepts',
      'Rule by Law means there are no judges or courts'
    ],
    correctAnswerIndex: 0,
    explanation: 'True Rule of Law binds both the governors and the governed equally, supported by an independent judiciary and constitutional due process.',
    realWorldContext: 'Underpins international human rights and commercial contract protections.'
  },

  // Economics
  {
    id: 'econ-1',
    subjectId: 'economics',
    topic: 'Supply and Demand',
    difficulty: 'Beginner',
    question: 'If a municipal government imposes a rent-control price ceiling strictly below the market equilibrium rent, what is the predictable long-term outcome?',
    options: [
      'A persistent housing shortage, as quantity demanded exceeds the quantity landlords are willing to supply and maintain',
      'A huge surplus of empty, unrented apartments',
      'Immediate construction of luxury towers',
      'No change in tenant or landlord behavior'
    ],
    correctAnswerIndex: 0,
    explanation: 'Artificially capping prices below equilibrium suppresses builder incentives while stimulating tenant demand, creating persistent shortages.',
    realWorldContext: 'Observed in rent-controlled housing markets worldwide.'
  },
  {
    id: 'econ-2',
    subjectId: 'economics',
    topic: 'Inflation & Purchasing Power',
    difficulty: 'Intermediate',
    question: 'If your savings account pays 4% nominal annual interest, but annual inflation is 6%, what is your true real purchasing power return?',
    options: [
      '+10% gain',
      '+2% gain',
      '-2% loss in real purchasing power',
      '0% break-even'
    ],
    correctAnswerIndex: 2,
    explanation: 'By the Fisher equation, Real Rate ≈ Nominal Rate - Inflation Rate = 4% - 6% = -2%. Your money buys 2% less at year-end.',
    realWorldContext: 'Highlights why savers must seek returns that outpace inflation to preserve purchasing power.'
  },
  {
    id: 'econ-3',
    subjectId: 'economics',
    topic: 'Opportunity Cost',
    difficulty: 'Beginner',
    question: 'What is the opportunity cost of choosing to spend $50 on a concert ticket instead of putting that $50 into an interest-bearing savings account?',
    options: [
      'The price of the concert ticket ($50)',
      'The foregone savings balance and future interest you gave up',
      'The cost of the concert venue’s electricity',
      '$0, because you enjoyed the concert'
    ],
    correctAnswerIndex: 1,
    explanation: 'Opportunity cost is the value of the next-best alternative forgone—here, the financial security and compound interest of saved capital.',
    realWorldContext: 'Guides conscious budgeting and trade-off decisions.'
  },

  // Engineering & Technology
  {
    id: 'eng-1',
    subjectId: 'engineering',
    topic: 'Mechanical Levers',
    difficulty: 'Beginner',
    question: 'You use a pry bar where the effort arm is 1.5 m and the load arm is 0.3 m. What is its Ideal Mechanical Advantage (IMA)?',
    options: [
      '5.0',
      '0.2',
      '1.8',
      '4.5'
    ],
    correctAnswerIndex: 0,
    explanation: 'IMA = Effort Arm / Load Arm = 1.5 m / 0.3 m = 5.0. It amplifies your input effort force 5-fold.',
    realWorldContext: 'Enables construction workers to pry heavy concrete forms loose with handheld tools.'
  },
  {
    id: 'eng-2',
    subjectId: 'engineering',
    topic: 'Gear Ratios',
    difficulty: 'Intermediate',
    question: 'A 10-tooth driving motor gear turns a 50-tooth driven wheel gear. If the motor delivers 10 N·m of torque at 1,500 RPM, what are the output torque and speed?',
    options: [
      '50 N·m torque at 300 RPM',
      '2 N·m torque at 7,500 RPM',
      '10 N·m torque at 1,500 RPM',
      '500 N·m torque at 150 RPM'
    ],
    correctAnswerIndex: 0,
    explanation: 'Gear ratio = 50 / 10 = 5. Output torque multiplies by 5 (10 × 5 = 50 N·m) while speed divides by 5 (1,500 / 5 = 300 RPM).',
    realWorldContext: 'This principle helps mountain bikes climb steep hills in low gear.'
  },
  {
    id: 'eng-3',
    subjectId: 'engineering',
    topic: 'Structural Trusses',
    difficulty: 'Intermediate',
    question: 'Why are railroad bridges and tower crane booms built out of interconnected triangles rather than squares or pentagons?',
    options: [
      'Triangles are geometrically rigid: their internal angles cannot deform without altering the physical lengths of their sides',
      'Triangular steel is 10 times cheaper than square steel',
      'Triangles channel rainwater off the bridge faster',
      'Squares are illegal under international building codes'
    ],
    correctAnswerIndex: 0,
    explanation: 'A four-sided frame easily deforms into a parallelogram under lateral load. Triangles prevent shear deformation, turning loads into pure tension and compression.',
    realWorldContext: 'Used in Warren truss bridges and skyscraper construction cranes.'
  },

  // Psychology
  {
    id: 'psych-1',
    subjectId: 'psychology',
    topic: 'Confirmation Bias',
    difficulty: 'Beginner',
    question: 'An individual searches online for articles verifying their existing political belief and skips articles from opposing viewpoints. What cognitive phenomenon is this?',
    options: [
      'Confirmation Bias',
      'Retrograde Amnesia',
      'Sensory Adaptation',
      'Phototropism'
    ],
    correctAnswerIndex: 0,
    explanation: 'Confirmation bias is the tendency to seek, favor, and recall information that confirms pre-existing beliefs while ignoring contradictory evidence.',
    realWorldContext: 'Drives algorithmic social media polarization and filter bubbles.'
  },
  {
    id: 'psych-2',
    subjectId: 'psychology',
    topic: 'Operant Conditioning',
    difficulty: 'Beginner',
    question: 'Which schedule of reinforcement produces the highest response rates and is the most resistant to behavioral extinction (as seen in slot machines)?',
    options: [
      'Variable-ratio schedule',
      'Fixed-interval schedule (e.g. once every hour)',
      'Continuous 1-to-1 reinforcement',
      'Fixed-ratio schedule (e.g. every 10th time)'
    ],
    correctAnswerIndex: 0,
    explanation: 'Variable-ratio schedules deliver rewards unpredictably, triggering steady dopamine responses and strong behavioral persistence.',
    realWorldContext: 'Explains social media infinite scroll feeds and casino gambling addiction.'
  },
  {
    id: 'psych-3',
    subjectId: 'psychology',
    topic: 'Working Memory',
    difficulty: 'Intermediate',
    question: 'According to George Miller’s Law (The magical number 7±2), how should complex 16-digit data (like card numbers) be presented in software UI to minimize errors?',
    options: [
      'Chunked into 4 groups of 4 digits',
      'As a single uninterrupted string without spaces',
      'As 16 separate one-digit dropdown menus',
      'Encoded into binary hexadecimal code'
    ],
    correctAnswerIndex: 0,
    explanation: 'Chunking groups individual pieces of data into meaningful units (4 chunks instead of 16), staying well within working memory capacity limits.',
    realWorldContext: 'Standard credit card formatting (1234 5678 9012 3456) and phone numbers use chunking to prevent typos.'
  },

  // Art & Design
  {
    id: 'art-1',
    subjectId: 'art-design',
    topic: 'The Golden Ratio',
    difficulty: 'Beginner',
    question: 'In visual composition and photography, what is the Rule of Thirds?',
    options: [
      'Dividing the frame into a 3x3 grid and placing focal elements along the grid lines or intersections to create natural balance',
      'Using only three primary colors in every painting',
      'Taking three identical photos and averaging them together',
      'Cropping away two-thirds of the image'
    ],
    correctAnswerIndex: 0,
    explanation: 'The Rule of Thirds avoids static centered compositions by placing horizons and key subjects along the 1/3 and 2/3 dividing lines.',
    realWorldContext: 'Enabled on smartphone camera viewfinders to help users frame balanced shots.'
  },
  {
    id: 'art-2',
    subjectId: 'art-design',
    topic: 'Color Theory & Accessibility',
    difficulty: 'Beginner',
    question: 'Why does WCAG AA web accessibility require a minimum 4.5:1 contrast ratio between normal body text and its background?',
    options: [
      'To ensure text is comfortably readable for people with color vision deficiencies or on low-contrast screens',
      'To prevent computer monitors from overheating',
      'To make dark mode the mandatory global standard',
      'To reduce internet bandwidth usage'
    ],
    correctAnswerIndex: 0,
    explanation: 'High luminance contrast ensures readable typography for millions of users with visual impairments or on low-brightness mobile devices outdoors.',
    realWorldContext: 'Underpins web accessibility standards for government, educational, and corporate websites.'
  },
  {
    id: 'art-3',
    subjectId: 'art-design',
    topic: 'Visual Hierarchy',
    difficulty: 'Beginner',
    question: 'According to the Gestalt Law of Proximity, how do human viewers interpret elements placed close together?',
    options: [
      'As belonging together as part of a related group or unit',
      'As conflicting and dangerous',
      'As completely unrelated random noise',
      'As moving at high velocity'
    ],
    correctAnswerIndex: 0,
    explanation: 'The human visual system naturally groups proximate items into coherent perceptual clusters.',
    realWorldContext: 'Used in web forms to group input fields with their corresponding labels.'
  }
];
