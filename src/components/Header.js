import logo from '../images/logo.svg';

export const Header = () => {
  return (
    <header className="header page__header">
      <img src={logo} alt="Логотип Mesto" className="header__logo" />
    </header>
  );
};
