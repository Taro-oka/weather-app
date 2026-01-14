import { Link } from "react-router-dom";

const linkClass = "rounded-md px-3 py-2 text-sm font-medium text-slate-200 hover:bg-slate-800";

function Header() {
  return (
    <header className="border-b border-slate-800">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <h1 className="text-lg font-semibold tracking-wide">Weather App</h1>
        <nav className="flex items-center gap-2">
          <Link className={linkClass} to="/">
            Home
          </Link>
          <Link className={linkClass} to="/weather">
            Weather
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
