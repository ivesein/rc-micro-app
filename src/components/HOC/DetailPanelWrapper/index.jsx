import React from 'react';
import PannelWrapper from "./PannelWrapper";
import './index.scss';

export const commonTitleWrapperForDetail = component => title => (props,ref) => {
    const classList = [
        'common-title-wrapper-for-detail-box'
    ]
    return (
        <div className={classList.join(' ')}>
            <div className="common-title-wrapper-for-detail-title">
                {title}
            </div>
            <PannelWrapper>
                <div className="common-title-wrapper-for-detail" style={{...props.style}}>
                    {component(props,ref)}
                </div>
            </PannelWrapper>
        </div>
    )
}
export default commonTitleWrapperForDetail;