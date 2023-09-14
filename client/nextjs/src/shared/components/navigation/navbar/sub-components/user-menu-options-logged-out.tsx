import { Popover, Transition } from '@headlessui/react';
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import { RiArrowDownSFill, RiUserSmileLine } from 'react-icons/ri';

import { loggedOutMenuLinks } from '../utils/menu-links';

const UserMenuOptionsLoggedOut = () => {
  const router = useRouter();

  return (
    <>
      <Popover className="relative">
        {({ open, close }) => (
          <>
            <Popover.Button
              className={`
              ${open ? '' : 'text-opacity-90'}
              hidden lg:flex items-center justify-center outline-none`}
            >
              <RiUserSmileLine className="text-24 text-gray-600" />
              <RiArrowDownSFill className="text-20 text-gray-600" />
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute top-full right-0 z-10 mt-8">
                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="bg-white w-200 border-gray-100">
                    {loggedOutMenuLinks.map(item => (
                      <button
                        key={item.title}
                        onClick={() => {
                          router.push(item.path);
                          close();
                        }}
                        className="items-center justify-start gap-2 flex py-3 px-4 text-15 hover:text-primary-800 transition-colors w-full"
                      >
                        <span className="text-18">{item.icon}</span>
                        {item.title}
                      </button>
                    ))}
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </>
  );
};

export default UserMenuOptionsLoggedOut;
