export function Metrics({ valor, name }) {
  return (
    <div className="border rounded-md px-6 md:py-3 py-2 shadow-md text-center font-medium text-sm md:text-base bg-slate-50">
      <div>{name}</div>
      <div>{valor}</div>
    </div>
  );
}
