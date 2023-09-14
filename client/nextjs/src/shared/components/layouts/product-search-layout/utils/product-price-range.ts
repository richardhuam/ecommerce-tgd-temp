type IPriceRange = Array<{
  from: number;
  to: number | null;
}>;

export const priceRange: IPriceRange = [
  {
    from: 0,
    to: 100,
  },
  {
    from: 100,
    to: 500,
  },
  {
    from: 500,
    to: 1000,
  },
  {
    from: 1000,
    to: null,
  },
];
