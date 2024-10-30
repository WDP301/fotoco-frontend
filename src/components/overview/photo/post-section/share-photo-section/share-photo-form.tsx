"use client"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/provider/language-provider"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Copy } from "lucide-react"

export function SharePhotoForm() {
    const { dict } = useLanguage();

    const handleCreateSharePhotoLink = (event: React.FormEvent<HTMLFormElement>) => {
        
    }

    return (
        <>
        <form onSubmit={handleCreateSharePhotoLink} className="w-2/3 space-y-6">
            <div className="flex items-center space-x-2">
                <label className="whitespace-nowrap">{dict.sharePhotoDialog.sharePhotoForm.label}</label>
                <div className="flex items-center space-x-2">
                    <Input 
                        name="time-value" 
                        type="number" 
                        defaultValue={1}
                        max={100}
                        min={1} 
                        className="w-16" 
                    />
                    <Select name="time-unit" defaultValue="days">
                        <SelectTrigger className="w-30">
                            <SelectValue placeholder="Select unit" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="days">Day(s)</SelectItem>
                            <SelectItem value="weeks">Week(s)</SelectItem>
                            <SelectItem value="months">Month(s)</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <Button type="submit">Create Link</Button>
        </form>
        {/* <form>
             <div>
                <div className="grid flex-1 gap-2">
                            <Label htmlFor="link" className="sr-only">
                            Link
                            </Label>
                            <Input
                            id="link"
                            defaultValue="https://ui.shadcn.com/docs/installation"
                            readOnly
                            />
                        </div>
                        <Button type="submit" size="sm" className="px-3" title="Copy link">
                            <span className="sr-only">Copy</span>
                            <Copy className="h-4 w-4" />
                        </Button>
            </div>
        </form> */}
        </>
    );
}
