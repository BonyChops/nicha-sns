import Icon from '../../../../resources/logo.png';
import PostViewer from '../../../PostViewer/PostViewer';
import ErrorHandler from '../../../../functions/ErrorHandler';
import statusCodes from '../../../../functions/statusCodes';

export default (props) => {
    const codes = statusCodes(props.baseState.language, props.errorData.type);
    return (
        <div className="bg-white dark:bg-gray-900 max-w-md mx-auto border border-grey-light rounded-b-lg shadow-2xl overflow-hidden">
            <div className="flex pt-4 px-4">
                <div className="w-16 mr-2">
                    <img className="w-16 rounded-full border-red-600 border-2"
                        src={Icon} />
                </div>
                <div className="px-2 pt-2 flex-grow">
                    <header>
                        <a className="text-black dark:text-white no-underline">
                            <div className="font-medium mr-2">{codes.title}</div>
                            <div className="font-normal text-gray-400 text">{codes.err}</div>
                        </a>
                    </header>
                    <article className="py-4 text-gray-800 dark:text-gray-300 w-80">
                        <ErrorHandler>
                            <PostViewer className={"h-full w-full overflow-auto"} baseState={props.baseState}>
                                {codes.mes + "\n```\n" + JSON.stringify(props.errorData, null, 2) + "\n```"}
                            </PostViewer>
                        </ErrorHandler>
                    </article>
                </div>
            </div>
        </div>
    )
}