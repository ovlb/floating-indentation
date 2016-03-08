(function () {
  var article = document.querySelector('.o-article__main');
  var paragraphs = article.querySelectorAll('p');

  var addFadenZaehler = function(fElement) {
    var fadenZaehler = document.createElement('span');
    fadenZaehler.classList.add('js-count');
    fElement.appendChild(fadenZaehler);
  }

  var getNextParagraph = function(fCurrentParagraph) {
    var nextParagraph = fCurrentParagraph.nextElementSibling;
    if (nextParagraph) {
      if (nextParagraph.nodeName === 'P') {
        return nextParagraph;
      }
    }
  }

  for (var i = paragraphs.length - 1; i >= 0; i--) {
    var paragraph = paragraphs[i];
    var nextParagraph = getNextParagraph(paragraph);
    var offsetBase = article.offsetLeft;
    var lineLength = article.clientWidth;
    addFadenZaehler(paragraph);
    var endOfLineMarker = paragraph.lastChild;
    var offsetEndOfLine = endOfLineMarker.offsetLeft;
    var offSetDifference = offsetEndOfLine - offsetBase;
    var offSetToApply = offSetDifference - 32;
    var tresholdMax = 0.8 * lineLength;
    var tresholdMin = 0.25 * lineLength;

    if (nextParagraph && offSetToApply > tresholdMin  && offSetToApply < tresholdMax && offSetToApply >= 0) {
      nextParagraph.setAttribute('style', 'text-indent: ' + offSetToApply + 'px');      
    }
  }

})();