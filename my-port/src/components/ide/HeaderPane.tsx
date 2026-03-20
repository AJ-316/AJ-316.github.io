import {FaA, FaJ} from "react-icons/fa6";

const HeaderPane = () => {
    return (
        <div className="flex items-center w-full m-1 p-5 justify-baseline rounded-md">
            <div className="flex items-center text-3xl mr-5 border-gray-500 border-1 bg-gray-950 rounded-full w-16 h-16 min-w-16 min-h-16 justify-center">
                <FaJ className="text-gray-500/75" />
                <FaA className="text-gray-300/75 -ml-[2.7rem]" />
            </div>
            <span className="md:text-4xl text-lg">
                Advaitya Jadhav - Software-dev
            </span>
        </div>
    );
}

export default HeaderPane;