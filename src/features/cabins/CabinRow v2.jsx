import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers.js";
import { useDeleteCabin } from "./useDeleteCabin.js";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { useDuplicateCabin } from "./useDuplicateCabin.js";
import Modal from "../../ui/Modal.jsx";
import CreateCabinForm from "./CreateCabinForm.jsx";
import ConfirmDelete from "../../ui/ConfirmDelete.jsx";
import Table from "../../ui/Table.jsx";
import Menus from "../../ui/Menus.jsx";

/* const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`; */

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

function CabinRow({ cabin }) {
  const { deleteCabin, isDeleting } = useDeleteCabin();
  const { mutateDuplicateCabin, isDuplicating } = useDuplicateCabin();
  const {
    image,
    regularPrice,
    discount,
    maxCapacity,
    name,
    id: cabinId,
    description,
  } = cabin;

  function handleDuplicate() {
    mutateDuplicateCabin({
      name: `copy of ${name}`,
      image,
      regularPrice,
      discount,
      maxCapacity,
      id: Date.now(),
      description,
    });
  }

  return (
    <Table.Row>
      <Img src={image} alt={`Cabin ${name}`} />
      <Cabin>{name}</Cabin>
      <div>Fits up to {maxCapacity} guests</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      {discount ? (
        <Discount>{formatCurrency(discount)}</Discount>
      ) : (
        <span>&mdash;</span>
      )}

      {/* table buttons */}
      <div>
        {/* duplicating cabins */}
        <button onClick={handleDuplicate} disabled={isDuplicating}>
          <HiSquare2Stack />
        </button>

        <Modal>
          {/* updating cabins */}
          <Modal.Open opens="updateCabin-form">
            <button>
              <HiPencil />
            </button>
          </Modal.Open>
          <Modal.Window name="updateCabin-form">
            <CreateCabinForm cabinToEdit={cabin} />
          </Modal.Window>

          {/* deleting cabins */}
          <Modal.Open opens="delete-modal">
            <button>
              <HiTrash />
            </button>
          </Modal.Open>
          <Modal.Window name="delete-modal">
            <ConfirmDelete
              resourceName="cabins"
              disabled={isDeleting}
              onConfirm={() => deleteCabin(cabinId)}
            />
          </Modal.Window>
        </Modal>

        <Menus.Menu>
          <Menus.Toggle CabinId={cabinId}></Menus.Toggle>
          <Menus.List CabinId={cabinId}>
            <Menus.Button
              icon={<HiSquare2Stack />}
              onClick={handleDuplicate}
              disabled={isDuplicating}
            >
              Duplicate
            </Menus.Button>

            <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>

            <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
          </Menus.List>
        </Menus.Menu>
      </div>
    </Table.Row>
  );
}

export default CabinRow;
