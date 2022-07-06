import React, {useContext} from 'react';
import {JJSKWeakSearch} from 'jjsk-common-web'
import styles from './index.module.scss';
import { ProjectTreeContext } from '../../Context';

const ProjectList = () => {
    const planService = useContext(ProjectTreeContext);
    const onChange = (e) => {
        if(!e.target.value) {
            planService.searchProjectTree('');
        }
    }
    return (
        <div className={styles.projectlist}>
            <JJSKWeakSearch
                style={{width: 207, height: 40}}
                placeholder={'请输入项目名称'}
                onSearch={(e) => planService.searchProjectTree(e.target.value)}
                onChange={onChange}
            />
            <div className={styles.listitem}>
                {
                    planService?.filterList?.map?.(item => {
                        return <div
                            className={styles.items}
                            onClick={() =>{

                                planService?.setProjectListSelectId(item.id)
                                planService?.setSelectProjectId(item.id)
                            } }
                            style={{
                                paddingLeft:5,
                                backgroundColor:item.select?'#f1f5fe':'#FFF',
                                color:item.select?'#245ff2':'#666'
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