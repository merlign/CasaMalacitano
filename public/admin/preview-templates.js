// Custom Decap CMS preview templates. Loads the SITE'S OWN compiled CSS
// (see scripts/copy-preview-css.js) and reuses the exact className
// strings from src/app/**/page.tsx, so the preview renders with the
// real colors, fonts and spacing instead of an approximation.
(function () {
  CMS.registerPreviewStyle('/admin/site.css')
  CMS.registerPreviewStyle('/admin/preview-chrome.css')

  // Decap stores entry data as Immutable.js structures. Nested objects and
  // lists come back as Immutable Maps/Lists, not plain JS, so plain dot
  // access (foo.bar) silently returns undefined unless we convert first.
  function get(entry, path, fallback) {
    var v = entry.getIn(['data'].concat(path))
    if (v === undefined || v === null) return fallback
    return v && typeof v.toJS === 'function' ? v.toJS() : v
  }

  function getList(entry, path) {
    return get(entry, path, [])
  }

  function assetUrl(props, value) {
    if (!value) return ''
    var asset = props.getAsset(value)
    return asset ? String(asset) : ''
  }

  // Small colored dot standing in for the lucide-react icon. Exact icon
  // shapes aren't worth the risk of hand-copied SVG path data; color and
  // placement (via the real classes around it) already carry the look.
  function dot(colorClass) {
    return h('span', { className: 'cms-dot ' + (colorClass || '') })
  }

  // ---- Homepage ----------------------------------------------------
  var HomepagePreview = createClass({
    render: function () {
      var entry = this.props.entry
      var props = this.props
      var facilityItems = getList(entry, ['facilities', 'items'])
      var casitaTeaser = get(entry, ['accommodations', 'casita'], {})
      var casaTeaser = get(entry, ['accommodations', 'casa'], {})
      var facilityColors = [
        'bg-casa-pink/10 text-casa-pink',
        'bg-casa-teal/10 text-casa-teal',
        'bg-casa-yellow/20 text-yellow-700',
        'bg-gray-200 text-gray-700',
      ]

      return h('div', { className: 'font-sans text-casa-text bg-casa-stone' },
        h('section', {
          className: 'relative flex flex-col justify-center pb-20 pt-16',
          style: { minHeight: 420 },
        },
          h('div', {
            className: 'absolute inset-0 bg-cover bg-center',
            style: { backgroundImage: 'url(' + assetUrl(props, get(entry, ['hero', 'backgroundImage'])) + ')' },
          }),
          h('div', { className: 'absolute inset-0 bg-gradient-to-br from-black/70 via-black/40 to-black/20' }),
          h('div', { className: 'relative z-10 text-center px-6 max-w-3xl mx-auto' },
            h('span', { className: 'inline-flex items-center gap-2 text-casa-teal font-bold tracking-widest uppercase text-xs mb-8 bg-black/40 backdrop-blur-sm px-5 py-2.5 rounded-full border border-white/10' },
              get(entry, ['hero', 'locationTag'], '')
            ),
            h('h1', { className: 'text-4xl md:text-5xl font-serif text-white mb-6 leading-[1.1]' }, get(entry, ['hero', 'title'], '')),
            h('p', { className: 'text-base md:text-lg text-white font-light max-w-2xl mx-auto mb-8 leading-relaxed' }, get(entry, ['hero', 'subtitle'], '')),
            h('span', { className: 'inline-block bg-casa-teal text-white px-10 py-4 rounded-full text-lg font-medium' }, get(entry, ['hero', 'ctaLabel'], ''))
          )
        ),

        h('section', { className: 'pb-16 px-6 max-w-4xl mx-auto' },
          h('h2', { className: 'text-3xl font-serif text-casa-text mb-6 mt-10' }, get(entry, ['facilities', 'title'], '')),
          h('p', { className: 'text-casa-text-light text-lg mb-8 leading-relaxed' }, get(entry, ['facilities', 'text'], '')),
          h('div', { className: 'grid grid-cols-2 gap-6' },
            facilityItems.map(function (item, i) {
              return h('div', { className: 'flex items-start gap-3', key: i },
                h('div', { className: 'p-2.5 rounded-xl ' + facilityColors[i % facilityColors.length] }, dot()),
                h('div', {},
                  h('h4', { className: 'font-semibold text-casa-text' }, item.title),
                  h('p', { className: 'text-sm text-casa-text-light mt-1' }, item.text)
                )
              )
            })
          )
        ),

        h('section', { className: 'py-16 bg-casa-stone-dark px-6' },
          h('div', { className: 'max-w-4xl mx-auto' },
            h('div', { className: 'text-center mb-12' },
              h('h2', { className: 'text-3xl md:text-4xl font-serif text-casa-text mb-4' }, get(entry, ['accommodations', 'title'], '')),
              h('p', { className: 'text-lg text-casa-text-light max-w-2xl mx-auto' }, get(entry, ['accommodations', 'subtitle'], ''))
            ),
            h('div', { className: 'grid md:grid-cols-2 gap-10' },
              [casitaTeaser, casaTeaser].map(function (t, i) {
                return h('div', { className: 'bg-white rounded-3xl overflow-hidden shadow-lg flex flex-col', key: i },
                  h('div', { className: 'h-48 overflow-hidden relative bg-casa-stone-dark' },
                    t.image ? h('img', { className: 'w-full h-full object-cover', src: assetUrl(props, t.image) }) : null,
                    h('div', { className: 'absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full text-xs font-bold text-casa-text uppercase tracking-wide' }, t.badge)
                  ),
                  h('div', { className: 'p-8 flex flex-col flex-1' },
                    h('h3', { className: 'text-2xl font-serif mb-3' }, t.title),
                    h('p', { className: 'text-casa-text-light flex-1' }, t.text)
                  )
                )
              })
            )
          )
        ),

        h('section', { className: 'py-16 px-6' },
          h('div', { className: 'max-w-4xl mx-auto' },
            h('p', { className: 'text-casa-teal font-bold tracking-widest uppercase text-xs mb-3' }, get(entry, ['village', 'eyebrow'], '')),
            h('h2', { className: 'text-3xl md:text-4xl font-serif text-casa-text mb-3' }, get(entry, ['village', 'title'], '')),
            h('p', { className: 'text-casa-text-light text-lg italic mb-4' }, get(entry, ['village', 'tagline'], '')),
            h('p', { className: 'text-casa-text-light text-lg leading-relaxed' }, get(entry, ['village', 'text'], ''))
          )
        ),

        h('section', { className: 'py-16 px-6 bg-white' },
          h('div', { className: 'max-w-4xl mx-auto' },
            h('p', { className: 'text-casa-teal font-bold tracking-widest uppercase text-xs mb-3' }, get(entry, ['hosts', 'eyebrow'], '')),
            h('h2', { className: 'text-3xl font-serif text-casa-text mb-6' }, get(entry, ['hosts', 'title'], '')),
            h('p', { className: 'text-casa-text-light text-lg leading-relaxed' }, get(entry, ['hosts', 'text'], ''))
          )
        ),

        h('section', { className: 'py-16 px-6 bg-casa-stone-dark' },
          h('div', { className: 'max-w-2xl mx-auto text-center' },
            h('h2', { className: 'text-3xl font-serif text-casa-text mb-4' }, get(entry, ['contact', 'title'], '')),
            h('p', { className: 'text-casa-text-light text-lg leading-relaxed' }, get(entry, ['contact', 'text'], ''))
          )
        )
      )
    },
  })
  CMS.registerPreviewTemplate('homepage', HomepagePreview)

  // ---- Casa / Casita (shared shape) ---------------------------------
  var PropertyPreview = createClass({
    render: function () {
      var entry = this.props.entry
      var props = this.props
      var photos = getList(entry, ['photos'])
      var about = getList(entry, ['about'])
      var highlights = getList(entry, ['highlights'])
      var amenities = getList(entry, ['amenities'])
      var occupancy = get(entry, ['occupancy'], {})
      var rating = get(entry, ['rating'], {})
      var contact = get(entry, ['contact'], {})

      return h('div', { className: 'font-sans text-casa-text bg-casa-stone px-4 md:px-8 py-8 max-w-4xl mx-auto' },

        h('div', { className: 'grid grid-cols-3 gap-2 rounded-3xl overflow-hidden h-[220px]' },
          photos.slice(0, 6).map(function (p, i) {
            return h('div', { className: 'relative bg-casa-stone-dark', key: i },
              h('img', { className: 'absolute inset-0 w-full h-full object-cover', src: assetUrl(props, p.src), alt: p.alt })
            )
          })
        ),

        h('div', { className: 'mt-8' },
          h('span', { className: 'inline-block bg-casa-pink/10 text-casa-pink text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4' }, get(entry, ['badge'], '')),
          h('h1', { className: 'text-4xl font-serif text-casa-text mb-3 leading-tight' }, get(entry, ['title'], '')),
          h('div', { className: 'flex items-center gap-2 text-casa-text-light mb-4' }, get(entry, ['location'], '')),
          h('div', { className: 'flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-casa-text-light mb-4' },
            (occupancy.guests || '') + ' guests · ' + (occupancy.bedrooms || '') + ' bedroom · ' +
            (occupancy.beds || '') + ' · ' + (occupancy.bathrooms || '')
          ),
          h('div', { className: 'inline-flex items-center gap-2 bg-white border border-gray-100 rounded-2xl px-4 py-3' },
            '★ ', h('span', { className: 'font-semibold text-casa-text' }, rating.score),
            h('span', { className: 'text-casa-text-light text-sm' }, ' · ' + rating.reviews + ' reviews')
          )
        ),

        h('section', { className: 'mt-14' },
          h('h2', { className: 'text-2xl font-serif mb-5' }, 'About this space'),
          h('div', { className: 'space-y-4 text-casa-text-light leading-relaxed' },
            about.map(function (p, i) { return h('p', { key: i }, p) }),
            h('p', { className: 'text-sm bg-casa-stone-dark rounded-2xl p-4' }, get(entry, ['petsNote'], ''))
          )
        ),

        h('section', { className: 'pt-14 mt-14 border-t border-gray-100' },
          h('h2', { className: 'text-2xl font-serif mb-2' }, get(entry, ['packLight', 'title'], '')),
          h('p', { className: 'text-casa-text-light mb-6' }, get(entry, ['packLight', 'text'], '')),
          h('div', { className: 'grid grid-cols-1 sm:grid-cols-2 gap-3' },
            highlights.map(function (item, i) {
              return h('div', { className: 'flex items-start gap-3 p-4 rounded-2xl bg-white border border-gray-100', key: i },
                h('div', { className: 'p-2 bg-casa-teal/10 text-casa-teal rounded-xl shrink-0 mt-0.5' }, dot()),
                h('div', {},
                  h('p', { className: 'font-medium text-casa-text text-sm' }, item.text),
                  h('p', { className: 'text-xs text-casa-text-light mt-0.5' }, item.sub)
                )
              )
            })
          )
        ),

        h('section', { className: 'pt-14 mt-14 border-t border-gray-100' },
          h('h2', { className: 'text-2xl font-serif mb-8' }, 'What this place offers'),
          h('div', { className: 'grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-8' },
            amenities.map(function (group, i) {
              return h('div', { key: i },
                h('div', { className: 'flex items-center gap-2 mb-3 text-casa-teal' },
                  dot('text-casa-teal'), h('h3', { className: 'font-semibold text-casa-text text-base' }, group.category)
                ),
                h('ul', { className: 'space-y-2.5' },
                  (group.items || []).map(function (item, j) {
                    return h('li', { className: 'flex items-center gap-2 text-base text-casa-text-light', key: j }, dot('text-casa-teal'), item)
                  })
                )
              )
            })
          )
        ),

        h('section', { className: 'mt-14 py-16 px-6 bg-casa-stone-dark rounded-3xl text-center' },
          h('h2', { className: 'text-2xl md:text-3xl font-serif text-casa-text mb-3' }, contact.title),
          h('p', { className: 'text-casa-text-light leading-relaxed' }, contact.text)
        )
      )
    },
  })
  CMS.registerPreviewTemplate('casa', PropertyPreview)
  CMS.registerPreviewTemplate('casita', PropertyPreview)

  // ---- Activities -----------------------------------------------------
  var ActivityPreview = createClass({
    render: function () {
      var entry = this.props.entry
      var props = this.props
      var description = getList(entry, ['description'])
      var tips = getList(entry, ['tips'])
      var practical = getList(entry, ['practical'])

      return h('div', { className: 'font-sans text-casa-text bg-casa-stone px-4 md:px-8 py-8 max-w-4xl mx-auto' },
        h('div', { className: 'relative h-[260px] overflow-hidden rounded-3xl' },
          h('img', { className: 'absolute inset-0 w-full h-full object-cover', src: assetUrl(props, get(entry, ['image'])) }),
          h('div', { className: 'absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent' }),
          h('div', { className: 'absolute bottom-0 left-0 right-0 px-6 pb-8' },
            h('span', { className: 'inline-block bg-white/15 backdrop-blur-sm border border-white/20 text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-4' }, get(entry, ['tag'], '')),
            h('h1', { className: 'text-3xl font-serif text-white leading-tight max-w-2xl' }, get(entry, ['title'], ''))
          )
        ),

        h('div', { className: 'grid grid-cols-2 md:grid-cols-4 gap-3 py-8' },
          practical.map(function (item, i) {
            return h('div', { className: 'bg-white rounded-2xl p-4 border border-gray-100', key: i },
              h('p', { className: 'text-xs font-bold uppercase tracking-widest text-casa-text-light mb-1' }, item.label),
              h('p', { className: 'font-semibold text-casa-text' }, item.value)
            )
          })
        ),

        h('div', { className: 'space-y-4 text-casa-text-light leading-relaxed text-lg mb-12' },
          description.map(function (p, i) { return h('p', { key: i }, p) })
        ),

        h('div', { className: 'border-t border-gray-100 pt-10' },
          h('h2', { className: 'text-2xl font-serif text-casa-text mb-6' }, 'Good to know'),
          h('ul', { className: 'space-y-4' },
            tips.map(function (tip, i) {
              return h('li', { className: 'flex items-start gap-3 text-casa-text-light', key: i }, dot('text-casa-teal'), tip)
            })
          )
        )
      )
    },
  })
  CMS.registerPreviewTemplate('activities', ActivityPreview)

  // ---- Legal pages (markdown body renders natively via Decap) --------
  var LegalPreview = createClass({
    render: function () {
      var entry = this.props.entry
      return h('div', { className: 'font-sans text-casa-text bg-casa-stone px-4 md:px-8 py-8 max-w-3xl mx-auto' },
        h('p', { className: 'text-casa-text-light mb-8' }, 'Last updated: ' + get(entry, ['lastUpdated'], '')),
        h('div', { className: 'prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-casa-text prose-p:text-casa-text-light prose-li:text-casa-text-light prose-a:text-casa-teal prose-strong:text-casa-text prose-table:text-sm' },
          this.props.widgetFor('body')
        )
      )
    },
  })
  CMS.registerPreviewTemplate('legal', LegalPreview)

  // ---- Settings ---------------------------------------------------------
  var SettingsPreview = createClass({
    render: function () {
      var entry = this.props.entry
      var address = get(entry, ['address'], {})
      return h('div', { className: 'font-sans text-casa-text bg-casa-stone px-4 md:px-8 py-8 max-w-2xl mx-auto' },
        h('h2', { className: 'text-2xl font-serif text-casa-text mb-6' }, 'Contact & site settings'),
        h('table', { className: 'w-full text-sm border-collapse' },
          h('tbody', {},
            [
              ['Email', get(entry, ['email'], '')],
              ['Phone (primary)', get(entry, ['phonePrimary'], '')],
              ['Phone (secondary)', get(entry, ['phoneSecondary'], '')],
              ['Address', [address.street, address.postalCode + ' ' + address.city, address.region + ', ' + address.country].join(', ')],
              ['Tourism licence', get(entry, ['tourismLicence'], '')],
            ].map(function (row, i) {
              return h('tr', { className: 'border-b border-gray-100', key: i },
                h('th', { className: 'text-left py-2 pr-4 font-semibold text-casa-text align-top' }, row[0]),
                h('td', { className: 'py-2 text-casa-text-light' }, row[1])
              )
            })
          )
        )
      )
    },
  })
  CMS.registerPreviewTemplate('settings', SettingsPreview)
})()
