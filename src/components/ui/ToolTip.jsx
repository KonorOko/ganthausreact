export default function Tooltip({ message, children, className }) {
    return (
    <div className={`group relative z-30 w-full flex ${className}`}>
        {children}
        <span class="font-semibold absolute -top-[90%] scale-0 transition-all rounded shadow-lg border border-gray-300 bg-white p-2 text-sm text-black group-hover:scale-110">{message}</span>
    </div>
    )
}