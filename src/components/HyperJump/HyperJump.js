import StarToursCar from '../../resources/startours_car.png';

const HyperJump = (props) => {
    return (
        <div className="absolute top-0 left-0 w-full h-full bg-black text-center">
            <div className=" h-full animate-bounce my-40 text-center mx-auto">
                <img src={StarToursCar} />
                <p className="w-full my-auto text-white text-4xl">ハイパージャンプしています...</p>
            </div>
        </div>
    )
}


export default HyperJump;