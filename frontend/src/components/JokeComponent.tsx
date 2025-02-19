import { FC, useEffect, useState } from "react";
import { IJokeModel } from "../models/IJokeModel.tsx";
import { jokeService } from "../services/apiservice.tsx";
import VoteComponent from "./VoteComponent.tsx";

interface IProps {
    joke: IJokeModel;
    reveal?: boolean;
    resetRevealTrigger?: number;
}

const JokeComponent: FC<IProps> = ({ joke, reveal = false, resetRevealTrigger }) => {
    const { _id, question, answer } = joke;
    const [doReveal, setDoReveal] = useState<boolean>(reveal);
    const [updatedJoke, setUpdatedJoke] = useState<IJokeModel>(joke); // Локальне збереження жарту

    // Скидання `doReveal` при зміні `resetRevealTrigger`
    useEffect(() => {
        setDoReveal(false);
    }, [resetRevealTrigger]);

    // Оновлення жарту при зміні `joke` (новий жарт)
    useEffect(() => {
        setUpdatedJoke(joke);
    }, [joke]);

    const revealAnswer = () => {
        setDoReveal(prev=>!(prev));
    };

    const voteForIt = async (label: string) => {
        try {
            const updated = await jokeService.voteForJoke(_id, label);
            setUpdatedJoke(updated); // Оновлення стану з оновленими голосами
        } catch (error) {
            console.error("Error voting:", error);
        }
    };

    return (
        <div>
            <div style={{ height: 90, backgroundColor: "#fdabbe", paddingLeft:20, paddingTop:5, paddingBottom:10}}>
                <p>{_id}</p>
                <h2 onDoubleClick={revealAnswer}>
                    {question}
                </h2>
            </div>

            {doReveal ? <h2>{answer}</h2> : <p></p>}


            <div style={{display:"flex", flexWrap:"wrap"}}>
                {updatedJoke.votes.map((vote) => (
                    <VoteComponent vote={vote} key={vote._id} voteForIt={voteForIt} />
                ))}
            </div>

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


