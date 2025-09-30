import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from "react-router-dom";
import { TrendingUp, TrendingDown, DollarSign, PieChart, BarChart3, Target, Plus, Eye } from 'lucide-react';
import "bootstrap-icons/font/bootstrap-icons.css";

// ✅ NEW IMPORT for charts
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";


const InvestmentPage = () => {
    const [showPortfolioDetails, setShowPortfolioDetails] = useState(false);
    const [investmentOptions, setInvestmentOptions] = useState([]);
    const [loading, setLoading] = useState(true);
    // 🔹 Portfolio State
    const [portfolioData, setPortfolioData] = useState([]);

    // 🔹 Modal State
    const [showModal, setShowModal] = useState(false);
    const [selectedInvestment, setSelectedInvestment] = useState(null);
    const [investmentAmount, setInvestmentAmount] = useState("");

    // 🔹 Goals State
    const [goals, setGoals] = useState([]);

    // 🔹 Ref for Investment Options Section
    const investmentSectionRef = useRef(null);

    // 🔹 Navigation Hook
    const navigate = useNavigate();


    // 🔹 Initial load goals (default + from sessionStorage)
    useEffect(() => {
        const storedGoals = JSON.parse(sessionStorage.getItem("goals")) || [];

        const today = new Date();
        const todayLabel = today.toLocaleString("default", { month: "short", year: "2-digit" });

        let initializedGoals;

        if (storedGoals.length === 0) {
            // 👉 Sirf pehli baar default goals add karo
            initializedGoals = [
                {
                    name: 'Retirement Fund',
                    target: 500000,
                    current: 0.0,
                    deadline: '2045-12-31',
                    sip: 10000,
                    history: [],
                    lastContributionDate: null
                },
                {
                    name: 'House Down Payment',
                    target: 200000,
                    current: 0.0,
                    deadline: '2027-06-30',
                    sip: 15000,
                    history: [],
                    lastContributionDate: null
                }
            ];
            sessionStorage.setItem("goals", JSON.stringify(initializedGoals));
        } else {
            // Agar already stored goals hain to wahi use karo
            initializedGoals = storedGoals.map((g) => ({
                ...g,
                history: g.history || [],
                lastContributionDate: g.lastContributionDate || null
            }));
        }

        setGoals(initializedGoals);

        const storedPortfolio = JSON.parse(sessionStorage.getItem("portfolioData")) || [];
        if (storedPortfolio.length > 0) {
            setPortfolioData(storedPortfolio);
        }
    }, []);

    // 🔹 Agar AddGoal se new goal aaya hai to goals me add karo (duplicate check ke sath)
    useEffect(() => {
        const newGoal = location.state?.newGoal;
        if (newGoal) {
            setGoals((prev) => {
                const today = new Date();
                const todayLabel = today.toLocaleString("default", { month: "short", year: "2-digit" });

                // 👉 Check karo ki same naam aur deadline ka goal already exist to nahi
                const exists = prev.some(
                    (g) => g.name === newGoal.name && g.deadline === newGoal.deadline
                );
                if (exists) return prev;

                const updated = [
                    ...prev,
                    {
                        ...newGoal,
                        history:
                            newGoal.current > 0
                                ? [{ month: todayLabel, value: newGoal.current }]
                                : [],
                        lastContributionDate: newGoal.current > 0 ? today : null
                    }
                ];

                sessionStorage.setItem("goals", JSON.stringify(updated));
                return updated;
            });
        }
    }, [location.state]);


    // ✅ UPDATED FUNCTION → Contribute logic
    const handleContribute = (goalIndex) => {
        setGoals((prevGoals) => {
            const updatedGoals = [...prevGoals];
            const goal = { ...updatedGoals[goalIndex] };

            const newContribution = goal.sip || 5000;
            let contributionDate;

            if (!goal.lastContributionDate) {
                // pehla contribution → current month
                contributionDate = new Date();
            } else {
                // hamesha lastContributionDate ke agle month me contribution add hoga
                const lastDate = new Date(goal.lastContributionDate);
                contributionDate = new Date(lastDate);
                contributionDate.setMonth(lastDate.getMonth() + 1);
            }

            // current update
            goal.current += newContribution;

            const monthLabel = contributionDate.toLocaleString("default", { month: "short", year: "2-digit" });

            goal.history = [
                ...(goal.history || []),
                { month: monthLabel, value: goal.current }
            ];

            goal.lastContributionDate = contributionDate;

            updatedGoals[goalIndex] = goal;
            sessionStorage.setItem("goals", JSON.stringify(updatedGoals));
            return updatedGoals;
        });
    };
    // 🔹 Hardcoded 6 Investment Options
    useEffect(() => {
        const demoOptions = [
            {
                _id: 1,
                investmentName: "Equity Mutual Fund",
                investmentType: "Mutual Fund",
                riskLevel: "High",
                description: "Best for long term wealth creation.",
                potentialReturns: "12-15% annually",
                minimumInvestment: 5000,
                investmentImage: "https://images.pexels.com/photos/5716004/pexels-photo-5716004.jpeg?auto=compress&cs=tinysrgb&w=800"
            },
            {
                _id: 2,
                investmentName: "Fixed Deposit",
                investmentType: "Bank FD",
                riskLevel: "Low",
                description: "Safe and secure investment with fixed returns.",
                potentialReturns: "6-7% annually",
                minimumInvestment: 1000,
                investmentImage: "https://images.pexels.com/photos/8437000/pexels-photo-8437000.jpeg?auto=compress&cs=tinysrgb&w=800"
            },
            {
                _id: 3,
                investmentName: "Gold ETF",
                investmentType: "Exchange Traded Fund",
                riskLevel: "Medium",
                description: "Diversify portfolio with gold backed securities.",
                potentialReturns: "8-10% annually",
                minimumInvestment: 2000,
                investmentImage: "https://images.pexels.com/photos/5980742/pexels-photo-5980742.jpeg?auto=compress&cs=tinysrgb&w=800"
            },
            {
                _id: 4,
                investmentName: "Corporate Bonds",
                investmentType: "Debt Instrument",
                riskLevel: "Medium",
                description: "Stable returns with lower risk than equities.",
                potentialReturns: "7-9% annually",
                minimumInvestment: 10000,
                investmentImage: "https://images.pexels.com/photos/7681109/pexels-photo-7681109.jpeg?auto=compress&cs=tinysrgb&w=800"
            },
            {
                _id: 5,
                investmentName: "Index Fund",
                investmentType: "Mutual Fund",
                riskLevel: "Medium",
                description: "Track NIFTY/Sensex with low expense ratio.",
                potentialReturns: "10-12% annually",
                minimumInvestment: 500,
                investmentImage: "https://images.pexels.com/photos/6120219/pexels-photo-6120219.jpeg?auto=compress&cs=tinysrgb&w=800"
            },
            {
                _id: 6,
                investmentName: "Cryptocurrency",
                investmentType: "Digital Asset",
                riskLevel: "High",
                description: "High risk, high return volatile asset class.",
                potentialReturns: "20%+ annually (volatile)",
                minimumInvestment: 1000,
                investmentImage: "https://images.pexels.com/photos/843700/pexels-photo-843700.jpeg?auto=compress&cs=tinysrgb&w=800"
            }
        ];

        setInvestmentOptions(demoOptions);
        setLoading(false);
    }, []);

    // 🔹 Currency Formatter
    const formatCurrency = (amount) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);

    // 🔹 Risk Color Badge
    const getRiskColor = (riskLevel) => {
        switch ((riskLevel || '').toLowerCase()) {
            case 'low':
                return 'badge bg-success';
            case 'medium':
                return 'badge bg-warning text-dark';
            case 'high':
                return 'badge bg-danger';
            default:
                return 'badge bg-secondary';
        }
    };

    // 🔹 Total Portfolio Value
    const totalPortfolioValue = portfolioData.reduce((sum, item) => sum + item.value, 0);

    // 🔹 Invest Now Button → Open Modal
    const handleInvestNow = (option) => {
        setSelectedInvestment(option);
        setInvestmentAmount("");
        setShowModal(true);
    };

    // 🔹 Confirm Investment
    const handleConfirmInvestment = () => {
        if (!investmentAmount || investmentAmount <= 0) return;

        const amount = parseInt(investmentAmount);

        const existing = portfolioData.find(item => item.name === selectedInvestment.investmentName);

        let updatedPortfolio;
        if (existing) {
            updatedPortfolio = portfolioData.map(item =>
                item.name === selectedInvestment.investmentName
                    ? { ...item, value: item.value + amount }
                    : item
            );
        } else {
            updatedPortfolio = [
                ...portfolioData,
                {
                    name: selectedInvestment.investmentName,
                    value: amount,
                    change: 0,
                    allocation: 0
                }
            ];
        }

        // 🔹 Calculate Total
        const total = updatedPortfolio.reduce((sum, item) => sum + item.value, 0);

        // 🔹 Update Allocation %
        updatedPortfolio = updatedPortfolio.map(item => ({
            ...item,
            allocation: total > 0 ? ((item.value / total) * 100).toFixed(2) : 0
        }));

        setPortfolioData(updatedPortfolio);
        setShowModal(false);
        sessionStorage.setItem("portfolioData", JSON.stringify(updatedPortfolio));
    };

    // 🔹 Scroll to Investment Section
    const handleScrollToInvestments = () => {
        if (investmentSectionRef.current) {
            investmentSectionRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };
    // ✅ Dynamic Goal Progress
    const totalGoalProgress = goals.length > 0
        ? Math.round(goals.reduce((sum, g) => sum + g.current, 0) / goals.reduce((sum, g) => sum + g.target, 0) * 100)
        : 0;
    const topGoalName = goals.length > 0 ? goals[0].name : "";

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="spinner-border text-primary" role="status"></div>
            </div>
        );
    }

    return (
        <div
            className="container-fluid px-0"  // px-0 → horizontal padding remove
            style={{ backgroundColor: "#f8f9fa", overflowX: "hidden" }} // overflowX hidden → horizontal scroll remove
        >

            {/* Header */}
            <div
                className="d-flex justify-content-between align-items-center px-4"
                style={{
                    backgroundColor: "#900603",
                    padding: "25px 0",
                    position: "sticky",
                    top: 0,
                    zIndex: 1000,
                }}
            >
            
                <div>
                    <h2 className="fw-bold fs-2 text-white mb-0">Investment Portfolios</h2>
                    <p className="text-white small">
                        Grow your wealth with smart investments
                    </p>
                </div>

                <button
                    className="btn text-white d-flex align-items-right"
                    style={{ backgroundColor: "#780606", border: "2px solid white" }}
                    onClick={handleScrollToInvestments}
                >
                    <Plus size={25} className="me-2" /> Start Investing
                </button>
            </div>


            {/* Space between header and portfolio overview */}
            <div className="my-4"></div>  {/* 1.5-2rem vertical space */}

            {/* Portfolio Overview */}
            <div className="row g-4 mb-4">
                <div className="col-md-3">
                    <div className="card p-3 shadow-sm" style={{ borderTop: "4px solid #900603" }}>
                        <h5 className="d-flex align-items-center mb-0"><DollarSign className="me-2" style={{ color: "#f86605ff" }} /> Total Value</h5>
                        <h4 style={{ color: "#f86605ff" }}>{portfolioData.length > 0 ? formatCurrency(totalPortfolioValue) : "--"}</h4>
                        <small className="text-success">{portfolioData.length > 0 ? "↑ 8.5% this month" : ""}</small>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card p-3 shadow-sm" style={{ borderTop: "4px solid #780606" }}>
                        <h5 className="d-flex align-items-center mb-0"><TrendingUp className="me-2" style={{ color: "#128d07ff" }} /> Total Returns</h5>
                        <h4 style={{ color: "#128d07ff" }}>{portfolioData.length > 0 ? "₹45,680" : "--"}</h4>
                        <small className="text-muted">{portfolioData.length > 0 ? "15.2% overall" : ""}</small>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card p-3 shadow-sm" style={{ borderTop: "4px solid #950606" }}>
                        <h5 className="d-flex align-items-center mb-0"><Target className="me-2" style={{ color: "#0e2fc0ff" }} /> Goal Progress</h5>
                        <h4 style={{ color: "#0e2fc0ff" }}>{goals.length > 0 ? `${totalGoalProgress}%` : "--"}</h4>
                        <small className="text-muted">{portfolioData.length > 0 ? "Retirement fund" : ""}</small>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card p-3 shadow-sm" style={{ borderTop: "4px solid #900603" }}>
                        <h5 className="d-flex align-items-center mb-0"><BarChart3 className="me-2" style={{ color: "#6a0683ff" }} /> Risk Score</h5>
                        <h4 style={{ color: "#6a0683ff" }}>{portfolioData.length > 0 ? "Moderate" : "--"}</h4>
                        <small className="text-muted">{portfolioData.length > 0 ? "Balanced portfolio" : ""}</small>
                    </div>
                </div>
            </div>

            {/* Current Portfolio */}
            <div className="card mb-4 shadow-sm">
                <div className="card-header d-flex justify-content-between align-items-center text-white" style={{ backgroundColor: "#900603" }}>
                    <div>
                        <h5 className="mb-0">Current Portfolio</h5>
                        <small>Your investment allocation and performance</small>
                    </div>
                    <button
                        className="btn text-white d-flex align-items-center"
                        style={{ backgroundColor: "#780606" }}
                        onClick={() => setShowPortfolioDetails(!showPortfolioDetails)}  // ✅ Toggle
                    >
                        <Eye size={25} className="me-2" /> {showPortfolioDetails ? "Hide Details" : "View Details"}
                    </button>
                </div>

                {/* ✅ Details only when toggled true */}
                {showPortfolioDetails && (
                    <div className="card-body">
                        {portfolioData.length === 0 ? (
                            <p className="text-muted">No investments yet. Start investing below.</p>
                        ) : (
                            portfolioData.map((item, index) => (
                                <div
                                    key={item.name}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 * index }}
                                    className="d-flex justify-content-between align-items-center border rounded p-3 mb-2"
                                >
                                    <div className="d-flex align-items-center">
                                        <div className="p-2 rounded me-3" style={{ backgroundColor: "#90060320" }}>
                                            <PieChart style={{ color: "#900603" }} />
                                        </div>
                                        <div>
                                            <p className="mb-0 fw-bold">{item.name}</p>
                                            <small className="text-muted">{item.allocation}% allocation</small>
                                        </div>
                                    </div>
                                    <div className="text-end">
                                        <p className="mb-0 fw-bold">{formatCurrency(item.value)}</p>
                                        <div className="d-flex align-items-center justify-content-end">
                                            {item.change >= 0 ? (
                                                <TrendingUp size={14} className="me-1" style={{ color: "#780606" }} />
                                            ) : (
                                                <TrendingDown size={14} className="me-1" style={{ color: "#950606" }} />
                                            )}
                                            <small style={{ color: item.change >= 0 ? "#780606" : "#950606" }}>
                                                {item.change >= 0 ? "+" : ""}{item.change}%
                                            </small>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>


            {/* Investment Options */}
            <div ref={investmentSectionRef} className="card mb-4 shadow-sm">
                <div className="card-header text-white" style={{ backgroundColor: "#900603" }}>
                    <h5 className="mb-0">Investment Options</h5>
                    <small>Explore new investment opportunities</small>
                </div>
                <div className="card-body">
                    <div className="row g-4">
                        {investmentOptions.map((option, index) => (
                            <div key={option._id} className="col-md-6 col-lg-4">
                                <motion.div
                                    
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 * index }}
                                    whileHover={{ y: -5 }}
                                >
                                    <div className="card h-100 shadow-sm">
                                        {option.investmentImage && (
                                            <img
                                                src={option.investmentImage}
                                                alt={option.investmentName}
                                                className="card-img-top"
                                                style={{ height: "180px", objectFit: "cover" }}
                                            />
                                        )}
                                        <div className="card-body">
                                            <div className="d-flex justify-content-between align-items-start mb-2">
                                                <div>
                                                    <h6 className="mb-0">{option.investmentName}</h6>
                                                    <small className="text-muted">{option.investmentType}</small>
                                                </div>
                                                <span className={getRiskColor(option.riskLevel || '')}>
                                                    {option.riskLevel} Risk
                                                </span>
                                            </div>
                                            <p className="text-muted small">{option.description}</p>
                                            <div className="mb-2">
                                                <div className="d-flex justify-content-between small">
                                                    <span>Expected Returns</span>
                                                    <span>{option.potentialReturns}</span>
                                                </div>
                                                <div className="d-flex justify-content-between small">
                                                    <span>Minimum Investment</span>
                                                    <span>{option.minimumInvestment ? formatCurrency(option.minimumInvestment) : 'N/A'}</span>
                                                </div>
                                            </div>
                                            <button
                                                className="btn text-white w-100"
                                                style={{ backgroundColor: "#950606" }}
                                                onClick={() => handleInvestNow(option)}
                                            >
                                                Invest Now
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bootstrap Modal (themed) */}
            {showModal && (
                <div
                    className="modal fade show"
                    tabIndex="-1"
                    style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
                    onClick={() => setShowModal(false)}
                >
                    <div
                        className="modal-dialog modal-dialog-centered"
                        style={{ maxWidth: "900px", width: "90%", margin: "1.5rem auto" }} // 🔥 bigger size + centered
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="modal-content rounded-4 shadow border-0">
                            {/* Header */}
                            <div
                                className="modal-header text-white"
                                style={{ backgroundColor: "#900603", borderBottom: "1px solid rgba(255,255,255,0.2)" }}
                            >
                                <h5 className="modal-title">Invest in {selectedInvestment?.investmentName}</h5>
                                <button
                                    type="button"
                                    className="btn-close btn-close-white"
                                    aria-label="Close"
                                    onClick={() => setShowModal(false)}
                                ></button>
                            </div>

                            {/* Body */}
                            <div className="modal-body">
                                <label className="form-label fw-semibold">Enter Amount</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={investmentAmount}
                                    onChange={(e) => setInvestmentAmount(e.target.value)}
                                    placeholder="Enter amount in INR"
                                    style={{ borderRadius: "0.5rem", marginTop: "0.5rem", height: "50px", fontSize: "1.1rem" }} // 🔥 bigger input
                                />
                            </div>

                            {/* Footer */}
                            <div className="modal-footer d-flex justify-content-between">
                                <button
                                    className="btn text-white flex-fill me-2"
                                    style={{ backgroundColor: "#780606", borderRadius: "0.5rem", height: "50px", fontSize: "1rem" }}
                                    onClick={() => setShowModal(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="btn text-white flex-fill ms-2"
                                    style={{ backgroundColor: "#900603", borderRadius: "0.5rem", height: "50px", fontSize: "1rem" }}
                                    onClick={handleConfirmInvestment}
                                >
                                    Confirm
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}


            {/* Investment Goals */}
            <div className="card shadow-sm" >
                <div className="card-header d-flex justify-content-between align-items-center text-white" style={{ backgroundColor: "#900603" }}>
                    <div>
                        <h5 className="mb-0">Investment Goals</h5>
                        <small>Track your financial objectives</small>
                    </div>
                    <button
                        className="btn text-white d-flex align-items-center"
                        style={{ backgroundColor: "#780606" }}
                        onClick={() => navigate("/Client/add-goal")}
                    >
                        <Plus size={25} className="me-2" /> Add Goal
                    </button>
                </div>
                <div className="card-body">
                    <div className="row g-4">
                        {goals.map((goal, index) => {
                            const progress = Math.round((goal.current / goal.target) * 100);
                            return (
                                <motion.div
                                    key={goal.name + index}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.1 * index }}
                                    className="col-md-6"
                                >
                                    <div className="border rounded p-3 h-100" style={{ backgroundColor: "#f8f9fa" }}>
                                        <div className="d-flex justify-content-between align-items-start mb-2">
                                            <h6 className="mb-0">{goal.name}</h6>
                                            <span className="badge text-white" style={{ backgroundColor: "#950606" }}>{progress}%</span>
                                        </div>
                                        <div className="mb-3 small">
                                            <div className="d-flex justify-content-between">
                                                <span className="text-muted">Current</span>
                                                <span>{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(goal.current)}</span>
                                            </div>
                                            <div className="d-flex justify-content-between">
                                                <span className="text-muted">Target</span>
                                                <span>{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(goal.target)}</span>
                                            </div>
                                            <div className="d-flex justify-content-between">
                                                <span className="text-muted">Deadline</span>
                                                <span>{new Date(goal.deadline).toLocaleDateString()}</span>
                                            </div>
                                            <div className="d-flex justify-content-between">
                                                <span className="text-muted">Monthly SIP</span>
                                                <span>{goal.sip ? new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(goal.sip) : "--"}</span>
                                            </div>
                                        </div>
                                        <div className="progress mb-3">
                                            <div
                                                className="progress-bar"
                                                role="progressbar"
                                                style={{ width: `${progress}%`, backgroundColor: "#128D07" }}
                                                aria-valuenow={progress}
                                                aria-valuemin="0"
                                                aria-valuemax="100"
                                            ></div>
                                        </div>

                                        {/* ✅ Line Chart for each goal */}
                                        <div style={{ width: "100%", height: 150 }} className="mb-3">
                                            <ResponsiveContainer>
                                                <LineChart data={goal.history || []}>
                                                    <CartesianGrid strokeDasharray="3 3" />
                                                    <XAxis dataKey="month" />
                                                    <YAxis />
                                                    <Tooltip />
                                                    <Line type="monotone" dataKey="value" stroke="#00bfff" strokeWidth={2} />
                                                </LineChart>
                                            </ResponsiveContainer>
                                        </div>

                                        <button
                                            className="btn text-white btn-sm w-100"
                                            style={{ backgroundColor: "#900603" }}
                                            onClick={() => handleContribute(index)}
                                        >
                                            Contribute
                                        </button>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Investment Tips Section */}
            <div className="container-fluid px-3 my-4">
                <div className="card shadow-sm border rounded-4 p-4">
                    <div className="text-center mb-5">
                        <h3 className="fw-bold">Investment Tips for Success</h3>
                    </div>
                    <div className="row text-center">

                        {/* Tip 1 */}
                        <div className="col-md-4 mb-4">
                            <div className="d-flex flex-column align-items-center">
                                <div className="mb-3" style={{ fontSize: "3rem", color: "#900603" }}>
                                    <i className="bi bi-bullseye"></i>
                                </div>
                                <h5 className="fw-bold">Diversify Your Portfolio</h5>
                                <p className="text-muted fs-5">
                                    Spread your investments across different asset classes to reduce risk
                                </p>
                            </div>
                        </div>

                        {/* Tip 2 */}
                        <div className="col-md-4 mb-4">
                            <div className="d-flex flex-column align-items-center">
                                <div className="mb-3" style={{ fontSize: "3rem", color: "#900603" }}>
                                    <i className="bi bi-graph-up-arrow"></i>
                                </div>
                                <h5 className="fw-bold">Think Long-term</h5>
                                <p className="text-muted fs-5">
                                    Patient investors often see better returns over extended periods
                                </p>
                            </div>
                        </div>

                        {/* Tip 3 */}
                        <div className="col-md-4 mb-4">
                            <div className="d-flex flex-column align-items-center">
                                <div className="mb-3" style={{ fontSize: "3rem", color: "#900603" }}>
                                    <i className="bi bi-shield-check"></i>
                                </div>
                                <h5 className="fw-bold">Understand Risk</h5>
                                <p className="text-muted fs-5">
                                    Higher returns often come with higher risk – invest accordingly
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>



        </div>
    );
};

export default InvestmentPage;
