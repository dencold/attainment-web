export default {
  isLoggedIn: state => {
    // yep, it's 2017 & this is how we check that an Object is empty
    // javascript, you are an amazing language
    if (Object.keys(state.user).length === 0 && state.user.constructor === Object) {
      // we have an empty user, return false
      return false
    }

    return true
  },
  projectTasks: state => projId => {
    return Object.values(state.tasks).filter(task => task.projectId === projId)
  }
}
