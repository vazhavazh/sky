import { FormValues } from "./form-values";

export interface ObservationFormProps {
	formValues: FormValues;

	startTimelapseAction: () => void;

	stopTimelapseAction: () => void;

	submitHandlerAction: (values: FormValues) => Promise<void>;
	handleChange: (field: string, value: string) => void;
}
