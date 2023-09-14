import { RadioGroup } from '@headlessui/react';
import { RiCheckboxCircleLine } from 'react-icons/ri';

import { IPaymentMethod, paymentMethodsOptions } from '@/shared/constants/payment-method';

type PaymentsMethodRadioGroupProps = {
  onChange: (...event: any[]) => void;
  setSelectedPaymentMethod: React.Dispatch<React.SetStateAction<IPaymentMethod>>;
  selectedPaymentMethod: IPaymentMethod;
};

export default function PaymentsMethodRadioGroup({
  onChange,
  selectedPaymentMethod,
  setSelectedPaymentMethod,
}: PaymentsMethodRadioGroupProps) {
  function handleChange(e: any) {
    onChange(e);
    setSelectedPaymentMethod(e);
  }

  return (
    <RadioGroup value={selectedPaymentMethod} onChange={handleChange}>
      <RadioGroup.Label className="sr-only">Payment Method</RadioGroup.Label>
      <div className="space-y-2">
        {paymentMethodsOptions.map(payment => (
          <RadioGroup.Option
            key={payment.name}
            value={payment}
            disabled={!payment.isEnabled}
            className={({ checked }) =>
              `${
                checked
                  ? ' border-primary-700 cursor-pointer'
                  : `${payment.isEnabled ? 'border-gray-300' : 'bg-gray-100 cursor-not-allowed'}`
              } border-1 relative flex  rounded-lg px-5 py-4 focus:outline-none`
            }
          >
            {({ checked }) => (
              <>
                <div className="flex w-full items-center justify-between">
                  <div className="flex items-center">
                    <div className="text-sm">
                      <RadioGroup.Label as="p" className={`font-medium 'text-gray-900`}>
                        {payment.name}
                      </RadioGroup.Label>
                      <RadioGroup.Description as="span" className={`inline text-gray-500`}>
                        <span>{payment.description}</span>
                      </RadioGroup.Description>
                    </div>
                  </div>
                  {checked && <RiCheckboxCircleLine className="h-6 w-6 text-primary-700" />}
                </div>
              </>
            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  );
}
