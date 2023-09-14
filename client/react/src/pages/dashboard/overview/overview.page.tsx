import { Card, CardHeader, CardBody, Button } from '@nextui-org/react';
import { DollarSign, ShoppingBag } from 'lucide-react';
import dayjs from 'dayjs';
import { formatNumberWithLeadingZeros } from '@/utils/number-formatting.utils';
import { UIConfig } from '@/config/ui.config';
import DemoChart from '@/features/demo/demo-chart';
import AreaChartWithNoLabels from './components/charts/area-chart-with-no-labels';

type DashboardIndexPageProps = {};

export default function DashboardIndexPage({}: DashboardIndexPageProps) {
  return (
    <div className="space-y-4 lg:space-y-6">
      <div className="gap-4 lg:gap-6 grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
        <Card className="p-3 !shadow-card">
          <CardHeader className="p-3 flex items-start justify-between">
            <div>
              <p className="text-lg">Total Earnings</p>
              <p className="text-sm text-default-500">{dayjs(new Date()).format('MMM, DD - YYYY')}</p>
              <h4 className="pt-2 font-bold tracking-wide text-2xl">$430,80</h4>
            </div>
            <div>
              <Button isIconOnly color="secondary" aria-label="Today" className="text-white">
                <DollarSign />
              </Button>
            </div>
          </CardHeader>
          <CardBody className="px-3 py-0">
            <div id="totalEarnings" className="rounded-b-lg overflow-hidden">
              <AreaChartWithNoLabels color={UIConfig().colors.secondary} />
            </div>
          </CardBody>
        </Card>
        <Card className="p-3 !shadow-card">
          <CardHeader className="p-3 flex items-start justify-between">
            <div>
              <p className="text-lg">Paid Invoices</p>
              <p className="text-sm text-default-500">{dayjs(new Date()).format('MMM, DD - YYYY')}</p>
              <h4 className="pt-2 font-bold tracking-wide text-2xl">{formatNumberWithLeadingZeros(32, 2)}</h4>
            </div>
            <div>
              <Button isIconOnly color="success" aria-label="Today" className="text-white">
                <ShoppingBag />
              </Button>
            </div>
          </CardHeader>
          <CardBody className="px-3 py-0">
            <div id="paidInvoices" className="rounded-b-lg overflow-hidden">
              <AreaChartWithNoLabels color={UIConfig().colors.success} />
            </div>
          </CardBody>
        </Card>
        <Card className="p-3 !shadow-card">
          <CardHeader className="p-3 flex items-start justify-between">
            <div>
              <p className="text-lg">Unpaid Invoices</p>
              <p className="text-sm text-default-500">{dayjs(new Date()).format('MMM, DD - YYYY')}</p>
              <h4 className="pt-2 font-bold tracking-wide text-2xl">{formatNumberWithLeadingZeros(3, 2)}</h4>
            </div>
            <div>
              <Button isIconOnly color="danger" aria-label="Today" className="text-white">
                <ShoppingBag />
              </Button>
            </div>
          </CardHeader>
          <CardBody className="px-3 py-0">
            <div id="unpaidInvoices" className="rounded-b-lg overflow-hidden">
              <AreaChartWithNoLabels color={UIConfig().colors.danger} />
            </div>
          </CardBody>
        </Card>
        <Card className="p-3 !shadow-card">
          <CardHeader className="p-3 flex items-start justify-between">
            <div>
              <p className="text-lg">Total Invoices</p>
              <p className="text-sm text-default-500">{dayjs(new Date()).format('MMM, DD - YYYY')}</p>
              <h4 className="pt-2 font-bold tracking-wide text-2xl">{formatNumberWithLeadingZeros(34, 2)}</h4>
            </div>
            <div>
              <Button isIconOnly color="primary" aria-label="Today" className="text-white">
                <ShoppingBag />
              </Button>
            </div>
          </CardHeader>
          <CardBody className="px-3 py-0">
            <div id="totalInvoices" className="rounded-b-lg overflow-hidden">
              <AreaChartWithNoLabels color={UIConfig().colors.primary} />
            </div>
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
