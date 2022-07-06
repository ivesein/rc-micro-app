import React, {useEffect, useMemo, useRef, useState} from 'react';
import {useLocation} from "react-router-dom";
import {Form} from "antd";
import moment from "moment";
import {checkPartNameMap, formTypeArrays, InterestedInfoMap, personTitleMap, unitTitleMap} from "../common/config";
import TYPES from "../../../constant";
import {getBelongOrgRequest, getPlanDetailRequest} from "../data-source/async";
import {getUserId, uuid} from "../../../utils/toolfunc";

/**
 *  编辑表单充血模型实体对象
 */
const useEditPlanModel = () => {
    const location = useLocation();
    const editId = location?.state?.editId;

    const refMap = useRef({});
    const uploadRef = useRef();

    const [basicInfoForm] = Form.useForm();

    const [mode] = useState('edit');
    const [formType, setFormType] = useState(formTypeArrays);
    const [checkType, setCheckType] = useState(TYPES.INNER_CHECK);
    const [planCode, setPlanCode] = useState('');
    const [projectId, setProjectId] = useState('');
    const [projectName, setProjectName] = useState('');
    const [orgName, setBelongOrg] = useState('');
    const [loading, setLoading] = useState(false);
    const [orgId, setOrgId] = useState('');
    const [richTextData, setRichTextData] = useState('');
    const [topTitle] = useState('编辑计划');
    const [fileList, setFileList] = useState([]);
    const [partyInfoList, setPartInfoList] = useState([]);
    const [partyInfoMap, setPartyInfoMap] = useState(InterestedInfoMap);
    const [orgList, setOrgList] = useState();
    const [orgDisabled, setOrgDisabled] = useState(false);


    useEffect(() => {
        getPlanDetail();
        getBelongOrg();
    }, []);

    // 获取表单详情
    const getPlanDetail = async () => {
        const data = await getPlanDetailRequest(editId);
        data && initValues(data);
    }

    // 初始化表单数据
    const initValues = data => {
        setValueToState(data);
        setValueToForm(data);
    }

    // 设置表单数据到state
    const setValueToState = data => {
        const {file, planType, person, plan} = data;
        setCheckType(plan?.checkProperties);
        setPlanCode(plan?.planCode);
        setProjectId(plan?.projectId);
        setProjectName(plan?.projectName);
        setOrgId(plan?.orgId);
        setBelongOrg(plan?.orgName);
        setRichTextData(plan?.checkContent);
        setFileList(file.map(item => ({...item, name: item.fileName})));
        setPartInfoList(person);
        setPartyInfoMap(prevState => {
            return {
                ...prevState,
                [plan?.checkProperties]: turnPersonDataToState(person, plan?.checkProperties)
            }
        })
    }

    // 将相关方转化为可回填数据
    const turnPersonDataToState = (person, type) => {
        if (!person) return [];
        return person.map(item => {
            return {
                ...item,
                partName: checkPartNameMap[item.checkRelated],
                personTitle: personTitleMap[item.checkRelated],
                unitTitle: unitTitleMap[item.checkRelated],
                origin: checkIsOrigin({item, type, person}),
                allowAdd: checkAllowAdd({type, person}),
                refs: uuid(),
            }
        })
    }

    // 内部的不允许增加删除，外部 的只有第一个了允许 删除
    const checkIsOrigin = ({item, type, person}) => {
        if (type === TYPES.INNER_CHECK) return true;
        return person?.filter?.(second => second.checkRelated === item.checkRelated)?.some?.((inner, index) => {
            return inner?.checkRelated === item?.checkRelated && index === 0;
        })
    }

    // 内部不允许增加，外部只有没有管理方才能添加
    const checkAllowAdd = ({type, person}) => {
        if (type === TYPES.INNER_CHECK) return false;
        return person?.filter?.(second => second.checkRelated === TYPES.MANAGE_PART)?.length < 3;
    }

    // 设置数据到form表单
    const setValueToForm = data => {
        const {file, planType, person, plan} = data;
        basicInfoForm.setFieldsValue({
            planCode: plan?.planCode,
            planStatus: '暂存',
            versionNumber: plan?.versionNumber,
            publish: plan?.releasePersonName,
            publishTime: '-',
            orgName: plan?.orgName,
            checkType: plan?.checkType,
            checkProperties: plan?.checkProperties,
            endDate: moment(plan?.endDate),
            checkTitle: plan?.checkTitle,
            projectId: plan?.projectId,
            projectName: plan?.projectName,
            projectStatus: plan?.projectStatus,
            checkContent: plan?.checkContent
        })
    }

    // 获取所有组织
    const getBelongOrg = async () => {
        const data = await getBelongOrgRequest(getUserId());
        const {
            disabled,
            list,
            defaultValue
        } = data;
        setOrgList(list);
        setOrgDisabled(disabled);
    }

    // 设置组织下拉列表数据
    const adaptFormType = useMemo(() => {
        return formType.map(item => {
            if (item.key === 'orgId') {
                return {
                    ...item,
                    option: orgList,
                    disabled: orgDisabled
                }
            }
            return item;
        })
    }, [formType, orgList])

    useEffect(() => {
        orgList && basicInfoForm.setFieldsValue({
            ...basicInfoForm.getFieldsValue(),
            orgId: orgId
        })
    }, [orgList,orgId])


    // 是否增加管理方
    const isAllowAddManagePart = useMemo(() => {
        if (checkType === TYPES.INNER_CHECK) return false;
        return partyInfoMap[checkType].filter(item => item.checkRelated === TYPES.MANAGE_PART).length < 3;
    }, [partyInfoMap, checkType]);


    // 设置富文本到form
    const setRichTextDataAction = data => {
        setRichTextData(data);
        basicInfoForm.setFields([{
            name: 'checkContent',
            value: data
        }])
    }

    return {
        mode,
        editId,
        topTitle,
        basicInfoForm,
        formType: adaptFormType, setFormType,
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
        fileList,
        partyInfoList,
        partyInfoMap, setPartyInfoMap,
        isAllowAddManagePart
    }
};

export default useEditPlanModel;