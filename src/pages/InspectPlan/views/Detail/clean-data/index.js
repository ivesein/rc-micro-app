export const adaptFileListToComponent = data => {
    return data ?.map?.(item => {
        return {
            ...item,
            name:item.fileName,
        }
    }) ?? []
}
