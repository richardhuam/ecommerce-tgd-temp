import React, { useState } from 'react';
import { Wheel } from 'react-custom-roulette';

const data = [
  { option: '50', probability: 0.02 },
  { option: '30', probability: 0.04 },
  { option: '5', probability: 0.9 },
  { option: '10', probability: 0.8 },
  { option: '20', probability: 0.05 },
  { option: '100', probability: 0.01 },
  { option: '10', probability: 0.8 },
  { option: '20', probability: 0.05 },
  { option: '5', probability: 0.9 },
  { option: '40', probability: 0.03 },
  { option: '5', probability: 0.95 },
  { option: '50', probability: 0.02 },
];

const RouletteWheel = () => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);

  const handleSpinClick = () => {
    const random = Math.random();
    let cumulativeProbability = 0;

    for (let i = 0; i < data.length; i++) {
      cumulativeProbability += data[i].probability;

      if (random <= cumulativeProbability) {
        setPrizeNumber(i);
        break;
      }
    }

    setMustSpin(true);
  };

  return (
    <>
      <Wheel
        mustStartSpinning={mustSpin}
        prizeNumber={prizeNumber}
        data={data}
        onStopSpinning={() => {
          setMustSpin(false);
          console.log(data[prizeNumber].option);
        }}
      />
      <button onClick={handleSpinClick}>SPIN</button>
    </>
  );
};

export default RouletteWheel;
