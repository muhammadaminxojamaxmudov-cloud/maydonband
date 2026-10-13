import { NavLink, Route, Routes } from 'react-router-dom'
import { useOrders } from './OrdersContext.jsx'
import Home from './pages/Home.jsx'
import FieldPage from './pages/FieldPage.jsx'
import Orders from './pages/Orders.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  const { orders } = useOrders()

  return (
    <div className="app">
      <header className="header">
        <NavLink to="/" className="logo">
          ⚽ MaydonBand
        </NavLink>
        <nav className="nav">
          <NavLink to="/" end>
            Maydonlar
          </NavLink>
          <NavLink to="/orders">
            Buyurtmalarim{orders.length > 0 && <span className="badge">{orders.length}</span>}
          </NavLink>
        </nav>
      </header>
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/field/:id" element={<FieldPage />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <footer className="footer">© {new Date().getFullYear()} MaydonBand</footer>
    </div>
  )
}
