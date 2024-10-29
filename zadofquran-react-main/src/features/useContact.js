import { useMutation } from "@tanstack/react-query";
import { contact as contactApi } from "../services/apiGlobal";
import { toast } from "react-hot-toast";
export function useContact(setError) {
    const { mutate: contact, isLoading } = useMutation({
        mutationFn: (data) => contactApi(data, setError),
        onSuccess: (user) => {
            toast.success("تم الأرسال بنجاح");
        },
        onError: (err) => {
            toast.error(err.message);
        },
    });

    return { contact, isLoading };
}
