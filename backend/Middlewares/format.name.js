export function formatCategory(category) {
  const regex = /[^a-zA-Z ]/g;
  const removeUnnecessaryCharacters = category.replaceAll(regex, "").trim();
  const words = removeUnnecessaryCharacters.split(/\s+/);

  const fixingWords = words.map((element) => {
    return element.charAt(0).toUpperCase() + element.slice(1).toLowerCase();
  });

  const correctCategory = fixingWords.join(" ");
  return correctCategory;
}

export function formatAnimalName(name) {
  const regex = /[^a-zA-Z]/g;
  const correctName = name.replaceAll(regex, "").trim();
  const correctFormatofName = correctName.toUpperCase();
  return correctFormatofName;
}
