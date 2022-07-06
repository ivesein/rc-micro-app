import React, {useContext} from 'react';
import {JJSKWeakSearch} from 'jjsk-common-web'
import {InspectPlanContext} from "../../../../context";
import checkBtnPerm from "../../../../../../utils/checkBtnPerm";
import {AUTH_TYPE} from "../../../../common/config";
import styles from './index.module.scss';

const ProjectList = () => {
    const planService = useContext(InspectPlanContext);
    const onChange = (e) => {
        if (!e.target.value) {
            planService.searchProjectTree('');
        }
    }
    return (
        <div className={styles.projectlist}>
            {
                checkBtnPerm(AUTH_TYPE.SEARCH_PROJECT) &&
                <JJSKWeakSearch
                    style={{width: 207, height: 40}}
                    placeholder={'请输入项目名称'}
                    onSearch={(e) => planService.searchProjectTree(e.target.value)}
                    onChange={onChange}
                />
            }
            <div className={styles.listitem}>
                {
                    planService?.filterList?.map?.(item => {
                        return <div
                            className={styles.items}
                            onClick={() => {
                                planService?.setSelectProjectId(item.id)
                            }}
                            title={item.name}
                            style={{
                                paddingLeft: 5,
                                backgroundColor: item.select ? '#f1f5fe' : '#FFF',
                                color: item.select ? '#245ff2' : '#666'
                            }}
                        >{item.name}
                        </div>
                    })
                }
            </div>
        </div>
    );
};

export default ProjectList;