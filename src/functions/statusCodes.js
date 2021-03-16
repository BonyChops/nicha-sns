import { langChooseG } from '../components/Configuration/Configuration';


export default (lang, statusCode) => {
    const langChoose = (params) => langChooseG(lang, params);
    return ({
        "not_authorized": {
            err: "401 Not Authorized",
            title: langChoose({ja: "認証されていません", en: "Not Authorized"}),
            mes: langChoose({ja: "認証に失敗しました．ページをリロードしてください．", en: "Failed to authorize. Please reload the page."})
        },
        "not_found_post": {
            err: "404 Not Found",
            title: langChoose({ja: "投稿が見つかりませんでした", en: "Post not found"}),
            mes: langChoose({ja: "投稿が見つかりませんでした．ツイ消し職人の仕事は早いねー...(それかURLが間違っています)", en: "We can't find the post you are looking for. Please make sure the link is really correct. (Maybe author deleted the post?)"})
        }
    })[statusCode]
}