export interface DatePickerComponentProps {
	date: string;

	setFieldValueAction: (
		field: string,
		value: unknown,
		shouldValidate?: boolean
	) => void;
}
