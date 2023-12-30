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
        className="hover:text-blue-50 border-blue-800 bg-blue-300 rounded-lg px-2 md:px-6 shadow-lg text-base md:text-lg mt-auto"
        ref={buttonRef}
        onClick={() => setOpen(!open)}
      >
        {name}
      </button>
      {open && (
        <div
          ref={menuRef}
          className="overflow-hidden rounded-md bg-white p-1 md:p-1 w-32 md:w-40 shadow-lg absolute top-10 -z-50 -translate-x-1/2 left-1/2"
        >
          <ul className="-z-50">
            {Menus.map((menu, index) => (
              <Link to={`/${links[index]}`} id={index} key={index}>
                <li
                  className="p-1 md:p-2 text-base text-left cursor-pointer rounded hover:bg-blue-50 -z-50 bg-white"
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
