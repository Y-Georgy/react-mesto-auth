import logo from '../images/logo.svg'
import { Link } from 'react-router-dom'

export const Header = () => {
  return (
    <header className="header page__header">
      <Link to="/" className="header__link">
        <img src={logo} alt="Логотип Mesto" className="header__logo" />
      </Link>
      <Link to="/" className="header__link">
        Регистрация
      </Link>
    </header>
  )
}
