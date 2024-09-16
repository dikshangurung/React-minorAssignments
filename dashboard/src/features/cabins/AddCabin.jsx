import { useState } from "react";
import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";
import CabinTable from "./CabinTable";

function AddCabin() {
	return (
		<Modal>
			<Modal.Open opens="cabin-form">
				<div>
					<Button>Add new Cabin</Button>
				</div>
			</Modal.Open>
			<Modal.Window name="cabin-form">
				<CreateCabinForm />
			</Modal.Window>
		</Modal>
	);
}

// function AddCabin() {
// 	const [isOpenModal, setIsOpenModal] = useState(false);
// 	return (
// 		<div>
// 			<Button
// 				onClick={() => setIsOpenModal((isOpenModal) => !isOpenModal)}
// 				variation="primary"
// 			>
// 				Add new Cabin
// 			</Button>
// 			{isOpenModal && (
// 				<Modal onClose={() => setIsOpenModal(false)}>
// 					<CreateCabinForm
// 						onCloseModal={() => setIsOpenModal(false)}
// 					/>
// 				</Modal>
// 			)}
// 		</div>
// 	);
// }

export default AddCabin;
