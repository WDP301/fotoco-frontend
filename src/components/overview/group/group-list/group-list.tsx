import { SearchGroupParams } from "@/lib/define"
import { getAllGroup } from "@/lib/data";
import { getDictionary } from "@/lib/dictionaries";
import { GroupCard } from "../group-card";
import ListPagination from "@/components/shared/list-pagination";
export default async function GroupList({
    searchParams
}:{
    searchParams: SearchGroupParams
}) {
    const {pageMeta, groups} = await getAllGroup(searchParams);
    const dict = await getDictionary();

    if (!groups || groups.length === 0) {
        return (
            <div className="flex justify-center items-center h-24 ">
                {dict.errorMessage.noGroupFound}
            </div>
        );
    }
    return (
        <div>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {groups.map((group) => (
                <GroupCard key={group._id} group={group} />
            ))}
            </div>
            <div className="my-3">
            <ListPagination meta={pageMeta} bookmark="groups" />
            </div>
        </div>
    )
}