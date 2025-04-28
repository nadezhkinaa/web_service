import { Link } from "react-router-dom";

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
