import Chart from "react-apexcharts";
import { useGetUsersQuery } from "../../redux/api/usersApiSlice";
import {
  useGetTotalOrdersQuery,
  useGetTotalSalesByDateQuery,
  useGetTotalSalesQuery,
} from "../../redux/api/orderApiSlice";

import { useState, useEffect } from "react";
import { FaDollarSign, FaUsers, FaShoppingCart } from "react-icons/fa";
import AdminMenu from "./AdminMenu";
import OrderList from "./OrderList";
import Loader from "../../components/Loader";
import "./adminStyle.css";

const AdminDashboard = () => {
  const { data: sales, isLoading } = useGetTotalSalesQuery();
  const { data: customers, isLoading: loading } = useGetUsersQuery();
  const { data: orders, isLoading: loadingTwo } = useGetTotalOrdersQuery();
  const { data: salesDetail } = useGetTotalSalesByDateQuery();

  const [state, setState] = useState({
    options: {
      chart: {
        type: "line",
        background: "transparent",
        foreColor: "#999",
      },
      tooltip: {
        theme: "dark",
        style: {
          backgroundColor: "#1f2937",
          borderColor: "#ec4899",
        },
      },
      colors: ["hsla(0, 0%, 83%, 0.44)"],
      dataLabels: {
        enabled: true,
        style: {
          colors: ["#ec4899"],
        },
      },
      stroke: {
        curve: "smooth",
        colors: ["#ec4899"],
      },
      title: {
        text: "Sales Trend",
        align: "left",
        style: {
          color: "#9ca3af",
          fontSize: "18px",
        },
      },
      grid: {
        borderColor: "#9ca3af",
        xaxis: {
          lines: {
            show: true,
          },
        },
      },
      markers: {
        size: 5,
        colors: ["#ec4899"],
        strokeColors: "#1f2937",
        strokeWidth: 2,
      },
      xaxis: {
        categories: [],
        title: {
          text: "Date",
          style: {
            color: "#9ca3af",
          },
        },
        labels: {
          style: {
            colors: "#9ca3af",
          },
        },
      },
      yaxis: {
        title: {
          text: "Sales",
          style: {
            color: "#9ca3af",
          },
        },
        min: 0,
        labels: {
          style: {
            colors: "#9ca3af",
          },
        },
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        floating: true,
        offsetY: -25,
        offsetX: -5,
        labels: {
          colors: "#1f2937",
        },
      },
    },
    series: [{ name: "Sales", data: [] }],
  });

  useEffect(() => {
    if (salesDetail) {
      const formattedSalesDate = salesDetail.map((item) => ({
        x: item._id,
        y: item.totalSales,
      }));

      setState((prevState) => ({
        ...prevState,
        options: {
          ...prevState.options,
          xaxis: {
            categories: formattedSalesDate.map((item) => item.x),
          },
        },

        series: [
          { name: "Sales", data: formattedSalesDate.map((item) => item.y) },
        ],
      }));
    }
  }, [salesDetail]);

  return (
    <>
      <AdminMenu />

      <section className="xl:ml-[4rem] md:ml-[0rem] min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Sales Card */}
          <div className="bg-gray-800 rounded-lg border border-gray-700 shadow-lg hover:shadow-2xl hover:border-pink-500 transition-all duration-300 p-6 transform hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-400 font-semibold text-sm uppercase tracking-wide">Total Sales</h3>
              <div className="bg-gradient-to-br from-pink-600 to-pink-500 rounded-full p-3 shadow-lg">
                <FaDollarSign className="text-white" size={24} />
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-gray-300 text-sm">Revenue</p>
              <h1 className="text-3xl font-bold text-white">
                {isLoading ? (
                  <span className="text-lg"><Loader /></span>
                ) : (
                  `$${sales?.totalSales?.toFixed(2)}`
                )}
              </h1>
            </div>
          </div>

          {/* Customers Card */}
          <div className="bg-gray-800 rounded-lg border border-gray-700 shadow-lg hover:shadow-2xl hover:border-pink-500 transition-all duration-300 p-6 transform hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-400 font-semibold text-sm uppercase tracking-wide">Total Customers</h3>
              <div className="bg-gradient-to-br from-pink-600 to-pink-500 rounded-full p-3 shadow-lg">
                <FaUsers className="text-white" size={24} />
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-gray-300 text-sm">Active Users</p>
              <h1 className="text-3xl font-bold text-white">
                {loading ? (
                  <span className="text-lg"><Loader /></span>
                ) : (
                  customers?.length || 0
                )}
              </h1>
            </div>
          </div>

          {/* Orders Card */}
          <div className="bg-gray-800 rounded-lg border border-gray-700 shadow-lg hover:shadow-2xl hover:border-pink-500 transition-all duration-300 p-6 transform hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-400 font-semibold text-sm uppercase tracking-wide">Total Orders</h3>
              <div className="bg-gradient-to-br from-pink-600 to-pink-500 rounded-full p-3 shadow-lg">
                <FaShoppingCart className="text-white" size={24} />
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-gray-300 text-sm">Completed Orders</p>
              <h1 className="text-3xl font-bold text-white">
                {loadingTwo ? (
                  <span className="text-lg"><Loader /></span>
                ) : (
                  orders?.totalOrders || 0
                )}
              </h1>
            </div>
          </div>
        </div>

        {/* Chart Section */}
        <div className="bg-gray-800 rounded-lg border border-gray-700 shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-white mb-6">Sales Overview</h2>
          <Chart
            options={state.options}
            series={state.series}
            type="bar"
            height={400}
          />
        </div>

        {/* Orders List Section */}
        <div className="bg-gray-800 rounded-lg border border-gray-700 shadow-lg p-6">
          <h2 className="text-xl font-bold text-white mb-6">Recent Orders</h2>
          <OrderList />
        </div>
      </section>
    </>
  );
};

export default AdminDashboard;