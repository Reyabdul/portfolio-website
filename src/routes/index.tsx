import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import type { Home as HomeType } from "../shared/types";
//SANITY
// import imageUrlBuilder from "@sanity/image-url";
// import type { SanityImageSource } from "@sanity/image-url/lib/types/types"; //https://www.sanity.io/plugins/next-sanity-image
import { client } from "../shared/client";
//MOTION
import { motion } from "framer-motion";
//STYLES
import "../global.css";
// import Social from "../components/Social";

// //Sanity - Image url builder
// const builder = imageUrlBuilder(client);
// function urlFor(source: SanityImageSource) {
//   return builder.image(source);
// }

//Home component
export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  //'Homepage' data
  const { data, error, isLoading } = useQuery({
    queryKey: ["home"],
    queryFn: () => client.fetch<HomeType>('*[_type == "home"][0]'),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {(error as Error).message}</div>;
  if (!data) return <div>No data found</div>;



  return (

    <section className="h-full w-screen overflow-x-hidden px-8">

      {/*
      ========================================
        Blob Animiation
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
            // scale: [1, 0.9, 1.1, 1] orignal settings
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
            // scale: [1, 0.9, 1.1, 1] orignal settings
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
          id="heading">{data.headline}
        </h2>
        {/* <h3 className="text-[1rem] mb-10 absolute top-8/10" id="sub-heading">{data.subHeadline}</h3> */}
      </div>

      {/*
      ========================================
      Self-Intro
      ======================================== */}

      <div id="self-intro" className="w-screen h-screen flex flex-col">
        <p>
          A frontend developer with a love for learning, creating, and problem-solving.
        </p>
        <Link 
          to="/about" 
        >
          LEARN MORE ABOUT ME
        </Link>
      </div>
    </section>
  );
}
