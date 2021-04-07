import statusCodes from "../../../functions/statusCodes";
import PostViewer from '../../PostViewer/PostViewer';
import ErrorHandler from '../../../functions/ErrorHandler';
import Icon from '../../../resources/logo.png';
import { BrowserRouter } from "react-router-dom";

const Error = (props) => {
    const codes = statusCodes(props.baseState.language, props.errorData.type);
    return (
        <div>
            <div className="font-sans">
                <div className="font-sans">
                    <div className="bg-white dark:bg-gray-900 max-w-md mx-auto my-8 border border-grey-light rounded-lg shadow-2xl overflow-hidden">
                        <div className="flex pt-4 px-4">
                            <div className="w-16 p-2 mr-2">
                                <img className="w-16 rounded-full border-red-600 border-2"
                                    src={Icon} />
                            </div>
                            <div className="px-2 pt-2 flex-grow">
                                <header>
                                    <a href="#" className="text-black dark:text-white no-underline">
                                        <span className="font-medium mr-2 flex">{codes.title}</span>
                                        <span className="font-normal text-gray-400 text-xs">{codes.err}</span>
                                    </a>
                                </header>
                                <article className={"pb-4 pt-2 text-gray-800 dark:text-gray-300 w-80 whitespace-pre-wrap text-2xl"}>
                                    <BrowserRouter>
                                        <ErrorHandler>
                                            <PostViewer className={"h-full w-full overflow-auto"} baseState={props.baseState} history={props.history}>
                                                {codes.mes + "\n```\n" + JSON.stringify(props.errorData, null, 2) + "\n```"}
                                            </PostViewer>
                                        </ErrorHandler>
                                    </BrowserRouter>
                                </article>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Error;