import { type JSX, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { LibraryHallView } from "./LibraryHallView";
import { copy, type LibraryHall } from "./types";

async function getHallJson(signal?: AbortSignal): Promise<LibraryHall> {
  const response = await fetch("./shelves.json", {
    cache: "no-store",
    signal,
  });
  if (response.status === 422) {
    const error = await response.json();
    throw new Error(error.error);
  }
  if (!response.ok) throw new Error(`./shelves.json (${response.status})`);
  return response.json();
}

function HallApp({ initial }: { initial?: LibraryHall }): JSX.Element {
  const [hall, setHall] = useState<LibraryHall | undefined>(initial);
  const [failed, setFailed] = useState("");

  useEffect(() => {
    const request = new AbortController();
    getHallJson(request.signal)
      .then((fresh) => {
        setHall(fresh);
        document.documentElement.lang = fresh.locale;
        document.title = fresh.title;
      })
      .catch((error: Error) => {
        if (!request.signal.aborted && !initial) setFailed(error.message);
      });
    return () => request.abort();
  }, [initial]);

  if (hall) {
    return <LibraryHallView hall={hall} text={copy[hall.locale]} />;
  }
  if (failed) {
    return (
      <main className="status-screen" role="alert">
        {failed}
      </main>
    );
  }
  const locale = document.documentElement.lang === "ja" ? "ja" : "en";
  return (
    <main className="status-screen" aria-busy="true">
      {copy[locale].loading}
    </main>
  );
}

const element = document.getElementById("root");
if (element) {
  const raw = document.getElementById("grimoire-hall")?.textContent;
  const initial = raw ? (JSON.parse(raw) as LibraryHall) : undefined;
  if (initial) {
    document.documentElement.lang = initial.locale;
    document.title = initial.title;
    // Keep the static DOM untouched unless a filtered or updated shelves.json arrives.
    const baseline = JSON.stringify(initial);
    void getHallJson()
      .then((fresh) => {
        if (JSON.stringify(fresh) === baseline) return;
        document.documentElement.lang = fresh.locale;
        document.title = fresh.title;
        createRoot(element).render(
          <LibraryHallView hall={fresh} text={copy[fresh.locale]} />
        );
      })
      .catch(() => {});
  } else {
    createRoot(element).render(<HallApp />);
  }

  if (document.querySelector('meta[name="grimoire-preview"]')) {
    const events = new EventSource("./__grimoire_events");
    events.addEventListener("update", () => location.reload());
  }
}
