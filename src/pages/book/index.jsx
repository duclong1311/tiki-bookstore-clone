import { useLocation } from "react-router";

const BookPage = () => {
    let location = useLocation();

    let params = new URLSearchParams(location.search);
    const id = params?.get("id");

    return (
        <>
            BookPage
        </>
    )
}

export default BookPage;