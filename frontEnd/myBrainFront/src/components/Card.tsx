import { DocumentIcon } from "../icons/DocumentIcon";
import { ShareIcon } from "../icons/ShareIcon";

export function Card() {
    return <div className="bg-white rounded-md border border-black shadow-md max-w-72 h-96">
        <div className="flex">
            <DocumentIcon size="sm" />
            Project Ideas
        </div>
        <div className="Flex">
            <ShareIcon size="sm" />
        </div>
    </div>
}