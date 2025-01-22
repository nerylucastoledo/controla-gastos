"use client"

import React, { useEffect } from "react";
import Chart from "chart.js";

import { Data } from "@/app/utils/types";
import { formatToCurrencyBRL, parseCurrencyString } from "@/app/utils";

interface CategoryItem {
  category: string,
  value: number
}

const chartCategorys = (data: CategoryItem[]) => {
  return {
    type: 'doughnut',
    options: {
      maintainAspectRatio: false,
      responsive: true,
      title: {
        display: true,
        text: 'Gasto separados por categoria',
        fontSize: 16,
        fontColor: '#fff',
      },
      legend: {
        display: false,
      },
      tooltips: {
        backgroundColor: "#005B96",
        callbacks: {
          label: function(tooltipItem) {
            const { index } = tooltipItem;
            return `${data[index].category}: ${formatToCurrencyBRL(data[index].value)}`;
          },
        },
      },
    },
    data: {
      labels: data.map((item) => item.category),
      datasets: [{
        label: '',
        data: data.map((item) => item.value),
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(153, 102, 255)',
        ],
        hoverOffset: 6
      }]
    },
  }
};

const groupCategories = (data: Data[]): CategoryItem[] => {
  return data.reduce((acc: CategoryItem[], expense) => {
    const categoryName = expense.category.toLowerCase();
    const value = parseCurrencyString(expense.value);

    const existingCategory = acc.find(item => item.category === categoryName);

    if (existingCategory) {
      existingCategory.value += value;
    } else {
      acc.push({ category: categoryName, value });
    }

    return acc;
  }, []);
};


export default function ChartExpensesCategorys({ data }: { data: Data[] }) {
  useEffect(() => {
    const dataFiltred = data.filter((expense) => parseCurrencyString(expense.value) > 0 && expense.people === "Eu")
    const categorys = groupCategories(dataFiltred)
    const sortedValue = categorys.sort((a, b) => Number(b.value) - Number(a.value));
    const config = chartCategorys(sortedValue)

    const ctx = document.getElementById("pizza-chart").getContext("2d");
    window.myDoughnut = new Chart(ctx, config);
    return () => window.myDoughnut.destroy();
    
  }, [data]);

  return (
    <canvas id="pizza-chart"></canvas>
  );
}