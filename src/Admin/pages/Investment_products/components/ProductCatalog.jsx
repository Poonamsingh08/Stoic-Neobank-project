import React, { useState } from "react";
import "./ProductCatalog.css";

// Pre-defined images
const productImages = {
  "Mutual Fund": "https://images.pexels.com/photos/8437000/pexels-photo-8437000.jpeg?auto=compress&cs=tinysrgb&w=800",
  "Bank FD": "https://images.pexels.com/photos/843700/pexels-photo-843700.jpeg?auto=compress&cs=tinysrgb&w=800",
  "Exchange Traded Fund": "https://images.pexels.com/photos/5980742/pexels-photo-5980742.jpeg?auto=compress&cs=tinysrgb&w=800",
  "Stock": "https://images.pexels.com/photos/5716004/pexels-photo-5716004.jpeg?auto=compress&cs=tinysrgb&w=800"
};

const initialProducts = [
  { id: 1, name: "Equity Mutual Fund", type: "Mutual Fund", price: "₹5,000", returns: "12-15% annually", risk: "High Risk", enabled: true, status: "approved" },
  { id: 2, name: "Fixed Deposit", type: "Bank FD", price: "₹1,000", returns: "6-7% annually", risk: "Low Risk", enabled: true, status: "approved" },
];

const initialRequests = [
  { id: 101, name: "Gold ETF", type: "Exchange Traded Fund", price: "₹2,000", returns: "8-10% annually", risk: "Medium Risk", enabled: true, status: "pending" },
  { id: 102, name: "Bluechip Stocks", type: "Stock", price: "₹10,000", returns: "15% annually", risk: "High Risk", enabled: true, status: "pending" },
];

const riskColors = { "High Risk": "product-badge-danger", "Medium Risk": "product-badge-warning", "Low Risk": "product-badge-success" };

export default function ProductCatalog() {
  const [products, setProducts] = useState(initialProducts);
  const [requests, setRequests] = useState(initialRequests);
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [formData, setFormData] = useState({ name: "", type: "Mutual Fund", price: "", returns: "", risk: "Low Risk", enabled: true });

  const handleShow = (product = null) => {
    if (product) {
      setEditProduct(product);
      setFormData(product);
    } else {
      setFormData({ name: "", type: "Mutual Fund", price: "", returns: "", risk: "Low Risk", enabled: true });
    }
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setEditProduct(null);
  };

  const handleSave = () => {
    if (!formData.name || !formData.type || !formData.price || !formData.returns) {
      alert("Fill all fields!");
      return;
    }
    if (editProduct) {
      setProducts(products.map(p => p.id === editProduct.id ? { ...formData, id: editProduct.id, status: p.status } : p));
    } else {
      setProducts([...products, { ...formData, id: Date.now(), status: "approved" }]);
    }
    handleClose();
  };

  const handleDelete = (id) => { if (window.confirm("Delete this product?")) setProducts(products.filter(p => p.id !== id)); };
  const toggleEnable = (id) => { setProducts(products.map(p => p.id === id ? { ...p, enabled: !p.enabled } : p)); };

  const approveRequest = (reqId) => {
    const req = requests.find(r => r.id === reqId);
    if (req) {
      setProducts([...products, { ...req, status: "approved" }]);
      setRequests(requests.filter(r => r.id !== reqId));
    }
  };
  const rejectRequest = (reqId) => { setRequests(requests.filter(r => r.id !== reqId)); };

  // Merge approved and pending for same grid display
  const allProducts = [...requests, ...products];

  return (
    <div className="product-container">
      <div className="product-header">
        <h3 className="product-title">Investment Options</h3>
        <button className="product-btn-primary" onClick={() => handleShow()}>Add Product</button>
      </div>

      {/* All products in single grid */}
      <div className="product-grid">
        {allProducts.map((item) => (
          <div key={item.id} className={`product-card ${item.status === "approved" && !item.enabled ? "product-disabled" : ""}`}>
            <img src={productImages[item.type]} alt={item.name} className="product-card-img" />
            <div className="product-card-body">
              <div className="product-card-header">
                <div>
                  <h4>{item.name}</h4>
                  <small>{item.type}</small>
                </div>
                <span className={riskColors[item.risk]}>{item.risk}</span>
              </div>
              <p><strong>Expected Returns:</strong> {item.returns}</p>
              <p><strong>Min Investment:</strong> {item.price}</p>

              {/* Pending request actions */}
              {item.status === "pending" ? (
                <div className="product-actions">
                  <button className="product-btn-success" onClick={() => approveRequest(item.id)}>Approve</button>
                  <button className="product-btn-danger" onClick={() => rejectRequest(item.id)}>Reject</button>
                </div>
              ) : (
                <>
                  <button className={`product-btn-full ${item.enabled ? "product-btn-danger" : "product-btn-secondary"}`}>
                    {item.enabled ? "Invest Now" : "Disabled"}
                  </button>
                  <div className="product-actions">
                    <button className="product-btn-primary" onClick={() => handleShow(item)}>Edit</button>
                    <button className="product-btn-danger" onClick={() => handleDelete(item.id)}>Delete</button>
                    <button className={item.enabled ? "product-btn-success" : "product-btn-secondary"} onClick={() => toggleEnable(item.id)}>
                      {item.enabled ? "Disable" : "Enable"}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="product-modal-overlay">
          <div className="product-modal-box">
            <div className="product-modal-header">
              <h4>{editProduct ? "Edit Product" : "Add Product"}</h4>
              <button className="product-modal-close" onClick={handleClose}>✕</button>
            </div>
            <div className="product-modal-body">
              <label>Product Name</label>
              <input type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
              <label>Type</label>
              <select value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })}>
                <option>Mutual Fund</option>
                <option>Bank FD</option>
                <option>Exchange Traded Fund</option>
                <option>Stock</option>
              </select>
              <label>Price / Minimum Investment</label>
              <input type="text" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} />
              <label>Expected Returns</label>
              <input type="text" value={formData.returns} onChange={e => setFormData({ ...formData, returns: e.target.value })} />
              <label>Risk</label>
              <select value={formData.risk} onChange={e => setFormData({ ...formData, risk: e.target.value })}>
                <option>Low Risk</option>
                <option>Medium Risk</option>
                <option>High Risk</option>
              </select>
              <label>
                <input type="checkbox" checked={formData.enabled} onChange={e => setFormData({ ...formData, enabled: e.target.checked })} />
                Enable Product
              </label>
            </div>
            <div className="product-modal-footer">
              <button className="product-btn-secondary" onClick={handleClose}>Cancel</button>
              <button className="product-btn-primary" onClick={handleSave}>{editProduct ? "Update" : "Add"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
