
import { utilService } from "../services/util.service.js"


export function StayFilterByTxt({ onChangeTxt }) {


    return <section className="stay-filter">
        <input
            type="text"
            id="txt"
            name="txt"
            placeholder="Search destination"
            onChange={({ target }) => utilService.debounce(onChangeTxt(target.value))}
        />

    </section>
}