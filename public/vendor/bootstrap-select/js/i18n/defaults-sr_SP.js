!function(e,t){void 0===e&&void 0!==window&&(e=window),"function"==typeof define&&define.amd?define(["jquery"],t):"object"==typeof module&&module.exports?module.exports=t(require("jquery")):t(e.jQuery)}(this,function(e){e.fn.selectpicker.defaults={noneSelectedText:"Izaberite",noneResultsText:"Nema rezultata za {0}",countSelectedText:function(e,t){return 1==e?"{0} izabrana":"{0} izabrane"},maxOptionsText:function(e,t){return[1==e?"Limit je dostignut ({n} stvar maximalno)":"Limit je dostignut ({n} stavke maksimalno)",1==t?"Grupni limit je dostignut ({n} stvar maksimalno)":"Grupni limit je dostignut ({n} stavke maksimalno)"]},selectAllText:"Izaberi sve",deselectAllText:"Obrisi sve",multipleSeparator:", "}});