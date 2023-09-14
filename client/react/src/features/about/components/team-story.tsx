import { Card, CardBody } from '@nextui-org/react';

export default function TeamStory() {
  return (
    <Card radius="sm" shadow="none">
      <CardBody>
        <h2 className="font-semibold text-[18px] md:text-[20px] mb-2">Our Story</h2>
        <p className="text-gray-500 text-sm md:text-md lg:text-[16px] leading-6">
          Welcome to E-commerce, where passion for quality meets the convenience of online shopping. Our journey began
          with a simple vision: to curate a collection of products that redefine elegance and enhance your lifestyle. At
          E-commerce, we believe that every item you choose should reflect your taste and aspirations. Our team of
          experts scours the globe to bring you a carefully selected range of products that embody the perfect blend of
          artistry, craftsmanship, and functionality. Join us on this journey of discovery and indulgence. Let
          E-commerce be your companion as you explore a world of refined living and elevate your experiences. Indulge in
          elegance. Shop with ease. Elevate your lifestyle.
        </p>
      </CardBody>
    </Card>
  );
}
