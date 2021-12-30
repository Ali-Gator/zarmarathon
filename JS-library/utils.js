const getRandomIntInclusive = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const createElement = (tag, className) => {
  const $tag = document.createElement(tag);
  if (className) {
    if (Array.isArray(className)) {
      className.forEach((item) => {
        $tag.classList.add(item);
      });
    } else {
      $tag.classList.add(className);
    }
  }

  return $tag;
};

export { getRandomIntInclusive, createElement };
