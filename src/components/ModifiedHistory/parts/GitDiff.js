export default (props) => {
    const result = props.string.split(/(\[|\]|\{|\})/).filter(str => (str).match(/(\[|\]|\{|\})/) === null).map(str => {
        if(str.match(/^\+.*\+$/) !== null){
            return <span className="bg-green-600">{str.split("+")}</span>
        }
        if(str.match(/^\-.*\-$/) !== null){
            return <span className="bg-red-600"><s>{str.split("-")}</s></span>
        }
        return str;
    }).map(str => typeof str === "string" ?  str.replace(/\\n/g, " ") : str);
    return(
        result
    )
}