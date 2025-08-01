import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { TooltipItem } from 'chart.js';

import styles from "../../../styles/components/chart/chart.module.scss";

import { billGet } from '@/actions/bill';
import { useDate } from '@/context/date-context';
import { formatToCurrencyBRL } from '@/utils';
import { BillDTOOutputByYear } from '@/dto/billDTO';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const handleTooltip = (value: number) => {
  const referenceValue = localStorage.getItem("salary");
  let trend = "";

  if (Number(value) > Number(referenceValue)) {
    trend = " ↑";
  } else {
    trend = " ↓";
  }

  return ` ${formatToCurrencyBRL(value)}${trend}`;
}

export default function ExpenseByMonth() {
  const [data, setData] = useState<BillDTOOutputByYear[] | null>(null);

  const { date } = useDate();
  useEffect(() => {
    const getData = async () => {
      const result = await billGet(`expenses/year/${date.year}`);
      setData(result);
    };

    getData();
  }, [date]);

  const dataChart = {
    labels: data?.map(item => item.month.substring(0, 3)),
    datasets: [{
      label: "",
      data: data?.map(item => item.value),
      backgroundColor: "#717182",
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
        <h1 className={styles.title}>Gasto por mês</h1>

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