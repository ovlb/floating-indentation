export default class FloatingIndentation {
  constructor(article) {
    this.$article = article || document.querySelector('.js-article')
    this.$p = this.$article.querySelectorAll('p + p')

    this.baseIndent = parseInt(window.getComputedStyle(this.$p[0]).textIndent, 10)
    this.lineLength = this.$article.clientWidth
  }

  init() {
    this.$p.forEach(($p) => {
      const isImageContainer =
          FloatingIndentation.hasImageAsNthChild($p, 'first') &&
          FloatingIndentation.hasImageAsNthChild($p, 'last')

      if (isImageContainer) return

      const $previous = $p.previousElementSibling

      if (FloatingIndentation.hasImageAsNthChild($previous, 'last')) return

      const { delta } = FloatingIndentation.getValues($previous)

      if (delta < 3 * this.baseIndent) return

      $p.style.textIndent = `${delta - 2 * this.baseIndent}px`
    })
  }

  static addMeasurement($el) {
    const $m = document.createElement('span')
    $m.classList.add('js-measure')

    $el.appendChild($m)
  }

  static hasImageAsNthChild($el, pos) {
    const childNodes = $el.childNodes
    const nthChilds = {
      first: childNodes[0],
      last: childNodes[childNodes.length - 1]
    }
    const nthChild = nthChilds[pos]

    return nthChild && nthChild.tagName === 'IMG'
  }

  static getValues($el) {
    FloatingIndentation.addMeasurement($el)

    const $measure = $el.querySelector('.js-measure')
    const leftBase = FloatingIndentation.getOffsetLeft($el.parentElement)
    const elLeft = FloatingIndentation.getOffsetLeft($measure)
    const delta = elLeft - leftBase

    return { leftBase, elLeft, delta }
  }

  static getOffsetLeft($el) {
    const data = $el.dataset.offsetLeft

    if (data) return parseInt(data)

    const offset = $el.offsetLeft
    $el.setAttribute('data-offset-left', offset)

    return offset
  }
}