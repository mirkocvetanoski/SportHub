export default function checkOverflowY(
  singleCountry: NodeListOf<HTMLElement>,
  countriesContainer: HTMLElement
): boolean {
  const totalHeight = Array.from(singleCountry).reduce(
    (acc, el) => acc + el.offsetHeight,
    0
  );

  return totalHeight > countriesContainer.offsetHeight;
}
