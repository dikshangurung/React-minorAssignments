import styled from "styled-components";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
// import Error from "../../"
import { useForm } from "react-hook-form";
import { createEditCabin } from "../../services/apiCabins";
import FormRow from "../../ui/FormRow";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";
const Label = styled.label`
	font-weight: 500;
`;
function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
	const { createCabin, isCreating } = useCreateCabin();
	const { editCabin, isEditing } = useEditCabin();
	const isWorking = isCreating || isEditing;
	const { id: editId, ...editValues } = cabinToEdit;
	const isEditSession = Boolean(editId);
	const { register, handleSubmit, reset, getValues, formState } = useForm({
		defaultValues: isEditSession ? editValues : {},
	});
	const { errors } = formState;

	function onSubmit(data) {
		const image =
			typeof data.image === "string" ? data.image : data.image[0];
		// console.log(data);
		if (isEditSession)
			editCabin(
				{ newCabinData: { ...data, image }, id: editId },
				{
					onSuccess: (data) => {
						reset();
						onCloseModal?.();
					},
				}
			);
		else
			createCabin(
				{ ...data, image: image },
				{
					onSuccess: (data) => {
						console.log(data);
						reset();
						onCloseModal?.();
					},
				}
			);
	}
	function onError(errors) {
		console.log(errors);
	}
	return (
		<Form
			onSubmit={handleSubmit(onSubmit, onError)}
			type={onCloseModal ? "modal" : "regular"}
		>
			<FormRow label="Cabin name" error={errors?.name?.message}>
				<Input
					type="text"
					id="name"
					disabled={isWorking}
					{...register("name", {
						required: "This field is required",
					})}
				/>
			</FormRow>

			<FormRow
				label="Maximum capacity"
				error={errors?.maxCapacity?.message}
			>
				<Input
					type="number"
					id="maxCapacity"
					disabled={isWorking}
					{...register("maxCapacity", {
						required: "This field is required",
						min: {
							value: 1,
							message: "Capacity should be at least 1",
						},
					})}
				/>
			</FormRow>

			<FormRow
				label="Regular Price"
				error={errors?.regularPrice?.message}
			>
				<Input
					type="number"
					id="regularPrice"
					disabled={isWorking}
					{...register("regularPrice", {
						required: "This field is required",
					})}
				/>
			</FormRow>

			<FormRow label="Discount" error={errors?.discount?.message}>
				<Input
					type="number"
					id="discount"
					disabled={isWorking}
					defaultValue={0}
					{...register("discount", {
						required: "This field is required",
						validate: (value) =>
							value <= getValues().regularPrice ||
							"Discount should be less than the regular price",
					})}
				/>
			</FormRow>

			<FormRow
				label="Description for website"
				error={errors?.description?.message}
			>
				<Textarea
					type="number"
					id="description"
					disabled={isWorking}
					defaultValue=""
					{...register("description", {
						required: "This field is required",
					})}
				/>
			</FormRow>

			<FormRow>
				<Label htmlFor="image">Cabin photo</Label>
				<FileInput
					id="image"
					accept="image/*"
					{...register("image", {
						required: isEditSession
							? false
							: "This field is required",
					})}
				/>
			</FormRow>

			<FormRow>
				{/* type is an HTML attribute! */}
				<Button
					variation="secondary"
					type="reset"
					onClick={() => onCloseModal?.()}
				>
					Cancel
				</Button>
				<Button variation="primary" size="medium">
					{isEditSession ? "Edit Cabin" : "Create New Cabin"}
				</Button>
			</FormRow>
		</Form>
	);
}

export default CreateCabinForm;
