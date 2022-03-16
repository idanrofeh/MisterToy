import { ToyPreview } from "./ToyPreview.jsx";

export function ToyList({ toys }) {
  if (!toys.length) return <span>No toys to show</span>;
  return (
    <section className="toy-list">
      {toys.map((toy) => (
        <ToyPreview toy={toy} key={toy._id} />
      ))}
    </section>
  );
}
