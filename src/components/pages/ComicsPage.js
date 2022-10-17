
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AppBanner from '../appBanner/AppBanner'
import ComicsList from "../comicsList/ComicsList";
import SingleComicPage from "./SingleComicPage";

const ComicsPage = () => {
    return (
        <>
            <AppBanner/>
            <ComicsList/>
            {/* <Routes>
                <Route>
                    <Route path=":comicId" element={<SingleComicPage/>}/>
                    <Route path="/" element={<ComicsList/>}/>
                </Route>
            </Routes> */}
        </>
    )
}
export default ComicsPage;