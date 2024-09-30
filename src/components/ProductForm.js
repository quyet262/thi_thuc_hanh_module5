import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProductForm = () => {
    const [product, setProduct] = useState({
        productCode: '',
        name: '',
        description: '',
        categoryId: '',
        price: '',
        quantity: '',
        importDate: ''
    });
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();
    const [error, setError] = useState('');

    useEffect(() => {
        axios.get('http://localhost:5000/categories')
            .then(response => setCategories(response.data))
            .catch(error => console.error('Error fetching categories:', error));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct(prevProduct => ({
            ...prevProduct,
            [name]: name === 'categoryId' ? parseInt(value, 10) : value
        }));
    };

    const validateProductCode = (code) => {
        const regex = /^PROD-\d{4}$/;
        return regex.test(code);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const currentDate = new Date().toISOString().split('T')[0];

        if (product.importDate > currentDate) {
            alert('Ngày nhập không được lớn hơn ngày hiện tại!');
            return;
        }

        if (!validateProductCode(product.productCode)) {
            setError('Mã sản phẩm phải theo định dạng PROD-xxxx.');
            return;
        } else {
            setError('');
        }


        axios.post('http://localhost:5000/products', product)
            .then(response => {
                console.log('Product added successfully:', response.data);
                alert('Thêm sản phẩm thành công!');
                navigate('/');
            })
            .catch(error => console.error('Error adding product:', error));
    };

    return (
        <div className="container mt-5">
            <h2>Thêm Sản Phẩm Mới</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Mã Sản Phẩm</label>
                    <input
                        type="text"
                        name="productCode"
                        value={product.productCode}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                    {error && <small className="text-danger">{error}</small>}
                </div>
                <div className="form-group">
                    <label>Tên Sản Phẩm</label>
                    <input
                        type="text"
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Mô Tả</label>
                    <textarea
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                        className="form-control"
                        required
                    ></textarea>
                </div>
                <div className="form-group">
                    <label>Thể Loại</label>
                    <select
                        name="categoryId"
                        value={product.categoryId}
                        onChange={handleChange}
                        className="form-control"
                        required
                    >
                        <option value="">Chọn thể loại</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Giá</label>
                    <input
                        type="number"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Số Lượng</label>
                    <input
                        type="number"
                        name="quantity"
                        value={product.quantity}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Ngày Nhập</label>
                    <input
                        type="date"
                        name="importDate"
                        value={product.importDate}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary mt-3">
                    Thêm Sản Phẩm
                </button>
            </form>
        </div>
    );
};

export default ProductForm;
