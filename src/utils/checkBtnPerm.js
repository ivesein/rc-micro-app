import {logout} from './toolfunc'

const checkBtnPerm = btnId => {
    if (process.env.NODE_ENV === 'development') return true;  // 开发环境提供所有权限
    const localPermitInfo = localStorage.getItem('AppBtnPermission');
    if (!localPermitInfo) {
        logout();
        return;
    }
    try {
        const permissionArr = JSON.parse(localPermitInfo);
        return permissionArr.includes(btnId);
    } catch (e) {
        logout();
    }
}

export default checkBtnPerm