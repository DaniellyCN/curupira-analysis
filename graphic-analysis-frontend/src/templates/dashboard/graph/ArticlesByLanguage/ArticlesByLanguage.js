import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import BaseCard from "../../../../molecules/BaseCard";
import { baseUrl } from "../../../../config/api";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const ArticlesByLanguage = () => {
  const [fetchedGraphData, setFetchedGraphData] = React.useState([]);

  const fetchGraphData = async () => {
    try {
      const response = await fetch(
        `${baseUrl}thesis-by-language`,

        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoieXVyeWFsZW5jYXIiLCJwZXJtaXNzaW9ucyI6WyJ0aGVzaXMtYnktbGFuZ3VhZ2U6bGlzdCJdfSwiaWF0IjoxNjU0NDYzMjAyLCJleHAiOjE2NTQ0NjY4MDJ9.gmu0Yhs58FAf5n9JtzsmC_8VmuNR6Jcz8RzlFbzSRz4",
              // TO-DO: Replace with real token
          },
        }
      );
      const data = await response.json();
      setFetchedGraphData(data);
    
    } catch (error) {
      console.log(error);
      // TO-DO: Handle error
    }
  };

  useEffect(() => {
    fetchGraphData();
  }, []);

  const options = {
    series: [
      {
        name: "Português",
        data: fetchedGraphData.map((item) => item.portuguese),
      },
      {
        name: "Inglês",
        data: fetchedGraphData.map((item) => item.english),
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
        categories: fetchedGraphData.map((item) => item.instituition),
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
      {fetchedGraphData.length > 0 ? (
        <Chart
          options={options.options}
          series={options.series}
          type="bar"
          height={500}
        />
      ) : (
        <h5>Carregando...</h5>
      )}
    </BaseCard>
  );
};

export default ArticlesByLanguage;
