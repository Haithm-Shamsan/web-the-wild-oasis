import { useForm } from "react-hook-form";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";
import { useCreateBooking } from "./useCreateBooking"; // Hook for creating bookings
import { useEditBooking } from "./useEditBooking"; // Hook for editing bookings
import { useState } from "react";
import CabinSelector from "./createbookingElemants/CabinSelector";


function CreateBookingForm({ bookingToEdit = {}, onCloseModal }) {
  const { isCreating, createBooking } = useCreateBooking();
  const { isEditing, editBooking } = useEditBooking();
  const isWorking = isCreating || isEditing;
 
  const { id: editId, ...editValues } = bookingToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  
  const [formData, setFormData] = useState({
    cabinId: null,
    personId: null,
    ...editValues, // If it's an edit, initialize with current booking data
  });

  // Function to handle cabin selection
  function handleCabinSelect(cabinId) {
    setFormData((prev) => ({ ...prev, cabinId }));

  }

  function onSubmit(data) {
    const bookingData = {
      ...data,
      cabinId: formData.cabinId,
      personId: formData.personId,
    };

    if (isEditSession) {
      editBooking(
        { newBookingData: bookingData, id: editId },
        {
          onSuccess: (data) => {
            reset();
            onCloseModal?.();
          },
        }
      );
    } else {
      createBooking(
        { newBookingData: bookingData },
        {
          onSuccess: (data) => {
            reset();
            onCloseModal?.();
          },
        }
      );
    }
  }

  function onError(errors) {
    console.error(errors);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)} type={onCloseModal ? "modal" : "regular"}>
      <FormRow label="Start Date" error={errors?.startDate?.message}>
        <Input
          type="date"
          id="startDate"
          disabled={isWorking}
          {...register("startDate", { required: "Start date is required" })}
        />
      </FormRow>

      <CabinSelector/>


      <FormRow>
        <Button type="reset" variation="secondary" >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Edit Booking" : "Create new Booking"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateBookingForm;
