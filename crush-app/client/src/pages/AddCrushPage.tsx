import { ChangeEvent, FormEvent, useState } from "react"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import { Star, Trash } from "../components"

export const AddCrushPage = () => {
    const [crush, setCrush] = useState({ attractiveness: 1, name: '', origin: '' })
    const [counter, setCounter] = useState(1)

    const navigate = useNavigate()

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setCrush((pre) => ({ ...pre, [name]: value }))
    }


    const handleRating = () => {
        setCounter((pre => (pre < 5 ? pre + 1 : 1)))
        setCrush(pre => ({ ...pre, attractiveness: counter + 1 }))
    }


    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const { data: { message } } = await axios.post('/crushes', crush)
            alert(message)
            navigate('/')
        } catch (err: any) {
            alert(err.response.data.message)
            console.log(err)
        }
    }


    return (
        <form onSubmit={handleSubmit} className="card p-4" style={{ width: '480px' }}>
            <div className="field">
                <label className="label">Crush Name</label>
                <div className="control">
                    <input value={crush.name} onChange={onChange} name='name' className="input" />
                </div>
            </div>
            <div className="field">
                <label className="label">Crush Origin</label>
                <div className="control">
                    <input value={crush.origin} onChange={onChange} name='origin' className="input" />
                </div>
            </div>
            <div>
                <button type="button" onClick={handleRating} className="button is-warning is-pulled-right">
                    {counter}
                    <Star />
                </button>
            </div>
            <button type="submit" className="button is-info">Add</button>
        </form>
    )
}
