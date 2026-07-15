// Custom Decap CMS preview templates so editors see something that looks
// like the real page instead of a plain field dump. Uses the CDN bundle's
// exposed globals (no build step): CMS, h (hyperscript), createClass.
(function () {
  CMS.registerPreviewStyle('/admin/preview.css')

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

  // ---- Homepage ----------------------------------------------------
  var HomepagePreview = createClass({
    render: function () {
      var entry = this.props.entry
      var facilityItems = getList(entry, ['facilities', 'items'])
      var casitaTeaser = get(entry, ['accommodations', 'casita'], {})
      var casaTeaser = get(entry, ['accommodations', 'casa'], {})

      return h('div', { className: 'cms-preview' },
        h('div', {
          className: 'cms-hero',
          style: { backgroundImage: 'url(' + assetUrl(this.props, get(entry, ['hero', 'backgroundImage'])) + ')' },
        },
          h('div', { className: 'cms-eyebrow' }, get(entry, ['hero', 'locationTag'], '')),
          h('h1', { className: 'cms-h1' }, get(entry, ['hero', 'title'], '')),
          h('p', {}, get(entry, ['hero', 'subtitle'], ''))
        ),

        h('div', { className: 'cms-section' },
          h('h2', { className: 'cms-h2' }, get(entry, ['facilities', 'title'], '')),
          h('p', { className: 'cms-muted' }, get(entry, ['facilities', 'text'], '')),
          h('div', { className: 'cms-grid-2' },
            facilityItems.map(function (item, i) {
              return h('div', { className: 'cms-card', key: i },
                h('strong', {}, item.title), h('span', { className: 'cms-muted' }, item.text)
              )
            })
          )
        ),

        h('div', { className: 'cms-section' },
          h('h2', { className: 'cms-h2' }, get(entry, ['accommodations', 'title'], '')),
          h('p', { className: 'cms-muted' }, get(entry, ['accommodations', 'subtitle'], '')),
          h('div', { className: 'cms-grid-2' },
            h('div', { className: 'cms-card' },
              h('span', { className: 'cms-badge' }, casitaTeaser.badge),
              h('h3', { className: 'cms-h3' }, casitaTeaser.title),
              h('p', { className: 'cms-muted' }, casitaTeaser.text)
            ),
            h('div', { className: 'cms-card' },
              h('span', { className: 'cms-badge' }, casaTeaser.badge),
              h('h3', { className: 'cms-h3' }, casaTeaser.title),
              h('p', { className: 'cms-muted' }, casaTeaser.text)
            )
          )
        ),

        h('div', { className: 'cms-section' },
          h('div', { className: 'cms-eyebrow' }, get(entry, ['village', 'eyebrow'], '')),
          h('h2', { className: 'cms-h2', style: { marginTop: 0 } }, get(entry, ['village', 'title'], '')),
          h('p', { className: 'cms-muted', style: { fontStyle: 'italic' } }, get(entry, ['village', 'tagline'], '')),
          h('p', {}, get(entry, ['village', 'text'], ''))
        ),

        h('div', { className: 'cms-section' },
          h('div', { className: 'cms-eyebrow' }, get(entry, ['hosts', 'eyebrow'], '')),
          h('h2', { className: 'cms-h2', style: { marginTop: 0 } }, get(entry, ['hosts', 'title'], '')),
          h('p', {}, get(entry, ['hosts', 'text'], ''))
        ),

        h('div', { className: 'cms-section' },
          h('h2', { className: 'cms-h2', style: { marginTop: 0 } }, get(entry, ['contact', 'title'], '')),
          h('p', { className: 'cms-muted' }, get(entry, ['contact', 'text'], ''))
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

      return h('div', { className: 'cms-preview' },
        h('div', { className: 'cms-photo-grid' },
          photos.slice(0, 6).map(function (p, i) {
            return h('img', { key: i, src: assetUrl(props, p.src), alt: p.alt })
          })
        ),

        h('div', { className: 'cms-section' },
          h('span', { className: 'cms-badge' }, get(entry, ['badge'], '')),
          h('h1', { className: 'cms-h1' }, get(entry, ['title'], '')),
          h('p', { className: 'cms-muted' }, get(entry, ['location'], '')),
          h('p', {},
            (occupancy.guests || '') + ' guests · ' + (occupancy.bedrooms || '') + ' bedroom · ' +
            (occupancy.beds || '') + ' · ' + (occupancy.bathrooms || '')
          ),
          h('p', {}, '★ ' + (rating.score || '') + ' · ' + (rating.reviews || '') + ' reviews')
        ),

        h('div', { className: 'cms-section' },
          h('h2', { className: 'cms-h2', style: { marginTop: 0 } }, 'About this space'),
          about.map(function (p, i) { return h('p', { key: i }, p) }),
          h('p', { className: 'cms-card' }, get(entry, ['petsNote'], ''))
        ),

        h('div', { className: 'cms-section' },
          h('h2', { className: 'cms-h2', style: { marginTop: 0 } }, get(entry, ['packLight', 'title'], '')),
          h('p', { className: 'cms-muted' }, get(entry, ['packLight', 'text'], '')),
          h('div', { className: 'cms-grid-2' },
            highlights.map(function (item, i) {
              return h('div', { className: 'cms-card', key: i },
                h('strong', {}, item.text), h('span', { className: 'cms-muted' }, item.sub)
              )
            })
          )
        ),

        h('div', { className: 'cms-section' },
          h('h2', { className: 'cms-h2', style: { marginTop: 0 } }, 'What this place offers'),
          amenities.map(function (group, i) {
            return h('div', { className: 'cms-amenity-group', key: i },
              h('h4', {}, group.category),
              h('ul', { className: 'cms-list-plain' },
                (group.items || []).map(function (item, j) { return h('li', { key: j }, item) })
              )
            )
          })
        ),

        h('div', { className: 'cms-section' },
          h('h2', { className: 'cms-h2', style: { marginTop: 0 } }, get(entry, ['contact', 'title'], '')),
          h('p', { className: 'cms-muted' }, get(entry, ['contact', 'text'], ''))
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

      return h('div', { className: 'cms-preview' },
        h('div', {
          className: 'cms-hero',
          style: { backgroundImage: 'url(' + assetUrl(props, get(entry, ['image'])) + ')', minHeight: 220 },
        },
          h('div', { className: 'cms-eyebrow' }, get(entry, ['tag'], '')),
          h('h1', { className: 'cms-h1' }, get(entry, ['title'], ''))
        ),

        h('div', { className: 'cms-section cms-grid-2' },
          practical.map(function (item, i) {
            return h('div', { className: 'cms-card', key: i },
              h('span', { className: 'cms-muted' }, item.label), h('strong', {}, item.value)
            )
          })
        ),

        h('div', { className: 'cms-section' },
          description.map(function (p, i) { return h('p', { key: i }, p) })
        ),

        h('div', { className: 'cms-section' },
          h('h2', { className: 'cms-h2', style: { marginTop: 0 } }, 'Good to know'),
          h('ul', { className: 'cms-list-plain' },
            tips.map(function (tip, i) { return h('li', { key: i }, tip) })
          )
        )
      )
    },
  })
  CMS.registerPreviewTemplate('activities', ActivityPreview)

  // ---- Legal pages (markdown body renders natively via Decap) --------
  var LegalPreview = createClass({
    render: function () {
      return h('div', { className: 'cms-preview' },
        h('p', { className: 'cms-muted' }, 'Last updated: ' + get(this.props.entry, ['lastUpdated'], '')),
        h('div', {}, this.props.widgetFor('body'))
      )
    },
  })
  CMS.registerPreviewTemplate('legal', LegalPreview)

  // ---- Settings ---------------------------------------------------------
  var SettingsPreview = createClass({
    render: function () {
      var entry = this.props.entry
      var address = get(entry, ['address'], {})
      return h('div', { className: 'cms-preview' },
        h('h2', { className: 'cms-h2', style: { marginTop: 0 } }, 'Contact & site settings'),
        h('table', { className: 'cms-table' },
          h('tbody', {},
            h('tr', {}, h('th', {}, 'Email'), h('td', {}, get(entry, ['email'], ''))),
            h('tr', {}, h('th', {}, 'Phone (primary)'), h('td', {}, get(entry, ['phonePrimary'], ''))),
            h('tr', {}, h('th', {}, 'Phone (secondary)'), h('td', {}, get(entry, ['phoneSecondary'], ''))),
            h('tr', {}, h('th', {}, 'Address'), h('td', {},
              [address.street, address.postalCode + ' ' + address.city, address.region + ', ' + address.country].join(', ')
            )),
            h('tr', {}, h('th', {}, 'Tourism licence'), h('td', {}, get(entry, ['tourismLicence'], '')))
          )
        )
      )
    },
  })
  CMS.registerPreviewTemplate('settings', SettingsPreview)
})()
