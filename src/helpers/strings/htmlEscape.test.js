import htmlEscape from './htmlEscape'

describe('htmlEscape', () => {
  test('escapes the characters HTML gives a meaning to', () => {
    expect(htmlEscape('&<>"\'')).toEqual('&amp;&lt;&gt;&quot;&#39;')
  })

  test('markup and script become plain text', () => {
    expect(htmlEscape('<img src=x onerror="alert(1)">')).toEqual('&lt;img src=x onerror=&quot;alert(1)&quot;&gt;')
  })

  test('escapes an ampersand only once, so already-escaped text stays visible as written', () => {
    expect(htmlEscape('&lt;')).toEqual('&amp;lt;')
  })

  test('leaves other text alone', () => {
    expect(htmlEscape('Silent Comet 7 · é 🚀')).toEqual('Silent Comet 7 · é 🚀')
    expect(htmlEscape('')).toEqual('')
  })
})
