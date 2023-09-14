import { Card, CardBody, Image, ScrollShadow } from '@nextui-org/react';
import TeamMember1 from '../assets/images/1-girl.png';
import TeamMember2 from '../assets/images/2-guy.png';
import TeamMember3 from '../assets/images/3-guy.png';
import TeamMember4 from '../assets/images/4-guy.png';

export default function TeamMembers() {
  return (
    <Card radius="sm" shadow="none">
      <CardBody>
        <h2 className="font-semibold text-[18px] md:text-[20px] mb-2">Our Team</h2>
        <div className="flex items-center justify-center">
          <ScrollShadow orientation="horizontal" className="mx-auto flex">
            <div className="p-4 min-w-[230px]">
              <Image
                src={TeamMember1}
                alt="girl-team-work"
                className="rounded-full w-48 h-48 object-cover mx-auto mb-2"
              />
              <h3 className="text-18 font-medium text-center">Victor Ramirez</h3>
              <p className="text-center text-gray-600 text-14">CEO & Founder</p>
            </div>
            <div className="p-4 min-w-[230px]">
              <Image
                src={TeamMember2}
                alt="girl-team-work"
                className="rounded-full w-48 h-48 object-cover mx-auto mb-2"
              />
              <h3 className="text-18 font-medium text-center">Veronica Mendoza</h3>
              <p className="text-center text-gray-600 text-14">UI/UX Designer</p>
            </div>
            <div className="p-4 min-w-[230px]">
              <Image
                src={TeamMember3}
                alt="girl-team-work"
                className="rounded-full w-48 h-48 object-cover mx-auto mb-2"
              />
              <h3 className="text-18 font-medium text-center">Will Taylor</h3>
              <p className="text-center text-gray-600 text-14">Software Engineer</p>
            </div>
            <div className="p-4 min-w-[230px]">
              <Image
                src={TeamMember4}
                alt="girl-team-work"
                className="rounded-full w-48 h-48 object-cover mx-auto mb-2"
              />
              <h3 className="text-18 font-medium text-center">Ringo Lorenzo</h3>
              <p className="text-center text-gray-600 text-14">Sales Management</p>
            </div>
          </ScrollShadow>
        </div>
      </CardBody>
    </Card>
  );
}
