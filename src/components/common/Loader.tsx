const Loader = (): JSX.Element => (
    <div className="fixed top-0 left-0 w-full bg-black/75 h-[100vh] z-50 flex justify-center items-center">
        <div className="flex items-center gap-3">
            <div className="loader-circle" />
            <div className="loader-circle" />
            <div className="loader-circle" />
        </div>
    </div>
)

export default Loader
