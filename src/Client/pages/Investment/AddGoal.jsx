import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Target } from "lucide-react";

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
        <div
            className="px-0"
            style={{
                minHeight: "100vh",
                backgroundColor: "#f8f9fa",
                overflowX: "hidden", // horizontal scroll remove
            }}
        >
            {/* Full-width Header */}
            <div
                className="w-full mb-4 position-relative"
                style={{
                    backgroundColor: "#950606", // 🔴 dark red background
                    padding: "1rem 0"           // ⬅️ size thoda chhota niche se
                }}
            >
                {/* Back to Investments Button */}
                <span
                    className="position-absolute fw-semibold"
                    style={{
                        left: "1.5rem",
                        top: "50%",
                        transform: "translateY(-50%)",
                        cursor: "pointer",
                        color: "#FFD580", // 🌟 light gold for contrast
                        fontSize: "1rem"
                    }}
                    onClick={() => navigate("/Client/investment")}
                >
                    <i className="bi bi-arrow-left-circle me-2"></i>Back to Investments
                </span>

                {/* Header Title */}
                <div className="text-center">
                    <h2 className="fw-bold mb-2 text-white" style={{ letterSpacing: "0.5px" }}>
                        <i className="bi bi-bullseye me-2 text-warning"></i> Add Investment Goal
                    </h2>
                    <p className="text-light fs-6 mb-0">
                        Set up a new financial goal to track your progress
                    </p>
                </div>
            </div>




            <div className="container-fluid px-4 mt-4">
                <div className="row">
                    {/* Left Column - Form */}
                    <div className="col-lg-8 mb-4">
                        <div
                            className="card p-4"
                            style={{
                                border: "1px solid #dee2e6",
                                borderRadius: "8px",
                            }}
                        >
                            <h5 className="fw-bold mb-3 d-flex align-items-center">
                                <Target className="me-2 text-warning" /> Goal Details
                            </h5>
                            <p className="text-muted mb-4">
                                Provide information about your investment goal
                            </p>

                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    {/* Goal Name */}
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label fw-semibold">Goal Name *</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="e.g., Dream House Down Payment"
                                            value={goalName}
                                            onChange={(e) => setGoalName(e.target.value)}
                                            required
                                        />
                                    </div>

                                    {/* Target Amount */}
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label fw-semibold">Target Amount (₹) *</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            placeholder="e.g., 2000000"
                                            value={targetAmount}
                                            onChange={(e) => setTargetAmount(e.target.value)}
                                            required
                                        />
                                    </div>

                                    {/* Current Amount */}
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label fw-semibold">Current Amount (₹)</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            placeholder="e.g., 50000"
                                            value={currentAmount}
                                            onChange={(e) => setCurrentAmount(e.target.value)}
                                        />
                                    </div>

                                    {/* Deadline */}
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label fw-semibold">Target Date *</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            value={deadline}
                                            onChange={(e) => setDeadline(e.target.value)}
                                            required
                                        />
                                    </div>

                                    {/* SIP */}
                                    <div className="col-md-6 mb-4">
                                        <label className="form-label fw-semibold">Monthly Contribution (₹)</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            placeholder="e.g., 10000"
                                            value={sip}
                                            onChange={(e) => setSip(e.target.value)}
                                        />
                                    </div>
                                </div>

                                {/* Buttons */}
                                <div className="d-flex justify-content-end gap-2">
                                    <button
                                        type="button"
                                        className="btn btn-light"
                                        onClick={() => navigate("/Client/investment")}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="btn text-white"
                                        style={{ backgroundColor: "#900603" }}
                                    >
                                        Save Goal
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Right Column - Info Cards */}
                    <div className="col-lg-4">
                        {/* Goal Summary */}
                        <div
                            className="card p-3 mb-4"
                            style={{ border: "1px solid #dee2e6", borderRadius: "8px" }}
                        >
                            <h6 className="fw-bold text-dark mb-2">📊 Goal Summary</h6>
                            <p className="text-muted mb-0">Preview of your investment goal</p>
                        </div>

                        {/* Investment Tips */}
                        <div
                            className="card p-3"
                            style={{ border: "1px solid #dee2e6", borderRadius: "8px" }}
                        >
                            <h6 className="fw-bold text-dark mb-3">💡 Investment Tips</h6>
                            <ul className="list-unstyled small mb-0">
                                <li className="mb-2 text-danger">• Start early to benefit from compound interest</li>
                                <li className="mb-2 text-danger">• Review and adjust your goals regularly</li>
                                <li className="mb-2 text-danger">• Diversify your investment portfolio</li>
                                <li className="mb-0 text-danger">• Consider tax-saving investment options</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddGoal;
