import { DeleteIcon } from "../icons/DeleteIcon";
import { DocumentIcon } from "../icons/DocumentIcon";
import { ShareIcon } from "../icons/ShareIcon";

interface cardComponents {
    title: string,
    link: string,
    description: string,
    date: Date
}

export function Card(props: cardComponents) {
    return <div className="bg-white rounded-md border border-black shadow-md w-56 h-72 mt-2">
        <div className="flex justify-between h-[13.5%] items-center align-middle border border-black">

            <div className="flex align-middle items-center w-[70%] justify-evenly pr-2 ">
                <p><DocumentIcon size="md" /></p>
                <div className="font-serif font-bold text-sm leading-3">{props.title}</div>
            </div>
            <div className="flex w-[30%] justify-evenly ">
                <div className="flex">
                    <span className="mr-4"><ShareIcon size="sm" /></span>
                    <DeleteIcon size="sm" />
                </div>

            </div>
        </div>

        <div className="flex justify-between h-[52%] items-center align-middle border border-black mt-1">
            <a >{props.link}</a>

        </div>

        <div className="flex justify-between h-[20.5%] items-center align-middle border border-black mt-1">
            {props.description}
        </div>
        <div>
            <p><span>Created on : </span> {props.date.toLocaleDateString()}</p>
        </div>

    </div>
}