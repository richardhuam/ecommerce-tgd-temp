import Image from 'next/image';
import React from 'react';

import Paper from '@/shared/components/ui/paper';

const OurTeamSection = () => {
  return (
    <Paper>
      <h2 className="font-semibold text-20 md:text-22 lg:text-24 mb-2">Our Team</h2>
      <div className="flex md:items-center md:justify-center lg:justify-evenly mx-auto flex-nowrap md:flex-wrap gap-4 overflow-scroll">
        <div className="p-4 min-w-[230px]">
          <Image
            src={require('../../../assets/images/about-us-team-work/2-guy.png')}
            alt="girl-team-work"
            className="rounded-full w-48 h-48 object-cover mx-auto mb-2"
          />
          <h3 className="text-18 font-medium text-center">Victor Ramirez</h3>
          <p className="text-center text-gray-600 text-14">CEO & Founder</p>
        </div>
        <div className="p-4 min-w-[230px]">
          <Image
            src={require('../../../assets/images/about-us-team-work/1-girl.png')}
            alt="girl-team-work"
            className="rounded-full w-48 h-48 object-cover mx-auto mb-2"
          />
          <h3 className="text-18 font-medium text-center">Veronica Mendoza</h3>
          <p className="text-center text-gray-600 text-14">UI/UX Designer</p>
        </div>
        <div className="p-4 min-w-[230px]">
          <Image
            src={require('../../../assets/images/about-us-team-work/3-guy.png')}
            alt="girl-team-work"
            className="rounded-full w-48 h-48 object-cover mx-auto mb-2"
          />
          <h3 className="text-18 font-medium text-center">Will Taylor</h3>
          <p className="text-center text-gray-600 text-14">Software Engineer</p>
        </div>
        <div className="p-4 min-w-[230px]">
          <Image
            src={require('../../../assets/images/about-us-team-work/4-guy.png')}
            alt="girl-team-work"
            className="rounded-full w-48 h-48 object-cover mx-auto mb-2"
          />
          <h3 className="text-18 font-medium text-center">Ringo Lorents</h3>
          <p className="text-center text-gray-600 text-14">Sales Management</p>
        </div>
      </div>
    </Paper>
  );
};

export default OurTeamSection;
