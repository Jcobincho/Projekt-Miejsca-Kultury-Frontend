import React, {useState, useEffect, useRef} from 'react';
import {gsap} from 'gsap';

// Like/Heart icon functionality
export function LikeBtn() {
    const [likes, setLikes] = useState(0);
    const [clicked, setClicked] = useState(false);
    const likeLogoRef = useRef(null);
    const cardRef = useRef(null);

    useEffect(() => {
        if (clicked) {
            gsap.fromTo(likeLogoRef.current, 
                { scale: 0.85, opacity: 0.7}, 
                { scale: 1.2, opacity: 1, duration: 0.7, ease: "elastic.out(1, 0.75)", yoyo: true, repeat: 1, rotation: 0, stagger: 0.2, delay: 0.1 }
            );
            gsap.to(cardRef.current, { boxShadow: '0px 0px 15px 2px rgba(255, 131, 131, 0.38)', borderColor: '#000000' });
        } else {
            gsap.to(likeLogoRef.current, { scale: 1, opacity: 1, duration: 0.7 });
            gsap.to(cardRef.current, { boxShadow: '0px 4px 8px 0px rgba(0, 0, 0, 0.2)', borderColor: '#FFFFFF' });
        }
    }, [clicked]);

    const handleClick = () => {
        setLikes(clicked ? 0 : 1);
        setClicked(!clicked);
    };

    return (
        <div>
            <img ref={likeLogoRef} className="likeLogo" src={process.env.PUBLIC_URL + (clicked ? '/Heart_Logo_Liked.svg' : '/Heart_Logo.svg')} alt={clicked ? 'liked' : 'like'} onClick={handleClick} style={{ cursor: 'pointer' }} />
            <p className='likeCounter'>{likes}</p>
            <div ref={cardRef} className="card"></div>
        </div>
    );
}

// Card - iamge template area
export function Card() {
    return(
        <div className="card"> </div>
    );
}

export { LikeBtn as default, Card as LikeCard };
