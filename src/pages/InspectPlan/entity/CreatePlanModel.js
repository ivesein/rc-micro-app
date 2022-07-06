import React, {useContext, useEffect, useMemo, useRef, useState} from 'react';
import {Form} from "antd";
import {formTypeArrays, InterestedInfoMap} from "../common/config";
import TYPES from "../../../constant";
import {getBelongOrgRequest, getFormCodeRequest} from "../data-source/async";
import {MainContext} from "../../MainApplication/context";
import {getUserId} from "../../../utils/toolfunc";

/**
 *  创建表单充血模型实体对象
 */
const useCreatePlanModel = () => {
    const mainService = useContext(MainContext);

    const refMap = useRef({});
    const uploadRef = useRef();

    const [mode] = useState('create');                    // 标识当前模型名
    const [basicInfoForm] = Form.useForm();                            // form表单引用
    const [formType, setFormType] = useState(formTypeArrays);          // 生成表单数组
    const [checkType, setCheckType] = useState(TYPES.INNER_CHECK);     // 内外检查类型
    const [planCode, setPlanCode] = useState('');         // 单据编码
    const [projectId, setProjectId] = useState('');       // 项目id
    const [projectName, setProjectName] = useState('');   // 项目名称
    const [orgName, setBelongOrg] = useState('');         // 组织名称
    const [loading, setLoading] = useState(false);        // 正在加载
    const [orgId, setOrgId] = useState('');               // 组织id
    const [richTextData, setRichTextData] = useState(''); // 当前富文本
    const [topTitle] = useState('检查计划');                // 标题
    const [partyInfoMap, setPartyInfoMap] = useState(InterestedInfoMap);// 相关方数据
    const [orgList, setOrgList] = useState();                           // 组织列表
    const [orgDisabled, setOrgDisabled] = useState(false); // 组织是否可选

    useEffect(() => {
        getFormCode();
        getBelongOrg();
    }, []);

    // 获取单据编码
    const getFormCode = async () => {
        const data = await getFormCodeRequest();
        data && setPlanCode(data);
    }

    // 获取所属组织
    const getBelongOrg = async () => {
        const data = await getBelongOrgRequest(getUserId());
        const {
            disabled,
            list,
            defaultValue
        } = data;
        setBelongOrg(defaultValue?.orgName);
        setOrgId(defaultValue?.orgId);
        setOrgList(list);
        setOrgDisabled(disabled);
    }

    useEffect(() => {
        planCode && setInitFormValue();
    }, [planCode, mainService.realName, orgName,orgList]);

    // 设置表单数据
    const setInitFormValue = () => {
        basicInfoForm.setFieldsValue({
            planCode,
            planStatus: '-',
            versionNumber: '1.0',
            publish: mainService.realName,
            publishTime: '-',
            orgId: orgId
        })
    }

    const isAllowAddManagePart = useMemo(() => {
        if (checkType === TYPES.INNER_CHECK) return false;
        return partyInfoMap[checkType].filter(item => item.checkRelated === TYPES.MANAGE_PART).length < 3;
    }, [partyInfoMap, checkType])

    const adaptFormType = useMemo(() => {
        return formType.map(item => {
            if(item.key === 'orgId') {
                return {
                    ...item,
                    option:orgList,
                    disabled:orgDisabled
                }
            }
            return item;
        })
    },[formType,orgList])

    const setRichTextDataAction = data => { 
        basicInfoForm.setFieldsValue({
            ...basicInfoForm.getFieldsValue(),
            checkContent: data
        })
    }

    return {
        mode,
        topTitle,
        basicInfoForm,
        formType:adaptFormType, setFormType,
        checkType, setCheckType,
        planCode, setPlanCode,
        projectId, setProjectId,
        setBelongOrg,
        loading, setLoading,
        refMap,
        uploadRef,
        orgId,
        orgName,
        orgList,
        orgDisabled,
        richTextData, setRichTextDataAction,
        projectName, setProjectName,
        partyInfoMap, setPartyInfoMap,
        isAllowAddManagePart
    }
};

export default useCreatePlanModel;