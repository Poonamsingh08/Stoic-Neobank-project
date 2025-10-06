import React, { useState } from "react";
import "./ProductCatalog.css";

// Pre-defined images for product types
const productImages = {
  "Mutual Fund": "https://images.unsplash.com/photo-1611078484810-0be2b12f2304?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  "Bank FD": "https://images.unsplash.com/photo-1590502593746-2b7d9456ed13?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  "Exchange Traded Fund": "https://images.unsplash.com/photo-1573164574572-cb89e39749b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  "Stock": "https://images.unsplash.com/photo-1581091870625-3b36db248ee8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400"
};

// Initial products & pending requests
const initialProducts = [
  { id: 1, name: "Equity Mutual Fund", type: "Mutual Fund", price: "₹5,000", returns: "12-15% annually", risk: "High Risk", enabled: true, status: "approved" },
  { id: 2, name: "Fixed Deposit", type: "Bank FD", price: "₹1,000", returns: "6-7% annually", risk: "Low Risk", enabled: true, status: "approved" },
];

const initialRequests = [
  { id: 101, name: "Gold ETF", type: "Exchange Traded Fund", price: "₹2,000", returns: "8-10% annually", risk: "Medium Risk", enabled: true, status: "pending" },
  { id: 102, name: "Bluechip Stocks", type: "Stock", price: "₹10,000", returns: "15% annually", risk: "High Risk", enabled: true, status: "pending" },
];

const riskColors = { "High Risk": "danger", "Medium Risk": "warning", "Low Risk": "success" };

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
  const handleClose = () => { setShowModal(false); setEditProduct(null); };

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

  return (
    <div className="product-container">
      {/* Header */}
      <div className="product-header">
        <h3>Investment Options</h3>
        <button className="btn-primary" onClick={() => handleShow()}>Add Product</button>
      </div>

      {/* Pending Requests */}
      {requests.length > 0 && (
        <div className="pending-section">
          <h5>Pending Product Requests</h5>
          <div className="grid">
            {requests.map(req => (
              <div key={req.id} className="card">
                <img src={productImages[req.type]} alt={req.name} className="card-img" />
                <div className="card-body">
                  <div className="card-header">
                    <div>
                      <h4>{req.name}</h4>
                      <small>{req.type}</small>
                    </div>
                    <span className={`badge ${riskColors[req.risk]}`}>{req.risk}</span>
                  </div>
                  <p><strong>Expected Returns:</strong> {req.returns}</p>
                  <p><strong>Min Investment:</strong> {req.price}</p>
                  <div className="actions">
                    <button className="btn-success" onClick={() => approveRequest(req.id)}>Approve</button>
                    <button className="btn-danger" onClick={() => rejectRequest(req.id)}>Reject</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Approved Products */}
      <div className="grid">
        {products.map(product => (
          <div key={product.id} className={`card ${!product.enabled ? "disabled" : ""}`}>
            <img src={productImages[product.type]} alt={product.name} className="card-img" />
            <div className="card-body">
              <div className="card-header">
                <div>
                  <h4>{product.name}</h4>
                  <small>{product.type}</small>
                </div>
                <span className={`badge ${riskColors[product.risk]}`}>{product.risk}</span>
              </div>
              <p><strong>Expected Returns:</strong> {product.returns}</p>
              <p><strong>Min Investment:</strong> {product.price}</p>
              <button className={`btn-full ${product.enabled ? "btn-danger" : "btn-secondary"}`}>
                {product.enabled ? "Invest Now" : "Disabled"}
              </button>
              <div className="actions">
                <button className="btn-primary" onClick={() => handleShow(product)}>Edit</button>
                <button className="btn-danger" onClick={() => handleDelete(product.id)}>Delete</button>
                <button className={product.enabled ? "btn-success" : "btn-secondary"} onClick={() => toggleEnable(product.id)}>
                  {product.enabled ? "Disable" : "Enable"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <div className="modal-header">
              <h4>{editProduct ? "Edit Product" : "Add Product"}</h4>
              <button className="modal-close" onClick={handleClose}>✕</button>
            </div>
            <div className="modal-body">
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
            <div className="modal-footer">
              <button className="btn-secondary" onClick={handleClose}>Cancel</button>
              <button className="btn-primary" onClick={handleSave}>{editProduct ? "Update" : "Add"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
