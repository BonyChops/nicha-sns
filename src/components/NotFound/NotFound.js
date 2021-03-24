const NotFound = (props) => {
    const langChoose = (property) => (property[props.baseState.language]);
    return(
        <div className="mx-72 mt-32 text-center dark:text-gray-100">
            <h1 className="text-5xl">404 NotFound</h1>
            <p className="text-3xl py-4">{langChoose({ja: "悲しき濁世...", en:"What sad news..."})}</p>
        </div>
    )
}

export default NotFound;