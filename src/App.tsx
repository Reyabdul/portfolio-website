//TANSTACK ROUTER
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
//COMPONENTS
import { Footer } from "./components/Footer";
//STYLES
import "./global.css"

//Tanstack Router
//Create a router instance
const router = createRouter({ routeTree });
//Register the router instance for the type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const App = () => {
  return (
    <main className="h-full w-screen overflow-x-hidden flex flex-col">
      <RouterProvider router={router} />
      <Footer />
    </main>
  );
};

export default App;
