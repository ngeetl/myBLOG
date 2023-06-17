import React, { useRef, useState } from 'react'


const useToast = () => {
    const toasts = useRef([]);
    const [toastRerender, setToastRerender] = useState(false);

    const addToast = (toast) => {
        let id = Math.random();
        const toastWithId = {...toast, id: id};

        toasts.current = [...toasts.current, toastWithId];
        
        setTimeout(() => removeToast(id), 4000);
    }
  
    const removeToast = (id) => {
        const toastFilter = toasts.current.filter(toast => toast.id !== id);
        
        toasts.current = toastFilter;

        setToastRerender(prev => !prev);
    }

  return [toasts.current, addToast, removeToast]
}

export default useToast
