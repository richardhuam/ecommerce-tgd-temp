import { UIConfig } from '@/config/ui.config';
import { ApexOptions } from 'apexcharts';
import { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

export default function DemoChart() {
  const [series] = useState([
    {
      name: 'series1',
      data: [10, 41, 35, 51, 49, 62, 69, 91, 148, 20, 92, 100],
    },
    {
      name: 'series2',
      data: [11, 32, 45, 32, 34, 52, 41, 35, 51, 49, 62, 60],
    },
  ]);

  const options: ApexOptions = {
    colors: [UIConfig().colors.primary, UIConfig().colors.secondary],
    chart: {
      height: 350,
      type: 'line',
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 4,
      curve: 'smooth',
    },
    markers: {
      size: 4,
      hover: {
        sizeOffset: 4,
      },
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    },
    tooltip: {
      x: {
        format: 'dd/MM/yy HH:mm',
      },
    },
  };

  return (
    <div id="chart">
      <ReactApexChart options={options} series={series} type="line" height={350} />
    </div>
  );
}
