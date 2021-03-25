import { langChooseG } from '../Configuration/Configuration';
import CloseIcon from '../../resources/close';
import { useState } from 'react';
import Icon from '../../resources/logo.png';
import PostViewer from '../PostViewer/PostViewer';
import CheckBox from '../parts/Toggle';
import ErrorHandler from '../../functions/ErrorHandler';
import Swal from 'sweetalert2';

const NewPost = (props) => {
    const powerWordLength = 20;
    const postLimits = 2000;
    const langChoose = (property) => (langChooseG(props.baseState.language, property));
    const closeConfig = () => {
        props.accessor({
            popup: false
        })
    }
    const [post, setPost] = useState("");
    const [preview, setPreview] = useState(false);
    const [previewRendered, setPreviewRendered] = useState(false);
    const [submitSw, setSubmit] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const postHandler = (e) => {
        setPost(e.target.value);
    }
    const togglePreview = () => {
        if (post === "") return;
        setPreviewRendered(false);
        setPreview(!preview);
    }
    const errorHandled = () => {
        if (submitSw) {
            Swal.fire({
                icon: "error",
                title: "投稿に失敗しました",
                text: "プレビューできないものは投稿できません．"
            })
        }
        setSubmit(false);
    }
    const successPreview = () => {
        setPreviewRendered(true);
    }
    const confirm = () => {
        setSubmit(true);
        if (preview) {
            submit();
        } else {
            setPreview(true);
        }
    }
    const submit = () => {
        if (!(previewRendered && submitSw)) {
            return;
        }
        setSubmitting(true)
        setSubmitting(false)
        setSubmit(false);
    }
    /* const handleKeyDown = (e) => {

        if (e.key === 'Tab' && e.keyCode !== 229) {
            e.preventDefault();
            const textareaElement = e.target;
            const currentText = textareaElement.value;
            const start = textareaElement.selectionStart;
            const end = textareaElement.selectionEnd;
            const spaceCount = 4;
            const substitution = Array(spaceCount + 1).join(' ');
            const newText = currentText.substring(0, start) + substitution + currentText.substring(end, currentText.length);
            setPost(newText,
                () => {
                    textareaElement.setSelectionRange(start + spaceCount, start + spaceCount);
                });
        }
    } */

    return (
        <div className="fixed top-0 left-0 w-full mx-auto h-full" >
            <div className="fixed bg-gray-600 opacity-50 w-full h-full" />
            <div className="fixed md:py-20 md:px-32 w-full h-full">
                <div className="bg-white dark:bg-gray-800 dark:text-gray-100 md:rounded-xl md:shadow-md text-lg h-full md:p-20 p-5 w-full  overflow-auto">
                    <div className="flex w-full mb-10">
                        <h1 className="text-5xl">{langChoose({ ja: "投稿", en: "Post" })}</h1>
                        <button className="ml-auto focus:outline-none" onClick={closeConfig}>
                            <CloseIcon width="46" />
                        </button>
                    </div>
                    <div className=" w-full h-4/6">
                        <div className="w-12 mb-2">
                            <img className="rounded-full" src={props.state.userInfo.icon} />
                        </div>
                        <div className="w-full h-5/6">
                            {(!preview ? (
                                <textarea
                                    className={"bg-gray-800 w-full h-full outline-none overflow-auto " + (post.length < powerWordLength ? "text-3xl" : "text-base")}
                                    placeholder="今どんな気持ち？"
                                    value={post}
                                    onChange={postHandler}
                                   /*  onKeyDown={handleKeyDown.bind(this)} */
                                />) : (
                                <ErrorHandler error={errorHandled} callback={successPreview}>
                                    <PostViewer className={"h-full w-full overflow-auto"} baseState={props.baseState}>
                                        {post}
                                    </PostViewer>
                                </ErrorHandler>
                            ))}
                        </div>
                    </div>

                    <div className={"w-full text-right mb-5 " + (postLimits - post.length < 500 ? "visible text-yellow-600" : "invisible")}>
                        <p className={"ml-auto " + (postLimits - post.length < 0 ? "text-red-600" : "")}>{postLimits - post.length}</p>
                    </div>
                    <div className="w-full flex">
                        <CheckBox name={langChoose({ ja: "プレビュー", en: "Preview" })} toggle={preview} callback={togglePreview} />
                        <button type="submit"
                            className={"flex ml-auto rounded-xl bg-blue-500 px-5 py-2 shadow-md text-white focus:outline-none " + (submitting ? "animate-pulse" : "")}
                            translate="no"
                            disabled={submitting || (preview && !previewRendered)}
                            onClick={confirm}
                        >
                            <img src={Icon} className={"w-6 mr-2 " + (submitting ? "animate-spin" : "")} /><p className="top-0 bottom-0 my-auto">{langChoose({ ja: "投稿", en: "Start" })}</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewPost;