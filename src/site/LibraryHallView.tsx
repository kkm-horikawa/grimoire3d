import { BookOpen } from "lucide-react";
import type { JSX } from "react";
import { LibraryFooter } from "../../cli/library-footer.js";
import { coverFor, hallAlcoveArt } from "./covers";
import type { Copy, HallBookPreview, LibraryHall } from "./types";
import "./library-hall.css";

interface LibraryHallViewProps {
  hall: LibraryHall;
  text: Copy;
}

function ShelfPreviewBook({
  book,
  index,
  count,
}: {
  book: HallBookPreview;
  index: number;
  count: number;
}): JSX.Element {
  const finish = coverFor(book.id, book.cover);
  const stack = count > 1;
  return (
    <span
      className={`hall-book ${stack ? "hall-book--stack" : "hall-book--solo"}`}
      data-cover={finish.binding}
      data-base={finish.base}
      data-index={index}
      style={finish.style}
      aria-hidden="true"
    >
      <span className="hall-book-spine">
        <img
          src={finish.spineSrc}
          width={120}
          height={452}
          alt=""
          loading="lazy"
          decoding="async"
        />
      </span>
      <span className="hall-book-face">
        <picture>
          <source media="(max-width: 699px)" srcSet={finish.compact} />
          <img
            src={finish.src}
            width={600}
            height={760}
            alt=""
            loading="lazy"
            decoding="async"
          />
        </picture>
      </span>
    </span>
  );
}

export function LibraryHallView({
  hall,
  text,
}: LibraryHallViewProps): JSX.Element {
  return (
    <main className="library library-hall">
      <header className="library-brand brand">
        <BookOpen aria-hidden="true" />
        <span>Grimoire3D</span>
      </header>
      <div className="library-heading hall-heading">
        <h1>{hall.title}</h1>
        {hall.description && (
          <p className="hall-subtitle">{hall.description}</p>
        )}
      </div>
      {hall.shelves.length ? (
        <div className="hall-grid">
          {hall.shelves.map((shelf) => {
            const previews = shelf.books.slice(0, 3);
            return (
              <a
                key={shelf.id}
                className="hall-shelf"
                href={shelf.href}
                data-shelf={shelf.id}
              >
                <div className="hall-alcove">
                  <picture className="hall-alcove-frame">
                    <source
                      media="(max-width: 480px)"
                      srcSet={hallAlcoveArt.mobileSm}
                      width={440}
                      height={239}
                    />
                    <source
                      media="(max-width: 699px)"
                      srcSet={hallAlcoveArt.mobile}
                      width={760}
                      height={413}
                    />
                    <img
                      className="hall-alcove-art"
                      src={hallAlcoveArt.desktop}
                      width={640}
                      height={717}
                      alt=""
                      fetchPriority="high"
                      decoding="async"
                    />
                  </picture>
                  <div className="hall-plaque-slot">
                    <h2 className="hall-plaque">{shelf.title}</h2>
                  </div>
                  <div className="hall-books" data-count={previews.length}>
                    {previews.map((book, index) => (
                      <ShelfPreviewBook
                        key={`${shelf.id}-${book.id}`}
                        book={book}
                        index={index}
                        count={previews.length}
                      />
                    ))}
                  </div>
                </div>
                {shelf.description && (
                  <p className="hall-description">{shelf.description}</p>
                )}
              </a>
            );
          })}
        </div>
      ) : (
        <p className="hall-empty">{text.hallEmpty}</p>
      )}
      <LibraryFooter publisher={hall.footer} />
    </main>
  );
}
