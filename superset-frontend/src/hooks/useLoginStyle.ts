import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

export default function useLoginStyle() {
  const path = useLocation().pathname;

  useEffect(() => {
    if (path !== '/login/') return;
    const alert = document.getElementById('alert-container');
    const username = document.querySelector('input#username');
    const password = document.querySelector('input#password');
    if (alert === null || username === null || password === null) return;

    (username as HTMLInputElement).placeholder = 'Please enter your ID';
    (password as HTMLInputElement).placeholder = 'Please enter your Password';
  }, [path]);
}
