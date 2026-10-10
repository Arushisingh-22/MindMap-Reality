import { Subject } from '../types';

export const subjects: Subject[] = [
  {
    id: 'physics',
    name: 'Physics',
    iconName: 'Zap',
    description: 'Explore fundamental forces, energy transfers, circuits, optics, and the physical laws governing the universe.',
    topics: ["Ohm's Law", "Newtonian Mechanics", "Optics & Fiber", "Thermodynamics"],
    conceptCount: 3,
    color: '#38A9F5'
  },
  {
    id: 'chemistry',
    name: 'Chemistry',
    iconName: 'FlaskConical',
    description: 'Discover the molecular basis of matter, chemical bonds, acid-base equilibriums, and innovative synthetic materials.',
    topics: ['Acids & Bases', 'Reaction Energetics', 'Polymers & Plastics', 'Atomic Orbitals'],
    conceptCount: 3,
    color: '#06B6D4'
  },
  {
    id: 'biology',
    name: 'Biology',
    iconName: 'Dna',
    description: 'Examine cellular machinery, genetics, human metabolic physiology, ecosystems, and biological survival strategies.',
    topics: ['Cellular Respiration', 'Human Digestion', 'Ecosystems & Cascades', 'Genetics'],
    conceptCount: 3,
    color: '#10B981'
  },
  {
    id: 'mathematics',
    name: 'Mathematics',
    iconName: 'Sigma',
    description: 'Master logical quantitative patterns, probability models, geometric proofs, and exponential growth trajectories.',
    topics: ['Probability & Odds', 'Pythagorean Triangulation', 'Compound Interest', 'Calculus'],
    conceptCount: 3,
    color: '#8B5CF6'
  },
  {
    id: 'computer-science',
    name: 'Computer Science',
    iconName: 'Code',
    description: 'Unpack computational logic, binary search trees, cryptographic ciphers, and network graph traversal algorithms.',
    topics: ['Binary Search', 'Public-Key Cryptography', 'Graph Algorithms', 'Data Structures'],
    conceptCount: 3,
    color: '#6366F1'
  },
  {
    id: 'geography',
    name: 'Geography',
    iconName: 'Globe2',
    description: 'Investigate dynamic tectonic plates, rain shadow precipitation, Coriolis wind patterns, and human settlements.',
    topics: ['Plate Tectonics', 'Rain Shadow Effect', 'Coriolis Atmospheric Cycles', 'Cartography'],
    conceptCount: 3,
    color: '#0EA5E9'
  },
  {
    id: 'history',
    name: 'History',
    iconName: 'Landmark',
    description: 'Analyze pivotal turning points, Gutenberg’s printing press, industrial mechanization, and global Silk Road trade networks.',
    topics: ['Printing Press Revolution', 'Industrial Mechanization', 'The Silk Road', 'Ancient Civilizations'],
    conceptCount: 3,
    color: '#F59E0B'
  },
  {
    id: 'civics',
    name: 'Civics & Political Science',
    iconName: 'Scale',
    description: 'Understand democratic institutions, separation of executive/legislative powers, voting systems, and constitutional rule of law.',
    topics: ['Checks & Balances', 'Electoral Systems', 'Rule of Law', 'Civil Liberties'],
    conceptCount: 3,
    color: '#EF4444'
  },
  {
    id: 'economics',
    name: 'Economics',
    iconName: 'TrendingUp',
    description: 'Deconstruct market supply-demand curves, inflation velocity, purchasing power parity, and opportunity cost trade-offs.',
    topics: ['Supply & Demand', 'Inflation & Central Banks', 'Opportunity Cost', 'Fiscal Policy'],
    conceptCount: 3,
    color: '#14B8A6'
  },
  {
    id: 'engineering',
    name: 'Engineering & Technology',
    iconName: 'Wrench',
    description: 'Apply physical mechanics into structural trusses, mechanical lever advantages, and variable gear transmissions.',
    topics: ['Mechanical Advantage', 'Gear Ratios & Torque', 'Structural Trusses', 'Aerodynamics'],
    conceptCount: 3,
    color: '#EC4899'
  },
  {
    id: 'psychology',
    name: 'Psychology',
    iconName: 'Brain',
    description: 'Decode cognitive biases, classical Pavlovian conditioning, working memory limits, and behavioral decision heuristics.',
    topics: ['Confirmation Bias', 'Operant Conditioning', 'Working Memory Chunking', 'Social Dynamics'],
    conceptCount: 3,
    color: '#A855F7'
  },
  {
    id: 'art-design',
    name: 'Art & Design',
    iconName: 'Palette',
    description: 'Learn the mathematical aesthetics of the Golden Ratio, emotional color psychology, and Gestalt visual hierarchy.',
    topics: ['The Golden Ratio', 'Color Harmony & Contrast', 'Gestalt Visual Hierarchy', 'Composition'],
    conceptCount: 3,
    color: '#F43F5E'
  }
];
