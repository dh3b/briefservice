import { ViteReactSSG } from "vite-react-ssg";
import { routes } from "./App";
import "./index.css";

// ViteReactSSG bootstraps the app on the client (hydrating the prerendered
// HTML) and is also used by `vite-react-ssg build` to render each route to
// static HTML. Routes live in ./App.
export const createRoot = ViteReactSSG({ routes });
