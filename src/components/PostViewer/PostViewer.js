import gfm from 'remark-gfm';
import ReactMarkdown from 'react-markdown';
import { Link, BrowserRouter } from 'react-router-dom';
import SyntaxHighlighter from 'react-syntax-highlighter'
import { vs, vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs'
//import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
//import { dark, vscDarkPlus, vs } from 'react-syntax-highlighter/dist/esm/styles/prism'
const PostViewer = (props) => {
    const powerWordLength = 20;

    const linkBlock = (props) => {
        const { href, children } = props;
        console.log(window.location)
        if (href.indexOf(window.location.origin) === -1) {
            return (
                <a href={href} target="_blank" rel="noopener noreferrer">
                    {children}
                </a>
            );
        }
        // ページ内リンク
        if (href.slice(0, 1) == '#') {
            return <a href={href}>{children}</a>;
        }
        return <Link key={props.children} to={href.match(new RegExp(`^${window.location.origin}(.*)$`))[1]}>{children}</Link>;
    };
    const breakLine = (props) => {
        console.log(props);
        return null;
    }

    const renderers = {
        code: ({ language, value }) => {
            return (value !== undefined ? <SyntaxHighlighter className="my-2 text-sm" style={props.baseState.dark ? vs2015 : vs} language={language} children={value} /> : null)
        },
        link: linkBlock,
        break: breakLine,
        thematicBreak: breakLine
    }

    return (
        <BrowserRouter>
            <ReactMarkdown
                className={props.className + " whitespace-pre-wrap w-full break-words  " + (props.children.length < powerWordLength ? "text-3xl" : "text-base")}
                plugins={[gfm]}
                renderers={renderers}
                history={props.history}
            >
                {props.children}
            </ReactMarkdown>
        </BrowserRouter>
    )
}

export default PostViewer;