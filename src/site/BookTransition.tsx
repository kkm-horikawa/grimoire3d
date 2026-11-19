import { type JSX, useLayoutEffect, useRef } from "react";
import { BookCover } from "../../cli/book-cover.js";
import { coverPerspective, spreadReveal } from "./bookHinge";
import { coverFor } from "./covers";

export interface CoverOrigin {
  id: string;
  title: string;
  cover?: string;
  artwork?: string;
  src: string;
  rect: DOMRect;
}

export const motionQuery = "(prefers-reduced-motion: reduce)";

interface BookTransitionProps {
  origin: CoverOrigin;
  paper: HTMLElement | null;
  direction: "open" | "close";
  onStage: (stage: "travel" | "hinge") => void;
  onDone: () => void;
}

const liftDuration = 410;
const hingeDuration = 420;
const initialTransform = (rect: DOMRect): string =>
  `translate3d(${rect.left}px, ${rect.top}px, 0)`;

function titleScale(x: number, y: number): string {
  const scale = Math.min(x, y);
  return `scale(${scale / x}, ${scale / y})`;
}

export function BookTransition({
  origin,
  paper,
  direction,
  onStage,
  onDone,
}: BookTransitionProps): JSX.Element {
  const rig = useRef<HTMLDivElement>(null);
  const cover = useRef<HTMLDivElement>(null);
  const inside = useRef<HTMLDivElement>(null);
  const title = useRef<HTMLSpanElement>(null);
  const { rect } = origin;
  const { binding, opaqueBounds, style } = coverFor(origin.id, origin.cover);
  const [x, y, width, height] = opaqueBounds;
  const coverLeft = (x / 600) * rect.width;
  const coverTop = (y / 760) * rect.height;
  const coverWidth = (width / 600) * rect.width;
  const coverHeight = (height / 760) * rect.height;

  useLayoutEffect(() => {
    const moving = rig.current;
    const lid = cover.current;
    const endpaper = inside.current;
    const lettering = title.current;
    const stage = paper?.parentElement;
    if (!paper || !stage || !moving || !lid || !endpaper || !lettering) return;
    const reduce = matchMedia(motionQuery);
    const target = paper.getBoundingClientRect();
    if (reduce.matches || !moving.animate || !rect.width || !target.width) {
      onDone();
      return;
    }

    const spread = stage.dataset.wide === "true";
    const leafWidth = spread ? target.width / 2 : target.width;
    const spine = spread ? target.left + leafWidth : target.left;
    const scaleX = leafWidth / coverWidth;
    const scaleY = target.height / coverHeight;
    const seated = `translate3d(${spine - coverLeft * scaleX}px, ${target.top - coverTop * scaleY}px, 0) scale(${scaleX}, ${scaleY})`;
    const closing = direction === "close";
    const animations: Animation[] = [];

    const travel = (): void => {
      onStage("travel");
      const positions = [initialTransform(rect), seated];
      const timing: KeyframeAnimationOptions = {
        duration: liftDuration,
        easing: closing
          ? "cubic-bezier(.42,0,.72,.97)"
          : "cubic-bezier(.24,.76,.28,1)",
        fill: "forwards",
      };
      const motion = moving.animate(
        (closing ? positions.reverse() : positions).map((transform) => ({
          transform,
        })),
        timing
      );

      // The cover fits the page on both axes; its lettering keeps a uniform scale.
      const letteringFrames = Array.from({ length: 13 }, (_, index) => {
        const progress = index / 12;
        return {
          transform: titleScale(
            1 + (scaleX - 1) * progress,
            1 + (scaleY - 1) * progress
          ),
        };
      });
      animations.push(
        motion,
        lettering.animate(
          closing ? letteringFrames.reverse() : letteringFrames,
          timing
        )
      );
      motion.onfinish = closing ? onDone : hinge;
    };

    const hinge = (): void => {
      onStage("hinge");
      const openAngle = spread ? 179 : 152;
      const timing: KeyframeAnimationOptions = {
        duration: hingeDuration,
        direction: closing ? "reverse" : "normal",
        easing: "ease-in-out",
        fill: "both",
      };
      const motion = lid.animate(
        [
          { transform: "rotateY(0deg)" },
          { transform: `rotateY(-${openAngle}deg)` },
        ],
        timing
      );
      const reveal = stage.animate(
        spreadReveal(
          stage.getBoundingClientRect(),
          spine,
          leafWidth,
          coverWidth,
          openAngle
        ),
        timing
      );
      const blend = endpaper.animate(
        [{ opacity: 1 }, { opacity: 1, offset: 0.975 }, { opacity: 0 }],
        timing
      );
      animations.push(motion, reveal, blend);
      const controls = stage.parentElement?.querySelectorAll(
        ".reader-header, .reader-pagination"
      );
      for (const control of controls ?? []) {
        animations.push(
          control.animate(
            [{ opacity: 0 }, { opacity: 0, offset: 0.7 }, { opacity: 1 }],
            timing
          )
        );
      }
      motion.onfinish = closing ? travel : onDone;
    };

    if (closing) {
      moving.style.transform = seated;
      lettering.style.transform = titleScale(scaleX, scaleY);
      hinge();
    } else {
      travel();
    }

    window.addEventListener("resize", onDone);
    reduce.addEventListener("change", onDone);
    return () => {
      for (const animation of animations) animation.cancel();
      window.removeEventListener("resize", onDone);
      reduce.removeEventListener("change", onDone);
    };
  }, [
    coverHeight,
    coverLeft,
    coverTop,
    coverWidth,
    direction,
    onDone,
    onStage,
    paper,
    rect,
  ]);

  return (
    <div
      className="book-transition"
      data-direction={direction}
      data-binding={binding}
      style={style}
      aria-hidden="true"
    >
      <div
        className="book-transition-rig"
        ref={rig}
        style={{
          width: rect.width,
          height: rect.height,
          transform: initialTransform(rect),
          perspective: coverPerspective,
          perspectiveOrigin: `${coverLeft}px center`,
        }}
      >
        <div
          className="book-transition-lid"
          ref={cover}
          style={{
            left: coverLeft,
            top: coverTop,
            width: coverWidth,
            height: coverHeight,
          }}
        >
          <div className="book-transition-front">
            <div
              className="book-transition-art"
              style={{
                left: -coverLeft,
                top: -coverTop,
                width: rect.width,
                height: rect.height,
              }}
            >
              <BookCover
                title={origin.title}
                src={origin.src}
                artwork={origin.artwork}
                titleRef={title}
              />
            </div>
          </div>
          <div className="book-transition-inside" ref={inside} />
        </div>
      </div>
    </div>
  );
}
