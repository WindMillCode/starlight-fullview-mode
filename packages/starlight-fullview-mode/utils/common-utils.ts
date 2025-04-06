export const parseSvgPath = (svgString:string) => {
  if (!svgString) return null;
  // Extract path data using regex match
  const match = svgString.match(/ d="([^"]*)"/);
  return match ? match[1] : null;
};

export let documentQuerySelector = (selector:string) => {
  return document.querySelector(selector) as HTMLElement;
};

export let documentQuerySelectorAll = (selector:string) => {
  return Array.from(
    document.querySelectorAll(selector)
  ) as Array<HTMLElement>;
};
