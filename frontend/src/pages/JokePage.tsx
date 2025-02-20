import {NavLink, Outlet} from "react-router-dom";
import {jokeService} from "../services/apiservice.ts";

const JokePage = () => {
    const addNewJokes = () => {
        try {
            jokeService.addJokes().then();
        } catch (error) {
            console.error("Error adding new jokes:", error);
        }
    }
    return (

        <div className={"flex w-full flex-wrap flex-col "}>
            <div className={"flex justify-center"}>
                <button onClick={addNewJokes} className={"button"}>Add new jokes</button>
            </div>
            <div className={"flex justify-center"}><p className={"p"}> To reveal answer - double click on the joke</p>
            </div>
            <div className={"flex justify-center m-3"}>
                <NavLink to="single" className={"navLink text-xl"}>
                    Single Jokes
                </NavLink>
                <NavLink to="all" className={"navLink text-xl"}>
                    All Jokes
                </NavLink>
            </div>
            <Outlet/>
        </div>
    );
};

export default JokePage;
