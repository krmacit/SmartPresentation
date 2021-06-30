import "./Homepage.scss"
import { React, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PresentationLink } from "../components/PresentationLink";

export const HomePage = () => {

    const [selectedSession, setSelectedSession] = useState();
    const [isSessionPicked, setIsSessionPicked] = useState(false);
    const [sessionUploadMessage, setSessionUploadMessage] = useState('');

    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [fileUploadMessage, setFileUploadMessage] = useState('');

    const [presentations, setPresentations] = useState([]);


    useEffect(
        () => {
            setPresentations(Object.keys(localStorage).filter(key => key.endsWith(".pres")))
        }, []
    );

    const uploadSessionChangeHandler = (event) => {
        setSelectedSession(event.target.files[0]);
        setIsSessionPicked(true);
    };

    const importSession = () => {
        if (isSessionPicked) {
            var reader = new FileReader();
            reader.onload = function (event) {
                var fileInput = event.target.result;
                Object.entries(JSON.parse(fileInput)).forEach(entry => localStorage.setItem(entry[0], entry[1]))
            };
            reader.readAsText(selectedSession);
            console.log(selectedSession)
            setSessionUploadMessage(selectedSession.name + ' is uploaded to the system! Refresh page!');
        } else {
            setSessionUploadMessage('No session file picked!');
        }
    };

    function exportSession(e) {
        e.preventDefault();
        let output = JSON.stringify(localStorage);
        console.log(output);
        const blob = new Blob([output], { type: 'json' });
        var csvURL = window.URL.createObjectURL(blob);
        var tempLink = document.createElement('a');
        tempLink.href = csvURL;
        tempLink.setAttribute('download', 'session.json');
        tempLink.click();
    };

    function deleteSession(e) {
        localStorage.clear();
    };

    const uploadFileChangeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsFilePicked(true);
    };

    const importFile = () => {
        if (isFilePicked) {
            var reader = new FileReader();
            reader.onload = function (event) {
                localStorage.setItem(selectedFile.name, event.target.result);
            };
            reader.readAsText(selectedFile);
            setFileUploadMessage(selectedFile.name + ' is uploaded to the system!');
        } else {
            setFileUploadMessage('No file picked!');
        }
    };

    return (
        <div className="HomePage">
            <div className="HomeTitle">
                <h1>Smart Presentation</h1>
            </div>
            <div className="HomeSession">
                <div className="HomeSessionTitle">
                    <h1>Session Management</h1>
                </div>
                <div className="HomeSessionBody">
                    <div className="HomeSessionBodyUpload">
                        <div>
                            <input type="file" name="file" onChange={uploadSessionChangeHandler} />
                        </div>
                        <div>
                            <button onClick={importSession}>Import Session</button>
                        </div>
                        <div>
                            {sessionUploadMessage && (<p className="error"> {sessionUploadMessage} </p>)}
                        </div>
                    </div>
                    <div className="HomeSessionBodyImport">
                        <div>
                            <button onClick={exportSession} >Export Session</button>
                        </div>
                        <div>
                            <button onClick={deleteSession} >Delete Current Session</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="HomeSlides">
                <div className="HomeSlidesTitle">
                    <h1>Slides Management</h1>
                </div>
                <div className="HomeSlidesBody">
                    <div className="HomeSlidesBodyUpload">
                        <div>
                            <input type="file" name="file" onChange={uploadFileChangeHandler} />
                        </div>
                        <div>
                            <button onClick={importFile}>Import HTML File</button>
                        </div>
                        <div>
                            {fileUploadMessage && (<p className="error"> {fileUploadMessage} </p>)}
                        </div>
                    </div>
                    <div className="HomeSlidesBodyGenerate">
                        <Link to={`/html-generator/`}>Create HTML page using MD</Link>
                    </div>
                </div>
            </div>
            <div className="HomePresentation">
                <div className="HomePresentationTitle">
                    <h1>Presentation Generator</h1>
                </div>
                <div className="HomePresentationBody">
                    <Link to={`/presentation-generator/`}>Create Presentation From HTML pages</Link>
                </div>
            </div>
            <div className="HomeNavigator">
                <div className="HomeNavigatorTitle">
                    <h1>Presentation Navigator</h1>
                </div>
                <div className="HomeNavigatorBody">
                    {presentations.map(presentation => <PresentationLink presentationName={presentation} />)}
                </div>
            </div>
            <a href="https://github.com/krmacit/SmartPresentation">Github Repo</a>
        </div>
    );
}
