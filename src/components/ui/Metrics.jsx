export function Metrics({ valor, name }) {
  return (
    <div className="border rounded-md px-6 sm:py-3 py-2 shadow-md text-center font-medium">
      <div>{name}</div>
      <div>{valor}</div>
    </div>
  );
}
