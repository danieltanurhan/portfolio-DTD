import React, { useState, useEffect, useCallback } from 'react';
import { Menu, X } from 'lucide-react';

interface NavigationProps {
  sections: string[];
}

const Navigation: React.FC<NavigationProps> = ({ sections }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [activeSection, setActiveSection] = useState('home');

  // Track scroll position for navigation effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
      
      // Determine active section based on scroll position
      const sectionElements = sections.map(section => ({
        id: section,
        element: document.getElementById(section),
      })).filter(item => item.element);
      
      // Calculate which section is most in view
      let maxVisibleSection = { id: activeSection, visibleHeight: 0 };
      
      sectionElements.forEach(section => {
        if (!section.element) return;
        
        const rect = section.element.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Calculate how much of the section is visible in the viewport
        const visibleTop = Math.max(0, rect.top);
        const visibleBottom = Math.min(windowHeight, rect.bottom);
        const visibleHeight = Math.max(0, visibleBottom - visibleTop);
        
        if (visibleHeight > maxVisibleSection.visibleHeight) {
          maxVisibleSection = { id: section.id, visibleHeight };
        }
      });
      
      setActiveSection(maxVisibleSection.id);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections, activeSection]);

  // Toggle menu
  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
    // When menu is opened, prevent scrolling on the body
    if (!isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isMenuOpen]);

  // Close menu when a section is clicked
  const handleSectionClick = useCallback(() => {
    setIsMenuOpen(false);
    document.body.style.overflow = 'auto';
  }, []);

  // Clean up body overflow when component unmounts
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <>
      {/* Fixed Navigation Bar */}
      <nav 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrollPosition > 20 
            ? 'bg-black/90 backdrop-blur-sm text-white shadow-lg py-3' 
            : 'bg-black/50 backdrop-blur-sm py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <a 
              href="#home" 
              className="text-xl font-bold text-white tracking-wider transform hover:scale-105 transition-transform duration-300"
            >
              DTD
            </a>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button 
                onClick={toggleMenu}
                className="text-white focus:outline-none p-2"
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center">
              <div className="flex relative">
                {sections.map((section) => (
                  <div key={section} className="relative group">
                    <a 
                      href={`#${section}`} 
                      className={`px-5 py-2 capitalize hover:text-white transition-colors ${
                        activeSection === section 
                          ? 'text-white' 
                          : 'text-gray-400'
                      }`}
                    >
                      {section}
                      {activeSection === section && (
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white transform origin-left transition-transform duration-300" />
                      )}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transform origin-left transition-all duration-300 group-hover:w-full" />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Mobile Navigation Overlay - Separated from main nav */}
      <div 
        className={`fixed inset-0 bg-black z-[100] md:hidden transition-opacity duration-500 ${
          isMenuOpen 
            ? 'opacity-100 visible' 
            : 'opacity-0 invisible'
        }`}
      >
        {/* Close button */}
        <div className="absolute top-5 right-5">
          <button 
            onClick={toggleMenu}
            className="text-white p-2"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>
        
        {/* Menu items container */}
        <div className="flex flex-col justify-center items-center h-full">
          {sections.map((section, index) => (
            <div 
              key={section} 
              className="my-4"
              style={{ 
                opacity: isMenuOpen ? 1 : 0,
                transform: isMenuOpen 
                  ? 'translateY(0)' 
                  : `translateY(20px)`,
                transition: `all 0.5s ease ${index * 0.1}s` 
              }}
            >
              <a 
                href={`#${section}`} 
                className={`text-3xl capitalize block py-2 px-4 ${
                  activeSection === section 
                    ? 'text-white font-bold' 
                    : 'text-gray-400'
                }`}
                onClick={handleSectionClick}
              >
                {section}
                {activeSection === section && (
                  <div className="mt-2 mx-auto w-12 h-0.5 bg-white" />
                )}
              </a>
            </div>
          ))}
          
          {/* Footer */}
          <div 
            className="absolute bottom-8 w-full text-center text-gray-400 text-sm"
            style={{ 
              opacity: isMenuOpen ? 0.7 : 0,
              transition: 'opacity 0.5s ease 0.5s'
            }}
          >
            <p>© {new Date().getFullYear()} Daniel The Developer</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;