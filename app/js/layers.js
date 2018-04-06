const aerials = {
  '2018': {
    url: 'http://maps.co.mecklenburg.nc.us/tiles/2018/{z}/{x}/{y}.jpg',
    minZoom: 9,
    maxZoom: 17
  },
  '2017': {
    url: 'http://maps.co.mecklenburg.nc.us/tiles/2017/{z}/{x}/{y}.jpg',
    minZoom: 9,
    maxZoom: 17
  },
  '2016': {
    url: 'http://maps.co.mecklenburg.nc.us/tiles/2016/{z}/{x}/{y}.jpg',
    minZoom: 9,
    maxZoom: 17
  },
  '2015': {
    url: 'http://maps.co.mecklenburg.nc.us/tiles/2015/{z}/{x}/{y}.jpg',
    minZoom: 9,
    maxZoom: 17
  },
  '2014': {
    url: 'http://maps.co.mecklenburg.nc.us/tiles/2014/{z}/{x}/{y}.jpg',
    minZoom: 9,
    maxZoom: 17
  },
  '2013': {
    url: 'http://maps.co.mecklenburg.nc.us/tiles/2013/{z}/{x}/{y}.jpg',
    minZoom: 9,
    maxZoom: 17
  },
  '2012': {
    url: 'http://maps.co.mecklenburg.nc.us/tiles/2012/{z}/{x}/{y}.jpg',
    minZoom: 9,
    maxZoom: 17
  },
  '2009': {
    url: 'http://maps.co.mecklenburg.nc.us/tiles/2009/{z}/{x}/{y}.jpg',
    minZoom: 9,
    maxZoom: 17
  },
  '1997': {
    url: 'http://maps.co.mecklenburg.nc.us/tiles/1997/{z}/{x}/{y}.jpg',
    minZoom: 9,
    maxZoom: 17
  },
  '1978': {
    url: 'http://maps.co.mecklenburg.nc.us/tiles/1978/{z}/{x}/{y}.jpg',
    minZoom: 9,
    maxZoom: 17
  }
};

const years = Object.keys(aerials);

export {aerials, years};
