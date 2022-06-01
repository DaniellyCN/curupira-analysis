import React from "react";
import dynamic from "next/dynamic";
import BaseCard from "../../../../molecules/BaseCard";
import { data } from "./data/graph_data";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const ArticlesByLanguage = () => {
  const options = {
    series:  [
      {
      name: "Português",
      data: data.map((item) => ( item.portuguese )),
      },
      {
        name: "Inglês",
        data: data.map((item) => ( item.english )),
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 500,
        stacked: true,
        // stackType: '100%',
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
          // columnWidth: '80%',
          horizontal: false,
          borderRadius: 5,
        },
      },
      xaxis: {
        type: "text",
        categories: 
          data.map((item) => item.instituition),
        
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
    <BaseCard title="Teses por idioma">
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
