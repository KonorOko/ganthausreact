export function Metrics({ valor, name }) {
  return (
    <div className="border rounded-md px-6 sm:py-3 py-2 shadow-md text-center font-medium text-sm sm:text-base">
      <div>{name}</div>
      <div>{valor}</div>
    </div>
  );
}
