import React, { useEffect, useRef, useMemo, useState } from "react";
import { Chart, registerables } from "chart.js";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import verifyToken from "../../verifyToken";

const PerformanceChart = () => {
  const [themeValues, setThemeValues] = useState({
    font: "Arial",
    primary: "#3498db",
    secondary: "#2ecc71",
  });

  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = await verifyToken();
        const response = await axios.get(
          process.env.REACT_APP_BASE_URL + "/api/graph_data",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.data) {
          const fetchedData = response.data.data;

          const lastfiveData = fetchedData.slice(-5);

          const transformedData = lastfiveData.reduce((acc, entry) => {
            const [month, income] = Object.entries(entry)[0];
            acc[month] = income;
            return acc;
          }, {});

          setChartData(transformedData);
        } else {
          console.log("No data available");
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  const chartContainer = useRef(null);

  const labels = useMemo(() => {
    try {
      if (!chartData) return [];
      return Object.keys(chartData);
    } catch (error) {
      console.error("Error occurred while generating labels:", error);
      return [];
    }
  }, [chartData]);

  const dataValues = useMemo(() => {
    try {
      if (!chartData) return [];
      return Object.values(chartData);
    } catch (error) {
      console.error("Error occurred while generating data values:", error);
      return [];
    }
  }, [chartData]);

  const config = useMemo(() => {
    return {
      type: "bar",
      options: {
        plugins: {
          legend: {
            display: true,
            position: "bottom",
          },
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              display: true,
              lineWidth: 1,
              color: "#E6F6FD",
              drawBorder: false,
            },
            ticks: {
              fontColor: themeValues.primary,
            },
          },
          x: {
            grid: { display: false },
            ticks: {
              fontColor: themeValues.primary,
            },
          },
        },
      },
      data: {
        labels: labels,
        datasets: [
          {
            label: "Monthly Income",
            backgroundColor: themeValues.primary,
            data: dataValues,
            barThickness: 40, // Set the fixed width of each bar
          },
        ],
      },
    };
  }, [dataValues, labels, themeValues]);

  useEffect(() => {
    let myChart = null;
    if (chartContainer && chartContainer.current) {
      Chart.register(...registerables);
      myChart = new Chart(chartContainer.current, config);
    }
    return () => {
      if (myChart) {
        myChart.destroy();
      }
    };
  }, [config]);

  return (
    <div className="bg-light p-1 h-[190px] rounded shadow">
      <canvas ref={chartContainer} />
    </div>
  );
};

export default React.memo(PerformanceChart);
