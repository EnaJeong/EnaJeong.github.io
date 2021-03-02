(function() {
  let highlighters = document.querySelectorAll("div.highlighter-rouge");
  for (let i=0, n=highlighters.length; i < n; i++){
    let lang = highlighters[i].className.match(/(?<=language-)\w+/)[0]
    highlighters[i].setAttribute("data-lang", lang)
  }
})();
