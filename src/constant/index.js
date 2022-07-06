const commonConstant = {
    WORK_PLAT: '工作台',
    INSPECT_MANAGEMENT: '检查管理',
    INSPECT_PLAN: '检查计划',
    INSPECT_EXECUTE: '检查执行',
    STATISTIC_ANALYSIS: '统计分析',
    INSPECT_SETTING: '检查设置'
}

const checkPartType = {
    CHECK_PART: "1",
    RECTIFY_PART: "2",
    MANAGE_PART: "3"
}

const submitType = {
    TEMP_SAVE:'0',
    SUBMIT:'1'
}

const checkType = {
    OUTER_CHECK: 'checkProperties#1',
    INNER_CHECK: 'checkProperties#2'
}

export const checkCNMap = {
    'checkProperties#1':'外部检查',
    'checkProperties#2':'内部检查'
}

const backUrls = {
    BACK_MAIN_TAB: '/inspection_management/main_page/main_tab'
}

export default {
    ...commonConstant,
    ...checkPartType,
    ...checkType,
    ...backUrls,
    ...submitType
}
