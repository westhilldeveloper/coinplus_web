'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import TopBar from './TopBar';
import { FiChevronDown, FiX, FiMenu, FiChevronRight } from 'react-icons/fi';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [showTopBar, setShowTopBar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();

  // Navigation data structure
  const navItems = [
    {
      label: 'About Us',
      href: '/about',
    },
    {
      label: 'Chit Plans',
      href: '/chitplans',
    },
    {
      label: 'Why Us',
      href: '/whyus',
    },
    {
      label: 'FAQs',
      href: '/faqs',
    },
    {
      label: 'Media',
      href: '/media',
      subItems: [
        { label: 'News', href: '/media/news' },
        { label: 'Events', href: '/media/events' },
        { label: 'Blog', href: '/media/blog' },
        { label: 'Gallery', href: '/media/gallery' },
      ]
    },
    {
      label: 'Careers',
      href: '/careers',
    },
    {
      label: 'Contact us',
      href: '/contactus',
    },
  ];

  // Handle scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show/hide TopBar based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down - hide TopBar
        setShowTopBar(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up - show TopBar
        setShowTopBar(true);
      }
      
      // Set scrolled state for header styling
      setIsScrolled(currentScrollY > 20);
      
      // Update last scroll position
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  // Close dropdowns when clicking outside (for desktop)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (activeDropdown !== null && !event.target.closest('.desktop-dropdown-container')) {
        setActiveDropdown(null);
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [activeDropdown]);

  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  // Close mobile menu function
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  return (
    <>
      {/* TopBar with slide animation */}
      <div className={`transition-all duration-500 ease-out ${
        showTopBar 
          ? 'transform translate-y-0 opacity-100' 
          : 'transform -translate-y-full opacity-0'
      }`}>
        <TopBar />
      </div>
    
      {/* MAIN HEADER - Use fixed positioning for mobile, sticky for desktop */}
      <header className={`z-50 w-full transition-all duration-300 ${
        // Fixed on mobile, sticky on desktop
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg' 
          : 'bg-white shadow-sm'
      } lg:sticky lg:top-0 fixed top-0`}>
        <div className="max-w-7xl mx-auto px-4 py-3 lg:py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 z-30">
              <Image 
                src="/images/cplogo.png" 
                alt="Company Logo" 
                width={isScrolled ? 140 : 160} 
                height={isScrolled ? 120 : 140}
                className="transition-all duration-300"
                priority
              />
            </Link> <Link href="/" className="flex items-center " onClick={closeMobileMenu}>
                <Image 
                  src="/images/lg_finovest.png" 
                  alt="Company Logo" 
                  width={100}
                  height={100}
                />
              </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item, index) => (
                <div 
                  key={item.label}
                  className="relative desktop-dropdown-container"
                  onMouseEnter={() => setActiveDropdown(index)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  {item.subItems ? (
                    <button
                      onClick={() => toggleDropdown(index)}
                      className={`flex items-center gap-1 px-4 py-2 rounded-lg transition-all duration-200 font-bold text-gray-700 hover:text-primary ${
                        pathname.startsWith(item.href) 
                          ? 'text-primary bg-primary/5' 
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      {item.label}
                      <FiChevronDown className={`transition-transform duration-200 ${
                        activeDropdown === index ? 'rotate-180' : ''
                      }`} />
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className={`px-4 py-2 rounded-lg transition-all duration-200 font-semibold ${
                        pathname === item.href
                          ? 'text-primary bg-primary/5'
                          : 'text-gray-700 hover:text-primary hover:bg-gray-50'
                      }`}
                    >
                      {item.label}
                    </Link>
                  )}

                  {/* Desktop Dropdown */}
                  {item.subItems && activeDropdown === index && (
                    <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.label}
                          href={subItem.href}
                          className={`flex items-center justify-between px-4 py-3 hover:bg-primary/5 hover:text-primary transition-colors group ${
                            pathname === subItem.href ? 'bg-primary/5 text-primary' : 'text-gray-700'
                          }`}
                          onClick={() => setActiveDropdown(null)}
                        >
                          <span className="font-medium">{subItem.label}</span>
                          {subItem.highlight && (
                            <span className="px-2 py-1 text-xs bg-primary text-white rounded-full">
                              New
                            </span>
                          )}
                          <FiChevronRight className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Contact Button */}
              <Link
                href="https://subscriber.coinplus.co.in"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-4 px-6 py-2.5 bg-gradient-to-r from-primary to-primary/80 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Pay Now
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors z-50"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? (
                <FiX className="w-6 h-6 text-gray-700" />
              ) : (
                <FiMenu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay - FIXED POSITION */}
        <div className={`lg:hidden fixed inset-0 z-40 transition-all duration-300 ease-in-out ${
          mobileMenuOpen 
            ? 'opacity-100 visible' 
            : 'opacity-0 invisible pointer-events-none'
        }`}>
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeMobileMenu}
          />
          
          {/* Mobile Menu Panel - Slides in from right */}
          <div className={`absolute top-0 right-0 h-full w-full max-w-sm bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}>
            {/* Mobile Menu Header */}
            <div className="flex items-center bg-white justify-between px-6 py-4 border-b border-gray-100">
              <Link href="/" className="flex items-center gap-3" onClick={closeMobileMenu}>
                <Image 
                  src="/images/cplogo.png" 
                  alt="Company Logo" 
                  width={100}
                  height={100}
                />
              </Link>
             
              {/* <button
                onClick={closeMobileMenu}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Close menu"
              >
                <FiX className="w-6 h-6 text-gray-700" />
              </button> */}
            </div>

            {/* Mobile Menu Content */}
            <div className="h-[calc(100vh-80px)] bg-white overflow-y-auto px-6 py-4">
              <div className="space-y-1">
                {navItems.map((item, index) => (
                  <div key={item.label} className="border-b  border-gray-100 last:border-0">
                    {item.subItems ? (
                      <div className="py-2">
                        <button
                          onClick={() => toggleDropdown(index)}
                          className="flex items-center justify-between w-full text-base font-semibold text-gray-800 py-3"
                        >
                          {item.label}
                          <FiChevronDown className={`transition-transform duration-200 ${
                            activeDropdown === index ? 'rotate-180' : ''
                          }`} />
                        </button>
                        
                        <div className={`overflow-hidden transition-all duration-300 ${
                          activeDropdown === index ? 'max-h-96' : 'max-h-0'
                        }`}>
                          <div className="pl-4 py-1 space-y-1">
                            {item.subItems.map((subItem) => (
                              <Link
                                key={subItem.label}
                                href={subItem.href}
                                className={`block py-2.5 px-4 rounded-lg transition-colors ${
                                  pathname === subItem.href
                                    ? 'bg-primary/10 text-primary'
                                    : 'text-gray-600 hover:bg-gray-50'
                                }`}
                                onClick={closeMobileMenu}
                              >
                                <div className="flex items-center justify-between">
                                  <span className="font-medium">{subItem.label}</span>
                                  {subItem.highlight && (
                                    <span className="px-2 py-1 text-xs bg-primary text-white rounded-full">
                                      New
                                    </span>
                                  )}
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        className={`block text-base font-semibold py-3 px-4 rounded-lg transition-colors ${
                          pathname === item.href
                            ? 'bg-primary/10 text-primary'
                            : 'text-gray-800 hover:bg-gray-50'
                        }`}
                        onClick={closeMobileMenu}
                      >
                        {item.label}
                      </Link>
                    )}
                  </div>
                ))}

                {/* Mobile Contact Button */}
                <div className="pt-6">
                  <Link
                    href="https://subscriber.coinplus.co.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full px-6 py-3.5 bg-gradient-to-r from-primary to-primary/80 text-white font-semibold rounded-lg text-center hover:shadow-lg transition-shadow"
                    onClick={closeMobileMenu}
                  >
                    Contact Us
                  </Link>
                </div>
              </div>

              {/* Company Info in Mobile Menu */}
              <div className="mt-8 p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-xl">🏢</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Visit Our Office</h4>
                    <p className="text-sm text-gray-600">Mon-Sat, 9AM-5PM</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-xl">📞</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Call Us</h4>
                    <p className="text-sm text-gray-600">+91 97460 03484</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Add padding to prevent content from hiding behind fixed header */}
      <div className="lg:h-0 md:h-4 h-8 "></div>
    </>
  );
}