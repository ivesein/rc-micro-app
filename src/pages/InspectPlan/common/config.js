import {uuid} from "../../../utils/toolfunc";
import TYPES from "../../../constant";

export const formTypeArrays = [
    {
        key: 'planCode',
        name: '单据编号',
        type: 'text',
        rule: [{required: true, message: `请输入单据编号`}],
        disabled: true,
    },
    {
        key: 'planStatus',
        name: '单据状态 ',
        type: 'text',
        disabled: true,
    },
    {
        key: 'versionNumber',
        name: '版本号',
        type: 'text',
        disabled: true,
    },
    {
        key: 'publish',
        name: '发布人',
        type: 'text',
        rule: [{required: true, message: `请输入发布人`}],
        disabled: true,
    },
    {
        key: 'orgId',
        name: '发布组织',
        type: 'list',
        option:[],
        rule: [{required: true, message: `请输入发布组织`}],
        disabled: true,
    },
    {
        key: 'publishTime',
        name: '发布时间',
        type: 'text',
        rule: [{required: true, message: `请输入发布时间`}],
        disabled: true,
    },
    {
        key: 'checkType',
        name: '检查类型',
        type: 'list',
        rule: [{required: true, message: `请输入检查类型`}],
    },
    {
        key: 'checkProperties',
        name: '检查属性',
        type: 'list',
        rule: [{required: true, message: `请输入检查属性`}],
    },
    {
        key: 'endDate',
        name: '完成截止日期',
        type: 'date',
        rule: [{required: true, message: `请输入完成截止日期`}],
    },
    {
        key: 'checkTitle',
        name: '检查主题',
        type: 'text',
        rule: [{required: true, message: `请输入检查主题`}],
    },
    {
        key: 'projectName',
        name: '所属项目',
        type: 'search',
        rule: [{required: false, message: `请选择项目`}],
    },
    {
        key: 'projectStatus',
        name: '项目阶段',
        type: 'list',
        rule: [{required: false, message: `请输选择项目阶段`}],
    }
]

export const detailFormTypeArrays = [
    {
        key: 'planCode',
        name: '单据编号',
        required: true,
    },
    {
        key: 'planStatus',
        name: '单据状态 ',
    },
    {
        key: 'versionNumber',
        name: '版本号',
    },
    {
        key: 'publish',
        name: '发布人',
        required: true,
    },
    {
        key: 'orgName',
        name: '发布组织',
        required: true,
    },
    {
        key: 'gmtCreated',
        name: '发布时间',
        required: true,
    },
    {
        key: 'checkTypeName',
        name: '检查类型',
        required: true,
    },
    {
        key: 'checkPropertiesName',
        name: '检查属性',
        required: true,
    },
    {
        key: 'endDate',
        name: '完成截止日期',
        required: true,
    },
    {
        key: 'checkTitle',
        name: '检查主题',
        required: true,
    },
    {
        key: 'projectName',
        name: '所属项目',
    },
    {
        key: 'projectStatus',
        name: '项目阶段',
    }
]

export const checkPartCNName = {
    1: '检查方',
    2: '整改方',
    3: '管理方'
}

export const innerPart = [
    {
        id: uuid(),
        partName: '检查方',
        personTitle:'检查对接人',
        unitTitle:'检查单位',
        checkRelated: TYPES.CHECK_PART,
        origin: true,
        allowAdd: false,
        userId:'',
        tenantId:'',
        tenantName:'',
        projectId:'',
        projectStage:'',
        projectName:'',
        personName: '',
        phone: '',
        unit: '',
        role: '',
        orgId:'',
        orgName:'',
        refs: uuid(),
    },
    {
        id: uuid(),
        partName: '整改方',
        personTitle:'整改对接人',
        unitTitle:'整改单位',
        checkRelated: TYPES.RECTIFY_PART,
        origin: true,
        allowAdd: false,
        userId:'',
        tenantId:'',
        tenantName:'',
        projectId:'',
        projectStage:'',
        projectName:'',
        personName: '',
        phone: '',
        unit: '',
        role: '',
        orgId:'',
        orgName:'',
        refs: uuid(),
    }
];

export const outerPart = [
    {
        id: uuid(),
        partName: '检查方',
        personTitle:'检查对接人',
        unitTitle:'检查单位',
        checkRelated: TYPES.CHECK_PART,
        origin: true,
        allowAdd: true,
        userId:'',
        tenantId:'',
        tenantName:'',
        projectId:'',
        projectStage:'',
        projectName:'',
        personName: '',
        phone: '',
        unit: '',
        role: '',
        orgId:'',
        orgName:'',
        refs: uuid(),
    },
    {
        id: uuid(),
        partName: '整改方',
        personTitle:'整改对接人',
        unitTitle:'整改单位',
        checkRelated: TYPES.RECTIFY_PART,
        origin: true,
        allowAdd: true,
        userId:'',
        tenantId:'',
        tenantName:'',
        projectId:'',
        projectStage:'',
        projectName:'',
        personName: '',
        phone: '',
        unit: '',
        role: '',
        orgId:'',
        orgName:'',
        refs: uuid(),
    },
    {
        id: uuid(),
        partName: '管理方',
        personTitle:'管理对接人',
        unitTitle:'管理单位',
        checkRelated: TYPES.MANAGE_PART,
        origin: false,
        allowAdd: true,
        userId:'',
        tenantId:'',
        tenantName:'',
        projectId:'',
        projectStage:'',
        projectName:'',
        personName: '',
        phone: '',
        unit: '',
        role: '',
        orgId:'',
        orgName:'',
        refs: uuid()
    }
]

export const InterestedInfoMap = {
    [TYPES.INNER_CHECK]: [
        {
            id: uuid(),
            partName: '检查方',
            personTitle:'检查对接人',
            unitTitle:'检查单位',
            checkRelated: TYPES.CHECK_PART,
            origin: true,
            allowAdd: false,
            userId:'',
            tenantId:'',
            tenantName:'',
            projectId:'',
            projectStage:'',
            projectName:'',
            personName: '',
            phone: '',
            unit: '',
            role: '',
            orgId:'',
            orgName:'',
            refs: uuid(),
        },
        {
            id: uuid(),
            partName: '整改方',
            personTitle:'整改对接人',
            unitTitle:'整改单位',
            checkRelated: TYPES.RECTIFY_PART,
            origin: true,
            allowAdd: false,
            userId:'',
            tenantId:'',
            tenantName:'',
            projectId:'',
            projectStage:'',
            projectName:'',
            personName: '',
            phone: '',
            unit: '',
            role: '',
            orgId:'',
            orgName:'',
            refs: uuid(),
        }
    ],
    [TYPES.OUTER_CHECK]: [
        {
            id: uuid(),
            partName: '检查方',
            phoneTitle:'联系方式',
            personTitle:'检查对接人',
            unitTitle:'检查单位',
            checkRelated: TYPES.CHECK_PART,
            origin: true,
            allowAdd: true,
            userId:'',
            tenantId:'',
            tenantName:'',
            projectId:'',
            projectStage:'',
            projectName:'',
            personName: '',
            phone: '',
            unit: '',
            role: '',
            orgId:'',
            orgName:'',
            refs: uuid(),
        },
        {
            id: uuid(),
            partName: '整改方',
            personTitle:'整改对接人',
            unitTitle:'整改单位',
            checkRelated: TYPES.RECTIFY_PART,
            origin: true,
            allowAdd: true,
            userId:'',
            tenantId:'',
            tenantName:'',
            projectId:'',
            projectStage:'',
            projectName:'',
            personName: '',
            phone: '',
            unit: '',
            role: '',
            orgId:'',
            orgName:'',
            refs: uuid(),
        },
        {
            id: uuid(),
            partName: '管理方',
            personTitle:'管理对接人',
            unitTitle:'管理单位',
            checkRelated: TYPES.MANAGE_PART,
            origin: false,
            allowAdd: true,
            userId:'',
            tenantId:'',
            tenantName:'',
            projectId:'',
            projectStage:'',
            projectName:'',
            personName: '',
            phone: '',
            unit: '',
            role: '',
            orgId:'',
            orgName:'',
            refs: uuid(),
        }
    ]
}

export const checkPartNameMap = {
    [TYPES.CHECK_PART]: '检查方',
    [TYPES.RECTIFY_PART]: '整改方',
    [TYPES.MANAGE_PART]: '管理方'
}

export const personTitleMap = {
    [TYPES.CHECK_PART]: '检查对接人',
    [TYPES.RECTIFY_PART]: '整改对接人',
    [TYPES.MANAGE_PART]: '管理对接人'
}

export const unitTitleMap = {
    [TYPES.CHECK_PART]: '检查单位',
    [TYPES.RECTIFY_PART]: '整改单位',
    [TYPES.MANAGE_PART]: '管理单位'
}

export const titleMap = {
    [TYPES.CHECK_PART]: {
        title: '检查方',
        person: {
            title: '检查对接人',
            value: '',
        },
        phone: {
            title: '联系方式',
            value: ''
        },
        unit: {
            title: '检查单位',
            value: ''
        },
        project: {
            title: '所属项目',
            value: ''
        },
        projectStage: {
            title: '项目阶段',
        },
    },
    [TYPES.RECTIFY_PART]: {
        title: '整改方',
        person: {
            title: '整改对接人',
            value: '',
        },
        phone: {
            title: '联系方式',
            value: ''
        },
        unit: {
            title: '整改单位',
            value: ''
        },
        project: {
            title: '所属项目',
            value: ''
        },
        projectStage: {
            title: '项目阶段',
        },
    },
    [TYPES.MANAGE_PART]: {
        title: '管理方',
        person: {
            title: '管理对接人',
            value: '',
        },
        phone: {
            title: '联系方式',
            value: ''
        },
        unit: {
            title: '整改单位',
            value: ''
        },
        project: {
            title: '所属项目',
            value: ''
        },
        projectStage: {
            title: '项目阶段',
        },
    },
}

export const AUTH_TYPE = {
    CREATE_PERMIT: 'inspect:plan:button:create',
    SEARCH_PERMIT: 'inspect:plan:button:search',
    SEARCH_PROJECT: 'inspect:plan:button:searchproject',
    DELETE_PERMIT: 'inspect:plan:button:delete',
    EDIT_PERMIT: 'inspect:plan:button:update'
}

export const planTypeMap = {
    [TYPES.INNER_CHECK]:'1',
    [TYPES.OUTER_CHECK]:'2'
}

