import React, { useMemo } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, TooltipItem } from 'chart.js';
import { Pie } from 'react-chartjs-2';

import styles from "../../styles/components/chart/chart.module.scss";

import { formatToCurrencyBRL, parseCurrencyString } from '@/utils';
import { Bill } from '@/dto/billDTO';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const groupByCategory = (data: Bill[]) => {
  const result = data.reduce((acc, bill) => {
    if (!acc[bill.category]) {
      acc[bill.category] = parseCurrencyString(bill.value);
      return acc;
    }

    acc[bill.category] += parseCurrencyString(bill.value);
    return acc;
  }, {} as Record<string, number>);

  return result;
}

export default function ExpenseByMonth({ data }: { data: Bill[]}) {
  const expenses = useMemo(() => groupByCategory(data), [data]);

  const dataChart = {
    labels: Object.keys(expenses),
    datasets: [{
      label: "",
      data: Object.values(expenses),
      backgroundColor: ["#293038", "#1C2126"],
      borderColor: "#757575",
      borderWidth: 1,
    }]
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'left' as const,
        labels: {
          color: "#9CABBA",
          font: {
            size: 12,
          }
        }
      },
      tooltip: {
        callbacks: {
          label: function(tooltipItem: TooltipItem<'pie'>) {
            return ` ${formatToCurrencyBRL(Number(tooltipItem.raw))}`;
          }
        }
      }
    }
  };

  return (
    <div className={styles.chart}>
      <div className={styles.container}>
        <h1 className='title'>Gasto por categoria</h1>
        <Pie data={dataChart} options={options} />
      </div>
    </div>
  );
}