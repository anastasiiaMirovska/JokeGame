import { createRoot } from 'react-dom/client'
import {RouterProvider} from "react-router-dom"
import {router} from "./routes/routes.tsx";
import MainLayout from "./layouts/MainLayout.tsx";

createRoot(document.getElementById("root")!).render(
    <MainLayout/>
);

