import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from "react-router-dom";
import { TrendingUp, TrendingDown, DollarSign, PieChart, BarChart3, Target, Plus, Eye } from 'lucide-react';
import "./Investment.css";

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

        <div className="invp-container">
            {/* Header */}
            <div className="invp-header">
                <div>
                    <h2>Investment Portfolios</h2>
                    <p>Grow your wealth with smart investments</p>
                </div>
                <button className="invp-start-btn" onClick={handleScrollToInvestments}>
                    <Plus size={25} /> Start Investing
                </button>
            </div>
            {/* Spacer */}
            <div className="po-spacer"></div>
            {/* Portfolio Overview */}
            <div className="po-overview">
                <div className="po-card po-total-value">
                    <h5><DollarSign /> Total Value</h5>
                    <h4>{portfolioData.length > 0 ? formatCurrency(totalPortfolioValue) : "--"}</h4>
                    <small>{portfolioData.length > 0 ? "↑ 8.5% this month" : ""}</small>
                </div>
                <div className="po-card po-total-returns">
                    <h5><TrendingUp /> Total Returns</h5>
                    <h4>{portfolioData.length > 0 ? "₹45,680" : "--"}</h4>
                    <small>{portfolioData.length > 0 ? "15.2% overall" : ""}</small>
                </div>
                <div className="po-card po-goal-progress">
                    <h5><Target /> Goal Progress</h5>
                    <h4>{goals.length > 0 ? `${totalGoalProgress}%` : "--"}</h4>
                    <small>{portfolioData.length > 0 ? "Retirement fund" : ""}</small>
                </div>
                <div className="po-card po-risk-score">
                    <h5><BarChart3 /> Risk Score</h5>
                    <h4>{portfolioData.length > 0 ? "Moderate" : "--"}</h4>
                    <small>{portfolioData.length > 0 ? "Balanced portfolio" : ""}</small>
                </div>
            </div>
            {/* Current Portfolio */}
            <div className="current-portfolio">
                <div className="portfolio-header">
                    <div>
                        <h5>Current Portfolio</h5>
                        <small>Your investment allocation and performance</small>
                    </div>
                    <button className="toggle-btn" onClick={() => setShowPortfolioDetails(!showPortfolioDetails)}>
                        <Eye size={25} /> {showPortfolioDetails ? "Hide Details" : "View Details"}
                    </button>
                </div>

                {showPortfolioDetails && (
                    <div className="portfolio-details">
                        {portfolioData.length === 0 ? (
                            <p>No investments yet. Start investing below.</p>
                        ) : (
                            portfolioData.map((item, index) => (
                                <div key={item.name} className="portfolio-item">
                                    <div className="portfolio-info">
                                        <div className="icon-bg"><PieChart /></div>
                                        <div>
                                            <p className="item-name">{item.name}</p>
                                            <small>{item.allocation}% allocation</small>
                                        </div>
                                    </div>
                                    <div className="portfolio-value">
                                        <p>{formatCurrency(item.value)}</p>
                                        <div className="change">
                                            {item.change >= 0 ? (
                                                <TrendingUp size={14} />
                                            ) : (
                                                <TrendingDown size={14} />
                                            )}
                                            <small>{item.change >= 0 ? "+" : ""}{item.change}%</small>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>


            {/* Investment Options */}
            <div ref={investmentSectionRef} className="investment-card">
                <div className="investment-card-header">
                    <h5>Investment Options</h5>
                    <small>Explore new investment opportunities</small>
                </div>
                <div className="investment-card-body">
                    <div className="investment-row">
                        {investmentOptions.map((option, index) => (
                            <div key={option._id} className="investment-col">
                                <motion.div
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 * index }}
                                    whileHover={{ y: -5 }}
                                >
                                    <div className="investment-option-card">
                                        {option.investmentImage && (
                                            <img
                                                src={option.investmentImage}
                                                alt={option.investmentName}
                                                className="investment-img"
                                            />
                                        )}
                                        <div className="investment-option-body">
                                            <div className="investment-info-header">
                                                <div>
                                                    <h6>{option.investmentName}</h6>
                                                    <small>{option.investmentType}</small>
                                                </div>
                                                <span className={`risk-badge ${getRiskColor(option.riskLevel || '')}`}>
                                                    {option.riskLevel} Risk
                                                </span>
                                            </div>
                                            <p className="investment-desc">{option.description}</p>
                                            <div className="investment-stats">
                                                <div className="stat-row">
                                                    <span>Expected Returns</span>
                                                    <span>{option.potentialReturns}</span>
                                                </div>
                                                <div className="stat-row">
                                                    <span>Minimum Investment</span>
                                                    <span>{option.minimumInvestment ? formatCurrency(option.minimumInvestment) : 'N/A'}</span>
                                                </div>
                                            </div>
                                            <button className="invest-now-btn" onClick={() => handleInvestNow(option)}>
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

            {/* Bootstrap Modal */}
            {showModal && (
                <div className="custom-modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="custom-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="custom-modal-header">
                            <h5>Invest in {selectedInvestment?.investmentName}</h5>
                            <button className="modal-close-btn" onClick={() => setShowModal(false)}>×</button>
                        </div>
                        <div className="custom-modal-body">
                            <label className="modal-label">Enter Amount</label>
                            <input
                                type="number"
                                value={investmentAmount}
                                onChange={(e) => setInvestmentAmount(e.target.value)}
                                placeholder="Enter amount in INR"
                                className="modal-input"
                            />
                        </div>
                        <div className="custom-modal-footer">
                            <button className="modal-btn cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
                            <button className="modal-btn confirm-btn" onClick={handleConfirmInvestment}>Confirm</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Investment Goals */}
            <div className="goals-card">
                <div className="goals-card-header">
                    <div>
                        <h5>Investment Goals</h5>
                        <small>Track your financial objectives</small>
                    </div>
                    <button className="add-goal-btn" onClick={() => navigate("/Client/add-goal")}>
                        <Plus size={25} /> Add Goal
                    </button>
                </div>
                <div className="goals-card-body">
                    <div className="goals-row">
                        {goals.map((goal, index) => {
                            const progress = Math.round((goal.current / goal.target) * 100);
                            return (
                                <motion.div
                                    key={goal.name + index}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.1 * index }}
                                    className="goals-col"
                                >
                                    <div className="goal-item">
                                        <div className="goal-header">
                                            <h6>{goal.name}</h6>
                                            <span className="progress-badge">{progress}%</span>
                                        </div>
                                        <div className="goal-stats">
                                            <div className="stat-row">
                                                <span className="stat-label">Current</span>
                                                <span>{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(goal.current)}</span>
                                            </div>
                                            <div className="stat-row">
                                                <span className="stat-label">Target</span>
                                                <span>{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(goal.target)}</span>
                                            </div>
                                            <div className="stat-row">
                                                <span className="stat-label">Deadline</span>
                                                <span>{new Date(goal.deadline).toLocaleDateString()}</span>
                                            </div>
                                            <div className="stat-row">
                                                <span className="stat-label">Monthly SIP</span>
                                                <span>{goal.sip ? new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(goal.sip) : "--"}</span>
                                            </div>
                                        </div>
                                        <div className="goal-progress-bar">
                                            <div className="goal-progress-fill" style={{ width: `${progress}%` }}></div>
                                        </div>
                                        <div className="goal-chart">
                                            <ResponsiveContainer width="100%" height={150}>
                                                <LineChart data={goal.history || []}>
                                                    <CartesianGrid strokeDasharray="3 3" />
                                                    <XAxis dataKey="month" />
                                                    <YAxis />
                                                    <Tooltip />
                                                    <Line type="monotone" dataKey="value" stroke="#00bfff" strokeWidth={2} />
                                                </LineChart>
                                            </ResponsiveContainer>
                                        </div>
                                        <button className="contribute-btn" onClick={() => handleContribute(index)}>Contribute</button>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Investment Tips Section */}
            <div className="investment-tips-section">
                <div className="tips-card">
                    <div className="tips-header text-center">
                        <h3>Investment Tips for Success</h3>
                    </div>
                    <div className="tips-row text-center">

                        {/* Tip 1 */}
                        <div className="tip-col">
                            <div className="tip-item">
                                <div className="tip-icon">
                                    🎯
                                </div>
                                <h5>Diversify Your Portfolio</h5>
                                <p>
                                    Spread your investments across different asset classes to reduce risk
                                </p>
                            </div>
                        </div>

                        {/* Tip 2 */}
                        <div className="tip-col">
                            <div className="tip-item">
                                <div className="tip-icon">
                                    📈
                                </div>
                                <h5>Think Long-term</h5>
                                <p>
                                    Patient investors often see better returns over extended periods
                                </p>
                            </div>
                        </div>

                        {/* Tip 3 */}
                        <div className="tip-col">
                            <div className="tip-item">
                                <div className="tip-icon">
                                    🛡️
                                </div>
                                <h5>Understand Risk</h5>
                                <p>
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
