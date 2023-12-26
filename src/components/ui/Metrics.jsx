export function Metrics({ valor, name }) {
  return (
    <div className="border rounded-md px-6 py-3 shadow-md text-center font-medium">
      <div>{name}</div>
      <div>{valor}</div>
    </div>
  );
}
