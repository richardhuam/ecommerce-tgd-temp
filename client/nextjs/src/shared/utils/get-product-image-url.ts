type GetProductImageUrlProps = {
  productImage: string;
  pathUrl: string;
};

export const getProductImageUrl = ({ pathUrl, productImage }: GetProductImageUrlProps) => {
  return `${pathUrl}/${productImage}`;
};
