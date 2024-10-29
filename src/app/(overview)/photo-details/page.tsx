import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { Right } from "./righ"
import Left from "./left"

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function Component() {
  return (
    <Dialog>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent className="max-w-screen h-screen overflow-hidden flex p-0">
        <div className="flex flex-col justify-between w-3/4">
          <div className="w-full grid gap-1.5">
          <Left />
          </div>
        </div>
        <div className="flex flex-col justify-between w-1/4 pt-[50px] pr-3">
          <div className="w-full grid gap-1.5">
            <Right />
          </div>
        </div>
      </DialogContent>
    </Dialog>  
  )
}