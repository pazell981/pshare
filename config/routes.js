/* GET home page. */
exports.desktop = function (req, res){
  res.render('index', { 
  	title: 'Remember When We...',
  	event: '',
  	image1: './images/wedding-party.jpg',
  	image1Alt: 'Wedding Party',
  	image1Caption: 'Weddings',
  	image2: './images/corporate-event.jpg',
  	image2Alt: 'Corporate Events',
  	image2Caption: 'Corporate Events',
  	image3: './images/special-event.jpg',
  	image3Alt: 'Special Events',
  	image3Caption: 'Special Events'
  });
};

exports.mobile = function (req, res){
  res.render('mobile', { 
  	title: 'Remember When We...',
  	event: '',
  	image1: './images/wedding-party.jpg',
  	image1Alt: 'Wedding Party',
  	image1Caption: 'Weddings',
  	image2: './images/corporate-event.jpg',
  	image2Alt: 'Corporate Events',
  	image2Caption: 'Corporate Events',
  	image3: './images/special-event.jpg',
  	image3Alt: 'Special Events',
  	image3Caption: 'Special Events'
  });
};
