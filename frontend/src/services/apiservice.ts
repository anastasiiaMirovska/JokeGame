import axios from "axios";
import {baseURL, urls} from "../constants/urls.ts"
import {IJokeModel} from "../models/IJokeModel.tsx";

const axiosInstance = axios.create(
    {
        baseURL: baseURL
    }
)

const jokeService = {
    async getAllJokes(): Promise<IJokeModel[]> {
        const {data} = await axiosInstance.get<IJokeModel[]>(urls.allJokes)
        return data
    },
    async getJoke(): Promise<IJokeModel> {
        const {data} = await axiosInstance.get<IJokeModel>(urls.joke)
        return data
    },
    async voteForJoke(id: string, emoji: string): Promise<IJokeModel> {
        const {data} = await axiosInstance.post<IJokeModel>(`${urls.joke}/${id}`, {emoji})
        return data
    },
    async changeJoke(id: string, question: string, answer: string): Promise<IJokeModel> {
        const {data} = await axiosInstance.put<IJokeModel>(`${urls.joke}/${id}`, {question, answer})
        return data
    },
    async deleteJoke(id: string): Promise<IJokeModel> {
        const {data} = await axiosInstance.delete<IJokeModel>(`${urls.joke}/${id}`)
        return data
    },
    async addJokes(): Promise<void> {
        try {
            const {data} = await axiosInstance.get(urls.addJokes);
            console.log("Jokes added:", data);
        } catch (error) {
            console.error("Error adding jokes:", error);
        }
    }
}

export {
    jokeService
}
