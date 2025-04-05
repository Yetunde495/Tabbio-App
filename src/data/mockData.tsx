export const mockResumeData = {
  name: "Ahmed Mohammed",
  role: "Software Engineer",
  template: "professional",
  config: {
    photo: false,
    professionalSummary: true,
    workExperience: true,
    location: true,
    education: true,
    skills: true,
    relevantCourses: true,
    languages: false,
    projects: true,
    email: true,
    website: true,
    phone: true,
    linkedIn: true,
    role: true,
    internships: true,
    careerHighlights: true,
    trainings: true,
    certifications: true,
  },
  style: {
    primary_color: "#007CFF",
    fontFamily: "",
    font_size: "",
  },
  professional_summary: `Results-driven Senior Software Engineer with 8+ years of experience in full-stack development and technical leadership. Specialized in building scalable distributed systems and microservices architectures. Proven track record of improving application performance, mentoring junior developers, and delivering high-impact solutions that drive business growth.
  
Skilled in creating dynamic, user-friendly applications and collaborating within agile teams.
     `,
  location: "San Francisco, CA",
  address: "123 Main St, San Francisco, CA 94111",
  email: "johndoe@example.com",
  phone_number: "+1 (555) 123-4567",
  website_url: "https://johndoeportfolio.com",
  linkedin_url: "https://linkedin.com/in/johndoe",
  areasOfExpertise: [
    "JavaScript",
    "React",
    "Node.js",
    "Express",
    "MongoDB",
    "TypeScript",
    "Git",
    "Agile Methodologies",
  ],
  skills: [
    {
      name: "technical skills",
      items: ["Development"],
    },
    {
      name: "soft skills",
      items: ["Patience"],
    },
  ],
  relevantCourses: [
    "Data Structures and Algorithms",
    "Web Application Development",
    "Database Management Systems",
    "Software Engineering Principles",
    "Operating Systems",
  ],
  experience: [
    {
      id: 1,
      position: "Frontend Developer",
      company: "Tech Solutions Inc.",
      description:
        "Developed responsive web applications using React and JavaScript. Collaborated with designers to create seamless UI experiences.",
      duration: "Jan 2021 - Present",
      keyAchievements: [
        "Led development of microservices architecture serving 1M+ users",
        "Improved application performance by 30% through code refactoring",
        "Mentored junior developers in best practices and coding standards",
      ],
    },
    {
      id: 2,
      position: "Backend Developer",
      company: "Innovatech Corp.",
      description:
        "Built and maintained REST APIs using Node.js and Express. Improved application performance and data handling.",
      duration: "Aug 2019 - Dec 2020",
      keyAchievements: [
        "Led development of microservices architecture serving 1M+ users",
        "Improved application performance by 30% through code refactoring",
        "Mentored junior developers in best practices and coding standards",
      ],
    },
  ],
  internships: [
    {
      id: 1,
      position: "Frontend Developer",
      company: "Tech Solutions Inc.",
      description:
        "Developed responsive web applications using React and JavaScript. Collaborated with designers to create seamless UI experiences.",
      duration: "Jan 2021 - Present",
      keyAchievements: [
        "Led development of microservices architecture serving 1M+ users",
        "Improved application performance by 30% through code refactoring",
        "Mentored junior developers in best practices and coding standards",
      ],
    },
    {
      id: 2,
      position: "Backend Developer",
      company: "Innovatech Corp.",
      description:
        "Built and maintained REST APIs using Node.js and Express. Improved application performance and data handling.",
      duration: "Aug 2019 - Dec 2020",
      keyAchievements: [
        "Led development of microservices architecture serving 1M+ users",
        "Improved application performance by 30% through code refactoring",
        "Mentored junior developers in best practices and coding standards",
      ],
    },
  ],
  education: [
    {
      id: 1,
      degree: "Bachelor of Science in Computer Science",
      school: "University of California, Berkeley",
      duration: "2015 - 2019",
      year: "2015",
      info: "Graduated with Honors, GPA: 3.8/4.0",
    },
    {
      id: 2,
      degree: "PHD in Computer Science",
      school: "NYU School of Engineering",
      duration: "2015 - 2019",
      year: "2020",
      info: "Graduated with Honors, GPA: 3.8/4.0",
    },
  ],
  projects: [
    {
      name: "Portfolio Website",
      description: "Developed a personal portfolio website.",
      technology: "HTML, CSS, JavaScript",
      github_link: "github.com/johndoe/portfolio",
    },
  ],
  careerHighlights: [
    {
      id: 1,
      title: "Technical Leadership",
      description:
        "Collaborated with cross-functional teams to deliver project milestones",
      link: "",
    },
    {
      id: 2,
      title: "Performance Optimization",
      description: "Optimized database queries, reducing response time by 50%",
      link: "https://images.pexels.com/photos/709143/pexels-photo-709143.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: 3,
      title: "Team Development",
      description:
        "Mentored 5+ Junior developers, leading to their promotion to mid-level roles",
      link: "https://videos.pexels.com/video-files/1966695/1966695-sd_640_360_30fps.mp4",
    },
  ],
  trainings: [
    {
      id: 1,
      title: "Bachelor of Science in Computer Science",
      platform: "University of California, Berkeley",
      year: "2015",
    },
    {
      id: 2,
      title: "PHD in Computer Science",
      platform: "NYU School of Engineering",
      year: "2020",
    },
  ],
};

export const mockResData = {
  name: "John Doe",
  language: "English",
  role: "Frontend Developer",
  email: "john.doe@email.com",
  phone: "(123) 456-7890",
  linkedIn: "https://linkedin.com/in/johndoe",
  website: "https://johndoe.dev",
  location: "New York, USA",
  template: "professional",
  style: {
    fontFamily: "Times New Roman",
    primaryColor: "#007CFF",
    fontSize: "medium",
    fontSrc: "/fonts/timesnewroman/times-new-roman.ttf",
  },
  professionalSummary:
    "Creative and detail-oriented Frontend Developer with 5+ years of experience designing and implementing responsive, user-friendly web applications. Proficient in JavaScript, React, and TypeScript, with expertise in modern frontend development practices and tools. Strong focus on accessibility, performance, and delivering seamless user experiences.",
  skills: [
    {
      name: "Languages",
      items: ["JavaScript (ES6+)", "TypeScript", "HTML", "CSS (SASS/LESS)"],
    },
    {
      name: "Frameworks & Libraries",
      items: ["React.js", "Redux", "Tailwind CSS", "Next.js"],
    },
    {
      name: "Tools",
      items: ["Git", "Webpack", "Vite", "Figma", "Firebase", "Docker"],
    },
    {
      name: "Testing",
      items: ["Jest", "Cypress", "React Testing Library"],
    },
  ],
  education: [
    {
      _id: "edu1",
      degree: "Bachelor of Science in Computer Science",
      institution: "University of California, Los Angeles (UCLA)",
      startDate: "2015-09-01",
      endDate: "2019-06-01",
      description:
        "Focused on software engineering, algorithms, and web development.",
      active: false,
    },
  ],
  certifications: [
    {
      _id: "cert1",
      name: "Certified React Developer",
      institution: "Meta",
      date: "2022-10-01",
    },
    {
      _id: "cert2",
      name: "JavaScript Algorithms and Data Structures",
      institution: "freeCodeCamp",
      date: "2021-03-01",
    },
  ],
  workExperience: [
    {
      _id: "work1",
      title: "Frontend Developer",
      company: "TechSoft Inc.",
      startDate: "2019-07-01",
      endDate: "Present",
      description: "Developing and maintaining web applications.",
      keyAchievements: [
        "Redesigned the company website, resulting in a 40% increase in user engagement.",
        "Implemented performance optimizations, reducing page load times by 25%.",
      ],
      skills: ["React.js", "TypeScript", "Redux", "CSS"],
      active: true,
    },
  ],
  internships: [
    {
      _id: "intern1",
      title: "Frontend Intern",
      company: "StartTech Labs",
      startDate: "2018-06-01",
      endDate: "2018-08-01",
      description:
        "Assisted in the development of a React-based dashboard for client analytics.",
      keyAchievements: ["Built reusable components to speed up development."],
      skills: ["React.js", "JavaScript", "HTML", "CSS"],
      active: false,
    },
  ],
  volunteerExperience: [
    {
      _id: "vol1",
      title: "Web Developer Volunteer",
      company: "Open Source Contributions",
      startDate: "2020-01-01",
      endDate: "2021-12-01",
      description:
        "Contributed to open-source projects to improve accessibility and usability.",
      keyAchievements: ["Enhanced UI/UX for multiple projects."],
      skills: ["React.js", "JavaScript", "Accessibility"],
      active: false,
    },
  ],
  projects: [
    {
      _id: "proj1",
      name: "Portfolio Website",
      description:
        "Developed a personal portfolio website to showcase projects and skills.",
      technology: "React.js, Tailwind CSS, TypeScript",
      link: "https://github.com/johndoe/portfolio",
    },
    {
      _id: "proj2",
      name: "E-Commerce Platform",
      description: "Built a scalable e-commerce platform with React and Redux.",
      technology: "React.js, Redux, Firebase",
      link: "https://github.com/johndoe/e-commerce",
    },
  ],
  relevantCourses: [
    "Advanced JavaScript",
    "Web Accessibility Fundamentals",
    "Frontend Performance Optimization",
  ],
  trainings: [
    {
      _id: "training1",
      degree: "Agile Development and Scrum",
      institution: "Scrum Alliance",
      startDate: "2020-01-01",
      endDate: "2021-12-01",
      description:
        "Completed training on Agile methodologies and Scrum practices for software teams.",
    },
    {
      _id: "training2",
      degree: "Performance Optimization for Web Apps",
      institution: "Pluralsight",
      startDate: "2020-01-01",
      endDate: "2021-12-01",
      description:
        "Learned strategies to optimize performance in modern web applications.",
    },
  ],
  memberships: [
    {
      _id: "membership1",
      name: "Member",
      organization: "Interaction Design Association (IxDA)",
      startDate: "2020-01-01",
      endDate: "Present",
    },
    {
      _id: "membership2",
      name: "Member",
      organization: "Frontend Masters Community",
      startDate: "2021-05-01",
      endDate: "Present",
    },
  ],
  areaOfExpertise: ["Frontend Development", "Responsive Web Design", "UI/UX"],
  careerHighlights: [
    {
      _id: "highlight1",
      title: "Company Website Redesign",
      description:
        "Redesigned the company website, increasing engagement by 40%.",
      thumbnail: "https://example.com/image.png",
      skills: ["React.js", "CSS", "User Experience"],
      attachments: {
        type: "image",
        link: "https://example.com/website-redesign",
      },
    },
  ],
  references: [
    {
      _id: "ref1",
      name: "Jane Smith",
      title: "Senior Software Engineer",
      company: "TechSoft Inc.",
      email: "jane.smith@techsoft.com",
      phone: "(987) 654-3210",
      relationship: "Manager",
    },
  ],
  hobbies: ["Photography", "Traveling", "Reading"],
  config: {
    location: true,
    role: true,
    workExperience: true,
    professionalSummary: true,
    email: true,
    phone: true,
    relevantCourses: true,
    skills: true,
    links: true,
    volunteerExperience: true,
    careerHighlights: true,
    internships: true,
    education: true,
    projects:true,
    memberships: true,
    references: true,
    certifications: true,
    trainings: true,
    areaOfExpertise: true,
    isLive: true,
    lastUpdate: true,
    showTabbioLink: false,
  },
};

export const mockEmptyResume = {
  name: "",
  role: "",
  template: "professional",
  config: {
    photo: false,
    professionalSummary: true,
    workExperience: true,
    location: true,
    education: true,
    skills: true,
    relevantCourses: true,
    languages: false,
    projects: true,
    email: true,
    website: true,
    phone: true,
    linkedIn: true,
    role: true,
    internships: true,
    careerHighlights: true,
    references:true,
    memberships:true,
    trainings: true,
    certifications: true,
  },
  style: {
    primaryColor: "#007CFF",
    fontFamily: 'Times New Roman',
    fontSize: 'medium',
    fontSrc: "/fonts/timesnewroman/times-new-roman.ttf",
  },
  professionalSummary: ``,
  location: "",
  address: "",
  email: "",
  phone: "",
  website: "",
  linkedIn: "",
  areaOfExpertise: [],
  skills: [],
  relevantCourses: [],
  workExperience: [],
  internships: [],
  certifications: [],
  memberships: [],
  references: [],
  education: [],
  projects: [],
  careerHighlights: [],
  trainings: [],
};

export const mocknotifications = [
  {
    _id: "1",
    read: false,
    message: "Welcome to the platform!",
    createdAt: "2025-04-05T10:15:00Z"
  },
  {
    _id: "2",
    read: true,
    message: "Your profile has been updated successfully.",
    createdAt: "2025-04-04T14:30:00Z"
  },
  {
    _id: "3",
    read: false,
    message: "You have a new message.",
    createdAt: "2025-04-03T09:45:00Z"
  },
  {
    _id: "4",
    read: true,
    message: "Password changed successfully.",
    createdAt: "2025-04-02T17:00:00Z"
  },
  {
    _id: "5",
    read: false,
    message: "New login detected from a new device.",
    createdAt: "2025-04-01T21:20:00Z"
  }
];


export const mockEmpty = {
  name: "",
  role: "",
    email: "",
    phone: "",
    linkedin: "",
    address: "",
    github: "",
    portfolio: "",
    template: "",
    style: {
      primaryColor: "#007CFF",
      font_family: '',
      font_size: ''
    },
  professionalSummary: "",
  areasOfExpertise: [],
  workExperience: [],
  relevantCourses: [],
  education: [],
  projects: [],
  skills: [],
  extracurricular_activities: [],
  languages: [],
};

export const analyticsData = [
  {
    name: "TechCorpInc",
    action: "Shared",
    date: "2023-11-09T23:32:00",
  },
  {
    name: "InnovateCo",
    action: "Saved",
    date: "2023-11-09T23:32:00",
  },
  {
    name: "Anonymous",
    action: "Downloaded",
    date: new Date(),
  },
];

export const mockApplicationData = [
  {
    job_role: "Frontend Developer",
    company: { name: "TechInc", location: "San Francisco, CA" },
    resume_name: "React Developer",
    date: new Date("2023-12-01"),
    status: "interviewing",
    match_score: 87,
    aiAssistance: true,
  },
  {
    job_role: "Backend Developer",
    company: { name: "CodeCore", location: "Remote" },
    resume_name: "Node.js Engineer",
    date: new Date("2023-11-20"),
    status: "applied",
    match_score: 74,
    aiAssistance: false,
  },
  {
    job_role: "Full Stack Developer",
    company: { name: "InnovateX", location: "Austin, TX" },
    resume_name: "Software Engineer",
    date: new Date("2023-11-25"),
    status: "offered",
    match_score: 92,
    aiAssistance: true,
  },
  {
    job_role: "Data Scientist",
    company: { name: "DataFlow", location: "Seattle, WA" },
    resume_name: "Machine Learning Specialist",
    date: new Date("2023-12-03"),
    status: "rejected",
    match_score: 65,
    aiAssistance: false,
  },
  {
    job_role: "UI/UX Designer",
    company: { name: "CreativeWorks", location: "New York, NY" },
    resume_name: "Visual Designer",
    date: new Date("2023-11-15"),
    status: "accepted",
    match_score: 89,
    aiAssistance: true,
  },
  {
    job_role: "DevOps Engineer",
    company: { name: "CloudSync", location: "Remote" },
    resume_name: "Infrastructure Engineer",
    date: new Date("2023-12-05"),
    status: "interviewing",
    match_score: 81,
    aiAssistance: false,
  },
  {
    job_role: "Mobile App Developer",
    company: { name: "Appify", location: "Chicago, IL" },
    resume_name: "React Native Developer",
    date: new Date("2023-11-28"),
    status: "applied",
    match_score: 78,
    aiAssistance: true,
  },
  {
    job_role: "Cybersecurity Analyst",
    company: { name: "SecureNet", location: "Washington, DC" },
    resume_name: "Security Specialist",
    date: new Date("2023-11-10"),
    status: "offered",
    match_score: 85,
    aiAssistance: false,
  },
  {
    job_role: "Cloud Architect",
    company: { name: "SkyHighTech", location: "Denver, CO" },
    resume_name: "Cloud Engineer",
    date: new Date("2023-12-08"),
    status: "rejected",
    match_score: 59,
    aiAssistance: true,
  },
  {
    job_role: "AI Researcher",
    company: { name: "ThinkAI", location: "Boston, MA" },
    resume_name: "AI Specialist",
    date: new Date("2023-11-18"),
    status: "accepted",
    match_score: 94,
    aiAssistance: true,
  },
];

export const interviewTipsData = [
  {
    title: "Pre-Interview Preparation",
    content: [
      {
        header: "Research Tech Innovation Inc",
        pointers: [
          "Visit the [company website](#) to understand their products, mission, and values.",
          "Read recent news articles about the company to stay updated on their latest developments.",
          "Review the company's presence on social media and note their key achievements.",
        ],
      },
      {
        header: "Understand the Role of a Software Engineer",
        pointers: [
          "Carefully review the job description and required qualifications.",
          "Understand the core responsibilities and expectations for the position.",
          "Research common tools and technologies used in the role.",
        ],
      },
    ],
  },
  {
    title: "Common Interview Questions",
    content: [
      {
        header: "Practice Behavioral Questions",
        pointers: [
          "Prepare answers for common behavioral questions such as 'Tell me about yourself.'",
          "Use the STAR method (Situation, Task, Action, Result) to structure your answers.",
          "Reflect on past experiences to highlight your skills and accomplishments.",
        ],
      },
      {
        header: "Technical Questions",
        pointers: [
          "Review fundamental algorithms, data structures, and coding problems.",
          "Practice coding problems on platforms like LeetCode or HackerRank.",
          "Brush up on key programming languages relevant to the role.",
        ],
      },
    ],
  },
  {
    title: "Personal Presentation",
    content: [
      {
        header: "Dress Appropriately",
        pointers: [
          "Choose attire that aligns with the company's culture and professionalism.",
          "Ensure your clothing is clean, pressed, and fits well.",
        ],
      },
      {
        header: "Body Language and Communication",
        pointers: [
          "Maintain good posture and consistent eye contact.",
          "Speak clearly and confidently.",
          "Use a firm but friendly handshake if meeting in person.",
        ],
      },
    ],
  },
  {
    title: "During the Interview",
    content: [
      {
        header: "Be Engaged and Responsive",
        pointers: [
          "Listen carefully to questions and respond thoughtfully.",
          "Ask clarifying questions if you're unsure about something.",
          "Take a moment to think before answering complex questions.",
        ],
      },
      {
        header: "Showcase Your Skills",
        pointers: [
          "Provide specific examples from past experiences.",
          "Relate your skills to the job requirements.",
          "Demonstrate enthusiasm and interest in the role.",
        ],
      },
    ],
  },
  {
    title: "Post-Interview Follow-Up",
    content: [
      {
        header: "Send a Thank-You Note",
        pointers: [
          "Express gratitude for the opportunity to interview.",
          "Mention specific topics discussed during the interview.",
          "Reaffirm your enthusiasm for the role and the company.",
        ],
      },
      {
        header: "Reflect and Plan",
        pointers: [
          "Take notes on what went well and areas for improvement.",
          "Prepare for potential next steps, such as further interviews or assessments.",
        ],
      },
    ],
  },
  {
    title: "Offer Received",
    content: [
      {
        header: "Evaluate the Offer",
        pointers: [
          "Consider the salary, benefits, and other perks.",
          "Think about the role's alignment with your career goals.",
          "Review the company's culture and growth opportunities.",
        ],
      },
      {
        header: "Negotiate if Necessary",
        pointers: [
          "Be clear about your priorities and what matters most to you.",
          "Use market data to support your negotiation points.",
          "Stay professional and polite during the negotiation process.",
        ],
      },
    ],
  },
];

export const mockProfileData = {
  config: {
    location: true,
    role: true,
    workExperience: true,
    professionalSummary: true,
    email: true,
    phone_number: true,
    skills: true,
    links: true,
    volunteerExperience: true,
    careerHighlights: true,
    internships: true,
    education: true,
    memberships: true,
    references: true,
    certifications: true,
  },
  name: "John Doe",
  role: "Senior HR Expert | CIPD, MBA, HRBP",
  resume_id: "",
  professionalSummary: `Results-driven Senior Software Engineer with 8+ years of experience in full-stack development and technical leadership. Specialized in building scalable distributed systems and microservices architectures. Proven track record of improving application performance, mentoring junior developers, and delivering high-impact solutions that drive business growth.
  
Skilled in creating dynamic, user-friendly applications and collaborating within agile teams.
     `,
  photo_url:
    "https://images.pexels.com/photos/3778603/pexels-photo-3778603.jpeg?auto=compress&cs=tinysrgb&w=600",
  location: "San Francisco, CA",
  email: "johndoe@example.com",
  phone: "+1 (555) 123-4567",
  website: "https://johndoeportfolio.com",
  linkedin: "https://linkedin.com/in/johndoe",
  tabbioLink: "https://tabbio.com/tp/john-doe",
  locationType: ["Hybrid", "Remote", "On-Site"],
  relocation: "Open to Relocate",
  skills: [
    {
      name: "technical",
      items: ["JavaScript", "React", "Node.js", "Express", "MongoDB", "HTML"],
    },
  ],
  hobbies: ["Hiking", "Photography", "Cooking"],
  languages: ["English", "Spanish"],
  workExperience: [
    {
      id: 1,
      position: "Frontend Developer",
      company: "Tech Solutions Inc.",
      description:
        "Developed responsive web applications using React and JavaScript. Collaborated with designers to create seamless UI experiences.",
      keyAchievements: [
        "Led development of microservices architecture serving 1M+ users",
        "Improved application performance by 30% through code refactoring",
        "Mentored junior developers in best practices and coding standards",
      ],
      start_year: "2023",
      end_year: "2024",
      skills: [
        "System Architecture",
        "Cloud Infrastructure",
        "Agile/Scrum",
        "Performance Optimization",
        "API Design",
      ],
    },
    {
      id: 2,
      position: "Backend Developer",
      company: "Innovatech Corp.",
      start_year: "2019",
      end_year: "2022",
      description:
        "Built and maintained REST APIs using Node.js and Express. Improved application performance and data handling.",
      keyAchievements: [
        "Optimized database queries, reducing response time by 50%",
        "Implemented CI/CD pipelines for automated testing and deployment",
        "Collaborated with cross-functional teams to deliver project milestones",
        "Collaborated with cross-functional teams to deliver project milestones",
      ],
      skills: [
        "System Architecture",
        "Cloud Infrastructure",
        "Agile/Scrum",
        "Performance Optimization",
        "API Design",
      ],
    },
  ],
  suggestedSkills: [
    "JavaScript",
    "React",
    "Node.js",
    "Express",
    "MongoDB",
    "HTML",
    "CSS",
    "TypeScript",
    "Git",
    "Agile Methodologies",
  ],
  internships: [
    {
      id: 1,
      position: "Software Engineering Intern",
      company: "StartupX",
      description:
        "Developed responsive web applications using React and JavaScript. Collaborated with designers to create seamless UI experiences.",
      keyAchievements: [
        "Led development of microservices architecture serving 1M+ users",
        "Improved application performance by 30% through code refactoring",
        "Mentored junior developers in best practices and coding standards",
      ],
      skills: ["JavaScript", "React", "Node.js", "Express", "MongoDB"],
      start_year: "2023",
      end_year: "2024",
    },
  ],
  volunteerExperience: [
    {
      id: 1,
      position: "Tech Mentor",
      company: "Tech Solutions Inc.",
      description:
        "Mentoring underprivileged students in web development and programming fundamentals.",
      keyAchievements: [
        "Led development of microservices architecture serving 1M+ users",
        "Improved application performance by 30% through code refactoring",
        "Mentored junior developers in best practices and coding standards",
      ],
      skills: ["JavaScript", "React", "Node.js", "Express", "MongoDB"],
      start_year: "2023",
      end_year: "2024",
    },
  ],
  careerHighlights: [
    {
      id: 1,
      title: "Technical Leadership",
      description:
        "Collaborated with cross-functional teams to deliver project milestones",
      thumbnail: "",
      attachment: {
        type: "link",
        url: "https://w3schools.com",
      },
      skills: ["Team Management", "Leadership"],
    },
    {
      id: 2,
      title: "Performance Optimization",
      description: "Optimized database queries, reducing response time by 50%",
      thumbnail: "",
      attachment: {
        type: "image",
        url: "https://images.pexels.com/photos/709143/pexels-photo-709143.jpeg?auto=compress&cs=tinysrgb&w=600",
      },
      skills: [],
    },
    {
      id: 3,
      title: "Team Development",
      description:
        "Mentored 5+ Junior developers, leading to their promotion to mid-level roles",
      thumbnail: "",
      attachment: {
        type: "video",
        url: "https://videos.pexels.com/video-files/1966695/1966695-sd_640_360_30fps.mp4",
      },
      skills: [],
    },
    {
      id: 4,
      title: "Lorem Ipsum Dolor sit",
      description:
        "Mentored 5+ Junior developers, leading to their promotion to mid-level roles dolor sit amet",
      thumbnail: "",
      skills: [],
    },
  ],
  education: [
    {
      id: 1,
      degree: "Bachelor of Science in Computer Science",
      school: "University of California, Berkeley",
      description: "Graduated with Honors, GPA: 3.8/4.0",
      start_year: "2023",
      end_year: "2024",
      active: false,
    },
  ],
  certifications: [
    {
      id: 1,
      title: "AWS Certified Solutions Architecture",
      platform: "Amazon Web Services",
      date: "Jan, 2023",
    },
    {
      id: 2,
      title: "Professional Scrum Master I",
      platform: "Scrum.org",
      date: "2023",
    },
  ],
  memberships: [
    {
      id: 1,
      title: "Association for Computing lorem ipsum dolor sit amet not knowing",
      role: "Professional Member",
      start_year: "2020",
      end_year: "2021",
      active: false,
    },
    {
      id: 2,
      title: "IEE Computer Society",
      role: "Senior Member",
      start_year: "2022",
      end_year: "2023",
      active: true,
    },
  ],
  references: [
    {
      id: 1,
      name: "Michael Chen",
      role: "Senior Technical Lead",
      company: "Innovatech Corp.",
      email: "michaelchen@mail.com",
      phone: "+123673539",
      relationship: "Project Lead (2016-2019)",
    },
    {
      id: 2,
      name: "Sarah Smith",
      role: "Software Developer",
      company: "Tech Solutions Inc.",
      email: "sarahsmith@mail.co",
      phone: "+23491929334",
      relationship: "Team Lead (2020-2023)",
    },
  ],
};

export const mockEmptyProfileData = {
  config: {
    location: true,
    role: true,
    isLive: true,
    lastUpdate: true,
    workExperience: true,
    professionalSummary: true,
    email: true,
    phone: true,
    skills: true,
    links: true,
    volunteerExperience: false,
    careerHighlights: false,
    internships: false,
    education: true,
    memberships: false,
    references: false,
    trainings: false,
    certifications: true,
  },
  name: "",
  role: "",
  level: "",
  workAvailability: true,
  yearsOfExperience: "",
  majorSkill: "",
  professionalSummary: "",
  areaOfExpertise: [],
  photo_url: "",
  location: "",
  email: "",
  phone: "",
  website: "",
  linkedIn: "",
  locationType: [],
  language: "EN",
  relocation: true,
  skills: [],
  hobbies: [],
  languages: [],
  workExperience: [],
  suggestedSkills: [],
  internships: [],
  volunteerExperience: [],
  careerHighlights: [],
  education: [],
  relevantCourses: [],
  projects: [],
  certifications: [],
  memberships: [],
  references: [],
  awards: [],
  trainings: [],
  tabbioLink: ""
};

export const faqData = [
  {
    title: "How does the Free plan work?",
    content:
      "The Free plan allows you to use essential features without any cost. You can create resumes, post jobs, and track candidates with basic tools. There are no hidden fees, and you can upgrade to a premium plan anytime.",
  },
  {
    title: "Can I upgrade or downgrade at any time?",
    content:
      "Yes, you can upgrade or downgrade your plan at any time. When you change your plan, the new billing cycle will begin immediately, and your previous subscription will be adjusted accordingly.",
  },
  {
    title: "What payment methods do you accept?",
    content:
      "We accept all major credit and debit cards, including Visa, Mastercard, and American Express. For Enterprise plans, we also support bank transfers upon request.",
  },
  {
    title: "Can I switch between monthly and yearly billing?",
    content:
      "Yes, you can switch between monthly and yearly billing at any time. Yearly billing offers a discount compared to the monthly rate.",
  },
  {
    title:
      "Is there a limit on the number of team members for the Business plan?",
    content:
      "The Business plan allows multiple team members with an additional cost of $24 per team member per month.",
  },
  {
    title: "How do I contact support for the Enterprise plan?",
    content:
      "For the Enterprise plan, you can contact our sales team directly to discuss custom requirements and pricing.",
  },
  {
    title: "Do you offer a refund if I cancel my subscription?",
    content:
      "We do not offer refunds for partially used billing periods. You can cancel your subscription anytime, and you will continue to have access until the end of the current billing period.",
  },
];
