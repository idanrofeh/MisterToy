import { useState } from "react";
import { connect } from "react-redux";
import Select from "react-select";

import { onSetFilter } from "../store/actions/toy-actions";

const options = [
  { value: "On wheels", label: "On wheels" },
  { value: "Box game", label: "Box game" },
  { value: "Art", label: "Art" },
  { value: "Baby", label: "Baby" },
  { value: "Doll", label: "Doll" },
  { value: "Puzzle", label: "Puzzle" },
  { value: "Outdoor", label: "Outdoor" },
];

function _ToyFilter({ storeFilterBy, onSetFilter }) {
  const [filterBy, setFilterBy] = useState({ ...storeFilterBy });

  const handleChange = ({ target }) => {
    const { name } = target;
    let { value } = target;
    if (value === "true") value = true;
    else if (value === "false") value = false;
    const newFilterBy = { ...filterBy, [name]: value };
    console.log(newFilterBy);
    setFilterBy(newFilterBy);
  };

  const handleLabelChange = (ev) => {
    const labels = ev.map((option) => option.value);
    setFilterBy({ ...filterBy, labels });
  };

  if (!filterBy) return <span>Loading..</span>;
  return (
    <section className="toy-filter">
      <h3>Filter Toys</h3>
      <div className="filter">
        <input
          className="search-bar"
          type="text"
          name="name"
          placeholder="🔎Search toys.."
          value={filterBy.name}
          onChange={handleChange}
        />
        <label>
          Stock:
          <select
            name="inStock"
            onChange={handleChange}
            value={filterBy.inStock}
          >
            <option value="all">All</option>
            <option value={false}>Out of stock</option>
            <option value={true}>In stock</option>
          </select>
        </label>
        <br></br>
        <label>
          <span>Labels:</span>
          <Select
            className="select"
            name="labels"
            isMulti
            options={options}
            onChange={handleLabelChange}
          />
        </label>
        <a
          className="filter-btn hover"
          onClick={() => onSetFilter({ ...filterBy })}
        >
          Filter!
        </a>
      </div>
    </section>
  );
}

function mapStateToProps(state) {
  return {
    storeFilterBy: state.toyModule.filterBy,
  };
}

const mapDispatchToProps = {
  onSetFilter,
};

export const ToyFilter = connect(
  mapStateToProps,
  mapDispatchToProps
)(_ToyFilter);
