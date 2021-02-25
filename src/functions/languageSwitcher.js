export default (state, accessor) => {
    if(state.contextReturn !== false && state.contextReturn.match(/^lang_/) !== null){
        accessor({
            language: state.contextReturn.split("_")[1],
            contextReturn: false
        })
    }
}