import { useEffect, useState } from "react";
import Image from "next/image";

export function RecentPhotoList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/list")
      .then((res) => res.json())
      .then((data) => {
        setData(data.photos);
        setLoading(false);
      });
  }, []);

  if (!data.length && loading) {
    return <div>Loading...</div>;
  }

  if (!data.length) {
    return <div>No photos found.</div>;
  }

  return (
    <ul>
      {data.map((photo) => (
        <li key={photo}><a href={photo}><Image src={photo} width={50} height={50} alt="An uploaded photo"></Image></a></li>
      ))}
    </ul>
  );
}