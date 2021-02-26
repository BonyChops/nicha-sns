export default (props) => {
    return (
        <button className="flex hover:bg-gray-100 dark:hover:bg-gray-600 py-1 px-2 rounded" onClick={props.onClick}>
            {props.icon !== undefined ? <div className="w-8 italic"><div className="w-5" >{props.icon}</div></div> : null}
            <div className="text-gray-500 dark:text-gray-300">{props.title}</div>
        </button>
    )
}