import {useEffect, useState} from "react";
import {IJokeModel} from "../models/IJokeModel.tsx";
import {jokeService} from "../services/apiservice.ts";
import JokeComponent from "./JokeComponent.tsx";

const AllJokesComponent = () => {
    const [jokes, setJokes] = useState<IJokeModel[]>([]);

    useEffect(() => {
        jokeService.getAllJokes().then(setJokes);
    }, []);

    const updateJoke = (updatedJoke: IJokeModel) => {
        setJokes((prevJokes) =>
            prevJokes.map((j) => (j._id === updatedJoke._id ? updatedJoke : j))
        );
    };

    const deleteJoke = async (id: string) => {
        try {
            await jokeService.deleteJoke(id);
            setJokes((prevJokes) => prevJokes.filter((j) => j._id !== id));
        } catch (error) {
            console.error("Error deleting joke:", error);
        }
    };

    return (
        <div>
            {jokes.length > 0 ? (
                jokes.map((joke) => (
                    <JokeComponent
                        key={joke._id}
                        joke={joke}
                        onJokeUpdate={updateJoke}
                        onDelete={deleteJoke}
                    />
                ))
            ) : (
                <div className={"flex justify-center"}><p className={"p"}>No more jokes!</p></div>
            )}
        </div>
    );
};

export default AllJokesComponent;
