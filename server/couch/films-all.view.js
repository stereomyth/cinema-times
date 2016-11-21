function (doc, thing) {
  if (doc.type === 'film') {
    for (cinema in doc.screenings) {
      var film = {
        title: doc.title,
        poster: doc.poster,
        variants: [{
          type: doc.variant,
          edi: doc._id,
          oldTitle: doc.oldTitle,
          screenings: doc.screenings[cinema]
        }] 
      }      
      emit([cinema, doc.title], film);  
    }
  }
}
