import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import { Crush } from "../types"
import { Star, Trash } from "../components"

export const CrushPage = () => {
    const [crush, setCrush] = useState<Crush>({ _id: '', attractiveness: 1, name: '', origin: '' })
    const [counter, setCounter] = useState(0)

    const { id } = useParams()
    const navigate = useNavigate()

    const fetchCrushById = async () => {
        try {
            const { data } = await axios.get('/crushes/' + id)
            setCrush(data.data[0])
            setCounter(data.data[0].attractiveness)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchCrushById()
    }, [])

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
            const { data: { message } } = await axios.put('/crushes/' + id, crush)
            alert(message)
            navigate('/')
        } catch (err) {
            alert('failed')
            console.log(err)
        }
    }


    const handleDelete = async () => {
        const isSure = window.confirm('are you sure?')

        if (isSure) {
            try {
                const { data: { message } } = await axios.delete('/crushes/' + id)
                alert(message)
                navigate('/')
            } catch (err: any) {
                alert(err.response.data.message)
                console.log(err)
            }
        }
    }

    return (
        <form onSubmit={handleSubmit} className="card p-4" style={{ width: '480px' }}>
            <div onClick={handleDelete} className="is-pulled-right is-clickable">
                <Trash />
            </div>
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
            <button type="submit" className="button is-info">Edit</button>
        </form>
    )
}
