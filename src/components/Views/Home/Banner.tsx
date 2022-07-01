const Banner = (): JSX.Element => (
    <div className="h-[20rem] pt-4 bg-[url('./assets/img/headerx1.png')] md:bg-none bg-no-repeat bg-cover bg-[center_right]">
        <div
            className="
                page-container
                h-full
                md:bg-[url('./assets/img/headerx1.png')]
                bg-no-repeat
                bg-cover
                bg-[center_right]
                md:rounded-md
                md:shadow-sm"
        >
            <div className="section-container h-full flex items-end pb-14">
                <h2 className="font-bold text-5xl text-white">Electronics</h2>
            </div>
        </div>
    </div>
)

export default Banner
