import { Crush } from "../types"
import { Star } from "./Star"
import { Map } from "./Map"

export const Card = ({ attractiveness, name, origin }: Crush) => {
    return (
        <div className="card px-5">
            <div className="card-content has-text-black">
                <h1 className="has-text-weight-semibold">{name}</h1>
                <h5 style={{gap:'0.5rem'}} className="is-flex is-align-items-center"><Map /> {origin}</h5>
                <p style={{gap:'0.5rem'}} className="is-flex is-align-items-center"><Star /> {attractiveness}</p>
            </div>
        </div>

    )
}
