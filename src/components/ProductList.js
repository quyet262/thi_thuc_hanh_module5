import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [searchName, setSearchName] = useState('');
    const [searchCategory, setSearchCategory] = useState('');

    useEffect(() => {
        axios.get('http://localhost:5000/products')
            .then(response => {
                const sortedProducts = response.data.sort((a, b) => a.name.localeCompare(b.name));
                setProducts(sortedProducts);
            })
            .catch(error => console.error('Error fetching products:', error));

        axios.get('http://localhost:5000/categories')
            .then(response => setCategories(response.data))
            .catch(error => console.error('Error fetching categories:', error));
    }, []);


    const handleSearch = () => {
        axios.get('http://localhost:5000/products')
            .then(response => {
                const filteredProducts = response.data.filter(product => {
                    const matchesName = product.name.toLowerCase().includes(searchName.toLowerCase());
                    const matchesCategory = !searchCategory || product.categoryId === parseInt(searchCategory);
                    return matchesName && matchesCategory;
                });
                setProducts(filteredProducts.length > 0 ? filteredProducts : []);
            })
            .catch(error => console.error('Error searching products:', error));
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Danh sách sản phẩm</h2>
            <div className="row mb-3">
                <div className="col-md-6">
                    <input
                        type="text"
                        placeholder="Nhập tên sản phẩm"
                        className="form-control"
                        value={searchName}
                        onChange={(e) => setSearchName(e.target.value)}
                    />
                </div>
                <div className="col-md-4">
                    <select
                        className="form-control"
                        onChange={(e) => setSearchCategory(e.target.value)}
                        value={searchCategory}
                    >
                        <option value="">Chọn thể loại</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                </div>
                <div className="col-md-2">
                    <button className="btn btn-primary w-100" onClick={handleSearch}>Tìm kiếm</button>
                </div>
            </div>

            {products.length === 0 ? (
                <div className="alert alert-warning">No products found</div>
            ) : (
                <table className="table table-striped">
                    <thead className="thead-dark">
                    <tr>
                        <th>STT</th>
                        <th>Mã sản phẩm</th>
                        <th>Tên sản phẩm</th>
                        <th>Thể loại</th>
                        <th>Số lượng</th>
                        <th>Giá</th>
                        <th>Ngày nhập</th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.map((product, index) => (
                        <tr key={product.id}>
                            <td>{index +1}</td>
                            <td>{product.productCode}</td>
                            <td>{product.name}</td>
                            <td>{categories.find(cat => cat.id === product.categoryId)?.name}</td>
                            <td>{product.quantity}</td>
                            <td>{product.price}</td>
                            <td>{new Date(product.importDate).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })}</td>                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ProductList;
