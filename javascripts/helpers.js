String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

String.prototype.titleize = function() {
  var result = new Array(),
      words  = this.replace(/[^a-z0-9]+/i,' ').split(' ');
	for(i in words){
	  var word = String(words[i]);
	  result.push(word.capitalize());
	}
	return result.join(' ');
}
