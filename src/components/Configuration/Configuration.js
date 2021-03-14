import CheckBox from '../parts/Toggle';
import CloseIcon from '../../resources/close';

const langChooseG = (lang, property) => (property[lang]);


const Configuration = (props) => {
    const langChoose = (property) => (langChooseG(props.state.language, property));
    const toggleDarkMode = () => {
        props.accessor({
            dark: !props.state.dark
        })
    }
    const langSelect = (e) => {
        props.toggleAccessor("contextMenu", {
            name: "languageSelect",
            pos: {
                x: e.clientX,
                y: e.clientY
            }
        })
    }
    const closeConfig = () => {
        props.accessor({
            popup: false
        })
    }
    const test = () => {
        console.log("test");
    }

    return (
        <div className="fixed top-0 left-0 w-full h-full">
            <div className="fixed bg-gray-600 opacity-50 w-full h-full" />
            <div className="fixed p-20 w-full h-full">
                <div className="bg-white dark:bg-gray-800 dark:text-gray-100 rounded-xl shadow-md text-lg h-full md:p-20">
                    <div className="flex w-full">
                        <h1 className="text-5xl">{langChoose({ ja: "設定", en: "Settings" })}</h1>
                        <button className="ml-auto focus:outline-none" onClick={closeConfig}>
                            <CloseIcon width="48" />
                        </button>
                    </div>
                    <div className="my-16">
                        <div className="my-2">
                            {langChoose({ ja: "言語", en: "Language" })}:
                            <button className="border border-gray-500 rounded-xl w-auto px-5 mx-5 py-2 focus:outline-none" onClick={langSelect}>
                                {props.state.languageDefine[props.state.language]}
                            </button>
                        </div>
                        <CheckBox name={langChoose({ ja: "ダークモード", en: "Dark Mode" })} toggle={props.state.dark} callback={toggleDarkMode} />
                    </div>
                </div>
            </div>
        </div>
    )

}
export { langChooseG };
export default Configuration;