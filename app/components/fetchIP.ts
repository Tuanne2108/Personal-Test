"use client";

import { useEffect } from "react";

export default function FetchIP() {
    useEffect(() => {
        fetch('/api/getIp')
            .then(response => response.json())
            .then(data => {
                localStorage.setItem('customerIP', data.ip);
            })
            .catch(error => console.error('Error fetching IP:', error));
    }, []);

    return null;
}
