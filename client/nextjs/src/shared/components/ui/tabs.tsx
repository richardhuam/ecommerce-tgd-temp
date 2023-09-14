import { Tab } from '@headlessui/react';
import React, { Fragment } from 'react';

export type ITabsData = {
  label: string;
  content: React.ReactNode;
};

type TabsProps = {
  tabData: ITabsData[];
};

const fallbackData: ITabsData[] = [
  {
    label: 'No label 1',
    content: <div>No content 1</div>,
  },
  {
    label: 'No label 2',
    content: <div>No content 2</div>,
  },
];

export default function Tabs({ tabData = fallbackData }: TabsProps) {
  return (
    <div>
      <Tab.Group defaultIndex={0}>
        <Tab.List className="space-x-4">
          {tabData.map((item, idx) => {
            return (
              <Tab key={idx} as={Fragment}>
                {({ selected }) => (
                  <button
                    className={`border-b-2 py-2 text-14 hover:border-primary transition-colors ease-in-out outline-none ${
                      selected ? 'border-primary font-medium text-primary' : 'border-gray-100'
                    }`}
                  >
                    {item.label}
                  </button>
                )}
              </Tab>
            );
          })}
        </Tab.List>
        <Tab.Panels>
          {tabData.map((item, idx) => {
            return (
              <Tab.Panel key={idx} className="py-4">
                {item.content}
              </Tab.Panel>
            );
          })}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
