
export const updateObjectInArray = (items, itemId, objPropName, newObjProps) => {
    debugger
    return items.map(u => {
        if (u[objPropName] === itemId) {
            
            return { ...u, ...newObjProps };
        }
        return u;
    })
}