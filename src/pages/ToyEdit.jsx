import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

import { toyService } from "../services/toy-service";
import { utilService } from "../services/util.service";

const options = [
  { value: "Box game", label: "Box game" },
  { value: "Art", label: "Art" },
  { value: "Baby", label: "Baby" },
  { value: "Doll", label: "Doll" },
  { value: "Puzzle", label: "Puzzle" },
  { value: "Outdoor", label: "Outdoor" },
  { value: "Battery powered", label: "Battery powered" },
];

function _ToyEdit({ toys }) {
  const [toy, setToy] = useState(null);
  const { toyId } = useParams();
  let navigate = useNavigate();

  useEffect(async () => {
    let toyToSet;
    if (toyId) {
      toyToSet = toys.find((toy) => toy._id === toyId);
    } else toyToSet = utilService.getEmptyToy();
    setToy(toyToSet);
  }, []);

  const onRemoveToy = async (toyId) => {
    await toyService.removeToy(toyId);
    navigate("/");
  };

  const handleChange = ({ target }) => {
    const { name } = target;
    let { value } = target;
    if (name === "inStock") {
      if (value === "true") value = true;
      else if (value === "false") value = false;
    } else if (target.type === "number") value = +value;
    const toyToSet = { ...toy, [name]: value };
    setToy(toyToSet);
  };

  const handleLabelChange = (ev) => {
    const labels = ev.map((option) => option.value);
    setToy({ ...toy, labels });
  };

  if (!toy) return <span>No such toy</span>;
  const { name, price, labels, createdAt, inStock } = toy;
  return (
    <section className="toy-edit">
      <h3 className="detail name">{name}</h3>
      <div className="detail price">
        <span>Price</span>: {price}$
      </div>
      <div className="detail labels"></div>
      <div className="detail created-at">
        <span>Created at</span>: {utilService.getTimeAndDate(createdAt)}
      </div>
      <div className={"bold in-stock detail " + (inStock ? "green" : "red")}>
        {inStock ? "In Stock" : "Out of Stock"}
      </div>
    </section>
  );
}

function mapStateToProps(state) {
  return { toys: state.toyModule.toys };
}

export const ToyEdit = connect(mapStateToProps)(_ToyEdit);
