import { motion } from "framer-motion";
import ProfilePic from "./ProfilePic";

const TitlePage = () => {

    return (
        <div>
            <div className="flex justify-center items-center">
                <motion.h1
                    className="text-white px-10 pb-5 pt-10"
                    initial={{ y: 25, opacity: 0 }}
                    viewport={{ once: false }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, type: "spring", damping: 8 }}
                >
                    <p className="text-[0.8rem] font-thin">Hi, I'm</p> 
                    <p className="shine-text text-[2rem] underline-animate"
                    >Advaitya Jadhav</p>
                </motion.h1>
            </div>

            <ProfilePic />

            <motion.h1
                className="text-white flex justify-center items-center text-center"
                initial={{ y: -25, opacity: 0 }}
                viewport={{ once: false }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, type: "spring", damping: 8 }}
            >
                <p className="w-fit p-5 lg:p-0 text-[1rem]">Welcome to My Professional Showcase</p>
            </motion.h1>

        </div>
    );
};

export default TitlePage;
