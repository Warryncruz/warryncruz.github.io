export const site = {
  url: 'https://warryncruz.github.io',

  defaultLang: 'en', 
  languages: ['en', 'tl'],

  formspreeId: '',

  resume: 'resume.pdf', 
  ogImage: 'og-image.png', 
  themeColor: '#4F46E5',
};

/* ---------- 2. About me ---------- */
export const profile = {
  name: 'John Warryn Cruz',
  initials: 'JWC',
  photo: 'images/profile.jpg',
  photoAlt: 'Portrait of John Warryn Cruz',

  title: {
    en: 'Aspiring full-stack developer',
    tl: 'Nangangarap na full-stack developer',
  },

  course: 'BS Information Technology',
  yearLevel: { en: '4th year', tl: 'Ikaapat na taon' },
  school: 'Bulacan Agricultural State College',
  location: { en: 'San Miguel, Bulacan, Philippines', tl: 'San Miguel, Bulacan, Pilipinas' },

  availability: {
    en: 'Open to OJT / internship',
    tl: 'Bukas para sa OJT / internship',
  },
  lookingFor: {
    en: 'OJT, internship, or entry-level web development role',
    tl: 'OJT, internship, o entry-level na trabaho sa web development',
  },

  headlines: {
    en: ['I build web systems.', 'I build with Laravel and JavaScript.', 'I build apps that reduce paperwork.', 'I learn by building.'],
    tl: ['Gumagawa ako ng web systems.', 'Gumagamit ako ng Laravel at JavaScript.', 'Gumagawa ako ng apps na nakakabawas ng papeles.', 'Natututo ako sa pamamagitan ng paggawa.'],
  },

  bio: {
    en: [
      "I'm a BSIT student at Bulacan Agricultural State College who enjoys building systems that reduce manual, paper-based work. I developed the Laravel backend of an HR and farm operations system for Bausa Integrated Farm and Training Center, including face-recognition attendance and automatic payroll.",
      "I mostly work with PHP (Laravel), JavaScript, and Python, and I have a basic foundation in networking and computer troubleshooting. I'm looking for an OJT, internship, or entry-level role where I can keep learning and contribute to a technical team.",
    ],
    tl: [
      'Ako ay BSIT student sa Bulacan Agricultural State College na mahilig gumawa ng mga sistemang nakakabawas sa manual at papel na proseso. Ginawa ko ang Laravel backend ng HR at farm operations system para sa Bausa Integrated Farm and Training Center, kasama ang face-recognition attendance at awtomatikong payroll.',
      'Madalas akong gumamit ng PHP (Laravel), JavaScript, at Python, at may batayang kaalaman sa networking at pag-troubleshoot ng computer. Naghahanap ako ng OJT, internship, o entry-level na trabaho kung saan patuloy akong matututo at makapag-aambag sa isang technical team.',
    ],
  },

  email: 'johnwarryncruz@gmail.com',
  phone: '', 

  socials: [
    { label: 'GitHub', url: 'https://github.com/Warryncruz', icon: 'github' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/john-warryn-cruz-57008b440', icon: 'linkedin' },
  ],
};

/* ---------- 3. Projects ----------*/
export const projects = [
  {
    id: 'biftci-hr-farm-system',
    title: 'BIFTCI HR and Farm Operations System',
    year: 2025,
    featured: true,
    category: ['Web'],
    image: 'images/projects/biftci.png',
    imageAlt: 'Screenshot of the BIFTCI HR and farm operations system',
    summary: {
      en: 'An HR and farm operations system with face-recognition attendance and payroll computed automatically from attendance records.',
      tl: 'HR at farm operations system na may face-recognition attendance at payroll na awtomatikong kinukuwenta mula sa attendance.',
    },
    role: { en: 'Laravel backend developer and UI contributor', tl: 'Laravel backend developer at tagapag-ambag sa UI' },
    description: {
      en: 'A web-based system for Bausa Integrated Farm and Training Center Inc. I developed the Laravel backend, including face-recognition attendance (Python and DeepFace, with blink and head-turn liveness checks in the browser), attendance rules for time-in, time-out, grace periods and overtime, and payroll computed from attendance records with an email when payroll is released. It also covers employee, trainee and OJT records, resource tracking with low-stock and expiry alerts, role-based access control, and audit logging.',
    },
    learned: {
      en: [
        'How attendance rules turn into payroll computations',
        'Adding liveness checks to make face recognition harder to fool',
        'Designing role-based access so each user only sees their own tools',
      ],
    },
    tech: ['Laravel', 'PHP', 'JavaScript', 'Python', 'DeepFace'],
    demo: 'https://biftci.com/',
    code: '',
  },
  {
    id: 'biftci-roi-system',
    title: 'Farm and Training ROI System',
    year: 2025,
    featured: true,
    category: ['Web'],
    image: 'images/projects/roi.png',
    imageAlt: 'Screenshot of the farm and training ROI system',
    summary: {
      en: 'A web system that records expenses and income and computes return on investment for farm and training operations.',
      tl: 'Web system na nagtatala ng gastos at kita at kinukuwenta ang return on investment ng farm at training operations.',
    },
    role: { en: 'Freelance developer', tl: 'Freelance developer' },
    description: {
      en: "A freelance project for Bausa Integrated Farm and Training Center Inc. Built with Laravel, it records the center's expenses and income, computes the return on investment (ROI) of its farm and training operations automatically, and generates reports that support management decisions.",
    },
    learned: {
      en: ['Turning income and expense records into ROI figures', 'Building reports that help management make decisions'],
    },
    tech: ['Laravel', 'PHP', 'MySQL', 'JavaScript'],
    demo: 'https://biftciroi.com/',
    code: '',
  },
  {
    id: 'equiptrack',
    title: 'EquipTrack',
    year: 2024,
    featured: false,
    category: ['Mobile'],
    image: 'images/projects/equiptrack.jpg',
    imageAlt: 'Screenshot of the EquipTrack mobile app',
    summary: {
      en: 'A mobile app that digitizes equipment borrowing with QR code verification and real-time status tracking.',
      tl: 'Mobile app na ginagawang digital ang pagpapahiram ng kagamitan gamit ang QR code at real-time na status tracking.',
    },
    role: { en: 'Developer (academic project)', tl: 'Developer (academic project)' },
    description: {
      en: 'Built for the College of Engineering and Technology at Bulacan Agricultural State College. The React Native app helps reduce manual, paper-based borrowing requests through a request workflow, uses QR codes to verify each borrowing and return, and shows in real time which items are available, borrowed, or returned.',
    },
    learned: {
      en: ['Building a request workflow that cuts down on paper forms', 'Using QR codes to verify borrowing and returns', 'Showing real-time item status to users'],
    },
    tech: ['React Native', 'QR codes', 'Real-time tracking'],
    demo: 'https://drive.google.com/drive/folders/1F0UQIS9yOVn8cPDF097-7so56BOMK21O?usp=sharing',
    code: '',
  },
  {
    id: 'techvend',
    title: 'Techvend',
    year: 2024,
    featured: false,
    category: ['Web'],
    image: 'images/projects/Techvend.png',
    imageAlt: 'Screenshot of the Techvend multi-vendor gadget store',
    summary: {
      en: 'A multi-vendor gadget store with customer, seller, and admin roles and secure payments through Stripe.',
      tl: 'Multi-vendor na tindahan ng gadgets na may customer, seller, at admin roles at ligtas na bayad gamit ang Stripe.',
    },
    role: { en: 'Developer (academic project)', tl: 'Developer (academic project)' },
    description: {
      en: 'A multi-vendor e-commerce website for gadgets with three user roles. Customers browse products, place orders, and pay securely through Stripe. Sellers manage their own products and incoming orders. Administrators manage users, sellers, and the overall platform, and each role only sees its own features.',
    },
    learned: {
      en: ['Handling online payments securely with Stripe', 'Separating features by user role', 'Managing sellers, products, and orders in one platform'],
    },
    tech: ['PHP', 'MySQL', 'JavaScript', 'Stripe'],
    demo: '',
    code: '',
  },
];

/* ---------- 4. Education and journey (timeline) ---------- */
export const timeline = [
  {
    date: '2023 – present',
    type: 'education',
    current: true,
    title: { en: 'BS Information Technology', tl: 'BS Information Technology' },
    org: 'Bulacan Agricultural State College',
    description: {
      en: 'Studying web development, networking, and systems. Built academic projects including Techvend and EquipTrack.',
      tl: 'Nag-aaral ng web development, networking, at systems. Gumawa ng academic projects gaya ng Techvend at EquipTrack.',
    },
  },
  {
    date: 'Nov 2025',
    type: 'training',
    title: { en: 'Networking Basics', tl: 'Networking Basics' },
    org: 'Cisco Networking Academy',
    description: {
      en: 'Student-level credential covering network concepts, Ethernet, IPv4 and IPv6 addressing, routers, and setting up a secure wireless network.',
      tl: 'Student-level credential tungkol sa network concepts, Ethernet, IPv4 at IPv6 addressing, routers, at secure wireless network.',
    },
  },
  {
    date: 'Nov 2025',
    type: 'training',
    title: { en: 'IPv4, IPv6, and subnetting mini courses', tl: 'IPv4, IPv6, at subnetting mini courses' },
    org: 'Tech Academy',
    description: {
      en: 'Three short courses on IPv4 addressing, IPv6 addressing, and the basics of subnetting an IP network.',
      tl: 'Tatlong maikling kurso tungkol sa IPv4 addressing, IPv6 addressing, at batayan ng subnetting.',
    },
  },
  {
    date: '2021 – 2023',
    type: 'education',
    title: { en: 'TVL – Information and Communication Technology', tl: 'TVL – Information and Communication Technology' },
    org: 'San Miguel National High School',
    description: {
      en: 'Senior high school track focused on ICT.',
      tl: 'Senior high school track na nakatuon sa ICT.',
    },
  },
];

/* ---------- 5. Skills ---------- */
export const skills = [
  { group: { en: 'Languages', tl: 'Mga wika' }, items: ['PHP', 'JavaScript', 'Python'] },
  { group: { en: 'Frameworks and libraries', tl: 'Frameworks at libraries' }, items: ['Laravel', 'React Native', 'DeepFace'] },
  { group: { en: 'Tools and platforms', tl: 'Mga tool at platform' }, items: ['MySQL', 'Stripe', 'Windows'] },
  {
    group: { en: 'IT support and networking', tl: 'IT support at networking' },
    items: ['Hardware troubleshooting', 'Software installation', 'Networking (basic)', 'IPv4 and IPv6 addressing', 'Subnetting basics'],
  },
  {
    group: { en: 'Soft skills', tl: 'Soft skills' },
    items: [
      { en: 'Communication', tl: 'Komunikasyon' },
      { en: 'Teamwork', tl: 'Pakikipagtulungan' },
      { en: 'Problem-solving', tl: 'Paglutas ng problema' },
      { en: 'Adaptability', tl: 'Pagiging madaling makibagay' },
    ],
  },
];

/* ---------- 6. Certifications (click to enlarge) ---------- */
export const certifications = [
  { title: 'Networking Basics', issuer: 'Cisco Networking Academy', date: '2025', image: 'images/certs/networking-basics.jpg', url: '' },
  { title: 'Subnetting Fundamentals', issuer: 'Tech Academy', date: '2025', image: 'images/certs/subnetting.jpg', url: '' },
  { title: 'IPv6 Fundamentals', issuer: 'Tech Academy', date: '2025', image: 'images/certs/ipv6.jpg', url: '' },
  { title: 'IPv4 Fundamentals', issuer: 'Tech Academy', date: '2025', image: 'images/certs/ipv4.jpg', url: '' },
];

/* ---------- 7. Achievements (image optional) ----------*/
export const achievements = [];

/* ---------- 8. Stat cards in About (they count up) ---------- */
export const stats = [
  { value: projects.length, suffix: '', label: { en: 'Projects built', tl: 'Mga proyektong nagawa' } },
  { value: certifications.length, suffix: '', label: { en: 'Certificates', tl: 'Mga sertipiko' } },
  { value: 3, suffix: '', label: { en: 'Programming languages', tl: 'Mga programming language' } },
  { value: "N/A", suffix: '', label: { en: 'Years of Project Experience', tl: 'Taon ng Karanasan sa mga Proyekto' } },
];

/* ---------- 9. Interface text (buttons, headings, messages) ----------*/
export const ui = {
  skip: { en: 'Skip to content', tl: 'Lumaktaw sa nilalaman' },
  nav: {
    about: { en: 'About', tl: 'Tungkol' },
    journey: { en: 'Journey', tl: 'Paglalakbay' },
    projects: { en: 'Projects', tl: 'Mga proyekto' },
    skills: { en: 'Skills', tl: 'Kasanayan' },
    certificates: { en: 'Certificates', tl: 'Sertipiko' },
    contact: { en: 'Contact', tl: 'Kontak' },
  },
  menuOpen: { en: 'Open menu', tl: 'Buksan ang menu' },
  menuClose: { en: 'Close menu', tl: 'Isara ang menu' },
  themeToDark: { en: 'Switch to dark theme', tl: 'Lumipat sa dark theme' },
  themeToLight: { en: 'Switch to light theme', tl: 'Lumipat sa light theme' },
  langSwitch: { en: 'Basahin sa Tagalog', tl: 'Read in English' },
  hero: {
    greeting: { en: "Hi, I'm", tl: 'Ako si' },
    viewProjects: { en: 'View projects', tl: 'Tingnan ang projects' },
    contact: { en: 'Contact me', tl: 'Makipag-ugnayan' },
    resume: { en: 'Download resume', tl: 'I-download ang resume' },
  },
  about: {
    title: { en: 'About me', tl: 'Tungkol sa akin' },
    lede: { en: 'Who I am and what I bring to a team.', tl: 'Kung sino ako at ano ang maiaambag ko sa isang team.' },
    studying: { en: 'Studying', tl: 'Kurso' },
    school: { en: 'School', tl: 'Paaralan' },
    basedIn: { en: 'Based in', tl: 'Nakatira sa' },
    lookingFor: { en: 'Looking for', tl: 'Hinahanap' },
  },
  journey: {
    title: { en: 'Education and journey', tl: 'Edukasyon at paglalakbay' },
    lede: { en: 'School, trainings, awards and the roles I took on, newest first.', tl: 'Paaralan, training, parangal at mga tungkulin, pinakabago muna.' },
    types: {
      education: { en: 'Education', tl: 'Edukasyon' },
      achievement: { en: 'Achievement', tl: 'Parangal' },
      training: { en: 'Training', tl: 'Training' },
      leadership: { en: 'Leadership', tl: 'Pamumuno' },
    },
  },
  projects: {
    title: { en: 'Featured projects', tl: 'Mga tampok na proyekto' },
    lede: { en: 'Things I built, what I did on each, and what I learned.', tl: 'Mga ginawa ko, ang papel ko, at ang natutunan ko.' },
    filterLabel: { en: 'Filter projects by category', tl: 'I-filter ang projects ayon sa kategorya' },
    all: { en: 'All', tl: 'Lahat' },
    featured: { en: 'Featured', tl: 'Tampok' },
    details: { en: 'Details', tl: 'Detalye' },
    demo: { en: 'Live demo', tl: 'Live demo' },
    code: { en: 'Code', tl: 'Code' },
    role: { en: 'My role', tl: 'Papel ko' },
    learned: { en: 'What I learned', tl: 'Ang natutunan ko' },
    built: { en: 'Built with', tl: 'Ginamit' },
    close: { en: 'Close', tl: 'Isara' },
    showing: { en: 'Showing {n} of {total} projects', tl: 'Ipinapakita ang {n} sa {total} na projects' },
    opensNewTab: { en: '(opens in a new tab)', tl: '(magbubukas sa bagong tab)' },
  },
  skills: {
    title: { en: 'Skills', tl: 'Mga kasanayan' },
    lede: { en: 'What I use regularly, grouped by type.', tl: 'Mga madalas kong gamitin, naka-grupo ayon sa uri.' },
  },
  certificates: {
    title: { en: 'Certifications and achievements', tl: 'Mga sertipiko at parangal' },
    lede: { en: 'Select a certificate to see it full size.', tl: 'Pumili ng sertipiko para makita ito nang buo.' },
    achievementsTitle: { en: 'Achievements', tl: 'Mga parangal' },
    verify: { en: 'Verify', tl: 'I-verify' },
    enlarge: { en: 'View full size:', tl: 'Tingnan nang buo:' },
    prev: { en: 'Previous image', tl: 'Nakaraang larawan' },
    next: { en: 'Next image', tl: 'Susunod na larawan' },
  },
  contact: {
    title: { en: "Let's work together", tl: 'Magtulungan tayo' },
    lede: {
      en: "Have an internship, OJT slot or project in mind? Send a message and I'll reply within two days.",
      tl: 'May internship, OJT slot o project ka ba? Magpadala ng mensahe at sasagot ako sa loob ng dalawang araw.',
    },
    name: { en: 'Your name', tl: 'Pangalan mo' },
    email: { en: 'Your email', tl: 'Email mo' },
    message: { en: 'Message', tl: 'Mensahe' },
    send: { en: 'Send message', tl: 'Ipadala ang mensahe' },
    sending: { en: 'Sending…', tl: 'Ipinapadala…' },
    sent: { en: "Message sent. Thanks! I'll get back to you soon.", tl: 'Naipadala na ang mensahe. Salamat! Sasagot ako agad.' },
    failed: { en: "The message didn't go through. Check your connection and try again, or email me directly.", tl: 'Hindi naipadala ang mensahe. Subukang muli o mag-email nang direkta.' },
    notConfigured: { en: "The form isn't connected yet. Please email me directly.", tl: 'Hindi pa naka-set up ang form. Mag-email na lang nang direkta.' },
    errName: { en: 'Enter your name.', tl: 'Ilagay ang pangalan mo.' },
    errEmail: { en: 'Enter a valid email, like name@example.com.', tl: 'Maglagay ng tamang email, gaya ng name@example.com.' },
    errMessage: { en: 'Write a message of at least 10 characters.', tl: 'Sumulat ng mensahe na hindi bababa sa 10 character.' },
    copyEmail: { en: 'Copy email', tl: 'Kopyahin ang email' },
    copied: { en: 'Email copied', tl: 'Nakopya ang email' },
    copyFailed: { en: 'Copy failed. Select the email to copy it.', tl: 'Hindi nakopya. Piliin ang email para kopyahin.' },
    elsewhere: { en: 'Find me elsewhere', tl: 'Hanapin ako sa iba pang lugar' },
  },
  footer: {
    built: { en: 'Built with Vite and Tailwind CSS.', tl: 'Ginawa gamit ang Vite at Tailwind CSS.' },
    top: { en: 'Back to top', tl: 'Bumalik sa itaas' },
  },
  notFound: {
    title: { en: 'Page not found', tl: 'Hindi makita ang page' },
    body: { en: "The link may be old or mistyped. Head back to the homepage to see my work.", tl: 'Maaaring luma o mali ang link. Bumalik sa homepage.' },
    home: { en: 'Go to homepage', tl: 'Pumunta sa homepage' },
  },
};

export default { site, profile, projects, timeline, skills, certifications, achievements, stats, ui };