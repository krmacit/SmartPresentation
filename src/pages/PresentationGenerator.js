import { React, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PresentationPreview } from '../components/PresentationPreview';
import "./PresentationGenerator.scss"


export const PresentationGenerator = () => {
    const [presentationName, setPresentationName] = useState([]);
    const [slides, setSlides] = useState([]);
    const [presentation, setPresentation] = useState([]);
    const [state, setState] = useState(0);

    useEffect(
        () => {
            setSlides(Object.keys(localStorage).filter(key => key.endsWith(".html")))
        }, []
    );

    function saveToFile(event) {
        write(presentation)
    };

    function setName(event) {
        setPresentationName(event.target.value);
    };

    function write(array) {
        localStorage.setItem(presentationName + ".pres", JSON.stringify(array))
    };

    function addSlide(slideName) {
        presentation.push(slideName)
        setState(state + 1)
    };

    return (
        <div className="PresentationGenerator">
            <div className="PresentationGeneratorTitle">
                <div>
                    <h1>Presentation Generator</h1>
                </div>
                <Link to={`/`} className="HomeButton">
                    Homepage
                </Link>
            </div>
            <div className="PresentationGeneratorHead">
                <div>
                    <form>
                        <p>Enter presentation name:</p>
                        <input type="text" onChange={setName} />
                    </form>
                </div>
                <div>
                    <p>Slide Order: {presentation.join()}</p>
                    <button onClick={saveToFile} >
                        Save Presentation
                    </button>
                </div>
            </div>
            <div className="PresentationGeneratorBody">
                {slides.map(presentation => <div><PresentationPreview key={presentation} presentationName={presentation} addToQueue={addSlide} /></div>)}
            </div>
        </div>
    );
}