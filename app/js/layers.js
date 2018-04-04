const aerials = {
  '2017':
    'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
  '2000': 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  '1978': 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png'
};

const years = Object.keys(aerials);

export {aerials, years};
