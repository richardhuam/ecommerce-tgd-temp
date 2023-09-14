import { ApexOptions } from 'apexcharts';
import { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

type AreaChartWithNoLabelsProps = {
  color: string;
};

export default function AreaChartWithNoLabels({ color }: AreaChartWithNoLabelsProps) {
  const [series] = useState([
    {
      name: 'series1',
      data: [3, 4],
    },
  ]);

  const options: ApexOptions = {
    colors: [color],
    chart: {
      height: 70,
      type: 'area',
      zoom: {
        enabled: false,
      },
      toolbar: {
        // Hamburger menu at top
        show: false,
      },
      sparkline: {
        enabled: true,
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
      size: 0,
      hover: {
        sizeOffset: 0,
      },
    },
    grid: {
      show: false,
    },
    legend: {
      show: false,
    },
    yaxis: {
      show: false,
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      crosshairs: {
        show: false,
      },
    },
    tooltip: {
      enabled: false,
    },
    xaxis: {
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
  };

  return (
    <div id="chart">
      <ReactApexChart options={options} series={series} type="area" height={70} />
    </div>
  );
}
