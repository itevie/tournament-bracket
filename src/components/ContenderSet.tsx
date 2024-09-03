import Contender, { ContenderDetails } from "./Contender";

export default function ContenderSet(
    {
        contenders,
        disabled,
        onSelect
    }: { onSelect: (details: ContenderDetails) => void, disabled: boolean, contenders: ContenderDetails[] }
) {
    function setSelected(details: ContenderDetails) {
        if (!disabled) onSelect(details);
    }

    return (
        <div className={`contender-set ${disabled ? "disabled" : ""}`}>
            <Contender onClick={() => setSelected(contenders[0])} details={contenders[0]} />
            {contenders.length > 1
                ? <Contender onClick={() => setSelected(contenders[1])} details={contenders[1]} />
                : <></>}
        </div>
    );
}   