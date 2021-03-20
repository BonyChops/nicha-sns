import CheckBox from '../parts/Toggle';
import CloseIcon from '../../resources/close';
import Swal from 'sweetalert2/src/sweetalert2.js'
import '@sweetalert2/themes/dark';
const langChooseG = (lang, property) => (property[lang]);


const Configuration = (props) => {
    const langChoose = (property) => (langChooseG(props.state.language, property));
    const toggleDarkMode = () => {
        props.accessor({
            dark: !props.state.dark
        })
    }
    const toggleEarthQuakeWarn = () => {
        if (props.state.earthQuakeWarn) {
            Swal.fire({
                icon: "warning",
                iconColor: "red",
                title: langChoose({ja: "地震速報はあなたを守ります", en: "EARTHQUAKE EARLY WARNING SAVES YOU"}),
                html: langChoose({
                    ja: "日本は地震大国です．あなたを守るため，あなたの大切な人を悲しませないためにも，いつ地震が起きても対処できるように日々準備をしておきましょう．<br /><br />本当に地震速報を無効にしますか？",
                    en: "There are a lot of earthquakes in Japan. For your safety, not to make loved ones sad, be sure that you've prepared for the earthquake that can occur anywhere, anytime.<br /><br />Are you sure to want to disable it?"
                }),
                showDenyButton: true,
                confirmButtonText: langChoose({
                    ja: "有効にしておく",
                    en: "Keep it enabled"
                }),
                denyButtonText: langChoose({
                    ja: "はい，地震速報を無効にします",
                    en: "Yes, I want to disable it"
                }),
            }).then(result => {
                if(result.isDenied){
                  props.accessor({
                      earthQuakeWarn: false
                  })
                }
              })
            return;
        }
        props.accessor({
            earthQuakeWarn: true
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
                        <CheckBox name={langChoose({ ja: "地震速報を受信する", en: "Receive earthquake early warning" }) + "(β)"} toggle={props.state.earthQuakeWarn} callback={toggleEarthQuakeWarn} important={true}/>
                    </div>
                </div>
            </div>
        </div>
    )

}
export { langChooseG };
export default Configuration;