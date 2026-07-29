"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

export interface StaggeredMenuItem {
  label: string;
  ariaLabel?: string;
  link: string;
}

export interface StaggeredMenuSocialItem {
  label: string;
  link: string;
}

export interface StaggeredMenuProps {
  position?: 'left' | 'right';
  colors?: string[];
  items?: StaggeredMenuItem[];
  socialItems?: StaggeredMenuSocialItem[];
  displaySocials?: boolean;
  displayItemNumbering?: boolean;
  className?: string;
  logoUrl?: string;
  menuButtonColor?: string;
  openMenuButtonColor?: string;
  accentColor?: string;
  changeMenuColorOnOpen?: boolean;
  isFixed?: boolean;
  closeOnClickAway?: boolean;
  onMenuOpen?: () => void;
  onMenuClose?: () => void;
  children?: React.ReactNode;
}

export const StaggeredMenu = ({
  position = 'right',
  colors = ['#111111', '#D4AF37'],
  items = [],
  socialItems = [],
  displaySocials = true,
  displayItemNumbering = true,
  className = '',
  logoUrl = '/IMG_9226.PNG',
  menuButtonColor = '#000',
  openMenuButtonColor = '#000',
  accentColor = '#D4AF37',
  changeMenuColorOnOpen = true,
  isFixed = true,
  closeOnClickAway = true,
  onMenuOpen,
  onMenuClose,
  children
}: StaggeredMenuProps) => {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLElement>(null);
  const toggleBtnRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  const toggleMenu = () => {
    const target = !open;
    setOpen(target);
    if (target) {
      onMenuOpen?.();
    } else {
      onMenuClose?.();
    }
  };

  const closeMenu = () => {
    if (open) {
      setOpen(false);
      onMenuClose?.();
    }
  };

  useEffect(() => {
    if (!closeOnClickAway || !open) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node) &&
        toggleBtnRef.current &&
        !toggleBtnRef.current.contains(event.target as Node)
      ) {
        closeMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [closeOnClickAway, open]);

  return (
    <div
      className={`${className} staggered-menu-wrapper ${isFixed ? 'fixed-wrapper' : ''}`}
      style={accentColor ? { '--sm-accent': accentColor } as React.CSSProperties : undefined}
      data-position={position}
      data-open={open ? 'true' : undefined}
    >
      <header className="staggered-menu-header relative z-50">
        <button
          ref={toggleBtnRef}
          className="sm-toggle p-2 sm:px-4 sm:py-2 z-50 relative flex items-center justify-center font-bold uppercase tracking-[0.2em] text-[10px] sm:text-xs transition-colors hover:text-primary"
          onClick={toggleMenu}
          style={{ color: open && changeMenuColorOnOpen ? openMenuButtonColor : menuButtonColor }}
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {/* Mobile Icons */}
          <span className="sm:hidden">
            {open ? <X size={24} /> : <Menu size={24} />}
          </span>
          {/* Desktop Text */}
          <span className="hidden sm:block">
            {open ? 'CLOSE' : 'MENU'}
          </span>
        </button>
      </header>

      {open && (
        <aside 
            ref={panelRef} 
            className="fixed inset-0 z-40 flex items-center justify-center bg-background"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none -z-10 w-[80vw] max-w-[500px]">
             <Image src={logoUrl} alt="Logo Background" width={500} height={500} className="w-full h-auto object-contain grayscale" priority />
          </div>
          
          <div className="relative z-10 w-full max-w-2xl px-8 flex flex-col items-center">
            <ul className="flex flex-col items-center gap-6" role="list">
              {items && items.length ? (
                items.map((it, idx) => {
                  const isActive = pathname === it.link || (it.link !== '/' && pathname.startsWith(it.link));
                  return (
                  <li key={it.label + idx}>
                    <Link 
                        href={it.link} 
                        className={`font-serif italic text-5xl md:text-7xl lg:text-8xl hover:text-primary transition-colors ${isActive ? 'text-[#D4AF37]' : 'text-foreground'}`} 
                        onClick={closeMenu}
                    >
                        {it.label}
                    </Link>
                  </li>
                  );
                })
              ) : null}
            </ul>
            
            {children && (
              <div className="w-full max-w-[280px] mx-auto mt-12 text-center" onClick={closeMenu}>
                {children}
              </div>
            )}

            {displaySocials && socialItems && socialItems.length > 0 && (
              <div className="mt-16 text-center">
                <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-muted-foreground mb-6">Follow Us</h3>
                <ul className="flex gap-8 justify-center">
                  {socialItems.map((s, i) => (
                    <li key={s.label + i}>
                      <a href={s.link} target="_blank" rel="noopener noreferrer" className="text-xs font-bold hover:text-primary transition-colors">
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </aside>
      )}
    </div>
  );
};

export default StaggeredMenu;
