import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import type { Home as HomeType, WorkType } from "../shared/types";
//SANITY
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types"; //https://www.sanity.io/plugins/next-sanity-image
import { client } from "../shared/client";
//MOTION
import { motion } from "framer-motion";
//STYLES
import "../global.css";
import { PortableText } from "@portabletext/react";
import { useEffect, useRef, useState, useCallback } from "react";
import type { TypedObject } from "@portabletext/types";

// Define
type HomeRef = HTMLElement;
type SelfIntroRef = HTMLElement;
type WorksRef = HTMLDivElement;

//Sanity - Image url builder
const builder = imageUrlBuilder(client);
function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

//Home route
export const Route = createFileRoute("/")({
  component: Home,
});

//Home Component
function Home() {
  // Refs for intersection observer
  const homePageRef = useRef<HomeRef | null>(null);
  const selfIntroRef = useRef<SelfIntroRef | null>(null);
  const workRef = useRef<WorksRef | null>(null);

  // State for tracking whether to show dark background
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  // State to track scrolling animation state
  const [isScrolling, setIsScrolling] = useState<boolean>(false);

  /*
  ========================================
  DATA
  ======================================== */

  // 'Homepage' data
  const {
    data: homeData,
    error: homeError,
    isLoading: homeLoading,
  } = useQuery<HomeType, Error>({
    queryKey: ["home"],
    queryFn: () => client.fetch<HomeType>('*[_type == "home"][0]'),
  });

  // 'Works' data
  const {
    data: worksData,
    error: worksError,
    isLoading: worksLoading,
  } = useQuery<WorkType[], Error>({
    queryKey: ["works"],
    queryFn: () => client.fetch<WorkType[]>('*[_type == "works"]'),
  });

  /*
  ========================================
  Animation Effect
  ======================================== */

  // Debounce function to limit scroll events
  const debounce = useCallback(<T extends (...args: unknown[]) => void>(
    func: T,
    wait: number
  ): ((...args: Parameters<T>) => void) => {
    let timeout: ReturnType<typeof setTimeout> | null = null;
    return (...args: Parameters<T>) => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  }, []);

  // Function to handle scroll snapping
  const handleScroll = useCallback(
    (e: WheelEvent) => {
      // Prevent default only if we're not already scrolling
      if (!isScrolling) {
        e.preventDefault();

        // Get all section elements with snapping
        const sections = document.querySelectorAll(".snap-always");
        if (!sections || sections.length === 0) return;

        // Determine scroll direction
        const direction = e.deltaY > 0 ? 1 : -1;

        // Find the current section in view
        let currentSectionIndex = -1;
        sections.forEach((section, index) => {
          const rect = section.getBoundingClientRect();
          // If section is mostly in view, consider it the current section
          if (rect.top <= 100 && rect.bottom >= window.innerHeight / 2) {
            currentSectionIndex = index;
          }
        });

        // Calculate the next section to scroll to
        let nextIndex = currentSectionIndex + direction;

        // Clamp the index to available sections
        if (nextIndex < 0) nextIndex = 0;
        if (nextIndex >= sections.length) nextIndex = sections.length - 1;

        // Scroll to the next section if it's different from current
        if (nextIndex !== currentSectionIndex) {
          setIsScrolling(true);

          sections[nextIndex].scrollIntoView({
            behavior: "smooth",
            block: "start",
          });

          // Reset isScrolling after animation completes (typical smooth scroll takes ~500ms)
          setTimeout(() => setIsScrolling(false), 1000);
        }
      }
    },
    [isScrolling]
  );

  // Set up Intersection Observer for dark mode
  useEffect(() => {
    // Only run the observer if elements are available
    if (!selfIntroRef.current || !workRef.current) return;

    const options = {
      root: null, // Use the viewport as root
      threshold: 0.1, // Trigger when 10% of element is visible
      rootMargin: "-150px", // Margin around the root
    };

    // Observer for self-intro and work sections
    const observer = new IntersectionObserver((entries) => {
      // Check if any of the observed elements are intersecting
      const isAnyElementIntersecting = entries.some(
        (entry) => entry.isIntersecting
      );

      // Set dark mode if any element is intersecting
      setIsDarkMode(isAnyElementIntersecting);

      // Log which section is visible
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log(`${entry.target.id} is visible, applying dark mode`);
        }
      });
    }, options);

    // Capture ref values inside the effect
    const selfIntroElement = selfIntroRef.current;
    const workElement = workRef.current;

    // Start observing both elements
    observer.observe(selfIntroElement);
    observer.observe(workElement);

    // Cleanup function
    return () => {
      if (selfIntroElement) {
        observer.unobserve(selfIntroElement);
      }
      if (workElement) {
        observer.unobserve(workElement);
      }
      observer.disconnect();
    };
  }, []);

  // Set up wheel event listener for scroll snapping
  useEffect(() => {
    // Initialize smooth scroll behavior
    document.documentElement.style.scrollBehavior = "smooth";

    // Use a debounced version of the wheel handler to prevent too many events
    const debouncedHandleScroll = debounce((...args: unknown[]) => {
      handleScroll(args[0] as WheelEvent);
    }, 50);

    // Add wheel event listener with passive: false to allow preventDefault
    window.addEventListener("wheel", debouncedHandleScroll, { passive: false });

    // Handle keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        const fakeWheelEvent = {
          deltaY: e.key === "ArrowDown" ? 100 : -100,
          preventDefault: () => {},
        } as WheelEvent;
        handleScroll(fakeWheelEvent);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Add touch events for mobile
    let touchStartY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartY - touchEndY;

      // Only trigger if the swipe is substantial
      if (Math.abs(deltaY) > 50) {
        const fakeWheelEvent = {
          deltaY: deltaY,
          preventDefault: () => {},
        } as WheelEvent;
        handleScroll(fakeWheelEvent);
      }
    };

    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      // Cleanup
      window.removeEventListener("wheel", debouncedHandleScroll);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
      document.documentElement.style.scrollBehavior = "";
    };
  }, [handleScroll, debounce]);

  // Loading and error states
  if (homeLoading || worksLoading) return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
    </div>
  );
  
  if (homeError || worksError) return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="text-red-500">
        Error: {homeError?.message || worksError?.message}
      </div>
    </div>
  );
  
  if (!homeData || !worksData) return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="text-gray-500">No data found</div>
    </div>
  );

  // Animation variants for sliding content
  const slideInFromLeft = {
    hidden: { x: -100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.8,
      },
    },
  };

  return (
    <section
      className={`h-full w-screen overflow-x-hidden p-8 md:p-20 transition-colors duration-500 ${isDarkMode ? "bg-black text-white" : "bg-white text-black"} snap-y snap-mandatory`}
      id="home-page"
      ref={homePageRef}
    >
      {/*
      ========================================
        Blob Animation
      ======================================== 
      */}

      {/* Mobile screens */}
      <div className="md:hidden h-full w-screen fixed inset-0 overflow-x-hidden">
        <motion.div
          className="fixed w-[400px] h-[400px] bg-black/35 rounded-full blur-3xl"
          animate={{
            x: [0, 100, -50, 0],
            y: [0, -100, 50, 0],
            scale: [0.5, 0.4, 0.4, 0.5],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ top: "50%", left: "10%" }}
        />
        <motion.div
          className="fixed w-[300px] h-[300px] bg-black/60 rounded-full blur-3xl"
          animate={{
            x: [0, -150, 100, 0],
            y: [0, 80, -120, 0],
            scale: [1, 0.9, 1.1, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ bottom: "10%", left: "5%" }}
        />
        <motion.div
          className="fixed w-[300px] h-[300px] bg-black/50 rounded-full blur-3xl"
          animate={{
            x: [0, 120, -80, 0],
            y: [0, -70, 130, 0],
            scale: [0.4, 0.6, 0.4, 0.5],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ top: "45%", left: "3%" }}
        />
      </div>

      {/* Bigger Screens  */}
      <div className="max-md:hidden h-full w-screen fixed inset-0 overflow-x-hidden">
        <motion.div
          className="fixed w-full h-screen bg-black/40 rounded-full blur-3xl"
          animate={{
            x: [0, 100, -50, 0],
            y: [0, -100, 50, 0],
            scale: [0.5, 0.4, 0.4, 0.5],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ top: "-10%", left: "-25%" }}
        />
        <motion.div
          className="fixed w-[600px] h-[600px] bg-black/70 rounded-full blur-3xl"
          animate={{
            x: [0, -150, 100, 0],
            y: [0, 80, -120, 0],
            scale: [1, 0.9, 1.1, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ bottom: "-10%", left: "5%" }}
        />
        <motion.div
          className="fixed w-[700px] h-[700px] bg-black/30 rounded-full blur-3xl"
          animate={{
            x: [0, 120, -80, 0],
            y: [0, -70, 130, 0],
            scale: [0.4, 0.6, 0.4, 0.5],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ top: "15%", left: "10%" }}
        />
      </div>

      {/*
      ========================================
      Header (REY ABDUL)
      ======================================== */}

      <div
        id="home-hero"
        className="w-screen h-screen flex flex-col snap-start snap-always"
      >
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={slideInFromLeft}
          className="text-[6rem] font-extrabold absolute top-6/10 leading-none"
          id="heading"
        >
          {homeData.heading}
        </motion.h2>
        {/* <h3 className="text-[1rem] mb-10 absolute top-8/10" id="sub-heading">{homeData.subHeadline}</h3> */}
      </div>

      {/*
      ========================================
      Self-Intro
      ======================================== */}

      <div
        id="self-intro"
        ref={selfIntroRef as React.RefObject<HTMLDivElement>}
        className="self-intro w-full md:w-1/2 h-screen font-bold grid grid-cols-1 content-center snap-start snap-always z-6"
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={slideInFromLeft}
        >
          <h3 className="text-[2rem] mb-4">
            {homeData.content && <PortableText value={homeData.content as TypedObject[]} />}
          </h3>
          <Link to="/about" className="z-6">
            <p className="text-xs w-fit border-b-2 font-medium z-4">
              GET TO KNOW ME
            </p>
          </Link>
        </motion.div>
      </div>

      {/*
      ========================================
      Projects
      ======================================== */}

      <div
        id="project-section"
        ref={workRef}
        className="w-full h-full flex flex-col py-10 transition-colors duration-500 snap-start snap-always "
      >
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={slideInFromLeft}
          className="text-2xl font-bold border-l-4 border-yellow-500 pl-4"
        >
          <p className="text-4xl">Works</p>
        </motion.h2>
        <div className="z-3 w-full h-full p-4">
          {Array.isArray(worksData) &&
            worksData.length > 0 &&
            worksData.map((work: WorkType) => (
              <motion.div
                key={work._id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.2 }}
                variants={slideInFromLeft}
              >
                <h4 className="font-extrabold text-2xl">{work.heading}</h4>
                <div
                  id="project-container"
                  className=" my-5 flex flex-col md:flex-row justify-center place-items-center-safe border-y-8 border-black"
                >
                  {/* {Image} */}
                  <div
                    id="image-container"
                    className="w-full h-full my-8 md:w-1/2 md:h-1/2 flex place-content-center mr-4"
                  >
                    {work.image && (
                      <motion.img
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: false, amount: 0.3 }}
                        variants={slideInFromLeft}
                        src={urlFor(work.image).url()}
                        alt={work.image.alt || "Project image"}
                        className="w-[350px] h-[350px] object-cover flex justify-center items-center"
                      />
                    )}
                  </div>

                  {/* Project Details */}
                  <motion.div
                    id="project-details"
                    className="w-full md:w-1/2 h-full "
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.3 }}
                    variants={slideInFromLeft}
                  >
                    <div className="w-full md:w-4/5 h-full p-3">
                      <div className="border-y-2 py-4">
                        <p className="font-bold">Details</p>
                        <p>{work.details || "No details available"}</p>
                      </div>

                      <div className="border-b-2 py-2">
                        <p className="font-bold">Year</p>
                        <p>{work.year || "N/A"}</p>
                      </div>

                      <div className="border-b-2 py-2">
                        <p className="font-bold">Stacks</p>
                        <p>
                          {work.stacks
                            ? work.stacks.join(", ")
                            : "Not specified"}
                        </p>
                      </div>

                      <div className="my-8">
                        <p className="font-bold">Links:</p>
                        {work.links && work.links.length > 0 ? (
                          <p>
                            {work.links.map((link: { title: string; url: string }, index: number) => (
                              <span key={index}>
                                {index > 0 && " "}
                                <a href={link.url} className="underline">
                                  {link.title}
                                </a>
                              </span>
                            ))}
                          </p>
                        ) : (
                          <p>No links available</p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          {(!Array.isArray(worksData) || worksData.length === 0) && (
            <p>No works available</p>
          )}
        </div>
      </div>
    </section>
  );
}
