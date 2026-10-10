
const loading = () => {
    return (
        <div className="min-h-[400px] flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <span className="loading loading-spinner loading-lg text-green-700"></span>

                <p className="text-gray-400 text-lg">
                    Loading...
                </p>
            </div>
        </div>
    );
};

export default loading;