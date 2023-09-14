import { Button, Input } from '@nextui-org/react';

export default function ProductSearchInput() {
  return (
    <form onSubmit={() => {}} className="w-full">
      <div className="flex items-center justify-center w-full gap-2">
        <Input size="sm" type="email" variant="bordered" label="Search..." />
        <Button type="submit" color="primary">
          Search
        </Button>
      </div>
    </form>
  );
}
