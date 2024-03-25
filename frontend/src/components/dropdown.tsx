export default ({ title, url }: { title: string; url: { href: string } }) => {
  return (
    <div className="relative dropdown">
      <button className="dropdown bg-gray-900 text-gray-100 font-semibold py-2 px-4 rounded inline-flex items-center">
        <span className="dropdown">{title}</span>
        <svg
          className="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M10 12l-5-5 1.5-1.5L10 9l3.5-3.5L15 7z" />
        </svg>
      </button>
      <ul className="absolute dropdown-content hidden text-gray-700 pt-1 w-full bg-white border rounded shadow-lg py-1">
        <li
          className={
            url.href.endsWith("/") ? " pointer-events-none text-gray-500" : ""
          }
        >
          <a
            href="/"
            className={
              "disabled rounded-t bg-gray-200 hover:bg-gray-500 hover:text-white py-2 px-4 block whitespace-no-wrap"
            }
          >
            Index
          </a>
        </li>
      </ul>
    </div>
  );
};
