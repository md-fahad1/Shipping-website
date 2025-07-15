import { useEffect } from 'react';

import {useNavigate } from "react-router-dom";

 

export default function SessionCheck() {

    const navigate = useNavigate();

    useEffect(() => {

        const session = sessionStorage.getItem('item_key');

        if (!session) {

            navigate('/Login');

        }

    }, []);

    // useEffect((user) => {

    //     const session = sessionStorage.getItem('email');

    //     if (!session) {

    //         router.push('/');

    //     }

    // }, [user]);

    return null;

};