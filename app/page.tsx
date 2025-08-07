"use client";
import Link from "next/link"
import { Download, Mail, Github, Linkedin, Twitter, Instagram } from "lucide-react"

import AnimatedGradientBackground from "@/components/animated-gradient-background"
// or
// import CSSGradientBackground from "@/components/css-gradient-background"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import ContactForm from "@/components/contact-form"
import SectionHeading from "@/components/section-heading"
import ExperienceCard from "@/components/experience-card"
import ProjectCard from "@/components/project-card"
import EducationCard from "@/components/education-card"
import AnimatedSection from "@/components/animated-section"
import AnimatedText from "@/components/animated-text"
import AnimatedImage from "@/components/animated-image"
import ScrollToTop from "@/components/scroll-to-top"
import StatsSection from "@/components/stats-section"
import AnimatedCard from "@/components/animated-card"
// import ThreeDBackground from "@/components/3d-background"
import InteractiveSkillChart from "@/components/interactive-skill-chart"
import HorizontalScroller from "@/components/HorizontalScroller"
import { useState } from 'react';
import emailjs from 'emailjs-com';
import { Footer } from "react-day-picker"
import { Menu, X} from "lucide-react"


export default function Home() {
  // Skills data for the interactive chart
  const skillsData = [
    // Programming Languages
    {
      name: "JavaScript",
      level: 5,
      category: "Languages",
      description:
        "Expert in modern JavaScript including ES6+ features, async/await, and functional programming patterns.",
    },
    {
      name: "TypeScript",
      level: 5,
      category: "Languages",
      description:
        "Extensive experience with TypeScript for large-scale applications, including advanced type system features.",
    },
    {
      name: "Python",
      level: 4,
      category: "Languages",
      description: "Proficient in Python for data processing, automation, and backend development.",
    },
    {
      name: "Java",
      level: 4,
      category: "Languages",
      description: "Strong experience with Java for enterprise applications and microservices.",
    },
    // {
    //   name: "ReactJS",
    //   level: 4,
    //   category: "Languages",
    //   description: "Expert in React.js for developing responsive and component-based single-page applications with modern UI/UX.",
    // },
    {
      name: "C++",
      level: 4,
      category: "Languages",
      description: "Proficient in C++ for systems programming, data structures, and performance-critical applications.",
    },
    // {
    //   name: "SQL",
    //   level: 4,
    //   category: "Languages",
    //   description: "Advanced SQL knowledge for complex queries, optimization, and database design.",
    // },
    // {
    //   name: "MySQL",
    //   level: 4,
    //   category: "Databases",
    //   description: "Experience designing schemas, writing complex queries, and optimizing MySQL databases for web applications.",
    // },

    // Web Technologies
    {
      name: "HTML",
      level: 5,
      category: "Web",
      description: "Strong command of semantic HTML for structuring accessible and SEO-friendly web content.",
    },
    {
      name: "CSS",
      level: 5,
      category: "Web",
      description: "Proficient in styling with CSS, including Flexbox, Grid, and responsive design principles.",
    },
    {
      name: "React.js",
      level: 5,
      category: "Web",
      description: "Expert in React.js for developing responsive and component-based single-page applications with modern UI/UX.",
    },
    {
      name: "Node.js",
      level: 4,
      category: "Web",
      description: "Experienced in building scalable backend services and REST APIs using Node.js and Express.",
    },
    {
      name: "Django",
      level: 4,
      category: "Web",
      description: "Proficient in Django for building secure and maintainable web applications using the MVT framework.",
    },
    {
      name: "Flask",
      level: 3,
      category: "Web",
      description: "Hands-on experience with Flask for lightweight web APIs and microservices.",
    },
    {
      name: "REST APIs",
      level: 5,
      category: "Web",
      description: "Skilled in designing and consuming RESTful APIs for full-stack web development.",
    },
    {
      name: "SQL",
      level: 4,
      category: "Web",
      description: "Strong understanding of relational databases and SQL for querying and managing structured data.",
    },
    {
      name: "MySQL",
      level: 4,
      category: "Web",
      description: "Experience designing schemas, writing complex queries, and managing MySQL databases.",
    },
    {
      name: "MongoDB",
      level: 4,
      category: "Web",
      description: "Proficient in using MongoDB for developing document-based, scalable NoSQL applications.",
    },


    // Cloud & DevOps
    {
      name: "AWS",
      level: 4,
      category: "Cloud & DevOps",
      description: "Proficient in deploying and managing applications using core AWS services like EC2, S3, Lambda, and IAM.",
    },
    {
      name: "Google Cloud Platform (GCP)",
      level: 3,
      category: "Cloud & DevOps",
      description: "Working knowledge of GCP for hosting cloud-native applications and services.",
    },
    {
      name: "Docker",
      level: 4,
      category: "Cloud & DevOps",
      description: "Experienced in containerizing applications and managing container lifecycles using Docker.",
    },
    {
      name: "Git",
      level: 5,
      category: "Cloud & DevOps",
      description: "Expert in version control, branching strategies, and collaborative workflows using Git.",
    },
    {
      name: "Jenkins",
      level: 3,
      category: "Cloud & DevOps",
      description: "Familiar with automating build and deployment pipelines using Jenkins.",
    },
    {
      name: "Ansible",
      level: 3,
      category: "Cloud & DevOps",
      description: "Hands-on experience in configuration management and automation using Ansible playbooks.",
    },
    {
      name: "Chef",
      level: 2,
      category: "Cloud & DevOps",
      description: "Basic understanding of infrastructure as code and automation using Chef.",
    },
    {
      name: "Ansible Tower",
      level: 2,
      category: "Cloud & DevOps",
      description: "Introductory experience with Ansible Tower for managing complex automation workflows.",
    },
    {
      name: "Artifactory",
      level: 3,
      category: "Cloud & DevOps",
      description: "Experience managing and distributing binaries and artifacts using JFrog Artifactory.",
    },
    {
      name: "Harness",
      level: 2,
      category: "Cloud & DevOps",
      description: "Basic familiarity with CI/CD automation and deployment strategies using Harness.",
    },

    // Security
    {
      name: "Wireshark",
      level: 4,
      category: "Security",
      description: "Skilled in analyzing network traffic and identifying anomalies using Wireshark.",
    },
    {
      name: "Metasploit",
      level: 3,
      category: "Security",
      description: "Working knowledge of Metasploit for penetration testing and exploitation.",
    },
    {
      name: "Burp Suite",
      level: 4,
      category: "Security",
      description: "Proficient in web application security testing using Burp Suite for intercepting and manipulating traffic.",
    },
    {
      name: "Nessus",
      level: 3,
      category: "Security",
      description: "Experience in vulnerability scanning and reporting using Nessus.",
    },
    {
      name: "Nmap",
      level: 4,
      category: "Security",
      description: "Skilled in network scanning, host discovery, and port scanning using Nmap.",
    },
    {
      name: "OSINT tools",
      level: 3,
      category: "Security",
      description: "Hands-on experience with OSINT tools for reconnaissance and information gathering.",
    },
    {
      name: "SIEM (Splunk, ELK)",
      level: 4,
      category: "Security",
      description: "Familiar with log analysis and event correlation using SIEM platforms like Splunk and ELK Stack.",
    },
    {
      name: "Snort",
      level: 2,
      category: "Security",
      description: "Basic understanding of network intrusion detection using Snort.",
    },
    {
      name: "Suricata",
      level: 2,
      category: "Security",
      description: "Introductory experience in IDS/IPS using Suricata for deep packet inspection and threat detection.",
    },
    {
      name: "Network Security",
      level: 4,
      category: "Security Concepts",
      description: "Strong grasp of securing networks, protocols, and access controls.",
    },
    {
      name: "Vulnerability Assessment",
      level: 4,
      category: "Security Concepts",
      description: "Experienced in identifying and prioritizing security flaws using automated tools and manual checks.",
    },
    {
      name: "Penetration Testing",
      level: 3,
      category: "Security Concepts",
      description: "Hands-on experience conducting ethical hacking and simulating attacks to test defenses.",
    },
    {
      name: "Threat Intelligence",
      level: 3,
      category: "Security Concepts",
      description: "Skilled in gathering, analyzing, and applying cyber threat intel to improve security posture.",
    },
    {
      name: "OWASP Top 10",
      level: 4,
      category: "Security Concepts",
      description: "Well-versed in identifying and mitigating common web application security risks.",
    },
    {
      name: "Secure Coding Practices",
      level: 4,
      category: "Security Concepts",
      description: "Adherence to secure development practices to prevent vulnerabilities at code level.",
    },
    {
      name: "Incident Response",
      level: 3,
      category: "Security Concepts",
      description: "Experience assisting in analyzing, containing, and mitigating security incidents.",
    },
    {
      name: "Risk Assessment",
      level: 3,
      category: "Security Concepts",
      description: "Familiar with assessing and prioritizing information security risks in an enterprise environment.",
    },
    {
      name: "IAM",
      level: 3,
      category: "Security Concepts",
      description: "Working knowledge of Identity and Access Management to control user access and enforce policies.",
    },

    // AI & Machine Learning
    {
      name: "NumPy",
      level: 4,
      category: "AI",
      description: "Skilled in numerical operations and array manipulation using NumPy.",
    },
    {
      name: "Pandas",
      level: 4,
      category: "AI",
      description: "Proficient in data manipulation, wrangling, and analysis using Pandas.",
    },
    {
      name: "Matplotlib",
      level: 4,
      category: "AI",
      description: "Experienced in creating static visualizations and plots for data analysis.",
    },
    {
      name: "Seaborn",
      level: 4,
      category: "AI",
      description: "Capable of building statistical visualizations and heatmaps with Seaborn.",
    },
    {
      name: "Plotly",
      level: 3,
      category: "AI",
      description: "Experience with interactive visualizations using Plotly for dashboards and web apps.",
    },
    {
      name: "OpenCV",
      level: 3,
      category: "AI",
      description: "Hands-on experience in image processing and computer vision tasks with OpenCV.",
    },
    {
      name: "NLTK",
      level: 3,
      category: "AI",
      description: "Familiar with text preprocessing and NLP tasks using NLTK.",
    },
    {
      name: "TensorFlow",
      level: 3,
      category: "AI",
      description: "Experience building and training deep learning models with TensorFlow.",
    },
    {
      name: "Keras",
      level: 3,
      category: "AI",
      description: "Skilled in prototyping neural networks and machine learning workflows using Keras.",
    },

    // Leadership 
    {
      name: "Team Leadership",
      level: 5,
      category: "Leadership",
      description: "Proven track record leading engineering teams to deliver complex projects.",
    },
    {
      name: "System Design",
      level: 5,
      category: "Leadership",
      description: "Expert in designing scalable, maintainable software architectures.",
    },
    {
      name: "Technical Writing",
      level: 4,
      category: "Leadership",
      description: "Strong ability to create clear technical documentation and specifications.",
    },
    {
      name: "Mentoring",
      level: 5,
      category: "Leadership",
      description: "Passionate about mentoring junior developers and helping teams grow.",
    },
    {
      name: "Project Management",
      level: 4,
      category: "Leadership",
      description: "Experience managing complex technical projects and roadmaps.",
    },
    {
      name: "Public Speaking",
      level: 4,
      category: "Leadership",
      description: "Comfortable presenting technical topics to both technical and non-technical audiences.",
    },

    // Soft Skills
    {
      name: "Problem-solving",
      level: 5,
      category: "Soft Skills",
      description: "Strong ability to analyze complex issues and develop effective solutions independently or collaboratively.",
    },
    {
      name: "Critical thinking",
      level: 4,
      category: "Soft Skills",
      description: "Able to evaluate information objectively and make reasoned judgments and decisions.",
    },
    {
      name: "Team collaboration",
      level: 5,
      category: "Soft Skills",
      description: "Experienced in working with cross-functional teams to meet common goals and deliver results.",
    },
    {
      name: "Communication",
      level: 5,
      category: "Soft Skills",
      description: "Clear and concise communicator, adept in both written and verbal exchanges across stakeholders.",
    },
    {
      name: "Adaptability",
      level: 4,
      category: "Soft Skills",
      description: "Comfortable adjusting to changing environments, technologies, and priorities.",
    },
    {
      name: "Time management",
      level: 4,
      category: "Soft Skills",
      description: "Efficient in prioritizing tasks and managing deadlines to maximize productivity.",
    },
    {
      name: "Leadership",
      level: 5,
      category: "Soft Skills",
      description: "Capable of leading teams, organizing events, and motivating peers through direction and influence.",
    },
    {
      name: "Attention to detail",
      level: 5,
      category: "Soft Skills",
      description: "Thorough and meticulous, ensuring high-quality outcomes with minimal errors.",
    },
    {
      name: "Creativity",
      level: 4,
      category: "Soft Skills",
      description: "Innovative thinker who brings fresh perspectives and solutions to projects and challenges.",
    },
    {
      name: "Accountability",
      level: 5,
      category: "Soft Skills",
      description: "Takes full ownership of responsibilities and follows through on commitments.",
    },
    {
      name: "Conflict resolution",
      level: 4,
      category: "Soft Skills",
      description: "Skilled in managing and resolving interpersonal conflicts professionally and constructively.",
    },
    {
      name: "Decision-making",
      level: 5,
      category: "Soft Skills",
      description: "Comfortable making informed, timely decisions under pressure and uncertainty.",
    },
    {
      name: "Multitasking",
      level: 4,
      category: "Soft Skills",
      description: "Capable of handling multiple tasks simultaneously without sacrificing quality or focus.",
    },
    {
      name: "Empathy",
      level: 4,
      category: "Soft Skills",
      description: "Sensitive to others' needs and perspectives, fostering strong interpersonal relationships.",
    },
    {
      name: "Work ethic",
      level: 5,
      category: "Soft Skills",
      description: "Highly dedicated, self-motivated, and committed to consistently delivering high performance.",
    },
  ]

  const skillCategories = ["Languages", "Web", "Cloud & DevOps", "Security", "AI", "Leadership", "Soft Skills"]

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }


  return (
    <main className="min-h-screen bg-background">
      {/* <AnimatedGradientBackground /> */}
      <div className="relative overflow-hidden">
        <AnimatedGradientBackground />

      </div>

    
      {/* Header/Navigation */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="portfolio-container flex h-16 items-center justify-between px-4">
          <div className="font-bold text-xl">Disha Phatta</div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-6">
            <Link href="#about" className="group">
              <span className="nav-link">About</span>
            </Link>
            <Link href="#experience" className="group">
              <span className="nav-link">Experience</span>
            </Link>
            <Link href="#projects" className="group">
              <span className="nav-link">Projects</span>
            </Link>
            <Link href="#education" className="group">
              <span className="nav-link">Education</span>
            </Link>
            <Link href="#skills" className="group">
              <span className="nav-link">Skills</span>
            </Link>
            <Link href="#contact" className="group">
              <span className="nav-link">Contact</span>
            </Link>
          </nav>


          {/* Desktop Contact Button */}
          <Button
            variant="outline"
            size="sm"
            className="hidden md:flex bg-transparent hover:bg-primary hover:text-white transition-all duration-300"
          >
            <Link href="#contact" className="flex items-center">
              <Mail className="mr-2 h-4 w-4" /> Contact Me
            </Link>
          </Button>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-muted-foreground hover:text-foreground transition-colors"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t px-4 pb-4 flex flex-col gap-3">
            <Link href="#about" className="nav-link-mobile">About</Link>
            <Link href="#experience" className="nav-link-mobile">Experience</Link>
            <Link href="#projects" className="nav-link-mobile">Projects</Link>
            <Link href="#education" className="nav-link-mobile">Education</Link>
            <Link href="#skills" className="nav-link-mobile">Skills</Link>
            <Link href="#contact" className="nav-link-mobile">Contact</Link>
            <Button
              variant="outline"
              size="sm"
              className="w-full hover:bg-primary hover:text-white transition-all duration-300"
            >
              <Link href="#contact" className="flex items-center justify-center w-full">
                <Mail className="mr-2 h-4 w-4" /> Contact Me
              </Link>
            </Button>
          </div>
        )}
      </header>


      {/* Hero Section with About Me */}
      <section id="about" className="portfolio-section py-24 md:py-32">
        <div className="portfolio-container space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <AnimatedSection>
              <div className="space-y-6">
                <AnimatedText text="Hi, I'm Disha Phatta" className="hero-text font-bold tracking-tighter" />
                <p className="body-text text-muted-foreground max-w-2xl">
                  Skilled IT and Cybersecurity Analyst with years of experience building enterprise-scale applications and
                  leading high-performing engineering teams.
                </p>
                <div className="flex flex-wrap gap-3 pt-4">
                  <Button asChild className="transition-all duration-300 hover:scale-105">
                    <Link href="/resume.pdf" download>
                      <Download className="mr-2 h-4 w-4" /> Download CV
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="transition-all duration-300 hover:scale-105 hover:bg-primary/10 bg-transparent"
                  >
                    <Link href="#contact" className="flex items-center">
                      <Mail className="mr-2 h-4 w-4" /> Contact Me
                    </Link>
                  </Button>
                </div>
                <div className="flex gap-4 pt-4">
                  <Link
                    href="https://github.com/dishaphatta"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-transform duration-300 hover:scale-110"
                  >
                    <Github className="h-6 w-6 text-muted-foreground hover:text-foreground transition-colors" />
                  </Link>
                  <Link
                    href="www.linkedin.com/in/disha-phatta-390003228"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-transform duration-300 hover:scale-110"
                  >
                    <Linkedin className="h-6 w-6 text-muted-foreground hover:text-foreground transition-colors" />
                  </Link>
                  <Link
                    href="https://www.instagram.com/dishaphatta_/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-transform duration-300 hover:scale-110"
                  >
                    <Instagram className="h-6 w-6 text-muted-foreground hover:text-foreground transition-colors" />
                  </Link>
                </div>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={3}>
              <div className="flex justify-center lg:justify-end">
                <div className="relative w-[280px] h-[280px] md:w-[320px] md:h-[320px] lg:w-[360px] lg:h-[360px] rounded-full overflow-hidden border-4 border-primary/20 shadow-xl transition-transform duration-500 hover:scale-105">
                  <AnimatedImage
                    src="/profile.jpg?height=360&width=360"
                    alt="Disha Phatta"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="bg-muted/50 py-16 md:py-20">
        <div className="portfolio-section">
          <div className="portfolio-content">
            <SectionHeading
              title="Introduction"
              description="A brief overview of my professional journey and philosophy"
            />
            <AnimatedSection>
              <div className="portfolio-text">
                <p className="body-text mb-6">
                  With years of experience in the IT industry, I've dedicated my career to building scalable, maintainable software solutions that solve real business problems. I specialize in designing secure IT infrastructures, developing robust software solutions, and leading cross-functional teams through complex technical challenges.
                </p>
                <p className="body-text">
                  My approach combines technical excellence with pragmatic decision-making. I believe in choosing the right tool for the job, writing clean, testable code, and fostering a culture of continuous learning and improvement. Throughout my career, I've helped organizations strengthen their cybersecurity defenses, streamline secure software delivery with automated pipelines, and implement resilient, scalable IT infrastructures.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <StatsSection />

      {/* Work Experience */}
      <section id="experience" className="portfolio-section py-24 md:py-32">
        <div className="portfolio-container space-y-8">
          <SectionHeading title="Work Experience" description="My professional journey through the years" />

          <Tabs defaultValue="professional" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto md:grid-cols-2">
              <TabsTrigger
                value="professional"
                className="transition-all duration-300 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Professional
              </TabsTrigger>
              <TabsTrigger
                value="nonprofessional"
                className="transition-all duration-300 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Non-Professional
              </TabsTrigger>
            </TabsList>

            <TabsContent value="professional" className="mt-8">
              <div className="space-y-8 max-w-5xl mx-auto">
                <ExperienceCard
                  title="Graduate Student Assistant"
                  company="Stevens Institute of Technology"
                  period="2025 - Present"
                  description="Supported administrative and academic functions to facilitate smooth university operations and student services."
                  achievements={[
                    "Assisted faculty with research tasks, data entry, and documentation.",
                    "Managed front desk operations, responding to student inquiries and directing them to resources.",
                    "Organized academic materials and maintained accurate departmental records.",
                    "Coordinated schedules, meetings, and events to support departmental activities.",
                  ]}
                  index={3}
                />
                {/* <ExperienceCard
                  title="Cybersecurity Intern"
                  company="Drona Pay Private Limited"
                  period="Feb 2024 - Jul 2024"
                  description="Managed and enhanced organizational cybersecurity operations, performing threat analysis, penetration testing, staff training, and remote access solutions to strengthen overall IT security posture."
                  achievements={[
                    "Conducted weekly security operations handling phishing alerts, SOC events, and 40+ other security incidents.",
                    "Performed technical evaluations and penetration tests on 30+ commercial web and mobile applications.",
                    "Developed and implemented a monthly IT security education program for 50+ staff members.",
                    "Created a virtual desktop infrastructure enabling 2400+ users to securely access applications remotely via the cloud.",
                  ]}
                  index={0}
                />

                <ExperienceCard
                  title="Software Developer"
                  company="Welpo India Private Limited"
                  period="Apr 2023 - Jan 2024"
                  description="Full-stack developer for client-facing web applications. Worked across the entire stack from database design to frontend implementation."
                  achievements={[
                    "Developed custom CMS platform used by 50+ enterprise clients.",
                    "Implemented responsive design principles, improving mobile user engagement by 45%.",
                    "Optimized database queries, reducing page load times by 30%.",
                    "Integrated third-party APIs for payment processing and analytics.",
                  ]}
                  index={1}
                /> */}
              </div>
            </TabsContent>

            <TabsContent value="nonprofessional" className="mt-8">
              <div className="space-y-8 max-w-5xl mx-auto">
                <ExperienceCard
                  title="Food Service Worker"
                  company="Stevens Institute of Technology"
                  period="2025 - Present"
                  description="Provided quality food service in a fast-paced environment while ensuring hygiene, safety, and customer satisfaction."
                  achievements={[
                    "Assisted in preparing and serving meals for 200+ customers daily.",
                    "Maintained strict food safety and sanitation standards in compliance with regulations.",
                    "Managed inventory, restocking, and supply checks to prevent shortages.",
                    "Delivered prompt, friendly service, improving customer satisfaction scores.",
                  ]}
                  index={2}
                />

                <ExperienceCard
                  title="Event Manager - Student Council"
                  company="A. P. Shah Institute of Technology"
                  period="2023 - 2024"
                  description="Planned, organized, and executed large-scale events, ensuring seamless coordination between teams, vendors, and stakeholders."
                  achievements={[
                    "Successfully managed logistics for multiple campus-wide events with 500+ attendees.",
                    "Led a team of volunteers to deliver high-quality event experiences on time and within budget.",
                    "Negotiated with vendors and service providers to reduce event costs by up to 20%.",
                    "Implemented feedback systems to improve event quality and attendee engagement.",
                  ]}
                  index={2}
                />

                <ExperienceCard
                  title="General Secretary - Student Council"
                  company="A. P. Shah Institute of Technology"
                  period="2022 - 2023"
                  description="Oversaw administrative operations, coordinated between departments, and facilitated smooth communication within the student council."
                  achievements={[
                    "Streamlined documentation and communication processes across multiple committees.",
                    "Managed scheduling, meeting agendas, and official correspondence for council activities.",
                    "Coordinated inter-departmental initiatives, improving collaboration and project outcomes.",
                    "Represented the council in official meetings and maintained relations with external partners.",
                  ]}
                  index={3}
                />

                <ExperienceCard
                  title="Ladies Representative - Student Council"
                  company="A. P. Shah Institute of Technology"
                  period="2021 - 2022"
                  description="Advocated for female students’ interests, fostering inclusion, and initiating programs to promote equal opportunities."
                  achievements={[
                    "Organized awareness sessions and workshops on women’s safety and career development.",
                    "Created platforms for female students to share concerns and suggestions with the administration.",
                    "Coordinated participation of female students in academic and extracurricular events.",
                    "Played a key role in implementing campus policies that addressed gender-related concerns.",
                  ]}
                  index={4}
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>


      {/* Projects */}
      <section id="projects" className="bg-muted/50 py-24 md:py-32">
        <div className="portfolio-section">
          <div className="portfolio-container space-y-8">
            <SectionHeading title="Projects" description="Highlights from my professional portfolio" />

            <Tabs defaultValue="featured" className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto md:grid-cols-3">
                <TabsTrigger
                  value="featured"
                  className="transition-all duration-300 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  Featured
                </TabsTrigger>
                <TabsTrigger
                  value="enterprise"
                  className="transition-all duration-300 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  Security
                </TabsTrigger>
                <TabsTrigger
                  value="opensource"
                  className="transition-all duration-300 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  WebTech
                </TabsTrigger>
              </TabsList>
              <TabsContent value="featured" className="mt-8">
                <HorizontalScroller className="max-w-6xl mx-auto">
                  <ProjectCard
                    title="Web-Sculptor"
                    description="Web-Sculptor is an AI-powered framework for creating 3D-animated web interfaces, using HTML, CSS, JS, and AI templates to speed up design and ReactJS development."
                    tags={["ReactJS", "JavaScript", "Vue", "SCSS", "TypeScript"]}
                    imageUrl="/websculpt.png?height=200&width=400"
                    githubLink="https://github.com/dishaphatta/web-sculptor"
                    index={0}
                  />
                  <ProjectCard
                    title="SentinelX"
                    description="SentinelX is a Blue Team tool that monitors devices, detects threats, deploys honeypots, and automates responses using open-source intelligence and behavioral profiling."
                    tags={["Tkinter", "AbuseIPDB API", "psutil", "getpass", "netsh", "csv", "Python"]}
                    imageUrl="/senx.jpg?height=200&width=400"
                    githubLink="https://github.com/dishaphatta/sentinelx"
                    index={1}
                  />
                  <ProjectCard
                    title="Mini Search Engine"
                    description="Mini Search Engine is a Python-based keyword search tool that efficiently indexes HTML files with an inverted index, removes stopwords, and ranks search results by term frequency."
                    tags={["Python", "BeautifulSoup", "regex", "defaultdict", "HTML parsing"]}
                    imageUrl="/minieng.jpg?height=200&width=400"
                    githubLink="https://github.com/dishaphatta/Mini_Search_Engine"
                    index={2}
                  />
                  {/* <ProjectCard
                    title="Mini Search Engine"
                    description="Mini Search Engine is a Python-based keyword search tool that efficiently indexes HTML files with an inverted index, removes stopwords, and ranks search results by term frequency."
                    tags={["Python", "BeautifulSoup", "regex", "defaultdict", "HTML parsing"]}
                    imageUrl="/placeholder.svg?height=200&width=400"
                    index={2}
                  /> */}
                </HorizontalScroller>
              </TabsContent>
              <TabsContent value="enterprise" className="mt-8">
                <HorizontalScroller className="max-w-6xl mx-auto">
                  <ProjectCard
                    title="Keylogger"
                    description="Python based Keylogger is a lightweight background tool that silently captures and logs keyboard input to a file using pynput, efficiently handling both character and special key presses."
                    tags={["Python", "pynput", "file I/O", "keyboard event handling"]}
                    imageUrl="/keylogger.gif?height=200&width=400"
                    githubLink="https://github.com/dishaphatta/Keylogger-Project"
                    index={0}
                  />
                  <ProjectCard
                    title="Visual Packet Tracer"
                    description="Visual-Packet-Tracer is a Python tool that maps Wireshark-captured network traffic to geographic locations and generates KML files for Google Maps visualization."
                    tags={["Python", "Wireshark", "KML", "GeoLiteCity database", "Google Maps"]}
                    imageUrl="/visualpacket.png?height=200&width=400"
                    githubLink="https://github.com/dishaphatta/Visual-Packet-Tracer"
                    index={1}
                  />
                  <ProjectCard
                    title="Secure File"
                    description="Python File Encryptor is a command-line tool that securely encrypts and decrypts files using cryptographic keys to protect sensitive data."
                    tags={["Typescript", "ReactJS", "Python", "cryptography library", "command-line interface (CLI)"]}
                    imageUrl="/secfile.png?height=200&width=400"
                    githubLink="https://github.com/dishaphatta/Python-File-Encryptor"
                    index={2}
                  />
                </HorizontalScroller>
              </TabsContent>
              <TabsContent value="opensource" className="mt-8">
                <HorizontalScroller className="max-w-6xl mx-auto">
                  <ProjectCard
                    title="Flight Price Predictor"
                    description="This project predicts future flight prices to help airlines optimize pricing and provide travelers with accurate fare information."
                    tags={["ReactJS", "Flask", "HTML", "CSS"]}
                    imageUrl="/flightprice.png?height=200&width=400"
                    githubLink="https://github.com/dishaphatta/Airline"
                    index={0}
                  />
                  <ProjectCard
                    title="Vigorous Vehicles"
                    description="Vigorously Vehicles is a user-friendly car rental platform offering flexible rentals with MySQL-backed management."
                    tags={["React", "Node.js", "MySQL", "Express", "JavaScript", "REST APIs", "CSS"]}
                    imageUrl="/vigor.jpg?height=200&width=400"
                    githubLink="https://github.com/dishaphatta/VigorousVehicles"
                    index={1}
                  />
                  {/* <ProjectCard
                    title="React Component Library"
                    description="Maintainer of accessibility-focused React component library used by 200+ projects."
                    tags={["React", "Accessibility", "UI/UX", "Storybook"]}
                    imageUrl="/placeholder.svg?height=200&width=400"
                    index={2}
                  /> */}
                </HorizontalScroller>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Education */}
      <section id="education" className="portfolio-section py-24 md:py-32">
        <div className="portfolio-container space-y-8">
          <SectionHeading title="Education" description="My academic background and certifications" />

          <div className="space-y-6 max-w-5xl mx-auto">
            <EducationCard
              degree="Master of Science in Cybersecurity"
              institution="Stevens Institute of Technology"
              period="2024 - 2026"
              description="Specialized in Cybersecurity and Secure Systems. Thesis on advanced threat detection and mitigation strategies."
              index={0}
            />

            <EducationCard
              degree="Bachelor of Engineering in Information Technology"
              institution="A. P. Institute of Technology"
              period="2020 - 2024"
              description="Graduated with honors. Focus on software engineering and computer architecture."
              index={1}
            />

            <AnimatedSection delay={4}>
              <div className="pt-8">
                <h3 className="text-xl font-semibold mb-4">Certifications & Professional Development</h3>
                <div className="grid gap-4 md:grid-cols-2 max-w-4xl mx-auto">
                  {[
                    {
                      title: "AICTE Virtual Internship Certificate",
                      platform: "All India Council for Technical Education",
                      year: "2024",
                      link: "/certificates/AICTE_Virtual_Internship.pdf"
                    },
                    {
                      title: "Google Cybersecurity Certificate",
                      platform: "Google",
                      year: "2024",
                      link: "/certificates/Google_Cybersecurity.pdf"
                    },
                    {
                      title: "IoT Blockchain Network for a Supply Chain",
                      platform: "IBM Cognitive Class",
                      year: "2024",
                      link: "/certificates/IBM_IoT_Blockchain.pdf"
                    },
                    {
                      title: "Build Your Own Chatbot",
                      platform: "IBM Cognitive Class",
                      year: "2023",
                      link: "/certificates/IBM_Chatbot.pdf"
                    },
                    {
                      title: "Cybersecurity Essentials",
                      platform: "Cisco",
                      year: "2022",
                      link: "/certificates/Cisco_Cybersecurity_Essentials.pdf"
                    },
                    {
                      title: "Data Analysis with Python",
                      platform: "IBM Cognitive Class",
                      year: "2023",
                      link: "/certificates/IBM_Data_Analysis_Python.pdf"
                    },
                    {
                      title: "Docker Essentials",
                      platform: "IBM Cognitive Class",
                      year: "2022",
                      link: "/certificates/IBM_Docker_Essentials.pdf"
                    },
                    {
                      title: "Introduction to Cybersecurity",
                      platform: "Cisco",
                      year: "2022",
                      link: "/certificates/Cisco_Intro_to_Cybersecurity.pdf"
                    },
                    {
                      title: "IoT Fundamentals - Big Data & Analytics",
                      platform: "Cisco",
                      year: "2023",
                      link: "/certificates/Cisco_IoT_BigData_Analytics.pdf"
                    },
                    {
                      title: "Programming Essentials in C",
                      platform: "Cisco",
                      year: "2021",
                      link: "/certificates/Cisco_Programming_C.pdf"
                    },
                    {
                      title: "NDG Linux Essentials",
                      platform: "Cisco",
                      year: "2022",
                      link: "/certificates/Cisco_Linux_Essentials.pdf"
                    },
                    {
                      title: "NDG Linux Unhatched",
                      platform: "Cisco",
                      year: "2021",
                      link: "/certificates/Cisco_Linux_Unhatched.pdf"
                    },
                    {
                      title: "Programming Essentials in Python",
                      platform: "Cisco",
                      year: "2022",
                      link: "/certificates/Cisco_Programming_Python.pdf"
                    },
                    {
                      title: "Python for Data Science",
                      platform: "IBM Cognitive Class",
                      year: "2023",
                      link: "/certificates/IBM_Python_DataScience.pdf"
                    }
                  ].map((cert, index) => (
                    <AnimatedCard key={index} index={index}>
                      <Card className="border-none shadow-sm hover:shadow-md transition-all duration-300 hover:border-primary/20">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <a
                                href={cert.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-medium text-primary hover:underline"
                              >
                                {cert.title}
                              </a>
                              <p className="text-sm text-muted-foreground">{cert.platform}</p>
                            </div>
                            <Badge>{cert.year}</Badge>
                          </div>
                        </CardContent>
                      </Card>
                    </AnimatedCard>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={4}>
              <div className="pt-8">
                <h3 className="text-xl font-semibold mb-4">Publications</h3>
                <div className="grid gap-4 md:grid-cols-1 max-w-4xl mx-auto">
                  <AnimatedCard index={0}>
                    <Card className="border-none shadow-sm hover:shadow-md transition-all duration-300 hover:border-primary/20">
                      <CardContent className="p-4">
                        <div className="flex flex-col space-y-3">
                          <div className="flex justify-between items-start">
                            <h4 className="font-medium flex-1 pr-2">
                              <a
                                href="https://ieeexplore.ieee.org/document/10486537"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary hover:underline"
                              >
                                Web Sculptor - Generative AI Based Comprehensive Web Development Framework
                              </a>
                            </h4>
                            <Badge>IEEE Xplore</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Authors: Disha Phatta; Snehi Ratani; Dhananjay Phalke; Nihaal Varun; Anagha Aher
                          </p>
                          <p className="text-sm">
                            WebSculptor is a drag-and-drop web development platform that simplifies creating 3D-animated interfaces. Built with HTML, CSS, JavaScript, and MariaDB, it boosts productivity through HTML-to-JSX conversion and AI-driven, personalized template suggestions.
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </AnimatedCard>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div >
      </section >

      {/* Skills */}
      <footer id="skills" className="bg-muted/50 py-24 md:py-32" >
        <div className="portfolio-section">
          <div className="portfolio-container space-y-8">
            <SectionHeading title="Skills & Expertise" description="Technologies and methodologies I specialize in" />

            <AnimatedSection>
              <div className="max-w-6xl mx-auto">
                <InteractiveSkillChart skills={skillsData} categories={skillCategories} />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </footer>

      {/* Contact */}
      <section id="contact" className="portfolio-section py-24 md:py-32" >
        <div className="portfolio-container">
          <SectionHeading title="Contact Me" description="Interested in working together? Get in touch." />

          <div className="grid gap-12 lg:grid-cols-2 max-w-5xl mx-auto">
            <AnimatedSection>
              <div className="space-y-6">
                <h3 className="text-xl font-semibold">Let's Connect</h3>
                <p className="body-text text-muted-foreground">
                  I'm always open to discussing new projects, opportunities, or partnerships.
                </p>

                <div className="space-y-4">
                  <div className="space-y-4">
                    <a
                      href="mailto:dishaphatta08@gmail.com"
                      className="flex items-center gap-3 group transition-all duration-300 hover:translate-x-1"
                    >
                      <Mail className="h-5 w-5 text-primary group-hover:scale-110 transition-transform duration-300" />
                      <span className="underline-offset-2 hover:underline">dishaphatta08@gmail.com</span>
                    </a>
                  </div>

                  <div className="flex items-center gap-3 group transition-all duration-300 hover:translate-x-1">
                    <Linkedin className="h-5 w-5 text-primary group-hover:scale-110 transition-transform duration-300" />
                    <Link href="www.linkedin.com/in/disha-phatta-390003228" className="hover:underline">
                      linkedin.com/in/disha-phatta-390003228
                    </Link>
                  </div>
                  <div className="flex items-center gap-3 group transition-all duration-300 hover:translate-x-1">
                    <Github className="h-5 w-5 text-primary group-hover:scale-110 transition-transform duration-300" />
                    <Link href="https://github.com/dishaphatta" className="hover:underline">
                      github.com/dishaphatta
                    </Link>
                  </div>
                </div>
              </div>
            </AnimatedSection>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8" >
        <div className="portfolio-container flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground">© {new Date().getFullYear()} Disha Phatta. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link
              href="https://github.com/dishaphatta"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform duration-300 hover:scale-110"
            >
              <Github className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
            </Link>
            <Link
              href="www.linkedin.com/in/disha-phatta-390003228"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform duration-300 hover:scale-110"
            >
              <Linkedin className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
            </Link>
            <Link
              href="https://www.instagram.com/dishaphatta_/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform duration-300 hover:scale-110"
            >
              <Instagram className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
            </Link>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      < ScrollToTop />
    </main >
  )
}
