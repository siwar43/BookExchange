import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ReactStars from "react-rating-stars-component";
import { FaRegHeart, FaHeart , FaShoppingCart } from "react-icons/fa";
import { IoIosArrowRoundBack } from "react-icons/io";
import "./BookDetails.css";

const BookDetails = () => {
    const { id } = useParams();
    const { booklist } = useSelector((state) => state.book);

    const [quantity, setQuantity] = useState(1);
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [cart, setCart] = useState([]);

    if (!booklist || booklist.length === 0) {
        return <h2 style={{ textAlign: "center", marginTop: "50px" }}> Loading books…</h2>;
    }

    const book = booklist.find((b) => b._id === id);

    if (!book) {
        return <h2 style={{ textAlign: "center", marginTop: "50px" }}>Book not found</h2>;
    }

    const increaseQty = () => setQuantity((prev) => prev + 1);
    const decreaseQty = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

    const addToCart = () => {
        setCart([...cart, { ...book, quantity }]); 
        alert(`${book.title} added to your cart ! `) ;
    };

    return (
        <div className="book-detail-container">
        <div className="book-detail-image">
            <img src={book.image} alt={book.title} />
        </div>

        <div className="book-detail-info">
            <h2>{book.title}</h2>

            <div className="rating">
            <ReactStars count={5} value={book.rate} size={22} edit={false} activeColor="#D4AF37" />
            <span className="rate-value">{book.rate.toFixed(1)}</span>
            </div>

            <div className="meta">
            <p><strong>Written by :</strong> {book.author}</p>
            <p><strong>Publisher :</strong> {book.editor}</p>
            </div>

            <p className="description">{book.description}</p>

            <div className="purchase-box">
            <div className="price-box">
                <span className="new-price">{book.price} dt</span>
            </div>

            <div className="actions">
                <div className="quantity">
                <button onClick={decreaseQty}>-</button>
                <span>{quantity}</span>
                <button onClick={increaseQty}>+</button>
                </div>

                <button className="add-cart" onClick={addToCart}>
                <FaShoppingCart size={15} /> Add To Cart
                </button>

                <button 
                className={`wishlist ${isWishlisted ? "active" : ""}`} 
                onClick={() => setIsWishlisted(!isWishlisted)}
                >
                {isWishlisted ? <FaHeart /> : <FaRegHeart />}
                </button>
            </div>
            </div>

                <Link to="/book" className="back-btn">
                    <IoIosArrowRoundBack size={20} style={{ verticalAlign: 'middle', marginRight: '2px' }} />      
                    Back to list
                </Link>
        </div>
        </div>
    );
};

export default BookDetails;
