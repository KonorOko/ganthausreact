export function Tabs({ names, tab, setTab }) {
  return (
    <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200">
      <ul className="flex flex-wrap -mb-px">
        {names.map((name, key) => (
          <li className="me-2" key={key}>
            <div
              onClick={() => setTab(name)}
              className={`inline-block p-2 md:p-4 border-b-2 rounded-tl-lg cursor-pointer ${
                tab === name
                  ? "text-blue-600 border-blue-600"
                  : "hover:text-gray-600 hover:border-gray-400 border-transparent"
              }`}
            >
              {name}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
