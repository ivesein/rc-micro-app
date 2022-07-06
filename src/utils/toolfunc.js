// 判断是否已登录
export const loggedIn = () => {
    // console.log(localStorage.getItem("userInfo"));
    return localStorage.getItem("userInfo") ? true : false;
};

export function logout() {
    const isDev = process.env.NODE_ENV === "development";
    const isLoadByQK = window.__POWERED_BY_QIANKUN__;
    // 若为本地开发环境或线上独立访问，不跳转登录页
    if (isDev || !isLoadByQK) return;
    localStorage.clear();
    window.location.href = "/login";
}

export function getUserCache(key) {
    let userinfo = localStorage.getItem(key);
    if (userinfo !== "" && userinfo !== undefined && userinfo !== null) {
        let type = Object.prototype.toString.call(JSON.parse(userinfo));
        if (type === "[object Object]" || type === "[object Array]") {
            return JSON.parse(userinfo);
        }
        return userinfo;
    } else {
        return false;
    }
}

export function checkPermission(cacheData = "[]", btnSign = null) {
    if (!btnSign) return false;
    return true;
    // return cacheData.includes(btnSign);
}

export const getTenantId = () => {
    let useInfo = localStorage.getItem("userInfo");
    if (useInfo !== "" && useInfo !== undefined && useInfo !== null) {
        const user = JSON.parse(useInfo);
        return user.tenantId;
    }
    return ''
}

export const getUserId = () => {
    let useInfo = localStorage.getItem("userInfo");
    if (useInfo !== "" && useInfo !== undefined && useInfo !== null) {
        const user = JSON.parse(useInfo);
        return user.id;
    }
    return ''
}

export const getUserName = () => {
    let useInfo = localStorage.getItem("userInfo");
    if (useInfo !== "" && useInfo !== undefined && useInfo !== null) {
        const user = JSON.parse(useInfo);
        return user.name || user.nickname;
    }
    return ''
}

export const getAppId = () => {
    let appId = localStorage.getItem("AppId");
    return appId ?? '';
}

// 树节点过滤
export const treeFilterToArr = (treeData, predicate) => {
    let res = [];
    treeData.forEach((tree) => {
        const deepTree = (item) => {
            if (predicate(item)) {
                res.push(item);
            }
            item.children &&
            item.children.forEach((child) => deepTree(child, predicate));
        };
        deepTree(tree);
    });
    return res;
};


export function getTabPermitCollections(activeUrl) {
    return JSON.parse(localStorage.getItem("AppTabPermit"))?.[activeUrl] ?? [];
}

export function getTabPermitCollectionsFourLevel(activeUrl) {
    return JSON.parse(localStorage.getItem("AppTabPermit"))?.[activeUrl]?.find(item => item.permission === 'inspect:tab:execute')?.children ?? [];
}

export const getFirstActiveKey = () => {
    return getTabPermitCollections('/apps/inspection_management')?.[0]?.permission ?? ''
}

export const uuid=()=> {
    const temp_url = URL.createObjectURL(new Blob());
    const uuid = temp_url.toString(); // blob:https://xxx.com/b250d159-e1b6-4a87-9002-885d90033be3
    URL.revokeObjectURL(temp_url);
    return uuid.slice(uuid.lastIndexOf("/") + 1);
}
