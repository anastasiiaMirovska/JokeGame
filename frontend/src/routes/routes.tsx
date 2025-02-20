import {createBrowserRouter, Navigate} from "react-router-dom";
import MainLayout from "../layouts/MainLayout.tsx";
import HomePage from "../pages/HomePage.tsx";
import JokePage from "../pages/JokePage.tsx";
import AllJokesComponent from "../components/AllJokesComponent.tsx";
import SingleJokeComponent from "../components/SingleJokeComponent.tsx";

export const router = createBrowserRouter([
    {
        path: '/', element: <MainLayout/>, children: [

            {
                index: true, element: <HomePage/>,
            },
            {
                path: "joke", element: <JokePage/>, children: [
                    {
                        index: true, element: <Navigate to="single" replace/>
                    },
                    {
                        path: 'all', element: <AllJokesComponent/>
                    },
                    {
                        path: 'single', element: <SingleJokeComponent/>
                    }
                ]
            }
        ]
    }
])
