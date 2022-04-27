const aerials = [
  {
    name: '2021 Aerial',
    url: ['https://mcmap.org/tiles/2021/{z}/{x}/{y}.jpg'],
    minZoom: 8,
    maxZoom: 18,
  },
  {
    name: '2020 Aerial',
    url: ['https://mcmap.org/tiles/2020/{z}/{x}/{y}.jpg'],
    minZoom: 8,
    maxZoom: 18,
  },
  {
    name: '2019 Aerial',
    url: ['https://mcmap.org/tiles/2019/{z}/{x}/{y}.jpg'],
    minZoom: 11,
    maxZoom: 18,
  },
  {
    name: '2018 Aerial',
    url: ['https://mcmap.org/tiles/2018-high/{z}/{x}/{y}.jpg'],
    minZoom: 11,
    maxZoom: 18,
  },
  {
    name: '2017 Aerial',
    url: ['https://mcmap.org/tiles/2017/{z}/{x}/{y}.jpg'],
    minZoom: 9,
    maxZoom: 17,
  },
  {
    name: '2016 Tree Canopy',
    url:
      ['https://mcmap.org/tiles/2016/{z}/{x}/{y}.jpg',
      'https://mcmap.org/tiles/treecanopy2016/{z}/{x}/{y}.png'],
    minZoom: 9,
    maxZoom: 16,
  },
  {
    name: '2016 Aerial',
    url: ['https://mcmap.org/tiles/2016/{z}/{x}/{y}.jpg'],
    minZoom: 9,
    maxZoom: 17,
  },
  {
    name: '2015 Aerial',
    url: ['https://mcmap.org/tiles/2015/{z}/{x}/{y}.jpg'],
    minZoom: 9,
    maxZoom: 17,
  },
  {
    name: '2014 Aerial',
    url: ['https://mcmap.org/tiles/2014/{z}/{x}/{y}.jpg'],
    minZoom: 9,
    maxZoom: 17,
  },
  {
    name: '2013 Aerial',
    url: ['https://mcmap.org/tiles/2013/{z}/{x}/{y}.jpg'],
    minZoom: 9,
    maxZoom: 17,
  },
  {
    name: '2012 Tree Canopy',
    url:
      ['https://mcmap.org/tiles/2012/{z}/{x}/{y}.jpg',
      'https://mcmap.org/tiles/treecanopy2012/{z}/{x}/{y}.png'],
    minZoom: 9,
    maxZoom: 16,
  },
  {
    name: '2012 Aerial',
    url: ['https://mcmap.org/tiles/2012/{z}/{x}/{y}.jpg'],
    minZoom: 9,
    maxZoom: 17,
  },
  {
    name: '2011 Aerial',
    url: ['https://mcmap.org/tiles/2011/{z}/{x}/{y}.jpg'],
    minZoom: 9,
    maxZoom: 17,
  },
  {
    name: '2010 Aerial',
    url: ['https://mcmap.org/tiles/2010/{z}/{x}/{y}.jpg'],
    minZoom: 9,
    maxZoom: 17,
  },
  {
    name: '2009 Aerial',
    url: ['https://mcmap.org/tiles/2009/{z}/{x}/{y}.jpg'],
    minZoom: 9,
    maxZoom: 17,
  },
  {
    name: '2008 Tree Canopy',
    url:
      ['https://mcmap.org/tiles/2007/{z}/{x}/{y}.jpg',
      'https://mcmap.org/tiles/treecanopy2008/{z}/{x}/{y}.png'],
    minZoom: 9,
    maxZoom: 16,
  },
  {
    name: '2007 Aerial',
    url: ['https://mcmap.org/tiles/2007/{z}/{x}/{y}.jpg'],
    minZoom: 9,
    maxZoom: 17,
  },
  {
    name: '2006 Aerial',
    url: ['https://mcmap.org/tiles/2006/{z}/{x}/{y}.jpg'],
    minZoom: 9,
    maxZoom: 17,
  },
  {
    name: '2005 Aerial',
    url: ['https://mcmap.org/tiles/2005/{z}/{x}/{y}.jpg'],
    minZoom: 9,
    maxZoom: 17,
  },
  {
    name: '2004 Aerial',
    url: ['https://mcmap.org/tiles/2004/{z}/{x}/{y}.jpg'],
    minZoom: 9,
    maxZoom: 17,
  },
  {
    name: '2002 Aerial',
    url: ['https://mcmap.org/tiles/2002/{z}/{x}/{y}.jpg'],
    minZoom: 9,
    maxZoom: 17,
  },
  {
    name: '2001 Tree Canopy',
    url:
      ['https://mcmap.org/tiles/2002/{z}/{x}/{y}.jpg',
      'https://mcmap.org/tiles/treecanopy2001/{z}/{x}/{y}.png'],
    minZoom: 9,
    maxZoom: 16,
  },
  {
    name: '1997 Aerial',
    url: ['https://mcmap.org/tiles/1997/{z}/{x}/{y}.jpg'],
    minZoom: 9,
    maxZoom: 17,
  },
  {
    name: '1993 Aerial',
    url: ['https://mcmap.org/tiles/1993/{z}/{x}/{y}.jpg'],
    minZoom: 9,
    maxZoom: 17,
  },
  {
    name: '1980 Aerial',
    url: ['https://mcmap.org/tiles/1980/{z}/{x}/{y}.jpg'],
    minZoom: 9,
    maxZoom: 17,
  },
  {
    name: '1978 Aerial',
    url: ['https://mcmap.org/tiles/1978/{z}/{x}/{y}.jpg'],
    minZoom: 9,
    maxZoom: 17,
  },
  {
    name: '1951 Aerial',
    url: ['https://mcmap.org/tiles/1951/{z}/{x}/{y}.jpg'],
    minZoom: 9,
    maxZoom: 17,
  },
  {
    name: '1938 Aerial',
    url: ['https://mcmap.org/tiles/1938/{z}/{x}/{y}.jpg'],
    minZoom: 9,
    maxZoom: 17,
  }
]

const years = aerials.map((el) => el.name)

export { aerials, years }
