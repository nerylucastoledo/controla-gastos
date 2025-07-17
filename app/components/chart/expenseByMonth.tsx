import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { TooltipItem } from 'chart.js';

import bill from '@/actions/bill';

import styles from "../../styles/components/chart/chart.module.scss";

import { useDate } from '@/context/date-context';
import { BillByYearDTO } from '@/app/dto/bill';
import { formatToCurrencyBRL } from '@/app/utils';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const handleTooltip = (value: number) => {
  const referenceValue = 6800;
  let trend = "";

  if (Number(value) > referenceValue) {
    trend = " ↑";
  } else {
    trend = " ↓";
  }

  return ` ${formatToCurrencyBRL(value)}${trend}`;
}

export default function ExpenseByMonth() {
  const [data, setData] = useState<BillByYearDTO[] | null>(null);

  const { date } = useDate();

  useEffect(() => {
    const getData = async () => {
      const response = await bill(`year/${date.year}`);
      setData(response.data);
    };

    getData();
  }, [date]);

  const dataChart = {
    labels: data?.map(item => item.month.substring(0, 3)),
    datasets: [{
      label: "",
      data: data?.map(item => item.value),
      backgroundColor: "#293038",
      borderColor: "#75757",
      borderWidth: 1,
      categoryPercentage: 0.8,
      barPercentage: 0.8,
    }]
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value: number | string) {
            return formatToCurrencyBRL(Number(value));
          },
          color: "#9CABBA"
        },
      },
      x: {
        ticks: {
          color: "#9CABBA"
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(context: TooltipItem<'bar'>) {
            return handleTooltip(Number(context.raw));
          }
        }
      }
    }
  };

  return (
    <div className={styles.chart}>
      <div className={styles.container}>
        <h1 className='title'>Gasto por mês</h1>

        <Bar data={dataChart} options={options} />
      </div>
    </div>
  );
}