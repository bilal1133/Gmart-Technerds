import React from 'react';

const SmallLoader = () => {
    return (
        <div className="loader_back">
            <div id="page-preloader">
                <div className="page-loading">
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                </div>
            </div>
        </div>
    );
}

export default SmallLoader;

// <div className="lds-ripple">
//     <div></div>
//     <div></div>
// </div>