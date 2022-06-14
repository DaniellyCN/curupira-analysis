import React, { useContext, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import DefaultCard from "../../card/Card";
import { baseUrl } from "../../../config/api";
import { LoginContext } from "../../../context/LoginContext";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const ArticlesByLanguage = () => {
  const [fetchedGraphData, setFetchedGraphData] = useState([]);
  const {token} = useContext(LoginContext);

  const fetchGraphData = async () => {
    try {
      const response = await fetch(
        `${baseUrl}thesis-by-language`,

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
      const data = await response.json();

      if (response.status === 200) {
        setFetchedGraphData(data);
      }
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
    <DefaultCard title="Teses por idioma">
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
    </DefaultCard>
  );
};

export default ArticlesByLanguage;
