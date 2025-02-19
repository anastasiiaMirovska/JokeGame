import { useEffect, useState } from "react";
import { IJokeModel } from "../models/IJokeModel.tsx";
import { jokeService } from "../services/apiservice.tsx";
import JokeComponent from "./JokeComponent.tsx";

const dummyJoke = {
    _id: "67b634e07c5a87d88efbc584",
    question: "Dummy question",
    answer: "Dummy answer",
    votes: [
        { value: 0, label: "😂" },
        { value: 0, label: "👍" },
        { value: 0, label: "❤️" },
    ],
};

const SingleJokeComponent = () => {
    const [joke, setJoke] = useState<IJokeModel>(dummyJoke);
    const [show, setShow] = useState<boolean>(true);
    const [resetTrigger, setResetTrigger] = useState<number>(0); // Тригер для resetReveal

    useEffect(() => {
        nextJoke();
    }, []);

    const nextJoke = async () => {
        try {
            const nextJoke = await jokeService.getJoke();
            setJoke(nextJoke);
            setResetTrigger((prev) => prev + 1); // Оновлюємо тригер, щоб скинути reveal
        } catch (error) {
            console.error("Error fetching next joke:", error);
        }
    };

    const deleteJoke = async () => {
        try {
            await jokeService.deleteJoke(joke._id);
            setShow(false);

            setTimeout(async () => {
                await nextJoke();
                setShow(true);
            }, 1200);
        } catch (error) {
            console.error("Error deleting:", error);
        }
    };

    return (
        <div>
            {show ? (
                joke ? (
                    <>
                        <JokeComponent joke={joke} resetRevealTrigger={resetTrigger} />
                        <button onClick={nextJoke}>Next</button>
                        <button onClick={deleteJoke}>Delete</button>
                    </>
                ) : (
                    <p>No more jokes!</p>
                )
            ) : (
                <>
                    <p>This joke was successfully deleted</p>
                    <p>Looking for next joke...</p>
                </>
            )}
        </div>
    );
};

export default SingleJokeComponent;

// import {useEffect, useState} from "react";
// import {IJokeModel} from "../models/IJokeModel.tsx";
// import {jokeService} from "../services/apiservice.tsx";
// import JokeComponent from "./JokeComponent.tsx";
//
// const SingleJokeComponent = () => {
//     const [joke, setJoke] = useState<IJokeModel | null>(null);
//
//     useEffect(() => {
//         nextJoke();
//     }, []);
//
//     const nextJoke = async () => {
//         try {
//             const nextJoke = await jokeService.getJoke(); // Отримуємо наступний жарт
//             setJoke(nextJoke); // Оновлюємо поточний жарт
//         } catch (error) {
//             console.error("Error fetching next joke:", error);
//         }
//     };
//
//     const updateJokeAfterDelete = () => {
//         nextJoke(); // Завжди оновлюємо жарт після видалення
//     };
//
//     return (
//         <div>
//             {
//                 joke ? <JokeComponent joke={joke} onJokeDeleted={updateJokeAfterDelete} /> : <span>No more jokes!</span>
//             }
//             {/*<button onClick={nextJoke}>Next</button>*/}
//         </div>
//     );
// };
//
// export default SingleJokeComponent;
