import { StayPreview } from "./StayPreview";

export function StayList({ stays }) {
    return <ul className="stay-list">

        {stays.map(stay =>
        
            <li className="stay-preview-container" key={stay._id}>
                <StayPreview stay={stay} />
            </li>)}

    </ul>
}

