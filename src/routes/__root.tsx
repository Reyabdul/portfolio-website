import { useState } from "react"
import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { motion, AnimatePresence } from 'framer-motion'
//COMPONENTS
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";
//STYLES
import "../global.css"

export const Route = createRootRoute({
  component: () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
      setIsMenuOpen(false);
    };

    return (
      <>
        <nav className="h-auto w-screen md:hidden fixed flex items-center justify-between p-4 bg-transparent z-10">
          <div className="flex">
            <Link to="/" className="[&.active]:font-bold">
              RA
            </Link>
          </div>
          <div className="cursor-pointer" onClick={toggleMenu}>
            <RxHamburgerMenu size={24} />
          </div>
        </nav>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              className="fixed inset-0 bg-white z-20 md:hidden flex flex-col items-center justify-center"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
            >
              {/* Close button positioned in top right corner */}
              <button 
                onClick={closeMenu}
                className="absolute top-4 right-4 p-2"
                aria-label="Close menu"
              >
                <IoClose size={28} />
              </button>
              
              <div className="flex flex-col items-center gap-8 text-xl">
                <Link 
                  to="/" 
                  className="[&.active]:font-bold"
                  onClick={closeMenu}
                >
                  Home
                </Link>
                <Link 
                  to="/about" 
                  className="[&.active]:font-bold"
                  onClick={closeMenu}
                >
                  About
                </Link>
                <Link 
                  to="/media" 
                  className="[&.active]:font-bold"
                  onClick={closeMenu}
                >
                  Media
                </Link>
                <Link 
                  to="/works" 
                  className="[&.active]:font-bold"
                  onClick={closeMenu}
                >
                  Works
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <nav className="w-screen flex justify-between p-4 max-md:hidden bg-transparent fixed">
          <Link to="/" className="[&.active]:font-bold">
            RA
          </Link>
          <div className="flex gap-4">
            <Link to="/about" className="[&.active]:font-bold">
              About
            </Link>
            <Link to="/media" className="[&.active]:font-bold">
              Media
            </Link>
            <Link to="/works" className="[&.active]:font-bold">
              Works
            </Link>
          </div>
        </nav>
        <Outlet />
        <TanStackRouterDevtools />
      </>
    )
  },
})