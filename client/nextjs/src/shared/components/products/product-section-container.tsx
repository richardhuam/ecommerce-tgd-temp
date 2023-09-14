import Link from 'next/link';
import React, { ReactNode } from 'react';

interface ProductSectionContainerProps {
  children: ReactNode;
  title: string;
  url?: string;
  container?: boolean;
  disableRelative?: boolean;
}

export default function ProductSectionContainer({
  children,
  title,
  url,
  container = true,
  disableRelative = false,
}: ProductSectionContainerProps) {
  return (
    <section className={`${container ? 'main-container' : ''} ${!disableRelative ? 'relative' : ''}`}>
      <div className="mb-2 flex items-center justify-start gap-3">
        <h2 className="font-nunito text-17 md:text-18 lg::text-20 font-semibold uppercase text-gray-700">{title}</h2>
        {url && (
          <Link href={url} className="text-gray-600 text-14 hover:underline">
            Watch more
          </Link>
        )}
      </div>
      {children}
    </section>
  );
}
