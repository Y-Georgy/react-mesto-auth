import logo from '../images/logo.svg'
import { Link } from 'react-router-dom'
import { Route, Switch } from 'react-router-dom'

function Header() {
  const headerProfile = document.querySelector('.header__profile-top')
  const headerBurgerMenuIcon = document.querySelector('.header__burger-menu-icon')

  function handleBurgerMenuClick() {
    headerProfile.classList.add("header__profile-top_opened")
    headerBurgerMenuIcon.style.display = 'none'
  }

  function handleBurgerMenuClose() {
    headerBurgerMenuIcon.classList.remove('header__profile-top_opened')
  }

  return (
    <>
      <Route exact path="/">
        <div className="header__profile-top">
          <p className="header__email">email@yandex.ru</p>
          <Link to="/sign-in" className="header__link header__link_color_grey">
            Выйти
          </Link>
        </div>
      </Route>

      <header className="header page__header">
        <Link to="/" className="header__link">
          <img src={logo} alt="Логотип Mesto" className="header__logo" />
        </Link>
        <nav className="header__nav">
          <Switch>
            <Route path="/sign-up">
              <Link to="/sign-in" className="header__link">
                Войти
              </Link>
            </Route>
            <Route path="/sign-in">
              <Link to="/sign-up" className="header__link">
                Регистрация
              </Link>
            </Route>
            <Route exact path="/">
              <div className="header__burger-menu-icon" onClick={handleBurgerMenuClick} />
              <div className="header__burger-menu-close" onClick={handleBurgerMenuClose} />
              <div className="header__profile-right">
                <p className="header__email">email@yandex.ru</p>
                <Link to="/sign-in" className="header__link header__link_color_grey">
                  Выйти
                </Link>
              </div>
            </Route>
          </Switch>
        </nav>
      </header>
    </>
  )
}

export default Header;
