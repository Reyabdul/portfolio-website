import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from "@tanstack/react-query";
//SANITY
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types"; //https://www.sanity.io/plugins/next-sanity-image
import { client } from "../shared/client";
import { PortableText } from "@portabletext/react";
//MOTION
import { motion } from "framer-motion";
//STYLES
import "../global.css";
// import Social from "../components/Social";

//Sanity - Image url builder
const builder = imageUrlBuilder(client);
function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// function Home() {
//   //'Homepage' data
//   const { data, error, isLoading } = useQuery({
//     queryKey: ["home"],
//     queryFn: () => client.fetch<HomeType>('*[_type == "home"][0]'),
//   });

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error: {(error as Error).message}</div>;
//   if (!data) return <div>No data found</div>;


export const Route = createFileRoute('/about')({
  component: About,
})

function About() {
  return (
    <div 
      className="p-2">Hello from About!
            {/*
      ========================================
        Personal Intro
      ======================================== */}

<div className="h-screen w-full px-2 flex flex-col justify-content-center items-center" id="bio-container ">
        {data.image?.asset && (
          <img
            className="w-80 md:w-100 my-[2rem] border-1 grayscale-100 brightness-120 rounded-xl"
            src={urlFor(data.image).url()}
            alt={data.image?.asset.altText || "Home image"}
          />
        )}
        {/* <div className=" flex flex-col justify-center  z-10"> */}
        <div className="h-full w-full">
          <div className=" text-xs leading-loose">
            <PortableText key={data._id} value={data.content} />
          </div>
          {/* <Social /> */}

        </div>
        {/* </div> */}
      </div>
    </div>)
}