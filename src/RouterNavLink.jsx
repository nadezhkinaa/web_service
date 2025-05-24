import { Link } from "react-router-dom";
//Компонент настройки пункта меню
function RouterNavLink({ to, label, icon }) {
  return (
    <NavLink
      component={Link}
      to={to}
      label={label}
      icon={icon}
      active={location.pathname === to}
    />
  );
}

export default RouterNavLink;
