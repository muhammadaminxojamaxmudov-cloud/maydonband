import { Link } from 'react-router-dom'
import { FIELDS, formatPrice } from '../data.js'

export default function Home() {
  return (
    <>
      <section className="hero">
        <h1>Futbol maydonini oson band qiling</h1>
        <p>Maydonni tanlang, qulay vaqtni belgilang va do'stlaringiz bilan o'yinga chiqing.</p>
      </section>
      <div className="grid">
        {FIELDS.map((f) => (
          <Link key={f.id} to={`/field/${f.id}`} className="card">
            <div className="card-cover" style={{ background: f.color }}>
              ⚽
            </div>
            <div className="card-body">
              <h3>{f.name}</h3>
              <p className="muted">{f.address}</p>
              <div className="tags">
                <span className="tag">{f.size}</span>
                <span className="tag">{f.surface}</span>
                <span className="tag">{f.covered ? 'Yopiq' : 'Ochiq'}</span>
              </div>
              <p className="price">{formatPrice(f.pricePerHour)} / soat</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}
