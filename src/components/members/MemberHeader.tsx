
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

interface MemberHeaderProps {
  language: string;
  toggleLanguage: () => void;
  currentText: {
    members: {
      title: string;
      subtitle: string;
    };
  };
}

export const MemberHeader = ({ language, toggleLanguage, currentText }: MemberHeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-[#D71920] shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="text-2xl font-bold text-white">
              BNI <span className="text-[#FFFFFF]">FELIX</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <button 
              onClick={toggleLanguage}
              className="text-white hover:text-[#2E2E2E] transition-colors text-sm"
            >
              {language === 'vi' ? 'EN' : 'VI'}
            </button>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <a href="/" className="text-white hover:text-[#2E2E2E] transition-colors">{currentText.nav.home}</a>
            <a href="/about" className="text-white hover:text-[#2E2E2E] transition-colors">{currentText.nav.about}</a>
            <a href="/members" className="text-[#2E2E2E] font-semibold transition-colors">{currentText.nav.members}</a>
            <a href="/schedule" className="text-white hover:text-[#2E2E2E] transition-colors">{currentText.nav.schedule}</a>
            <a href="/kpi-hall-of-impact" className="text-white hover:text-[#2E2E2E] transition-colors">{currentText.nav.kpi}</a>
            <a href="/contact" className="text-white hover:text-[#2E2E2E] transition-colors">{currentText.nav.contact}</a>
          </nav>

          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-white">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-[#D71920] border-t border-[#8B0000]">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a href="/" className="block px-3 py-2 text-white hover:text-[#2E2E2E]">{currentText.nav.home}</a>
            <a href="/about" className="block px-3 py-2 text-white hover:text-[#2E2E2E]">{currentText.nav.about}</a>
            <a href="/members" className="block px-3 py-2 text-[#2E2E2E] font-semibold">{currentText.nav.members}</a>
            <a href="/schedule" className="block px-3 py-2 text-white hover:text-[#2E2E2E]">{currentText.nav.schedule}</a>
            <a href="/kpi-hall-of-impact" className="block px-3 py-2 text-white hover:text-[#2E2E2E]">{currentText.nav.kpi}</a>
            <a href="/contact" className="block px-3 py-2 text-white hover:text-[#2E2E2E]">{currentText.nav.contact}</a>
            <button 
              onClick={toggleLanguage}
              className="block px-3 py-2 text-white hover:text-[#2E2E2E] text-left w-full"
            >
              {language === 'vi' ? 'English' : 'Tiếng Việt'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
