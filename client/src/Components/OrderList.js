import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteorder } from '../JS/OrderSlice';
import { Link } from "react-router-dom";  // 🔥 import Link
import "./OrderList.css";

function OrderList({ ping, setping }) {
    const dispatch = useDispatch();
    const { orderlist } = useSelector((state) => state.order);

    const totalProducts = orderlist?.reduce((acc, item) => acc + (item.price || 0), 0) || 0;
    const shipping = 0;
    const fiscal = 10.0;

    return (
        <div className="cart-containerr">
            <table>
                <thead>
                    <tr>
                        <th>Book</th>
                        <th>Book Title</th>
                        <th>Status</th>
                        <th>Price</th>
                        <th>Cancel</th>
                    </tr>
                </thead>
                <tbody>
                    {orderlist && orderlist.map((item) => (
                        <tr key={item._id}>
                            <td>
                                <img
                                    src={item.bookimage || 'default-image.jpg'}
                                    alt={item.booktitle}
                                />
                            </td>
                            <td>{item.booktitle}</td>
                            <td>
                                <span className="status">Available</span>
                            </td>
                            <td>{item.price ? item.price.toFixed(2) : '0.00'} DT</td>
                            <td>
                                <button
                                    className="close-btn"
                                    onClick={() => {
                                        dispatch(deleteorder(item?._id));
                                        setping(!ping);
                                    }}
                                >
                                    ✖
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Résumé panier */}
            <div className="cart-summary">
                <p>Subtotal ({orderlist?.length || 0}) : <b>{totalProducts.toFixed(3)} DT</b></p>
                <p>Shipping : <b>Free Shipping</b></p>
                <p>Additional Tax : <b>{fiscal.toFixed(3)} DT</b></p>
                <h3>Order Total : {(totalProducts + fiscal + shipping).toFixed(3)} DT</h3>

                <div className="cart-actions">
                    <Link to="/book">
                        <button className="back-btn">Back to Book List</button>
                    </Link>
                    <button className="buy-btn">Confirm Purchase</button>
                </div>
            </div>
        </div>
    );
}

export default OrderList;
