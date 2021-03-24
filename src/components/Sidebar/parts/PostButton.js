import Logo from '../../../resources/logo_full.png';

const PostButton = (props) => {
    return (
        <div className="px-5">
            <button onClick={props.onClick} className={(props.loading ? "bg-gray-700 animate-pulse" : "bg-blue-600") + " mx-auto my-2 py-4 rounded-full w-full flex text-white text-2xl h-16 shadow-md focus:outline-none"}>
                {props.loading ? null : (<div className="mx-auto flex">+ <img className="ml-2 h-7" src={Logo} /></div>)}
            </button>
        </div>
    )
}

export default PostButton;