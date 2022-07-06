import React from 'react';
import './index.scss'

const CommonTilte = props => {
    return (
        <div className="common-title">
            <span className="common-title-icon"/>
            <span className="common-title-content">{props.title}</span>
        </div>
    );
};

export default CommonTilte;