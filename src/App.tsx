import React from 'react';
import emailjs from '@emailjs/browser';
import { useState, useRef, FormEvent } from 'react';
import { Github, Mail, Linkedin, ExternalLink } from 'lucide-react';
import Navigation from './components/Navigation';
import { Analytics } from '@vercel/analytics/react';

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
    description: "A comprehensive logistics platform connecting businesses to international shipping services. The system streamlines supply chain operations, enabling seamless transport coordination across multiple modes while providing detailed analytics and document generation.",
    tech: ["Next.js", "React", "Tailwind CSS", "Sanity CMS", "Firebase", "Vercel Analytics", "PDF-lib", "SendGrid"],
    link: "https://bartalogistics-git-master-daniel-tanurhans-projects.vercel.app/",
    github: "https://github.com/danieltanurhan/danieltanurhan/blob/main/bartalogistics/README.md"
  },
  {
    title: "PokerBolt",
    description: "PokerBolt is a sophisticated real-time multiplayer Texas Hold'em poker application that delivers an authentic poker experience through a modern tech stack. It features secure authentication, custom table creation, and responsive design.",
    tech: ["Next.js", "Node.js", "Express.js", "MongoDB", "Socket.IO", "JWT", "Tailwind CSS"],
    link: "https://pokerbolt.vercel.app/",
    github: "https://github.com/danieltanurhan/danieltanurhan/blob/main/pokerbolt/README.md"
  },
  {
    title: "Res-Frontend",
    description: "A comprehensive restaurant ordering platform built with modern web technologies, enabling customers to browse menus, customize orders, and complete purchases with real-time order tracking and secure payment integration.",
    tech: ["Next.js", "React", "Tailwind CSS", "Zustand", "NextAuth.js", "SquareSDK", "MongoDB", "MySQL"],
    link: "https://github.com/danieltanurhan/danieltanurhan/blob/main/res-frontend/README.md",
    github: "https://github.com/danieltanurhan/danieltanurhan/blob/main/res-frontend/README.md"
  },
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
    skills: ["MySQL", "MongoDB", "Redis"]
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
    skills: ["Java", "Godot", "C#", "C++"]
  }
];

function App() {
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const formRef = useRef<HTMLFormElement>(null);

  const sections = ["home", "about", "tech", "projects", "contact"];

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('loading');

    try {
      await emailjs.sendForm(
        'service_gdt8wsj',
        'template_mjbgp3n',
        formRef.current!,
        'QYjJ24Yh4fZzsy0Xu'
      );
      setFormStatus('success');
      
      // Reset form
      if (formRef.current) {
        formRef.current.reset();
      }
    } catch (error) {
      console.error('Email sending failed:', error);
      setFormStatus('error');
    }
  };

  return (
    <>
      <div className="min-h-screen bg-white">
        {/* Use the new Navigation component */}
        <Navigation sections={sections} />

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
                  I'm passionate about creating good experiences. My approach combines technical excellence with free flow creativeness
                  to build applications that look and feel a delight.
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
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  className="w-full px-4 py-3 bg-transparent border-2 border-white focus:outline-none"
                  placeholder="Your name"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  className="w-full px-4 py-3 bg-transparent border-2 border-white focus:outline-none"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
              <div>
                <label htmlFor="title" className="block text-sm font-medium mb-2">Subject</label>
                <input 
                  type="text" 
                  id="title" 
                  name="title" 
                  className="w-full px-4 py-3 bg-transparent border-2 border-white focus:outline-none"
                  placeholder="What's this regarding?"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows={5} 
                  className="w-full px-4 py-3 bg-transparent border-2 border-white focus:outline-none"
                  placeholder="Your message..."
                  required
                />
              </div>
                <button 
                  type="submit" 
                  disabled={formStatus === 'loading'}
                  className={`px-8 py-3 border-2 border-white hover:bg-white hover:text-black transition-colors ${
                    formStatus === 'loading' ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {formStatus === 'loading' ? 'Sending...' : 'Send Message'}
                </button>
                
                {formStatus === 'success' && (
                  <div className="mt-4 p-3 bg-green-600 text-white">
                    Message sent successfully! I'll get back to you soon.
                  </div>
                )}
                
                {formStatus === 'error' && (
                  <div className="mt-4 p-3 bg-red-600 text-white">
                    Failed to send message. Please try again or email me directly.
                  </div>
                )}
              </form>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-4 py-12 bg-black text-white border-t border-gray-800">
          <div className="max-w-7xl mx-auto text-center">
            <p className="mb-4">© {new Date().getFullYear()} Daniel The Developer. All rights reserved.</p>
            <div className="flex justify-center gap-4">
              <a href="mailto:danieltanurhan@gmail.com" className="hover:text-gray-400 transition-colors">
                <Mail size={20} />
              </a>
              <a href="https://github.com/danieltanurhan" className="hover:text-gray-400 transition-colors">
                <Github size={20} />
              </a>
              <a href="https://linkedin.com/in/danieltanurhan" className="hover:text-gray-400 transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </footer>
      </div>
      <Analytics />
    </>
  );
}

export default App;