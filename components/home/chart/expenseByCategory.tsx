import React, { useMemo } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, TooltipItem } from 'chart.js';
import { Bar } from 'react-chartjs-2';

import styles from "../../../styles/components/chart/chart.module.scss";

import { formatToCurrencyBRL, parseCurrencyString } from '@/utils';
import { BillDTOOutput } from '@/dto/billDTO';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const groupByCategory = (data: BillDTOOutput[]) => {
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

export default function ExpenseByMonth({ data }: { data: BillDTOOutput[]}) {
  const expenses = useMemo(() => groupByCategory(data), [data]);

  const dataChart = {
    labels: Object.keys(expenses),
    datasets: [{
      label: "",
      data: Object.values(expenses),
      backgroundColor: ["#0a0a0a"],
      borderColor: "#a1a1a1",
      borderWidth: 1,
    }]
  }

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value: number | string) {
            return formatToCurrencyBRL(Number(value));
          },
          color: "#717182"
        },
      },
      x: {
        ticks: {
          color: "#717182"
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(tooltipItem: TooltipItem<'bar'>) {
            return ` ${formatToCurrencyBRL(Number(tooltipItem.raw))}`;
          }
        }
      }
    }
  };

  return (
    <div className={styles.chart}>
      <div className={styles.container}>
        <h2 className={styles.title}>Despesas por categoria</h2>

        {!data || !data.length ? (
          <div className="empty">
            <p className='subtitle'>Gráfico indisponível.</p>
          </div>
        ) : (
          <Bar data={dataChart} options={options} />
        )}
      </div>
    </div>
  );
}