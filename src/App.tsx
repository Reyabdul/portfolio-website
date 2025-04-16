import React from 'react';
//TANSTACK ROUTER
import { RouterProvider, createRouter} from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
//COMPONENTS
//STYLES

//Tanstack Router
  //Create a router instance
  const router = createRouter({ routeTree });
  //Register the router instance for the type safety
  declare module '@tanstack/react-router' {
    interface Register {
      router: typeof router
    }
  }

const App = () => {
  return (
    <>
      <h1>Hello World</h1>
      <RouterProvider router={router} />
    </>
  )
}

export default App
