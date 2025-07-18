import React, { useEffect, useState, useRef } from 'react';
import '../App.css';

const AnimatedCard = ({ children, direction = 'left' }) => {
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
            className={`card-animation card-from-${direction} ${isVisible ? 'visible' : ''}`}
            style={{
                width: '30%',
                minWidth: '300px',
                background: 'white',
                borderRadius: '8px',
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                padding: '20px',
                margin: '10px',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translate(0, 0)' : 
                    direction === 'left' ? 'translateX(-100px)' :
                    direction === 'right' ? 'translateX(100px)' :
                    'translateY(100px)',
                transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                color: '#333',
                zIndex: 1
            }}
        >
            <div style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.8s ease' }}>
                {children}
            </div>
        </div>
    );
};

export default AnimatedCard; 