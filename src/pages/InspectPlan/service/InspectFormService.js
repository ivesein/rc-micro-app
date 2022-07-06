import React, {useEffect, useMemo} from 'react';
import {useHistory} from 'react-router-dom';
import {message} from 'antd';
import {createPlanRequest, getDictTypeRequest, publishPlanRequest} from '../data-source/async';
import TYPES from '../../../constant';
import {InterestedInfoMap, planTypeMap} from "../common/config";
import {uuid} from "../../../utils/toolfunc";

const useInspectFormService = (hooks) => {
    const history = useHistory();
    const injectModel = hooks();
    const {
        mode,
        editId,
        basicInfoForm,
        formType,
        setFormType,
        checkType,
        projectId,
        projectName,
        setProjectId,
        refMap,
        uploadRef,
        orgId,
        orgName,
        setLoading,
        setProjectName,
        partyInfoMap,
        setPartyInfoMap
    } = injectModel;

    useEffect(() => {
        getDictType();
    }, []);

    const getDictType = async () => {
        const data = await getDictTypeRequest();
        data && setAllDictData(data);
    }
    const setAllDictData = data => {
        setFormType(prevState => {
            return prevState.map(item => {
                if (['checkType', 'projectStage', 'checkProperties'].includes(item.key)) {
                    return {
                        ...item,
                        option: data[item.key]
                    }
                }
                return item;
            })
        })
    }

    const adaptFormType = useMemo(() => {
        return formType.map(item => {
            if (item.key === 'projectName') {
                return {
                    ...item,
                    rule: [{required: checkType === TYPES.OUTER_CHECK, message: `请选择项目`}],
                }
            }
            return item;
        })
    }, [formType, checkType])

    const setProjectInfo = info => {
        const projectInfo = info?.pop?.();
        setProjectId(projectInfo?.id);
        setProjectName(projectInfo?.name);
        const preState = basicInfoForm.getFieldsValue();
        basicInfoForm.setFieldsValue({...preState, projectName: projectInfo?.name})
    }

    const setRichText = data => {
        const preState = basicInfoForm.getFieldsValue();
        basicInfoForm.setFieldsValue({...preState, checkContent: data})
    }

    // 提交暂存表单
    const save = async () => {
        const params = await assemParams(TYPES.TEMP_SAVE);
        params && commonRequest(() => createPlanRequest(params), '创建');
    }

    // 提交表单
    const submit = async () => {
        const params = await assemParams(TYPES.SUBMIT);
        params && commonRequest(() => publishPlanRequest(params), '发布');
    }

    const commonRequest = async (asyncunc, type) => {
        try {
            setLoading(true);
            const success = await asyncunc();
            setLoading(false)
            if (success) {
                message.success(`${type}检查计划成功`);
                setLoading(false);
                history.push('/inspection_management/main_page/main_tab');
            }
        } catch (e) {
            setLoading(false)
        }
    }

    // 封装参数
    const assemParams = async (status) => {
        const fillInfos = await Promise.all([getBasicFormValues(status), getInterestedParty(), getAllFiles()])
        if (fillInfos.some(item => item === 'lost-fields')) return;
        const [basicInfo, relationPersonList, fileDtoList] = fillInfos;
        return {
            ...(mode === 'edit' && {id: editId}),
            ...basicInfo,
            relationPersonList,
            fileDtoList
        }
    }

    const getBasicFormValues = (status) => {
        return basicInfoForm.validateFields().then(result => {
            return {
                ...result,
                projectId,
                projectName,
                endDate: result?.endDate?.format('YYYY-MM-DD'),
                planStatus: status,
                projectStatus: '',
                planType: planTypeMap[checkType],
                orgId,
                orgName
            };
        }).catch(err => {
            message.error(err?.errorFields?.[0]?.errors?.[0]);
            return 'lost-fields';
        })
    }


    const getInterestedParty = () => {
        const checkResult = isNotPassCheckParty(partyInfoMap[checkType]);
        if (checkResult) return 'lost-fields';
        return getRealInterestedParty(partyInfoMap[checkType]);
    }

    const isNotPassCheckParty = data => {
        const checkNull = isHasNullPart(data);
        const checkRepeat = checkType === TYPES.INNER_CHECK ? false : isHasRepeatPart(data);
        return checkNull || checkRepeat;
    }

    const isHasNullPart = data => {
        debugger;
        return data?.some?.(item => {
            if (!item?.userId) {
                message.error(`请填写${item?.partName}信息`);
                return true;
            }
        })
    }

    const isHasRepeatPart = data => {
        return data.some(item => {
            if (data.filter(innerItem => innerItem.tenantId && item.tenantId && innerItem.tenantId === item.tenantId).length > 1) {
                message.error(`含有2个及以上相同的相关方:${item.tenantName}`);
                return true;
            }
            return false;
        });
    }

    const getRealInterestedParty = data => {
        return data.map(item => {
            if (item?.id?.length > 19) {
                delete item.id;
            }
            return {
                ...item,
                userIds: item.userId,
                ...(!item.projectId && {projectId: projectId}),
                ...(!item.projectId && {projectName: projectName}),
            }
        })
    }

    const getAllFiles = () => {
        const files = uploadRef.current.getResult();
        return files.map(({
                              fileId,
                              name: fileName,
                              previewUrl,
                              size,
                              suffix
                          }) => ({
            fileId,
            fileName,
            size,
            suffix,
            previewUrl
        }))
    }

    const addCurrentParty = (info) => {
        const {checkRelated} = info;
        setPartyInfoMap(prevState => {
            const currentInfo = InterestedInfoMap[checkType]?.find(item => item.checkRelated === checkRelated)
            prevState[checkType].push({...currentInfo, origin: false, id: uuid()})
            return {
                ...prevState,
            }
        })
    }

    const deleteCurrentParty = info => {
        const {id, refs} = info;
        setPartyInfoMap(prevState => {
            return {
                ...prevState,
                [checkType]: prevState[checkType]?.filter(item => item.id !== id)
            }
        });
        delete refMap.current[refs];
    }

    const addManageParty = () => {
        addCurrentParty({
            checkRelated: TYPES.MANAGE_PART,
        })
    }

    const setSelectPersonInfo = (result, info) => {
        setPartyInfoMap(preState => {
            const newData = preState?.[checkType]?.map?.(item => {
                if (item.id === info?.id) {
                    return {
                        ...item,
                        key:result?.key,
                        userId: result?.userId,
                        tenantId: result?.tenantId,
                        tenantName: result?.tenantName,
                        tenantType: result?.tenantType,
                        tenantTypeName: result?.tenantTypeName,
                        projectId: result?.projectId ?? projectId,
                        projectStage: result?.projectStage,
                        projectName: result?.projectName ?? projectName,
                        userName: result?.userName,
                        phone: result?.phone,
                        unit: '',
                        orgId: result?.orgId,
                        orgName: result?.orgName,
                    }
                }
                return item;
            })

            return {
                ...preState,
                [checkType]: newData
            }
        })
    }

    useEffect(() => {
        resetSelectUser();
    }, [projectId,checkType]);

    // 项目变化清除选择的人
    const resetSelectUser = () => {
        setPartyInfoMap(InterestedInfoMap);
    }

    return {
        ...injectModel,
        formType: adaptFormType,
        save,
        submit,
        setRichText,
        setProjectInfo,
        addCurrentParty,
        deleteCurrentParty,
        addManageParty,
        setSelectPersonInfo
    };
};

export default useInspectFormService;