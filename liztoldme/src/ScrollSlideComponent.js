import React, { useEffect, useState, useRef } from 'react';
import '../src/App.css'; // Adjust the path as necessary

const FadeUpElement = ({ children }) => {
    const [isVisible, setIsVisible] = useState(false);
    const elementRef = useRef(null);

    const handleScroll = () => {
        if (elementRef.current) {
            const elementTop = elementRef.current.getBoundingClientRect().top;
            const elementBottom = elementRef.current.getBoundingClientRect().bottom;
            const windowHeight = window.innerHeight;
            
            // Reset visibility when element is out of view
            if (elementBottom < 0 || elementTop > windowHeight) {
                setIsVisible(false);
            }
            // Set visible when element is in view
            else if (elementTop < windowHeight - 100) {
                setIsVisible(true);
            }
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Check on mount
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div 
            ref={elementRef} 
            className={`fade-up ${isVisible ? 'visible' : ''}`}
        >
            {children}
        </div>
    );
};

export default FadeUpElement;