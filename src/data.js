export const FIELDS = [
  {
    id: 'chilonzor-arena',
    name: 'Chilonzor Arena',
    address: 'Toshkent, Chilonzor tumani, 9-kvartal',
    pricePerHour: 250000,
    size: '40 × 20 m',
    surface: "Sun'iy maysa",
    covered: true,
    features: ['Kiyinish xonasi', 'Dush', 'Avtoturargoh', 'Yoritish'],
    color: '#16a34a',
  },
  {
    id: 'yunusobod-stadion',
    name: 'Yunusobod Mini Stadion',
    address: 'Toshkent, Yunusobod tumani, 4-mavze',
    pricePerHour: 300000,
    size: '50 × 30 m',
    surface: "Sun'iy maysa",
    covered: false,
    features: ['Tribuna', 'Kiyinish xonasi', 'Yoritish'],
    color: '#0ea5e9',
  },
  {
    id: 'sergeli-sport',
    name: 'Sergeli Sport Markazi',
    address: 'Toshkent, Sergeli tumani, Yangi Sergeli ko\'chasi',
    pricePerHour: 200000,
    size: '36 × 18 m',
    surface: 'Futzal qoplamasi',
    covered: true,
    features: ['Kiyinish xonasi', 'Kafe', 'Avtoturargoh'],
    color: '#f59e0b',
  },
  {
    id: 'mirzo-ulugbek-park',
    name: "Mirzo Ulug'bek Park",
    address: "Toshkent, Mirzo Ulug'bek tumani, Buyuk Ipak Yo'li",
    pricePerHour: 350000,
    size: '60 × 40 m',
    surface: 'Tabiiy maysa',
    covered: false,
    features: ['Dush', 'Avtoturargoh', 'Yoritish', 'Forma ijarasi'],
    color: '#8b5cf6',
  },
]

// Maydonlar 08:00 dan 23:00 gacha ishlaydi
export const OPEN_HOUR = 8
export const CLOSE_HOUR = 23

export function formatPrice(sum) {
  return sum.toLocaleString('ru-RU').replace(/,/g, ' ') + " so'm"
}

export function formatHour(h) {
  return String(h).padStart(2, '0') + ':00'
}
