import PaypalSvg from './assets/paypal.svg';
import MasterCardSvg from './assets/master-card.svg';
import VisaSvg from './assets/visa.svg';
import { ArrowDownCircle, CheckCircle, PlusCircle, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { STORE_ROUTES } from '@/config/routes.config';
import { Image } from '@nextui-org/react';

type SecurePaymentGridProps = {};

export default function SecurePaymentGrid({}: SecurePaymentGridProps) {
  return (
    <div className="flex items-center justify-center">
      <div className="w-full">
        <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 select-none">
          <div className="col-span-1 shadow-md shadow-gray-200 flex items-center justify-start gap-3 border-primary bg-white p-3 lg:p-4 lg:border-l-4">
            <CheckCircle className="text-primary" />
            <div>
              <h2 className=" text-gray-700 xs:text-15">Secure Payments</h2>
              <p className="text-13 font-light text-gray-400">with e-commerce</p>
            </div>
          </div>
          <div className="col-span-1 shadow-md shadow-gray-200 flex items-center justify-start gap-3 bg-white p-3 lg:p-4 ">
            <ShieldCheck className="text-primary" />
            <div>
              <h2 className=" text-gray-700 text-15">User Protection</h2>
              <p className="text-13 font-light text-primary">read more...</p>
            </div>
          </div>
          <div className="hidden col-span-1 shadow-md shadow-gray-200 lg:flex items-center justify-evenly bg-white p-3 lg:p-4  ">
            <Image src={PaypalSvg} alt="paypal" className="w-[100px]" />
            <Image src={VisaSvg} alt="visa" className="w-[60px]" />
            <Image src={MasterCardSvg} alt="master-card" className="w-[50px]" />
          </div>
          <div className="hidden col-span-1 xl:flex shadow-md shadow-gray-200 items-center justify-start gap-3 bg-white p-3 lg:p-4 ">
            <PlusCircle className="text-primary" />

            <div>
              <h2 className="text-gray-700 text-15">More payment methods</h2>
              <p className="text-13 font-light text-primary">read more...</p>
            </div>
          </div>
        </div>
        <div className="flex xl:hidden mt-3">
          <div className="flex items-center justify-center w-full">
            <Link
              to={STORE_ROUTES.HOME}
              className="gap-2 w-44 px-4 text-14 hover:text-primary underline font-medium flex items-center justify-center"
            >
              More details
              <span className="text-primary text-lg">
                <ArrowDownCircle />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
