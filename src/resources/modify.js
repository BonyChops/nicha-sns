export default (props) => (
    <div>
        <svg xmlns="http://www.w3.org/2000/svg" width={props.w === undefined ? "24" : props.w} height={props.h === undefined ? "24" : props.h} fill="none" viewBox="0 0 24 24" stroke="currentColor"
            className={"feather feather-message-circle mr-1 " + props.className}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
        </svg>
    </div>
)