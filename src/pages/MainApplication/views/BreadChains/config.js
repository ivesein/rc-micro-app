import TYPES from '../../../../constant';

export const chainsMapping = {
    1: ['工作台', '检查管理','检查计划'],
    2: ['工作台', '检查管理','检查执行'],
    3: ['工作台', '检查管理','统计分析'],
    4: ['工作台', '检查管理','检查设置'],
    5: ['工作台', '检查管理','检查计划','新建'],
    6: ['工作台', '检查管理','检查计划','编辑'],
    7: ['工作台', '检查管理','检查执行','检查列表'],
    8: ['工作台', '检查管理','检查执行','问题列表'],
    9: ['工作台', '检查管理','检查执行','新建'],
    10: ['工作台', '检查管理','检查执行','编辑'],
    11: ['工作台', '检查管理','检查设置','新建'],
    12: ['工作台', '检查管理','检查设置','编辑'],
}

export const titleMapToPermitKey = {
    [TYPES.INSPECT_PLAN]:'inspect:tab:plan',
    [TYPES.INSPECT_EXECUTE]:'inspect:tab:execute',
    [TYPES.STATISTIC_ANALYSIS]:'inspect:tab:analysis',
    [TYPES.INSPECT_SETTING]:'inspect:tab:setting'
}

export const tabArray = [
    TYPES.INSPECT_PLAN,
    TYPES.INSPECT_EXECUTE,
    TYPES.STATISTIC_ANALYSIS,
    TYPES.INSPECT_SETTING,
    TYPES.INSPECT_MANAGEMENT
];