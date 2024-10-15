import { Right } from "./righ"
import Left from "./left"

export default function Component() {
  return (
      <div className="max-w-screen h-screen overflow-hidden flex">
        <div className="flex flex-col justify-between w-3/4">
          <div className="w-full grid gap-1.5">
          <Left />
          </div>
        </div>
        <div className="flex flex-col justify-between w-1/4 p-4">
          <div className="w-full grid gap-1.5">
            <Right />
          </div>
        </div>
      </div>
  )
}