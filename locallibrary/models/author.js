var mongoose = require('mongoose');
var moment = require('moment');

var Schema = mongoose.Schema;

var AuthorSchema = new Schema({
    first_name: {type: String, required: true, max: 100},
    family_name: {type: String, required: true, max:100},
    date_of_birth: {type: Date},
    date_of_death: {type:Date}
});

//Virtual for author's full name
AuthorSchema
.virtual('name')
.get(function(){
    var fullname = '';
    if (this.first_name && this.family_name){
        fullname = this.family_name + ', ' + this.first_name;
    }
    if (!this.first_name || !this.family_name){
        fullname = '';
    }
    return fullname;
});

//virtual for author's lifespan
AuthorSchema
.virtual('lifespan')
.get(function(){
    return this.date_of_death.getYear() - this.date_of_birth.getYear();
});

//virtual for author's URL
AuthorSchema
.virtual('url')
.get(function(){
    return '/catalog/author/' + this._id;
});

AuthorSchema
.virtual('date_of_birth_formatted')
.get(function(){
    return this.date_of_birth ? moment(this.date_of_birth).format('MMM DD, YYYY') : '';
})

AuthorSchema
.virtual('date_of_death_formatted')
.get(function(){
    return this.date_of_death ? moment(this.date_of_death).format('MMM DD, YYYY') : '';
})

//Export model
module.exports = mongoose.model('Author', AuthorSchema);