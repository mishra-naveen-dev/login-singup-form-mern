import { toast } from 'react-toastify';
export const handleError = (error) => {
    console.error(error?.response?.data?.message);
    toast.error(error?.response?.data?.message);
}