import Contender, { ContenderDetails } from "./Contender";

export default function Bracket({ contenders }: { contenders: ContenderDetails[] }) {
    return (
        <div className="bracket">
            {contenders.map(x => <Contender details={x} />)}
        </div>
    )
}