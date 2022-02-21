const clearAlerts = (dispatch, type) => {
    setTimeout(() => {
        dispatch({
            type: type
        })
    }, 3000)
}
export default clearAlerts