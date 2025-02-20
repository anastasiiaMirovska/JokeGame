import { FC, useEffect, useState } from "react";
import { IJokeModel } from "../models/IJokeModel.tsx";
import { jokeService } from "../services/apiservice.ts";
import VoteComponent from "./VoteComponent.tsx";
import JokeUpdateFormComponent from "./JokeUpdateFormComponent.tsx";

interface IProps {
    joke: IJokeModel;
    onJokeUpdate: (updatedJoke: IJokeModel) => void;
    onDelete: (id: string) => void;
    onNextJoke?: () => void;
}

const JokeComponent: FC<IProps> = ({ joke, onJokeUpdate, onDelete, onNextJoke }) => {
    const { _id, question, answer, votes } = joke;
    const [revealAnswer, setRevealAnswer] = useState(false);
    const [revealForm, setRevealForm] = useState(false);

    useEffect(() => {
        setRevealAnswer(false);
    }, [joke]);

    const toggleAnswer = () => setRevealAnswer((prev) => !prev);
    const toggleForm = () => setRevealForm((prev) => !prev);

    // Голосування за жарт
    const voteForIt = async (label: string) => {
        try {
            const updatedJoke = await jokeService.voteForJoke(_id, label);
            onJokeUpdate(updatedJoke); // Оновлюємо стан жарту після голосування
        } catch (error) {
            console.error("Error voting:", error);
        }
    };

    return (
        <div className={"m-6"}>
            <div className={"w-full flex justify-center"}>
                <div className={"jokeBox"} onDoubleClick={toggleAnswer}>
                <h2 className={"h2"}>{question}</h2>
                    {revealAnswer && <h2>{answer}</h2>}
                </div>
            </div>


            <div className={"flex justify-center"}>
                {votes.map((vote) => (
                    <VoteComponent key={vote._id} vote={vote} voteForIt={voteForIt} />
                ))}
            </div>
            <div className={"flex justify-center flex-wrap"}>
                <button onClick={toggleForm} className={"sbutton"}>Update</button>
                {revealForm && <JokeUpdateFormComponent joke={joke} onJokeUpdate={onJokeUpdate} />}

                {onNextJoke && <button onClick={onNextJoke} className={"sbutton"}>Next</button>}
                <button onClick={() => onDelete(_id)} className={"sbutton"}>Delete</button>
            </div>

        </div>
    );
};

export default JokeComponent;


