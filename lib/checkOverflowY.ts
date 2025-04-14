export default function checkOverflowY(
  singleCountry: NodeListOf<HTMLElement>,
  countriesContainer: HTMLElement
) {
  let totalHeight = 0;

  singleCountry.forEach(el => {
    totalHeight += el.offsetHeight;
  });

  if (totalHeight > countriesContainer?.offsetHeight) {
    return true;
  } else {
    return false;
  }
}
