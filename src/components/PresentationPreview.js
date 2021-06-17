import { React, useEffect } from 'react';
import "./PresentationPreview.scss"


export const PresentationPreview = ({ presentationName, addToQueue }) => {

    useEffect(
        () => {
            var tohtml = localStorage.getItem(presentationName);
            var doc = document.getElementById(presentationName).contentWindow.document;
            doc.open();
            doc.write(tohtml);
            doc.close();
        }, [presentationName]
    );

    function addToSlide(e) {
        addToQueue(presentationName)
    };

    return (
        <div className="PresentationPreview" >
            <div>
                <h4>{presentationName}</h4>
            </div>
            <div>
                <iframe id={presentationName} title={presentationName} src="about:blank" frameBorder="1"></iframe>
            </div>
            <div>
                <button onClick={addToSlide} >Add To Next</button>
            </div>
        </div>
    );
}