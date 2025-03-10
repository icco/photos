import Image from "next/image";
import { useEffect, useState } from "react";

export function RecentPhotoList({
  reload,
}: Record<string, boolean>): React.JSX.Element {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/list")
      .then((res) => res.json())
      .then((data) => {
        setData(data.photos);
        setLoading(false);
      });
  }, [reload]);

  if (!data.length && loading) {
    return <div>Loading...</div>;
  }

  if (!data.length) {
    return <div>No photos found.</div>;
  }

  const w = 200;
  const h = 150;

  return (
    <div className="columns-2 gap-2">
      {data.map((photo) => (
        <a href={photo} key={photo}>
          <Image
            src={`${photo}?w=${w}&h=${h}`}
            width={w}
            height={h}
            alt="An uploaded photo"
            className="w-full my-2"
            unoptimized
          ></Image>
        </a>
      ))}
    </div>
  );
}
