export default function Tooltip({ message, children }) {
    return (
    <div class="group relative flex z-50">
        {children}
        <span class="border-dotted font-semibold absolute -top-[90%] scale-0 transition-all rounded shadow-lg border border-gray-300 bg-white p-2 text-sm text-black group-hover:scale-110">{message}</span>
    </div>
    )
}