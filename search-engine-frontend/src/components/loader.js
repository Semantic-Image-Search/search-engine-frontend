import { RotatingSquare } from 'react-loader-spinner'

const Loader = () => {
    return (
        <div className="loader">
            <RotatingSquare
                height="80"
                width="80"
                radius="900"
                color="black"
                ariaLabel="loading"
                wrapperStyle
                wrapperClass
            />
        </div>
    )
}

export default Loader;