import { Spinner } from '@nextui-org/react';

type FullScreenLoaderProps = {
  message?: string;
};

export default function FullScreenLoader({ message = 'Loading...' }: FullScreenLoaderProps) {
  return (
    <div className="flex items-center min-h-screen justify-center">
      <Spinner label={message} color="warning" />
    </div>
  );
}
