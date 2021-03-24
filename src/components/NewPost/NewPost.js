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
        if (previewRendered) {
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

    return (
        <div className="fixed top-0 left-0 w-full mx-auto h-full" >
            <div className="fixed bg-gray-600 opacity-50 w-full h-full" />
            <div className="fixed md:p-20 w-full h-full">
                <div className="bg-white dark:bg-gray-800 dark:text-gray-100 md:rounded-xl md:shadow-md text-lg h-full md:p-20 p-5 xl:w-2/5 md:w-4/5 w-full mx-auto overflow-auto">
                    <div className="flex w-full mb-10">
                        <h1 className="text-5xl">{langChoose({ ja: "投稿", en: "Post" })}</h1>
                        <button className="ml-auto focus:outline-none" onClick={closeConfig}>
                            <CloseIcon width="46" />
                        </button>
                    </div>
                    <div className="w-full h-4/6">
                        {(!preview ? (
                            <textarea
                                className={"bg-gray-800 w-full h-full outline-none overflow-auto " + (post.length < powerWordLength ? "text-3xl" : "text-base")}
                                placeholder="今どんな気持ち？"
                                value={post}
                                onChange={postHandler}
                            />) : (
                            <ErrorHandler error={errorHandled} callback={successPreview}>
                                <PostViewer className={"h-full w-full overflow-auto"} baseState={props.baseState}>
                                    {post}
                                </PostViewer>
                            </ErrorHandler>

                        ))}
                    </div>

                    <div className="w-full text-right">
                        <p className={"ml-auto " + (postLimits - post.length < 0 ? "text-red-600" : "")}>{postLimits - post.length}</p>
                    </div>
                    <div className="w-full flex">
                        <CheckBox name={langChoose({ ja: "プレビュー", en: "Preview" })} toggle={preview} callback={togglePreview} />
                        <button type="submit"
                            className={"flex ml-auto rounded-xl bg-blue-500 px-5 py-2 shadow-md text-white focus:outline-none " + (submitting ? "animate-pulse" : "")}
                            translate="no"
                            disabled={submitting}
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