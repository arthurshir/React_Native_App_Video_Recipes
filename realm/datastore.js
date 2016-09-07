// Datastore class for centralizing the Realm Persistent Store

var Realm = require('realm');

const VideoSchema = {
  name: 'Video',
  primaryKey: 'fbid',
  properties: {
    created:      'date',
    image_url:    'string',
    fbid:         'string',
    page_url:     'string',
    recipe_text:  'string',
    description:  'string',
    host_page:    {type: 'Page'}
  }
};
const PageSchema = {
  name: 'Page',
  primaryKey: 'fbid',
  properties: {
    name:  		'string',
    fbid: 		'string',
    image_url: 	'string',
  }
};
class Page {
  get url() {
    return "https://www.facebook.com/" + this.fbid;
  }
}
Page.schema = PageSchema;
let realm = new Realm({schema: [VideoSchema, Page]});

// print_all: function(name) {
//   var objects = realm.objects(name);
//   for (i = 0; i < objects.length; i++){
//     var object = objects[i];
//     console.log(object.name + object.fbid);
//   }
// }

// existing_or_new: function(name, filterText) {
//   var objects = realm.objects(name).filtered(filterText);
//   if (objects.length == 0) {
//     return realm.
//   }
// }

exports.realm = realm;
