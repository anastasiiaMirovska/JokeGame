export interface IJokeModel {
    _id: string,
    question: string,
    answer: string,
    votes: IVoteModel[],
    createdAt?: Date,
    updatedAt?: Date,
}

export interface IVoteModel{
    _id?: string,
    value: number,
    label: string
}

