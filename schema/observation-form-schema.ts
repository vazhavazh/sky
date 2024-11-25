import * as Yup from "yup";

export const validationSchema = Yup.object({
	date: Yup.string().required("Date is required"),
	time: Yup.string().required("Time is required"),
	latitude: Yup.string()
		.matches(/^\d+\.\d{1,2}\.\d{1}$/, "Invalid latitude format")
		.required("Latitude is required"),
	longitude: Yup.string()
		.matches(/^\d+\.\d{1,2}\.\d{1}$/, "Invalid longitude format")
		.required("Longitude is required"),
});
