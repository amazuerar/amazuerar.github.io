export const papers = [
  // ── 2023 ──────────────────────────────────────────────────────────────────
  {
    title: 'CONAN: Statically Detecting Connectivity Issues in Android Applications',
    authors: 'A. Mazuera-Rozo, C. Escobar-Velásquez, J. Espitia-Acero, et al.',
    venue: 'ESEC/FSE 2023',
    venueFull: 'ACM Joint European Software Engineering Conference and Symposium on the Foundations of Software Engineering',
    year: 2023,
    citations: 3,
    abstract:
      'CONAN is a static analysis tool that detects connectivity-related defects in Android apps by analyzing API usage patterns and network state handling across the application lifecycle.',
    tags: ['android', 'static-analysis', 'connectivity', 'tool'],
    links: [
      { label: 'ACM DL', url: 'https://dl.acm.org/doi/10.1145/3611643.3613097' },
    ],
    status: 'published',
  },

  // ── 2022 ──────────────────────────────────────────────────────────────────
    {
    title: 'On the Code Quality of Android Apps',
    authors: 'A. Mazuera Rozo',
    venue: 'Thesis',
    venueFull: 'Universidad de los Andes · Università della Svizzera italiana',
    year: 2022,
    citations: null,
    abstract:
      'Doctoral thesis examining code quality dimensions in Android applications, covering security weaknesses, performance bugs, and connectivity defects through large-scale empirical studies.',
    tags: ['android', 'code-quality', 'software-engineering'],
    links: [
      { label: 'Repository', url: 'https://repositorio.uniandes.edu.co/entities/publication/e09feb85-1f01-4c07-a574-f9700221d1f0' },
    ],
    status: 'thesis',
  },
  {
    title: 'Taxonomy of Security Weaknesses in Java and Kotlin Android Apps',
    authors: 'A. Mazuera-Rozo, C. Escobar-Velásquez, J. Espitia-Acero, et al.',
    venue: 'JSS',
    venueFull: 'Journal of Systems and Software, Vol. 187',
    year: 2022,
    citations: 48,
    abstract:
      'Empirical study of 681 security-fixing commits across Java and Kotlin Android apps, yielding a validated taxonomy of software security weaknesses. Complemented by a survey of 43 Android developers.',
    tags: ['android', 'security', 'kotlin', 'java', 'taxonomy', 'empirical-study'],
    links: [
      { label: 'ScienceDirect', url: 'https://www.sciencedirect.com/science/article/pii/S0164121222000103' },
    ],
    status: 'published',
    award: 'JSS Best Paper Award',
  },
  {
    title: 'Detecting Connectivity Issues in Android Apps',
    authors: 'A. Mazuera-Rozo, C. Escobar-Velásquez, J. Espitia-Acero, et al.',
    venue: 'SANER 2022',
    venueFull: 'IEEE International Conference on Software Analysis, Evolution and Reengineering',
    year: 2022,
    citations: 6,
    abstract:
      'Lightweight approach for automatically detecting connectivity-handling defects in Android applications using static analysis of Android API interactions.',
    tags: ['android', 'static-analysis', 'connectivity'],
    links: [
      { label: 'IEEE Xplore', url: 'https://ieeexplore.ieee.org/abstract/document/9825832' },
    ],
    status: 'published',
  },


  // ── 2021 ──────────────────────────────────────────────────────────────────
  {
    title: 'Studying Eventual Connectivity Issues in Android Apps',
    authors: 'C. Escobar-Velásquez, A. Mazuera-Rozo, C. Bedoya, M. Osorio-Riaño, et al.',
    venue: 'EMSE',
    venueFull: 'Empirical Software Engineering, Vol. 27(1), p. 22',
    year: 2021,
    citations: 12,
    abstract:
      'Large-scale empirical study on connectivity-related bugs in Android apps, characterizing their types, prevalence, and the conditions under which they manifest at runtime.',
    tags: ['android', 'connectivity', 'empirical-study', 'mobile'],
    links: [
      { label: 'Springer', url: 'https://link.springer.com/article/10.1007/s10664-021-10020-6' },
    ],
    status: 'published',
  },
  {
    title: 'Shallow or Deep? An Empirical Study on Detecting Vulnerabilities Using Deep Learning',
    authors: 'A. Mazuera-Rozo, A. Mojica-Hanke, M. Linares-Vásquez, G. Bavota',
    venue: 'ICPC 2021',
    venueFull: 'IEEE/ACM 29th International Conference on Program Comprehension',
    year: 2021,
    citations: 32,
    abstract:
      'Systematic comparison of shallow ML models versus deep learning approaches for software vulnerability detection. Challenges the assumption that deeper models always outperform simpler baselines on this task.',
    tags: ['vulnerability-detection', 'deep-learning', 'empirical-study', 'security'],
    links: [
      { label: 'IEEE Xplore', url: 'https://ieeexplore.ieee.org/document/9462962' },
    ],
    status: 'published',
  },

  // ── 2020 ──────────────────────────────────────────────────────────────────
  {
    title: 'Investigating Types and Survivability of Performance Bugs in Mobile Apps',
    authors: 'A. Mazuera-Rozo, C. Trubiani, M. Linares-Vásquez, G. Bavota',
    venue: 'EMSE',
    venueFull: 'Empirical Software Engineering, Vol. 25(3), pp. 1644–1686',
    year: 2020,
    citations: 31,
    abstract:
      'Empirical study on performance bugs in mobile apps, classifying their types and analyzing their survivability (how long they remain undetected in version histories before being fixed).',
    tags: ['android', 'performance-bugs', 'empirical-study', 'mobile'],
    links: [
      { label: 'Springer', url: 'https://link.springer.com/article/10.1007/s10664-019-09795-6' },
    ],
    status: 'published',
  },

  // ── 2019 ──────────────────────────────────────────────────────────────────
  {
    title: 'The Android OS Stack and Its Vulnerabilities: An Empirical Study',
    authors: 'A. Mazuera-Rozo, J. Bautista-Mora, M. Linares-Vásquez, S. Rueda, et al.',
    venue: 'EMSE',
    venueFull: 'Empirical Software Engineering, Vol. 24(4), pp. 2056–2101',
    year: 2019,
    citations: 43,
    abstract:
      'Comprehensive empirical analysis of the full Android OS stack (from kernel to framework), characterizing vulnerability types, affected layers, and patterns of exploitation across CVE history.',
    tags: ['android', 'vulnerability', 'os-security', 'empirical-study'],
    links: [
      { label: 'Springer', url: 'https://link.springer.com/article/10.1007/s10664-019-09689-7' },
    ],
    status: 'published',
  },
  {
    title: 'OPIA: A Tool for On-Device Testing of Vulnerabilities in Android Applications',
    authors: 'L. Bello-Jiménez, A. Mazuera-Rozo, M. Linares-Vásquez, G. Bavota',
    venue: 'ICSME 2019',
    venueFull: 'IEEE International Conference on Software Maintenance and Evolution',
    year: 2019,
    citations: 9,
    abstract:
      'OPIA automates the detection of security vulnerabilities in Android apps directly on device, combining static and dynamic analysis to surface issues that only appear at runtime.',
    tags: ['android', 'vulnerability', 'testing', 'tool', 'on-device'],
    links: [
      { label: 'IEEE Xplore', url: 'https://ieeexplore.ieee.org/abstract/document/8918944' },
    ],
    status: 'published',
  },

  // ── 2018 ──────────────────────────────────────────────────────────────────
  {
    title: 'Device and User Management for Smart Homes',
    authors: 'A. Mazuera-Rozo, S. Rueda',
    venue: 'IEEE NCA 2018',
    venueFull: 'IEEE 17th International Symposium on Network Computing and Applications',
    year: 2018,
    citations: 3,
    abstract:
      'Architecture for managing heterogeneous devices and user permissions in smart home environments, with a focus on access control and network-level policy enforcement.',
    tags: ['IoT', 'smart-home', 'network', 'security'],
    links: [
      { label: 'IEEE Xplore', url: 'https://ieeexplore.ieee.org/abstract/document/8548328' },
    ],
    status: 'published',
  },
];
