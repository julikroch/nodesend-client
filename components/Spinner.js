import React from 'react';
import spinner from '../styles/Spinner.module.css'

const Spinner = () => (
    <div className={spinner['sk-chase']}>
        <div className={spinner["sk-chase-dot"]}></div>
        <div className={spinner["sk-chase-dot"]}></div>
        <div className={spinner["sk-chase-dot"]}></div>
        <div className={spinner["sk-chase-dot"]}></div>
        <div className={spinner["sk-chase-dot"]}></div>
        <div className={spinner["sk-chase-dot"]}></div>
    </div>
);

export default Spinner;