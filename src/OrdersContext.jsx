import { createContext, useContext, useEffect, useState } from 'react'

const STORAGE_KEY = 'maydonband.orders'
const OrdersContext = createContext(null)

function loadOrders() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function OrdersProvider({ children }) {
  const [orders, setOrders] = useState(loadOrders)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders))
  }, [orders])

  const addOrder = (order) => {
    const newOrder = { ...order, id: Date.now().toString(36), createdAt: new Date().toISOString() }
    setOrders((prev) => [newOrder, ...prev])
    return newOrder
  }

  const cancelOrder = (id) => setOrders((prev) => prev.filter((o) => o.id !== id))

  // Berilgan maydon va sanada band qilingan soatlar
  const bookedHours = (fieldId, date) =>
    orders
      .filter((o) => o.fieldId === fieldId && o.date === date)
      .flatMap((o) => Array.from({ length: o.hours }, (_, i) => o.startHour + i))

  return (
    <OrdersContext.Provider value={{ orders, addOrder, cancelOrder, bookedHours }}>
      {children}
    </OrdersContext.Provider>
  )
}

export function useOrders() {
  const ctx = useContext(OrdersContext)
  if (!ctx) throw new Error('useOrders must be used inside OrdersProvider')
  return ctx
}
