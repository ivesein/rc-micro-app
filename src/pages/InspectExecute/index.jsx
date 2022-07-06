import React, { useContext, useEffect, useState } from "react";
import ProblemList from "./views/ProblemList";
import CheckList from "./views/CheckList";
import { NoPermitView } from 'jjsk-common-web';
import { getTabPermitCollectionsFourLevel } from "../../utils/toolfunc";
import { MainContext } from "../MainApplication/context";
import styles from './index.module.scss';

const InspectExecute = () => {
    const mainService = useContext(MainContext);
    const [activeKey, setActiveKey] = useState('inspect:tab:execute:sub:checklist');

    useEffect(() => {
        mainService.setBreadChainsId(7);
    }, []);

    const labelMap = {
        "inspect:tab:execute:sub:checklist": {
            id: 7,
            component: () => <CheckList />
        },
        'inspect:tab:execute:sub:problemlist': {
            id: 8,
            component: () => <ProblemList />
        }
    };

    const fourLevel = getTabPermitCollectionsFourLevel('/apps/inspection_management');

    const setClickKey = item => {
        setActiveKey(item.permission);
        mainService.setBreadChainsId(labelMap[item.permission]?.id);
    }

    return (
        <div className={styles.execute}>
            {
                fourLevel?.length > 0 ?
                    <div className={styles.contentbox}>
                        <div className={styles.spanbox}>
                            {
                                fourLevel.map((item, index) => <>
                                    <span
                                        className={styles.innerspan}
                                        style={{ color: activeKey === item.permission ? '#000' : '#999' }}
                                        onClick={() => setClickKey(item)}>{item.menuName}
                                    </span>
                                    {
                                        index === 0 && <span style={{ color: '#999' }}>|</span>
                                    }
                                </>)
                            }
                        </div>
                        {
                            labelMap[activeKey]?.component?.()
                        }
                    </div> :
                    <NoPermitView />
            }
        </div>
    );
};

export default InspectExecute;
