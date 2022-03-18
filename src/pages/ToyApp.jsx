import { connect } from "react-redux";
import { useEffect } from "react";

import { loadToys } from "../store/actions/toy-actions";

import { ToyList } from "../cmps/ToyList.jsx";
import { ToyFilter } from "../cmps/ToyFilter.jsx";
import { NavLink } from "react-router-dom";

function _ToyApp({ loadToys, toys, filterBy }) {
  useEffect(async () => {
    await loadToys();
  }, [filterBy]);

  if (!toys) return <span>No toys to show</span>;
  return (
    <section className="toy-app">
      <ToyFilter />
      <ToyList toys={toys} />
      <NavLink className="btn" to="/edit">
        Add Toy
      </NavLink>
    </section>
  );
}

function mapStateToProps(state) {
  return {
    toys: state.toyModule.toys,
    filterBy: state.toyModule.filterBy,
    sortBy: state.toyModule.sortBy,
  };
}

const mapDispatchToProps = {
  loadToys,
};

export const ToyApp = connect(mapStateToProps, mapDispatchToProps)(_ToyApp);

// let toys = [
//   {
//     _id: "t101",
//     name: "Talking Doll",
//     price: 123,
//     labels: ["Doll", "Battery powered", "Baby"],
//     createdAt: 1631031801011,
//     inStock: true,
//   },
//   {
//     _id: "t102",
//     name: "Truck",
//     price: 100,
//     labels: ["On wheels", "Battery powered"],
//     createdAt: 1631031901011,
//     inStock: true,
//   },
//   {
//     _id: "t103",
//     name: "Drone",
//     price: 1000,
//     labels: ["Outdoor", "Battery powered"],
//     createdAt: 1631032801011,
//     inStock: false,
//   },
// ];

// storageService.save("toyDB", toys);
