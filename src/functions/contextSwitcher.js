export default (state, accessor) => {
    let result = {};
    if (state.contextReturn !== false) {
        if (state.contextReturn.match(/^lang_/) !== null) {
            result = {
                language: state.contextReturn.split("_")[1],
            }
        }
        if (state.contextReturn.match(/^settings$/) === null) {
            console.log("うんち！w")
            result = {
                popup: {
                    title: "settings"
                }
            }
        }


        result.contextReturn = false;
        accessor(result);
    }
}