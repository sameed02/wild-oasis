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
  const { mutateDuplicateCabin /* isDuplicating */ } = useDuplicateCabin();
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
        <Modal>
          <Menus.Menu>
            <Menus.Toggle CabinId={cabinId}></Menus.Toggle>
            <Menus.List CabinId={cabinId}>
              <Menus.Button icon={<HiSquare2Stack />} onClick={handleDuplicate}>
                Duplicate
              </Menus.Button>

              <Modal.Open opens="updateCabin-form">
                <div>
                  <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
                </div>
              </Modal.Open>

              <Modal.Open opens="delete-modal">
                <div>
                  <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
                </div>
              </Modal.Open>
            </Menus.List>

            {/* updating cabins */}

            <Modal.Window name="updateCabin-form">
              <CreateCabinForm cabinToEdit={cabin} />
            </Modal.Window>

            {/* deleting cabins */}

            <Modal.Window name="delete-modal">
              <ConfirmDelete
                resourceName="cabins"
                disabled={isDeleting}
                onConfirm={() => deleteCabin(cabinId)}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default CabinRow;
