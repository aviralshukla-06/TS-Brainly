import { DeleteIcon } from "../icons/DeleteIcon";
import { DocumentIcon } from "../icons/DocumentIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { ViewIcon } from "../icons/ViewIcon";

interface cardComponents {
    title: string,
    link: string,
    description?: string,
    date: Date,
    linkPreview: {
        image?: string;
        title?: string;
        description?: string;
    };
}

export function Card(props: cardComponents) {
    return <div className="bg-white rounded-md shadow-lg w-56 h-72 mt-6">
        <div className="flex justify-between h-[15%] shadow-md items-center align-middle ">

            <div className="flex align-middle items-center w-[70%] justify-evenly pr-2 ">
                <p><DocumentIcon size="md" /></p>
                <div className="font-serif font-bold text-sm leading-3">{props.title}</div>
            </div>
            <div className="flex w-[30%] justify-evenly ">
                <div className="flex">
                    <span className="mr-2"><ShareIcon size="sm" /></span>
                    <DeleteIcon size="sm" />
                </div>

            </div>
        </div>

        <div className="h-[46%] flex flex-col items-center justify-start mt-1 px-1">
            {props.linkPreview?.image ? (
                <img
                    src={props.linkPreview.image}
                    alt="Link preview"
                    className="h-auto w-auto object-cover rounded-sm"
                />
            ) : (
                <div className="h-24 w-full bg-gray-200 rounded-sm flex items-center justify-center text-xs text-gray-500">
                    No Preview Available
                </div>
            )}
            {/* <p className="text-xs mt-1 text-center line-clamp-2">
                {props.linkPreview?.title || props.link}
            </p> */}
        </div>

        <div className="flex justify-between h-[21%] px-1  items-center font-serif leading-4 align-middle ">
            {props.description}
        </div>
        <div className="font-serif text-[14px]  flex justify-around ">
            <p className=""><span>Created on : </span> {props.date.toLocaleDateString()}</p>
            <div className="flex  w-[20%] justify-end font-bold ">
                <ViewIcon size="md" />
            </div>
        </div>

    </div>
}