import Link from 'next/link';
import React, { FC } from 'react';
import { BsFacebook, BsInstagram, BsTwitter } from 'react-icons/bs';

import Logo from '../../ui/logo';

const Footer: FC = () => {
  return (
    <footer className="bg-white mt-6 md:mt-10 py-16">
      <div className="main-container">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col items-start justify-start gap-2 pr-4 pb-4 lg:pb-0">
            <Logo />
            <p className=" text-13 text-gray-500 md:text-14">
              Welcome to E-commerce, your gateway to a universe of curated elegance and convenience
            </p>
          </div>
          <div className="flex flex-col items-start justify-start gap-2 pr-4">
            <h1 className=" text-lg font-semibold text-gray-700">Stay connected</h1>
            <ul className="w-full">
              <li className=" text-13 text-gray-500 md:text-14">
                <Link href="/" className="flex items-center justify-start gap-2 hover:text-gray-400">
                  <BsFacebook />
                  Facebook
                </Link>
              </li>
              <li className=" text-13 text-gray-500 md:text-14">
                <Link href="/" className="flex items-center justify-start gap-2 hover:text-gray-400">
                  <BsTwitter />
                  Twitter
                </Link>
              </li>
              <li className=" text-13 text-gray-500 md:text-14">
                <Link href="/" className="flex items-center justify-start gap-2 hover:text-gray-400">
                  <BsInstagram />
                  Instagram
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col items-start justify-start gap-2 pr-4">
            <h1 className=" text-lg font-semibold text-gray-700">About Us</h1>
            <ul>
              <li className=" text-13 text-gray-500 md:text-14">
                <Link href="/" className="hover:text-gray-400">
                  Our goal
                </Link>
              </li>
              <li className=" text-13 text-gray-500 md:text-14">
                <Link href="/" className="hover:text-gray-400">
                  Entities
                </Link>
              </li>
              <li className=" text-13 text-gray-500 md:text-14">
                <Link href="/" className="hover:text-gray-400">
                  Work with us
                </Link>
              </li>
              <li className=" text-13 text-gray-500 md:text-14">
                <Link href="/" className="hover:text-gray-400">
                  Join us
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <div className="flex flex-col items-start justify-start gap-2 pr-4">
              <h1 className=" text-lg font-semibold text-gray-700">Help & Contact</h1>
              <ul>
                <li className=" text-13 text-gray-500 md:text-14">
                  <Link href="/" className="hover:text-gray-400">
                    Messenger
                  </Link>
                </li>
                <li className=" text-13 text-gray-500 md:text-14">
                  <Link href="/" className="hover:text-gray-400">
                    Help
                  </Link>
                </li>
              </ul>
            </div>
            <div className="mt-4 flex flex-col items-start justify-start gap-2 pr-4">
              <h1 className=" text-lg font-semibold text-gray-700">Partners</h1>
              <ul>
                <li className=" text-13 text-gray-500 md:text-14">
                  <Link href="/" className="hover:text-gray-400">
                    Flimsokl
                  </Link>
                </li>
                <li className=" text-13 text-gray-500 md:text-14">
                  <Link href="/" className="hover:text-gray-400">
                    Steventh
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
