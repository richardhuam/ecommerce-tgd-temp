import React from 'react';

import Alert from '@/shared/components/ui/alert';
import Paper from '@/shared/components/ui/paper';
import { useWishlist } from '@/shared/contexts/wishlist.context';
import { useGetWishlist } from '@/shared/queries/wishlist/wishlist.query';

import WishlistTable from '../components/wishlist-table';

type WishlistProductSectionProps = {};

export default function WishlistProductSection({}: WishlistProductSectionProps) {
  const { page } = useWishlist();

  const { data: wishlist, isLoading } = useGetWishlist({ page });

  if (wishlist?.data.result.length === 0 && !isLoading) {
    return <Alert title="Your wishlist is empty" message="Add some products your wishlist" />;
  }

  return (
    <Paper>
      <WishlistTable />
    </Paper>
  );
}
