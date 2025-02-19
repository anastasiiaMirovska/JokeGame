import {FC} from "react";
import {IVoteModel} from "../models/IJokeModel.tsx";
interface IProps {
    vote: IVoteModel,
    voteForIt:(label:string)=>void
}
const VoteComponent:FC<IProps> = ({vote, voteForIt}) => {
    const {value, label} = vote;
    return (
        <div onClick={()=>{
            voteForIt(label)
        }} style={{height:50, width:70, margin:10, backgroundColor: "#dfeeab"}}>
            <span>{label}</span>
            <span>{value}</span>
        </div>
    );
};

export default VoteComponent;
