import gfm from 'remark-gfm';
import ReactMarkdown from 'react-markdown';
import { Link, BrowserRouter } from 'react-router-dom';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dark, vscDarkPlus, vs } from 'react-syntax-highlighter/dist/esm/styles/prism'
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
        return <Link to={href.match(new RegExp(`^${window.location.origin}(.*)$`))[1]}>{children}</Link>;
    };

    const renderers = {
        code: ({ language, value }) => {
            return <SyntaxHighlighter style={props.baseState.dark ? vscDarkPlus : vs} language={language} children={value} />
        },
        link: linkBlock
    }

    return (
        <BrowserRouter>
            <ReactMarkdown
                className={props.className + " " + (props.children.length < powerWordLength ? "text-3xl" : "text-base")}
                plugins={[gfm]}
                renderers={renderers}
            >
                {props.children}
            </ReactMarkdown>
        </BrowserRouter>
    )
}

export default PostViewer;