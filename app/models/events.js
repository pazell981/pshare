var mysql = require('mysql');

var EventSchema = new mongoose.Schema({
  event: 'string',
  image1: 'string',
  image1Alt: 'string',
  image1Caption: 'string',
  image2: 'string',
  image2Alt: 'string',
  image2Caption: 'string',
  image3: 'string',
  image3Alt: 'string',
  image3Caption: 'string',
  color1: 'string',
  color2: 'string',
  color3: 'string',
  color4: 'string',
  color5: 'string'
});

ProductSchema.path('name').required(true, 'Name cannot be blank');

mongoose.model('Product', ProductSchema);