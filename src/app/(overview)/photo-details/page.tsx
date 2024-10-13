import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { Right } from "./righ"
import Left from "./left"

export default function Component() {
  return (
    <div className="container">
      <Card className="w-full overflow-hidden h-auto">
        <CardHeader className="flex items-center justify-between p-3">
          {/* Header content (if any) goes here */}
        </CardHeader>
          <CardContent className="flex w-full">
            <div className="flex flex-col justify-between w-1/2">
              <div className="text-sm w-full grid gap-1.5">
                <Left />
              </div>
            </div>
            <div className="flex flex-col justify-between w-1/2">
              <div className="pl-4 text-sm w-full grid gap-1.5">
                <Right />
              </div>
            </div>
          </CardContent>
      </Card>
    </div>
  
  )
}