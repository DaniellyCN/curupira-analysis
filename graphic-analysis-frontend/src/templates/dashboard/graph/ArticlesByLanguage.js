import React from "react";
import dynamic from "next/dynamic";
import BaseCard from "../../../molecules/BaseCard";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const ArticlesByLanguage = () => {
  const options = {
    series: [
      {
        name: "Português",
        data: [
          1, 36, 37, 31, 28, 12, 11, 32, 10, 18, 13, 30, 42, 4, 41, 11, 133, 57,
          29, 7, 42, 20, 105, 13, 4, 4, 1, 29, 13, 26, 12, 13, 11, 9,
        ],
      },
      {
        name: "Inglês",
        data: [
          0, 0, 2, 3, 3, 2, 2, 6, 2, 4, 3, 7, 10, 1, 11, 4, 49, 23, 15, 4, 26,
          16, 88, 12, 4, 4, 1, 31, 14, 31, 35, 45, 53, 76,
        ],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 500,
        stacked: true,
        stackType: '100%',
        toolbar: {
          show: true,
        },
        zoom: {
          enabled: true,
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              offsetX: -10,
              offsetY: 0,
            },
          },
        },
      ],
      plotOptions: {
        bar: {
          columnWidth: '80%',
          horizontal: false,
          borderRadius: 5,
        },
      },
      xaxis: {
        type: "text",
        categories: [
          "PUC-MG-I-4",
          "UFSCAR-CC-4",
          "UFRN-SC-5",
          "UFRJ-I-4",
          "UFSC-CC-5",
          "UNIRIO-DI-4",
          "UFPA-CCD-4",
          "UFU-CC-4",
          "UNISINOS-CA-4",
          "UFPEL-C-4",
          "UFBA-CC-4",
          "PUC-PR-I-5",
          "UFPR-I-5",
          "UNIFESP-CC-4",
          "UFCG-CC-4",
          "UNB-I-5",
          "UFPE-CC-7",
          "UFRJ-ESC-7",
          "UFAM-I-5",
          "UFOP-CC-4",
          "UFF-C-6",
          "UFC-CC-5",
          "USP-SC-CCMC-7",
          "UNIFOR-IA-4",
          "UFABC-CC-4",
          "UFBA-CCU-4",
          "UFMS-CC-4",
          "PUC-RS-CC-6",
          "UFES-I-4",
          "USP-CC-6",
          "PUC-RIO-I-7",
          "UFMG-CC-7",
          "UNICAMP-CC-7",
          "UFRGS-C-7",
        ],
      },
      legend: {
        position: "bottom",
        offsetY: 0,
      },
      fill: {
        opacity: 1,
      },
    },
  };

  return (
    <BaseCard title="Testes por idioma">
      <Chart
        options={options.options}
        series={options.series}
        type="bar"
        height={500}
      />
    </BaseCard>
  );
};

export default ArticlesByLanguage;
