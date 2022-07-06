import moment from "moment";

export const convertDataToSelectFormat = (data) => {
    if (!data) return;
    Object.keys(data).forEach(item => {
        data[item].forEach(inner => {
            inner.title = inner?.value;
            inner.value = inner?.longCode;
        })
    })
    return data;
}

export const dealOrgData = data => {
    if (!data) {
        return {
            disabled: false,
            list: [],
            defaultValue: {
                orgId: '',
                orgName: ''
            }
        }
    }
    const disabled = data?.orgIds?.length === 1;
    const list = data?.orgIds?.map?.(item => {
        return {
            title: item.name,
            value: item.id
        }
    })
    const defaultValue = {
        orgId: data?.orgIds?.[0]?.id ?? '',
        orgName: data?.orgIds?.[0]?.name ?? ''
    }
    return {
        disabled,
        list,
        defaultValue
    }
}

export const dealRoleData = data => {
    if (!data) return;
    return Array.from(new Set(data?.map(item => item?.role)?.join?.(',')?.split?.(',') ?? [])).join(',')
}

export const dealRoleDataByString = data => {
    if (!data) return;
    return Array.from(new Set(data?.split?.(',') ?? [])).join(',')
}

export const clearRepeatData = data => {
    return Array.from(new Set(data?.split?.(',') ?? []))?.[0] ?? '';
}

export const generateYears = () => {
    const subOneYear = moment().subtract(1, 'year').year().toString();
    const subTwoYear = moment().subtract(2, 'year').year().toString();
    const addOneYear = moment().add(1, 'year').year().toString();
    const addTwoYear = moment().add(2, 'year').year().toString();
    const thisYear = moment().year().toString();

    return [ subTwoYear,subOneYear, thisYear, addOneYear, addTwoYear, '全部'];
}