import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Target } from "lucide-react";
import "./AddGoal.css";

const AddGoal = () => {
    const navigate = useNavigate();

    const [goalName, setGoalName] = useState("");
    const [targetAmount, setTargetAmount] = useState("");
    const [currentAmount, setCurrentAmount] = useState("");
    const [deadline, setDeadline] = useState("");
    const [sip, setSip] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const newGoal = {
            name: goalName,
            target: parseInt(targetAmount),
            current: currentAmount ? parseInt(currentAmount) : 0,
            deadline,
            sip: sip ? parseInt(sip) : 0,
        };

        const storedGoals = JSON.parse(sessionStorage.getItem("goals")) || [];
        const updatedGoals = [...storedGoals, newGoal];
        sessionStorage.setItem("goals", JSON.stringify(updatedGoals));

        navigate("/Client/investment");
    };

    return (
        <div className="add-goal-page">
            {/* Header */}
            <div className="add-goal-header">
                <span className="back-btn" onClick={() => navigate("/Client/investment")}>
                    ← Back to Investments
                </span>
                <div className="header-title">
                    <h2>
                        <Target className="header-icon" />{" "}
                        <span>Add Investment Goal</span>
                    </h2>
                    <p>Set up a new financial goal to track your progress</p>
                </div>
            </div>

            {/* Form and Info Section */}
            <div className="add-goal-container">
                {/* Left Column - Form */}
                <div className="form-column">
                    <div className="goal-form-card">
                        <h5><Target className="form-icon" /> Goal Details</h5>
                        <p>Provide information about your investment goal</p>
                        <form onSubmit={handleSubmit}>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Goal Name *</label>
                                    <input
                                        type="text"
                                        placeholder="e.g., Dream House Down Payment"
                                        value={goalName}
                                        onChange={(e) => setGoalName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Target Amount (₹) *</label>
                                    <input
                                        type="number"
                                        placeholder="e.g., 2000000"
                                        value={targetAmount}
                                        onChange={(e) => setTargetAmount(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Current Amount (₹)</label>
                                    <input
                                        type="number"
                                        placeholder="e.g., 50000"
                                        value={currentAmount}
                                        onChange={(e) => setCurrentAmount(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Target Date *</label>
                                    <input
                                        type="date"
                                        value={deadline}
                                        onChange={(e) => setDeadline(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Monthly Contribution (₹)</label>
                                    <input
                                        type="number"
                                        placeholder="e.g., 10000"
                                        value={sip}
                                        onChange={(e) => setSip(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="form-buttons">
                                <button type="button" className="btn-cancel" onClick={() => navigate("/Client/investment")}>
                                    Cancel
                                </button>
                                <button type="submit" className="btn-save">
                                    Save Goal
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Right Column - Info */}
                <div className="info-column">
                    <div className="info-card">
                        <h6>📊 Goal Summary</h6>
                        <p>Preview of your investment goal</p>
                    </div>
                    <div className="info-card">
                        <h6>💡 Investment Tips</h6>
                        <ul>
                            <li>Start early to benefit from compound interest</li>
                            <li>Review and adjust your goals regularly</li>
                            <li>Diversify your investment portfolio</li>
                            <li>Consider tax-saving investment options</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddGoal;
