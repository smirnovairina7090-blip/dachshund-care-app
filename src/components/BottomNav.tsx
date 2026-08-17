import { NavLink } from 'react-router'
import { PixelSprite, type PixelSpriteName } from './PixelSprite'

const items: Array<{ to: string; label: string; icon: PixelSpriteName }> = [
  { to: '/', label: 'Дом', icon: 'nav-home' },
  { to: '/training', label: 'Тренировка', icon: 'nav-training' },
  { to: '/adventures', label: 'Приключения', icon: 'nav-adventures' },
  { to: '/history', label: 'История', icon: 'nav-history' },
  { to: '/more', label: 'Ещё', icon: 'nav-more' },
]

export function BottomNav() {
  return (
    <nav className="bottom-nav" aria-label="Основная навигация">
      {items.map((item) => (
        <NavLink key={item.to} to={item.to} end={item.to === '/'} className={({ isActive }) => isActive ? 'nav-item nav-item-active' : 'nav-item'}>
          <PixelSprite name={item.icon} scale={0.5} className="nav-pixel-icon" />
          <span>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  )
}
