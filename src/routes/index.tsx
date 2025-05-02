import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import type { Home as HomeType } from "../shared/types";
//SANITY
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types"; //https://www.sanity.io/plugins/next-sanity-image
import { client } from "../shared/client";
//MOTION
import { motion } from "framer-motion";
//STYLES
import "../global.css";
import { PortableText } from "@portabletext/react";
// import Social from "../components/Social";

//Sanity - Image url builder
const builder = imageUrlBuilder(client);
function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

//Home component
export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  // 'Homepage' data
  const {
    data: homeData,
    error: homeError,
    isLoading: homeLoading,
  } = useQuery({
    queryKey: ["home"],
    queryFn: () => client.fetch<HomeType>('*[_type == "home"][0]'),
  });

  // 'Works' data
  const {
    data: worksData,
    error: worksError,
    isLoading: worksLoading,
  } = useQuery({
    queryKey: ["works"],
    queryFn: () => client.fetch('*[_type == "works"]'),
  });

  console.log(worksData);

  // Use the correct variables for home data
  if (homeLoading || worksLoading) return <div>Loading...</div>;
  if (homeError || worksError)
    return <div>Error: {(homeError || (worksError as Error)).message}</div>;
  if (!homeData || !worksData) return <div>No data found</div>;

  return (
    <section className="h-full w-screen overflow-x-hidden px-8">
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
            // scale: [1, 0.9, 1.1, 1] original settings
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
            // scale: [1, 0.9, 1.1, 1] original settings
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

      <div className="w-screen h-screen flex flex-col">
        <h2
          className="text-[3.5rem] font-extrabold absolute top-7/10"
          id="heading"
        >
          {homeData.heading}
        </h2>
        {/* <h3 className="text-[1rem] mb-10 absolute top-8/10" id="sub-heading">{homeData.subHeadline}</h3> */}
      </div>

      {/*
      ========================================
      Self-Intro
      ======================================== */}

      <div
        id="self-intro"
        className="w-full h-screen font-bold grid grid-cols-1 content-center"
      >
        <div>
          <h3 className="text-[2.2rem] mb-2">
            <PortableText value={homeData.content} />
          </h3>
          <Link to="/about">
            {/* <div className="w-full border-b-2"> */}
            <p className="text-[0.8rem] w-fit border-b-2 font-medium">
              {/* {homeData.aboutLink} */}
              GET TO KNOW ME
            </p>
            {/* </div> */}
          </Link>
        </div>
      </div>

      {/*
      ========================================
      Projects
      ======================================== */}

      <div
        id="project-section"
        className="bg-yellow-500 w-full h-full grid grid-cols-1 place-content-center"
      >
        <h2 className="text-2xl font-bold border-l-10 pl-1">Works</h2>
        <div className="w-full h-full p-4 ">
          {/* The following line is commented out because 'image' is not defined in the HomeType or fetched data.
              Uncomment and adjust if/when you add an image field to your HomeType and Sanity data. */}
          {/* {Array.isArray(worksData) && worksData.length > 0 && worksData[0].image && (
            <img
              src={urlFor(worksData[0].image).url()}
              alt={worksData[0].image.alt || "Project image"}
            />
          )} */}
          {worksData.map((w) => {
            return (
              <>
                <h3 className="font-extrabold text-1xl">{w.heading}</h3>
                <div className="my-5 flex flex-col justify-center items-center border-y-8">
                  <img
                    src={urlFor(w.image).url()}
                    alt={w.image.alt || "Project image"}
                    className="w-4/5 my-8"
                  />

                  <div id="project-details" className="my-2">
                    <div className="border-y-2 py-4">
                      <p>Details</p>
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Explicabo earum suscipit iste libero exercitationem
                        voluptas, quaerat ipsam dolorum reprehenderit, eos
                        numquam repudiandae aut ex modi eum accusamus corrupti
                        fuga quos!
                      </p>
                    </div>

                    <div className="border-b-2 py-2">
                      <p>Year</p>
                      <p>2025</p>
                    </div>

                    <div className="border-b-2 py-2">
                      <p>Stacks</p>
                      <p>React, Tailwind</p>
                    </div>

                    <div className=" my-2">
                      <p>Links:</p>
                      <p>Git Tailwind</p>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </section>
  );
}
