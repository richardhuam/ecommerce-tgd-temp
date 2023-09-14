import { Listbox, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { AiOutlineCheck } from 'react-icons/ai';
import { TbSelector } from 'react-icons/tb';

type SelectProps<T> = {
  options: T[];
  data: any;
  keyValue: any;
  onChange: (value: any) => void;
  keyLabel: keyof T;
};

export default function Select<T extends Record<string, any>>({ options, data, keyValue, onChange, keyLabel }: SelectProps<T>) {
  return (
    <>
      <Listbox value={data} onChange={onChange}>
        <div className="relative mt-1 ">
          <Listbox.Button className="relative w-full text-14 cursor-default border-gray-300 text-gray-800 outline-primary rounded-md border-1 py-2.5 px-3.5 hover:border-black text-left">
            <span className="block truncate">{data?.[keyValue] || 'Select an option'}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <TbSelector className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </span>
          </Listbox.Button>
          <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
            <Listbox.Options className="z-body-2 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {options.map((option, idx) => (
                <Listbox.Option
                  key={idx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-primary-100 text-primary-900' : 'text-gray-900'}`
                  }
                  value={option}
                >
                  {({ selected }) => (
                    <>
                      <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>{option[keyLabel]}</span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary-600">
                          <AiOutlineCheck className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </>
  );
}
