import styled from "styled-components";
import { formatCurrency } from "../../../utils/helpers";
import Modal from "../../../ui/Modal";
import Table from "../../../ui/Table";
import Menus from "../../../ui/Menus";
import Button from "../../../ui/Button";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function SelectCabinForBooking({ cabin, onSelectCabin }) {
  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
    description,
  } = cabin;

  const handleSelect = () => {
    // Call the callback and pass the cabinId
    onSelectCabin(cabinId);
  };

  return (
    <Table.Row>
      <Img src={image} />
      <Cabin>{name}</Cabin>
      <div>Fits up to {maxCapacity} guests</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      {discount ? (
        <Discount>{formatCurrency(discount)}</Discount>
      ) : (
        <span>&mdash;</span>
      )}
      <div>
        <Modal>
          <Menus.Menu>
            <Button onClick={handleSelect}>Select Cabin</Button>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default SelectCabinForBooking;
