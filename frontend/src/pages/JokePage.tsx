import {NavLink, Outlet} from "react-router-dom";
import {jokeService} from "../services/apiservice.tsx";

const JokePage = () => {
    const addNewJokes = ()=>{
        try{
            jokeService.addJokes().then();
        }
        catch(error){
            console.error("Error adding new jokes:", error);
        }
    }
    return (

        <div>
            <h1>JokePage</h1>
            <button onClick={addNewJokes} style={{margin:10}}>Add new jokes</button>
            <div style={{ margin: 20 }}>
                <NavLink  to="single" style={({ isActive }) => ({ backgroundColor: isActive ? '#dfeeab' : '#e6e6e1' })} >
                    Single Jokes
                </NavLink >
                <NavLink  to="all" style={({ isActive }) => ({ backgroundColor: isActive ? '#dfeeab' : '#e6e6e1' })}>
                    All Jokes
                </NavLink >
            </div>
            <Outlet/>
        </div>
    );
};

export default JokePage;
