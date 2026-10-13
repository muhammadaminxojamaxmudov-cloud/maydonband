import { Link } from 'react-router-dom'
import { formatHour, formatPrice } from '../data.js'
import { useOrders } from '../OrdersContext.jsx'

export default function Orders() {
  const { orders, cancelOrder } = useOrders()

  if (orders.length === 0) {
    return (
      <div className="empty">
        <h2>Hozircha buyurtmalar yo'q</h2>
        <Link to="/" className="btn">
          Maydon tanlash
        </Link>
      </div>
    )
  }

  return (
    <>
      <h1>Buyurtmalarim</h1>
      <div className="orders">
        {orders.map((o) => (
          <div key={o.id} className="order">
            <div>
              <h3>{o.fieldName}</h3>
              <p className="muted">
                {o.date} · {formatHour(o.startHour)} – {formatHour(o.startHour + o.hours)} ({o.hours} soat)
              </p>
              <p className="muted">
                {o.name} · {o.phone}
              </p>
            </div>
            <div className="order-right">
              <p className="price">{formatPrice(o.total)}</p>
              <button
                className="btn btn-outline"
                onClick={() => {
                  if (confirm('Buyurtmani bekor qilasizmi?')) cancelOrder(o.id)
                }}
              >
                Bekor qilish
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
