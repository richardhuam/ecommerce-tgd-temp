import { Image } from '@nextui-org/react';
import Buildings from '../assets/images/building.jpg';

export default function CompanyBanner() {
  return (
    <div className="w-full">
      <Image
        radius="none"
        src={Buildings}
        alt="building-banner"
        className="w-screen  h-[200px] md:h-[300px] lg:h-[400px] object-cover object-top"
      />
    </div>
  );
}
