function createElement(tagName, className) {
    const $tag = document.createElement(tagName);
  
    if (className) {
      $tag.classList.add(className);
    }
    return $tag;
  }

  export default createElement;