import React from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "./../assets/Wordmark - Black.svg";


const navLinks = [
  { name: "Global", path: "/global" },
  { name: "Site", path: "/site" },
  { name: "Reactor", path: "/reactor" },
  { name: "Batch Analysis", path: "/batch-analysis" },
  { name: "Strains Explore", path: "/strains" },
];

// Utility: returns true if current path matches link path
function isActive(path: string, locationPath: string) {
  return locationPath.startsWith(path);
}

const Header: React.FC = () => {
  const location = useLocation();

  return (
    <header
      className="
        sticky top-0 z-40 
        w-full 
        bg-white 
        border-b border-black 
        shadow-md
      "
      role="banner"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-16">
        {/* LOGO */}
        <Link to="/" className="flex items-center space-x-2">
          <img src={Logo} className="h-8 w-auto" alt="Fungal Intelligence Logo" />
          <span className="font-halvar-medium text-lg tracking-wide">Fungal Intelligence</span>
        </Link>

        {/* NAVIGATION */}
        <nav className="flex space-x-1">
          {navLinks.map((link) => {
            const active = isActive(link.path, location.pathname);
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`
                  px-4 py-2 rounded-md text-sm font-halvar-regular transition-all
                  border border-transparent
                  ${
                    active
                      ? "bg-[#D9D9D9] text-[#262626]"
                      : "bg-white text-black hover:bg-[#173D3C] hover:text-white active:bg-[#262626] active:text-white"
                  }
                  focus:outline-none focus:ring-2 focus:ring-[#173D3C]
                `}
                aria-current={active ? "page" : undefined}
                style={{ textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

export default Header;
