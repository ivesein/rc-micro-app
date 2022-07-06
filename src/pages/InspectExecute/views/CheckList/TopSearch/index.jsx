import React from 'react';
import { JJSKSearch } from 'jjsk-common-web';
import styles from './index.module.scss';

const TopSearch = () => {

    const onSearch = (value) => { }

    return (
        <div className={styles.topSearch}>
            <div className={styles.lefttitle}>检查列表</div>
            <div className={styles.rightsearch}>
                <JJSKSearch
                    style={{ width: 280, height: 40 }}
                    onSearch={onSearch}
                    placeholder="请输入项目名称"
                />
            </div>
        </div>
    );
};

export default TopSearch;