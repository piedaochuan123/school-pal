import request from '@/utils/request'

export const newInner = data => request.post('newInner.php', data)  //渲染内部

export const newOuter = data => request.post('newOuter.php', data)  //渲染外部

export const addInner = data => request.post('addInner.php', data)  //添加内部

export const addOuter = data => request.post('addOuter.php', data)  //添加外部

export const editInner = data => request.post('editInner.php', data) //编辑内部

export const editOuter = data => request.post('editOuter.php', data) //编辑外部

export const deleteInner = data => request.post('deleteInner.php', data)  //删除内部

export const deleteOuter = data => request.post('deleteOuter.php', data)  //删除外部

export const deleteInnerSome = data => request.post('deleteInnerSome.php', data) //批量删除内部

export const deleteOuterSome = data => request.post('deleteOuterSome.php', data) //批量删除外部

export const changeNumberInner = data => request.post('changeSexInner.php', data) //修改内部部门

export const changeNumberOuter = data => request.post('changeSexOuter.php', data) //修改外部部门