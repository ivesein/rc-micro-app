import React from 'react';

const viewFactory = CommonView => hooks => props => {
    return <CommonView {...{hooks, ...props}} />;
};

export default viewFactory;