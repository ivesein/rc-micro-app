import React from 'react';
import {InspectDetailContext} from "../../context";
import useInspectDetailService from "../../service/InspectDetailService";
import BasicInfoDetail from "./BasicInfo";
import InterestedPartyDetail from "./InterestedParty";
import AttchMentDetail from "./AttchMent";
import styles from './index.module.scss';

const InspectDetail = ({detailId}) => {
    const detailService = useInspectDetailService(detailId);
    return (
        <InspectDetailContext.Provider value={detailService}>
            {
                detailService.detail &&
                <div className={styles.detailBox}>
                    <BasicInfoDetail detailService={detailService} />
                    <InterestedPartyDetail detailService={detailService} style={{backgroundColor:'#FFF'}} />
                    <AttchMentDetail detailService={detailService} />
                </div>
            }
        </InspectDetailContext.Provider>
    );
};

export default InspectDetail;