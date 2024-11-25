// "use client"

// import { ErrorMessage, Field, Form, Formik } from "formik";
// import { Button } from "@/components/ui/button";
// import { ObservationFormProps } from "@/interfaces/observer-form";
// import { DatePickerComponent } from "./date-picker/DatePicker";
// import { validationSchema } from "@/schema/observation-form-schema";



// export const ObservationForm = ({
// 	formValues,
// 	startTimelapseAction,
// 	stopTimelapseAction,
// 	submitHandlerAction,
// 	// handleChange,
// }: ObservationFormProps) => {
// 	return (
// 		<>
// 			<Formik
// 				initialValues={formValues}
// 				validationSchema={validationSchema}
// 				onSubmit={submitHandlerAction}>
// 				{({ setFieldValue }) => (
// 					<Form className='flex flex-col gap-2'>
// 						<label htmlFor='date'>
// 							<Field
// 								className='w-full border hidden'
// 								name='date'
// 								type='date'
// 							/>
// 							<DatePickerComponent
// 								setFieldValueAction={setFieldValue}
// 								date={formValues.date}
// 							/>

// 							<ErrorMessage
// 								name='date'
// 								component='div'
// 							/>
// 						</label>
// 						{/* <label htmlFor='time'>
// 							<Field
// 								className='w-full border hidden'
// 								name='time'
// 								type='time'
// 								// onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
// 								// 	setCurrentTime(e.target.value); // Обновляем время в Dashboard
// 								// }}
// 								// value={currentTime}
// 							/>

							
// 							<ErrorMessage
// 								name='time'
// 								component='div'
// 							/>
// 						</label> */}
// 						 {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
//       <div>
//         <TimePicker
//           label="Select time"
//           value={selectedTime}
//           onChange={handleChange}
//           renderInput={(params) => <TextField {...params} />}
//         />
//         <div>
//           {selectedTime ? `Selected Time: ${selectedTime.toLocaleTimeString()}` : "No time selected"}
//         </div>
//       </div>
//     </LocalizationProvider> */}
// 						<Field
// 							className='w-full border '
// 							name='latitude'
// 						/>
// 						<ErrorMessage
// 							name='latitude'
// 							component='div'
// 						/>
// 						<Field
// 							className='w-full border '
// 							name='longitude'
// 						/>
// 						<ErrorMessage
// 							name='longitude'
// 							component='div'
// 						/>
// 						<Button type='submit'>FETCH</Button>
// 						<Button
// 							type='button'
// 							onClick={startTimelapseAction}>
// 							Start Timelapse
// 						</Button>
// 						<Button
// 							type='button'
// 							onClick={stopTimelapseAction}>
// 							Stop Timelapse
// 						</Button>
// 					</Form>
// 				)}
// 			</Formik>
// 		</>
// 	);
// };
"use client";

import { ErrorMessage, Field, Form, Formik } from "formik";
import { Button } from "@/components/ui/button";
import { ObservationFormProps } from "@/interfaces/observer-form";
import { DatePickerComponent } from "./date-picker/DatePicker";
import { validationSchema } from "@/schema/observation-form-schema";

export const ObservationForm = ({
	formValues,
	startTimelapseAction,
	stopTimelapseAction,
	submitHandlerAction,
}: ObservationFormProps) => {
	return (
		<div className='p-6 max-w-md mx-auto bg-white shadow-lg rounded-lg'>
			<h2 className='text-2xl font-semibold text-center text-gray-700 mb-4'>
				Observation Form
			</h2>
			<Formik
				initialValues={formValues}
				validationSchema={validationSchema}
				onSubmit={submitHandlerAction}>
				{({ setFieldValue, values }) => (
					<Form className='space-y-4'>
						{/* Date Input */}
						<label className='block'>
							<span className='text-gray-600'>Date</span>
							<Field
								className='hidden'
								name='date'
								type='date'
							/>
							<DatePickerComponent
								setFieldValueAction={setFieldValue}
								date={values.date}
							/>
							<ErrorMessage
								name='date'
								component='div'
								className='text-red-500 text-sm'
							/>
						</label>

						{/* Time Input */}
						<label className='block'>
							<span className='text-gray-600'>Time (HH:MM:SS)</span>
							<Field
								className='w-full mt-1 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
								name='time'
								type='time'
								step='1' // Позволяет задавать время с точностью до секунды
							/>
							<ErrorMessage
								name='time'
								component='div'
								className='text-red-500 text-sm'
							/>
						</label>

						{/* Latitude Input */}
						<label className='block'>
							<span className='text-gray-600'>Latitude</span>
							<Field
								className='w-full mt-1 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
								name='latitude'
								type='number'
								step='0.01'
								placeholder='Enter latitude'
							/>
							<ErrorMessage
								name='latitude'
								component='div'
								className='text-red-500 text-sm'
							/>
						</label>

						{/* Longitude Input */}
						<label className='block'>
							<span className='text-gray-600'>Longitude</span>
							<Field
								className='w-full mt-1 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
								name='longitude'
								type='number'
								step='0.01'
								placeholder='Enter longitude'
							/>
							<ErrorMessage
								name='longitude'
								component='div'
								className='text-red-500 text-sm'
							/>
						</label>

						{/* Action Buttons */}
						<div className='flex space-x-4 justify-center mt-4'>
							<Button type='submit'>FETCH</Button>
							<Button
								type='button'
								onClick={startTimelapseAction}>
								Start Timelapse
							</Button>
							<Button
								type='button'
								onClick={stopTimelapseAction}>
								Stop Timelapse
							</Button>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
};
