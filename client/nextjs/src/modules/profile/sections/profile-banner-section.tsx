import Image from 'next/image';
import React, { useState } from 'react';
import { FiFacebook, FiTwitter, FiYoutube } from 'react-icons/fi';
import { GoVerified } from 'react-icons/go';

import BannerPlaceholder from '@/assets/images/banner-placeholder.jpg';
import Button from '@/shared/components/ui/button';
import Paper from '@/shared/components/ui/paper';
import { useAuth } from '@/shared/contexts/auth.context';
import { getRegisteredDays } from '@/shared/utils/get-registered-days';

import EditProfileFormModal from '../components/edit-profile-form-modal';

type ProfileSectionProps = {};

export default function ProfileBannerSection({}: ProfileSectionProps) {
  const { me } = useAuth();
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState<boolean>(false);

  function toggleEditProfileModal() {
    setIsEditProfileModalOpen(prevState => !prevState);
  }

  return (
    <>
      <Paper>
        <div>
          <Image priority src={BannerPlaceholder} alt="profile-picture" className="h-64 w-full object-cover md:h-96" />
        </div>
        <div className="relative p-4 py-6 xl:py-9">
          <div className="grid grid-cols-3 space-y-2.5 pt-20 xl:space-y-0 xl:pt-0">
            <div className="col-span-3 flex items-center justify-center tracking-wide xl:col-span-1">
              <div className="flex flex-grow flex-col items-center justify-center">
                <div className="flex w-full items-center justify-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <h4 className="">Online</h4>
                </div>
                <h5 className="w-full text-center font-medium">My Status</h5>
              </div>
              <div className="flex flex-grow flex-col items-center justify-center gap-0.5">
                <h4 className="">{me?.createdAt ? getRegisteredDays(me.createdAt) : null}</h4>
                <h5 className="w-full text-center font-medium">Days</h5>
              </div>
              <div className="flex flex-grow flex-col items-center justify-center gap-0.5">
                <span className="text-24 text-[#1E4DB7]">
                  <GoVerified />
                </span>
                <h5 className="w-full text-center font-medium">Verified</h5>
              </div>
            </div>
            <div className="col-span-3 xl:col-span-1"></div>
            <div className="col-span-3 xl:col-span-1">
              <div className="flex h-full items-center justify-start md:justify-center xl:justify-end">
                <div className="inline-flex flex-wrap gap-2">
                  <Button variant="custom" className="bg-[#3762D2] w-[45px] text-white">
                    <FiFacebook className="text-lg" />
                  </Button>
                  <Button variant="custom" className="bg-[#1ABBFF] w-[45px] text-white">
                    <FiTwitter className="text-lg" />
                  </Button>
                  <Button variant="custom" className="bg-[#F20000] w-[45px] text-white">
                    <FiYoutube className="text-lg" />
                  </Button>
                  <Button onClick={() => setIsEditProfileModalOpen(true)}>Edit Profile</Button>
                </div>
              </div>
            </div>
          </div>

          <div className="inset-top-center w-full xl:w-auto">
            {/* Avatar gradient */}
            <div className="flex flex-col items-center justify-center space-y-0.5">
              <div className="rounded-full bg-white p-1">
                <div className="flex items-center justify-center rounded-full bg-gradient-to-r from-primary via-blue-500 to-purple-500 p-1">
                  <div className="bg-white text-black text-2xl font-medium rounded-full h-12 w-12 flex items-center justify-center">
                    {me.firstName && me.firstName.charAt(0).toUpperCase()}
                  </div>
                </div>
              </div>
              <div className="text-center">
                <p className="text-20 font-medium">
                  {me.firstName} {me.lastName}
                </p>
                <p className="text-light text-sm text-gray-500">{me.role}</p>
              </div>
            </div>
          </div>
        </div>
      </Paper>
      <EditProfileFormModal isOpen={isEditProfileModalOpen} toggleModal={toggleEditProfileModal} />
    </>
  );
}
