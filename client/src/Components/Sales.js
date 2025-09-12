import { useDispatch, useSelector } from "react-redux";
import { editorder, getorder } from "../JS/OrderSlice";
import './Sales.css';

function Sales() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.order.orderlist);
  const user = useSelector((state) => state.user?.user);

  const handleConfirm = async (id, currentStatus) => {
    if (currentStatus === "Confirmed") return;

    const confirm = window.confirm("Do you want to confirm this order?");
    if (confirm) {
      await dispatch(editorder({ id, edited: { status: "Confirmed" } }));

      dispatch(getorder());
    }
  };

  return (
    <div className="sales-container">
      <h1 className="sales-title"> My Sales</h1>
      <table className="sales-table">
        <thead>
          <tr>
            <th>Cover</th>
            <th>Title</th>
            <th>Customer</th>
            <th>Amount</th>
            <th>Order Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders
            ?.filter((el) => el?.Owner === user?.username)
            .map((el) => (
              <tr key={el._id}>
                <td>
                  <img
                    src={el?.bookimage}
                    alt={el?.booktitle}
                    className="book-img"
                  />
                </td>
                <td>{el?.booktitle}</td>
                <td>{el?.username}</td>
                <td>{el?.price} dt</td>
                <td>{el?.dateorder}</td>
                <td>
                  <span
                    className={`status ${
                      el?.status?.toLowerCase() === "confirmed"
                        ? "completed"
                        : "pending"
                    }`}
                    onClick={() => handleConfirm(el._id, el?.status)}
                    style={{
                      cursor: el?.status === "Confirmed" ? "default" : "pointer",
                    }}
                  >
                    {el?.status || "Pending"}
                  </span>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Sales;
