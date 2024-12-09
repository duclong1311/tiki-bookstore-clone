import BeatLoader from "react-spinners/BeatLoader";

const LoadingPage = () => {
    const style = { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" };

    return (
        <>
            <BeatLoader style={style}/>
        </>
    )
}

export default LoadingPage;