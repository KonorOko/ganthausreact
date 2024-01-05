export default function Tooltip({ message, children, className }) {
    return (
    <div className={`group md:relative md:flex`}>
        {children}
        <span class={`font-semibold absolute left-1/2 -translate-x-1/2 -top-[100%] scale-0 transition-all rounded shadow-lg border border-gray-300 bg-white p-2 text-sm text-black group-hover:scale-110 ${className}`}>{message}</span>
    </div>
    )
}