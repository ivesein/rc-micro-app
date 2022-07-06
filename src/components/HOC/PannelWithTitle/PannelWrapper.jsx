import React from 'react';
import { Collapse } from 'antd';
const { Panel } = Collapse;

const PannelWrapper = props => {
    return (
        <Collapse defaultActiveKey={['1']} ghost>
            <Panel key="1" ghost={true}>
                {
                    props.children
                }
            </Panel>
        </Collapse>
    );
};

export default PannelWrapper;