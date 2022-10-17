import ErrorMessage from '../errorMessage/ErrorMessage'

import {Link} from "react-router-dom";

const Page404 = () => {
    return (
        <>
            <ErrorMessage></ErrorMessage>
            <span style={{'textAlign': 'center', 'display': 'block'}}>Page doesn't exist</span>
            <Link to="/" style={{'display': 'block', 'margin-top': '20px', 'textAlign': 'center', 'color': '#9F0013'}}>Back to main page</Link>
        </>
    )
}
export default Page404;