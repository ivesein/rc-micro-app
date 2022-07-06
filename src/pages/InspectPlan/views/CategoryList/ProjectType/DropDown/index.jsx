import React, {useContext} from 'react';
import {Dropdown, Menu, Space} from "antd";
import {DownOutlined} from '@ant-design/icons';
import {generateYears} from "../../../../data-source/data-clean";
import {InspectPlanContext} from "../../../../context";
import './index.scss';

const DropDownProjectList = () => {

    const planService = useContext(InspectPlanContext);
    const array = generateYears();
    const clickMenu = (year) => {
        planService.setSelectYear(year === '全部' ? '' : year);
    }

    const menu = (
        <Menu
            className="inspect-drop-menu-list"
            items={
                array.map((item, index) => ({
                    label: <div
                        className="inspect-drop-menu-item"
                        style={{width:90,textAlign:'center'}}
                        onClick={() => clickMenu(item)}
                    >
                        {`${item === '全部' ? '全部' : `${item}年`}`}
                    </div>,
                    key: item
                }))
            }
        />
    );

    return (
        <Dropdown
            overlay={menu}
            placement="bottomRight"
            getPopupContainer={() => document.getElementById('inspect-drop-id')}
        >
            <a onClick={e => e.preventDefault()}>
                <Space>
                    <DownOutlined/>
                </Space>
            </a>
        </Dropdown>
    );
};

export default DropDownProjectList;