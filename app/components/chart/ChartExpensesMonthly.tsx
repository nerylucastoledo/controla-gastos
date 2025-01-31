import React, { useEffect } from "react";
import Chart from "chart.js";
import { formatToCurrencyBRL } from "@/app/utils";
import { IExpenseByYear } from "@/app/utils/types";

const chartConfig = (data: IExpenseByYear[]) => {
  return {
    type: "bar",
    options: {
      maintainAspectRatio: false,
      responsive: true,
      title: {
        display: true,
        text: 'Gasto separados por mês',
        fontSize: 16,
        fontColor: '#fff',
      },
      legend: {
        display: false,
      },
      tooltips: {
        mode: "index",
        intersect: false,
        backgroundColor: "#005B96",
        callbacks: {
          label: function(tooltipItem) {
            const value = tooltipItem.yLabel;
            return value !== undefined ? formatToCurrencyBRL(value) : '';
          },
        },
      },
      scales: {
        xAxes: [
          {
            ticks: {
              callback: function(value) {
                return value.substring(0, 3);
              },
            },
          },
        ],
        yAxes: [
          {
            display: true,
            ticks: {
              beginAtZero: true,
              callback: function(value) {
                return formatToCurrencyBRL(value);
              },
            },
          },
        ],
      },
    },
    data: {
      labels: data.map(({ month }) => month === "Marco" ? "Março" : month),
      datasets: [
        {
          Label: "",
          backgroundColor: "#005B96",
          borderColor: "#005B96",
          data: data.map(({ value }) => value),
          fill: false,
          barThickness: 8,
        },
      ],
    },
  }
}

export const ChartExpensesMonthly = ({ data }: { data: IExpenseByYear[] }) => {
  useEffect(() => {
    const config = chartConfig(data)

    const ctx = document.getElementById("bar-chart").getContext("2d");
    window.myBar = new Chart(ctx, config);
    return () => window.myBar.destroy();
    
  }, [data]);

  return (
    <canvas id="bar-chart"></canvas>
  );
}