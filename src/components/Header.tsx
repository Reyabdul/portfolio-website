import { useState } from "react";
import { Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { motion, AnimatePresence } from "framer-motion";
//COMPONENTS
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";
//STYLES
import "../global.css";
import { useQuery } from "@tanstack/react-query";
import { client } from "../shared/client";
import { PortableText } from "@portabletext/react";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const {
    data: menuData,
  } = useQuery({
    queryKey: ["menu"],
    queryFn: () => client.fetch('*[_type == "menu"][0]'),
  });

  return (
    <>
      <nav className="h-auto w-screen fixed flex items-center justify-between p-4 md:p-10 bg-transparent z-10">
        <div className="flex">
          <Link to="/" className="[&.active]:font-bold">
            RA
          </Link>
        </div>
        <div className="flex gap-8">
          <Link to="/media" className="[&.active]:font-bold max-md:hidden">
            Media
          </Link>
          <Link to="/works" className="[&.active]:font-bold max-md:hidden">
            Works
          </Link>
          <div className="cursor-pointer" onClick={toggleMenu}>
            <RxHamburgerMenu size={24} />
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-black opacity-90 z-20 flex items-center justify-center"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
          >
            {/* Close button positioned in top right corner */}
            <button
              onClick={closeMenu}
              className="absolute top-4 text-white right-4 p-2"
              aria-label="Close menu"
            >
              <IoClose size={28} />
            </button>

            <div className="w-screen h-screen flex justify-center max-md:flex-col-reverse items-center text-white text-xl p-10 md:px-20">
              <div className=" w-full md:w-[400px] max-md:h-full flex flex-col ">
                <div className="py-2 border-b-1 ">
                  <h2 className="text-[4rem] max-md:text-[1.2rem] font-bold">
                    {menuData.heading}
                  </h2>
                  <p className="text-[0.8rem] md:text-sm">
                    <PortableText value={menuData.content} />
                  </p>
                </div>
                <div className="py-2 border-b-1">
                  <h3 className="font-bold  max-md:text-[1rem]">
                    {menuData.subHeading1}:
                  </h3>
                  <p className="text-xs md:text-sm">{menuData.email}</p>
                </div>
                <div className="py-2">
                  <h3 className="font-bold max-md:text-[1rem]">
                    {menuData.subHeading2}:
                  </h3>
                  <p className="text-xs md:text-sm">filler | filler | filler</p>
                </div>
              </div>
              <div className="w-1/2 max-md:w-screen max-md:h-full flex flex-col justify-center items-center gap-8 text-[2rem] text-white font-normal ">
                <Link
                  to="/"
                  className="[&.active]:font-extrabold md:text-[3rem]"
                  onClick={closeMenu}
                >
                  Home
                </Link>
                <Link
                  to="/about"
                  className="[&.active]:font-extrabold md:text-[3rem]"
                  onClick={closeMenu}
                >
                  About
                </Link>
                <Link
                  to="/media"
                  className="[&.active]:font-extrabold md:text-[3rem]"
                  onClick={closeMenu}
                >
                  Media
                </Link>
                <Link
                  to="/works"
                  className="[&.active]:font-extrabold md:text-[3rem]"
                  onClick={closeMenu}
                >
                  Works
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  );
};
