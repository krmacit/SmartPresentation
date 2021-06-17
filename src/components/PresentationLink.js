import { React } from 'react';
import { Link } from 'react-router-dom'


export const PresentationLink = ({ presentationName }) => {

    return (
        <div className="PresentationLink">
            <Link to={`/navigator/${presentationName}`}>
                {presentationName}
            </Link>
        </div>
    );
}