import React from 'react';
import commonTitleWrapperForDetail from "../../../../../components/HOC/DetailPanelWrapper";
import TYPES from '../../../../../constant'
import InnerPartyDetail from "./InnerParty";
import OuterPartyDetail from "./OuterParty";

const InterestedPartyDetail = ({detailService}) => {
    const checkProperties = detailService?.detail?.plan?.checkProperties;

    const componentMap = {
        [TYPES.OUTER_CHECK]: () => <OuterPartyDetail info={detailService?.detail?.person ?? []}/>,
        [TYPES.INNER_CHECK]: () => <InnerPartyDetail info={detailService?.detail?.person ?? []}/>
    }

    return (
        <div>
            {componentMap?.[checkProperties]?.()}
        </div>
    );
};

export default commonTitleWrapperForDetail(InterestedPartyDetail)('相关方');