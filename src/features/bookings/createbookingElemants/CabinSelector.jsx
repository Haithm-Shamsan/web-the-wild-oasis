import Button from "../../../ui/Button";
import Modal from "../../../ui/Modal";
import SelectCabinPage from "./SelectCabinPage"



function CabinSelector({onSelectCabin,onCloseModal}) {
  return (
    <div>
      {/* Modal with trigger button */}
      <Modal>
      
        <Modal.Open opens="select-cabin-for-booking">
          <Button
          >Select Cabin</Button>
        </Modal.Open>

        {/* Modal Window for the booking form */}
        <Modal.Window name="select-cabin-for-booking">
          <SelectCabinPage onSelectCabin={onSelectCabin} onCloseModal={!onCloseModal} />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default CabinSelector;
