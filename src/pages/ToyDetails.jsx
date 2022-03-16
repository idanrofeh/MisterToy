import { useState, useEffect } from "react";
import { useParams } from "react-router";

import { toyService } from "../services/toy-service";
import { utilService } from "../services/util.service";

export function ToyDetails() {
  const [toy, setToy] = useState(null);
  const { toyId } = useParams();

  useEffect(async () => {
    const toyToSet = await toyService.getById(toyId);
    setToy(toyToSet);
  }, []);

  if (!toy) return <span>No such toy</span>;

  const { name, price, labels, createdAt, inStock } = toy;
  return (
    <section className="toy-details">
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
