import { FC } from "react";
import { useForm } from "react-hook-form";
import { IJokeModel } from "../models/IJokeModel.tsx";
import { jokeService } from "../services/apiservice.tsx";

interface IProps {
    joke: IJokeModel;
    onJokeUpdate: (updatedJoke: IJokeModel) => void;
}

const JokeUpdateFormComponent: FC<IProps> = ({ joke, onJokeUpdate }) => {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<IJokeModel>({
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
        <form onSubmit={handleSubmit(onSubmit)} style={{ marginBottom: 20 }}>
            <div>
                <label>Question:</label>
                <input
                    {...register("question", { required: "Question is required" })}
                    type="text"
                    style={{ width: "100%", padding: 8, marginBottom: 10 }}
                />
                {errors.question && <p style={{ color: "red" }}>{errors.question.message}</p>}
            </div>

            <div>
                <label>Answer:</label>
                <input
                    {...register("answer", { required: "Answer is required" })}
                    type="text"
                    style={{ width: "100%", padding: 8, marginBottom: 10 }}
                />
                {errors.answer && <p style={{ color: "red" }}>{errors.answer.message}</p>}
            </div>

            <button type="submit" disabled={isSubmitting} style={{ padding: 10, backgroundColor: "#4caf50", color: "white", border: "none", cursor: "pointer" }}>
                {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
        </form>
    );
};

export default JokeUpdateFormComponent;
