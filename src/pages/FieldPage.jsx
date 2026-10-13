import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { CLOSE_HOUR, FIELDS, OPEN_HOUR, formatHour, formatPrice } from '../data.js'
import { useOrders } from '../OrdersContext.jsx'
import NotFound from './NotFound.jsx'

function today() {
  const d = new Date()
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset())
  return d.toISOString().slice(0, 10)
}

export default function FieldPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addOrder, bookedHours } = useOrders()
  const field = FIELDS.find((f) => f.id === id)

  const [date, setDate] = useState(today())
  const [startHour, setStartHour] = useState(null)
  const [hours, setHours] = useState(1)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [error, setError] = useState('')

  if (!field) return <NotFound />

  const booked = new Set(bookedHours(field.id, date))
  const now = new Date()
  const isToday = date === today()
  const slots = Array.from({ length: CLOSE_HOUR - OPEN_HOUR }, (_, i) => OPEN_HOUR + i)
  const isUnavailable = (h) => booked.has(h) || (isToday && h <= now.getHours())

  const rangeFree = (start, len) =>
    start + len <= CLOSE_HOUR && Array.from({ length: len }, (_, i) => start + i).every((h) => !isUnavailable(h))

  const submit = (e) => {
    e.preventDefault()
    if (startHour === null) return setError('Boshlanish vaqtini tanlang')
    if (!rangeFree(startHour, hours)) return setError("Tanlangan vaqt oralig'i band yoki mavjud emas")
    if (!name.trim()) return setError('Ismingizni kiriting')
    if (!/^\+?[\d\s-]{9,}$/.test(phone.trim())) return setError("Telefon raqamini to'g'ri kiriting")

    addOrder({
      fieldId: field.id,
      fieldName: field.name,
      date,
      startHour,
      hours,
      name: name.trim(),
      phone: phone.trim(),
      total: field.pricePerHour * hours,
    })
    navigate('/orders')
  }

  return (
    <div className="field-page">
      <Link to="/" className="back">
        ← Barcha maydonlar
      </Link>
      <div className="field-header" style={{ background: field.color }}>
        <h1>{field.name}</h1>
        <p>{field.address}</p>
      </div>

      <div className="field-layout">
        <section className="panel">
          <h2>Ma'lumot</h2>
          <ul className="info">
            <li>
              <b>O'lcham:</b> {field.size}
            </li>
            <li>
              <b>Qoplama:</b> {field.surface}
            </li>
            <li>
              <b>Turi:</b> {field.covered ? 'Yopiq' : 'Ochiq'}
            </li>
            <li>
              <b>Narx:</b> {formatPrice(field.pricePerHour)} / soat
            </li>
          </ul>
          <div className="tags">
            {field.features.map((f) => (
              <span key={f} className="tag">
                {f}
              </span>
            ))}
          </div>
        </section>

        <form className="panel" onSubmit={submit}>
          <h2>Band qilish</h2>
          <label>
            Sana
            <input
              type="date"
              value={date}
              min={today()}
              onChange={(e) => {
                setDate(e.target.value)
                setStartHour(null)
                setError('')
              }}
              required
            />
          </label>

          <div className="label">Boshlanish vaqti</div>
          <div className="slots">
            {slots.map((h) => (
              <button
                type="button"
                key={h}
                disabled={isUnavailable(h)}
                className={'slot' + (startHour !== null && h >= startHour && h < startHour + hours ? ' active' : '')}
                onClick={() => {
                  setStartHour(h)
                  setError('')
                }}
              >
                {formatHour(h)}
              </button>
            ))}
          </div>

          <label>
            Davomiyligi
            <select value={hours} onChange={(e) => setHours(Number(e.target.value))}>
              {[1, 2, 3, 4].map((n) => (
                <option key={n} value={n}>
                  {n} soat
                </option>
              ))}
            </select>
          </label>
          <label>
            Ismingiz
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ali Valiyev" />
          </label>
          <label>
            Telefon
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+998 90 123 45 67"
            />
          </label>

          {startHour !== null && (
            <p className="summary">
              {formatHour(startHour)} – {formatHour(startHour + hours)} ·{' '}
              <b>{formatPrice(field.pricePerHour * hours)}</b>
            </p>
          )}
          {error && <p className="error">{error}</p>}
          <button type="submit" className="btn">
            Band qilish
          </button>
        </form>
      </div>
    </div>
  )
}
