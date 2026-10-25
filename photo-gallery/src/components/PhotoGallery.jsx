import { useState, useEffect, useRef } from "react";
import PhotoCard from "./PhotoCard";
import usePhotoFeed from "../Hooks/usePhotoFeed";

function PhotoGallery() {
  const { photos, loading, hasMore, error, fetchPhotos } = usePhotoFeed();

  const observerTarget = useRef(null);

  // fetching the first page when the gallery mounts.
  useEffect(() => {
    fetchPhotos();
  }, [fetchPhotos]);

  // fetch more photos when the sentinel enters the viewport.
  useEffect(() => {
    const target = observerTarget.current;

    if (!target || !hasMore) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          fetchPhotos();
        }
      },
      {
        rootMargin: "300px",
        threshold: 0,
      },
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, [fetchPhotos, hasMore]);

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Photo Gallery
        </h1>
        <p className="mt-2 text-slate-600">
          Explore photos from the Lorem Picsum collection.
        </p>
      </header>

      {/* rendering pics */}
      <section aria-label="Photo gallery" className="space-y-6">
        {photos.map((photo) => (
          <PhotoCard key={photo.id} photo={photo} />
        ))}
      </section>

      <div ref={observerTarget} className="h-4 w-full" aria-hidden="true" />

      {loading && (
        <p className="py-6 text-center text-slate-600" role="status">
          Loading photos...
        </p>
      )}

      {error && (
        <div className="my-6 rounded-lg border border-red-200 bg-red-50 p-4 text-center">
          <p className="text-red-700">{error}</p>
          <button
            type="button"
            onClick={fetchPhotos}
            disabled={loading}
            className="mt-3 rounded-lg bg-red-600 px-4 py-2 font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Try again
          </button>
        </div>
      )}

      {!loading && !hasMore && photos.length > 0 && (
        <p className="py-6 text-center text-sm text-slate-500">
          You&apos;ve reached the end of the gallery.
        </p>
      )}

      {!loading && !hasMore && photos.length === 0 && !error && (
        <p className="py-6 text-center text-slate-500">
          No photos are available.
        </p>
      )}
    </main>
  );
}

export default PhotoGallery;
