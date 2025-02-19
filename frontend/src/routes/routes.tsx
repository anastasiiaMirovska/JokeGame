// import {createBrowserRouter} from "react-router-dom";
// import MainLayout from "../layouts/MainLayout.tsx";
// import HomePage from "../pages/HomePage.tsx";
// export const router =createBrowserRouter([
//     {
//         path: '/', element: <MainLayout/>, children:[
//             {
//                 index: true, element: <HomePage/>
//             },
//         ]
//     }
// ])
import {createBrowserRouter} from "react-router-dom";
import MainLayout from "../layouts/MainLayout.tsx";
import HomePage from "../pages/HomePage.tsx";
export const router =createBrowserRouter([
    {
        path: '/', element: <MainLayout/>, children:[

            {
                index: true, element: <HomePage/>
            },
        ]
    }
])
