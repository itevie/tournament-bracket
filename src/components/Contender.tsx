import { HTMLAttributes } from "react";

export interface ContenderDetails {
    name: string,
    id: number,
    winner: boolean,
}

export default function Contender({ details, ...rest }: { details: ContenderDetails } & HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={`contender ${details.winner ? "winner" : ""}`} {...rest}>
            {details.name}
        </div>
    )
}