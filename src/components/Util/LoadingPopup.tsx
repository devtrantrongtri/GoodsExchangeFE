import React, { useEffect, useState } from 'react';
import './LoadingPopup.css'; // Import the CSS file for the loading effect

const LoadingPopup: React.FC = () => {
    const [showPopup, setShowPopup] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowPopup(false);
        }, 1000); // Hiển thị trong ít nhất 1 giây

        return () => clearTimeout(timer); // Dọn dẹp timer khi component unmount
    }, []);

    if (!showPopup) return null; // Ẩn popup khi thời gian đã hết

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50">
            <div className="ctn-preloader">
                <div className="animation-preloader">
                    <div className="spinner"></div>
                    <div className="txt-loading">
                        <span className="letters-loading" data-text-preloader='G'>G</span>
                        <span className="letters-loading" data-text-preloader='O'>O</span>
                        <span className="letters-loading" data-text-preloader='O'>O</span>
                        <span className="letters-loading" data-text-preloader='D'>D</span>
                        <span className="letters-loading" data-text-preloader='S'>S</span>
                        <span className="letters-loading" data-text-preloader=' '> </span>
                        <span className="letters-loading" data-text-preloader='E'>E</span>
                        <span className="letters-loading" data-text-preloader='X'>X</span>
                        <span className="letters-loading" data-text-preloader='C'>C</span>
                        <span className="letters-loading" data-text-preloader='H'>H</span>
                        <span className="letters-loading" data-text-preloader='A'>A</span>
                        <span className="letters-loading" data-text-preloader='N'>N</span>
                        <span className="letters-loading" data-text-preloader='G'>G</span>
                        <span className="letters-loading" data-text-preloader='E'>E</span>
                        <span className="letters-loading" data-text-preloader='E'>E</span>
                    </div>
                    <p className="text-center">Loading...<br />Vui lòng chờ trong giây lát!</p>
                </div>
            </div>
        </div>
    );
};

export default LoadingPopup;
