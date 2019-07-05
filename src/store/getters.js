const getters = {
  // 缓存打开的页签
  visitedViews: state => state.tagsView.visitedViews,
  // 动态权限路由
  permissionRouter: state => state.permissionRouter.permissionRouter
}
export default getters
