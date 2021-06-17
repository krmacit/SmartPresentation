import "./HTMLGenerator.scss"
import { React, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import showdown from 'showdown';


export const HTMLGenerator = () => {
    const [slideName, setSlideName] = useState([]);

    useEffect(
        () => {
        }, []
    );

    function mdChange(e) {
        var text = document.getElementById('source').value;
        var tohtml = new showdown.Converter().makeHtml(text);
        var doc = document.getElementById('resultMD').contentWindow.document;
        doc.open();
        doc.write(tohtml);
        doc.close();
    };

    function setName(event) {
        setSlideName(event.target.value + ".html");
    };

    function saveFile(event) {
        event.preventDefault();
        var text = document.getElementById('source').value;
        var tohtml = new showdown.Converter().makeHtml(text);
        localStorage.setItem(slideName, tohtml)
    };

    function downloadFile(event) {
        event.preventDefault();
        var text = document.getElementById('source').value;
        var output = new showdown.Converter().makeHtml(text);
        console.log(output);
        const blob = new Blob([output], { type: 'json' });
        var csvURL = window.URL.createObjectURL(blob);
        var tempLink = document.createElement('a');
        tempLink.href = csvURL;
        tempLink.setAttribute('download', slideName);
        tempLink.click();
    };


    return (
        <div className="HTMLGenerator">
            <div className="HTMLGeneratorHead">
                <div>
                    <h1>HTML Generator</h1>
                </div>
                <Link className="HomeButton" to={`/`}>Homepage</Link>
            </div>

            <div className="HTMLGeneratorSlideName">
                <form>
                    <p>Slide name:</p>
                    <input type="text" onChange={setName} />
                </form>
                <div className="HTMLGeneratorButtons">
                    <button onClick={saveFile} >
                        Save Slide to System
                    </button>
                    <button onClick={downloadFile} >
                        Download as HTML File
                    </button>
                </div>
            </div>

            <div className="HTMLGeneratorBody">
                <textarea id="source" onChange={mdChange} cols="30" rows="10"></textarea>
                <iframe id="resultMD" title="resultMD" src="about:blank" frameBorder="1"></iframe>
            </div>
        </div>
    );
}