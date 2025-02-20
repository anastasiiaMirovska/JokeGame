import {FC} from "react";
import {IVoteModel} from "../models/IJokeModel.tsx";

interface IProps {
    vote: IVoteModel,
    voteForIt: (label: string) => void
}

const VoteComponent: FC<IProps> = ({vote, voteForIt}) => {
    const {value, label} = vote;
    return (
        <div onClick={() => {
            voteForIt(label)
        }} style={{backgroundColor: "#dfeeab"}} className={"voteBox"}>
            <span>{label}</span>
            <span>{value}</span>
        </div>
    );
};

export default VoteComponent;
