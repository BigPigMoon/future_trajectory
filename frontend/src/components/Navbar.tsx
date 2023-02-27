import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          СпортКарт
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/">Карты</Link>
          </li>
          <li>
            <Link to="/charts">Графики</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
