"use client";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { DatePickerComponentProps } from "@/interfaces/datepicker";
import { useState } from "react";

export const DatePickerComponent = ({ date }: DatePickerComponentProps) => {
	const [localDate, setLocalDate] = useState<Date>(new Date(date));

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant={"outline"}
					className={cn(
						"w-[280px] justify-start text-left font-normal",
						!date && "text-muted-foreground"
					)}>
					<CalendarIcon />
					{date ? format(date, "PPP") : <span>Pick a date</span>}
				</Button>
			</PopoverTrigger>
			<PopoverContent className='w-auto p-0'>
				<Calendar
					mode='single'
					selected={localDate}
					// onSelect={setDate}
					initialFocus
				/>
			</PopoverContent>
		</Popover>
	);
};
