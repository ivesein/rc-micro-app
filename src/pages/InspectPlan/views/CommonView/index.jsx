import React from 'react';
import TopTitle from "./TopTitle";
import BasicInfo from './BasicInfo';
import InterestedParty from "./InterestedParty";
import AttachMent from "./AttachMent";
import ButtonGroups from "./ButtonGroups/ButtonGroups";
import viewFactory from "../../../../components/HOC/ViewFactory";
import {InspectFormContext} from "../../context";
import useInspectFormService from "../../service/InspectFormService";
import useCreatePlanModel from "../../entity/CreatePlanModel";
import useEditPlanModel from "../../entity/EditPlanModel";
import TYPES from '../../../../constant';
import styles from './index.module.scss';

const CreateInspectPlan = ({hooks}) => {
    const formService = useInspectFormService(hooks);

    return (
        <InspectFormContext.Provider value={formService}>
            <div className={styles.createPlan}>
                <div className={styles.content}>
                    <TopTitle title={formService?.topTitle} backUrl={TYPES.BACK_MAIN_TAB}/>
                    <BasicInfo/>
                    <InterestedParty style={{backgroundColor: '#FFF'}}/>
                    <AttachMent style={{backgroundColor: '#FFF'}}/>
                </div>
                <ButtonGroups/>
            </div>
        </InspectFormContext.Provider>
    );
};

const CreateView = viewFactory(CreateInspectPlan)(useCreatePlanModel);
const EditView = viewFactory(CreateInspectPlan)(useEditPlanModel);

export {CreateView, EditView}
