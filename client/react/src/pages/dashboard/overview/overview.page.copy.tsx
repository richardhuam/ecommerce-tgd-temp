import DemoChart from '@/features/demo/demo-chart';
import { Card, CardHeader, CardBody, Button } from '@nextui-org/react';
import { Users } from 'lucide-react';

type DashboardIndexPageProps = {};

export default function DashboardIndexPage({}: DashboardIndexPageProps) {
  return (
    <div className="space-y-4 lg:space-y-6">
      <div className="gap-4 lg:gap-6 grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
        <Card className="p-3 !shadow-card">
          <CardHeader className="pb-0 pt-2 flex-col items-start">
            <p className="text-lg">Today</p>
            <p className="text-sm text-default-500">Month: July</p>
            <h4 className="pt-2 font-bold tracking-wide text-2xl">$430,80</h4>
          </CardHeader>
          <CardBody className="p-3">
            <Button radius="sm" color="secondary" className="text-white w-auto">
              See Details
            </Button>
          </CardBody>
        </Card>
        <Card className="p-3 !shadow-card">
          <CardHeader className="pb-0 pt-2 flex-col items-start">
            <div className="flex items-center justify-start space-x-3">
              <p className="text-lg">Clients</p>
              <Users size={17} strokeWidth={1.9} />
            </div>
            <p className="text-sm text-default-500">Month: July</p>
            <h4 className="pt-2 font-bold tracking-wide text-2xl">35</h4>
          </CardHeader>
          <CardBody className="p-3">
            <Button radius="sm" color="secondary" className="text-white w-auto">
              See Details
            </Button>
          </CardBody>
        </Card>
        <Card className="p-3 !shadow-card">
          <CardHeader className="pb-0 pt-2 flex-col items-start">
            <p className="text-lg">Total Earnings</p>
            <p className="text-sm text-default-500">Month: July</p>
            <h4 className="pt-2 font-bold tracking-wide text-2xl">$430,80</h4>
          </CardHeader>
          <CardBody className="p-3">
            <Button radius="sm" color="secondary" className="text-white w-auto">
              See Details
            </Button>
          </CardBody>
        </Card>
      </div>
      <Card className="p-3 !shadow-card">
        <CardHeader className="pb-0 pt-2 flex-col items-start">
          <p className="text-lg">Revenue Updates</p>
        </CardHeader>
        <CardBody className="p-3">
          <DemoChart />
        </CardBody>
      </Card>
    </div>
  );
}
