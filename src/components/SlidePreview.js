import { React, useEffect } from 'react';
import "./SlidePreview.scss"


export const SlidePreview = ({ slideName, openPage }) => {

    useEffect(
        () => {
            var tohtml = localStorage.getItem(slideName);
            var doc = document.getElementById(slideName).contentWindow.document;
            doc.open();
            doc.write(tohtml);
            doc.close();
        }, [slideName]
    );

    function addToSlide(e) {
        openPage(slideName)
    };

    return (
        <div className="SlidePreview" >
            <div>
                <h4>{slideName}</h4>
            </div>
            <div>
                <iframe id={slideName} title={slideName} src="about:blank" frameBorder="1"></iframe>
            </div>
            <div>
                <button onClick={addToSlide} >Go</button>
            </div>
        </div>
    );
}