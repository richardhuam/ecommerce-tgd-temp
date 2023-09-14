import { STORE_ROUTES } from '@/config/routes.config';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, Image } from '@nextui-org/react';
import { ICategory } from '../../category.interface';
import { categoryImageUrlResolver } from '../../category.utils';

export default function CategoryCard(props: ICategory) {
  return (
    <Link to={STORE_ROUTES.PRODUCTS_CATEGORY_URL(props._id)}>
      <Card radius="sm" shadow="sm" className="group md:hover:-translate-y-1 ease-in-out transition-all duration-300">
        <CardBody className="p-0">
          <div className="overflow-hidden flex h-[155px] md:h-[170px] lg:h-[190px] xl:h-[195px]">
            <div className="flex w-full flex-col items-start justify-between py-4 p-4 2xl:py-6 2xl:p-6">
              <h2 className="text-16 md:text-17 md:tracking-wider uppercase text-gray-700 md:line-clamp-3 line-clamp-2">
                {props.name}
              </h2>
              <Button radius="sm" variant="bordered">
                Watch Products
              </Button>
            </div>
            <Image
              src={categoryImageUrlResolver(props.image)}
              alt="banner-card"
              className="object-cover object-left w-[190px] lg:w-[250px] h-full"
            />
          </div>
        </CardBody>
      </Card>
    </Link>
  );
}
