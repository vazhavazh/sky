"use client"

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
	// handleChange,
}: ObservationFormProps) => {
	return (
		<>
			<Formik
				initialValues={formValues}
				validationSchema={validationSchema}
				onSubmit={submitHandlerAction}>
				{({ setFieldValue }) => (
					<Form className='flex flex-col gap-2'>
						<label htmlFor='date'>
							<Field
								className='w-full border hidden'
								name='date'
								type='date'
							/>
							<DatePickerComponent
								setFieldValueAction={setFieldValue}
								date={formValues.date}
							/>

							<ErrorMessage
								name='date'
								component='div'
							/>
						</label>
						{/* <label htmlFor='time'>
							<Field
								className='w-full border hidden'
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
						</label> */}
						 {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div>
        <TimePicker
          label="Select time"
          value={selectedTime}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
        />
        <div>
          {selectedTime ? `Selected Time: ${selectedTime.toLocaleTimeString()}` : "No time selected"}
        </div>
      </div>
    </LocalizationProvider> */}
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
							onClick={startTimelapseAction}>
							Start Timelapse
						</Button>
						<Button
							type='button'
							onClick={stopTimelapseAction}>
							Stop Timelapse
						</Button>
					</Form>
				)}
			</Formik>
		</>
	);
};
