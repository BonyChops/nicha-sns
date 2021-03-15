import Icon from '../../../../resources/logo.png';
import gfm from 'remark-gfm';
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dark, vscDarkPlus, vs } from 'react-syntax-highlighter/dist/esm/styles/prism'
import statusCodes from '../../../../functions/statusCodes';

export default (props) => {
    const renderers = {
        code: ({ language, value }) => {
            return <SyntaxHighlighter style={props.state.dark ? vscDarkPlus : vs} language={language} children={value} />
        }
    }
    const codes = statusCodes(props.state.language, props.errorData.type);
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
                        <ReactMarkdown plugins={[gfm]} renderers={renderers}>
                            {codes.mes + "\n```\n" + JSON.stringify(props.errorData, null, 2) + "\n```"}
                        </ReactMarkdown>
                    </article>
                </div>
            </div>
        </div>
    )
}