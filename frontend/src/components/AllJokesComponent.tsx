import { useEffect, useState } from "react";
import { IJokeModel } from "../models/IJokeModel.tsx";
import { jokeService } from "../services/apiservice.tsx";
import JokeComponent from "./JokeComponent.tsx";

const AllJokesComponent = () => {
    const [jokes, setJokes] = useState<IJokeModel[]>([]);

    useEffect(() => {
        jokeService.getAllJokes().then((res) => setJokes(res));
    }, []);

    return (
        <div>
            {jokes.length > 0 ? (
                jokes.map((joke) => <JokeComponent key={joke._id} joke={joke} />)
            ) : (
                <p>No more jokes!</p>
            )}
        </div>
    );
};

export default AllJokesComponent;
