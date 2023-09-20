import { useSelector, useDispatch } from "react-redux"
import { fetchCrushes, selectCrushSlice } from "../redux/crushSlice"
import { useEffect } from "react"
import { AppDispatch } from "../redux/store"
import { Card } from "../components/Card"
import { Link } from "react-router-dom"


export const Homepage = () => {
    const { crushList, isLoading, error } = useSelector(selectCrushSlice)
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(fetchCrushes())
    }, [])

    if (isLoading) {
        return (<progress style={{ marginTop: '5rem' }} className="progress is-small is-primary" max="100" />)
    }

    if (error) {
        return (
            <article className="message is-danger">
                <div className="message-body">{error}</div>
            </article>
        )
    }
    return (
        <div className="columns">
            {crushList.map((crush) => (
                <article key={crush._id} className="column">
                    <Link to={`crush/${crush._id}`}>
                        <Card {...crush} />
                    </Link>
                </article>
            ))}
        </div>
    )
}
