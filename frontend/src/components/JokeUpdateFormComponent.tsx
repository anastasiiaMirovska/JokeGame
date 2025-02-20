import {FC} from "react";
import {useForm} from "react-hook-form";
import {IJokeModel} from "../models/IJokeModel.tsx";
import {jokeService} from "../services/apiservice.ts";

interface IProps {
    joke: IJokeModel;
    onJokeUpdate: (updatedJoke: IJokeModel) => void;
}

const JokeUpdateFormComponent: FC<IProps> = ({joke, onJokeUpdate}) => {
    const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm<IJokeModel>({
        defaultValues: {
            question: joke.question,
            answer: joke.answer,
        },
    });

    const onSubmit = async (data: IJokeModel) => {
        try {
            const updatedJoke = await jokeService.changeJoke(joke._id, data.question, data.answer);
            onJokeUpdate(updatedJoke); // Передаємо оновлений жарт у JokeComponent
        } catch (error) {
            console.error("Error updating joke:", error);
        }
    };

    return (
        <div className="flex justify-center w-full m-4">
            <form onSubmit={handleSubmit(onSubmit)} className="form">
                <h2 className="text-xl font-bold mb-4 text-center">Update Joke</h2>

                <div className="mb-4">
                    <label className="label">Question:</label>
                    <input
                        {...register("question", {required: "Question is required"})}
                        type="text"
                        className="input"
                    />
                    {errors.question && <p className="text-red-500 text-sm mt-1">{errors.question.message}</p>}
                </div>

                <div className="mb-4">
                    <label className="label">Answer:</label>
                    <input
                        {...register("answer", {required: "Answer is required"})}
                        type="text"
                        className="input"
                    />
                    {errors.answer && <p className="text-red-500 text-sm mt-1">{errors.answer.message}</p>}
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="input"
                >
                    {isSubmitting ? "Saving..." : "Save Changes"}
                </button>
            </form>
        </div>
    );
};

export default JokeUpdateFormComponent;
