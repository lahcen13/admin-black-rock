import styles from '@tailwindcss/typography/src/styles';
import React, { useEffect, useState } from 'react';
import Lottie from 'react-lottie';
import LoadingAnimation from '../../../lotties/97930-loading.json'
import Styles from './LoadAnimation.module.css';

const LoadAnimation = (props) => {
    const [activate,setActivate] = useState(true)
    const [loadingAnimation, setLoadingAnimation] = useState({
        loop: true,
        autoplay: true,
        animationData: LoadingAnimation,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    })
  
    return (
        <tr>
            <td>
                <div id={Styles.container} tabIndex="-1" aria-hidden="true" className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full h-full">
                    <div className="relative p-4 w-full max-w-md h-full h-auto top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
                        <div className="md:text-base text-sm p-2 h-24">
                            {activate && <Lottie options={loadingAnimation} height={90} width={90} />}

                        </div>
                    </div>
                </div>
            </td>
        </tr>
    )


}
export default LoadAnimation;
