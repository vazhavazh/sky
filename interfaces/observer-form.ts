import { FormValues } from "./form-values";

export interface ObservationFormProps {
	formValues: FormValues;

	startTimelapse: () => void;

	stopTimelapse: () => void;

	submitHandler: (values: FormValues) => Promise<void>;

}
