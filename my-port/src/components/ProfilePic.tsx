const ProfilePic = () => {
    return (
        <div className="flex justify-center items-center p-6 md:p-0 md:pb-5">
            <img 
                className="w-[6rem]
                    rounded-[100%] shadow-2xl shadow-black 
                    border-y-red-400 border-y-4 border-x-cyan-400 border-x-2
                    animate-[ping_0.5s_ease-in_reverse]" 
                src="/pfp.png"
            />
        </div>
    );
};

export default ProfilePic;
