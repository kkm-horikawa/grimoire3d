export const coverOptions = {
  red: {
    base: "red",
    filter: "brightness(1)",
    edge: "#6d2022",
    mobile: "none",
    hue: "0deg",
    dye: "",
    light: ".22,.064,.060",
  },
  green: {
    base: "green",
    filter: "brightness(1)",
    edge: "#424624",
    mobile: "hue-rotate(66deg) saturate(.62)",
    hue: "72deg",
    dye: ".57,.83,.25",
    light: ".105,.128,.049",
  },
  blue: {
    base: "blue",
    filter: "brightness(1)",
    edge: "#34314c",
    mobile: "hue-rotate(248deg) saturate(.62)",
    hue: "235deg",
    dye: ".37,.51,.85",
    light: ".08,.102,.164",
  },
  plum: {
    base: "red",
    filter: "hue-rotate(-47deg) saturate(.79)",
    edge: "#572c50",
    mobile: "hue-rotate(-47deg) saturate(.79)",
    hue: "313deg",
    dye: ".71,.31,.67",
    light: ".15,.069,.14",
  },
  amber: {
    base: "red",
    filter: "hue-rotate(34deg) saturate(.85) brightness(1.28)",
    edge: "#8a551e",
    mobile: "hue-rotate(34deg) brightness(1.28)",
    hue: "34deg",
    dye: "1.24,.68,.20",
    light: ".27,.17,.055",
  },
  teal: {
    base: "green",
    filter: "hue-rotate(63deg) saturate(.86) brightness(1.18)",
    edge: "#245452",
    mobile: "hue-rotate(152deg) saturate(.65)",
    hue: "150deg",
    dye: ".26,.81,.75",
    light: ".06,.16,.15",
  },
  black: {
    base: "blue",
    filter: "grayscale(1) brightness(.82)",
    edge: "#252321",
    mobile: "grayscale(1) brightness(.68)",
    hue: "0deg",
    dye: ".38,.37,.36",
    light: ".072,.07,.068",
  },
  ivory: {
    base: "red",
    filter: "grayscale(1) invert(.86) sepia(.33) brightness(1.05)",
    edge: "#d9c5a3",
    mobile: "grayscale(1) invert(.86) sepia(.33)",
    hue: "32deg",
    dye: "3.2,2.7,2.02",
    light: ".38,.315,.22",
    lettering: "#392518",
  },
  walnut: {
    base: "red",
    filter: "hue-rotate(22deg) saturate(.58) brightness(.78)",
    edge: "#50301c",
    mobile: "hue-rotate(22deg) saturate(.58) brightness(.78)",
    hue: "23deg",
    dye: ".70,.43,.25",
    light: ".15,.09,.048",
  },
  slate: {
    base: "blue",
    filter: "grayscale(.66) brightness(1.42)",
    edge: "#5e6570",
    mobile: "hue-rotate(213deg) saturate(.24) brightness(1.23)",
    hue: "220deg",
    dye: ".75,.82,.91",
    light: ".17,.19,.21",
  },
};

const fallbackCovers = ["red", "blue", "green"];

/** @param {string} id @param {string} [requested] */
export function selectCover(id, requested) {
  if (requested && Object.hasOwn(coverOptions, requested)) return requested;
  let hash = 2166136261;
  for (const character of id.replace(/^\d+[-_]+/, "")) {
    hash = Math.imul(hash ^ (character.codePointAt(0) ?? 0), 16777619);
  }
  return fallbackCovers[(hash >>> 10) % fallbackCovers.length];
}
