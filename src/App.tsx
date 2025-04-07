import React from 'react';
import { Github, Mail, Linkedin, ExternalLink, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

interface Project {
  title: string;
  description: string;
  tech: string[];
  link?: string;
  github?: string;
}

const projects: Project[] = [
  {
    title: "Bartalogistics",
    description: "A Next.js project bootstrapped with create-next-app for logistics management.",
    tech: ["Next.js", "JavaScript"],
    link: "https://bartalogistics.vercel.app",
    github: "https://github.com/danieltanurhan/bartalogistics"
  },
  {
    title: "PokerBolt",
    description: "A real-time multiplayer Texas Hold'em poker application with a Node.js/Express backend and Next.js frontend.",
    tech: ["Next.js", "Node.js", "Express.js", "MongoDB", "Socket.IO", "TypeScript"],
    link: "N/A",
    github: "https://github.com/danieltanurhan/pokerbolt"
  },
  {
    title: "Res-Frontend",
    description: "A frontend application built with TypeScript.",
    tech: ["TypeScript"],
    link: "https://res-frontend-two.vercel.app",
    github: "https://github.com/danieltanurhan/res-frontend"
  },
  // Add your real projects here
];

interface TechCategory {
  name: string;
  skills: string[];
}

const techStack: TechCategory[] = [
  {
    name: "Frontend",
    skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Redux", "HTML5/CSS3", "React Native", "Expo"]
  },
  {
    name: "Backend",
    skills: ["Node.js", "Express", "Python", "RESTful APIs", "GraphQL", "Java", "Socket.IO"]
  },
  {
    name: "Database",
    skills: ["PostgreSQL", "MongoDB", "Redis", "MySQL"]
  },
  {
    name: "DevOps & Tools",
    skills: ["Git", "Docker", "AWS", "CI/CD", "Linux", "Webpack"]
  },
  {
    name: "Mobile",
    skills: ["React Native", "Expo"]
  },
  {
    name: "Game Development",
    skills: ["Java", "Swing"]
  }
];

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  const sections = ["home", "about", "tech", "projects", "contact"];

  // Track scroll position for navigation effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Navigation */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrollPosition > 100 ? 'bg-black text-white shadow-lg py-3' : 'bg-transparent py-5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <a href="#home" className="text-xl font-bold">DTD</a>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white focus:outline-none"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {sections.map((section) => (
                <a 
                  key={section} 
                  href={`#${section}`} 
                  className="capitalize hover:text-gray-400 transition-colors"
                >
                  {section}
                </a>
              ))}
            </div>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden fixed inset-0 bg-black bg-opacity-95 z-40 flex flex-col items-center justify-center space-y-8">
            <button 
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-5 right-5 text-white"
            >
              <X size={24} />
            </button>
            {sections.map((section) => (
              <a 
                key={section} 
                href={`#${section}`} 
                className="text-white text-2xl capitalize hover:text-gray-400 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {section}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <header id="home" className="min-h-screen px-4 py-16 md:py-32 bg-black text-white flex items-center">
        <div className="max-w-7xl mx-auto w-full">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 animate-fade-in">DANIEL THE DEVELOPER.</h1>
          <h2 className="text-xl md:text-2xl font-mono mb-8 animate-fade-in-delay">FULLSTACK DEV BASED IN LIVERPOOL</h2>
          <div className="flex gap-4 animate-fade-in-delay-2">
            <a href="mailto:danieltanurhan@gmail.com" className="hover:text-gray-400 transition-colors p-2">
              <Mail size={24} />
            </a>
            <a href="https://github.com/danieltanurhan" className="hover:text-gray-400 transition-colors p-2">
              <Github size={24} />
            </a>
            <a href="https://linkedin.com/in/danieltanurhan" className="hover:text-gray-400 transition-colors p-2">
              <Linkedin size={24} />
            </a>
          </div>
        </div>
      </header>

      {/* About Section */}
      <section id="about" className="px-4 py-16 md:py-24 border-b-2 border-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">ABOUT ME</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <p className="text-lg md:text-xl leading-relaxed mb-6">
                Full-stack developer with 5+ years of experience building scalable web applications.
                Proficient in React, TypeScript, Node.js, and modern web technologies.
                Looking for new opportunities to create impactful solutions.
              </p>
              <p className="text-lg md:text-xl leading-relaxed">
                I'm passionate about creating elegant, efficient code and designing intuitive user experiences.
                My approach combines technical excellence with creative problem-solving to build applications
                that not only function flawlessly but also delight users.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section id="tech" className="px-4 py-16 md:py-24 bg-black text-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">TECH STACK</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {techStack.map((category, index) => (
              <div key={index} className="group">
                <h3 className="text-xl md:text-2xl font-bold mb-4 group-hover:text-gray-300 transition-colors">{category.name}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <span 
                      key={skillIndex} 
                      className="px-3 py-1 border border-white text-sm hover:bg-white hover:text-black transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="px-4 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">PROJECTS</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {projects.map((project, index) => (
              <div 
                key={index} 
                className="border-2 border-black p-6 md:p-8 hover:bg-black hover:text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl md:text-2xl font-bold">{project.title}</h3>
                  <div className="flex gap-2">
                    {project.github && (
                      <a href={project.github} className="hover:opacity-70 transition-opacity p-1" target="_blank" rel="noopener noreferrer">
                        <Github size={20} />
                      </a>
                    )}
                    {project.link && (
                      <a href={project.link} className="hover:opacity-70 transition-opacity p-1" target="_blank" rel="noopener noreferrer">
                        <ExternalLink size={20} />
                      </a>
                    )}
                  </div>
                </div>
                <p className="mb-4 text-sm md:text-base">{project.description}</p>
                <div className="flex gap-2 flex-wrap mt-auto">
                  {project.tech.map((tech, techIndex) => (
                    <span key={techIndex} className="px-2 py-1 border border-current text-xs">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="px-4 py-16 md:py-24 bg-black text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-8">GET IN TOUCH</h2>
              <p className="text-lg mb-8">
                I'm currently available for freelance work and full-time positions.
                If you have a project that needs some creative coding or if you're 
                looking to hire, feel free to reach out.
              </p>
              <div className="space-y-4">
                <a href="mailto:danieltanurhan@gmail.com" className="flex items-center gap-3 hover:text-gray-400 transition-colors">
                  <Mail size={20} />
                  <span>danieltanurhan@gmail.com</span>
                </a>
                <a href="https://github.com/danieltanurhan" className="flex items-center gap-3 hover:text-gray-400 transition-colors">
                  <Github size={20} />
                  <span>github.com/danieltanurhan</span>
                </a>
                <a href="https://linkedin.com/in/danieltanurhan" className="flex items-center gap-3 hover:text-gray-400 transition-colors">
                  <Linkedin size={20} />
                  <span>linkedin.com/in/danieltanurhan</span>
                </a>
              </div>
            </div>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  className="w-full px-4 py-3 bg-transparent border-2 border-white focus:outline-none"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full px-4 py-3 bg-transparent border-2 border-white focus:outline-none"
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                <textarea 
                  id="message" 
                  rows={5} 
                  className="w-full px-4 py-3 bg-transparent border-2 border-white focus:outline-none"
                  placeholder="Your message..."
                />
              </div>
              <button 
                type="submit" 
                className="px-8 py-3 border-2 border-white hover:bg-white hover:text-black transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-12 bg-black text-white border-t border-gray-800">
        <div className="max-w-7xl mx-auto text-center">
          <p className="mb-4">© {new Date().getFullYear()} Daniel The Developer. All rights reserved.</p>
          <div className="flex justify-center gap-4">
            <a href="mailto:your.email@example.com" className="hover:text-gray-400 transition-colors">
              <Mail size={20} />
            </a>
            <a href="https://github.com/yourusername" className="hover:text-gray-400 transition-colors">
              <Github size={20} />
            </a>
            <a href="https://linkedin.com/in/yourusername" className="hover:text-gray-400 transition-colors">
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;