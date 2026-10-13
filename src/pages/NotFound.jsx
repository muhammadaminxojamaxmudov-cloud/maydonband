import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="empty">
      <h2>Sahifa topilmadi</h2>
      <Link to="/" className="btn">
        Bosh sahifa
      </Link>
    </div>
  )
}
