const baseURL = import.meta.env.VITE_API_URL;
const joke = '/joke'

const urls = {
    joke: joke,
    allJokes: `${joke}/all`,
    addJokes: `${joke}/add`,
}
export {
    baseURL,
    urls
}
