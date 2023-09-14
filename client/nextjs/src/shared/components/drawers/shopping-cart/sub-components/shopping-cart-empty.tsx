import React from 'react';
import { BsCart2 } from 'react-icons/bs';

import { sizeConfig } from '@/config/sizing';

const ShoppingCartEmpty = () => {
  return (
    <div
      className=" w-full flex items-center justify-center overflow-y-scroll"
      /* style={{ minHeight: 'calc(100vh - 210px)' }} */
      style={{ minHeight: `calc(100vh - ${sizeConfig().cartDrawer.header + sizeConfig().cartDrawer.footer}px)` }}
    >
      <div className="flex items-center justify-center flex-col space-y-3">
        <span>
          <BsCart2 className="w-40 h-40 text-gray-300" />
        </span>
        <p className="text-16 lg:text-18 font-medium text-gray-400 text-center">Your shopping cart is empty</p>
      </div>
    </div>
  );
};

export default ShoppingCartEmpty;
