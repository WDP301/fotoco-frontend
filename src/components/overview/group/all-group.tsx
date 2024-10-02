import { cn } from "@/lib/utils";
import { TabsContent } from "@/components/ui/tabs";


export default async function AllGroupList() {
  const data = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10');
  const groups = await data.json() as { id: number, title: string }[];

  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {groups.map(group => (
        <TabsContent
          key={group.id}
          value="all-groups"
          className="h-full flex-col border-none p-0 data-[state=active]:flex"
        >
          <div className="max-w-xs w-full group/card mt-5">
            <div
              className={cn(
                "cursor-pointer overflow-hidden relative card h-96 rounded-md shadow-xl max-w-sm mx-auto backgroundImage flex flex-col justify-between p-4",
                "bg-[url(https://images.unsplash.com/photo-1544077960-604201fe74bc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1651&q=80)] bg-cover"
              )}
            >
              <div className="absolute w-full h-full top-0 left-0 transition duration-300 group-hover/card:bg-black opacity-60"></div>
              <div className="flex flex-row items-center space-x-4 z-10">
              </div>
              <div className="text content">
                <h1 className="font-bold text-xl md:text-axl text-gray-50 relative z-10 line-clamp-2">
                  {group.title}
                </h1>
                <p className="font-normal text-sm text-gray-50 relative z-10 my-4">
                  {group.id} album(s)
                </p>
              </div>
            </div>
          </div>
        </TabsContent>
      ))}
    </div>
  );
}
