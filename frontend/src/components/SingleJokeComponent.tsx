import { useEffect, useState } from "react";
import { IJokeModel } from "../models/IJokeModel.tsx";
import { jokeService } from "../services/apiservice.tsx";
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
                <p>No more jokes!</p>
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
