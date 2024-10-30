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

export function SharePhotoForm() {
    const { dict } = useLanguage();

    const handleCreateSharePhotoLink = (event: React.FormEvent<HTMLFormElement>) => {
        
    }

    return (
        <form onSubmit={handleCreateSharePhotoLink} className="w-2/3 space-y-4">
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
    );
}
