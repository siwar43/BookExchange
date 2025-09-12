import React, { useEffect } from 'react'; 
import { useSelector, useDispatch } from 'react-redux'; 
import ReactStars from 'react-rating-stars-component'; 
import './MyBooksList.css'; 
import { AiFillDelete } from 'react-icons/ai'; 
import { deletebook, getbook } from '../JS/bookSlice'; 
import Swal from 'sweetalert2';

function MyBooksList() {
    const dispatch = useDispatch();
    const books = useSelector((state) => state.book?.booklist || []);
    const user = useSelector((state) => state.user?.user);
    const status = useSelector((state) => state.book?.status);

    useEffect(() => {
        if (status !== 'success') {
            dispatch(getbook());
        }
    }, [dispatch, status]);

    const myBooks = books?.filter(
        (book) => book?.Owner?.toLowerCase() === user?.username?.toLowerCase()
    );

    const handleDelete = (book) => {
        Swal.fire({
            title: `Are you sure?`,
            text: `Do you want to delete "${book.title}"?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
            reverseButtons: true,
            customClass: {
                title: 'swal-title',
                text: 'swal-content',
                confirmButton: 'swal-confirm-btn',
                cancelButton: 'swal-cancel-btn',
            },
            buttonsStyling: false,
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deletebook(book._id)).then(() => dispatch(getbook()));
                Swal.fire({
                    title: 'Deleted!',
                    text: `"${book.title}" has been deleted.`,
                    icon: 'success',
                    customClass: {
                        title: 'swal-title',
                        content: 'swal-text',
                        confirmButton: 'swal-confirm-btn',
                    },
                    buttonsStyling: false,
                });
            }
        });
    };

    return (
        <div className="books-page">
            <h1 className="page-title">My Books</h1>
            <div className="books-container">
                {myBooks && myBooks.length > 0 ? (
                    myBooks.map((book) => (
                        <div className="book-card" key={book?._id}>
                            <div className="delete-icon" onClick={() => handleDelete(book)}>
                                <AiFillDelete />
                            </div>
                            <img
                                src={book?.image}
                                alt={book?.title}
                                className="book-image"
                            />
                            <h3 className="book-card-title">{book?.title}</h3>
                            <p className="category">{book?.category}</p>
                            <div className="stars">
                                <ReactStars
                                    count={5}
                                    value={book?.rate}
                                    size={24}
                                    edit={false}
                                    activeColor="#D4AF37"
                                />
                            </div>
                            <div className="hover-info">
                                <p className="price">{book?.price?.toFixed(2)} dt</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p style={{ textAlign: 'center', marginTop: '20px' }}>
                        No books found for this user.
                    </p>
                )}
            </div>
        </div>
    );
}

export default MyBooksList;
