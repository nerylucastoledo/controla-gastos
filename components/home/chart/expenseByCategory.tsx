import React, { useMemo } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, TooltipItem } from 'chart.js';
import { Pie } from 'react-chartjs-2';

import styles from "../../../styles/components/chart/chart.module.scss";

import { formatToCurrencyBRL, parseCurrencyString } from '@/utils';
import { BillOutput } from '@/dto/billDTO';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const groupByCategory = (data: BillOutput[]) => {
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

export default function ExpenseByMonth({ data }: { data: BillOutput[]}) {
  const expenses = useMemo(() => groupByCategory(data), [data]);

  const dataChart = {
    labels: Object.keys(expenses),
    datasets: [{
      label: "",
      data: Object.values(expenses),
      backgroundColor: [
        "#4A8E4A",
        "#FFD700",
        "#1E90FF",
        "#FFB6C1",
        "#A9A9A9",
        "#98FB98",
        "#F0E68C",
        "#B0C4DE",
        "#808080",
        "#6A5ACD",
        "#FF7F50",
        "#20B2AA",
        "#778899",
        "#FFB347",
        "#DDA0DD"
      ],
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

        {!data || !data.length ? (
          <div className="empty">
            <p className='subtitle'>Gráfico indisponível.</p>
          </div>
        ) : (
          <Pie data={dataChart} options={options} />
        )}
      </div>
    </div>
  );
}