import React from 'react';
import { Coffee, ShoppingCart } from 'lucide-react';

function Navbar({ cartCount = 0, onCartClick }: { cartCount: number; onCartClick: () => void }) {
  return (
    <nav className="fixed w-full z-50 bg-black/20 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Coffee className="w-8 h-8 text-white" />
            <span className="text-white font-bold text-xl">Stingo Coffee</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <NavLink href="#menu">Menu</NavLink>
            <NavLink href="#about">About</NavLink>
            <NavLink href="#contact">Contact</NavLink>
            <button
              onClick={onCartClick}
              className="relative text-white/80 hover:text-white transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#ff9500] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ href, children }: { href: string, children: React.ReactNode }) {
  return (
    <a 
      href={href} 
      className="text-white/80 hover:text-white transition-colors"
    >
      {children}
    </a>
  );
}

export default Navbar;