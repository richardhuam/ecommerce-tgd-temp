import React from 'react';
import { AiOutlineCalendar, AiOutlinePhone, AiOutlineUser } from 'react-icons/ai';
import { HiOutlineShieldCheck } from 'react-icons/hi';
import { RiChatSmile2Line } from 'react-icons/ri';
import { SlLocationPin } from 'react-icons/sl';
import { VscGlobe, VscMail, VscVerified } from 'react-icons/vsc';

import Paper from '@/shared/components/ui/paper';
import { useAuth } from '@/shared/contexts/auth.context';
import { formatDate } from '@/shared/utils/formate-date';

type AboutMeSectionProps = {};

export default function AboutMeSection({}: AboutMeSectionProps) {
  const { me } = useAuth();
  return (
    <>
      <div className="grid grid-cols-6 gap-6 text-15">
        <div className="col-span-6 xl:col-span-2">
          <Paper className="space-y-2">
            <h2 className="font-medium">Introduction</h2>
            <p className="font-light text-gray-700">
              This is a profile section where you will be able to view and edit your profile information
            </p>
            <div className="flex flex-col space-y-2">
              <div className="flex gap-2">
                <p className="text-center text-22 text-gray-400">
                  <VscVerified />
                </p>
                <div className="w-full">
                  <h5 className="text-gray-500">
                    Joined At:&nbsp;
                    <span className="font-medium text-black">{formatDate(me.createdAt, 'MMMM DD, YYYY')}</span>
                  </h5>
                </div>
              </div>

              <div className="flex gap-2">
                <p className="text-center text-22 text-gray-400">
                  <VscGlobe />
                </p>
                <div className="w-full">
                  <h5 className="text-gray-500">
                    Website:&nbsp;
                    <span className="font-medium text-black">-</span>
                  </h5>
                </div>
              </div>
              <div className="flex gap-2">
                <p className="text-center text-22 text-gray-400">
                  <SlLocationPin />
                </p>
                <div className="w-full">
                  <h5 className="text-gray-500">
                    From:&nbsp;
                    <span className="font-medium text-black">{me?.address?.country.name || '-'}</span>
                  </h5>
                </div>
              </div>
            </div>
          </Paper>
        </div>
        <div className="col-span-6 xl:col-span-4">
          <Paper className="space-y-2">
            <h2 className="font-medium">User Details</h2>
            <p className="font-light text-gray-500">You can edit your profile by clicking in the upper button</p>
            <div className="flex flex-col space-y-2">
              <div className="flex gap-2">
                <p className="text-center text-22 text-gray-400">
                  <VscMail />
                </p>
                <div className="w-full">
                  <h5 className="text-gray-500">
                    Email:&nbsp;
                    <span className="font-medium text-black">{me.email}</span>
                  </h5>
                </div>
              </div>
              <div className="flex gap-2">
                <p className="text-center text-22 text-gray-400">
                  <AiOutlineUser />
                </p>
                <div className="w-full">
                  <h5 className="text-gray-500">
                    Full Name:&nbsp;
                    <span className="font-medium text-black">
                      {me.firstName} {me.lastName}
                    </span>
                  </h5>
                </div>
              </div>
              <div className="flex gap-2">
                <p className="text-center text-22 text-gray-400">
                  <HiOutlineShieldCheck />
                </p>
                <div className="w-full">
                  <h5 className="text-gray-500">
                    Login Method:&nbsp;
                    <span className="font-medium text-black">{me.loginMethod}</span>
                  </h5>
                </div>
              </div>
              <div className="flex gap-2">
                <p className="text-center text-22 text-gray-400">
                  <AiOutlineCalendar />
                </p>
                <div className="w-full">
                  <h5 className="text-gray-500">
                    Date of Birth:&nbsp;
                    {me?.dateOfBirth ? (
                      <span className="font-medium text-black">{formatDate(me.dateOfBirth, 'MMMM DD, YYYY')}</span>
                    ) : (
                      <span className="font-medium text-black">-</span>
                    )}
                  </h5>
                </div>
              </div>
              <div className="flex gap-2">
                <p className="text-center text-22 text-gray-400">
                  <AiOutlinePhone />
                </p>
                <div className="w-full">
                  <h5 className="text-gray-500">
                    Phone:&nbsp;
                    {me?.phone ? (
                      <span className="font-medium text-black">{me.phone}</span>
                    ) : (
                      <span className="font-medium text-black">-</span>
                    )}
                  </h5>
                </div>
              </div>
              <div className="flex gap-2">
                <p className="text-center text-22 text-gray-400">
                  <RiChatSmile2Line />
                </p>
                <div className="w-full">
                  <h5 className="text-gray-500">
                    Status:&nbsp;
                    <span className="font-medium text-black">{me.status}</span>
                  </h5>
                </div>
              </div>
            </div>
          </Paper>
        </div>
      </div>
    </>
  );
}
