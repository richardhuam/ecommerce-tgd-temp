import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';

type WishlistProviderProps = {
  children: React.ReactNode;
};

export type WishlistProps = {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  onPageChange: (page: number) => void;
};

const WishlistContext = createContext(
  {} as {
    page: number;
    setPage: Dispatch<SetStateAction<number>>;
    onPageChange: (page: number) => void;
  },
);

export function WishlistProvider({ children }: WishlistProviderProps) {
  const [page, setPage] = useState<number>(1);

  function onPageChange(page: number) {
    setPage(page);
  }

  return (
    <WishlistContext.Provider
      value={{
        page,
        setPage,
        onPageChange,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);
