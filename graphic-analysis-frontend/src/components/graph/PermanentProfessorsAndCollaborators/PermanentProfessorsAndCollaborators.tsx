import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import DefaultCard from "../../card/Card";
import { baseUrl } from "../../../config/api";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const PermanentProfessorsAndCollaborators = () => {
  const [fetchedGraphData, setFetchedGraphData] = useState([]);

  const fetchGraphData = async () => {
    try {
      const response = await fetch(
      
        `${baseUrl}thesis-by-language`,

        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoieXVyeWFsZW5jYXIiLCJwZXJtaXNzaW9ucyI6WyJ0aGVzaXMtYnktbGFuZ3VhZ2U6bGlzdCJdfSwiaWF0IjoxNjU0OTgwNjUzLCJleHAiOjE2NTQ5ODQyNTN9.vO45VWn3hE1dAD363Iygphtdv6_LyPKlGn5M-cRSZd4",
            // TO-DO: Replace with real token
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
        name: "Permanente",
        data: fetchedGraphData.map((item) => item.portuguese),
      },
      {
        name: "Colaboradores",
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
    <DefaultCard title="Média de docentes permanentes e colaboradores">
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

export default PermanentProfessorsAndCollaborators;
