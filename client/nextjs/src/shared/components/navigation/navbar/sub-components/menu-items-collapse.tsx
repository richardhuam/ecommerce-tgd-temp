import { Popover, Transition } from '@headlessui/react';
import Image from 'next/image';
import Link from 'next/link';
import React, { Fragment } from 'react';
import { HiOutlineChevronDown } from 'react-icons/hi';

import { routes } from '@/config/routes';
import Button from '@/shared/components/ui/button';
import { useGetAllCategories } from '@/shared/queries/category/category.query';
import { envService } from '@/shared/services/env/env.service';
import { getProductImageUrl } from '@/shared/utils/get-product-image-url';

interface MenuItemsCollapseProps {}

const MenuItemsCollapse: React.FC<MenuItemsCollapseProps> = () => {
  const { data: categories } = useGetAllCategories();
  return (
    <li>
      <Popover className="relative">
        {({ open, close }) => (
          <>
            <Popover.Button
              className={`
                ${open ? 'text-primary' : ''}
                group px-3 py-5 text-gray-800 hover:text-primary flex items-center justify-center gap-2 outline-none`}
            >
              <span>All Categories</span>
              <HiOutlineChevronDown />
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
              <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-screen max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl">
                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="relative grid gap-8 bg-white p-7 lg:grid-cols-2">
                    {categories?.data.map(cat => (
                      <Link
                        key={cat._id}
                        href={routes.productCategoriesUrl(cat._id)}
                        onClick={() => close()}
                        className="group -m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                      >
                        <div className="w-100 h-100 cursor-pointer relative">
                          <div className="w-100 h-100">
                            <Image
                              src={getProductImageUrl({ productImage: cat.image, pathUrl: `${envService().productCategoryImagesUrl}` })}
                              alt={`product-${cat.name}`}
                              fill
                              priority
                              className="object-contain"
                            />
                          </div>
                        </div>
                        <div className="ml-4">
                          <p className="text-14 font-medium text-gray-900 group-hover:text-primary-800">{cat.name}</p>
                          <p className="text-13 text-gray-700 font-light line-clamp-3">{cat.description}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <div className="bg-white p-4 flex items-center justify-end">
                    <Button onClick={() => close()}>
                      Close <span className="ml-2 font-semibold">✕</span>
                    </Button>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </li>
  );
};

export default MenuItemsCollapse;
