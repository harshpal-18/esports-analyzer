import emailjs from "@emailjs/browser";
import profile from "./assets/harshpal.jpg";
import sheetImg from "./assets/sheet.jpg";
import machineImg from "./assets/machine.jpg";
import jarvisImg from "./assets/jarvis.jpg";
import hackathonImg from "./assets/hackathon.jpg";
import developerImg from "./assets/developer.jpg";
import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'motion/react';
import { 
  Github, 
  Linkedin, 
  Instagram, 
  Mail, 
  ExternalLink, 
  Download, 
  Moon, 
  Sun, 
  Code, 
  Database, 
  Layout, 
  BookOpen,
  ChevronRight,
  ChevronUp,
  Send,
  Cpu,
  Terminal,
  Flag,
  Award,
  Rocket,
  Zap,
  Star,
  X
} from 'lucide-react';

// --- Types ---
interface CaseStudy {
  overview: string;
  problemStatement: string;
  objectives: string[];
  architecture: string;
  techStack: string[];
  keyFeatures: string[];
  challenges: string[];
  solutions: string[];
  results: string;
  skills: string[];
  futureImprovements: string[];
  role?: string;
  lessonsLearned?: string[];
}

interface Project {
  id: number;
  title: string;
  description: string;
  features?: string[];
  image: string;
  tags: string[];
  category: 'Web' | 'AI' | 'Academic';
  github: string;
  live: string;
  caseStudy?: CaseStudy;
}

interface Skill {
  name: string;
  level: number;
  category: 'Programming Languages' | 'Web Development' | 'AI & Machine Learning' | 'Tools & Technologies';
}

// --- Data ---
const SKILLS: Skill[] = [
  // Programming Languages
  { name: 'C++', level: 80, category: 'Programming Languages' },
  { name: 'Python', level: 90, category: 'Programming Languages' },
  { name: 'Java', level: 95, category: 'Programming Languages' },
  { name: 'JavaScript', level: 81, category: 'Programming Languages' },
  
  // Web Development
  { name: 'HTML5', level: 85, category: 'Web Development' },
  { name: 'CSS3', level: 86, category: 'Web Development' },
  { name: 'JavaScript (ES6+)', level: 84, category: 'Web Development' },
  { name: 'React.js', level: 88, category: 'Web Development' },

  // AI & Machine Learning
  { name: 'Machine Learning Basics', level: 95, category: 'AI & Machine Learning' },
  { name: 'Model Training & Evaluation', level: 80, category: 'AI & Machine Learning' },
  { name: 'Python Libraries (NumPy, Pandas, Matplotlib)', level: 80, category: 'AI & Machine Learning' },

  // Tools & Technologies
  { name: 'Git & GitHub', level: 90, category: 'Tools & Technologies' },
  { name: 'VS Code', level: 85, category: 'Tools & Technologies' },
  { name: 'Linux Basics', level: 85, category: 'Tools & Technologies' },
];

const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'Esport Analyzer — Advanced Gaming Analytics Platform',
    description: 'Esport Analyzer is a modern analytics platform designed for competitive gaming enthusiasts, teams, and analysts. The platform provides detailed insights into player performance, match statistics, team comparisons, and tournament analytics through an interactive and visually appealing dashboard. Built with a premium dark-themed UI, the project focuses on speed, responsiveness, and real-time data visualization to enhance the esports analysis experience.',
    features: ['Real-time esports analytics dashboard', 'Player and team performance tracking', 'Interactive charts and statistics visualization', 'Match history and detailed analysis', 'Team comparison system', 'Premium dark-themed modern UI', 'Fully responsive across all devices'],
    image: jarvisImg,
    tags: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Firebase', 'Esports Analytics', 'Dashboard', 'Gaming', 'Data Visualization', 'Frontend Development', 'Responsive Design', 'UI/UX', 'Web Application', 'Performance Tracking', 'Statistics', 'Modern UI', 'Dark Theme', 'Real-Time Data', 'Interactive Dashboard'],
    category: 'Esports Analytics',
    github: 'https://github.com/harshpal-18/esports-analyzer.git',
    live: 'https://esports-analyzer.vercel.app',
    caseStudy: {
      overview: 'Esport Analyzer is a modern web-based analytics platform developed to provide detailed insights into esports matches, player performance, and team statistics. The platform combines interactive dashboards, real-time data visualization, and a premium user interface to help users analyze gaming performance efficiently. It is designed for gamers, esports enthusiasts, analysts, and teams who want a smarter way to track and compare competitive gaming data.',
      problemStatement: 'Competitive gaming generates massive amounts of performance data, but analyzing this information efficiently can be difficult due to scattered statistics, complex interfaces, and limited visualization systems. Esport Analyzer addresses these challenges by transforming raw gaming data into structured and interactive insights through a modern analytics dashboard. The platform simplifies match analysis, enhances accessibility across devices, and provides users with an intuitive experience for tracking player performance, comparing teams, and making data-driven decisions in the esports ecosystem.',
      objectives: [
         'Improve the esports analytics experience through modern web technologies and design principles.',
         'Provide accurate and visually engaging performance tracking.',
         'Enable easy comparison between players, teams, and matches.',
         'Enhance user engagement with interactive dashboards and responsive design.',
         'Build a scalable platform capable of supporting future esports analytics features.',
         'Combine design, analytics, and technology into a professional web application.',
      ],
      architecture: 'Esport Analyzer follows a modern frontend-focused architecture designed for scalability, responsiveness, and smooth performance. The application is structured using component-based development, enabling reusable UI components and efficient state management. The architecture separates the user interface, analytics logic, and backend services to maintain clean code organization and improve maintainability. Real-time data handling and responsive rendering ensure a seamless experience across different devices and screen sizes.',
      techStack: ['React.js', 'TypeScript', 'Vite', 'Tailwind CSS', 'Firebase Authentication', 'Firebase Database / Firestore', 'Git & GitHub', 'VS Code', 'Vercel / Netlify'],
      keyFeatures: [
        'Interactive esports analytics dashboard',
        'Player and team performance tracking',
        'Real-time statistics visualization',
        'Team and match comparison system',
        'Detailed match history analysis',
        'Modern dark-themed premium UI',
        'Fully responsive design for all devices',
        'Optimized speed and performance',
        'Secure authentication system',
        'Clean and intuitive user experience'
      ],
      challenges: [
         'Managing and organizing large amounts of esports performance data',
         'Creating a responsive dashboard that works smoothly on all devices',
         'Designing a modern UI without making the interface overcrowded',
         'Implementing interactive charts and analytics visualization',
         'Maintaining fast loading speed with dynamic content',
         'Ensuring scalable and reusable component structure',
         'Handling real-time updates and smooth user interactions',
         'Providing an intuitive user experience for complex statistics'
      ],
      solutions: [
        'Structured data using organized analytics components and reusable modules',
        'Used responsive design principles with Tailwind CSS for cross-device compatibility',
        'Created a clean dark-themed UI focused on minimalism and readability',
        'Integrated interactive charts and visual elements for better data understanding',
        'Optimized frontend rendering and component performance using React and Vite',
        'Followed component-based architecture for scalability and maintainability'
        'Implemented efficient state handling and dynamic data rendering',
        'Simplified complex statistics into user-friendly dashboards and comparisons',
      ],
      results: 'The development of Esport Analyzer successfully demonstrated the creation of a modern and responsive esports analytics platform capable of delivering interactive performance insights through dynamic dashboards and data visualization. The project achieved optimized speed, smooth user experience, and scalable frontend architecture while maintaining a clean and professional interface. It also showcased the practical application of modern web technologies, analytics systems, and responsive design principles in building a real-world gaming analytics solution.',
      skills: ['Frontend Development with React and TypeScript',
        'Responsive UI/UX Design using Tailwind CSS',
        'Component-Based Architecture and Reusable Design Patterns',
        'Data Visualization and Dashboard Development',
        'State Management and Dynamic Rendering',
        'Firebase Authentication and Backend Integration',
        'Performance Optimization and Debugging',
        'Git & GitHub Version Control',
        'Project Structuring and Deployment Workflow',
        'Problem Solving and Analytical Thinking'
      ],
      futureImprovements: [
        'Add real-time esports API integration for live match analytics',
        'Implement AI-based performance prediction and insights',
        'Introduce advanced filtering and search functionality',
        'Add tournament tracking and leaderboard systems',
        'Develop personalized user profiles and saved analytics history',
        'Improve data visualization with advanced chart libraries',
        'Add multiplayer team collaboration features',
        'Integrate dark/light theme customization',
        'Enhance backend scalability for larger datasets',
        'Launch a mobile application version for better accessibility'
      ]
    }
  },
  {
    id: 2,
    title: 'Aesthetic Developer Portfolio Website',
    description: 'Designed and developed a fully responsive personal portfolio website with elegant UI and smooth scrolling animations.',
    features: ['Minimalistic UI design', 'Smooth scroll animations', 'Responsive layout', 'Resume download integration'],
    image: developerImg,
    tags: ['React', 'Tailwind CSS', 'Motion'],
    category: 'Web',
    github: 'https://github.com/harshpal-18',
    live: '#',
    caseStudy: {
      overview: 'A high-performance, aesthetically pleasing developer portfolio designed to showcase technical skills and creative projects. Built with a focus on modern UI/UX principles, the site features smooth animations, responsive design, and a sophisticated project showcase system.',
      problemStatement: 'Developers often struggle to present their work in a way that is both technically impressive and visually engaging. A generic portfolio can fail to capture the unique personality and attention to detail that a developer brings to their craft.',
      objectives: [
        'Create a visually stunning and professional personal brand identity.',
        'Implement a high-performance, responsive web experience.',
        'Showcase projects through an interactive and detailed case study system.',
        'Maintain a clean, minimalistic aesthetic while providing deep technical insights.'
      ],
      architecture: 'The site is built using a modern React stack with Vite for lightning-fast development and builds. Tailwind CSS provides a utility-first styling approach, while Framer Motion handles the complex orchestration of entrance and scroll-based animations. The architecture is modular, allowing for easy updates to projects and skills.',
      techStack: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Lucide React'],
      keyFeatures: [
        'Dynamic dark/light mode with system preference detection.',
        'Smooth scroll-based entrance animations for all sections.',
        'Interactive project modal system for detailed case studies.',
        'Fully responsive layout optimized for all screen sizes.',
        'Performance-optimized asset loading and rendering.'
      ],
      challenges: [
        'Orchestrating complex animations without compromising performance.',
        'Ensuring consistent aesthetic appeal across both light and dark modes.',
        'Managing state for interactive elements like modals and filters efficiently.'
      ],
      solutions: [
        'Utilized Framer Motion\'s hardware-accelerated animations and layout transitions.',
        'Implemented a robust Tailwind-based theme system for seamless mode switching.',
        'Used React hooks and AnimatePresence for smooth modal transitions and state management.'
      ],
      results: 'Successfully launched a premium personal brand platform that has significantly increased engagement and professional inquiries. The site maintains a high performance score while delivering a rich, interactive user experience.',
      skills: ['Frontend Development', 'UI/UX Design', 'Motion Design', 'Performance Optimization', 'React Architecture'],
      futureImprovements: [
        'Integration of a headless CMS for dynamic content management.',
        'Addition of a technical blog section with MDX support.',
        'Implementation of more advanced interactive 3D elements.'
      ],
      lessonsLearned: [
        'The importance of "micro-interactions" in creating a premium feel.',
        'How to balance visual complexity with web performance.',
        'The value of a consistent design system in accelerating development.'
      ]
    }
  },
  {
    id: 3,
    title: 'AI Model Training Project (Hackathon)',
    description: 'Trained a machine learning model during a hackathon event to solve a real-world classification problem.',
    features: ['Data preprocessing', 'Model training & evaluation', 'Accuracy optimization', 'Performance visualization'],
    image: machineImg,
    tags: ['Python', 'NumPy', 'Pandas', 'Scikit-learn'],
    category: 'AI',
    github: 'https://github.com/harshpal-18',
    live: '#',
    caseStudy: {
      overview: 'This project was developed during a high-intensity hackathon where the goal was to build a robust machine learning model to solve a real-world classification problem within a 24-hour timeframe. The project focused on the entire ML lifecycle, from raw data to a deployable model.',
      problemStatement: 'The challenge involved a complex dataset with significant noise, missing values, and imbalanced classes. The goal was to create a model that could generalize well to unseen data while maintaining high precision and recall for critical classifications.',
      objectives: [
        'Preprocess and clean a messy dataset under time pressure.',
        'Perform feature engineering to extract high-value insights.',
        'Select and tune the most effective machine learning model.',
        'Evaluate performance using comprehensive metrics like F1-score and AUC-ROC.'
      ],
      architecture: 'The training pipeline followed a structured ML workflow: data cleaning, exploratory data analysis (EDA), feature scaling, and model selection. We experimented with several algorithms, ultimately selecting a Random Forest Classifier for its robustness against overfitting and its ability to handle non-linear relationships effectively.',
      techStack: ['Python', 'Scikit-learn', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn'],
      keyFeatures: [
        'Automated data preprocessing and cleaning pipeline.',
        'Feature importance analysis for model interpretability.',
        'Hyperparameter tuning using GridSearchCV for optimal performance.',
        'Comprehensive evaluation dashboard with confusion matrices and ROC curves.'
      ],
      challenges: [
        'Significant time constraints (24-hour hackathon environment).',
        'Imbalanced dataset classes leading to biased predictions.',
        'High dimensionality requiring careful feature selection to avoid the curse of dimensionality.'
      ],
      solutions: [
        'Implemented SMOTE (Synthetic Minority Over-sampling Technique) to balance classes.',
        'Used Recursive Feature Elimination (RFE) to identify the most impactful features.',
        'Utilized K-fold cross-validation to ensure model stability and reliability.'
      ],
      results: 'The final model achieved an impressive accuracy of 92% with a balanced F1-score of 0.89. The project was highly successful, demonstrating the ability to deliver a high-performing machine learning solution under extreme pressure.',
      skills: ['Machine Learning', 'Data Science', 'Python Programming', 'Statistical Analysis', 'Problem Solving'],
      futureImprovements: [
        'Integration with deep learning frameworks like TensorFlow for complex patterns.',
        'Deployment as a scalable REST API using Flask or FastAPI.',
        'Implementation of real-time data stream processing.'
      ],
      lessonsLearned: [
        'The critical importance of data cleaning over model complexity.',
        'How to prioritize high-impact tasks under strict time limits.',
        'The immense value of feature engineering in significantly improving model performance.'
      ]
    }
  },
  {
    id: 4,
    title: 'Google Sheets Automation Web App',
    description: 'Developed a web application integrated with Google Sheets API to collect and store user data automatically.',
    features: ['Form submission handling', 'Real-time data storage', 'Automated spreadsheet update'],
    image: sheetImg,
    tags: ['JavaScript', 'Google Apps Script', 'Sheets API'],
    category: 'Web',
    github: 'https://github.com/harshpal-18',
    live: '#',
    caseStudy: {
      overview: 'A robust web-based automation tool designed to streamline data collection and spreadsheet management. This application integrates directly with the Google Sheets API to provide a seamless bridge between user input and structured data storage, featuring backend automation logic and real-time synchronization.',
      problemStatement: 'Manual data entry into spreadsheets is prone to errors, time-consuming, and difficult to manage across multiple users. Organizations often struggle with maintaining data integrity and security when collecting information from various sources into a central spreadsheet.',
      objectives: [
        'Automate the workflow of data collection from web forms to spreadsheets.',
        'Ensure secure and authenticated access to the Google Sheets API using OAuth 2.0.',
        'Provide real-time updates to the spreadsheet upon form submission.',
        'Implement backend logic for data validation, formatting, and automated processing.'
      ],
      architecture: 'The application uses a secure client-server architecture. The frontend handles user input and validation, while the backend (Google Apps Script/Node.js) manages the API integration. The system utilizes OAuth 2.0 for secure authentication and the Google Sheets API for real-time data persistence. Security is maintained through environment-level credential management and scoped API permissions.',
      techStack: ['JavaScript', 'Google Sheets API', 'Google Apps Script', 'OAuth 2.0', 'HTML5/CSS3'],
      keyFeatures: [
        'Secure OAuth 2.0 authentication handling.',
        'Real-time spreadsheet updates with zero latency.',
        'Automated backend logic for data processing and validation.',
        'Web-based UI for intuitive and error-free data input.',
        'Scalable architecture for high-volume data collection.'
      ],
      challenges: [
        'Managing API rate limits for high-frequency updates.',
        'Handling complex OAuth 2.0 authentication flows in a web environment.',
        'Ensuring data consistency during concurrent submissions.'
      ],
      solutions: [
        'Implemented request batching and exponential backoff for API calls.',
        'Used secure token management and refresh token logic for persistent access.',
        'Added server-side locking mechanisms to prevent data collisions.'
      ],
      results: 'The automation system improved data entry speed by 80% and eliminated manual transcription errors. It provides significant business value by enabling real-time data visibility, reducing administrative overhead, and ensuring 100% data integrity across the organization.',
      skills: ['API Integration', 'Backend Automation', 'Security Best Practices', 'Full-stack Development'],
      futureImprovements: [
        'Integration with Google Drive for automated report generation.',
        'Advanced data visualization dashboard.',
        'Support for multiple spreadsheet destinations.'
      ]
    }
  },
  {
    id: 5,
    title: 'Hackathon Participation – Cyber Carnival',
    description: 'Cleared Phase 1 of Cyber Carnival Hackathon by solving cybersecurity and technical challenges.',
    features: ['Problem-solving under time constraints', 'Team collaboration', 'Practical cybersecurity exposure'],
    image: hackathonImg,
    tags: ['Cybersecurity', 'Problem Solving', 'Collaboration'],
    category: 'Academic',
    github: 'https://github.com/harshpal-18',
    live: '#',
    caseStudy: {
      overview: 'The Cyber Carnival Hackathon was a prestigious event focused on identifying and solving complex cybersecurity challenges. It brought together technical minds to compete in a high-pressure environment, testing their ability to secure systems and solve intricate puzzles.',
      problemStatement: 'The hackathon presented diverse challenges ranging from cryptography and network security to web vulnerabilities and forensic analysis. We had to identify security flaws in provided systems and implement robust fixes within strict time limits.',
      objectives: [
        'Analyze and identify security vulnerabilities in real-world scenarios.',
        'Develop and implement secure solutions to mitigate identified risks.',
        'Collaborate effectively as a team to tackle multi-disciplinary problems.',
        'Demonstrate technical agility and problem-solving under time pressure.'
      ],
      architecture: 'The technical approach involved using a variety of security tools for vulnerability scanning, traffic analysis, and code auditing. We focused on a layered defense strategy, ensuring that each identified flaw was addressed with a comprehensive security patch.',
      techStack: ['Kali Linux', 'Wireshark', 'Burp Suite', 'Python', 'Secure Coding Practices'],
      keyFeatures: [
        'Vulnerability assessment and penetration testing.',
        'Implementation of secure authentication and encryption.',
        'Network traffic analysis and anomaly detection.',
        'Rapid response and incident mitigation strategies.'
      ],
      challenges: [
        'Extremely tight deadlines for complex problem-solving.',
        'Coordinating technical tasks across different team members.',
        'Navigating unfamiliar system architectures under pressure.'
      ],
      solutions: [
        'Adopted an agile task-splitting strategy to cover more ground.',
        'Maintained a shared documentation log for real-time collaboration.',
        'Focused on high-impact vulnerabilities first to secure the core systems.'
      ],
      results: 'Successfully cleared Phase 1 of the Cyber Carnival Hackathon, placing among the top teams. This achievement validated our technical skills and demonstrated our ability to perform under pressure in a competitive cybersecurity landscape.',
      skills: ['Cybersecurity', 'Team Collaboration', 'Problem Solving', 'Technical Analysis', 'Agile Methodologies'],
      futureImprovements: [
        'Enhance expertise in automated security orchestration.',
        'Deepen understanding of cloud-native security frameworks.',
        'Participate in more advanced Capture The Flag (CTF) events.'
      ],
      role: 'Lead Technical Analyst – Responsible for vulnerability identification and coordinating the implementation of security patches across the team.',
      lessonsLearned: [
        'The importance of clear communication in high-pressure team environments.',
        'The value of a structured approach to vulnerability assessment.',
        'How to maintain technical focus and accuracy under strict deadlines.'
      ]
    }
  },
];

const EXPERIENCE = [
  {
    role: 'Software Engineering Intern',
    company: 'Tech Solutions Inc.',
    period: 'June 2025 - Aug 2025',
    description: 'Developed internal tools using React and optimized database queries for better performance.',
  },
  {
    role: 'Open Source Contributor',
    company: 'GSoC / Various Projects',
    period: '2024 - Present',
    description: 'Contributing to various web-based open source projects, focusing on accessibility and UI components.',
  },
];

const EDUCATION = [
  {
    degree: 'Bachelor of Technology (BTech)',
    branch: 'Computer Science Engineering',
    institution: 'Vellore Institute Of Technology',
    duration: '2025 – 2029',
    details: 'Focusing on advanced algorithms, software engineering, and artificial intelligence.',
    icon: <Cpu size={24} />
  },
  {
    degree: 'Higher Secondary Education',
    branch: 'Science & Mathematics',
    institution: 'Mercy Memorial School',
    duration: '2012 – 2025',
    location: 'Kanpur, Uttar Pradesh',
    details: 'Completed schooling with a focus on technical subjects and problem-solving.',
    icon: <BookOpen size={24} />
  }
];

const JOURNEY = [
  {
    year: '2012',
    title: 'The Beginning',
    description: 'Started academic journey at Mercy Memorial School.',
    icon: <Flag size={20} />
  },
  {
    year: '2019 – 2023',
    title: 'Foundation Years',
    description: 'Developed strong foundation in Mathematics and Science. Actively participated in school-level competitions and technical activities.',
    icon: <Award size={20} />
  },
  {
    year: '2023',
    title: 'Discovery of Code',
    description: 'Started focusing on Computer Science and programming fundamentals. Began learning Java and Python.',
    icon: <Terminal size={20} />
  },
  {
    year: '2025 – Present',
    title: 'Growth & Innovation',
    description: 'Actively building real-world projects and strengthening development skills.',
    details: [
      'Built personal projects including Portfolio Website.',
      'Started working on AI-based projects.',
      'Participated in Hackathons (Cyber Carnival – Phase 1 Cleared).',
      'Worked on Google Sheets Automation Web App.',
      'Improving AI/ML knowledge.',
      'Strengthening development and problem-solving skills.'
    ],
    icon: <Rocket size={20} />
  }
];

const HONOURS = [
  {
    title: 'Cyber Carnival Hackathon – Phase 1 Qualifier (2026)',
    description: 'Recognized for successfully clearing the initial round of a competitive cybersecurity and problem-solving hackathon.',
    icon: <Zap size={24} />
  },
  {
    title: 'Academic Excellence Recognition',
    description: 'Demonstrated consistent academic dedication and strong performance in Mathematics and Science during schooling.',
    icon: <Award size={24} />
  },
  {
    title: 'Technical Project Recognition',
    description: 'Developed multiple independent technical projects including AI Assistant, Portfolio Website, and Automation Applications.',
    icon: <Code size={24} />
  },
  {
    title: 'Self-Initiated Learning Achievement',
    description: 'Completed structured self-learning in Programming, Web Development, and AI/ML concepts.',
    icon: <BookOpen size={24} />
  }
];

// --- Components ---

const LoadingScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-beige-50 dark:bg-zinc-950"
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-4xl font-serif italic font-bold text-zinc-900 dark:text-white mb-4 tracking-tight">
          Harsh Pal.
        </h1>
        <div className="w-48 h-1 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden relative mx-auto">
          <motion.div
            initial={{ left: "-100%" }}
            animate={{ left: "100%" }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="absolute top-0 bottom-0 w-1/2 bg-muted-blue"
          />
        </div>
        <p className="mt-4 text-xs uppercase tracking-[0.3em] text-zinc-400 font-medium">
          Crafting Excellence
        </p>
      </motion.div>
    </motion.div>
  );
};

const Navbar = ({ theme, toggleTheme }: { theme: string; toggleTheme: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-6'}`}>
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-muted-blue origin-left z-[60]"
        style={{ scaleX }}
      />
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <motion.a 
          href="#" 
          className="text-2xl font-serif italic font-bold tracking-tight text-zinc-900 dark:text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          HP.
        </motion.a>
        
        <div className="hidden md:flex items-center space-x-8">
          {['About', 'Education', 'Journey', 'Skills', 'Projects', 'Honours', 'Contact'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
            >
              {item}
            </a>
          ))}
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </div>

        <div className="md:hidden flex items-center">
          <button onClick={toggleTheme} className="p-2 mr-2">
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          {/* Mobile menu could be added here */}
        </div>
      </div>
    </nav>
  );
};

const Hero = () => {
  const tagline = "BTech Student | Developer | Problem Solver";
  
  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center section-padding bg-beige-50 dark:bg-zinc-950 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-muted-blue/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-beige-200/40 blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="z-10"
      >
        <h1 className="text-5xl md:text-8xl font-serif italic font-bold text-zinc-900 dark:text-white mb-6 leading-tight">
          Harsh Pal
        </h1>
        <div className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 mb-4 h-8 flex justify-center items-center">
          {tagline.split("").map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ 
                opacity: 1, 
                y: [0, -2, 0],
              }}
              transition={{ 
                opacity: { duration: 0.8, delay: i * 0.04 },
                y: { 
                  duration: 4, 
                  repeat: Infinity, 
                  delay: i * 0.1,
                  ease: "easeInOut"
                }
              }}
              className={char === "|" ? "text-muted-blue/40 mx-4" : ""}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </div>
        <p className="max-w-xl mx-auto text-zinc-500 dark:text-zinc-500 mb-10 text-lg leading-relaxed">
          Crafting elegant solutions to complex problems through code and creativity.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <motion.a 
            href="#projects"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-full font-medium shadow-lg hover:shadow-xl transition-all"
          >
            View Projects
          </motion.a>
          <motion.a 
            href="#resume"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white rounded-full font-medium hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all flex items-center gap-2"
          >
            Download Resume <Download size={18} />
          </motion.a>
        </div>
      </motion.div>

      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-px h-12 bg-zinc-300 dark:bg-zinc-700" />
      </motion.div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="section-padding bg-white dark:bg-zinc-900">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={profile}
                alt="Harsh Pal"
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-beige-100 dark:bg-zinc-800 rounded-2xl -z-10" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-serif italic font-bold text-zinc-900 dark:text-white mb-6">About Me</h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-10 text-lg leading-relaxed">
              I'm a BTech Computer Science student at Vellore Institute of Technology with a passion for building beautiful, functional, and user-centered digital experiences. With a strong foundation in core CS principles and a keen eye for design, I bridge the gap between complex logic and aesthetic interfaces.
            </p>

            <div className="mt-10 flex gap-6">
              <a 
                href="https://github.com/harshpal-18"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
              >
                <Github size={24} />
              </a>
              <a 
                href="https://www.linkedin.com/in/harsh-pal-018h"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
              >
                <Linkedin size={24} />
              </a>
              <a 
                href="https://www.instagram.com/_harsh_._pal_"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
              >
                <Instagram size={24} />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Education = () => {
  return (
    <section id="education" className="section-padding bg-beige-50 dark:bg-zinc-950">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif italic font-bold text-zinc-900 dark:text-white mb-4">Academic Journey</h2>
          <p className="text-zinc-500">A timeline of my educational background and milestones.</p>
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-px bg-zinc-200 dark:bg-zinc-800" />

          <div className="space-y-12">
            {EDUCATION.map((edu, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className={`relative flex flex-col md:flex-row items-center ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Dot */}
                <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-muted-blue border-4 border-white dark:border-zinc-900 z-10" />

                {/* Content */}
                <div className={`w-full md:w-1/2 ${idx % 2 === 0 ? 'md:pl-12' : 'md:pr-12'} pl-8`}>
                  <div className="p-8 bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800 hover:shadow-md transition-all">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-2 bg-beige-50 dark:bg-zinc-800 rounded-lg text-muted-blue">
                        {edu.icon}
                      </div>
                      <span className="text-xs font-bold uppercase tracking-widest text-muted-blue">{edu.duration}</span>
                    </div>
                    <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-1">{edu.degree}</h3>
                    <p className="text-muted-blue font-medium mb-2">{edu.branch}</p>
                    <p className="text-zinc-700 dark:text-zinc-300 font-semibold mb-1">{edu.institution}</p>
                    {edu.location && <p className="text-xs text-zinc-400 mb-3">{edu.location}</p>}
                    <p className="text-sm text-zinc-500 leading-relaxed">{edu.details}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Journey = () => {
  return (
    <section id="journey" className="section-padding bg-white dark:bg-zinc-900">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif italic font-bold text-zinc-900 dark:text-white mb-4">My Journey</h2>
          <p className="text-zinc-500">The path I've taken to become the developer I am today.</p>
        </div>

        <div className="space-y-8">
          {JOURNEY.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="flex gap-6 md:gap-10 group"
            >
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-beige-50 dark:bg-zinc-800 flex items-center justify-center text-muted-blue border border-zinc-100 dark:border-zinc-700 group-hover:bg-muted-blue group-hover:text-white transition-all duration-500">
                  {item.icon}
                </div>
                <div className="w-px h-full bg-zinc-100 dark:bg-zinc-800 mt-4 group-last:hidden" />
              </div>
              <div className="pb-12">
                <span className="text-sm font-bold text-muted-blue uppercase tracking-widest mb-2 block">{item.year}</span>
                <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-3">{item.title}</h3>
                <p className="text-zinc-600 dark:text-zinc-400 mb-4 max-w-2xl leading-relaxed">
                  {item.description}
                </p>
                {item.details && (
                  <ul className="grid md:grid-cols-2 gap-x-8 gap-y-2">
                    {item.details.map((detail, i) => (
                      <li key={i} className="text-sm text-zinc-500 flex items-start gap-2">
                        <Star size={14} className="mt-1 text-muted-blue shrink-0" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Skills = () => {
  const categories = ['Programming Languages', 'Web Development', 'AI & Machine Learning', 'Tools & Technologies'];
  
  return (
    <section id="skills" className="section-padding bg-beige-50 dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif italic font-bold text-zinc-900 dark:text-white mb-4">My Expertise</h2>
          <p className="text-zinc-500 max-w-2xl mx-auto">A comprehensive look at the technologies and concepts I've mastered during my academic journey.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 1.2, 
                delay: idx * 0.15,
                ease: [0.21, 0.47, 0.32, 0.98] 
              }}
              className="p-8 bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800 hover:shadow-md transition-all group"
            >
              <div className="mb-6 text-muted-blue group-hover:scale-110 transition-transform">
                {cat === 'Programming Languages' && <Code size={32} />}
                {cat === 'Web Development' && <Layout size={32} />}
                {cat === 'AI & Machine Learning' && <Cpu size={32} />}
                {cat === 'Tools & Technologies' && <Terminal size={32} />}
              </div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-6">{cat}</h3>
              <div className="space-y-4">
                {SKILLS.filter(s => s.category === cat).map((skill, sIdx) => (
                  <div key={skill.name}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-zinc-700 dark:text-zinc-300">{skill.name}</span>
                      <span className="text-zinc-400">{skill.level}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true, margin: "-20px" }}
                        transition={{ 
                          duration: 3, 
                          ease: [0.21, 0.47, 0.32, 0.98], 
                          delay: sIdx * 0.1 + idx * 0.1 
                        }}
                        className="h-full bg-muted-blue"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Projects = () => {
  const [filter, setFilter] = useState<'All' | 'Web' | 'AI' | 'Academic'>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const filteredProjects = filter === 'All' ? PROJECTS : PROJECTS.filter(p => p.category === filter);

  return (
    <section id="projects" className="section-padding bg-white dark:bg-zinc-900">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <h2 className="text-4xl font-serif italic font-bold text-zinc-900 dark:text-white mb-4">Selected Works</h2>
            <p className="text-zinc-500">A collection of projects that showcase my technical skills and creative thinking.</p>
          </div>
          <div className="flex gap-2 p-1 bg-zinc-50 dark:bg-zinc-800 rounded-full">
            {['All', 'Web', 'AI', 'Academic'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f as any)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${filter === f ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'}`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="group bg-beige-50 dark:bg-zinc-950 rounded-2xl overflow-hidden border border-zinc-100 dark:border-zinc-800"
              >
                <div className="aspect-video overflow-hidden relative">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-zinc-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    <a href={project.github} className="p-3 bg-white rounded-full text-zinc-900 hover:bg-muted-blue hover:text-white transition-all"><Github size={20} /></a>
                    <a href={project.live} className="p-3 bg-white rounded-full text-zinc-900 hover:bg-muted-blue hover:text-white transition-all"><ExternalLink size={20} /></a>
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex gap-2 mb-4">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-[10px] uppercase tracking-widest font-bold px-2 py-1 bg-white dark:bg-zinc-800 text-zinc-500 rounded-md border border-zinc-100 dark:border-zinc-700">{tag}</span>
                    ))}
                  </div>
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">{project.title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed mb-4">{project.description}</p>
                  {project.features && (
                    <ul className="mb-6 space-y-1">
                      {project.features.map((feature, i) => (
                        <li key={i} className="text-xs text-zinc-400 flex items-center gap-2">
                          <div className="w-1 h-1 bg-muted-blue rounded-full" /> {feature}
                        </li>
                      ))}
                    </ul>
                  )}
                  {project.caseStudy ? (
                    <button 
                      onClick={() => setSelectedProject(project)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-muted-blue/10 text-muted-blue hover:bg-muted-blue hover:text-white transition-all text-sm font-bold group/btn"
                    >
                      View Case Study <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  ) : (
                    <a 
                      href={project.live}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-muted-blue/10 text-muted-blue hover:bg-muted-blue hover:text-white transition-all text-sm font-bold group/btn"
                    >
                      View Project <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
};

const ProjectModal = ({ project, onClose }: { project: Project; onClose: () => void }) => {
  if (!project.caseStudy) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-zinc-950/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="bg-white dark:bg-zinc-900 w-full max-w-5xl max-h-[90vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <div className="relative h-64 md:h-80 shrink-0">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 to-transparent" />
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-all"
          >
            <X size={24} />
          </button>
          <div className="absolute bottom-8 left-8 md:left-12">
            <div className="flex gap-2 mb-4">
              {project.tags.map(tag => (
                <span key={tag} className="text-[10px] uppercase tracking-widest font-bold px-2 py-1 bg-muted-blue text-white rounded-md">
                  {tag}
                </span>
              ))}
            </div>
            <h2 className="text-3xl md:text-5xl font-serif italic font-bold text-white">{project.title}</h2>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-8 md:p-12 custom-scrollbar">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="md:col-span-2 space-y-10">
              <section>
                <h3 className="text-xs uppercase tracking-widest font-bold text-muted-blue mb-4">Overview</h3>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-lg">
                  {project.caseStudy.overview}
                </p>
              </section>

              {project.caseStudy.role && (
                <section>
                  <h3 className="text-xs uppercase tracking-widest font-bold text-muted-blue mb-4">My Role</h3>
                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {project.caseStudy.role}
                  </p>
                </section>
              )}

              <section>
                <h3 className="text-xs uppercase tracking-widest font-bold text-muted-blue mb-4">Problem Statement</h3>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {project.caseStudy.problemStatement}
                </p>
              </section>

              <section>
                <h3 className="text-xs uppercase tracking-widest font-bold text-muted-blue mb-4">Technical Architecture</h3>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {project.caseStudy.architecture}
                </p>
              </section>

              <div className="grid sm:grid-cols-2 gap-10">
                <section>
                  <h3 className="text-xs uppercase tracking-widest font-bold text-muted-blue mb-4">Challenges</h3>
                  <ul className="space-y-3">
                    {project.caseStudy.challenges.map((item, i) => (
                      <li key={i} className="text-sm text-zinc-500 flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </section>
                <section>
                  <h3 className="text-xs uppercase tracking-widest font-bold text-muted-blue mb-4">Solutions</h3>
                  <ul className="space-y-3">
                    {project.caseStudy.solutions.map((item, i) => (
                      <li key={i} className="text-sm text-zinc-500 flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </section>
              </div>

              <section>
                <h3 className="text-xs uppercase tracking-widest font-bold text-muted-blue mb-4">Results & Impact</h3>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {project.caseStudy.results}
                </p>
              </section>

              {project.caseStudy.lessonsLearned && (
                <section>
                  <h3 className="text-xs uppercase tracking-widest font-bold text-muted-blue mb-4">Lessons Learned</h3>
                  <ul className="space-y-3">
                    {project.caseStudy.lessonsLearned.map((item, i) => (
                      <li key={i} className="text-sm text-zinc-500 flex items-start gap-3">
                        <BookOpen size={14} className="text-muted-blue mt-1 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>

            <div className="space-y-10">
              <section className="p-6 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl border border-zinc-100 dark:border-zinc-800">
                <h3 className="text-xs uppercase tracking-widest font-bold text-muted-blue mb-6">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {project.caseStudy.techStack.map(tech => (
                    <span key={tech} className="px-3 py-1.5 bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 text-xs font-medium rounded-lg border border-zinc-100 dark:border-zinc-700">
                      {tech}
                    </span>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="text-xs uppercase tracking-widest font-bold text-muted-blue mb-4">Objectives</h3>
                <ul className="space-y-3">
                  {project.caseStudy.objectives.map((obj, i) => (
                    <li key={i} className="text-sm text-zinc-500 flex items-start gap-3">
                      <Star size={14} className="text-muted-blue mt-1 shrink-0" />
                      {obj}
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h3 className="text-xs uppercase tracking-widest font-bold text-muted-blue mb-4">Key Features</h3>
                <ul className="space-y-3">
                  {project.caseStudy.keyFeatures.map((feature, i) => (
                    <li key={i} className="text-sm text-zinc-500 flex items-start gap-3">
                      <Zap size={14} className="text-muted-blue mt-1 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h3 className="text-xs uppercase tracking-widest font-bold text-muted-blue mb-4">Future Improvements</h3>
                <ul className="space-y-3">
                  {project.caseStudy.futureImprovements.map((item, i) => (
                    <li key={i} className="text-sm text-zinc-500 flex items-start gap-3">
                      <Rocket size={14} className="text-muted-blue mt-1 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>
        </div>
        
        <div className="p-8 border-t border-zinc-100 dark:border-zinc-800 flex justify-between items-center bg-zinc-50 dark:bg-zinc-900/50">
          <div className="flex gap-4">
            <a href={project.github} className="flex items-center gap-2 px-6 py-3 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-xl font-bold text-sm hover:scale-105 transition-all">
              <Github size={18} /> GitHub Repo
            </a>
            <a href={project.live} className="flex items-center gap-2 px-6 py-3 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white rounded-xl font-bold text-sm hover:bg-white dark:hover:bg-zinc-800 transition-all">
              <ExternalLink size={18} /> Live Demo
            </a>
          </div>
          <button 
            onClick={onClose}
            className="text-sm font-bold text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
          >
            Close Case Study
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Honours = () => {
  return (
    <section id="honours" className="section-padding bg-beige-50 dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif italic font-bold text-zinc-900 dark:text-white mb-4">Honours & Recognitions</h2>
          <p className="text-zinc-500">Milestones and acknowledgments of my dedication and growth.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {HONOURS.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="p-8 bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800 hover:shadow-md transition-all group"
            >
              <div className="flex items-start gap-6">
                <div className="p-4 bg-beige-50 dark:bg-zinc-800 rounded-xl text-muted-blue group-hover:bg-muted-blue group-hover:text-white transition-all duration-500 shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2 group-hover:text-muted-blue transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Resume = () => {
  const stats = [
    { label: 'Projects Done', value: 12 },
    { label: 'Skills Mastered', value: 15 },
  ];

  return (
    <section id="resume" className="section-padding bg-white dark:bg-zinc-900">
      <div className="max-w-7xl mx-auto">
        <div className="bg-zinc-900 dark:bg-zinc-950 rounded-3xl p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
             <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] rounded-full bg-muted-blue blur-[120px]" />
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative z-10"
          >
            <h2 className="text-4xl md:text-5xl font-serif italic font-bold text-white mb-8">Ready to bring ideas to life?</h2>
            <p className="text-zinc-400 max-w-xl mx-auto mb-12 text-lg">
              I'm currently looking for new opportunities. Download my resume to see if I'm a good fit for your team.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 max-w-3xl mx-auto">
              {stats.map((stat, idx) => (
                <div key={idx} className="p-6 bg-white/5 rounded-2xl border border-white/10">
                  <motion.h3 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="text-4xl font-serif italic font-bold text-white mb-2"
                  >
                    {stat.value}+
                  </motion.h3>
                  <p className="text-zinc-500 text-sm uppercase tracking-widest">{stat.label}</p>
                </div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-white text-zinc-900 rounded-full font-bold shadow-xl hover:shadow-2xl transition-all flex items-center gap-3 mx-auto"
            >
              Download Full Resume <Download size={20} />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    emailjs
      .send(
        "service_ibb4avs",
        "template_zftmifh",
        {
          name: formState.name,
          email: formState.email,
          message: formState.message,
        },
        "WU-SsX5iMH-dmQGzW"
      )
      .then(() => {
        alert("Message sent successfully!");
        setFormState({ name: "", email: "", message: "" });
        setIsSubmitting(false);
      })
      .catch((error) => {
        console.error(error);
        alert("Failed to send message.");
        setIsSubmitting(false);
      });
    };

  return (
    <section id="contact" className="section-padding bg-beige-50 dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-20">
          <div>
            <h2 className="text-4xl font-serif italic font-bold text-zinc-900 dark:text-white mb-6">Get in Touch</h2>
            <p className="text-zinc-500 mb-10 text-lg">
              Have a project in mind or just want to say hi? Feel free to reach out. I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
            </p>
            
            <div className="space-y-6">
              <motion.a
                href="mailto:its.me.harshp0@gmail.com"
                whileHover={{ x: 5 }}
                className="flex items-center gap-4 group"
              >
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-12 h-12 bg-white dark:bg-zinc-900 rounded-full flex items-center justify-center text-muted-blue shadow-sm group-hover:bg-muted-blue group-hover:text-white transition-all cursor-pointer"
                >
                  <Mail size={20} />
                </motion.div>
                <div>
                  <p className="text-xs text-zinc-400 uppercase tracking-widest font-bold">Email Me</p>
                  <p className="text-zinc-900 dark:text-white font-medium">its.me.harshp0@gmail.com</p>
                </div>
              </motion.a>

              <motion.a 
                  href="https://www.linkedin.com/in/harsh-pal-018h"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-4 group"
              >
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  className="w-12 h-12 bg-white dark:bg-zinc-900 rounded-full flex items-center justify-center text-muted-blue shadow-sm group-hover:bg-muted-blue group-hover:text-white transition-all"
                >
                  <Linkedin size={20} />
                </motion.div>
                <div>
                  <p className="text-xs text-zinc-400 uppercase tracking-widest font-bold">LinkedIn</p>
                  <p className="text-zinc-900 dark:text-white font-medium">https://www.linkedin.com/in/harsh-pal-018h</p>
                </div>
              </motion.a>

              <motion.a 
                  href="https://github.com/harshpal-18"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-4 group"
              >
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-12 h-12 bg-white dark:bg-zinc-900 rounded-full flex items-center justify-center text-muted-blue shadow-sm group-hover:bg-muted-blue group-hover:text-white transition-all"
                >
                  <Github size={20} />
                </motion.div>
                <div>
                  <p className="text-xs text-zinc-400 uppercase tracking-widest font-bold">GitHub</p>
                  <p className="text-zinc-900 dark:text-white font-medium">https://github.com/harshpal-18</p>
                </div>
              </motion.a>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-zinc-900 p-10 rounded-3xl shadow-xl border border-zinc-100 dark:border-zinc-800"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-2 block">Name</label>
                <input 
                  type="text" 
                  required
                  value={formState.name}
                  onChange={e => setFormState({...formState, name: e.target.value})}
                  className="w-full px-6 py-4 bg-zinc-50 dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-muted-blue/20 transition-all text-zinc-900 dark:text-white"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label className="text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-2 block">Email</label>
                <input 
                  type="email" 
                  required
                  value={formState.email}
                  onChange={e => setFormState({...formState, email: e.target.value})}
                  className="w-full px-6 py-4 bg-zinc-50 dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-muted-blue/20 transition-all text-zinc-900 dark:text-white"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-2 block">Message</label>
                <textarea 
                  rows={4}
                  required
                  value={formState.message}
                  onChange={e => setFormState({...formState, message: e.target.value})}
                  className="w-full px-6 py-4 bg-zinc-50 dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-muted-blue/20 transition-all text-zinc-900 dark:text-white resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting}
                className="w-full py-5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'} <Send size={18} />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-12 px-6 bg-white dark:bg-zinc-900 border-t border-zinc-100 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <p className="text-zinc-500 text-sm">© 2026 Harsh Pal. Built with passion and precision.</p>
        <div className="flex gap-8">
          <a href="#" className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">Twitter</a>
          <a href="#" className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">GitHub</a>
          <a href="#" className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
};

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-4 bg-muted-blue text-white rounded-full shadow-2xl hover:bg-zinc-900 dark:hover:bg-white dark:hover:text-zinc-900 transition-colors"
          aria-label="Back to top"
        >
          <ChevronUp size={24} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

// --- Main App ---

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    }

    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark bg-zinc-950' : 'bg-beige-50'}`}>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen key="loader" />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Navbar theme={theme} toggleTheme={toggleTheme} />
            
            <main>
              <Hero />
              <About />
              <Education />
              <Journey />
              <Skills />
              <Projects />
              <Honours />
              <Resume />
              <Contact />
            </main>

            <Footer />
            <BackToTop />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
