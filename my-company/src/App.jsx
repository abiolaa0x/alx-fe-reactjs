import About from "./components/pages/About";
import Contact from "./components/pages/Contact";
import Home from "./components/pages/Home";
import Services from "./components/pages/Services";
import Layout from "./components/Layout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {path: "/", element: <Home />},
      {path: "/about", element: <About />},
      {path: "/services", element: <Services />},
      {path: "/contact", element: <Contact />}
    ]
  }
]);

function App() {
  return (
    <RouterProvider router={routes} />
  );
}

export default App;
