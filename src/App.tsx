import { useEffect, useState } from "react";
import Bracket from "./components/Bracket";
import { ContenderDetails } from "./components/Contender";
import ContenderSet from "./components/ContenderSet";
import "./main.css";

function toSet(contenders: ContenderDetails[]): ContenderDetails[][] {
  const result: ContenderDetails[][] = [];

  for (let i = 0; i < contenders.length; i += 2) {
    result.push(contenders.slice(i, i + 2));
  }

  return result;
}

function createSideToSideIndexes(length: number) {
  const result = [];
  let start = 0;
  let end = length - 1;

  while (start <= end) {
    result.push(start);
    if (start !== end) {
      result.push(end);
    }
    start++;
    end--;
  }

  return result;
}

function App() {
  const [selectedSet, setSelectedSet] = useState<number>(0);
  const [selectedBracket, setSelectedBracket] = useState<number>(0);
  const [brackets, setBrackets] = useState<ContenderDetails[][][]>([]);
  const [contenders, setContenders] = useState<ContenderDetails[][]>([]);

  useEffect(() => {
    let iota = 0;
    const _contenders: ContenderDetails[] = "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16".split(",").map(x => { return { name: x, id: iota++, winner: false } });

    const result = toSet(_contenders);

    const brackets: ContenderDetails[][][] = [];

    function split(cs: ContenderDetails[][]) {
      const halfLength = Math.ceil(cs.length / 2);
      const leftHalf = cs.slice(0, halfLength);
      const rightHalf = cs.slice(halfLength);

      brackets.push(leftHalf);

      if (leftHalf.length > 1) {
        split(toSet(" ".repeat(cs.length).split("").map(x => { return { name: "", id: iota++, winner: false } })));
      }

      if (leftHalf.length === 1) {
        brackets.push([[{ name: "", id: iota++, winner: false }]]);
      }

      if (rightHalf.length > 1) {
        //split(toSet(" ".repeat(cs.length).split("").map(x => { return { name: "", id: iota++, winner: false } })));
      }

      brackets.push(rightHalf);
    }

    split(result);

    setBrackets(brackets);
    setContenders(result);
  }, []);

  function setSelected(contender: ContenderDetails) {
    let copy = [...brackets];
    let idx = createSideToSideIndexes(brackets.length)[selectedBracket];
    let index = copy[idx][selectedSet].findIndex(x => x.id === contender.id);
    copy[idx][selectedSet][index].winner = true;
    if (selectedSet === copy[idx].length - 1) {
      let winners: ContenderDetails[] = [];
      for (const i in copy[idx])
        winners.push(copy[idx][i].find(x => x.winner) as ContenderDetails);
      let setIdx = createSideToSideIndexes(brackets.length)[selectedBracket + 2];
      let copy2 = [...brackets];
      for (const w in " ".repeat(winners.length / 2).split("")) {
        let i = parseInt(w);
        copy2[setIdx][w][0].name = winners[i + (i % 2)].name;
        copy2[setIdx][w][1].name = winners[i + (i % 2) + 1].name;
      }

      setSelectedBracket(selectedBracket + 1);
      setSelectedSet(0);
    } else {
      setSelectedSet(selectedSet + 1);
    }
  }

  return (
    <div className='container'>
      {brackets.map((x, i) => (
        <div className={`bracket ${i !== createSideToSideIndexes(brackets.length)[selectedBracket] ? "disabled" : ""}`} >
          {x.map((x2, i2) => <ContenderSet onSelect={setSelected} disabled={i !== createSideToSideIndexes(brackets.length)[selectedBracket] || i2 !== selectedSet} contenders={x2} />)}
        </div>
      ))}
    </div>
  );
}

export default App;
