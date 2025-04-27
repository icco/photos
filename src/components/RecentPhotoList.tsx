import Image from "next/image";
import { useEffect, useState } from "react";

export function RecentPhotoList({
  reload,
}: Record<string, boolean>): React.JSX.Element {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/list")
      .then((res) => res.json())
      .then((data) => {
        if (data.code) {
          // Handle error response
          const errorMessage =
            data.message || "An error occurred while fetching photos";
          console.error("API Error:", data);
          setError(errorMessage);
          setLoading(false);
          return;
        }

        if (!data.photos || !Array.isArray(data.photos)) {
          console.error("Invalid response format:", data);
          setError("Received invalid response format from server");
          setLoading(false);
          return;
        }

        setData(data.photos);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch photos:", err);
        setError("Failed to load photos. Please try again later.");
        setLoading(false);
      });
  }, [reload]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 p-4">Error: {error}</div>;
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
