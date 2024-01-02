import toast from "react-hot-toast";

export function AwaitToast({ promise, loading = "Cargando...", success = "Proceso exitoso!", error = "Ha ocurrido un error!" }) {
    return (
        toast.promise(
            promise,
            {
                loading: loading,
                success: success,
                error: error
            }
        )
    )
}

export function AwaitToastCustom({ promise, loading = "Cargando...", success = "Proceso exitoso!", error = "Ha ocurrido un error!" }) {
    return (
        toast.promise(
            promise,
            {
                loading: loading,
                success: success,
                error: error
            },
            {
                position: "bottom-right",
                style: {
                    minWidth: "250px",
                },
            }
        )
    )
}