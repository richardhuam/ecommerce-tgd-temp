import Image from 'next/image';
import React, { FC } from 'react';

interface AvatarPlaceholderProps {
  name: string;
}

interface AvatarProps {
  image: string;
}

export const AvatarPlaceHolder: FC<AvatarPlaceholderProps> = ({ name = 'NoName' }) => {
  return (
    <div className="bg-primary-100 text-primary-700 rounded-full h-9 w-9 flex items-center justify-center">
      {name && name.charAt(0).toUpperCase()}
    </div>
  );
};

export const Avatar: FC<AvatarProps> = ({ image }) => {
  return (
    <div className="relative w-9 h-9">
      <Image
        src={
          image ??
          'https://img.freepik.com/free-vector/cheerful-cute-girl-character-hand-drawn-cartoon-art-illustration_56104-968.jpg?w=1480&t=st=1680401168~exp=1680401768~hmac=c03b3a516d2a50999da39c4d23ea24fa5febc5bdab3fa4ba160455d3b6d3b766'
        }
        alt="cute-girl"
        fill
        className="rounded-full"
      />
    </div>
  );
};
