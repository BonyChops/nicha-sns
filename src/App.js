import logo from './logo.svg';
import './App.css';
import CheckIcon from './resources/check'
import Sidebar from './components/Sidebar/Sidebar';

function App() {
  return (
    <div className="App dark">
      <div className="font-sans antialiased h-screen flex">


        <div className="bg-gray-700 text-purple-lighter flex-none w-24 p-6 hidden md:block">
          <div className="cursor-pointer mb-4">
            <div className="bg-white h-12 w-12 flex items-center justify-center text-black text-2xl font-semibold rounded-lg mb-1 overflow-hidden">
              <img src="https://pbs.twimg.com/profile_images/1347203616076042241/lOT_l9fu_400x400.jpg" alt="" />
            </div>
            <div className="text-center text-white opacity-50 text-sm">&#8984;1</div>
          </div>
          <div className="cursor-pointer mb-4">
            <div className="bg-indigo-lighter opacity-25 h-12 w-12 flex items-center justify-center text-black text-2xl font-semibold rounded-lg mb-1 overflow-hidden">
              L
            </div>
            <div className="text-center text-white opacity-50 text-sm">&#8984;2</div>
          </div>
          <div className="cursor-pointer">
            <div className="bg-white opacity-25 h-12 w-12 flex items-center justify-center text-black text-2xl font-semibold rounded-lg mb-1 overflow-hidden">
              <svg className="fill-current h-10 w-10 block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M16 10c0 .553-.048 1-.601 1H11v4.399c0 .552-.447.601-1 .601-.553 0-1-.049-1-.601V11H4.601C4.049 11 4 10.553 4 10c0-.553.049-1 .601-1H9V4.601C9 4.048 9.447 4 10 4c.553 0 1 .048 1 .601V9h4.399c.553 0 .601.447.601 1z" /></svg>
            </div>
          </div>



        </div>
        <Sidebar />

        <div className="flex-1 flex flex-col dark:bg-gray-800 overflow-hidden">
          a
        </div>
        <div className="absolute bottom-0 dark:bg-gray-900 h-16 w-full shadow-2xl rounded-t-xl">
          <div className="relative left-5 bottom-1 w-5">
            <div className="flex items-center flex-no-shrink text-white mr-6">
              <svg className="h-8 w-8 mr-2" width="54" height="54" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" /></svg>
              <span className="font-semibold text-xl tracking-tight flex"><span>Nicha</span><span className="text-xs pl-2 bottom-0 mb-0 mt-auto"> for NNCT</span></span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default App;
