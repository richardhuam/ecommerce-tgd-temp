import { Menu } from '@headlessui/react';
import { UseQueryResult } from '@tanstack/react-query';
import Link from 'next/link';
import React from 'react';
import { BiDislike, BiLike } from 'react-icons/bi';
import { BsFlag } from 'react-icons/bs';
import { IoEllipsisVertical } from 'react-icons/io5';

import Paginate from '@/shared/components/ui/paginate';
import StarRating from '@/shared/components/ui/star-rating';
import { IGetReviewsApiResponse } from '@/shared/services/reviews/review.service.types';
import { formatDate } from '@/shared/utils/formate-date';

type ProductReviewContentProps = {
  reviews: UseQueryResult<IGetReviewsApiResponse, unknown>;
  handleReviewPageChange: (page: number) => void;
};

export default function ProductReviewContent({ reviews, handleReviewPageChange }: ProductReviewContentProps) {
  return (
    <div>
      <h3 className="text-15 font-medium text-gray-700">All Reviews ({reviews.data?.data.result.length})</h3>
      {/* review 1 */}
      <div>
        {reviews.data?.data.result.map(item => {
          return (
            <div key={item._id} className="py-4">
              <div className="flex items-center justify-between">
                <h4 className="text-14 font-medium text-gray-700">
                  {item.author.firstName} {item.author.lastName}
                </h4>
                <p className="text-13 font-light text-gray-500">{formatDate(item.createdAt, 'DD MMM. YYYY')}</p>
              </div>
              <div className="mb-3">
                <StarRating ratingValue={item.rating} />
              </div>
              <div className="mb-3">
                <p className="text-14 md:text-15 text-gray-600">{item.comment ?? 'No comment.'}</p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center justify-start gap-4">
                  <button className="disabled:bg-gray-100 disabled:hover:text-gray-400 disabled:hover:border-gray-400 rounded-full px-3 h-8 border-1 inline-flex items-center border-gray-400 text-gray-400 text-13 gap-1 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-500 ease-in-out transition-colors duration-200">
                    Useful <BiLike className="text-17" /> ({item.likes})
                  </button>
                  <button className="disabled:bg-gray-100 disabled:hover:text-gray-400 disabled:hover:border-gray-400 rounded-full px-3 h-8 border-1 border-gray-400 text-gray-400 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-500 ease-in-out transition-colors duration-200">
                    <BiDislike className="text-17" />
                  </button>
                </div>
                <Menu as="div" className="relative flex items-center justify-center">
                  <Menu.Button className="text-[#CCCCCC] text-20">
                    <IoEllipsisVertical />
                  </Menu.Button>
                  <Menu.Items className="absolute -bottom-12 right-0 z-body-2">
                    <Menu.Item>
                      <Link
                        href="#"
                        className="bg-white flex items-center justify-center gap-2 border-1 px-6 py-2.5 text-15 text-gray-600 hover:text-gray-500 transition-colors"
                      >
                        <BsFlag /> Report
                      </Link>
                    </Menu.Item>
                  </Menu.Items>
                </Menu>
              </div>
            </div>
          );
        })}
        {reviews.data?.data.pagination && (
          <div className="mt-4 lg:mt-6">
            <Paginate onPageChange={handleReviewPageChange} pagination={reviews.data.data.pagination} />
          </div>
        )}
      </div>
    </div>
  );
}
