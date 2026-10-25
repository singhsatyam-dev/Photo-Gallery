import { useState, useCallback, useRef } from "react";

const API_URL = "https://picsum.photos/v2/list";

function usePhotoFeed() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState("");

  const pageRef = useRef(1);
  const loadingRef = useRef(false);
  const hasMoreRef = useRef(true);
  const photoIdsRef = useRef(new Set());

  //fetching image data from picsum url
  const fetchPhotos = useCallback(async () => {
    if (loadingRef.current || !hasMoreRef.current) return;

    loadingRef.current = true;
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${API_URL}?page=${pageRef.current}&limit=10`,
      );

      if (!response.ok) {
        throw new Error("Failed to fetch photos");
      }

      const data = await response.json();

      if (data.length === 0) {
        hasMoreRef.current = false;
        setHasMore(false);
        return;
      }

      const newPhotos = data.filter((photo) => {
        if (photoIdsRef.current.has(photo.id)) {
          return false;
        }

        photoIdsRef.current.add(photo.id);
        return true;
      });

      if (newPhotos.length > 0) {
        setPhotos((previousPhotos) => [...previousPhotos, ...newPhotos]);
      }

      pageRef.current += 1;
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  }, []);

  return {
    photos,
    loading,
    hasMore,
    error,
    fetchPhotos,
  };
}

export default usePhotoFeed;
