export type Activity = {
  slug: string
  tag: string
  title: string
  shortDescription: string
  description: string[]
  tips: string[]
  practical: { label: string; value: string }[]
  image: string
}

const activities: Activity[] = [
  {
    slug: 'caminito-del-rey',
    tag: '15 min away',
    title: 'Walk the gorge of a lifetime',
    shortDescription:
      "The Caminito del Rey clings to the walls of the El Chorro gorge. One of the most dramatic walks in Europe. You'll be back for dinner.",
    description: [
      'A boardwalk trail fixed to the sheer walls of the El Chorro gorge, originally built for workers maintaining the hydroelectric dam. Restored and reopened in 2015, it has become one of the most iconic walks in Spain.',
      'The route runs through the gorge for around 8 km, with exposed sections, suspension bridges, and views that are hard to forget. Casa Malacitano is a 15-minute drive away, making it an easy half-day trip.',
    ],
    tips: [
      'Book tickets online at least 1 to 2 weeks ahead. Slots sell out fast in spring and autumn.',
      'Go early. The trail is at its best in the morning light and before the tour groups arrive.',
      'Wear sturdy shoes. The path is well-maintained but some sections are narrow and exposed.',
    ],
    practical: [
      { label: 'Distance from Casa', value: '11 km' },
      { label: 'Duration', value: '3 to 4 hours' },
      { label: 'Best season', value: 'Spring and autumn' },
      { label: 'Difficulty', value: 'Moderate' },
    ],
    image: '/caminito.jpg',
  },
  {
    slug: 'gr-340',
    tag: 'GR-340 trail',
    title: 'Ride out. Get lost. Find yourself.',
    shortDescription:
      'The GR-340 passes right through the village. Climb into the hills on two wheels or two feet, through olive groves, limestone ridges and zero crowds.',
    description: [
      'The GR-340 long-distance trail passes directly through Valle de Abdalajís, meaning you can step out of Casa Malacitano and be on the trail within minutes. The route winds through olive groves, limestone ridges and quiet mountain terrain.',
      'Suitable for both hiking and mountain biking, the trail offers routes ranging from short loops to full-day epics. This is Andalusia away from the postcards.',
    ],
    tips: [
      'Pick up a trail map at the village bar or ask Jans and Minouche for the best route for your level.',
      'Spring is spectacular when the wildflowers are in bloom. Avoid the height of summer: the heat above the treeline can be intense.',
      'For mountain biking, the section towards Antequera is particularly good.',
    ],
    practical: [
      { label: 'Distance from Casa', value: 'Starts from the village' },
      { label: 'Duration', value: 'Flexible' },
      { label: 'Best season', value: 'Spring and autumn' },
      { label: 'Difficulty', value: 'Easy to challenging' },
    ],
    image: '/mb.jpg',
  },
  {
    slug: 'three-cities',
    tag: 'Within 1 hour',
    title: 'Three cities, one base.',
    shortDescription:
      "Málaga's waterfront, Antequera's dolmens, Ronda's cliffside views. All within an hour. Stay here. Go everywhere.",
    description: [
      "From Casa Malacitano you can reach three of Andalusia's most distinctive cities in under an hour. Málaga for seafood, culture, and the Picasso Museum. Antequera for prehistoric dolmens, a dramatic castle, and the UNESCO-listed landscape of El Torcal. Ronda for its breathtaking clifftop setting and one of Spain's oldest bullrings.",
      'Each is different enough to deserve its own day. Base yourself here and you never have to choose.',
    ],
    tips: [
      'Ronda is best midweek. Weekend crowds on the famous bridge can be overwhelming.',
      "Málaga's old town is very walkable from the port. Park at the harbour and explore on foot.",
      "Antequera's dolmens (Menga, Viera, El Romeral) are a UNESCO World Heritage Site and often quietly deserted.",
    ],
    practical: [
      { label: 'Málaga', value: '45 min' },
      { label: 'Antequera', value: '25 min' },
      { label: 'Ronda', value: '50 min' },
      { label: 'Best season', value: 'Year-round' },
    ],
    image: '/malaga.jpg',
  },
  {
    slug: 'local-life',
    tag: 'Local life',
    title: 'Spain as it used to be',
    shortDescription:
      "Valle de Abdalajís hasn't been packaged for tourists. And that's exactly the point. Sit on a terrace, order something cold, and let the afternoon disappear.",
    description: [
      "The village has everything you need and nothing you don't. A handful of bars, a bakery that opens at 7am, a small supermarket, and a square where locals gather in the evening. No gift shops, no tourist menus, no queues.",
      "This is the kind of place that rewards slowness. Sit at the bar, drink what the locals drink, and watch the afternoon go by. It's five minutes on foot from Casa Malacitano.",
    ],
    tips: [
      'The bar on the main square is the social hub. Go in the early evening when locals finish work.',
      'The bakery opens early and runs out of the good stuff fast.',
      "Don't plan too much. The best parts of Valle de Abdalajís happen without a schedule.",
    ],
    practical: [
      { label: 'Distance from Casa', value: '5 min walk' },
      { label: 'Bar hours', value: 'Morning until late' },
      { label: 'Market', value: 'Saturday mornings' },
      { label: 'Best season', value: 'Year-round' },
    ],
    image: '/local.jpg',
  },
  {
    slug: 'el-torcal',
    tag: '30 min away',
    title: 'El Torcal Natural Park',
    shortDescription:
      'Millions of years of erosion have shaped the limestone into something that looks like another planet entirely.',
    description: [
      'El Torcal de Antequera is one of the most remarkable natural parks in Europe. Millions of years of erosion have sculpted the limestone karst into bizarre, otherworldly formations. Walking trails range from 30 minutes to 3 hours, all well-marked and clearly signed.',
      'The park is a UNESCO World Heritage Site and home to rare plants and birds of prey. It is one of the most photographed landscapes in Andalusia, and completely unlike anywhere else.',
    ],
    tips: [
      'The short green trail (1.5 km) gives an excellent overview in about 30 minutes.',
      'Go in the morning for the best light. The formations cast extraordinary shadows until midday.',
      'Bring a layer even in summer. The plateau sits at 1,200 m and the wind can be sharp.',
    ],
    practical: [
      { label: 'Distance from Casa', value: '30 min drive' },
      { label: 'Entry', value: 'Free' },
      { label: 'Shortest trail', value: '1.5 km, 30 min' },
      { label: 'Best season', value: 'Spring and autumn' },
    ],
    image: '/torcal.jpg',
  },
  {
    slug: 'el-chorro',
    tag: '15 min away',
    title: 'El Chorro lakes',
    shortDescription:
      'Turquoise reservoir water framed by dramatic gorge walls. Swimming, kayaking, and views you will not forget.',
    description: [
      'The El Chorro reservoir system creates a series of turquoise lakes set against the sheer walls of the gorge. The colour of the water against the limestone cliffs is extraordinary, and changes with the light throughout the day.',
      'Swimming spots are easily accessible along the shore, and kayak hire is available nearby. This is also the starting point for the Caminito del Rey, making it a natural base for a full day out.',
    ],
    tips: [
      'The best swimming spots are a 10-minute walk from the main car park. Follow the path along the water.',
      'Early morning is magical: the water is glassy and the gorge walls catch the first light.',
      'Combine with the Caminito del Rey for a full day: walk in the morning, swim in the afternoon.',
    ],
    practical: [
      { label: 'Distance from Casa', value: '15 min drive' },
      { label: 'Entry', value: 'Free' },
      { label: 'Swimming', value: 'April to October' },
      { label: 'Best season', value: 'Spring and summer' },
    ],
    image: '/chorro.jpg',
  },
]

export default activities
