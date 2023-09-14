import Image from 'next/image';
import React from 'react';

import { imageManager } from '@/shared/utils/image-manager';

const AboutBanner = () => {
  return (
    <div className="">
      <Image src={imageManager().banners.about} alt="building-banner" className="w-full h-200 md:h-300 lg:h-400 object-cover object-top" />
    </div>
  );
};

export default AboutBanner;
