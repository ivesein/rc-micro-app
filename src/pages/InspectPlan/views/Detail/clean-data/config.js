import TYPES from "../../../../../constant";
import checkPartIcon from "../../../../../assets/checkpart.svg";
import rectifyPartIcon from "../../../../../assets/rectity.svg";
import managePartIcon from "../../../../../assets/managePart.svg";

export const titleMap = {
    [TYPES.CHECK_PART]: {
        title: '检查方',
        classify: '检查对接人',
        icon: checkPartIcon,
        phone:'联系方式',
        tenantName:'检查单位',
        projectName:'所属项目',
        projectStage:'阶段类型'
    },
    [TYPES.RECTIFY_PART]: {
        title: '整改方',
        classify: '整改对接人',
        icon: rectifyPartIcon,
        phone:'联系方式',
        tenantName:'整改单位',
        projectName:'所属项目',
        projectStage:'阶段类型'
    },
    [TYPES.MANAGE_PART]: {
        title: '管理方',
        classify: '管理对接人',
        icon: managePartIcon,
        phone:'联系方式',
        tenantName:'管理单位',
        projectName:'所属项目',
        projectStage:'阶段类型'
    },
}