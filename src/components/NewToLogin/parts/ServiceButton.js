export default (props) => {

    const selectHandler = () => {
        props.accessor(props.name)
    }

    return (
        <button onClick={selectHandler} disabled={props.disabled === true}
            className={"focus:outline-none text-left shadow-lg border-b-2 border-gray-600 w-full h-24 px-5 py-4 rounded-xl overflow-hidden " + (props.disabled === true ? " text-gray-600 " : (props.state === props.name ? "bg-gray-400 animate-pulse" : "hover:bg-gray-500"))}>
            <h1 className="text-2xl mb-2">{props.title}</h1>
            <p>{props.description}</p>
        </button>
    )
}
