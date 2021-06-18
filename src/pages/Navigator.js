import { React, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SlidePreview } from '../components/SlidePreview';
import "./Navigator.scss"


export const Navigator = ({ presentationName }) => {
    const [presentations, setPresentations] = useState([]);
    const [page, setPage] = useState(0);
    const [toc, setToc] = useState(false)

    useEffect(
        () => {
            if (toc === false) {
                console.log(localStorage.getItem(presentationName))
                setPresentations(JSON.parse(localStorage.getItem(presentationName)))
                console.log(presentations)
                setPage(0)
            }
        }, []
    );

    useEffect(
        () => {
            if (toc === false) {
                setIframe(page)
            }
        }, [presentations, page, toc]
    );

    function nextSlide(e) {
        if (page === presentations.length - 1) {
            return;
        }
        setPage(page + 1)
    };

    function previousSlide(e) {
        if (page === 0) {
            return;
        }
        setPage(page - 1);
    };

    function setIframe(slide) {
        var tohtml = localStorage.getItem(presentations[parseInt(slide)]);
        var doc = document.getElementById("frame").contentWindow.document;
        doc.open();
        doc.write(tohtml);
        doc.close();
    }

    function openTableOfContent(e) {
        setToc(!toc)
    }

    function openPage(e) {
        setToc(!toc)
        setPage(presentations.findIndex(p => p === e))
    }

    return (
        <div className="Navigator">
            <div className="NavigatorTitle">
                <div>
                    <h1>Navigator</h1>
                </div>
                <Link to={`/`} className="HomeButton">
                    Homepage
                </Link>
            </div>
            {
                toc ?
                    <div className="slidePreview">
                        {presentations.map(slide => <div><SlidePreview key={slide} slideName={slide} openPage={openPage} /></div>)}
                    </div> :
                    <div>
                        <iframe id="frame" title="Iframe" />
                    </div>
            }
            <div className="NavigatorButtons">
                <button onClick={previousSlide}>
                    Previous Slide
                </button>
                <button onClick={openTableOfContent}>
                    Table Of Content
                </button>
                <button onClick={nextSlide}>
                    Next Slide
                </button>
            </div>
        </div>
    );
}