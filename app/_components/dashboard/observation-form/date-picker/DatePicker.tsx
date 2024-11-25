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
import { useEffect, useState } from "react";

export const DatePickerComponent = ({
	date,
	setFieldValueAction,
}: DatePickerComponentProps) => {
	const [localDate, setLocalDate] = useState<Date | undefined>(new Date(date));

	useEffect(() => {
		if (localDate) {
			const formattedDate = format(localDate, "yyyy-MM-dd");
			setFieldValueAction("date", formattedDate);
		}
	}, [localDate, setFieldValueAction]);

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant={"outline"}
					className={cn(
						"w-[280px] justify-start text-left font-normal",
						!localDate && "text-muted-foreground"
					)}>
					<CalendarIcon />
					{localDate ? format(localDate, "PPP") : <span>Pick a date</span>}
				</Button>
			</PopoverTrigger>
			<PopoverContent className='w-auto p-0'>
				<Calendar
					mode='single'
					selected={localDate}
					onSelect={setLocalDate}
				/>
			</PopoverContent>
		</Popover>
	);
};
