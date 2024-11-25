import { ErrorMessage, Field, Form, Formik } from "formik";
import { Button } from "@/components/ui/button";
import { ObservationFormProps } from "@/interfaces/observer-form";
import { DatePickerComponent } from "./date-picker/DatePicker";
import { validationSchema } from "@/schema/observation-form-schema";

export const ObservationForm = ({
	formValues,
	startTimelapse,
	stopTimelapse,
	submitHandler,
	
}: ObservationFormProps) => {
	return (
		<>
			<Formik
				initialValues={formValues}
				validationSchema={validationSchema}
				onSubmit={submitHandler}>
				{({}) => (
					<Form className='flex flex-col gap-2'>
						<label htmlFor='date'>
							<Field
								className='w-full border hidden'
								name='date'
								type='date'
							/>
							<DatePickerComponent
								
								date={formValues.date}
							/>
							{/* <DatePickerComponent /> */}
							<ErrorMessage
								name='date'
								component='div'
							/>
						</label>
						<label htmlFor='time'>
							<Field
								className='w-full border '
								name='time'
								type='time'
								// onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
								// 	setCurrentTime(e.target.value); // Обновляем время в Dashboard
								// }}
								// value={currentTime}
							/>
							<ErrorMessage
								name='time'
								component='div'
							/>
						</label>
						<Field
							className='w-full border '
							name='latitude'
						/>
						<ErrorMessage
							name='latitude'
							component='div'
						/>
						<Field
							className='w-full border '
							name='longitude'
						/>
						<ErrorMessage
							name='longitude'
							component='div'
						/>
						<Button type='submit'>FETCH</Button>
						<Button
							type='button'
							onClick={startTimelapse}>
							Start Timelapse
						</Button>
						<Button
							type='button'
							onClick={stopTimelapse}>
							Stop Timelapse
						</Button>
					</Form>
				)}
			</Formik>
		</>
	);
};
