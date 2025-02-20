import {useEffect, useState} from "react";
import {IJokeModel} from "../models/IJokeModel.tsx";
import {jokeService} from "../services/apiservice.ts";
import JokeComponent from "./JokeComponent.tsx";

const SingleJokeComponent = () => {
    const [joke, setJoke] = useState<IJokeModel | null>(null);

    useEffect(() => {
        loadNewJoke();
    }, []);

    const loadNewJoke = async () => {
        const newJoke = await jokeService.getJoke();
        setJoke(newJoke);
    };

    const updateJoke = (updatedJoke: IJokeModel) => {
        setJoke(updatedJoke);
    };

    const deleteJoke = async (id: string) => {
        try {
            await jokeService.deleteJoke(id);
            loadNewJoke();
        } catch (error) {
            console.error("Error deleting joke:", error);
        }
    };

    return (
        <div>
            {joke ? (
                <JokeComponent
                    joke={joke}
                    onJokeUpdate={updateJoke}
                    onDelete={deleteJoke}
                    onNextJoke={loadNewJoke}
                />
            ) : (
                <div className={"flex justify-center"}><p className={"p"}>No more jokes!</p></div>
            )}
        </div>
    );
};

export default SingleJokeComponent;

