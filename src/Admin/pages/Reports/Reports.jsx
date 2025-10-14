import React, { useState, useEffect } from "react";
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import "./Reports.css";

const Reports = () => {
  const [reportType, setReportType] = useState("transactions");
  const [reportPeriod, setReportPeriod] = useState("daily");
  const [dateRange, setDateRange] = useState({ 
    from: new Date(new Date().setDate(new Date().getDate() - 30)), 
    to: new Date() 
  });
  const [rawData, setRawData] = useState([]);
  const [data, setData] = useState([]);

  // React Select Options
  const reportTypeOptions = [
    { value: "transactions", label: "Transactions" },
    { value: "compliance", label: "Compliance" },
    { value: "financial", label: "Financial" }
  ];

  const periodOptions = [
    { value: "daily", label: "Daily" },
    { value: "weekly", label: "Weekly" },
    { value: "monthly", label: "Monthly" }
  ];

  // Custom styles for React Select
  const customStyles = {
    control: (base, state) => ({
      ...base,
      border: '1px solid #d0d5dd',
      borderRadius: '8px',
      minHeight: '42px',
      boxShadow: state.isFocused ? '0 0 0 3px rgba(144, 6, 3, 0.1)' : 'none',
      borderColor: state.isFocused ? '#900603' : '#d0d5dd',
      '&:hover': {
        borderColor: '#900603'
      }
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected ? '#900603' : state.isFocused ? '#fdf2f2' : 'white',
      color: state.isSelected ? 'white' : '#333',
      '&:active': {
        backgroundColor: '#900603'
      }
    }),
    singleValue: (base) => ({
      ...base,
      color: '#333',
      fontWeight: '500'
    })
  };

  // Custom components for DatePicker
  const CustomInput = React.forwardRef(({ value, onClick }, ref) => (
    <button className="custom-date-input" onClick={onClick} ref={ref}>
      {value || "Select date"}
      <i className="calendar-icon">📅</i>
    </button>
  ));

  useEffect(() => {
    // Mock raw data
    const mock = [
      { date: "2025-09-01", type: "Deposit", count: 12, total: 5000 },
      { date: "2025-09-02", type: "Withdrawal", count: 8, total: 3200 },
      { date: "2025-09-03", type: "Transfer", count: 15, total: 7800 },
      { date: "2025-09-04", type: "Deposit", count: 10, total: 4200 },
      { date: "2025-09-08", type: "Deposit", count: 5, total: 2000 },
      { date: "2025-09-15", type: "Withdrawal", count: 7, total: 3100 },
      { date: "2025-09-20", type: "Transfer", count: 9, total: 4500 },
      { date: "2025-09-25", type: "Deposit", count: 11, total: 5200 },
    ];
    setRawData(mock);
  }, []);

  // Aggregate data based on reportPeriod
  useEffect(() => {
    const aggregated = aggregateData(rawData, reportPeriod);
    setData(aggregated);
  }, [rawData, reportPeriod]);

  // Aggregate helper function
  const aggregateData = (data, period) => {
    if (period === "daily") return data;
    const grouped = {};
    data.forEach((d) => {
      let key;
      const dateObj = new Date(d.date);
      if (period === "weekly") {
        const weekNumber = getWeekNumber(dateObj);
        key = `${dateObj.getFullYear()}-W${weekNumber}`;
      } else if (period === "monthly") {
        key = `${dateObj.getFullYear()}-${(dateObj.getMonth() + 1)
          .toString()
          .padStart(2, "0")}`;
      }

      if (!grouped[key]) grouped[key] = { date: key, count: 0, total: 0 };
      grouped[key].count += d.count;
      grouped[key].total += d.total;
    });
    return Object.values(grouped);
  };

  // Get ISO week number
  const getWeekNumber = (date) => {
    const temp = new Date(date.getFullYear(), 0, 1);
    const days = Math.floor(
      (date - temp) / (24 * 60 * 60 * 1000) + temp.getDay() + 1
    );
    return Math.ceil(days / 7);
  };

  // CSV export
  const downloadCSV = () => {
    const csvRows = [
      ["Date", "Count", "Total Amount"],
      ...data.map((d) => [d.date, d.count, d.total]),
    ];
    const csvContent = csvRows.map((e) => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "report.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  // PDF export
  const downloadPDF = async () => {
    const jsPDFModule = await import("jspdf");
    await import("jspdf-autotable");
    const doc = new jsPDFModule.default();
    doc.text("Admin Report", 14, 20);
    doc.autoTable({
      head: [["Date", "Count", "Total Amount"]],
      body: data.map((d) => [d.date, d.count, d.total]),
    });
    doc.save("report.pdf");
  };

  return (
    <>
      <div className="reports-container-header">
        <h2>Admin Reports & Analytics</h2>
        <p>View detailed reports and analytics to monitor system performance and user activity.</p>
      </div>
      
      <div className="reports-container">
        {/* Summary Cards */}
        <div className="summary-cards">
          <div className="card">
            <h3>Total Transactions</h3>
            <p>{data.reduce((acc, d) => acc + d.count, 0)}</p>
          </div>
          <div className="card">
            <h3>Total Amount</h3>
            <p>${data.reduce((acc, d) => acc + d.total, 0)}</p>
          </div>
          <div className="card">
            <h3>Average Amount</h3>
            <p>
              $
              {data.reduce((acc, d) => acc + d.count, 0) > 0 
                ? (data.reduce((acc, d) => acc + d.total, 0) / data.reduce((acc, d) => acc + d.count, 0)).toFixed(2)
                : "0.00"
              }
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="filters">
          <div className="filter-group">
            <label className="filter-label">Report Type</label>
            <Select
              options={reportTypeOptions}
              value={reportTypeOptions.find(option => option.value === reportType)}
              onChange={(selectedOption) => setReportType(selectedOption.value)}
              styles={customStyles}
              className="react-select-container"
              classNamePrefix="react-select"
            />
          </div>

          <div className="filter-group">
            <label className="filter-label">Period</label>
            <Select
              options={periodOptions}
              value={periodOptions.find(option => option.value === reportPeriod)}
              onChange={(selectedOption) => setReportPeriod(selectedOption.value)}
              styles={customStyles}
              className="react-select-container"
              classNamePrefix="react-select"
            />
          </div>

          <div className="filter-group">
            <label className="filter-label">From Date</label>
            <DatePicker
              selected={dateRange.from}
              onChange={(date) => setDateRange({ ...dateRange, from: date })}
              selectsStart
              startDate={dateRange.from}
              endDate={dateRange.to}
              dateFormat="yyyy-MM-dd"
              customInput={<CustomInput />}
              className="custom-datepicker"
            />
          </div>

          <div className="filter-group">
            <label className="filter-label">To Date</label>
            <DatePicker
              selected={dateRange.to}
              onChange={(date) => setDateRange({ ...dateRange, to: date })}
              selectsEnd
              startDate={dateRange.from}
              endDate={dateRange.to}
              minDate={dateRange.from}
              dateFormat="yyyy-MM-dd"
              customInput={<CustomInput />}
              className="custom-datepicker"
            />
          </div>
        </div>

        {/* Export Buttons */}
        <div className="export-buttons">
          <button className="export-btn" onClick={downloadCSV}>
            Export CSV
          </button>
          <button className="export-btn" onClick={downloadPDF}>
            Export PDF
          </button>
        </div>

        {/* Charts */}
        <div className="charts">
          <div className="chart-container">
            <h3>Transaction Count ({reportPeriod})</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#900603"
                  strokeWidth={3}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-container">
            <h3>Total Amount ({reportPeriod})</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="total" fill="#900603" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Report Table */}
        <div className="table-card">
          <h2>Detailed Report Data</h2>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Count</th>
                <th>Total Amount</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, idx) => (
                <tr key={idx}>
                  <td>{row.date}</td>
                  <td>{row.count}</td>
                  <td>${row.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Reports;