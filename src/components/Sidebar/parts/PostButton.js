import Logo from '../../../resources/logo_full.png';

const PostButton = () => {
    return (
        <div className="px-5">
            <button className="mx-auto my-2 py-4 bg-blue-600 rounded-full w-full flex text-white text-2xl shadow-md focus:outline-none">
                <div className="mx-auto flex">
                    + <img className="ml-2 h-7" src={Logo} />る
                </div>
            </button>
        </div>
    )
}

export default PostButton;