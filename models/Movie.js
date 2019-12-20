const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const MovieSchema = new Schema({
    director_id: Schema.Types.ObjectId,
      title:{
          type: String,
          required:[true, '`{PATH}` alanı zorunludur.'],
          maxlength:[15, '`{PATH}` alanı `{VALUE}`, (`MAXLENGTH`) karekterden fazla olamaz.'],
          minlength:[4, '`{PATH}` alanı `{VALUE}`, (`MİNLENGHT`) karekterden az olamaz.'],
      },
      category:String,
      country: String,
      year: Number,
      imbd_score: Number,
      createdAt:{
          type: Date,
          default: Date.now
      }
});

module.exports = mongoose.model('movie', MovieSchema);
