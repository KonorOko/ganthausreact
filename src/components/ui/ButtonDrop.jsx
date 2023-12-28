import { useRef, useState } from "react";
import { Link } from "react-router-dom";

export function ButtonDrop({ props, name, links }) {
  const [open, setOpen] = useState(false);
  const Menus = [...props];
  const menuRef = useRef();
  const buttonRef = useRef();
  window.addEventListener("click", (e) => {
    if (e.target !== menuRef.current && e.target !== buttonRef.current) {
      setOpen(false);
    }
  });

  return (
    <div className="relative mx-0 z-50">
      <button
        className="hover:text-blue-50 border-blue-800 bg-blue-300 rounded-lg px-2 sm:px-6 shadow-lg"
        ref={buttonRef}
        onClick={() => setOpen(!open)}
      >
        {name}
      </button>
      {open && (
        <div
          ref={menuRef}
          className="bg-white p-4 w-52 shadow-lg absolute -left-14 top-10 -z-50"
        >
          <ul className="-z-50">
            {Menus.map((menu, index) => (
              <Link to={`/${links[index]}`} id={index} key={index}>
                <li
                  className="p-2 text-lg cursor-pointer rounded hover:bg-blue-50 -z-50 bg-white"
                  key={index}
                >
                  {menu}
                </li>
              </Link>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
