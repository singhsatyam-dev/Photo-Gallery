import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";

function PhotoCard({ photo }) {
  const [likes, setLikes] = useState(0);

  return (
    <article className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      <img
        src={photo.download_url}
        alt={`Photo by ${photo.author}`}
        loading="lazy"
        className="block h-auto w-full object-cover"
      />

      <div className="flex items-center justify-between gap-4 p-4">
        <p className="min-w-0 truncate font-medium text-slate-800">
          {photo.author}
        </p>

        <button
          type="button"
          onClick={() => setLikes((currentLikes) => currentLikes + 1)}
          aria-label={`Like photo by ${photo.author}. ${likes} likes`}
          className="inline-flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-slate-600 transition hover:bg-blue-50 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <FontAwesomeIcon icon={faThumbsUp} />
          <span>{likes}</span>
        </button>
      </div>
    </article>
  );
}

export default PhotoCard;
