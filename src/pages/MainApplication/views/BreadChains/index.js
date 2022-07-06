import React from 'react';
import {useHistory} from 'react-router-dom';
import TYPES from "../../../../constant";
import {tabArray} from "./config";
import './index.scss';

/**
 * @Description: 导航栏面包屑公共组件，最后一个节点显示蓝色
 * @author jingyongxin
 * @date 2021/8/17
 */
const BreadChains = props => {
    const history = useHistory();

    const clickChains = (item) => {
        if (item === TYPES.WORK_PLAT) {
            history.push('/index/overview');
            return;
        }

        if (isNoNeedJump()) {
            return;
        }

        if (tabArray.includes(item)) {
            history.push('/inspection_management/main_page');
        }
    }

    const isNoNeedJump = () => {
        const lastIndex = window.location.pathname.lastIndexOf('/');
        const lastName = window.location.pathname.slice(lastIndex + 1);
        return lastName === "main_tab";
    }

    return (
        <div className="bread-chains-box">
            {
                props.list.map((item, index) => {
                    return (
                        <span
                            className={"brains-hover-span"}
                            style={{
                                color: index === props.list.length - 1 ? "#245FF2" : '#999',
                                cursor: 'pointer',
                            }}
                            onClick={() => clickChains(item)}
                        >
                            {item}
                            {
                                props.list.length - 1 === index ? "" : <span style={{padding: '0 8px'}}>/</span>
                            }
                        </span>
                    )
                })
            }
        </div>
    );
};

export default BreadChains;