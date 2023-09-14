import { useLottie } from 'lottie-react';
import React from 'react';

import LottieSpinnerMulticolorJson from '@/assets/lottie-animation/spinner-multicolor.json';

type LottieSpinnerMulticolorProps = {};

export default function LottieSpinnerMulticolor({}: LottieSpinnerMulticolorProps) {
  const options = {
    animationData: LottieSpinnerMulticolorJson,
    loop: true,
  };

  const { View } = useLottie(options);

  return <>{View}</>;
}
