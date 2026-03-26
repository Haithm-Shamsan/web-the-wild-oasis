import React, { useState, useRef } from "react";
import Spinner from "../../../ui/Spinner";
import CabinRowForSelecting from "./CabinRowForSelecting";
import { useCabins } from "../../cabins/useCabins";
import Table from "../../../ui/Table";
import Menus from "../../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../../ui/Empty";
import CabinTableOperations from "../../cabins/CabinTableOperations";
import { useOutsideClick } from "../../../hooks/useOutsideClick";

function CabinTable({ onCloseModal, onSelectCabin }) {
  const { isLoading, cabins } = useCabins();
  const [searchParams, setSearchParams] = useSearchParams();
  const ref = useRef(); // Create a ref for outside click handling

  // Use outside click hook to clear params and close modal
  useOutsideClick(ref, () => {
    clearCabinSearchParams();
    onCloseModal(); // Close the modal when clicked outside
  });

  // Function to clear cabin-related search params and close modal
  function clearCabinSearchParams() {
    const newParams = new URLSearchParams(searchParams); // Clone current search params
    newParams.delete("cabins-discount");
    newParams.delete("cabins-sortBy");
    setSearchParams(newParams); // Update the URL params
  }

  if (isLoading) return <Spinner />;
  if (!cabins.length) return <Empty resourceName="cabins" />;

  // FILTER cabins by discount
  const filterValue = searchParams.get("cabins-discount") || "all";

  let filteredCabins;
  if (filterValue === "all") filteredCabins = cabins;
  if (filterValue === "no-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  if (filterValue === "with-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);

  // SORT cabins by selected field
  const sortBy = searchParams.get("cabins-sortBy") || "startDate-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedCabins = filteredCabins.sort(
    (a, b) => (a[field] - b[field]) * modifier
  );

  // Handle cabin selection and pass it to parent
  const handleCabinSelect = (cabinId) => {
    onSelectCabin(cabinId); // Pass selected cabin ID to the parent controller
    clearCabinSearchParams(); // Clear the search params
    onCloseModal(); // Close the cabin modal only, not the booking modal
  };

  return (
    <Menus ref={ref}>
      <div style={{ margin: "25px" }}>
        <CabinTableOperations />
      </div>

      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={sortedCabins}
          render={(cabin) => (
            <CabinRowForSelecting
              cabin={cabin}
              key={cabin.id} // Use cabin ID as the key for better performance
              onSelectCabin={handleCabinSelect} // Callback for selecting cabin
            />
          )}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
