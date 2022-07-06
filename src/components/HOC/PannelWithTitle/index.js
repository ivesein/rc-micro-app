// forwardRef引用穿透专用hoc forward
import React from "react";
import CommonTilte from "./CommonTilte";
import PannelWrapper from "./PannelWrapper";
import './index.scss'

export const commonTitleWrapperWithRef = component => title => (props, ref) => {
    const classList = [
        'contract-titleWrapper-style',
        'titleWrapper-style-basicinfo',
    ]
    return (
        <div className={classList.join(' ')}>
            <div>
                <CommonTilte title={title}/>
            </div>
            <PannelWrapper>
                <div className="common-title-wrapper-with-color" style={{...(props.style??{})}}>
                    {component(props, ref)}
                </div>
            </PannelWrapper>
        </div>
    )
}

export const commonTitleWrapperAppendWithRef = component => buttonComponent => title => (props, ref) => {
    const classList = [
        'contract-titleWrapper-style',
        'titleWrapper-style-basicinfo',
    ]
    return (

        <div className={classList.join(' ')}>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <CommonTilte title={title}/>
                {
                    buttonComponent(props, ref)
                }
            </div>
            <PannelWrapper>
                <div className="common-title-wrapper-with-color">
                    {component(props, ref)}
                </div>
            </PannelWrapper>
        </div>

    )
}


export const commonTitleWrapperAppendWithHooksRef = Component => ButtonComponent => title => (props, ref) => {
    const classList = [
        'contract-titleWrapper-style',
        'titleWrapper-style-basicinfo',
    ]

    return (
        <div className={classList.join(' ')}>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <CommonTilte title={title}/>
                <ButtonComponent {...props} ref={ref}/>
            </div>
            <PannelWrapper>
                <div className="common-title-wrapper-with-color" style={{...(props.style??{})}}>
                    <Component {...props} ref={ref}/>
                </div>
            </PannelWrapper>
        </div>
    )
}