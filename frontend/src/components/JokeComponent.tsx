import { FC, useEffect, useState } from "react";
import { IJokeModel } from "../models/IJokeModel.tsx";
import { jokeService } from "../services/apiservice.tsx";
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
        <div>
            <div style={{ backgroundColor: "#fdabbe", padding: 10 }}>
                <h2 onDoubleClick={toggleAnswer}>{question}</h2>
            </div>

            {revealAnswer && <h3>{answer}</h3>}

            <div style={{ display: "flex", gap: 10 }}>
                {votes.map((vote) => (
                    <VoteComponent key={vote._id} vote={vote} voteForIt={voteForIt} />
                ))}
            </div>

            <button onClick={toggleForm}>Update</button>
            {revealForm && <JokeUpdateFormComponent joke={joke} onJokeUpdate={onJokeUpdate} />}

            {onNextJoke && <button onClick={onNextJoke}>Next</button>}
            <button onClick={() => onDelete(_id)}>Delete</button>
        </div>
    );
};

export default JokeComponent;

// const changeJoke = async()=>{
//     try{
//         const updated = await jokeService.changeJoke(_id, question, answer);
//         setUpdatedJoke(updated);
//     }
//     catch (error){
//         console.error("Error changing:", error);
//     }
// }


