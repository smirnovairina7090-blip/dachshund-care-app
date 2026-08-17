import { NavLink } from 'react-router'

const items = [
  { to: '/', label: 'Сегодня', icon: '⌂' },
  { to: '/training', label: 'Дрессировка', icon: '★' },
  { to: '/adventures', label: 'Приключения', icon: '▧' },
  { to: '/history', label: 'История', icon: '◷' },
  { to: '/more', label: 'Ещё', icon: '•••' },
]

export function BottomNav() {
  return (
    <nav className="bottom-nav" aria-label="Основная навигация">
      {items.map((item) => (
        <NavLink key={item.to} to={item.to} end={item.to === '/'} className={({ isActive }) => isActive ? 'nav-item nav-item-active' : 'nav-item'}>
          <span className="nav-icon" aria-hidden="true">{item.icon}</span>
          <span>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  )
}
