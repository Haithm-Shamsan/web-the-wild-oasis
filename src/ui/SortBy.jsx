import { useSearchParams } from "react-router-dom";
import Select from "./Select";

function SortBy({ options, sortFor }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get(sortFor) || "";

  function handleChange(e) {
    const newSortValue = e.target.value;

    // Log the previous state
    console.log("Previous Sort Parameter:", sortBy);

    // Clear the previous sort parameter
    if (sortBy) {
      searchParams.delete(sortFor);
    }

    // Set the new sort value
    searchParams.set(sortFor, newSortValue);

    // Log the updated search params
    console.log("Updated Search Params Before Set:", searchParams.toString());

    // Update the URL with the new sort parameter
    setSearchParams(searchParams);

    // Log the new URL
    console.log("Updated URL:", window.location.href);
  }

  return (
    <Select
      options={options}
      type="white"
      value={sortBy}
      onChange={handleChange}
    />
  );
}

export default SortBy;
