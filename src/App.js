import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';

function App() {
  return (
      <Router>
        <div className="App">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
              <a className="navbar-brand" href="/">Dược phẩm ACB</a>
              <div className="collapse navbar-collapse">
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <a className="nav-link" href="/">Danh sách sản phẩm</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/add-product">Thêm mới</a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          <div className="container mt-4">
            <Routes>
              <Route path="/" element={<ProductList />} />
              <Route path="/add-product" element={<ProductForm />} />
            </Routes>
          </div>
        </div>
      </Router>
  );
}

export default App;
