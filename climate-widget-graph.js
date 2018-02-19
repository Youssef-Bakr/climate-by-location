(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){(function($){$.ajaxthrottle=function(options){var timeout,settings=$.extend({numRequestsPerTimePeriod:0,timePeriod:0,maxConcurrent:1},options),time=function(){return(new Date).getTime()},outstanding_reqs=[],initiated_reqs=[],waiting_reqs=[],purge_initiated_reqs=function(now){if(settings.timePeriod>=0){while(initiated_reqs.length>0&&initiated_reqs[0].time+settings.timePeriod-now<=0){initiated_reqs.shift()}if(initiated_reqs.length>0){return initiated_reqs[0].time+settings.timePeriod-now}}return 0},remove_outstanding_req=function(obj){$.each(outstanding_reqs,function(i){if(outstanding_reqs[i]===obj){outstanding_reqs.splice(i,1);return false}return true})},process_waiting=function(){var now=time(),delay,req,deferred;if(waiting_reqs.length<=0){return}delay=purge_initiated_reqs(now);if(settings.numRequestsPerTimePeriod>0&&settings.timePeriod>0&&delay>0&&initiated_reqs.length>=settings.numRequestsPerTimePeriod){if(timeout!==undefined){clearTimeout(timeout)}timeout=setTimeout(function(){timeout=undefined;process_waiting()},delay);return}if(settings.maxConcurrent>0&&outstanding_reqs.length>=settings.maxConcurrent){return}req=waiting_reqs.shift();req.time=time();initiated_reqs.push(req);outstanding_reqs.push(req);$.ajax.apply($,req.arguments).done(function(){req.deferred.resolve.apply(req.deferred,arguments)}).fail(function(){req.deferred.reject.apply(req.deferred,arguments)}).always(function(){remove_outstanding_req(req);process_waiting()})};return{ajax:function(){var deferred=$.Deferred();waiting_reqs.push({arguments:arguments,deferred:deferred});process_waiting();return deferred.promise()}}}})(jQuery)},{}],2:[function(require,module,exports){(function($){"use strict";var methods={on:function(on){if(on===undefined){return $(this).data("busy_spinner").on}else{return this.each(function(){if(on){$(this).data("busy_spinner").on=true;$(this).data("busy_spinner").level=1;$(this).show()}else{$(this).data("busy_spinner").on=false;$(this).data("busy_spinner").level=0;$(this).hide()}return this})}},level:function(delta){if(delta===undefined){return $(this).data("busy_spinner").level}else{return this.each(function(){if($(this).data("busy_spinner").level+delta>=0){$(this).data("busy_spinner").level=$(this).data("busy_spinner").level+delta;if($(this).data("busy_spinner").level===1){$(this).busy_spinner("on",true)}else if($(this).data("busy_spinner").level===0){$(this).busy_spinner("on",false)}}return this})}},init:function(options){return this.each(function(){var $this=$(this),data=$this.data("busy_spinner"),settings=$.extend({on:false},options);if(!data){$this.data("busy_spinner",{on:settings.on,level:0});if(settings.on){$(this).show()}else{$(this).hide()}$(this).css({width:32,height:32}).append($('<img src="data:image/gif;base64,R0lGODlhIAAgAPMAAP///wAAAMbGxoSEhLa2tpqamjY2NlZWVtjY2OTk5Ly8vB4eHgQEBAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAIAAgAAAE5xDISWlhperN52JLhSSdRgwVo1ICQZRUsiwHpTJT4iowNS8vyW2icCF6k8HMMBkCEDskxTBDAZwuAkkqIfxIQyhBQBFvAQSDITM5VDW6XNE4KagNh6Bgwe60smQUB3d4Rz1ZBApnFASDd0hihh12BkE9kjAJVlycXIg7CQIFA6SlnJ87paqbSKiKoqusnbMdmDC2tXQlkUhziYtyWTxIfy6BE8WJt5YJvpJivxNaGmLHT0VnOgSYf0dZXS7APdpB309RnHOG5gDqXGLDaC457D1zZ/V/nmOM82XiHRLYKhKP1oZmADdEAAAh+QQJCgAAACwAAAAAIAAgAAAE6hDISWlZpOrNp1lGNRSdRpDUolIGw5RUYhhHukqFu8DsrEyqnWThGvAmhVlteBvojpTDDBUEIFwMFBRAmBkSgOrBFZogCASwBDEY/CZSg7GSE0gSCjQBMVG023xWBhklAnoEdhQEfyNqMIcKjhRsjEdnezB+A4k8gTwJhFuiW4dokXiloUepBAp5qaKpp6+Ho7aWW54wl7obvEe0kRuoplCGepwSx2jJvqHEmGt6whJpGpfJCHmOoNHKaHx61WiSR92E4lbFoq+B6QDtuetcaBPnW6+O7wDHpIiK9SaVK5GgV543tzjgGcghAgAh+QQJCgAAACwAAAAAIAAgAAAE7hDISSkxpOrN5zFHNWRdhSiVoVLHspRUMoyUakyEe8PTPCATW9A14E0UvuAKMNAZKYUZCiBMuBakSQKG8G2FzUWox2AUtAQFcBKlVQoLgQReZhQlCIJesQXI5B0CBnUMOxMCenoCfTCEWBsJColTMANldx15BGs8B5wlCZ9Po6OJkwmRpnqkqnuSrayqfKmqpLajoiW5HJq7FL1Gr2mMMcKUMIiJgIemy7xZtJsTmsM4xHiKv5KMCXqfyUCJEonXPN2rAOIAmsfB3uPoAK++G+w48edZPK+M6hLJpQg484enXIdQFSS1u6UhksENEQAAIfkECQoAAAAsAAAAACAAIAAABOcQyEmpGKLqzWcZRVUQnZYg1aBSh2GUVEIQ2aQOE+G+cD4ntpWkZQj1JIiZIogDFFyHI0UxQwFugMSOFIPJftfVAEoZLBbcLEFhlQiqGp1Vd140AUklUN3eCA51C1EWMzMCezCBBmkxVIVHBWd3HHl9JQOIJSdSnJ0TDKChCwUJjoWMPaGqDKannasMo6WnM562R5YluZRwur0wpgqZE7NKUm+FNRPIhjBJxKZteWuIBMN4zRMIVIhffcgojwCF117i4nlLnY5ztRLsnOk+aV+oJY7V7m76PdkS4trKcdg0Zc0tTcKkRAAAIfkECQoAAAAsAAAAACAAIAAABO4QyEkpKqjqzScpRaVkXZWQEximw1BSCUEIlDohrft6cpKCk5xid5MNJTaAIkekKGQkWyKHkvhKsR7ARmitkAYDYRIbUQRQjWBwJRzChi9CRlBcY1UN4g0/VNB0AlcvcAYHRyZPdEQFYV8ccwR5HWxEJ02YmRMLnJ1xCYp0Y5idpQuhopmmC2KgojKasUQDk5BNAwwMOh2RtRq5uQuPZKGIJQIGwAwGf6I0JXMpC8C7kXWDBINFMxS4DKMAWVWAGYsAdNqW5uaRxkSKJOZKaU3tPOBZ4DuK2LATgJhkPJMgTwKCdFjyPHEnKxFCDhEAACH5BAkKAAAALAAAAAAgACAAAATzEMhJaVKp6s2nIkolIJ2WkBShpkVRWqqQrhLSEu9MZJKK9y1ZrqYK9WiClmvoUaF8gIQSNeF1Er4MNFn4SRSDARWroAIETg1iVwuHjYB1kYc1mwruwXKC9gmsJXliGxc+XiUCby9ydh1sOSdMkpMTBpaXBzsfhoc5l58Gm5yToAaZhaOUqjkDgCWNHAULCwOLaTmzswadEqggQwgHuQsHIoZCHQMMQgQGubVEcxOPFAcMDAYUA85eWARmfSRQCdcMe0zeP1AAygwLlJtPNAAL19DARdPzBOWSm1brJBi45soRAWQAAkrQIykShQ9wVhHCwCQCACH5BAkKAAAALAAAAAAgACAAAATrEMhJaVKp6s2nIkqFZF2VIBWhUsJaTokqUCoBq+E71SRQeyqUToLA7VxF0JDyIQh/MVVPMt1ECZlfcjZJ9mIKoaTl1MRIl5o4CUKXOwmyrCInCKqcWtvadL2SYhyASyNDJ0uIiRMDjI0Fd30/iI2UA5GSS5UDj2l6NoqgOgN4gksEBgYFf0FDqKgHnyZ9OX8HrgYHdHpcHQULXAS2qKpENRg7eAMLC7kTBaixUYFkKAzWAAnLC7FLVxLWDBLKCwaKTULgEwbLA4hJtOkSBNqITT3xEgfLpBtzE/jiuL04RGEBgwWhShRgQExHBAAh+QQJCgAAACwAAAAAIAAgAAAE7xDISWlSqerNpyJKhWRdlSAVoVLCWk6JKlAqAavhO9UkUHsqlE6CwO1cRdCQ8iEIfzFVTzLdRAmZX3I2SfZiCqGk5dTESJeaOAlClzsJsqwiJwiqnFrb2nS9kmIcgEsjQydLiIlHehhpejaIjzh9eomSjZR+ipslWIRLAgMDOR2DOqKogTB9pCUJBagDBXR6XB0EBkIIsaRsGGMMAxoDBgYHTKJiUYEGDAzHC9EACcUGkIgFzgwZ0QsSBcXHiQvOwgDdEwfFs0sDzt4S6BK4xYjkDOzn0unFeBzOBijIm1Dgmg5YFQwsCMjp1oJ8LyIAACH5BAkKAAAALAAAAAAgACAAAATwEMhJaVKp6s2nIkqFZF2VIBWhUsJaTokqUCoBq+E71SRQeyqUToLA7VxF0JDyIQh/MVVPMt1ECZlfcjZJ9mIKoaTl1MRIl5o4CUKXOwmyrCInCKqcWtvadL2SYhyASyNDJ0uIiUd6GGl6NoiPOH16iZKNlH6KmyWFOggHhEEvAwwMA0N9GBsEC6amhnVcEwavDAazGwIDaH1ipaYLBUTCGgQDA8NdHz0FpqgTBwsLqAbWAAnIA4FWKdMLGdYGEgraigbT0OITBcg5QwPT4xLrROZL6AuQAPUS7bxLpoWidY0JtxLHKhwwMJBTHgPKdEQAACH5BAkKAAAALAAAAAAgACAAAATrEMhJaVKp6s2nIkqFZF2VIBWhUsJaTokqUCoBq+E71SRQeyqUToLA7VxF0JDyIQh/MVVPMt1ECZlfcjZJ9mIKoaTl1MRIl5o4CUKXOwmyrCInCKqcWtvadL2SYhyASyNDJ0uIiUd6GAULDJCRiXo1CpGXDJOUjY+Yip9DhToJA4RBLwMLCwVDfRgbBAaqqoZ1XBMHswsHtxtFaH1iqaoGNgAIxRpbFAgfPQSqpbgGBqUD1wBXeCYp1AYZ19JJOYgH1KwA4UBvQwXUBxPqVD9L3sbp2BNk2xvvFPJd+MFCN6HAAIKgNggY0KtEBAAh+QQJCgAAACwAAAAAIAAgAAAE6BDISWlSqerNpyJKhWRdlSAVoVLCWk6JKlAqAavhO9UkUHsqlE6CwO1cRdCQ8iEIfzFVTzLdRAmZX3I2SfYIDMaAFdTESJeaEDAIMxYFqrOUaNW4E4ObYcCXaiBVEgULe0NJaxxtYksjh2NLkZISgDgJhHthkpU4mW6blRiYmZOlh4JWkDqILwUGBnE6TYEbCgevr0N1gH4At7gHiRpFaLNrrq8HNgAJA70AWxQIH1+vsYMDAzZQPC9VCNkDWUhGkuE5PxJNwiUK4UfLzOlD4WvzAHaoG9nxPi5d+jYUqfAhhykOFwJWiAAAIfkECQoAAAAsAAAAACAAIAAABPAQyElpUqnqzaciSoVkXVUMFaFSwlpOCcMYlErAavhOMnNLNo8KsZsMZItJEIDIFSkLGQoQTNhIsFehRww2CQLKF0tYGKYSg+ygsZIuNqJksKgbfgIGepNo2cIUB3V1B3IvNiBYNQaDSTtfhhx0CwVPI0UJe0+bm4g5VgcGoqOcnjmjqDSdnhgEoamcsZuXO1aWQy8KAwOAuTYYGwi7w5h+Kr0SJ8MFihpNbx+4Erq7BYBuzsdiH1jCAzoSfl0rVirNbRXlBBlLX+BP0XJLAPGzTkAuAOqb0WT5AH7OcdCm5B8TgRwSRKIHQtaLCwg1RAAAOwAAAAAAAAAAAA==" width="32" height="32" alt="ajax loading">'))}return this})}};$.fn.busy_spinner=function(method){if(methods[method]){return methods[method].apply(this,Array.prototype.slice.call(arguments,1))}else if(typeof method==="object"||!method){return methods.init.apply(this,arguments)}else{$.error("Method "+method+" does not exist on jQuery.busy_spinner");return null}}})(jQuery)},{}],3:[function(require,module,exports){(function($){"use strict";var errorDisplayHtml=""+'<div class="errorDisplay">'+'<span class="errorDisplayOptions">'+'<button class="errorDisplayDetailsButton">See Details</button>'+'<a href="" class="errorDisplayXButton">&#10006;</a>'+"</span>"+'<span class="errorDisplayShortMessage"></span>'+"</div>"+'<span class="errorDisplayRetriever"></span>';var detailDisplayHtml=""+'<div class="errorDisplayDetails">'+'<span class="errorDisplayOptions">'+'<a href="" class="errorDisplayXButton">&#10006;</a>'+"</span>"+'<span class="errorDisplayFullMessageArea"></span>'+"</div>";var detailDisplayListHtml=""+'<ul class="errorDisplayFullMessageList">'+"</ul>";var methods={init:function(options){return this.each(function(){var $this=$(this),data=$this.data("errorDisplay"),settings=$.extend({fontColor:"#ff0000",backgroundColor:"#ffffff",displayTime:1e3,indicatorColor:"#ff0000"},options);if(!data){$this.append(errorDisplayHtml);$this.find(".errorDisplay").width($this.width()-6);var detailDisplay=$(detailDisplayHtml).appendTo($("body"));var detailDisplayList=$(detailDisplayListHtml);$(detailDisplay).find(".errorDisplayXButton").click(function(event){event.preventDefault();$(detailDisplay).find(".errorDisplayOptions").hide();$(detailDisplay).hide();$this.find(".errorDisplayRetriever").css("background-color",settings.indicatorColor).show()});$this.data("errorDisplay",{detailDisplay:detailDisplay,detailDisplayList:detailDisplayList,fontColor:settings.fontColor,backgroundColor:settings.backgroundColor,displayTime:settings.displayTime,indicatorColor:settings.indicatorColor});$this.find(".errorDisplayXButton").click(function(event){event.preventDefault();$this.find(".errorDisplayOptions").hide();$this.find(".errorDisplay").slideUp(settings.displayTime,function(){$this.find(".errorDisplayRetriever").show()})});$this.find(".errorDisplayDetailsButton").click(function(event){event.preventDefault();$this.find(".errorDisplay").off();$this.find(".errorDisplay").hide();$this.find(".errorDisplayRetriever").hide();$(detailDisplay).find(".errorDisplayFullMessageArea").empty().append($(detailDisplayList));$(detailDisplay).find(".errorDisplayOptions").show();$(detailDisplay).show()})}return this})},displayError:function(fullMessage,shortMessage,options){return this.each(function(){var $this=$(this),data=$this.data("errorDisplay"),settings=$.extend({fontColor:data.fontColor,backgroundColor:data.backgroundColor,displayTime:data.displayTime,indicatorColor:data.indicatorColor},options);$this.find(".errorDisplayRetriever").hide();$this.find(".errorDisplayOptions").hide();$this.find(".errorDisplayShortMessage").css("color",settings.fontColor);$this.find(".errorDisplay").css("background-color",settings.backgroundColor);$this.find(".errorDisplayOptions").css("background-color",settings.backgroundColor);$this.find(".errorDisplayShortMessage").text(shortMessage);$this.find(".errorDisplay").show();$this.find(".errorDisplayRetriever").css("background-color",settings.indicatorColor);if(settings.displayTime!=-1){$this.find(".errorDisplay").slideUp(settings.displayTime,function(){$this.find(".errorDisplayRetriever").show()})}else{$this.find(".errorDisplayOptions").show();$this.find(".errorDisplay").show()}$(data.detailDisplayList).append($("<li>"+fullMessage+"</li>").css("color",settings.fontColor));$this.find(".errorDisplayRetriever").hover(function(event){event.preventDefault();$this.find(".errorDisplayOptions").hide();$this.find(".errorDisplayShortMessage").text(shortMessage).css("color",settings.fontColor);$this.find(".errorDisplay").slideDown(function(){$this.find(".errorDisplayOptions").show();$this.find(".errorDisplay").mouseleave(function(event){event.preventDefault();$this.find(".errorDisplayOptions").hide();$this.find(".errorDisplay").slideUp(settings.displayTime,function(){$this.find(".errorDisplayRetriever").show()})})});$this.find(".errorDisplayRetriever").hide()})})}};$.fn.errorDisplay=function(method){if(methods[method]){return methods[method].apply(this,Array.prototype.slice.call(arguments,1))}else if(typeof method==="object"||!method){return methods.init.apply(this,arguments)}else{$.error("Method "+method+" does not exist on jQuery.errorDisplay");return null}}})(jQuery);jQuery("head").append(jQuery("<style type=\"text/css\">.errorDisplay { font-family: Helvetica, sans-serif; color: #32446B; background-color: white; text-align: left; font-size: 12px; line-height: 12px; height: 45px; position: absolute; bottom: 0px; left: 0px; width: inherit; width: expression(this.parentNode.currentStyle['width']); border: solid; border-color: #A9BADE; border-style: ridge; display: none; } .errorDisplayRetriever{ height: 8px; background-color: #ff0000; border-top-right-radius: 10px; width: 8px; position: absolute; bottom: 0px; left: 0px; display: none; } .errorDisplayShortMessage{ overflow-x: hidden; overflow-y: hidden; white-space: nowrap; position: absolute; bottom: 0px; left: 0px; width: 95%; margin-top: 20px; margin-left: 10px; margin-bottom: 5px; } .errorDisplayXButton { text-decoration: none; font-size: 15px; margin-top: 2px; position: absolute; right: 3px; top: 0px; color: #4D68A3; } .errorDisplayDetailsButton { margin-left: 10px; margin-right: 10px; position: relative; } .errorDisplayDetails{ position: fixed; top: 25%; height: 100px; width: 75%; text-align: left; border: solid; border-color: #A9BADE; border-style: ridge; background-color: white; display: none; } .errorDisplayFullMessageArea { font-family: Helvetica, sans-serif; font-size: .833em; color: #32446B; height: 80px; width: inherit; width: expression(this.parentNode.currentStyle['width']); position: fixed; margin-top: 15px; } .errorDisplayFullMessageList { overflow: auto; white-space: nowrap; height: 80px; margin-top: 5px; } .errorDisplayOptions{ background-color: #FFFFFF; display: inline; } </style>"))},{}],4:[function(require,module,exports){"use strict";var Attr=function(name){var AttrList=require("./attr_list.js"),Validator=require("./validator.js");var validators=[],that=this,errorMessage="invalid setter call for "+name,defaultValueOrFunction,i,prop,addValidator,immutable=false,validator,listeners={};if(name===undefined||typeof name!=="string"){throw new Error("Attr: constructor requires a name parameter "+"which must be a string")}validator=function(thingBeingValidated){for(i=0;i<validators.length;++i){validators[i](thingBeingValidated)}return true};this.validatesWith=function(v){if(typeof v==="function"){validators.push(new Validator(v));return this}else{throw new Error("Attr: validator must be a function")}};this.defaultsTo=function(value){defaultValueOrFunction=value;return this};this.isReadOnly=function(){immutable=true;return this};this.isWritable=function(){immutable=false;return this};this.on=function(event,listener){if(event!=="set"&&event!=="get"){throw new Error("Attr: first argument to the 'on' method "+"should be 'set' or 'get'")}else if(typeof listener!=="function"){throw new Error("Attr: second argument to the 'on' method "+"should be a function")}else{listeners[event]=listener}};this.name=function(){return name};this.validator=function(){return validator};this.and=this;this.which=this;this.isImmutable=this.isReadOnly;this.isMutable=this.isWritable;this.clone=function(){var result,i;result=this instanceof AttrList?new AttrList(name):new Attr(name);for(i=0;i<validators.length;++i){result.validatesWith(validators[i])}result.defaultsTo(defaultValueOrFunction);if(immutable){result.isImmutable()}return result};this.addTo=function(obj){var attribute,listener,defaultValue;if(!obj||typeof obj!=="object"){throw new Error("Attr: addAttr method requires an object "+"parameter")}obj[name]=function(newValue){var preValue;if(newValue!==undefined){if(immutable&&attribute!==undefined){throw new Error("cannot set the immutable property "+name+" after it has been set")}else if(!validator(newValue)){throw new Error(errorMessage)}else{preValue=attribute;attribute=newValue;if(listeners.set!==undefined){listeners.set.call(obj,newValue,preValue)}}return obj}else{if(listeners.get!==undefined){listeners.get.call(obj,attribute)}return attribute}};defaultValue=typeof defaultValueOrFunction==="function"?defaultValueOrFunction():defaultValueOrFunction;if(defaultValue!==undefined&&validator(defaultValue)){obj[name](defaultValue)}else if(defaultValue!==undefined&&!validator(defaultValue)){throw new Error("Attr: Default value of "+defaultValue+" does not pass validation for "+name)}};addValidator=function(name){that[name]=function(param){validators.push(Validator.getValidator(name)(param));return that}};for(i=0;i<Validator.validators().length;++i){addValidator(Validator.validators()[i])}};module.exports=Attr},{"./attr_list.js":5,"./validator.js":8}],5:[function(require,module,exports){"use strict";var Attr=require("./attr.js");var AttrList=function(name){var that=this,listeners={};Attr.call(this,name);var delegate=function(obj,func){return function(){return obj[func].apply(obj,arguments)}};this.validateWith=this.validatesWith;this.defaultsTo=function(){};this.isImmutable=function(){};this.isMutable=function(){};this.eachOfWhich=this;this.on=function(event,listener){if(event!=="add"){throw new Error("AttrList: 'on' only responds to 'add' event")}if(typeof listener!=="function"){throw new Error("AttrList: 'on' requires a listener function as the second parameter")}listeners[event]=listener};this.addTo=function(obj){var prop,arr=[],actualList={};if(!obj||typeof obj!=="object"){throw new Error("AttrList: addTo method requires an object parameter")}else{actualList.pop=delegate(arr,"pop");actualList.add=function(item){if(that.validator()(item)){arr.push(item);if(listeners.add!==undefined){listeners.add.call(obj,item,actualList.size())}return this}else{throw new Error(that.errorMessage())}};actualList.replace=function(index,obj){if(typeof index!=="number"||parseInt(index,10)!==index){throw new Error("AttrList: replace method requires index parameter to be an integer")}if(index<0||index>=this.size()){throw new Error("AttrList: replace method index parameter out of bounds")}if(!that.validator()(obj)){throw new Error(that.errorMessage())}arr[index]=obj;return this};actualList.at=function(index){if(index<0||index>=this.size()){throw new Error("AttrList: Index out of bounds")}return arr[index]};actualList.get=actualList.at;actualList.size=function(){return arr.length};actualList.toJSON=function(JSONreps){var result=[],i,j;if(JSONreps!==undefined){for(i=0;i<JSONreps.length;++i){if(JSONreps[i].object===this){result=JSONreps[i].JSONrep}}}for(i=0;i<arr.length;++i){if(arr[i].toJSON){result.push(arr[i].toJSON(JSONreps))}else{result.push(arr[i])}}return result};obj[name]=function(){return actualList}}}};AttrList.prototype=new Attr("???");module.exports=AttrList},{"./attr.js":4}],6:[function(require,module,exports){"use strict";var Method=function(name,method){if(!name||typeof name!=="string"){throw new Error("Method: constructor requires a name parameter which must be a string")}else if(!method||typeof method!=="function"){throw new Error("Method: second parameter must be a function")}this.addTo=function(obj){if(!obj||typeof obj!=="object"){throw new Error("Method: addTo method requires an object parameter")}obj[name]=method}};module.exports=Method},{}],7:[function(require,module,exports){"use strict";require("../util/index_of.js");var models={};var getModel=function(name){if(typeof name!=="string"){throw new Error("Jermaine: argument to getModel must be a string")}if(models[name]===undefined){throw new Error("No model by the name of "+name+" found")}else{return models[name]}};var getModels=function(name){var model,result=[];for(model in models){result.push(model)}return result};var Model=function(specification){var methods={},attributes={},pattern,modelName,modified=true,requiredConstructorArgs=[],optionalConstructorArgs=[],parents=[],Method=require("./method.js"),Attr=require("./attr.js"),AttrList=require("./attr_list.js"),EventEmitter=require("../util/event_emitter.js"),property,listProperties,updateConstructor,isImmutable,initializer=function(){},constructor=function(){},model=function(){if(modified){model.validate();updateConstructor()}return constructor.apply(this,arguments)};if(arguments.length===1){if(typeof specification==="string"){modelName=specification;specification=undefined}}if(arguments.length>1){modelName=specification;specification=arguments[arguments.length-1]}if(specification&&typeof specification==="function"){model=new Model(modelName);specification.call(model);return model}else if(specification){throw new Error("Model: specification parameter must be a function")}if(modelName!==undefined&&typeof modelName==="string"){models[modelName]=model}else if(modelName!==undefined){throw new Error("Model: model name must be a string")}var hasAProperty=function(type,name){var Property,methodName,attribute;Property=type==="Attr"?Attr:AttrList;methodName=type==="Attr"?"hasA":"hasMany";modified=true;if(typeof name==="string"){attribute=new Property(name);attributes[name]=attribute;return attribute}else{throw new Error("Model: "+methodName+" parameter must be a string")}};property=function(type,name){var result;if(typeof name!=="string"){throw new Error("Model: expected string argument to "+type+" method, but recieved "+name)}result=type==="attribute"?attributes[name]:methods[name];if(result===undefined){throw new Error("Model: "+type+" "+name+" does not exist!")}return result};listProperties=function(type){var i,list=[],properties=type==="attributes"?attributes:methods;for(i in properties){if(properties.hasOwnProperty(i)){list.push(i)}}return list};updateConstructor=function(){constructor=function(){var i,j,err,attribute,attributeList=model.attributes(),methodList=model.methods(),emitter=new EventEmitter,attr,attrChangeListeners={},changeHandler,addProperties,that=this;if(!(this instanceof model)){if(arguments.length>0){return new model(arguments)}else{return new model}}this.emitter=function(){return emitter};this.emitter().removeJermaineChangeListener=function(attrName,obj){if(typeof attrName!=="string"){throw new Error("attrName must be a string")}else if(typeof obj!=="object"||obj.toJSON===undefined||obj.emitter===undefined){throw new Error("obj must be a jermaine object")}else{obj.emitter().removeListener("change",attrChangeListeners[attrName])}};this.emitter().addJermaineChangeListener=function(attrName,obj){if(typeof attrName!=="string"){throw new Error("attrName must be a string")}else if(typeof obj!=="object"||obj.toJSON===undefined||obj.emitter===undefined){throw new Error("obj must be a jermaine object")}else{if(attrChangeListeners[attrName]===undefined){attrChangeListeners[attrName]=function(data){var newData=[],emit=true;for(i=0;i<data.length&&emit===true;++i){newData.push(data[i]);if(data[i].origin===that){emit=false}}if(emit){newData.push({key:attrName,origin:that});that.emit("change",newData)}}}obj.emitter().on("change",attrChangeListeners[attrName])}};this.on=this.emitter().on;this.emit=this.emitter().emit;this.toJSON=function(JSONreps){var attributeValue,i,j,thisJSONrep={},attributeJSONrep;if(JSONreps===undefined){JSONreps=[];JSONreps.push({object:this,JSONrep:thisJSONrep})}else if(typeof JSONreps!=="object"){throw new Error("Instance: toJSON should not take a parameter (unless called recursively)")}else{for(i=0;i<JSONreps.length;++i){if(JSONreps[i].object===this){thisJSONrep=JSONreps[i].JSONrep}}}for(i=0;i<attributeList.length;++i){attributeJSONrep=null;attributeValue=this[attributeList[i]]();for(j=0;j<JSONreps.length;++j){if(JSONreps[j].object===attributeValue){attributeJSONrep=JSONreps[j].JSONrep}}if(attributeValue!==undefined&&attributeValue!==null&&attributeValue.toJSON!==undefined&&attributeJSONrep===null){attributeJSONrep=attributes[attributeList[i]]instanceof AttrList?[]:{};JSONreps.push({object:attributeValue,JSONrep:attributeJSONrep});JSONreps[JSONreps.length-1].JSONrep=attributeValue.toJSON(JSONreps)}if(attributeJSONrep===null){thisJSONrep[attributeList[i]]=attributeValue}else{thisJSONrep[attributeList[i]]=attributeJSONrep}}return thisJSONrep};this.toString=pattern!==undefined?pattern:function(){return"Jermaine Model Instance"};changeHandler=function(attr){if(!(attr instanceof AttrList)){attr.on("set",function(newValue,preValue){if(preValue!==undefined&&preValue!==null&&preValue.on!==undefined&&preValue.toJSON!==undefined&&preValue.emitter!==undefined){if(preValue.emitter().listeners("change").length<1){throw new Error("preValue should always have a listener defined if it is a model")}this.emitter().removeJermaineChangeListener(attr.name(),preValue)}if(newValue!==undefined&&newValue!==null&&newValue.on!==undefined&&newValue.toJSON!==undefined&&newValue.emitter!==undefined){this.emitter().addJermaineChangeListener(attr.name(),newValue)}this.emit("change",[{key:attr.name(),value:newValue,origin:this}])})}else{attr.on("add",function(newValue,newSize){this.emit("change",[{action:"add",key:attr.name(),value:newValue,origin:this}])})}};for(i=0;i<attributeList.length;++i){attr=model.attribute(attributeList[i]);changeHandler.call(this,attr)}for(i=0;i<attributeList.length+methodList.length;++i){if(i<attributeList.length){if(isImmutable){model.attribute(attributeList[i]).isImmutable()}model.attribute(attributeList[i]).addTo(this)}else{model.method(methodList[i-attributeList.length]).addTo(this)}}if(arguments.length>0){if(arguments.length<requiredConstructorArgs.length){err="Constructor requires ";for(i=0;i<requiredConstructorArgs.length;++i){err+=requiredConstructorArgs[i];err+=i===requiredConstructorArgs.length-1?"":", "}err+=" to be specified";throw new Error(err)}if(arguments.length>requiredConstructorArgs.length+optionalConstructorArgs.length){throw new Error("Too many arguments to constructor. Expected "+requiredConstructorArgs.length+" required arguments and "+optionalConstructorArgs.length+" optional arguments")}else{for(i=0;i<arguments.length;++i){attribute=i<requiredConstructorArgs.length?requiredConstructorArgs[i]:optionalConstructorArgs[i-requiredConstructorArgs.length];if(model.attribute(attribute)instanceof AttrList){if(Object.prototype.toString.call(arguments[i])!=="[object Array]"){throw new Error("Model: Constructor requires 'names' attribute to be set with an Array")}else{for(j=0;j<arguments[i].length;++j){this[attribute]().add(arguments[i][j])}}}else{this[attribute](arguments[i])}}}}initializer.call(this)}};model.hasA=function(attr){return hasAProperty("Attr",attr)};model.hasAn=model.hasA;model.hasSome=model.hasA;model.hasMany=function(attrs){return hasAProperty("AttrList",attrs)};model.isA=function(parent){var i,parentAttributes,parentMethods,isAModel;modified=true;isAModel=function(potentialModel){var i,M=new Model;for(i in M){if(M.hasOwnProperty(i)&&typeof potentialModel[i]!==typeof M[i]){return false}}return true};if(typeof parent!=="function"||!isAModel(parent)){throw new Error("Model: parameter sent to isA function must be a Model")}if(parents.length===0){parents.push(parent)}else{throw new Error("Model: Model only supports single inheritance at this time")}parentAttributes=parents[0].attributes();for(i=0;i<parentAttributes.length;++i){if(attributes[parentAttributes[i]]===undefined){attributes[parentAttributes[i]]=parents[0].attribute(parentAttributes[i]).clone();attributes[parentAttributes[i]].isMutable()}}parentMethods=parents[0].methods();for(i=0;i<parentMethods.length;++i){if(methods[parentMethods[i]]===undefined){methods[parentMethods[i]]=parents[0].method(parentMethods[i])}}for(i=0;i<parents.length;i++){model.prototype=new parents[i]}};model.isAn=model.isA;model.parent=function(){return parents[0].apply(this,arguments)};model.attribute=function(attr){return property("attribute",attr)};model.attributes=function(){return listProperties("attributes")};model.method=function(m){return property("method",m)};model.methods=function(){return listProperties("methods")};model.isBuiltWith=function(){var optionalParamFlag=false,i;modified=true;requiredConstructorArgs=[];optionalConstructorArgs=[];for(i=0;i<arguments.length;++i){if(typeof arguments[i]==="string"&&arguments[i].charAt(0)!=="%"){if(optionalParamFlag){throw new Error("Model: isBuiltWith requires parameters preceded with a % to be the final parameters before the optional function")}else{requiredConstructorArgs.push(arguments[i])}}else if(typeof arguments[i]==="string"&&arguments[i].charAt(0)==="%"){optionalParamFlag=true;optionalConstructorArgs.push(arguments[i].slice(1))}else if(typeof arguments[i]==="function"&&i===arguments.length-1){initializer=arguments[i]}else{throw new Error("Model: isBuiltWith parameters must be strings except for a function as the optional final parameter")}}};model.isImmutable=function(){isImmutable=true};model.looksLike=function(p){modified=true;pattern=p};model.respondsTo=function(methodName,methodBody){var m=new Method(methodName,methodBody);modified=true;methods[methodName]=m};model.validate=function(){var i,attributes=this.attributes(),methods=this.methods();for(i=0;i<requiredConstructorArgs.length;++i){try{this.attribute(requiredConstructorArgs[i])}catch(e){throw new Error(requiredConstructorArgs[i]+", specified in the isBuiltWith method, is not an attribute")}}for(i=0;i<optionalConstructorArgs.length;++i){try{this.attribute(optionalConstructorArgs[i])}catch(e){throw new Error(optionalConstructorArgs[i]+", specified in the isBuiltWith method, is not an attribute")}}for(i=0;i<attributes.length;i++){if(methods.indexOf(attributes[i])>-1){throw new Error("Model: invalid model specification to "+attributes[i]+" being both an attribute and method")}}if(isImmutable){for(i=0;i<attributes.length;i++){if(requiredConstructorArgs.indexOf(attributes[i])<0){throw new Error("immutable objects must have all attributes required in a call to isBuiltWith")}}}modified=false};return model};Model.getModel=getModel;Model.getModels=getModels;module.exports=Model},{"../util/event_emitter.js":10,"../util/index_of.js":11,"./attr.js":4,"./attr_list.js":5,"./method.js":6}],8:[function(require,module,exports){"use strict";require("../util/index_of.js");var Model=require("./model.js");var validators={};var Validator=function(spec){var validatorFunction=function(arg){var result,resultObject={},errorMessage;result=spec.call(resultObject,arg);if(!result){errorMessage=resultObject.message||"validator failed with parameter "+arg;throw new Error(errorMessage)}return result};return validatorFunction};Validator.addValidator=function(name,v,argValidator){if(name===undefined||typeof name!=="string"){throw new Error("addValidator requires a name to be specified as the first parameter")}if(v===undefined||typeof v!=="function"){throw new Error("addValidator requires a function as the second parameter")}if(argValidator!==undefined&&typeof argValidator!=="function"){throw new Error("addValidator third optional argument must be a "+"function")}if(validators[name]===undefined){validators[name]=function(expected){if(argValidator!==undefined){if(!argValidator(expected)){throw new Error("Validator: Invalid argument for "+name+" validator")}}return new Validator(function(val){var resultObject={actual:val,param:val},result=v.call(resultObject,expected);this.message=resultObject.message;return result})}}else{throw new Error("Validator '"+name+"' already defined")}};Validator.getValidator=function(name){var result;if(name===undefined){throw new Error("Validator: getValidator method requires a string parameter")}else if(typeof name!=="string"){throw new Error("Validator: parameter to getValidator method must be a string")}result=validators[name];if(result===undefined){throw new Error("Validator: '"+name+"' does not exist")}return result};Validator.validators=function(){var prop,result=[];for(prop in validators){if(validators.hasOwnProperty(prop)){result.push(prop)}}return result};Validator.addValidator("isGreaterThan",function(val){this.message=this.param+" should be greater than "+val;return this.param>val});Validator.addValidator("isLessThan",function(val){this.message=this.param+" should be less than "+val;return this.param<val});Validator.addValidator("isOneOf",function(val){this.message=this.param+" should be one of the set: "+val;
return val.indexOf(this.param)>-1});Validator.addValidator("isA",function(val){var types=["string","number","boolean","function","object"],models=Model.getModels();if(typeof val==="string"&&types.indexOf(val)>-1){this.message=this.param+" should be a "+val;return typeof this.param===val}else if(typeof val==="string"&&models.indexOf(val)>-1){this.message="parameter should be an instance of "+val;return this.param instanceof Model.getModel(val)}else if(val==="integer"){if(this.param.toString!==undefined){this.message=this.param.toString()+" should be an integer"}else{this.message="parameter should be an integer"}return typeof this.param==="number"&&parseInt(this.param,10)===this.param}},function(val){var typesAndModels=["string","number","boolean","function","object","integer"].concat(Model.getModels());return typesAndModels.indexOf(val)>=0});validators.isAn=validators.isA;module.exports=Validator},{"../util/index_of.js":11,"./model.js":7}],9:[function(require,module,exports){require("./util/index_of.js");var Model=require("./core/model.js");module.exports={Attr:require("./core/attr.js"),AttrList:require("./core/attr_list.js"),Model:Model,getModel:Model.getModel,getModels:Model.getModels,Validator:require("./core/validator.js"),Method:require("./core/method.js"),util:{EventEmitter:require("./util/event_emitter.js"),namespace:require("./util/namespace.js")}}},{"./core/attr.js":4,"./core/attr_list.js":5,"./core/method.js":6,"./core/model.js":7,"./core/validator.js":8,"./util/event_emitter.js":10,"./util/index_of.js":11,"./util/namespace.js":12}],10:[function(require,module,exports){"use strict";require("./index_of.js");var EventEmitter=function(){var that=this,listeners={};this.on=function(event,listener){if(typeof event!=="string"){throw new Error("EventEmitter: first argument to 'on' should be a string")}if(typeof listener!=="function"){throw new Error("EventEmitter: second argument to 'on' should be a function")}if(!listeners[event]){listeners[event]=[]}listeners[event].push(listener);return that};this.addListener=this.on;this.once=function(event,listener){var f=function(){listener(arguments);that.removeListener(event,f)};that.on(event,f);return that};this.removeListener=function(event,listener){var index;if(typeof event!=="string"){throw new Error("EventEmitter: first parameter to removeListener method must be a string representing an event")}if(typeof listener!=="function"){throw new Error("EventEmitter: second parameter must be a function to remove as an event listener")}if(listeners[event]===undefined||listeners[event].length===0){throw new Error("EventEmitter: there are no listeners registered for the '"+event+"' event")}index=listeners[event].indexOf(listener);if(index!==-1){listeners[event].splice(index,1)}return that};this.removeAllListeners=function(event){if(typeof event!=="string"){throw new Error("EventEmitter: parameter to removeAllListeners should be a string representing an event")}if(listeners[event]!==undefined){listeners[event]=[]}return that};this.setMaxListeners=function(number){return that};this.listeners=function(event){if(typeof event!=="string"){throw new Error("EventEmitter: listeners method must be called with the name of an event")}else if(listeners[event]===undefined){return[]}return listeners[event]};this.emit=function(event,data){var i,params;if(arguments.length>1){params=[]}for(i=1;i<arguments.length;++i){params.push(arguments[i])}if(listeners[event]!==undefined){for(i=0;i<listeners[event].length;i=i+1){listeners[event][i].apply(this,params)}}};return that};module.exports=EventEmitter},{"./index_of.js":11}],11:[function(require,module,exports){if(!Array.prototype.indexOf){Array.prototype.indexOf=function(searchElement){"use strict";if(this===null){throw new TypeError}var t=Object(this);var len=t.length>>>0;if(len===0){return-1}var n=0;if(arguments.length>0){n=Number(arguments[1]);if(n!==n){n=0}else if(n!==0&&n!==Infinity&&n!==-Infinity){n=(n>0||-1)*Math.floor(Math.abs(n))}}if(n>=len){return-1}var k=n>=0?n:Math.max(len-Math.abs(n),0);for(;k<len;k++){if(k in t&&t[k]===searchElement){return k}}return-1}}module.exports=undefined},{}],12:[function(require,module,exports){module.exports=function namespace(ns,aliases,func){var nsRegExp=/^([a-zA-Z]+)(\.[a-zA-Z]*)*$/,nsArray,currentNS,i;if(ns.match(nsRegExp)===null||ns==="window"){throw new Error("namespace: "+ns+" is a malformed namespace string")}if(aliases!==undefined&&func===undefined){if(typeof aliases==="function"){func=aliases;aliases=undefined}else if(typeof aliases==="object"){throw new Error("namespace: if second argument exists, final function argument must exist")}else if(typeof aliases!=="object"){throw new Error("namespace: second argument must be an object of aliased local namespaces")}}else if(typeof aliases!=="object"&&typeof func==="function"){throw new Error("namespace: second argument must be an object of aliased local namespaces")}nsArray=ns.split(".");if(nsArray[0]==="window"){currentNS=window}else{currentNS=window[nsArray[0]]===undefined?window[nsArray[0]]={}:window[nsArray[0]]}if(func!==undefined&&typeof func!=="function"){throw new Error("namespace: last parameter must be a function that accepts a namespace parameter")}for(i=1;i<nsArray.length;i=i+1){if(currentNS[nsArray[i]]===undefined){currentNS[nsArray[i]]={}}currentNS=currentNS[nsArray[i]]}if(aliases===undefined&&func){func(currentNS)}else if(func){for(i in aliases){if(aliases.hasOwnProperty(i)){aliases[i]=namespace(aliases[i])}}func.call(aliases,currentNS)}return currentNS}},{}],13:[function(require,module,exports){(function($){var types=["DOMMouseScroll","mousewheel"];if($.event.fixHooks){for(var i=types.length;i;){$.event.fixHooks[types[--i]]=$.event.mouseHooks}}$.event.special.mousewheel={setup:function(){if(this.addEventListener){for(var i=types.length;i;){this.addEventListener(types[--i],handler,false)}}else{this.onmousewheel=handler}},teardown:function(){if(this.removeEventListener){for(var i=types.length;i;){this.removeEventListener(types[--i],handler,false)}}else{this.onmousewheel=null}}};$.fn.extend({mousewheel:function(fn){return fn?this.bind("mousewheel",fn):this.trigger("mousewheel")},unmousewheel:function(fn){return this.unbind("mousewheel",fn)}});function handler(event){var orgEvent=event||window.event,args=[].slice.call(arguments,1),delta=0,returnValue=true,deltaX=0,deltaY=0;event=$.event.fix(orgEvent);event.type="mousewheel";if(orgEvent.wheelDelta){delta=orgEvent.wheelDelta/120}if(orgEvent.detail){delta=-orgEvent.detail/3}deltaY=delta;if(orgEvent.axis!==undefined&&orgEvent.axis===orgEvent.HORIZONTAL_AXIS){deltaY=0;deltaX=-1*delta}if(orgEvent.wheelDeltaY!==undefined){deltaY=orgEvent.wheelDeltaY/120}if(orgEvent.wheelDeltaX!==undefined){deltaX=-1*orgEvent.wheelDeltaX/120}args.unshift(event,delta,deltaX,deltaY);return($.event.dispatch||$.event.handle).apply(this,args)}})(jQuery)},{}],14:[function(require,module,exports){(function($){var defaults={fullscreen:false,scale:false,defaultEventHandling:true,preopen:function(){},postopen:function(){},preclose:function(){},postclose:function(){},preresize:function(){},postresize:function(){}};var methods={open:function(){var clone=this.clone(true),data=this.data("lightbox"),w,h;data.contents=clone;data.preopen.call(this);clone=data.contents;var cloneData=clone.data("lightbox");data.overlay=$("<div/>").css({position:"fixed",left:"0px",top:"0px",height:"100%","min-height":"100%",width:"100%","z-index":"9999","background-color":"black",opacity:"0.5"}).appendTo("body");data.box=$("<div/>").css({position:"fixed","z-index":"9999"}).appendTo("body");data.box.append(clone);if(data.fullscreen===true){w=window.innerWidth;h=window.innerHeight}else{w=clone.width();h=clone.height();if(data.scale===true){var r=computeRatio(w,h);w=parseInt(w*r,10);h=parseInt(h*r,10)}}scaleElement(data.box,w,h);positionElement(data.box,w,h);scaleElement(clone,w,h);positionElement(clone,w,h);clone.css("position","fixed").css("z-index",9999);data.box.append($('<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NkY4OUE4QUE2MDEyMTFFMkFBMEM4Q0Y2RTlFNkI4QzEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NkY4OUE4QUI2MDEyMTFFMkFBMEM4Q0Y2RTlFNkI4QzEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo2Rjg5QThBODYwMTIxMUUyQUEwQzhDRjZFOUU2QjhDMSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo2Rjg5QThBOTYwMTIxMUUyQUEwQzhDRjZFOUU2QjhDMSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PvXC/ukAAAcjSURBVHjaxFlpTFVXEJ7HDrIIUkCRzYitQJQK/kBTxAop2EQhaqkEqjZqK9FGa+2Cf2pabdIlEbE0FEkTArFaF6CAKCCStG5BokXAglpUIkKqgn0KyNb5jve+PB9vfyyTfIF7373nzJkzZ76ZuYqRkRGyUKwYoYwQxqsMD4aj9FsPo4Nxg1HP6LR0Mhsz37NlxDNSGLHt7e2e9+/fpwcPHtDTp0/p+fPn4iFHR0eaOnUqTZ8+nQICAsjV1bWJb5cwChiN5kysMNHCsNwHjE+uXr3qe+nSJWpsbCSlUmnUyzNmzKDw8HCKiooiX1/fGr61l1E9XgonMjLPnDnjX1NTI6xpiURGRtLSpUspJCSklC8/YvwzVgo7M7Lr6+vTzp49S9evX6exlISEBEpOTsYWfcgotFRhX0ZFeXl52JEjR2i8JDg4mJYtWwZXyeTLjxnD5ig8m1F17NixgJKSEhpvsbGxoZSUFIqNjf2VL1MZQ6Yo7M34o7CwcPapU6doImXdunUUFxf3E/+bbqzCCFm1x48fjzpx4gRNhmzYsAGWxkHM0hb0NeWrioqKKFaYsJjJwOnTp6HH94zXDSkczth59OjRSVMWYCKi3NxcO9blZ4a1PqbL5AdtwFa6ZM6cOWRvb09WVlakUChU95uamlQMpynu7u4gCvEOIEtnZyd1dHRofaeqqopmzZoVydHjfb7M1aZwDLNWdGVlpV7/6u3tpSVLlgjKtbW1Vd338vKSt/IlsbOzE8w2c+ZMcnNzU73z5MkTOnToEOkLq0xSCHdf8L+/MAY1Fd6JCYeHh/Uq3NbWRq2trbR8+XJhOdlisCDyiWvXrr30/Pz588VvgYGB5OnpSdbWL3Y4MzOT9O0k5NatW3ThwoUgXnASX/6m7sNeSGYuXrxolI9hu27fvi1cYsqUKeTs7CyUx+n28PBQPRcUFERz584VOYSPjw+SH/FsbW0tMXMaNde5c+eg33uahy6JrWszMDAgLGwM8vPz6d69e9Tf3y8GgOW8vb1py5Yt4ncoFhERIRQFkLlhgTdv3hSuYOw8V65cwfBvMVzUFY5paGgwehDg0aNHxCwo/g4ODr4I4OyfsOiKFSsE/Pz8hHVhWbgO/H///v0mzQMjstJw/DfUFV7U3Nxscvipq6sjJEQ4QLLvI4KsWrVKWBd+CxcB7UI4AtHdu3dNnufGDeT/FCUfOieGX1dXF5lTfRQXFwtLQkH4s+zXcuiTla2urhan3hzBIllekxUO5BsKQ9FBlzx79owKCgrI399fuAQUhT/L0QACIsjLyyNzyzEp9w6SXcIVk5riV5qAQkg/u7u7aWhoaFTcRgh7/Pix2eNL4c9VtrCdHB0sEQz68OFDcnFxIScnJ9V9BwcHsQhLxpcikb1s4X5spSUWBiEsXLhQe8LNPr1t2zaxCHPHl9ixV1a4B4fE3EQFPsv5K02bNk0A16PKFmY65LnmzoFdYvlPdok2PuVwPGtzti0mJkZECeQKYDv1w6ZKsNlCWBQSJLCkqYJYztIqW7gPSoOlTF15aGioinrhFnJic/LkSVH+I3vDc3ALMN369euRgZk8DwzC8rc6cZznctskv0J2tnjx4lHU29LSIths3759In729fW9yAE4JuOd9PR0k304LCwMQ/yprnD1ggULTBoEPQX4JqyLyCBT765du8TvUDY7O1tQN6KQXGjCMBs3bjR6HrgYk1K/psLFCQkJ/RjQmC2CssjEoCz8VmazrKwsEdrk5y5fviyYsKenRxWfcSgTExPF7hgzF56T2lu96gp3Q2kcDEMrRsWBrg2UxRbLUYHrQCoqKhr1PFgQOTLISfZnhLitW7eK7M7QfPHxaOFRvraa7rukpCSD4YWrWeGzaPBhYiiANHPPnj0630M6CRfRTEW3b9+udz704djCaBqWayuR6vjElyUnJ799+PBhreEFHUhUG6BgHC45hCEh1xcSkezn5OTQvHnzVIuEIIpgx6RsbJTAgKji1TtBmn2JYMZfK1eudNBVHE6UrF27lnbs2IFy403GiK4yH8H5y7S0tEkt87ETrKxSau2OGGpof7t69eoYpVIZj1M/0YLqBAWA1M1sMabzgxW9y6zUsGnTpgm1LCIOiIVD7F5drVd93UsfRiUn3mEHDx4cd8siTIK616xZ8wM6/Ob2h90ZRRw1oqG0oT6CuRIdHU0HDhyAIp/DJS3twMPPv2Z8mpGRoSgrKxszRUHnaAts3ry5C01L9Xg7Ft84FjF+ZEYLRzkk9QvMbl7jYO3evRvxNY+Rwfh3PL4i4ZC+w/iMc9vw0tJStJJEc8SQ4ECBuZA/p6amDkitp28YJn00UVjwYTFCau3HcYEZCqXv3LkjEh18BkNuDFYDBaM/wSyK5OU843cGqLRrIr7T6ZJXpK+hwdKXUDcwLwPBv11KvpulYsEiGSuFJ0z+F2AAyCap34M2ukUAAAAASUVORK5CYII=" alt="close"/>').css({position:"absolute",right:"-9px",top:"-8px",width:"44px",height:"44px","z-index":"10000"}).click(function(){clone.lightbox("close")}));cloneData.contentWidth=w;cloneData.contentHeight=h;cloneData.opened=true;cloneData.resizeHandler=function(){clone.lightbox("resize")};$(window).on("resize",cloneData.resizeHandler);$(window).on("orientationchange",cloneData.resizeHandler);data.postopen.call(this);return this},close:function(){var data=this.data("lightbox");data.preclose.call(this);$(window).off("resize",data.resizeHandler);$(window).off("orientationchange",data.resizeHandler);data.opened=false;data.overlay.remove();data.overlay=undefined;data.postclose.call(this);data.box.remove();return this},resize:function(){var data=this.data("lightbox"),w,h;data.preresize.call(this);if(data.fullscreen===true){w=window.innerWidth;h=window.innerHeight}else{w=data.contentWidth;h=data.contentHeight;if(data.scale===true){var r=computeRatio(w,h);w=parseInt(w*r,10);h=parseInt(h*r,10)}}scaleElement(data.box,w,h);positionElement(data.box,w,h);scaleElement(data.contents,w,h);positionElement(data.contents,w,h);data.contentWidth=w;data.contentHeight=h;data.postresize.call(this);return this},toggle:function(){if(this.data("lightbox").opened===true){this.lightbox("close")}else{this.lightbox("open")}return this},init:function(options){return this.each(function(){var $this=$(this),data=$this.data("lightbox");if(!data){var settings=$.extend(defaults,options,{opened:false});$this.data("lightbox",settings)}if($this.data("lightbox").defaultEventHandling===true){$this.on("touchstart",function(e){var t2=e.timeStamp,t1=$this.data("lightbox").lastTouch||t2,dt=t2-t1,fingers=e.originalEvent.touches.length;$this.data("lightbox").lastTouch=t2;if(!dt||dt>500||fingers>1){return}e.preventDefault();$this.lightbox("toggle")})}return this})}};$.fn.lightbox=function(method){if(methods[method]){return methods[method].apply(this,Array.prototype.slice.call(arguments,1))}else if(typeof method==="object"||!method){return methods.init.apply(this,arguments)}else{$.error("Method "+method+" does not exist on jQuery.lightbox");return null}};var computeRatio=function(originalWidth,originalHeight){var wr=originalWidth>0?window.innerWidth/originalWidth:1,hr=originalHeight>0?window.innerHeight/originalHeight:1,r=Math.min(wr,hr);return r};var scaleElement=function(elem,width,height){elem.css("width",width+"px").css("height",height+"px")};var positionElement=function(elem,width,height){var left=(window.innerWidth-width)/2,top=(window.innerHeight-height)/2;if(left<0){left=0}if(top<0){top=0}elem.css("left",left+"px").css("top",top+"px")}})(jQuery)},{}],15:[function(require,module,exports){(function(){"use strict";var lastTime=0;var vendors=["ms","moz","webkit","o"];for(var x=0;x<vendors.length&&!window.requestAnimationFrame;++x){window.requestAnimationFrame=window[vendors[x]+"RequestAnimationFrame"];window.cancelAnimationFrame=window[vendors[x]+"CancelAnimationFrame"]||window[vendors[x]+"CancelRequestAnimationFrame"]}if(!window.requestAnimationFrame){window.requestAnimationFrame=function(callback,element){var currTime=(new Date).getTime();var timeToCall=Math.max(0,16-(currTime-lastTime));var id=window.setTimeout(function(){callback(currTime+timeToCall)},timeToCall);lastTime=currTime+timeToCall;return id}}if(!window.cancelAnimationFrame){window.cancelAnimationFrame=function(id){clearTimeout(id)}}})()},{}],16:[function(require,module,exports){var sprintf=function(){function get_type(variable){return Object.prototype.toString.call(variable).slice(8,-1).toLowerCase()}function str_repeat(input,multiplier){for(var output=[];multiplier>0;output[--multiplier]=input){}return output.join("")}var str_format=function(){if(!str_format.cache.hasOwnProperty(arguments[0])){str_format.cache[arguments[0]]=str_format.parse(arguments[0])}return str_format.format.call(null,str_format.cache[arguments[0]],arguments)};str_format.object_stringify=function(obj,depth,maxdepth,seen){var str="";if(obj!=null){switch(typeof obj){case"function":return"[Function"+(obj.name?": "+obj.name:"")+"]";break;case"object":if(obj instanceof Error){return"["+obj.toString()+"]"};if(depth>=maxdepth)return"[Object]";if(seen){seen=seen.slice(0);seen.push(obj)}if(obj.length!=null){str+="[";var arr=[];for(var i in obj){if(seen&&seen.indexOf(obj[i])>=0)arr.push("[Circular]");else arr.push(str_format.object_stringify(obj[i],depth+1,maxdepth,seen))}str+=arr.join(", ")+"]"}else if("getMonth"in obj){return"Date("+obj+")"}else{str+="{";var arr=[];for(var k in obj){if(obj.hasOwnProperty(k)){if(seen&&seen.indexOf(obj[k])>=0)arr.push(k+": [Circular]");else arr.push(k+": "+str_format.object_stringify(obj[k],depth+1,maxdepth,seen))}}str+=arr.join(", ")+"}"}return str;break;case"string":return'"'+obj+'"';break}}return""+obj};str_format.format=function(parse_tree,argv){var cursor=1,tree_length=parse_tree.length,node_type="",arg,output=[],i,k,match,pad,pad_character,pad_length;for(i=0;i<tree_length;i++){node_type=get_type(parse_tree[i]);if(node_type==="string"){output.push(parse_tree[i])}else if(node_type==="array"){match=parse_tree[i];if(match[2]){arg=argv[cursor];for(k=0;k<match[2].length;k++){if(!arg.hasOwnProperty(match[2][k])){throw new Error(sprintf('[sprintf] property "%s" does not exist',match[2][k]))}arg=arg[match[2][k]]}}else if(match[1]){arg=argv[match[1]]}else{arg=argv[cursor++]}if(/[^sO]/.test(match[8])&&get_type(arg)!="number"){throw new Error(sprintf('[sprintf] expecting number but found %s "'+arg+'"',get_type(arg)))}switch(match[8]){case"b":arg=arg.toString(2);break;case"c":arg=String.fromCharCode(arg);break;case"d":arg=parseInt(arg,10);break;case"e":arg=match[7]?arg.toExponential(match[7]):arg.toExponential();break;case"f":arg=match[7]?parseFloat(arg).toFixed(match[7]):parseFloat(arg);break;case"O":arg=str_format.object_stringify(arg,0,parseInt(match[7])||5);break;case"o":arg=arg.toString(8);break;case"s":arg=(arg=String(arg))&&match[7]?arg.substring(0,match[7]):arg;break;case"u":arg=Math.abs(arg);break;case"x":arg=arg.toString(16);break;case"X":arg=arg.toString(16).toUpperCase();break}arg=/[def]/.test(match[8])&&match[3]&&arg>=0?"+"+arg:arg;pad_character=match[4]?match[4]=="0"?"0":match[4].charAt(1):" ";pad_length=match[6]-String(arg).length;pad=match[6]?str_repeat(pad_character,pad_length):"";output.push(match[5]?arg+pad:pad+arg)}}return output.join("")};str_format.cache={};str_format.parse=function(fmt){var _fmt=fmt,match=[],parse_tree=[],arg_names=0;while(_fmt){if((match=/^[^\x25]+/.exec(_fmt))!==null){parse_tree.push(match[0])}else if((match=/^\x25{2}/.exec(_fmt))!==null){parse_tree.push("%")}else if((match=/^\x25(?:([1-9]\d*)\$|\(([^\)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-fosOuxX])/.exec(_fmt))!==null){if(match[2]){arg_names|=1;var field_list=[],replacement_field=match[2],field_match=[];if((field_match=/^([a-z_][a-z_\d]*)/i.exec(replacement_field))!==null){field_list.push(field_match[1]);while((replacement_field=replacement_field.substring(field_match[0].length))!==""){if((field_match=/^\.([a-z_][a-z_\d]*)/i.exec(replacement_field))!==null){field_list.push(field_match[1])}else if((field_match=/^\[(\d+)\]/.exec(replacement_field))!==null){field_list.push(field_match[1])}else{throw new Error("[sprintf] "+replacement_field)}}}else{throw new Error("[sprintf] "+replacement_field)}match[2]=field_list}else{arg_names|=2}if(arg_names===3){throw new Error("[sprintf] mixing positional and named placeholders is not (yet) supported")}parse_tree.push(match)}else{throw new Error("[sprintf] "+_fmt)}_fmt=_fmt.substring(match[0].length)}return parse_tree};return str_format}();var vsprintf=function(fmt,argv){var argvClone=argv.slice();argvClone.unshift(fmt);return sprintf.apply(null,argvClone)};module.exports=sprintf;sprintf.sprintf=sprintf;sprintf.vsprintf=vsprintf},{}],17:[function(require,module,exports){var jermaine=require("../../lib/jermaine/src/jermaine.js");var Data=require("./data.js"),DataValue=require("./data_value.js");var ArrayData=new jermaine.Model(function(){var ArrayData=this;this.isA(Data);this.hasAn("array");this.hasA("stringArray");this.isBuiltWith("columns","stringArray",function(){this.init();this.addListener("listenerAdded",function(event){if(event.targetType==="dataReady"){var data=this.array();event.listener(data[0][0],data[data.length-1][0])}})});this.respondsTo("getIterator",function(columnIds,min,max,buffer){return ArrayData.getArrayDataIterator(this,columnIds,min,max,buffer)});this.respondsTo("getBounds",function(columnNumber){var data=this.array(),min=data[0][columnNumber],max=min,i;for(i=1;i<data.length;i++){if(data[i][columnNumber]<min){min=data[i][columnNumber]}if(data[i][columnNumber]>max){max=data[i][columnNumber]}}return[min,max]});ArrayData.getArrayDataIterator=function(arrayData,columnIds,min,max,buffer){var i,j,firstIndex,lastIndex,currentIndex,columnIndices,array=arrayData.array();buffer=buffer||0;if(Object.prototype.toString.apply(columnIds)!=="[object Array]"){throw new Error("ArrayData: getIterator method requires that the first parameter be an array of strings")}else{for(i=0;i<columnIds.length;++i){if(typeof columnIds[i]!=="string"){throw new Error("ArrayData: getIterator method requires that the first parameter be an array of strings")}}}if(!DataValue.isInstance(min)||!DataValue.isInstance(max)){throw new Error("ArrayData: getIterator method requires the second and third argument to be number values")}if(typeof buffer!=="number"){throw new Error("ArrayData: getIterator method requires last argument to be an integer")}if(array.length===0){return{next:function(){},hasNext:function(){return false}}}for(firstIndex=0;firstIndex<array.length;++firstIndex){if(array[firstIndex][0].ge(min)){break}}firstIndex=firstIndex-buffer;if(firstIndex<0){firstIndex=0}if(firstIndex===array.length-1){lastIndex=firstIndex}else{for(lastIndex=firstIndex;lastIndex<array.length-1;++lastIndex){if(array[lastIndex+1][0].gt(max)){break}}}lastIndex=lastIndex+buffer;if(lastIndex>array.length-1){lastIndex=array.length-1}columnIndices=[];for(j=0;j<columnIds.length;++j){var k=arrayData.columnIdToColumnNumber(columnIds[j]);columnIndices.push(k)}currentIndex=firstIndex;return{next:function(){var projection=[],i;if(currentIndex>lastIndex){return null}for(i=0;i<columnIndices.length;++i){projection.push(array[currentIndex][columnIndices[i]])}++currentIndex;return projection},hasNext:function(){return currentIndex<=lastIndex}}};ArrayData.textToDataValuesArray=function(dataVariableArray,text){var dataValues=[],lines=text.split("\n"),i;for(i=0;i<lines.length;++i){if(/\d/.test(lines[i])){var stringValuesThisRow=lines[i].split(/\s*,\s*/),dataValuesThisRow=[],j;if(stringValuesThisRow.length===dataVariableArray.length){for(j=0;j<stringValuesThisRow.length;++j){dataValuesThisRow.push(DataValue.parse(dataVariableArray[j].type(),stringValuesThisRow[j]))}dataValues.push(dataValuesThisRow)}}}return dataValues};ArrayData.textToStringArray=function(dataVariables,text){var stringValues=[],lines=text.split("\n"),stringValuesThisRow,numColumns,i;for(i=0;i<lines.length;++i){lines[i]=lines[i].replace(/^\s+/,"").replace(/\s+$/,"").replace(/\s*,\s*/g,",").replace(/\s+/g,",")}for(i=0;i<lines.length;++i){if(/\d/.test(lines[i])){numColumns=lines[i].split(/,/).length;break}}for(i=0;i<lines.length;++i){if(/\d/.test(lines[i])){stringValuesThisRow=lines[i].split(/,/);if(stringValuesThisRow.length===numColumns){stringValues.push(stringValuesThisRow)}else{throw new Error("Data Parsing Error: The line '"+lines[i]+"' has "+stringValuesThisRow.length+" data columns when it requires "+numColumns+" columns")}}}return stringValues};ArrayData.stringArrayToDataValuesArray=function(dataVariableArray,stringArray){var dataValues=[],dataValuesThisRow,i,j;for(i=0;i<stringArray.length;++i){dataValuesThisRow=[];for(j=0;j<stringArray[i].length;++j){dataValuesThisRow.push(DataValue.parse(dataVariableArray[j].type(),stringArray[i][j]))}dataValues.push(dataValuesThisRow)}return dataValues}});module.exports=ArrayData},{"../../lib/jermaine/src/jermaine.js":9,"./data.js":26,"./data_value.js":30}],18:[function(require,module,exports){var jermaine=require("../../lib/jermaine/src/jermaine.js");var utilityFunctions=require("../util/utilityFunctions.js"),defaultValues=utilityFunctions.getDefaultValuesFromXSD(),attributes=utilityFunctions.getKeys(defaultValues.horizontalaxis),Displacement=require("../math/displacement.js"),Point=require("../math/point.js"),DataMeasure=require("../core/data_measure.js"),RGBColor=require("../math/rgb_color.js"),Enum=require("../math/enum.js"),EventEmitter=require("./event_emitter.js"),Text=require("../core/text.js"),AxisBinding=require("./axis_binding.js"),AxisTitle=require("./axis_title.js"),DataValue=require("./data_value.js"),Grid=require("./grid.js"),Labeler=require("./labeler.js"),Pan=require("./pan.js"),Zoom=require("./zoom.js"),Util=require("../math/util.js"),Orientation=new Enum("AxisOrientation");var Axis=new jermaine.Model("Axis",function(){this.isA(EventEmitter);this.hasA("title").which.validatesWith(function(title){return title instanceof AxisTitle});this.hasMany("labelers").eachOfWhich.validateWith(function(labelers){return labelers instanceof Labeler});this.hasA("grid").which.validatesWith(function(grid){return grid instanceof Grid});this.hasA("pan").which.validatesWith(function(pan){return pan instanceof Pan});this.hasA("zoom").which.validatesWith(function(zoom){return zoom instanceof Zoom});this.hasA("binding").which.validatesWith(function(binding){return binding===null||binding instanceof AxisBinding});this.hasAn("id").which.isA("string");this.hasA("type").which.isOneOf(DataValue.types());this.hasA("length").which.validatesWith(function(length){return length instanceof Displacement});this.hasA("position").which.validatesWith(function(position){return position instanceof Point});this.hasA("pregap").which.isA("number");this.hasA("postgap").which.isA("number");this.hasAn("anchor").which.isA("number");this.hasA("base").which.validatesWith(function(base){return base instanceof Point});this.hasA("visible").which.isA("boolean").and.which.defaultsTo(true);this.hasA("min").which.isA("string");this.hasA("dataMin").which.validatesWith(DataValue.isInstance);this.respondsTo("hasDataMin",function(){return this.dataMin()!==undefined});this.hasA("minoffset").which.isA("number");this.hasA("minposition").which.validatesWith(function(minposition){return minposition instanceof Displacement});this.hasA("max").which.isA("string");this.hasA("dataMax").which.validatesWith(DataValue.isInstance);this.respondsTo("hasDataMax",function(){return this.dataMax()!==undefined});this.hasA("maxoffset").which.isA("number");this.hasA("maxposition").which.validatesWith(function(maxposition){return maxposition instanceof Displacement});this.hasA("positionbase").which.isA("string");this.hasA("color").which.validatesWith(function(color){return color instanceof RGBColor});this.hasA("tickcolor").which.validatesWith(function(color){return color===null||color instanceof RGBColor});this.hasA("tickwidth").which.isA("integer");this.hasA("tickmin").which.isA("integer");this.hasA("tickmax").which.isA("integer");this.hasA("highlightstyle").which.validatesWith(function(highlightstyle){return typeof highlightstyle==="string"});this.hasA("linewidth").which.isA("integer");this.hasA("orientation").which.validatesWith(Orientation.isInstance);this.isBuiltWith("orientation",function(){this.grid(new Grid);this.zoom(new Zoom);this.pan(new Pan)});this.hasA("pixelLength").which.isA("number");this.hasA("parallelOffset").which.isA("number");this.hasA("perpOffset").which.isA("number");this.hasA("axisToDataRatio").which.isA("number");this.respondsTo("initializeGeometry",function(graph,graphicsContext){var plotBox=graph.plotBox(),position=this.position(),base=this.base(),pixelLength,i;if(this.orientation()===Axis.HORIZONTAL){pixelLength=this.length().calculateLength(plotBox.width());this.pixelLength(pixelLength);this.parallelOffset(position.x()+(base.x()+1)*plotBox.width()/2-(this.anchor()+1)*pixelLength/2);this.perpOffset(position.y()+(base.y()+1)*plotBox.height()/2)}else{pixelLength=this.length().calculateLength(plotBox.height());this.pixelLength(pixelLength);this.parallelOffset(position.y()+(base.y()+1)*plotBox.height()/2-(this.anchor()+1)*pixelLength/2);this.perpOffset(position.x()+(base.x()+1)*plotBox.width()/2)}this.minoffset(this.minposition().calculateCoordinate(pixelLength));this.maxoffset(pixelLength-this.maxposition().calculateCoordinate(pixelLength));if(this.hasDataMin()&&this.hasDataMax()){this.computeAxisToDataRatio()}for(i=0;i<this.labelers().size();++i){this.labelers().at(i).initializeGeometry(graph)}if(this.title()){this.title().initializeGeometry(graph,graphicsContext)}});this.respondsTo("computeAxisToDataRatio",function(){if(this.hasDataMin()&&this.hasDataMax()){this.axisToDataRatio((this.pixelLength()-this.maxoffset()-this.minoffset())/(this.dataMax().getRealValue()-this.dataMin().getRealValue()))}});this.respondsTo("dataValueToAxisValue",function(v){return this.axisToDataRatio()*(v.getRealValue()-this.dataMin().getRealValue())+this.minoffset()+this.parallelOffset()});this.respondsTo("axisValueToDataValue",function(a){return DataValue.create(this.type(),this.dataMin().getRealValue()+(a-this.minoffset()-this.parallelOffset())/this.axisToDataRatio())});this.hasA("currentLabeler").which.validatesWith(function(labeler){return labeler===null||labeler instanceof Labeler});this.hasA("currentLabelDensity").which.isA("number");this.hasA("currentLabelerIndex").which.isA("number");this.respondsTo("destroy",function(){if(this.binding()){this.binding().removeAxis(this)}});this.respondsTo("prepareRender",function(graphicsContext){if(!this.hasDataMin()||!this.hasDataMax()){return}var currentLabeler,currentLabelDensity=0,storedDensity=0,densityThreshold=.8,labelers=this.labelers(),nlabelers=labelers.size(),index=this.currentLabelerIndex(),storedIndex;if(nlabelers<=0){currentLabeler=null}else{var flag=true,lastLabelerIndex=labelers.size()-1;if(index===undefined){index=0}storedIndex=index;currentLabelDensity=labelers.at(index).getLabelDensity(graphicsContext);if(currentLabelDensity>densityThreshold){if(index===0){flag=false}else{storedDensity=currentLabelDensity;index--}}else if(currentLabelDensity<densityThreshold){storedDensity=currentLabelDensity;if(index===lastLabelerIndex){flag=false}else{index++}}else if(currentLabelDensity===densityThreshold){flag=false}while(flag){currentLabelDensity=labelers.at(index).getLabelDensity(graphicsContext);if(currentLabelDensity>densityThreshold){if(index===0){break}else if(storedIndex>index){storedIndex=index;storedDensity=currentLabelDensity;index--}else{index=storedIndex;currentLabelDensity=storedDensity;break}}else if(currentLabelDensity<densityThreshold){if(storedIndex>index){break}else if(index===lastLabelerIndex){break}else{storedIndex=index;storedDensity=currentLabelDensity;index++}}else if(currentLabelDensity===densityThreshold){break}}}currentLabeler=labelers.at(index);this.currentLabeler(currentLabeler);this.currentLabelerIndex(index);this.currentLabelDensity(currentLabelDensity)});this.respondsTo("toRealValue",function(value){if(typeof value==="number"){return value}else if(DataValue.isInstance(value)){return value.getRealValue()}else{throw new Error("unknown value type for axis value "+value)}});this.respondsTo("toDataValue",function(value){if(typeof value==="number"){return DataValue.create(this.type(),value)}else if(DataValue.isInstance(value)){return value}else{throw new Error("unknown value type for axis value "+value)}});this.respondsTo("setDataRangeNoBind",function(min,max,dispatch){var dataValueMin=this.toDataValue(min),dataValueMax=this.toDataValue(max);this.dataMin(dataValueMin);this.dataMax(dataValueMax);if(dispatch===undefined){dispatch=true}this.emit({type:"dataRangeSet",min:dataValueMin,max:dataValueMax})});this.respondsTo("setDataRange",function(min,max,dispatch){if(this.binding()){this.binding().setDataRange(this,min,max,dispatch)}else{this.setDataRangeNoBind(min,max,dispatch)}});this.respondsTo("doPan",function(pixelBase,pixelDisplacement){var pan=this.pan(),panMin=pan.min(),panMax=pan.max(),offset,newRealMin,newRealMax;if(!pan.allowed()){return}offset=pixelDisplacement/this.axisToDataRatio();newRealMin=this.dataMin().getRealValue()-offset;newRealMax=this.dataMax().getRealValue()-offset;
if(panMin&&newRealMin<panMin.getRealValue()){newRealMax+=panMin.getRealValue()-newRealMin;newRealMin=panMin.getRealValue()}if(panMax&&newRealMax>panMax.getRealValue()){newRealMin-=newRealMax-panMax.getRealValue();newRealMax=panMax.getRealValue()}this.setDataRange(DataValue.create(this.type(),newRealMin),DataValue.create(this.type(),newRealMax))});this.respondsTo("doZoom",function(pixelBase,pixelDisplacement){var zoom=this.zoom(),pan=this.pan(),type=this.type(),dataMin=this.dataMin(),dataMax=this.dataMax(),panMin=pan.min(),panMax=pan.max(),zoomMin=zoom.min(),zoomMax=zoom.max(),baseRealValue,factor,newMin,newMax,d;if(!zoom.allowed()){return}baseRealValue=this.axisValueToDataValue(pixelBase).getRealValue();if(DataValue.isInstance(zoom.anchor())){baseRealValue=zoom.anchor().getRealValue()}factor=10*Math.abs(pixelDisplacement/(this.pixelLength()-this.maxoffset()-this.minoffset()));if(pixelDisplacement<=0){newMin=DataValue.create(type,(dataMin.getRealValue()-baseRealValue)*(1+factor)+baseRealValue);newMax=DataValue.create(type,(dataMax.getRealValue()-baseRealValue)*(1+factor)+baseRealValue)}else{newMin=DataValue.create(type,(dataMin.getRealValue()-baseRealValue)*(1-factor)+baseRealValue);newMax=DataValue.create(type,(dataMax.getRealValue()-baseRealValue)*(1-factor)+baseRealValue)}if(panMin&&newMin.lt(panMin)){newMin=panMin}if(panMax&&newMax.gt(panMax)){newMax=panMax}if(dataMin.le(dataMax)&&newMin.lt(newMax)||dataMin.ge(dataMax)&&newMin.gt(newMax)){if(zoomMax&&newMax.gt(newMin.add(zoomMax))){d=(newMax.getRealValue()-newMin.getRealValue()-zoomMax.getRealValue())/2;newMax=newMax.addRealValue(-d);newMin=newMin.addRealValue(d)}else if(zoomMin&&newMax.lt(newMin.add(zoomMin))){d=(zoomMin.getRealValue()-(newMax.getRealValue()-newMin.getRealValue()))/2;newMax=newMax.addRealValue(d);newMin=newMin.addRealValue(-d)}this.setDataRange(newMin,newMax)}});this.respondsTo("distanceToPoint",function(x,y){var perpCoord=this.orientation()===Axis.HORIZONTAL?y:x,parallelCoord=this.orientation()===Axis.HORIZONTAL?x:y,parallelOffset=this.parallelOffset(),perpOffset=this.perpOffset(),pixelLength=this.pixelLength(),l2dist=Util.l2dist;if(parallelCoord<parallelOffset){return l2dist(parallelCoord,perpCoord,parallelOffset,perpOffset)}if(parallelCoord>parallelOffset+pixelLength){return l2dist(parallelCoord,perpCoord,parallelOffset+pixelLength,perpOffset)}return Math.abs(perpCoord-perpOffset)});this.respondsTo("normalize",function(graph){var i,title,label;if(this.title()&&this.title().content()===undefined){this.title().content(new Text(this.id()))}if(this.labelers().size()===0){var defaultValues=utilityFunctions.getDefaultValuesFromXSD().horizontalaxis.labels,defaultSpacings=this.type()===DataValue.NUMBER?defaultValues.defaultNumberSpacing:defaultValues.defaultDatetimeSpacing;for(i=0;i<defaultSpacings.length;i++){label=new Labeler(this);label.spacing(DataMeasure.parse(this.type(),defaultSpacings[i]));this.labelers().add(label)}}for(i=0;i<this.labelers().size();i++){this.labelers().at(i).normalize()}});utilityFunctions.insertDefaults(this,defaultValues.horizontalaxis,attributes)});Axis.HORIZONTAL=new Orientation("horizontal");Axis.VERTICAL=new Orientation("vertical");Axis.Orientation=Orientation;module.exports=Axis},{"../../lib/jermaine/src/jermaine.js":9,"../core/data_measure.js":28,"../core/text.js":64,"../math/displacement.js":101,"../math/enum.js":102,"../math/point.js":104,"../math/rgb_color.js":105,"../math/util.js":106,"../util/utilityFunctions.js":157,"./axis_binding.js":19,"./axis_title.js":20,"./data_value.js":30,"./event_emitter.js":38,"./grid.js":42,"./labeler.js":45,"./pan.js":52,"./zoom.js":71}],19:[function(require,module,exports){var jermaine=require("../../lib/jermaine/src/jermaine.js");var AxisBinding=new jermaine.Model("AxisBinding",function(){var AxisBinding=this;AxisBinding.instances={};this.hasA("id").which.isA("string");this.hasA("axes");this.isBuiltWith("id",function(){AxisBinding.instances[this.id()]=this;this.axes([])});this.respondsTo("addAxis",function(axis,min,max,multigraph){if(axis.binding()){axis.binding().removeAxis(axis)}axis.binding(this);min=axis.toRealValue(min);max=axis.toRealValue(max);this.axes().push({axis:axis,multigraph:multigraph,factor:1/(max-min),offset:-min/(max-min),min:min,max:max})});this.respondsTo("removeAxis",function(axis){var axes=this.axes(),i;for(i=0;i<axes.length;++i){if(axes[i].axis===axis){axes.splice(i,1);break}}});this.respondsTo("sync",function(){var i,axes=this.axes(),axis;for(i=0;i<axes.length;++i){axis=axes[i].axis;if(axis.hasDataMin()&&axis.hasDataMax()){axis.setDataRange(axis.dataMin(),axis.dataMax());return true}}return false});this.respondsTo("setDataRange",function(initiatingAxis,min,max,dispatch){var initiatingAxisIndex,i,j,axes=this.axes(),axis,minRealValue=initiatingAxis.toRealValue(min),maxRealValue=initiatingAxis.toRealValue(max),redrawn_multigraphs=[],redrawn;if(dispatch===undefined){dispatch=true}for(i=0;i<axes.length;++i){if(axes[i].axis===initiatingAxis){initiatingAxisIndex=i;redrawn_multigraphs=[axes[i].multigraph];break}}for(i=0;i<axes.length;++i){axis=axes[i];if(i===initiatingAxisIndex){axis.axis.setDataRangeNoBind(minRealValue,maxRealValue,dispatch)}else{axis.axis.setDataRangeNoBind((minRealValue*axes[initiatingAxisIndex].factor+axes[initiatingAxisIndex].offset-axis.offset)/axis.factor,(maxRealValue*axes[initiatingAxisIndex].factor+axes[initiatingAxisIndex].offset-axis.offset)/axis.factor,dispatch);if(axis.multigraph!==undefined){redrawn=false;for(j=0;j<redrawn_multigraphs.length;++j){if(axis.multigraph===redrawn_multigraphs[j]){redrawn=true;break}}if(!redrawn){axis.multigraph.redraw();redrawn_multigraphs.push(axis.multigraph)}}}}});AxisBinding.getInstanceById=function(id){return AxisBinding.instances[id]};AxisBinding.findByIdOrCreateNew=function(id){var binding=AxisBinding.getInstanceById(id);if(!binding){binding=new AxisBinding(id)}return binding};AxisBinding.syncAllBindings=function(){var id;for(id in AxisBinding.instances){AxisBinding.instances[id].sync()}};AxisBinding.forgetAllBindings=function(){var id,j,binding;for(id in AxisBinding.instances){binding=AxisBinding.instances[id];for(j=0;j<binding.axes().length;++j){binding.axes()[j].axis.binding(null)}}AxisBinding.instances={}}});module.exports=AxisBinding},{"../../lib/jermaine/src/jermaine.js":9}],20:[function(require,module,exports){var jermaine=require("../../lib/jermaine/src/jermaine.js");var utilityFunctions=require("../util/utilityFunctions.js"),defaultValues=utilityFunctions.getDefaultValuesFromXSD(),attributes=utilityFunctions.getKeys(defaultValues.horizontalaxis.title),Point=require("../math/point.js");var AxisTitle=new jermaine.Model("AxisTitle",function(){this.hasA("axis").which.validatesWith(function(axis){var Axis=require("./axis.js");return axis instanceof Axis});this.hasA("content").which.validatesWith(function(content){var Text=require("./text.js");return content instanceof Text});this.hasA("anchor").which.validatesWith(function(anchor){return anchor instanceof Point});this.hasA("base").which.isA("number");this.hasA("position").which.validatesWith(function(position){return position instanceof Point});this.hasA("angle").which.isA("number");this.hasA("font").which.isA("string").and.which.defaultsTo("");this.isBuiltWith("axis");this.respondsTo("initializeGeometry",function(graph,graphicsContext){var Axis=require("./axis.js");var titleDefaults=defaultValues.horizontalaxis.title,axis=this.axis(),position=this.position,anchor=this.anchor,plotBox=graph.plotBox(),axisPerpOffset=axis.perpOffset(),axisIsHorizontal=axis.orientation()===Axis.HORIZONTAL;var getValue=function(valueOrFunction){if(typeof valueOrFunction==="function"){return valueOrFunction()}else{return valueOrFunction}};if(position()===undefined){if(axisIsHorizontal){if(axisPerpOffset>plotBox.height()/2){position(getValue(titleDefaults["position-horizontal-top"]))}else{position(getValue(titleDefaults["position-horizontal-bottom"]))}}else{if(axisPerpOffset>plotBox.width()/2){position(getValue(titleDefaults["position-vertical-right"]))}else{position(getValue(titleDefaults["position-vertical-left"]))}}}if(anchor()===undefined){if(axisIsHorizontal){if(axisPerpOffset>plotBox.height()/2){anchor(getValue(titleDefaults["anchor-horizontal-top"]))}else{anchor(getValue(titleDefaults["anchor-horizontal-bottom"]))}}else{if(axisPerpOffset>plotBox.width()/2){anchor(getValue(titleDefaults["anchor-vertical-right"]))}else{anchor(getValue(titleDefaults["anchor-vertical-left"]))}}}graphicsContext.angle=this.angle();this.content().initializeGeometry(graphicsContext);return this});this.respondsTo("render",function(){});utilityFunctions.insertDefaults(this,defaultValues.horizontalaxis.title,attributes)});module.exports=AxisTitle},{"../../lib/jermaine/src/jermaine.js":9,"../math/point.js":104,"../util/utilityFunctions.js":157,"./axis.js":18,"./text.js":64}],21:[function(require,module,exports){var jermaine=require("../../lib/jermaine/src/jermaine.js");var utilityFunctions=require("../util/utilityFunctions.js"),defaultValues=utilityFunctions.getDefaultValuesFromXSD(),attributes=utilityFunctions.getKeys(defaultValues.background),RGBColor=require("../math/rgb_color.js"),Img=require("./img.js");var Background=new jermaine.Model("Background",function(){this.hasA("color").which.validatesWith(function(color){return color instanceof RGBColor}).defaultsTo(RGBColor.parse(defaultValues.background.color));this.hasA("img").which.validatesWith(function(img){return img instanceof Img})});module.exports=Background},{"../../lib/jermaine/src/jermaine.js":9,"../math/rgb_color.js":105,"../util/utilityFunctions.js":157,"./img.js":44}],22:[function(require,module,exports){var jermaine=require("../../lib/jermaine/src/jermaine.js");var vF=require("../util/validationFunctions.js");var CategoryFormatter=function(formatValues){if(vF.typeOf(formatValues)!=="array"){throw new Error("formatValues must be an array")}this.formatValues=formatValues;this.length=Math.max.apply(this,this.formatValues.map(function(s){return s.length}))};CategoryFormatter.prototype.format=function(value){var i=Math.round(value.getRealValue());var k=this.formatValues.length;return this.formatValues[(i%k+k)%k]};CategoryFormatter.prototype.getMaxLength=function(){return this.length};CategoryFormatter.prototype.getFormatString=function(){return this.formatValues};module.exports=CategoryFormatter},{"../../lib/jermaine/src/jermaine.js":9,"../util/validationFunctions.js":158}],23:[function(require,module,exports){var ConsecutiveDistanceFilter=function(options){this.options=options;this.prevPx=undefined;this.prevPy=undefined;this.havePrev=false;this.distance="distance"in options?options.distance:5};ConsecutiveDistanceFilter.prototype.reset=function(){this.havePrev=false};ConsecutiveDistanceFilter.prototype.filter=function(datap,pixelp){var filterOut=false;if(this.havePrev){var dx=Math.abs(pixelp[0]-this.prevPx);var dy=Math.abs(pixelp[1]-this.prevPy);filterOut=dx+dy<this.distance;if(!filterOut){this.prevPx=pixelp[0];this.prevPy=pixelp[1]}}else{this.prevPx=pixelp[0];this.prevPy=pixelp[1]}this.havePrev=true;return filterOut};module.exports=ConsecutiveDistanceFilter},{}],24:[function(require,module,exports){var jermaine=require("../../lib/jermaine/src/jermaine.js");var ConstantPlot=new jermaine.Model("ConstantPlot",function(){var utilityFunctions=require("../util/utilityFunctions.js"),defaultValues=utilityFunctions.getDefaultValuesFromXSD(),attributes=utilityFunctions.getKeys(defaultValues.plot),Plot=require("./plot.js"),DataValue=require("./data_value.js");this.isA(Plot);this.hasA("constantValue").which.validatesWith(DataValue.isInstance);this.isBuiltWith("constantValue");utilityFunctions.insertDefaults(this,defaultValues.plot,attributes);this.respondsTo("render",function(graph,graphicsContext){if(!this.visible()){return}var haxis=this.horizontalaxis(),renderer=this.renderer(),constantValue=this.constantValue();if(!haxis.hasDataMin()||!haxis.hasDataMax()){return}renderer.setUpMissing();renderer.begin(graphicsContext);renderer.dataPoint([haxis.dataMin(),constantValue]);renderer.dataPoint([haxis.dataMax(),constantValue]);renderer.end()})});module.exports=ConstantPlot},{"../../lib/jermaine/src/jermaine.js":9,"../util/utilityFunctions.js":157,"./data_value.js":30,"./plot.js":54}],25:[function(require,module,exports){var CSVData;module.exports=function($){if(typeof CSVData!=="undefined"){return CSVData}var jermaine=require("../../lib/jermaine/src/jermaine.js"),ArrayData=require("./array_data.js");CSVData=new jermaine.Model(function(){this.isA(ArrayData);this.hasA("filename").which.isA("string");this.hasA("messageHandler");this.hasA("ajaxthrottle");this.hasA("dataIsReady").which.isA("boolean").and.defaultsTo(false);this.respondsTo("getIterator",function(columnIds,min,max,buffer){if(this.dataIsReady()){return ArrayData.getArrayDataIterator(this,columnIds,min,max,buffer)}else{return{next:function(){},hasNext:function(){return false}}}});this.respondsTo("_displayError",function(e){if(this.messageHandler()){this.messageHandler().error(e)}else{throw e}});this.isBuiltWith("columns","filename","%messageHandler","%ajaxthrottle",function(){var that=this,ajaxthrottle=this.ajaxthrottle();if(ajaxthrottle===undefined){ajaxthrottle=$}this.adapter(ArrayData);this.init();if(that.filename()!==undefined){that.emit({type:"ajaxEvent",action:"start"});ajaxthrottle.ajax({url:that.filename(),success:function(data){var dataValues=that.adapter().textToStringArray(that.getColumns(),data);that.stringArray(dataValues);that.ajaxNormalize();that.dataIsReady(true);that.emit({type:"dataReady"})},error:function(jqXHR,textStatus,errorThrown){var message=errorThrown;if(jqXHR.statusCode().status===404){message="File not found: '"+that.filename()+'"'}else{if(textStatus){message=textStatus+": "+message}}that._displayError(new Error(message))},complete:function(jqXHR,textStatus){that.emit({type:"ajaxEvent",action:"complete"})}})}})});return CSVData}},{"../../lib/jermaine/src/jermaine.js":9,"./array_data.js":17}],26:[function(require,module,exports){var jermaine=require("../../lib/jermaine/src/jermaine.js");var EventEmitter=require("./event_emitter.js"),DataValue=require("../core/data_value.js"),DataVariable=require("./data_variable.js");var Data=new jermaine.Model(function(){this.isA(EventEmitter);this.hasAn("id").which.isA("string");var find=function(attrName,attrValue,columns){var result=-1,i;for(i=0;i<columns.size();++i){if(columns.at(i)[attrName]()===attrValue){result=i;break}}return result};this.respondsTo("initializeColumns",function(){var i;for(i=0;i<this.columns().size();++i){this.columns().at(i).data(this)}});this.hasMany("columns").eachOfWhich.validateWith(function(column){this.message="Data: constructor parameter should be an array of DataVariable objects";return column instanceof DataVariable});this.hasA("defaultMissingvalue").which.isA("string");this.hasA("defaultMissingop").which.isA("string").and.defaultsTo("eq");this.hasAn("adapter");this.respondsTo("init",function(){this.initializeColumns()});this.isBuiltWith("columns",function(){this.init()});this.respondsTo("columnIdToColumnNumber",function(id){if(typeof id!=="string"){throw new Error("Data: columnIdToColumnNumber expects parameter to be a string")}var columnIndex=find("id",id,this.columns()),column=undefined;if(columnIndex>=0){column=this.columns().at(columnIndex)}if(column===undefined){throw new Error("Data: no column with the label "+id)}return column.column()});this.respondsTo("columnIdToDataVariable",function(id){if(typeof id!=="string"){throw new Error("Data: columnIdToDataVariable requires a string parameter")}var columns=this.columns(),dv=find("id",id,columns)!==-1?columns.at(find("id",id,columns)):undefined;if(dv===undefined){throw new Error("Data: no column with the label "+id)}return dv});this.respondsTo("getColumnId",function(column){if(typeof column!=="number"){throw new Error("Data: getColumnId method expects an integer")}var result=find("column",column,this.columns());if(result===-1){throw new Error("Data: column "+column+" does not exist")}return this.columns().at(result).id()});this.respondsTo("getColumns",function(){var result=[],columns=this.columns(),i;for(i=0;i<columns.size();++i){result.push(columns.at(i))}return result});this.respondsTo("getBounds",function(columnNumber){});this.respondsTo("getIterator",function(){});this.respondsTo("pause",function(){});this.respondsTo("resume",function(){});this.respondsTo("isMissing",function(value,i){var column;if(i<0||i>=this.columns().size()){throw new Error("metadata.isMissing(): index out of range")}column=this.columns().at(i);if(!column.missingvalue()||!column.missingop()){return false}return value[column.missingop()](column.missingvalue())});var sortVariables=function(data,sortedVariables,unsortedVariables){var columns=data.columns(),column,i;for(i=0;i<columns.size();i++){column=columns.at(i);if(column.column()!==undefined){sortedVariables[column.column()]=column}else{unsortedVariables.push(column)}}};var createPlaceholderVariables=function(data,unsortedVariables){var numMissingVariables=data.stringArray()[0].length-data.columns().size(),i;if(numMissingVariables>0){for(i=0;i<numMissingVariables;i++){unsortedVariables.push(null)}}};var insertUnsortedVariables=function(sortedVariables,unsortedVariables){var index,i;for(i=0,index=0;i<unsortedVariables.length;i++){while(true){if(sortedVariables[index]===undefined){break}index++}sortedVariables[index]=unsortedVariables[i]}};var checkColumnIndicies=function(data,sortedVariables){var length=data.stringArray()[0].length,i;if(sortedVariables.length>length){for(i=0;i<sortedVariables.length;i++){if(sortedVariables[i]instanceof DataVariable&&sortedVariables[i].column()>length){throw new Error("Data Variable Error: Attempting to specify column '"+sortedVariables[i].column()+"' for a variable, while there are only "+length+" data columns available")}}}};var handleMissingAttributes=function(sortedVariables,defaultMissingop,defaultMissingvalue){var defaultid,i;defaultMissingop=DataValue.parseComparator(defaultMissingop);for(i=0;i<sortedVariables.length;i++){if(!sortedVariables[i]){if(i===0){defaultid="x"}else if(i===1){defaultid="y"}else{defaultid="y"+(i-1)}sortedVariables[i]=new DataVariable(defaultid,i,DataValue.NUMBER)}else{if(sortedVariables[i].column()===undefined){sortedVariables[i].column(i)}if(sortedVariables[i].type()===undefined){sortedVariables[i].type(DataValue.NUMBER)}}if(defaultMissingvalue!==undefined){if(sortedVariables[i].missingvalue()===undefined){sortedVariables[i].missingvalue(DataValue.parse(sortedVariables[i].type(),defaultMissingvalue))}}if(sortedVariables[i].missingop()===undefined){sortedVariables[i].missingop(defaultMissingop)}}};var insertNormalizedVariables=function(data,sortedVariables){var columns=data.columns(),i;while(columns.size()>0){columns.pop()}for(i=0;i<sortedVariables.length;i++){columns.add(sortedVariables[i])}data.initializeColumns()};var createDataValueArray=function(data,sortedVariables){var ArrayData=require("./array_data.js");var stringArray=data.stringArray();if(stringArray.length>0){if(stringArray[0].length<sortedVariables.length){throw new Error("data contains only "+stringArray[0].length+" column(s), but should contain "+sortedVariables.length)}}var dataValues=ArrayData.stringArrayToDataValuesArray(sortedVariables,stringArray);data.array(dataValues);data.stringArray([])};this.prototype.normalize=function(){var ArrayData=require("./array_data.js"),sortedVariables=[],unsortedVariables=[],isWebServiceData=typeof this.serviceaddress==="function",isCSVData=typeof this.filename==="function",isCsvOrWebService=isWebServiceData||isCSVData;if(isCsvOrWebService){if(this.columns().size()===0){throw new Error("Data Normalization: Data gotten from csv and web service sources require variables to be specified in the mugl.")}}sortVariables(this,sortedVariables,unsortedVariables);if(this instanceof ArrayData===true&&!isCsvOrWebService){createPlaceholderVariables(this,unsortedVariables)}insertUnsortedVariables(sortedVariables,unsortedVariables);if(this instanceof ArrayData===true&&!isCsvOrWebService){checkColumnIndicies(this,sortedVariables)}handleMissingAttributes(sortedVariables,this.defaultMissingop(),this.defaultMissingvalue());insertNormalizedVariables(this,sortedVariables);if(this instanceof ArrayData===true&&!isCsvOrWebService){createDataValueArray(this,sortedVariables)}};this.prototype.ajaxNormalize=function(){var sortedVariables=[],unsortedVariables=[];sortVariables(this,sortedVariables,unsortedVariables);createPlaceholderVariables(this,unsortedVariables);insertUnsortedVariables(sortedVariables,unsortedVariables);checkColumnIndicies(this,sortedVariables);handleMissingAttributes(sortedVariables,this.defaultMissingop(),this.defaultMissingvalue());insertNormalizedVariables(this,sortedVariables);createDataValueArray(this,sortedVariables)}});module.exports=Data},{"../../lib/jermaine/src/jermaine.js":9,"../core/data_value.js":30,"./array_data.js":17,"./data_variable.js":31,"./event_emitter.js":38}],27:[function(require,module,exports){var jermaine=require("../../lib/jermaine/src/jermaine.js");var DataValue=require("./data_value.js"),NumberFormatter=require("./number_formatter.js"),DatetimeFormatter=require("./datetime_formatter.js");var DataFormatter={};DataFormatter.isInstance=function(obj){return obj&&typeof obj.format==="function"&&typeof obj.getMaxLength==="function"};DataFormatter.create=function(type,format){if(type===DataValue.NUMBER){return new NumberFormatter(format)}else if(type===DataValue.DATETIME){return new DatetimeFormatter(format)}throw new Error("attempt to create an unknown DataFormatter type")};module.exports=DataFormatter},{"../../lib/jermaine/src/jermaine.js":9,"./data_value.js":30,"./datetime_formatter.js":34,"./number_formatter.js":49}],28:[function(require,module,exports){var jermaine=require("../../lib/jermaine/src/jermaine.js");var DataValue=require("./data_value.js"),NumberMeasure=require("./number_measure.js"),DatetimeMeasure=require("./datetime_measure.js");var DataMeasure={};DataMeasure.isInstance=function(obj){return obj&&typeof obj.getRealValue==="function"&&!obj.compareTo};DataMeasure.parse=function(type,string){if(type===DataValue.NUMBER){return NumberMeasure.parse(string)}else if(type===DataValue.DATETIME){return DatetimeMeasure.parse(string)}throw new Error("attempt to parse an unknown DataMeasure type")};module.exports=DataMeasure},{"../../lib/jermaine/src/jermaine.js":9,"./data_value.js":30,"./datetime_measure.js":35,"./number_measure.js":50}],29:[function(require,module,exports){var jermaine=require("../../lib/jermaine/src/jermaine.js");var Plot=require("./plot.js"),DataVariable=require("./data_variable.js"),Filter=require("./filter.js"),Datatips=require("./datatips.js"),Data=require("./data.js"),utilityFunctions=require("../util/utilityFunctions.js"),defaultValues=utilityFunctions.getDefaultValuesFromXSD(),attributes=utilityFunctions.getKeys(defaultValues.plot);var graphCoordsToPixelCoords=function(graphCoords,graph,height){return[graphCoords[0]+graph.x0(),height-(graphCoords[1]+graph.y0())]};var DataPlot=new jermaine.Model("DataPlot",function(){this.isA(Plot);this.hasMany("variable").eachOfWhich.validateWith(function(variable){return variable instanceof DataVariable||variable===null});this.hasA("filter").which.validatesWith(function(filter){return filter instanceof Filter});this.hasA("datatips").which.validatesWith(function(datatips){return datatips instanceof Datatips});this.hasA("data").which.validatesWith(function(data){return data instanceof Data});utilityFunctions.insertDefaults(this,defaultValues.plot,attributes);this.respondsTo("render",function(graph,graphicsContext){if(!this.visible()){return}var data=this.data();if(!data){return}var haxis=this.horizontalaxis(),vaxis=this.verticalaxis();if(!haxis.hasDataMin()||!haxis.hasDataMax()){return}var variables=this.variable(),variableIds=[],i;for(i=0;i<variables.size();++i){variableIds.push(variables.at(i).id())}var iter=data.getIterator(variableIds,haxis.dataMin(),haxis.dataMax(),1),renderer=this.renderer();renderer.setUpMissing();renderer.begin(graphicsContext);while(iter.hasNext()){var datap=iter.next();renderer.dataPoint(datap)}renderer.end()});this.respondsTo("getDatatipsData",function(loc,graphWidth,graphHeight,graph,testElem){var datatips=this.datatips();if(!datatips){return}var data=this.data();if(!data){return}var haxis=this.horizontalaxis(),vaxis=this.verticalaxis();if(!haxis.hasDataMin()||!haxis.hasDataMax()){return}var variables=this.variable(),variableIds=[],i;for(i=0;i<variables.size();i++){variableIds.push(variables.at(i).id())}var iter=data.getIterator(variableIds,haxis.dataMin(),haxis.dataMax(),1),renderer=this.renderer(),points=[],x=loc.x(),y=loc.y(),maxDistance=20,curDist,datap;while(iter.hasNext()){datap=renderer.transformPoint(iter.next());curDist=window.multigraph.math.util.l2dist(x,y,datap[0],datap[1]);if(curDist<maxDistance){points.push({datap:datap,dist:curDist})}}if(points.length===0){return}var minIndex=0,minDist=points[0].dist;for(i=1;i<points.length;i++){if(points[i].dist<minDist){minIndex=i;minDist=points[i].dist}}var point=points[minIndex],axisValues=[];datap=point.datap;point.pixelp=graphCoordsToPixelCoords(datap,graph,graphHeight);axisValues[0]=haxis.axisValueToDataValue(datap[0]);for(i=1;i<datap.length;i++){axisValues[i]=vaxis.axisValueToDataValue(datap[i])}var content=datatips.format(axisValues),dimensions=datatips.computeDimensions(content,testElem);point.content=content;point.dimensions=dimensions;point.type=datatips.computeOrientation(point,graphWidth,graphHeight)[0];return point});this.respondsTo("createDatatip",function(data){var $=window.multigraph.jQuery,content=data.content,type=data.type,dimensions=data.dimensions,pixelp=data.pixelp,w=dimensions.width,h=dimensions.height,x=pixelp[0],y=pixelp[1],arrowLength=data.arrow,offset=determineOffsets(type,x,y,w,h,arrowLength),datatips=this.datatips(),bordercolor=datatips.bordercolor().getHexString("#");var box=$("<div>"+content+"</div>"),arrow=$("<div>&nbsp</div>"),datatip=$("<div></div>");switch(type){case Datatips.DOWN:arrow.css({left:w/2-5+"px","border-bottom":arrowLength+"px solid "+bordercolor,"border-left":"5px solid transparent","border-right":"5px solid transparent","border-top":"0px"});datatip.append(arrow);datatip.append(box);break;case Datatips.RIGHT:arrow.css({top:h/2-5+"px","border-bottom":"5px solid transparent","border-top":"5px solid transparent","border-right":arrowLength+"px solid "+bordercolor,"border-left":"0px","float":"left"});box.css("float","left");datatip.append(arrow);datatip.append(box);break;case Datatips.UP:arrow.css({left:w/2-5+"px","border-top":arrowLength+"px solid "+bordercolor,"border-left":"5px solid transparent","border-right":"5px solid transparent","border-bottom":"0px"});datatip.append(box);datatip.append(arrow);break;case Datatips.LEFT:arrow.css({top:h/2-5+"px","border-bottom":"5px solid transparent","border-top":"5px solid transparent","border-left":arrowLength+"px solid "+bordercolor,"border-right":"0px","float":"left"});box.css("float","left");datatip.append(box);datatip.append(arrow);break}datatip.css({"text-align":"left",position:"absolute",clear:"both",left:offset[0]+"px",top:offset[1]+"px",margin:"0px",padding:"0px"});box.css({display:"inline-block",position:"relative","background-color":datatips.bgcolor().toRGBA(datatips.bgalpha()),"text-align":"left",margin:"0px","padding-left":"5px","padding-right":"5px","padding-top":"1px","padding-bottom":"1px",border:datatips.border()+"px solid "+bordercolor,"border-radius":"5px"}),arrow.css({height:"0px",width:"0px",position:"relative","text-align":"left",margin:"0px",padding:"0px"});return datatip});var determineOffsets=function(type,x,y,w,h,arrowLength){switch(type){case Datatips.DOWN:return[x-w/2,y];case Datatips.RIGHT:return[x,y-h/2];case Datatips.UP:return[x-w/2,y-h-arrowLength];case Datatips.LEFT:return[x-w-arrowLength,y-h/2]}}});module.exports=DataPlot},{"../../lib/jermaine/src/jermaine.js":9,"../util/utilityFunctions.js":157,"./data.js":26,"./data_variable.js":31,"./datatips.js":32,"./filter.js":39,"./plot.js":54}],30:[function(require,module,exports){var jermaine=require("../../lib/jermaine/src/jermaine.js");var DataValue={};DataValue.NUMBER="number";DataValue.DATETIME="datetime";DataValue.UNKNOWN="unknown";DataValue.types=function(){return[DataValue.NUMBER,DataValue.DATETIME,DataValue.UNKNOWN]};DataValue.parseType=function(string){if(string.toLowerCase()===DataValue.NUMBER){return DataValue.NUMBER}if(string.toLowerCase()===DataValue.DATETIME){return DataValue.DATETIME}throw new Error("unknown DataValue type: "+string)};DataValue.serializeType=function(type){return type};DataValue.isInstance=function(obj){return obj&&typeof obj.getRealValue==="function"&&typeof obj.compareTo==="function"};DataValue.isInstanceOrNull=function(obj){return obj===null||DataValue.isInstance(obj)};DataValue.create=function(type,realValue){var NumberValue=require("./number_value.js"),DatetimeValue=require("./datetime_value.js");if(type===DataValue.NUMBER){return new NumberValue(realValue)}else if(type===DataValue.DATETIME){return new DatetimeValue(realValue)}throw new Error("attempt to parse an unknown DataValue type")};DataValue.parse=function(type,string){var NumberValue=require("./number_value.js"),DatetimeValue=require("./datetime_value.js");if(type===DataValue.NUMBER){return NumberValue.parse(string)}else if(type===DataValue.DATETIME){return DatetimeValue.parse(string)}throw new Error("attempt to parse an unknown DataValue type")};DataValue.LT="lt";DataValue.LE="le";DataValue.EQ="eq";DataValue.GE="ge";DataValue.GT="gt";DataValue.NE="ne";var comparatorFuncs={};comparatorFuncs[DataValue.LT]=function(x){return this.compareTo(x)<0};comparatorFuncs[DataValue.LE]=function(x){return this.compareTo(x)<=0};comparatorFuncs[DataValue.EQ]=function(x){return this.compareTo(x)===0};comparatorFuncs[DataValue.GE]=function(x){return this.compareTo(x)>=0};comparatorFuncs[DataValue.GT]=function(x){return this.compareTo(x)>0};comparatorFuncs[DataValue.NE]=function(x){return this.compareTo(x)!==0};DataValue.mixinComparators=function(obj){obj[DataValue.LT]=comparatorFuncs[DataValue.LT];obj[DataValue.LE]=comparatorFuncs[DataValue.LE];obj[DataValue.EQ]=comparatorFuncs[DataValue.EQ];obj[DataValue.GE]=comparatorFuncs[DataValue.GE];obj[DataValue.GT]=comparatorFuncs[DataValue.GT];obj[DataValue.NE]=comparatorFuncs[DataValue.NE]};DataValue.comparators=function(){return[DataValue.LT,DataValue.LE,DataValue.EQ,DataValue.GE,DataValue.GT,DataValue.NE]};DataValue.parseComparator=function(string){if(typeof string==="string"){switch(string.toLowerCase()){case"lt":return DataValue.LT;case"le":return DataValue.LE;case"eq":return DataValue.EQ;case"ge":return DataValue.GE;case"gt":return DataValue.GT;case"ne":return DataValue.NE}}throw new Error(string+" should be one of 'lt', 'le', 'eq', 'ge', 'gt', 'ne'.")};module.exports=DataValue},{"../../lib/jermaine/src/jermaine.js":9,"./datetime_value.js":37,"./number_value.js":51}],31:[function(require,module,exports){var jermaine=require("../../lib/jermaine/src/jermaine.js");var DataValue=require("./data_value.js");var utilityFunctions=require("../util/utilityFunctions.js"),defaultValues=utilityFunctions.getDefaultValuesFromXSD(),attributes=utilityFunctions.getKeys(defaultValues.data.variables.variable);var DataVariable=new jermaine.Model("DataVariable",function(){this.hasA("id").which.isA("string");this.hasA("column").which.isA("integer");this.hasA("type").which.isOneOf(DataValue.types()).and.defaultsTo(DataValue.NUMBER);this.hasA("data").which.validatesWith(function(data){var Data=require("./data.js");return data instanceof Data});this.hasA("missingvalue").which.validatesWith(DataValue.isInstance);this.hasA("missingop").which.isOneOf(DataValue.comparators());this.isBuiltWith("id","%column","%type");utilityFunctions.insertDefaults(this,defaultValues.data.variables.variable,attributes)});module.exports=DataVariable
},{"../../lib/jermaine/src/jermaine.js":9,"../util/utilityFunctions.js":157,"./data.js":26,"./data_value.js":30}],32:[function(require,module,exports){var jermaine=require("../../lib/jermaine/src/jermaine.js");var DatatipsVariable=require("./datatips_variable.js"),utilityFunctions=require("../util/utilityFunctions.js"),DataValue=require("./data_value.js"),DataFormatter=require("./data_formatter.js"),RGBColor=require("../math/rgb_color.js"),defaultValues=utilityFunctions.getDefaultValuesFromXSD(),attributes=utilityFunctions.getKeys(defaultValues.plot.datatips);var Datatips=new jermaine.Model("Datatips",function(){this.hasMany("variables").eachOfWhich.validateWith(function(variable){return variable instanceof DatatipsVariable});this.hasA("formatString").which.isA("string");this.hasA("bgcolor").which.validatesWith(function(bgcolor){return bgcolor instanceof RGBColor});this.hasA("bgalpha").which.isA("number");this.hasA("border").which.isA("integer");this.hasA("bordercolor").which.validatesWith(function(bordercolor){return bordercolor instanceof RGBColor});this.hasA("pad").which.isA("integer");this.respondsTo("format",function(data){var formattedData=[],replacementPatterns=[],output=this.formatString(),i,l=data.length;for(i=0;i<l;i++){formattedData.push(this.variables().at(i).formatter().format(data[i]));replacementPatterns.push(new RegExp("\\{"+i+"\\}","g"))}for(i=0;i<l;i++){output=output.replace(replacementPatterns[i],formattedData[i])}output=output.replace(/[\n|\r]/g,"<br/>");return output});this.respondsTo("computeDimensions",function(content,elem){var paddingWidth=parseInt(elem.css("padding-left"),10)+parseInt(elem.css("padding-right"),10),paddingHeight=parseInt(elem.css("padding-top"),10)+parseInt(elem.css("padding-bottom"),10),border=2*this.border();elem.html(content);return{width:elem.width()+border+paddingWidth,height:elem.height()+border+paddingHeight}});this.respondsTo("computeOrientation",function(data,graphWidth,graphHeight){var dimensions=data.dimensions,pixelp=data.pixelp,datatipWidth=dimensions.width,datatipHeight=dimensions.height,baseX=pixelp[0],baseY=pixelp[1],offset=20,offsetWidth=datatipWidth+offset,offsetHeight=datatipHeight+offset;baseY=graphHeight-baseY;if(baseX-offsetWidth>=0&&graphWidth-baseX>=offsetWidth&&baseY-offsetHeight>=0&&graphHeight-baseY>=offsetHeight){return[Datatips.UP,Datatips.DOWN,Datatips.RIGHT,Datatips.LEFT]}else if(baseX-offsetWidth>=0&&graphWidth-baseX>=offsetWidth&&baseY>=graphHeight-offsetHeight&&graphHeight>=baseY){return[Datatips.DOWN,Datatips.RIGHT,Datatips.LEFT,Datatips.UP]}else if(baseX-offsetWidth>=0&&graphWidth-baseX>=offsetWidth&&offsetHeight>=baseY&&baseY>=0){return[Datatips.UP,Datatips.RIGHT,Datatips.LEFT,Datatips.DOWN]}else if(baseX>=0&&offsetWidth>=baseX&&baseY-offsetHeight>=0&&graphHeight-baseY>=offsetHeight){return[Datatips.RIGHT,Datatips.UP,Datatips.DOWN,Datatips.LEFT]}else if(graphWidth>=baseX&&offsetWidth>=graphWidth-baseX&&baseY-offsetHeight>=0&&graphHeight-baseY>=offsetHeight){return[Datatips.LEFT,Datatips.UP,Datatips.DOWN,Datatips.RIGHT]}else{var preferences=[];if(baseX<graphWidth/2){if(baseY>graphHeight/2){if(baseX-datatipWidth/2<graphHeight-baseY-datatipHeight/2){preferences.push(Datatips.RIGHT);preferences.push(Datatips.DOWN)}else{preferences.push(Datatips.DOWN);preferences.push(Datatips.RIGHT)}if(baseX-offsetWidth<graphHeight-baseY-offsetHeight){preferences.push(Datatips.UP);preferences.push(Datatips.LEFT)}else{preferences.push(Datatips.LEFT);preferences.push(Datatips.UP)}}else{if(baseX-datatipWidth/2<baseY-datatipHeight/2){preferences.push(Datatips.RIGHT);preferences.push(Datatips.UP)}else{preferences.push(Datatips.UP);preferences.push(Datatips.RIGHT)}if(baseX-offsetWidth<baseY-offsetHeight){preferences.push(Datatips.DOWN);preferences.push(Datatips.LEFT)}else{preferences.push(Datatips.LEFT);preferences.push(Datatips.DOWN)}}}else{if(baseY>graphHeight/2){if(graphWidth-baseX-datatipWidth/2<graphHeight-baseY-datatipHeight/2){preferences.push(Datatips.LEFT);preferences.push(Datatips.DOWN)}else{preferences.push(Datatips.DOWN);preferences.push(Datatips.LEFT)}if(graphWidth-baseX-offsetWidth<graphHeight-baseY-offsetHeight){preferences.push(Datatips.UP);preferences.push(Datatips.RIGHT)}else{preferences.push(Datatips.RIGHT);preferences.push(Datatips.UP)}}else{if(graphWidth-baseX-datatipWidth/2<baseY-datatipHeight/2){preferences.push(Datatips.LEFT);preferences.push(Datatips.UP)}else{preferences.push(Datatips.UP);preferences.push(Datatips.LEFT)}if(graphWidth-baseX-offsetWidth<baseY-offsetWidth){preferences.push(Datatips.DOWN);preferences.push(Datatips.RIGHT)}else{preferences.push(Datatips.RIGHT);preferences.push(Datatips.DOWN)}}}return preferences}});this.respondsTo("normalize",function(plot){var datatipsVariables=this.variables(),plotVariables=plot.variable(),variable,type,i;if(datatipsVariables.size()<plotVariables.size()){for(i=datatipsVariables.size();i<plotVariables.size();i++){datatipsVariables.add(new DatatipsVariable)}}for(i=0;i<datatipsVariables.size();i++){variable=datatipsVariables.at(i);type=plotVariables.at(i).type();if(variable.formatString()===undefined){if(type===DataValue.NUMBER){variable.formatString(defaultValues["formatString-number"])}else{variable.formatString(defaultValues["formatString-datetime"])}}variable.formatter(DataFormatter.create(type,variable.formatString()))}});utilityFunctions.insertDefaults(this,defaultValues.plot.datatips,attributes)});Datatips.UP="u";Datatips.DOWN="d";Datatips.LEFT="l";Datatips.RIGHT="r";module.exports=Datatips},{"../../lib/jermaine/src/jermaine.js":9,"../math/rgb_color.js":105,"../util/utilityFunctions.js":157,"./data_formatter.js":27,"./data_value.js":30,"./datatips_variable.js":33}],33:[function(require,module,exports){var jermaine=require("../../lib/jermaine/src/jermaine.js");var utilityFunctions=require("../util/utilityFunctions.js"),defaultValues=utilityFunctions.getDefaultValuesFromXSD(),attributes=utilityFunctions.getKeys(defaultValues.plot.datatips.variable),DataFormatter=require("./data_formatter.js");var DatatipsVariable=new jermaine.Model("DatatipsVariable",function(){this.hasA("formatString").which.isA("string");this.hasA("formatter").which.validatesWith(DataFormatter.isInstance);utilityFunctions.insertDefaults(this,defaultValues.plot.datatips.variable,attributes)});module.exports=DatatipsVariable},{"../../lib/jermaine/src/jermaine.js":9,"../util/utilityFunctions.js":157,"./data_formatter.js":27}],34:[function(require,module,exports){var jermaine=require("../../lib/jermaine/src/jermaine.js");var sprintf=require("sprintf");var DatetimeFormatter=function(format){var testString;if(typeof format!=="string"){throw new Error("format must be a string")}this.formatString=format;testString=DatetimeFormatter.formatInternally(format,new Date(0));this.length=testString.length};DatetimeFormatter.prototype.format=function(value){return DatetimeFormatter.formatInternally(this.formatString,value.value)};DatetimeFormatter.prototype.getMaxLength=function(){return this.length};DatetimeFormatter.prototype.getFormatString=function(){return this.formatString};DatetimeFormatter.formatInternally=function(formatString,date){var dayNames={shortNames:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],longNames:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},monthNames={shortNames:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],longNames:["January","February","March","April","May","June","July","August","September","October","November","December"]},state=0,c,i,t,output="";for(i=0;i<formatString.length;i++){c=formatString.charAt(i);switch(state){case 0:if(c==="%"){state=1}else{output+=c}break;case 1:switch(c){case"Y":output+=date.getUTCFullYear().toString();break;case"y":output+=date.getUTCFullYear().toString().substr(2,2);break;case"M":output+=sprintf("%02s",(date.getUTCMonth()+1).toString());break;case"m":output+=(date.getUTCMonth()+1).toString();break;case"N":output+=monthNames.longNames[date.getUTCMonth()];break;case"n":output+=monthNames.shortNames[date.getUTCMonth()];break;case"D":output+=sprintf("%02s",date.getUTCDate().toString());break;case"d":output+=date.getUTCDate().toString();break;case"W":output+=dayNames.longNames[date.getUTCDay()];break;case"w":output+=dayNames.shortNames[date.getUTCDay()];break;case"H":output+=sprintf("%02s",date.getUTCHours().toString());break;case"h":t=date.getUTCHours()%12;if(t===0){output+="12"}else{output+=t.toString()}break;case"i":output+=sprintf("%02s",date.getUTCMinutes().toString());break;case"s":output+=sprintf("%02s",date.getUTCSeconds().toString());break;case"v":output+=sprintf("%03s",date.getUTCMilliseconds().toString()).substr(0,1);break;case"V":output+=sprintf("%03s",date.getUTCMilliseconds().toString()).substr(0,2);break;case"q":output+=sprintf("%03s",date.getUTCMilliseconds().toString());break;case"P":t=date.getUTCHours();if(t<12){output+="AM"}else{output+="PM"}break;case"p":t=date.getUTCHours();if(t<12){output+="am"}else{output+="pm"}break;case"L":output+="\n";break;case"%":output+="%";break;default:throw new Error("Invalid character code for datetime formatting string")}state=0;break}}return output};module.exports=DatetimeFormatter},{"../../lib/jermaine/src/jermaine.js":9,sprintf:16}],35:[function(require,module,exports){var jermaine=require("../../lib/jermaine/src/jermaine.js");var DatetimeValue=require("./datetime_value.js"),Enum=require("../math/enum.js");var DatetimeUnit=require("./datetime_unit.js");var DatetimeMeasure=function(measure,unit){if(typeof measure!=="number"||DatetimeMeasure.isUnit(unit)!==true){throw new Error("Improper input for Datetime Measure's constructor")}else if(arguments.length!==2){throw new Error("Datetime Measure's contructor requires exactly two arguments")}this.measure=measure;this.unit=unit};DatetimeMeasure.isUnit=function(unit){return DatetimeUnit.isInstance(unit)};DatetimeMeasure.prototype.negative=function(){return new DatetimeMeasure(-this.measure,this.unit)};DatetimeMeasure.prototype.getRealValue=function(){var factor;switch(this.unit){case DatetimeUnit.MILLISECOND:factor=1;break;case DatetimeUnit.SECOND:factor=1e3;break;case DatetimeUnit.MINUTE:factor=6e4;break;case DatetimeUnit.HOUR:factor=36e5;break;case DatetimeUnit.DAY:factor=864e5;break;case DatetimeUnit.WEEK:factor=6048e5;break;case DatetimeUnit.MONTH:factor=2592e6;break;case DatetimeUnit.YEAR:factor=31536e6;break}return this.measure*factor};DatetimeMeasure.parse=function(s){var re,measure,unit;if(typeof s!=="string"||s.match(/\s*-?(([0-9]+\.?[0-9]*)|([0-9]*\.?[0-9]+))\s*(ms|s|m|H|D|W|M|Y){1}\s*$/)===null){throw new Error("Improper input for Datetime Measure's parse method")}re=/ms|s|m|H|D|W|M|Y/;measure=parseFloat(s.replace(re,""));unit=s.match(re);unit=DatetimeUnit.parse(unit[0]);return new DatetimeMeasure(measure,unit)};DatetimeMeasure.findTickmarkWithMillisecondSpacing=function(value,alignment,spacing){var offset=value-alignment,d=Math.floor(offset/spacing);if(offset%spacing!==0){++d}return new DatetimeValue(alignment+d*spacing)};DatetimeMeasure.findTickmarkWithMonthSpacing=function(value,alignment,monthSpacing){var valueD=value.value,alignD=alignment.value,monthOffset=12*(valueD.getUTCFullYear()-alignD.getUTCFullYear())+(valueD.getUTCMonth()-alignD.getUTCMonth()),d=Math.floor(monthOffset/monthSpacing);if(monthOffset%monthSpacing!==0){++d}else if(valueD.getUTCDate()>alignD.getUTCDate()){++d}else if(valueD.getUTCDate()===alignD.getUTCDate()&&valueD.getUTCHours()>alignD.getUTCHours()){++d}else if(valueD.getUTCDate()===alignD.getUTCDate()&&valueD.getUTCHours()===alignD.getUTCHours()&&valueD.getUTCMinutes()>alignD.getUTCMinutes()){++d}else if(valueD.getUTCDate()===alignD.getUTCDate()&&valueD.getUTCHours()===alignD.getUTCHours()&&valueD.getUTCMinutes()===alignD.getUTCMinutes()&&valueD.getUTCSeconds()>alignD.getUTCSeconds()){++d}else if(valueD.getUTCDate()===alignD.getUTCDate()&&valueD.getUTCHours()===alignD.getUTCHours()&&valueD.getUTCMinutes()===alignD.getUTCMinutes()&&valueD.getUTCSeconds()===alignD.getUTCSeconds()&&valueD.getUTCMilliseconds()>alignD.getUTCMilliseconds()){++d}return alignment.add(DatetimeMeasure.parse(d*monthSpacing+"M"))};DatetimeMeasure.prototype.firstSpacingLocationAtOrAfter=function(value,alignment){switch(this.unit){case DatetimeUnit.MONTH:return DatetimeMeasure.findTickmarkWithMonthSpacing(value,alignment,this.measure);case DatetimeUnit.YEAR:return DatetimeMeasure.findTickmarkWithMonthSpacing(value,alignment,this.measure*12);default:return DatetimeMeasure.findTickmarkWithMillisecondSpacing(value.getRealValue(),alignment.getRealValue(),this.getRealValue())}};DatetimeMeasure.prototype.lastSpacingLocationAtOrBefore=function(value,alignment){var x=this.firstSpacingLocationAtOrAfter(value,alignment);if(x.eq(value)){return x}var y=x.add(this.negative());return y};DatetimeMeasure.prototype.toString=function(){return this.measure.toString()+this.unit.toString()};module.exports=DatetimeMeasure},{"../../lib/jermaine/src/jermaine.js":9,"../math/enum.js":102,"./datetime_unit.js":36,"./datetime_value.js":37}],36:[function(require,module,exports){var Enum=require("../math/enum.js");var DatetimeUnit=new Enum("DatetimeUnit");DatetimeUnit.MILLISECOND=new DatetimeUnit("ms");DatetimeUnit.SECOND=new DatetimeUnit("s");DatetimeUnit.MINUTE=new DatetimeUnit("m");DatetimeUnit.HOUR=new DatetimeUnit("H");DatetimeUnit.DAY=new DatetimeUnit("D");DatetimeUnit.WEEK=new DatetimeUnit("W");DatetimeUnit.MONTH=new DatetimeUnit("M");DatetimeUnit.YEAR=new DatetimeUnit("Y");module.exports=DatetimeUnit},{"../math/enum.js":102}],37:[function(require,module,exports){var jermaine=require("../../lib/jermaine/src/jermaine.js");var DataValue=require("./data_value.js"),DatetimeUnit=require("./datetime_unit.js"),sprintf=require("sprintf");var DatetimeValue=function(value){if(typeof value!=="number"){throw new Error("DatetimeValue requires its parameter to be a number")}this.value=new Date(value)};DatetimeValue.prototype.getRealValue=function(){return this.value.getTime()};DatetimeValue.prototype.type=DataValue.DATETIME;DatetimeValue.prototype.clone=function(){return new DatetimeValue(this.getRealValue())};DatetimeValue.parse=function(string){var Y=0,M=0,D=1,H=0,m=0,s=0,ms=0;if(typeof string==="string"){string=string.replace(/[\.\-\:\s]/g,"");if(string.length===4){Y=parseInt(string,10)}else if(string.length===6){Y=parseInt(string.substring(0,4),10);M=parseInt(string.substring(4,6),10)-1}else if(string.length===8){Y=parseInt(string.substring(0,4),10);M=parseInt(string.substring(4,6),10)-1;D=parseInt(string.substring(6,8),10)}else if(string.length===10){Y=parseInt(string.substring(0,4),10);M=parseInt(string.substring(4,6),10)-1;D=parseInt(string.substring(6,8),10);H=parseInt(string.substring(8,10),10)}else if(string.length===12){Y=parseInt(string.substring(0,4),10);M=parseInt(string.substring(4,6),10)-1;D=parseInt(string.substring(6,8),10);H=parseInt(string.substring(8,10),10);m=parseInt(string.substring(10,12),10)}else if(string.length===14){Y=parseInt(string.substring(0,4),10);M=parseInt(string.substring(4,6),10)-1;D=parseInt(string.substring(6,8),10);H=parseInt(string.substring(8,10),10);m=parseInt(string.substring(10,12),10);s=parseInt(string.substring(12,14),10)}else if(string.length===15||string.length===16||string.length===17){Y=parseInt(string.substring(0,4),10);M=parseInt(string.substring(4,6),10)-1;D=parseInt(string.substring(6,8),10);H=parseInt(string.substring(8,10),10);m=parseInt(string.substring(10,12),10);s=parseInt(string.substring(12,14),10);ms=parseInt(string.substring(14,17),10)}else if(string==="0"){Y=1970}else{throw new Error("Incorrect input format for Datetime Value's parse method:"+string)}}else{throw new Error("Datetime Value's parse method requires its parameter to be a string")}return new DatetimeValue(Date.UTC(Y,M,D,H,m,s,ms))};DatetimeValue.prototype.toString=function(){var Y,M,D,H,m,s,ms;Y=sprintf("%04s",this.value.getUTCFullYear().toString());M=sprintf("%02s",(this.value.getUTCMonth()+1).toString());D=sprintf("%02s",this.value.getUTCDate().toString());H=sprintf("%02s",this.value.getUTCHours().toString());m=sprintf("%02s",this.value.getUTCMinutes().toString());s=sprintf("%02s",this.value.getUTCSeconds().toString());ms="."+sprintf("%03s",this.value.getUTCMilliseconds().toString());if(ms===".000"){ms=""}return Y+M+D+H+m+s+ms};DatetimeValue.prototype.compareTo=function(x){if(this.getRealValue()<x.getRealValue()){return-1}else if(this.getRealValue()>x.getRealValue()){return 1}return 0};DatetimeValue.prototype.addRealValue=function(realValueIncr){return new DatetimeValue(this.value.getTime()+realValueIncr)};DatetimeValue.prototype.add=function(measure){var date=new DatetimeValue(this.getRealValue());switch(measure.unit){case DatetimeUnit.MILLISECOND:date.value.setUTCMilliseconds(date.value.getUTCMilliseconds()+measure.measure);break;case DatetimeUnit.SECOND:date.value.setUTCSeconds(date.value.getUTCSeconds()+measure.measure);break;case DatetimeUnit.MINUTE:date.value.setUTCMinutes(date.value.getUTCMinutes()+measure.measure);break;case DatetimeUnit.HOUR:date.value.setUTCHours(date.value.getUTCHours()+measure.measure);break;case DatetimeUnit.DAY:date.value.setUTCDate(date.value.getUTCDate()+measure.measure);break;case DatetimeUnit.WEEK:date.value.setUTCDate(date.value.getUTCDate()+measure.measure*7);break;case DatetimeUnit.MONTH:date.value.setUTCMonth(date.value.getUTCMonth()+measure.measure);break;case DatetimeUnit.YEAR:date.value.setUTCFullYear(date.value.getUTCFullYear()+measure.measure);break}return date};DataValue.mixinComparators(DatetimeValue.prototype);module.exports=DatetimeValue},{"../../lib/jermaine/src/jermaine.js":9,"./data_value.js":30,"./datetime_unit.js":36,sprintf:16}],38:[function(require,module,exports){var jermaine=require("../../lib/jermaine/src/jermaine.js");var EventEmitter=new jermaine.Model(function(){this.hasA("listeners").which.defaultsTo(function(){return{}});this.respondsTo("addListener",function(eventType,listener){var listeners=this.listeners(),i;if(listeners[eventType]===undefined){listeners[eventType]=[]}for(i=0;i<listeners[eventType].length;++i){if(listeners[eventType][i]===listener){return false}}listeners[eventType].push(listener);this.emit({type:"listenerAdded",targetType:eventType,listener:listener});return true});this.respondsTo("removeListener",function(eventType,listener){var listeners=this.listeners(),i;if(listeners[eventType]!==undefined){for(i=0;i<listeners[eventType].length;++i){if(listeners[eventType][i]===listener){listeners[eventType][i]=null;this.emit({type:"listenerRemoved",targetType:eventType,listener:listener});return true}}}return false});this.respondsTo("emit",function(event){var listeners,i,nulls=[];if(typeof event==="string"){event={type:event}}if(!event.target){event.target=this}if(!event.type){throw new Error("Event object missing 'type' property")}listeners=this.listeners()[event.type];if(!listeners){return}for(i=0;i<listeners.length;i++){if(listeners[i]!==null){listeners[i].call(this,event)}else{nulls.push(i)}}if(nulls.length>0){for(i=nulls.length-1;i>=0;--i){listeners.splice(nulls[i],1)}}})});module.exports=EventEmitter},{"../../lib/jermaine/src/jermaine.js":9}],39:[function(require,module,exports){var jermaine=require("../../lib/jermaine/src/jermaine.js");var FilterOption=require("./filter_option.js");var utilityFunctions=require("../util/utilityFunctions.js"),defaultValues=utilityFunctions.getDefaultValuesFromXSD(),attributes=utilityFunctions.getKeys(defaultValues.plot.filter);var Filter=new jermaine.Model("Filter",function(){this.hasMany("options").eachOfWhich.validatesWith(function(option){return option instanceof FilterOption});this.hasA("type").which.validatesWith(function(type){return typeof type==="string"});utilityFunctions.insertDefaults(this,defaultValues.plot.filter,attributes)});module.exports=Filter},{"../../lib/jermaine/src/jermaine.js":9,"../util/utilityFunctions.js":157,"./filter_option.js":40}],40:[function(require,module,exports){var jermaine=require("../../lib/jermaine/src/jermaine.js");var utilityFunctions=require("../util/utilityFunctions.js"),defaultValues=utilityFunctions.getDefaultValuesFromXSD(),attributes=utilityFunctions.getKeys(defaultValues.plot.filter.option);var FilterOption=new jermaine.Model("FilterOption",function(){this.hasA("name").which.validatesWith(function(name){return typeof name==="string"});this.hasA("value").which.validatesWith(function(value){return typeof value==="string"});utilityFunctions.insertDefaults(this,defaultValues.plot.filter.option,attributes)});module.exports=FilterOption},{"../../lib/jermaine/src/jermaine.js":9,"../util/utilityFunctions.js":157}],41:[function(require,module,exports){var jermaine=require("../../lib/jermaine/src/jermaine.js");var Axis=require("./axis.js"),Background=require("./background.js"),Data=require("./data.js"),Legend=require("./legend.js"),Plot=require("./plot.js"),Plotarea=require("./plotarea.js"),Title=require("./title.js"),Window=require("./window.js"),Box=require("../math/box.js"),DataPlot=require("../core/data_plot.js"),AxisBinding=require("../core/axis_binding.js"),varaible_id_regex=/^([^\.]+)\.(.+)$/;var utilityFunctions=require("../util/utilityFunctions.js"),defaultValues=utilityFunctions.getDefaultValuesFromXSD(),attributes=utilityFunctions.getKeys(defaultValues);var Graph=new jermaine.Model("Graph",function(){this.hasA("window").which.validatesWith(function(w){return w instanceof Window});this.hasA("plotarea").which.validatesWith(function(plotarea){return plotarea instanceof Plotarea});this.hasA("legend").which.validatesWith(function(legend){return legend instanceof Legend});this.hasA("background").which.validatesWith(function(background){return background instanceof Background});this.hasA("title").which.validatesWith(function(title){return title instanceof Title});this.hasMany("axes").eachOfWhich.validateWith(function(axis){return axis instanceof Axis});this.hasMany("plots").eachOfWhich.validateWith(function(plot){return plot instanceof Plot});this.hasMany("data").eachOfWhich.validateWith(function(data){return data instanceof Data});this.hasA("windowBox").which.validatesWith(function(val){return val instanceof Box});this.hasA("paddingBox").which.validatesWith(function(val){return val instanceof Box});this.hasA("plotBox").which.validatesWith(function(val){return val instanceof Box});this.hasA("multigraph").which.validatesWith(function(val){return typeof val.busySpinnerLevel=="function"});this.hasA("x0").which.isA("number");this.hasA("y0").which.isA("number");this.hasA("filter").which.validatesWith(function(filter){return typeof filter==="undefined"||typeof filter.reset==="function"&&typeof filter.filter==="function"});this.isBuiltWith(function(){this.window(new Window);this.plotarea(new Plotarea);this.background(new Background)});this.respondsTo("postParse",function(){var i,that=this,handleAjaxEvent=function(event){if(event.action==="start"){if(that.multigraph()){that.multigraph().busySpinnerLevel(1)}}else if(event.action==="complete"){if(that.multigraph()){that.multigraph().busySpinnerLevel(-1)}}};for(i=0;i<this.data().size();++i){this.data().at(i).addListener("ajaxEvent",handleAjaxEvent)}});this.respondsTo("initializeGeometry",function(width,height,graphicsContext){var w=this.window(),windowBorder=w.border(),windowMargin=w.margin(),windowPadding=w.padding(),plotarea=this.plotarea(),plotareaBorder=plotarea.border(),plotareaMargin=plotarea.margin(),i;this.windowBox(new Box(width,height));this.paddingBox(new Box(width-(windowMargin.left()+windowBorder+windowPadding.left())-(windowMargin.right()+windowBorder+windowPadding.right()),height-(windowMargin.top()+windowBorder+windowPadding.top())-(windowMargin.bottom()+windowBorder+windowPadding.bottom())));this.plotBox(new Box(this.paddingBox().width()-(plotareaMargin.left()+plotareaMargin.right()+2*plotareaBorder),this.paddingBox().height()-(plotareaMargin.top()+plotareaMargin.bottom()+2*plotareaBorder)));for(i=0;i<this.axes().size();++i){this.axes().at(i).initializeGeometry(this,graphicsContext)}if(this.legend()){this.legend().initializeGeometry(this,graphicsContext)}if(this.title()){this.title().initializeGeometry(graphicsContext)}this.x0(windowMargin.left()+windowBorder+windowPadding.left()+plotareaMargin.left()+plotareaBorder);this.y0(windowMargin.bottom()+windowBorder+windowPadding.bottom()+plotareaMargin.bottom()+plotareaBorder)});this.respondsTo("registerCommonDataCallback",function(callback){var i;for(i=0;i<this.data().size();++i){this.data().at(i).addListener("dataReady",callback)}});this.respondsTo("pauseAllData",function(){var i;for(i=0;i<this.data().size();++i){this.data().at(i).pause()}});this.respondsTo("resumeAllData",function(){var i;for(i=0;i<this.data().size();++i){this.data().at(i).resume()}});this.respondsTo("findNearestAxis",function(x,y,orientation){var foundAxis=null,mindist=9999,axes=this.axes(),naxes=this.axes().size(),axis,i,d;for(i=0;i<naxes;++i){axis=axes.at(i);if(!axis.visible()){continue}if(orientation===undefined||orientation===null||axis.orientation()===orientation){d=axis.distanceToPoint(x,y);if(foundAxis===null||d<mindist){foundAxis=axis;mindist=d}}}return foundAxis});this.respondsTo("axisById",function(id){var axes=this.axes(),i;for(i=0;i<axes.size();++i){if(axes.at(i).id()===id){return axes.at(i)}}return undefined});this.respondsTo("dataById",function(id){var datas=this.data(),data;for(i=0;i<datas.size();++i){data=datas.at(i);if(data.id()===id){return data}}return undefined});this.respondsTo("variableById",function(id){var datas,re=/^([^\.]+)\.(.+)$/,m=id.match(re),data_id,var_id,data,columns,i,j;if(m){data_id=m[1];var_id=m[2];data=this.dataById(data_id);return data.columnIdToDataVariable(var_id)}else{datas=this.data();for(i=0;i<datas.size();++i){columns=datas.at(i).columns();for(j=0;j<columns.size();++j){if(columns.at(j).id()===id){return columns.at(j)}}}return undefined}});this.respondsTo("destroy",function(){var i;for(i=0;i<this.axes().size();++i){this.axes().at(i).destroy()}});this.respondsTo("normalize",function(){var HORIZONTAL=Axis.HORIZONTAL,VERTICAL=Axis.VERTICAL,axes=this.axes(),plots=this.plots(),i,j,haxisCount=0,vaxisCount=0,axis,axisid,plot;for(i=0;i<this.data().size();i++){this.data().at(i).normalize()}for(i=0;i<axes.size();i++){if(axes.at(i).orientation()===HORIZONTAL){haxisCount++}else if(axes.at(i).orientation()===VERTICAL){vaxisCount++}}if(haxisCount===0){axes.add(new Axis(HORIZONTAL))}if(vaxisCount===0){axes.add(new Axis(VERTICAL))}haxisCount=0;vaxisCount=0;for(i=0;i<axes.size();i++){axis=axes.at(i);if(axis.orientation()===HORIZONTAL){axisid="x";if(haxisCount>0){axisid+=haxisCount}haxisCount++}else if(axis.orientation()===VERTICAL){axisid="y";if(vaxisCount>0){axisid+=vaxisCount}vaxisCount++}if(axis.id()===undefined){axis.id(axisid)}}for(i=0;i<axes.size();i++){axes.at(i).normalize(this)}if(plots.size()===0){plots.add(new DataPlot)}for(i=0;i<plots.size();i++){plots.at(i).normalize(this)}if(this.legend()){this.legend().normalize(this)}AxisBinding.syncAllBindings();for(i=0;i<axes.size();i++){axis=axes.at(i);if(!axis.hasDataMin()||!axis.hasDataMax()){for(j=0;j<plots.size();++j){plot=plots.at(j);if(plot instanceof DataPlot&&(plot.horizontalaxis()===axis||plot.verticalaxis()===axis)){(function(axis,data,isHorizontal){var axisBoundsSetter=function(event){var columnNumber=isHorizontal?0:1,bounds=data.getBounds(columnNumber),min=axis.dataMin(),max=axis.dataMax();if(!axis.hasDataMin()){min=bounds[0]}if(!axis.hasDataMax()){max=bounds[1]}if(!axis.hasDataMin()||!axis.hasDataMax()){axis.setDataRange(min,max)}data.removeListener("dataReady",axisBoundsSetter)};data.addListener("dataReady",axisBoundsSetter)})(axis,plot.data(),plot.horizontalaxis()===axis);break}}}}});utilityFunctions.insertDefaults(this,defaultValues,attributes)});module.exports=Graph},{"../../lib/jermaine/src/jermaine.js":9,"../core/axis_binding.js":19,"../core/data_plot.js":29,"../math/box.js":100,"../util/utilityFunctions.js":157,"./axis.js":18,"./background.js":21,"./data.js":26,"./legend.js":46,"./plot.js":54,"./plotarea.js":56,"./title.js":65,"./window.js":70}],42:[function(require,module,exports){var jermaine=require("../../lib/jermaine/src/jermaine.js");var RGBColor=require("../math/rgb_color.js"),utilityFunctions=require("../util/utilityFunctions.js"),defaultValues=utilityFunctions.getDefaultValuesFromXSD(),attributes=utilityFunctions.getKeys(defaultValues.horizontalaxis.grid);var Grid=new jermaine.Model("Grid",function(){this.hasA("color").which.validatesWith(function(color){return color instanceof RGBColor});this.hasA("visible").which.isA("boolean");utilityFunctions.insertDefaults(this,defaultValues.horizontalaxis.grid,attributes)});module.exports=Grid},{"../../lib/jermaine/src/jermaine.js":9,"../math/rgb_color.js":105,"../util/utilityFunctions.js":157}],43:[function(require,module,exports){var jermaine=require("../../lib/jermaine/src/jermaine.js");var utilityFunctions=require("../util/utilityFunctions.js"),defaultValues=utilityFunctions.getDefaultValuesFromXSD(),attributes=utilityFunctions.getKeys(defaultValues.legend.icon);var Icon=new jermaine.Model("Icon",function(){this.hasA("height").which.isA("integer");this.hasA("width").which.isA("integer");this.hasA("border").which.isA("integer");utilityFunctions.insertDefaults(this,defaultValues.legend.icon,attributes)});module.exports=Icon},{"../../lib/jermaine/src/jermaine.js":9,"../util/utilityFunctions.js":157}],44:[function(require,module,exports){var jermaine=require("../../lib/jermaine/src/jermaine.js");var Point=require("../math/point.js");var utilityFunctions=require("../util/utilityFunctions.js"),defaultValues=utilityFunctions.getDefaultValuesFromXSD(),attributes=utilityFunctions.getKeys(defaultValues.background.img);var Img=new jermaine.Model("Img",function(){this.hasA("src").which.isA("string");this.hasA("anchor").which.validatesWith(function(anchor){return anchor instanceof Point});this.hasA("base").which.validatesWith(function(base){return base instanceof Point});this.hasA("position").which.validatesWith(function(position){return position instanceof Point});this.hasA("frame").which.validatesWith(function(frame){return frame===Img.PADDING||frame===Img.PLOT});this.isBuiltWith("src");utilityFunctions.insertDefaults(this,defaultValues.background.img,attributes)});Img.PADDING="padding";Img.PLOT="plot";module.exports=Img},{"../../lib/jermaine/src/jermaine.js":9,"../math/point.js":104,"../util/utilityFunctions.js":157}],45:[function(require,module,exports){var jermaine=require("../../lib/jermaine/src/jermaine.js");var DataValue=require("./data_value.js"),DataFormatter=require("./data_formatter.js"),DataMeasure=require("./data_measure.js"),Point=require("../math/point.js"),RGBColor=require("../math/rgb_color.js"),utilityFunctions=require("../util/utilityFunctions.js"),defaultValues=utilityFunctions.getDefaultValuesFromXSD(),attributes=utilityFunctions.getKeys(defaultValues.horizontalaxis.labels.label);var Labeler=new jermaine.Model("Labeler",function(){var getValue=function(valueOrFunction){if(typeof valueOrFunction==="function"){return valueOrFunction()}else{return valueOrFunction}};this.hasA("axis").which.validatesWith(function(axis){var Axis=require("./axis.js");return axis instanceof Axis});this.hasA("formatter").which.validatesWith(DataFormatter.isInstance);this.hasA("font").which.isA("string").and.which.defaultsTo("");this.hasA("start").which.validatesWith(DataValue.isInstance);this.hasA("angle").which.isA("number");this.hasA("position").which.validatesWith(function(position){return position instanceof Point});this.hasA("anchor").which.validatesWith(function(anchor){return anchor instanceof Point});this.hasA("spacing").which.validatesWith(DataMeasure.isInstance);this.hasA("densityfactor").which.isA("number").and.which.defaultsTo(1);this.hasA("color").which.validatesWith(function(color){return color instanceof RGBColor});this.hasA("visible").which.isA("boolean").and.which.defaultsTo(true);this.isBuiltWith("axis",function(){var labelsDefaults=defaultValues.horizontalaxis.labels;
if(this.axis().type()===DataValue.DATETIME){this.start(getValue(labelsDefaults["start-datetime"]))}else{this.start(getValue(labelsDefaults["start-number"]))}});this.respondsTo("initializeGeometry",function(graph){var axis=this.axis(),plotBox=graph.plotBox(),labelDefaults=defaultValues.horizontalaxis.labels.label,Axis=require("./axis.js");if(this.position()===undefined){if(axis.orientation()===Axis.HORIZONTAL){if(axis.perpOffset()>plotBox.height()/2){this.position(getValue(labelDefaults["position-horizontal-top"]))}else{this.position(getValue(labelDefaults["position-horizontal-bottom"]))}}else{if(axis.perpOffset()>plotBox.width()/2){this.position(getValue(labelDefaults["position-vertical-right"]))}else{this.position(getValue(labelDefaults["position-vertical-left"]))}}}if(this.anchor()===undefined){if(axis.orientation()===Axis.HORIZONTAL){if(axis.perpOffset()>plotBox.height()/2){this.anchor(getValue(labelDefaults["anchor-horizontal-top"]))}else{this.anchor(getValue(labelDefaults["anchor-horizontal-bottom"]))}}else{if(axis.perpOffset()>plotBox.width()/2){this.anchor(getValue(labelDefaults["anchor-vertical-right"]))}else{this.anchor(getValue(labelDefaults["anchor-vertical-left"]))}}}});this.respondsTo("isEqualExceptForSpacing",function(labeler){return this.axis()===labeler.axis()&&this.formatter().getFormatString()===labeler.formatter().getFormatString()&&this.start().eq(labeler.start())&&this.angle()===labeler.angle()&&this.position().eq(labeler.position())&&this.anchor().eq(labeler.anchor())&&this.densityfactor()===labeler.densityfactor()});this.hasA("iteratorNextValue").which.validatesWith(DataValue.isInstanceOrNull).and.which.defaultsTo(null);this.hasA("iteratorMinValue").which.validatesWith(DataValue.isInstance);this.hasA("iteratorMaxValue").which.validatesWith(DataValue.isInstance);this.respondsTo("prepare",function(minDataValue,maxDataValue){this.iteratorMinValue(minDataValue);this.iteratorMaxValue(maxDataValue);this.iteratorNextValue(this.spacing().firstSpacingLocationAtOrAfter(minDataValue,this.start()))});this.respondsTo("hasNext",function(){var value=this.iteratorNextValue();if(value===null||value===undefined){return false}return value.le(this.iteratorMaxValue())});this.respondsTo("peekNext",function(){var value=this.iteratorNextValue(),maxValue=this.iteratorMaxValue();if(value===null||value===undefined){return undefined}if(maxValue!==undefined&&value.gt(maxValue)){return undefined}return value});this.respondsTo("next",function(){var value=this.iteratorNextValue(),maxValue=this.iteratorMaxValue();if(value===null||value===undefined){return undefined}if(maxValue!==undefined&&value.gt(maxValue)){return undefined}this.iteratorNextValue(value.add(this.spacing()));return value});this.respondsTo("getLabelDensity",function(graphicsContext){var axis=this.axis(),pixelSpacing=this.spacing().getRealValue()*axis.axisToDataRatio(),minRealValue=axis.dataMin().getRealValue(),maxRealValue=axis.dataMax().getRealValue(),representativeRealValue=minRealValue+.51234567*(maxRealValue-minRealValue),representativeValue=DataValue.create(axis.type(),representativeRealValue),representativeValueString=this.formatter().format(representativeValue),Axis=require("./axis.js");var pixelFormattedValue=axis.orientation()===Axis.HORIZONTAL?this.measureStringWidth(graphicsContext,representativeValueString):this.measureStringHeight(graphicsContext,representativeValueString);return pixelFormattedValue/(pixelSpacing*this.densityfactor())});this.respondsTo("measureStringWidth",function(graphicsContext,string){return string.length*30});this.respondsTo("measureStringHeight",function(graphicsContext,string){return string.length*30});this.respondsTo("renderLabel",function(graphicsContext,value){});this.respondsTo("normalize",function(){var defaultNumberFormat="%.1f",defaultDatetimeFormat="%Y-%M-%D %H:%i",labelerFormat,type=this.axis().type();if(type===DataValue.DATETIME){labelerFormat=defaultDatetimeFormat}else{labelerFormat=defaultNumberFormat}if(this.formatter()===undefined){this.formatter(DataFormatter.create(type,labelerFormat))}});utilityFunctions.insertDefaults(this,defaultValues.horizontalaxis.labels.label,attributes)});module.exports=Labeler},{"../../lib/jermaine/src/jermaine.js":9,"../math/point.js":104,"../math/rgb_color.js":105,"../util/utilityFunctions.js":157,"./axis.js":18,"./data_formatter.js":27,"./data_measure.js":28,"./data_value.js":30}],46:[function(require,module,exports){var jermaine=require("../../lib/jermaine/src/jermaine.js");var Point=require("../math/point.js"),RGBColor=require("../math/rgb_color.js"),Icon=require("./icon.js"),Plot=require("./plot.js"),utilityFunctions=require("../util/utilityFunctions.js"),validationFunctions=require("../util/validationFunctions.js"),defaultValues=utilityFunctions.getDefaultValuesFromXSD(),attributes=utilityFunctions.getKeys(defaultValues.legend);var Legend=new jermaine.Model("Legend",function(){this.hasA("visible").which.validatesWith(function(visible){return typeof visible==="boolean"||visible===null});this.hasA("base").which.validatesWith(function(base){return base instanceof Point});this.hasAn("anchor").which.validatesWith(function(anchor){return anchor instanceof Point});this.hasA("position").which.validatesWith(function(position){return position instanceof Point});this.hasA("frame").which.validatesWith(function(frame){return frame==="plot"||frame==="padding"});this.hasA("color").which.validatesWith(function(color){return color instanceof RGBColor});this.hasA("bordercolor").which.validatesWith(function(bordercolor){return bordercolor instanceof RGBColor});this.hasA("opacity").which.validatesWith(function(opacity){return validationFunctions.validateNumberRange(opacity,0,1)});this.hasA("border").which.isA("integer");this.hasA("rows").which.isA("integer").and.isGreaterThan(0);this.hasA("columns").which.isA("integer").and.isGreaterThan(0);this.hasA("cornerradius").which.isA("integer");this.hasA("padding").which.isA("integer");this.hasAn("icon").which.validatesWith(function(icon){return icon instanceof Icon});this.isBuiltWith(function(){this.icon(new Icon)});this.hasMany("plots").eachOfWhich.validateWith(function(plot){return plot instanceof Plot});this.hasA("iconOffset").which.isAn("integer").and.defaultsTo(5);this.hasA("labelOffset").which.isAn("integer").and.defaultsTo(5);this.hasA("labelEnding").which.isAn("integer").defaultsTo(15);this.hasA("width").which.isA("number");this.hasA("height").which.isA("number");this.hasA("x").which.isA("number");this.hasA("y").which.isA("number");this.hasA("blockWidth").which.isA("number");this.hasA("blockHeight").which.isA("number");this.hasA("maxLabelWidth").which.isA("number");this.hasA("maxLabelHeight").which.isA("number");this.respondsTo("determineVisibility",function(){switch(this.visible()){case true:return true;case false:return false;case null:if(this.plots().size()>1){return true}else{return false}}});this.respondsTo("initializeGeometry",function(graph,graphicsContext){var anchor=this.anchor(),base=this.base(),position=this.position(),iconOffset=this.iconOffset(),widths=[],heights=[],label,i;if(this.determineVisibility()===false){return this}for(i=0;i<this.plots().size();i++){label=this.plots().at(i).legend().label();if(label!==undefined){label.initializeGeometry(graphicsContext);widths.push(label.origWidth());heights.push(label.origHeight())}}widths.sort(function(a,b){return b-a});heights.sort(function(a,b){return b-a});this.maxLabelWidth(widths[0]);this.maxLabelHeight(Math.max(heights[0],this.icon().height()));this.blockWidth(iconOffset+this.icon().width()+this.labelOffset()+this.maxLabelWidth()+this.labelEnding());this.blockHeight(iconOffset+this.maxLabelHeight());this.width(2*this.border()+this.columns()*this.blockWidth());this.height(2*this.border()+this.rows()*this.blockHeight()+iconOffset);if(this.frame()==="padding"){this.x((base.x()+1)*graph.paddingBox().width()/2-(anchor.x()+1)*this.width()/2+position.x());this.y((base.y()+1)*graph.paddingBox().height()/2-(anchor.y()+1)*this.height()/2+position.y())}else{this.x((base.x()+1)*graph.plotBox().width()/2-(anchor.x()+1)*this.width()/2+position.x());this.y((base.y()+1)*graph.plotBox().height()/2-(anchor.y()+1)*this.height()/2+position.y())}return this});this.respondsTo("render",function(graphicsContext){var plots=this.plots(),icon=this.icon(),blockx,blocky,iconx,icony,labelx,labely,plotCount=0,r,c;if(this.determineVisibility()===false){return this}this.begin(graphicsContext);this.renderLegend(graphicsContext);for(r=0;r<this.rows();r++){if(plotCount>=plots.size()){break}blocky=this.border()+(this.rows()-r-1)*this.blockHeight();icony=blocky+this.iconOffset();labely=icony;for(c=0;c<this.columns();c++){if(plotCount>=plots.size()){break}blockx=this.border()+c*this.blockWidth();iconx=blockx+this.iconOffset();labelx=iconx+icon.width()+this.labelOffset();plots.at(plotCount).renderer().renderLegendIcon(graphicsContext,iconx,icony,icon,this.opacity());if(icon.border()>0){icon.renderBorder(graphicsContext,iconx,icony,this.opacity())}this.renderLabel(plots.at(plotCount).legend().label(),graphicsContext,labelx,labely);plotCount++}}this.end(graphicsContext);return this});this.respondsTo("normalize",function(graph){var legendPlots=this.plots(),graphPlots=graph.plots(),columns=this.columns,rows=this.rows,i,j,flag;for(i=0;i<graphPlots.size();i++){if(!graphPlots.at(i).legend()||graphPlots.at(i).legend().visible()!==true){continue}flag=false;for(j=0;j<legendPlots.size();j++){if(graphPlots.at(i)===legendPlots.at(j)){flag=true;break}}if(flag===true){continue}legendPlots.add(graphPlots.at(i))}if(legendPlots.size()===0){if(columns()===undefined){columns(1)}if(rows()===undefined){rows(1)}}if(rows()===undefined&&columns()===undefined){columns(1)}if(columns()===undefined){columns(parseInt(legendPlots.size()/rows()+(legendPlots.size()%rows()>0?1:0),10))}else if(rows()===undefined){rows(parseInt(legendPlots.size()/columns()+(legendPlots.size()%columns()>0?1:0),10))}return this});utilityFunctions.insertDefaults(this,defaultValues.legend,attributes)});module.exports=Legend},{"../../lib/jermaine/src/jermaine.js":9,"../math/point.js":104,"../math/rgb_color.js":105,"../util/utilityFunctions.js":157,"../util/validationFunctions.js":158,"./icon.js":43,"./plot.js":54}],47:[function(require,module,exports){var jermaine=require("../../lib/jermaine/src/jermaine.js");var Mixin=new jermaine.Model("Mixin",function(){this.hasMany("mixinfuncs");this.hasA("applied").which.isA("boolean").defaultsTo(false);this.respondsTo("add",function(mixinfunc){this.mixinfuncs().add(mixinfunc)});this.respondsTo("apply",function(){if(!this.applied()){var i;for(i=0;i<this.mixinfuncs().size();++i){this.mixinfuncs().at(i).apply(this,arguments)}}this.applied(true)});this.respondsTo("reapply",function(){this.applied(false);this.apply.apply(this,arguments)})});module.exports=Mixin},{"../../lib/jermaine/src/jermaine.js":9}],48:[function(require,module,exports){var Multigraph;module.exports=function($){if(typeof Multigraph!=="undefined"){return Multigraph}var jermaine=require("../../lib/jermaine/src/jermaine.js");Multigraph=new jermaine.Model("Multigraph",function(){this.hasMany("graphs").eachOfWhich.validateWith(function(graph){var Graph=require("./graph.js");return graph instanceof Graph});this.hasA("div");this.hasA("mugl");this.hasA("ajaxthrottles");this.isBuiltWith(function(){this.ajaxthrottles([])});this.respondsTo("addAjaxThrottle",function(pattern,requests,period,concurrent){this.ajaxthrottles().push({regex:pattern?new RegExp(pattern):undefined,ajaxthrottle:$.ajaxthrottle({numRequestsPerTimePeriod:parseInt(requests,10),timePeriod:parseInt(period,10),maxConcurrent:parseInt(concurrent,10)})})});this.respondsTo("getAjaxThrottle",function(url){var throttle=undefined;$.each(this.ajaxthrottles(),function(){if(!this.regex||this.regex.test(url)){throttle=this.ajaxthrottle;return false}return true});return throttle});this.respondsTo("rebaseUrl",function(url){var baseurl=this.mugl();if(!baseurl){return url}if(/^\//.test(url)){return url}if(/:\/\//.test(url)){return url}if(!/^\//.test(baseurl)&&!/:\/\//.test(baseurl)&&!/^\.\//.test(baseurl)){baseurl="./"+baseurl}baseurl=baseurl.replace(/\?.*$/,"");baseurl=baseurl.replace(/\/[^\/]*$/,"/");return baseurl+url});this.hasA("busySpinner");this.respondsTo("busySpinnerLevel",function(delta){if(this.busySpinner()){$(this.busySpinner()).busy_spinner("level",delta)}});this.respondsTo("initializeGeometry",function(width,height,graphicsContext){var i;for(i=0;i<this.graphs().size();++i){this.graphs().at(i).initializeGeometry(width,height,graphicsContext)}});this.respondsTo("registerCommonDataCallback",function(callback){var i;for(i=0;i<this.graphs().size();++i){this.graphs().at(i).registerCommonDataCallback(callback)}});this.respondsTo("normalize",function(){var i;for(i=0;i<this.graphs().size();++i){this.graphs().at(i).normalize()}});this.respondsTo("destroy",function(){var i;for(i=0;i<this.graphs().size();++i){this.graphs().at(i).destroy()}})});Multigraph.browserHasCanvasSupport=function(){return!!window.HTMLCanvasElement&&!!window.CanvasRenderingContext2D&&function(elem){return!!(elem.getContext&&elem.getContext("2d"))}(document.createElement("canvas"))};Multigraph.browserHasSVGSupport=function(){return!!document.createElementNS&&!!document.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect};Multigraph.createGraph=function(options){var div=options.div,messageHandler,defaultMessageHandler;options.driver="canvas";if(typeof div==="string"){div=$("#"+div)[0]}if(options.width!==undefined&&options.width>0){$(div).width(options.width)}if(options.height!==undefined&&options.height>0){$(div).height(options.height)}messageHandler={};if(typeof options.error==="function"){messageHandler.error=options.error}if(typeof options.warning==="function"){messageHandler.warning=options.warning}if(!messageHandler.error||!messageHandler.warning){defaultMessageHandler=Multigraph.createDefaultMessageHandlers(div);if(!messageHandler.error){messageHandler.error=defaultMessageHandler.error}if(!messageHandler.warning){messageHandler.warning=defaultMessageHandler.warning}}options.messageHandler=messageHandler;if(options.muglString!==undefined){if(options.driver==="canvas"){return Multigraph.createCanvasGraphFromString(options)}else if(options.driver==="raphael"){return Multigraph.createRaphaelGraphFromString(options)}else{options.messageHanlder.error(new Error("invalid graphic driver '"+options.driver+"' specified to Multigraph.createGraph"));return undefined}}if(options.driver==="canvas"){return Multigraph.createCanvasGraph(options)}else if(options.driver==="raphael"){return Multigraph.createRaphaelGraph(options)}else{options.messageHanlder.error(new Error("invalid graphic driver '"+options.driver+"' specified to Multigraph.createGraph"));return undefined}};Multigraph.create=Multigraph.createGraph;Multigraph.createDefaultMessageHandlers=function(div){$(div).css("position","relative");$(div).errorDisplay({});return{error:function(e){var stackTrace=e.stack&&typeof e.stack==="string"?e.stack.replace(/\n/g,"</li><li>"):e.message;$(div).errorDisplay("displayError",stackTrace,e.message,{fontColor:"#000000",backgroundColor:"#ff0000",indicatorColor:"#ff0000"})},warning:function(w){var message="Warning: "+(typeof w==="string"?w:w.message),stackTrace=typeof w!=="string"&&w.stack&&typeof w.stack==="string"?w.stack.replace(/\n/g,"</li><li>"):message;$(div).errorDisplay("displayError",stackTrace,message,{fontColor:"#000000",backgroundColor:"#e06a1b",indicatorColor:"#e06a1b"})}}};Multigraph._dataAdapters={};Multigraph.installDataAdapter=function(name,adapter){Multigraph._dataAdapters[name]=adapter};Multigraph.getDataAdapter=function(name){return Multigraph._dataAdapters[name]};Multigraph.sprintf=require("sprintf");return Multigraph}},{"../../lib/jermaine/src/jermaine.js":9,"./graph.js":41,sprintf:16}],49:[function(require,module,exports){var jermaine=require("../../lib/jermaine/src/jermaine.js");var sprintf=require("sprintf");var NumberFormatter=function(format){var testString;if(typeof format!=="string"){throw new Error("format must be a string")}this.formatString=format;testString=sprintf(format,0);this.length=testString.length};NumberFormatter.prototype.format=function(value){return sprintf(this.formatString,value.getRealValue())};NumberFormatter.prototype.getMaxLength=function(){return this.length};NumberFormatter.prototype.getFormatString=function(){return this.formatString};module.exports=NumberFormatter},{"../../lib/jermaine/src/jermaine.js":9,sprintf:16}],50:[function(require,module,exports){var jermaine=require("../../lib/jermaine/src/jermaine.js");NumberValue=require("./number_value.js");var epsilon=1e-12;var NumberMeasure=function(measure){this.measure=measure};NumberMeasure.prototype.getRealValue=function(){return this.measure};NumberMeasure.prototype.toString=function(){return this.measure.toString()};NumberMeasure.prototype.firstSpacingLocationAtOrAfter=function(value,alignment){var f,n,m,a=alignment.value,v=value.value,s=Math.abs(this.measure);f=(v-a)/s;n=Math.floor(f);m=n+1;if(f-n<epsilon||m-f<epsilon){return new NumberValue(v)}return new NumberValue(a+s*m)};function lastSpacingLocationAtOrBefore(s,v,a){var n,n,f;v=v-a;if(v>=0){f=v/s;n=Math.floor(f);if(f-n<epsilon){return v}return a+n*s}else{f=-v/s;n=Math.ceil(f);if(n-f<epsilon){return v}return a-n*s}}NumberMeasure.prototype.lastSpacingLocationAtOrBefore=function(value,alignment){return new NumberValue(lastSpacingLocationAtOrBefore(this.measure,value.value,alignment.value))};NumberMeasure.parse=function(s){return new NumberMeasure(parseFloat(s))};module.exports=NumberMeasure},{"../../lib/jermaine/src/jermaine.js":9,"./number_value.js":51}],51:[function(require,module,exports){var jermaine=require("../../lib/jermaine/src/jermaine.js");DataValue=require("./data_value.js");var NumberValue=function(value){this.value=value};NumberValue.prototype.getRealValue=function(){return this.value};NumberValue.prototype.toString=function(){return this.value.toString()};NumberValue.prototype.compareTo=function(x){if(this.value<x.value){return-1}else if(this.value>x.value){return 1}return 0};NumberValue.prototype.addRealValue=function(realValueIncr){return new NumberValue(this.value+realValueIncr)};NumberValue.prototype.add=function(measure){return new NumberValue(this.value+measure.measure)};NumberValue.prototype.type=DataValue.NUMBER;NumberValue.prototype.clone=function(){return new NumberValue(this.value)};NumberValue.parse=function(s){return new NumberValue(parseFloat(s))};DataValue.mixinComparators(NumberValue.prototype);module.exports=NumberValue},{"../../lib/jermaine/src/jermaine.js":9,"./data_value.js":30}],52:[function(require,module,exports){var jermaine=require("../../lib/jermaine/src/jermaine.js");DataValue=require("./data_value.js");var utilityFunctions=require("../util/utilityFunctions.js"),defaultValues=utilityFunctions.getDefaultValuesFromXSD(),attributes=utilityFunctions.getKeys(defaultValues.horizontalaxis.pan);var Pan=new jermaine.Model("Pan",function(){this.hasA("allowed").which.isA("boolean");this.hasA("min").which.validatesWith(DataValue.isInstanceOrNull);this.hasA("max").which.validatesWith(DataValue.isInstanceOrNull);utilityFunctions.insertDefaults(this,defaultValues.horizontalaxis.pan,attributes)});module.exports=Pan},{"../../lib/jermaine/src/jermaine.js":9,"../util/utilityFunctions.js":157,"./data_value.js":30}],53:[function(require,module,exports){var jermaine=require("../../lib/jermaine/src/jermaine.js");var ArrayData=require("./array_data.js"),DataMeasure=require("./data_measure.js"),DataValue=require("./data_value.js");var PeriodicArrayData=new jermaine.Model(function(){var PeriodicArrayData=this,emptyIterator={next:function(){},hasNext:function(){return false}};this.isA(ArrayData);this.hasA("period").which.validatesWith(DataMeasure.isInstance);this.isBuiltWith("columns","stringArray","period",function(){this.init();this.addListener("listenerAdded",function(event){var data=this.array();if(event.targetType==="dataReady"){event.listener(data[0][0],data[data.length-1][0])}})});this.respondsTo("getIterator",function(columnIds,min,max,buffer){return PeriodicArrayData.getArrayDataIterator(this,columnIds,min,max,buffer)});PeriodicArrayData.getArrayDataIterator=function(periodicArrayData,columnIds,min,max,buffer){var iter={},arraySlice=[],curr=0,i,j,currentIndex,columnIndices,array=periodicArrayData.array();buffer=buffer||0;if(Object.prototype.toString.apply(columnIds)!=="[object Array]"){throw new Error("ArrayData: getIterator method requires that the first parameter be an array of strings")}else{for(i=0;i<columnIds.length;++i){if(typeof columnIds[i]!=="string"){throw new Error("ArrayData: getIterator method requires that the first parameter be an array of strings")}}}if(!DataValue.isInstance(min)||!DataValue.isInstance(max)){throw new Error("ArrayData: getIterator method requires the second and third argument to be number values")}if(typeof buffer!=="number"){throw new Error("ArrayData: getIterator method requires last argument to be an integer")}if(array.length===0){return emptyIterator}var baseValue=array[0][0];var b=periodicArrayData.period().lastSpacingLocationAtOrBefore(min,baseValue);var offsetRealValue=b.getRealValue()-baseValue.getRealValue();var baseMin=DataValue.create(min.type,min.getRealValue()-offsetRealValue);for(currentIndex=0;currentIndex<array.length;++currentIndex){if(array[currentIndex][0].ge(baseMin)){break}}if(currentIndex===array.length){currentIndex=0}var currentValue=DataValue.create(array[currentIndex][0].type,array[currentIndex][0].getRealValue()+offsetRealValue);columnIndices=[];for(j=0;j<columnIds.length;++j){var k=periodicArrayData.columnIdToColumnNumber(columnIds[j]);columnIndices.push(k)}return{next:function(){var projection=[],i,x;if(currentIndex<0){return null}for(i=0;i<columnIndices.length;++i){if(columnIndices[i]===0){projection.push(currentValue)}else{projection.push(array[currentIndex][columnIndices[i]])}}++currentIndex;if(currentIndex>=array.length){currentIndex=0;b=b.add(periodicArrayData.period());offsetRealValue=b.getRealValue()-baseValue.getRealValue()}currentValue=DataValue.create(array[currentIndex][0].type,array[currentIndex][0].getRealValue()+offsetRealValue);if(currentValue.gt(max)){currentIndex=-1}return projection},hasNext:function(){return currentIndex>=0}}}});module.exports=PeriodicArrayData},{"../../lib/jermaine/src/jermaine.js":9,"./array_data.js":17,"./data_measure.js":28,"./data_value.js":30}],54:[function(require,module,exports){var jermaine=require("../../lib/jermaine/src/jermaine.js");var PlotLegend=require("./plot_legend.js"),Axis=require("./axis.js"),Renderer=require("./renderer.js");var Plot=new jermaine.Model("Plot",function(){this.hasA("legend").which.validatesWith(function(legend){return legend instanceof PlotLegend});this.hasA("horizontalaxis").which.validatesWith(function(axis){return axis instanceof Axis});this.hasA("verticalaxis").which.validatesWith(function(axis){return axis instanceof Axis});this.hasA("renderer").which.validatesWith(function(renderer){return renderer instanceof Renderer});this.hasA("visible").which.isA("boolean").and.defaultsTo(true);this.respondsTo("normalize",function(graph){var graphAxes=graph.axes(),rendererType,numberOfVariables,findNextVariableAtOrAfter,i,DataPlot=require("../core/data_plot.js");findNextVariableAtOrAfter=function(plot,data,index){var overlapFlag=false,variableInPlotFlag,i=index,j,variable;while(true){if(i===index&&overlapFlag===true){throw new Error("Plot Normalizer: There does not exist an unused variable")}if(i===data.columns().size()){i=0;overlapFlag=true}variableInPlotFlag=false;variable=data.columns().at(i);for(j=0;j<plot.variable().size();j++){if(plot.variable().at(j)===variable){variableInPlotFlag=true;break}}if(variableInPlotFlag===false){return variable}i++}};if(this.horizontalaxis()===undefined){for(i=0;i<graphAxes.size();i++){if(graphAxes.at(i).orientation()===Axis.HORIZONTAL){this.horizontalaxis(graphAxes.at(i));break}}}if(this.verticalaxis()===undefined){for(i=0;i<graphAxes.size();i++){if(graphAxes.at(i).orientation()===Axis.VERTICAL){this.verticalaxis(graphAxes.at(i));break}}}if(this.renderer()===undefined){require("./renderers/all_renderers.js");rendererType=Renderer.Type.parse("line");this.renderer(Renderer.create(rendererType));this.renderer().plot(this)}numberOfVariables=this.renderer().numberOfVariables();if(this instanceof DataPlot){var plotData=this.data,plotVariables=this.variable();if(plotData()===undefined){plotData(graph.data().at(0))}if(plotVariables.size()===0){plotVariables.add(findNextVariableAtOrAfter(this,plotData(),0))}if(plotVariables.at(0)===null){plotVariables.replace(0,findNextVariableAtOrAfter(this,plotData(),0))}while(plotVariables.size()<numberOfVariables){plotVariables.add(findNextVariableAtOrAfter(this,plotData(),1))}if(this.datatips()){this.datatips().normalize(this)}}})});module.exports=Plot},{"../../lib/jermaine/src/jermaine.js":9,"../core/data_plot.js":29,"./axis.js":18,"./plot_legend.js":55,"./renderer.js":57,"./renderers/all_renderers.js":58}],55:[function(require,module,exports){var jermaine=require("../../lib/jermaine/src/jermaine.js");var Text=require("./text.js"),utilityFunctions=require("../util/utilityFunctions.js"),defaultValues=utilityFunctions.getDefaultValuesFromXSD(),attributes=utilityFunctions.getKeys(defaultValues.plot.legend);var PlotLegend=new jermaine.Model("PlotLegend",function(){this.hasA("visible").which.isA("boolean");this.hasA("label").which.validatesWith(function(label){return label instanceof Text});utilityFunctions.insertDefaults(this,defaultValues.plot.legend,attributes)});module.exports=PlotLegend},{"../../lib/jermaine/src/jermaine.js":9,"../util/utilityFunctions.js":157,"./text.js":64}],56:[function(require,module,exports){var jermaine=require("../../lib/jermaine/src/jermaine.js");var RGBColor=require("../math/rgb_color.js"),Insets=require("../math/insets.js"),utilityFunctions=require("../util/utilityFunctions.js"),defaultValues=utilityFunctions.getDefaultValuesFromXSD(),attributes=utilityFunctions.getKeys(defaultValues.plotarea);var Plotarea=new jermaine.Model("Plotarea",function(){this.hasA("margin").which.validatesWith(function(margin){return margin instanceof Insets});this.hasA("border").which.isA("integer");this.hasA("color").which.validatesWith(function(color){return color===null||color instanceof RGBColor});this.hasA("bordercolor").which.validatesWith(function(bordercolor){return bordercolor instanceof RGBColor});utilityFunctions.insertDefaults(this,defaultValues.plotarea,attributes)});module.exports=Plotarea},{"../../lib/jermaine/src/jermaine.js":9,"../math/insets.js":103,"../math/rgb_color.js":105,"../util/utilityFunctions.js":157}],57:[function(require,module,exports){var jermaine=require("../../lib/jermaine/src/jermaine.js");var Warning=require("./warning.js"),Enum=require("../math/enum.js"),rendererList,utilityFunctions=require("../util/utilityFunctions.js"),defaultValues=utilityFunctions.getDefaultValuesFromXSD(),attributes=utilityFunctions.getKeys(defaultValues.plot.renderer),Type=new Enum("RendererType"),RGBColor=require("../math/rgb_color.js");var Renderer=new jermaine.Model("Renderer",function(){this.hasA("type").which.validatesWith(Type.isInstance);this.hasA("plot").which.validatesWith(function(plot){var Plot=require("./plot.js");return plot instanceof Plot});this.hasA("numberOfVariables").which.isA("number");this.hasA("filter").which.validatesWith(function(filter){return typeof filter==="undefined"||typeof filter.reset==="function"&&typeof filter.filter==="function"});this.respondsTo("setUpMissing",function(){var plot=this.plot(),data;if(!plot){console.log("Warning: renderer.setUpMissing() called for renderer that has no plot ref");return}var ConstantPlot=require("./constant_plot.js");if(plot instanceof ConstantPlot){this.isMissing=function(p){return false};return}if(!plot.data()){console.log("Warning: renderer.setUpMissing() called for renderer whose plot has no data ref");return}data=plot.data();this.isMissing=function(p){var i;for(i=1;i<p.length;++i){if(data.isMissing(p[i],i)){return true}}return false}});this.isBuiltWith("type");utilityFunctions.insertDefaults(this,defaultValues.plot.renderer,attributes);this.respondsTo("transformPoint",function(input){var output=[],haxis=this.plot().horizontalaxis(),vaxis=this.plot().verticalaxis(),i;output[0]=haxis.dataValueToAxisValue(input[0]);for(i=1;i<input.length;++i){output[i]=vaxis.dataValueToAxisValue(input[i])}return output});var equalOrUndefined=function(a,b){return a===b||a===undefined&&b===undefined};this.respondsTo("setOption",function(name,value,min,max){var rendererOpt,rendererOpts,i;if(!this.optionsMetadata[name]){throw new Error("attempt to set unknown renderer option '"+name+"'")}rendererOpts=this.options()[name]();for(i=0;i<rendererOpts.size();++i){if(equalOrUndefined(rendererOpts.at(i).min(),min)&&equalOrUndefined(rendererOpts.at(i).max(),max)){rendererOpts.at(i).value(value);return}}rendererOpt=new this.optionsMetadata[name].type;rendererOpt.value(value);rendererOpt.min(min);rendererOpt.max(max);rendererOpts.add(rendererOpt)});this.respondsTo("setOptionFromString",function(name,stringValue,stringMin,stringMax){var plot=this.plot(),type=this.type(),DataValue=require("./data_value.js");var warning=undefined;if(name==="dotsize"){name="pointsize";warning=new Warning('deprecated "dotsize" option used for "'+type+'" renderer; use "pointsize" instead')}else if(name==="dotcolor"){name="pointcolor";warning=new Warning('deprecated "dotcolor" option used for "'+type+'" renderer; use "pointcolor" instead')}var rendererOpt;if(!this.optionsMetadata[name]){throw new Warning('"'+type+'"'+' renderer has no option named "'+name+'"')}rendererOpt=new this.optionsMetadata[name].type;rendererOpt.parseValue(stringValue,this);if(plot&&plot.verticalaxis()){if(stringMin!==undefined){rendererOpt.min(DataValue.parse(plot.verticalaxis().type(),stringMin))}if(stringMax!==undefined){rendererOpt.max(DataValue.parse(plot.verticalaxis().type(),stringMax))}}this.setOption(name,rendererOpt.value(),rendererOpt.min(),rendererOpt.max());if(warning){throw warning}});this.respondsTo("getOptionValue",function(optionName,value){var i,options,optionList;options=this.options();if(typeof options[optionName]!=="function"){throw new Error('unknown option "'+optionName+'"')}optionList=options[optionName]();if(!optionList){throw new Error('unknown option "'+optionName+'"')}for(i=optionList.size()-1;i>=0;--i){var option=optionList.at(i);if((option.min()===undefined||value===undefined||option.min().le(value))&&(option.max()===undefined||value===undefined||option.max().gt(value))){return option.value()}}});this.respondsTo("begin",function(){});this.respondsTo("dataPoint",function(point){});this.respondsTo("end",function(){})});rendererList=[];Renderer.addType=function(rendererObj){rendererList.push(rendererObj)};Renderer.create=function(type){var i,renderer;for(i=0;i<rendererList.length;++i){if(rendererList[i].type===type){renderer=new rendererList[i].model;renderer.type(type);return renderer}}throw new Error("Renderer.create: '"+type+"' is not a known renderer type")};Renderer.declareOptions=function(renderer,OptionsModelName,options){var i,OptionsModel,optionsMetadata,declareOption=function(optionName,optionType){OptionsModel.hasMany(optionName).eachOfWhich.validateWith(function(v){return v instanceof optionType})};OptionsModel=new jermaine.Model(OptionsModelName,function(){});optionsMetadata={};for(i=0;i<options.length;++i){declareOption(options[i].name,options[i].type);optionsMetadata[options[i].name]={type:options[i].type,"default":options[i]["default"]}}renderer.hasA("options").isImmutable().defaultsTo(function(){return new OptionsModel});renderer.prototype.optionsMetadata=optionsMetadata;renderer.isBuiltWith(function(){var optionsMetadata=this.optionsMetadata,opt,ropt;for(opt in optionsMetadata){if(optionsMetadata.hasOwnProperty(opt)){ropt=new optionsMetadata[opt].type(optionsMetadata[opt]["default"]);
this.options()[opt]().add(ropt)}}})};Renderer.Option=new jermaine.Model("Renderer.Option",function(){var DataValue=require("./data_value.js");this.hasA("min").which.validatesWith(DataValue.isInstance);this.hasA("max").which.validatesWith(DataValue.isInstance)});Renderer.RGBColorOption=new jermaine.Model("Renderer.RGBColorOption",function(){this.isA(Renderer.Option);this.hasA("value").which.validatesWith(function(v){return v instanceof RGBColor||v===null});this.isBuiltWith("value");this.respondsTo("serializeValue",function(){return this.value().getHexString()});this.respondsTo("parseValue",function(string){this.value(RGBColor.parse(string))});this.respondsTo("valueEq",function(value){return this.value().eq(value)})});Renderer.NumberOption=new jermaine.Model("Renderer.NumberOption",function(){this.isA(Renderer.Option);this.hasA("value").which.isA("number");this.isBuiltWith("value");this.respondsTo("serializeValue",function(){return this.value().toString()});this.respondsTo("parseValue",function(string){this.value(parseFloat(string))});this.respondsTo("valueEq",function(value){return this.value()===value})});Renderer.DataValueOption=new jermaine.Model("Renderer.DataValueOption",function(){this.isA(Renderer.Option);this.hasA("value").which.validatesWith(function(value){var DataValue=require("./data_value.js");return DataValue.isInstance(value)||value===null});this.isBuiltWith("value");this.respondsTo("serializeValue",function(){return this.value()});this.respondsTo("valueEq",function(value){return this.value().eq(value)})});Renderer.VerticalDataValueOption=new jermaine.Model("Renderer.DataValueOption",function(){this.isA(Renderer.DataValueOption);this.isBuiltWith("value");this.respondsTo("parseValue",function(string,renderer){var DataValue=require("./data_value.js");this.value(DataValue.parse(renderer.plot().verticalaxis().type(),string))})});Renderer.HorizontalDataValueOption=new jermaine.Model("Renderer.DataValueOption",function(){this.isA(Renderer.DataValueOption);this.isBuiltWith("value");this.respondsTo("parseValue",function(string,renderer){var DataValue=require("./data_value.js");this.value(DataValue.parse(renderer.plot().horizontalaxis().type(),string))})});Renderer.DataMeasureOption=new jermaine.Model("Renderer.DataMeasureOption",function(){this.isA(Renderer.Option);this.hasA("value").which.validatesWith(function(value){var DataMeasure=require("./data_measure.js");return DataMeasure.isInstance(value)||value===null});this.isBuiltWith("value");this.respondsTo("serializeValue",function(){return this.value()});this.respondsTo("valueEq",function(value){return this.value().eq(value)})});Renderer.VerticalDataMeasureOption=new jermaine.Model("Renderer.DataMeasureOption",function(){this.isA(Renderer.DataMeasureOption);this.respondsTo("parseValue",function(string,renderer){var DataMeasure=require("./data_measure.js");this.value(DataMeasure.parse(renderer.plot().verticalaxis().type(),string))})});Renderer.HorizontalDataMeasureOption=new jermaine.Model("Renderer.DataMeasureOption",function(){this.isA(Renderer.DataMeasureOption);this.isBuiltWith("value");this.respondsTo("parseValue",function(string,renderer){var DataMeasure=require("./data_measure.js");this.value(DataMeasure.parse(renderer.plot().horizontalaxis().type(),string))})});Renderer.Type=Type;module.exports=Renderer},{"../../lib/jermaine/src/jermaine.js":9,"../math/enum.js":102,"../math/rgb_color.js":105,"../util/utilityFunctions.js":157,"./constant_plot.js":24,"./data_measure.js":28,"./data_value.js":30,"./plot.js":54,"./warning.js":66}],58:[function(require,module,exports){require("./band_renderer.js");require("./bar_renderer.js");require("./fill_renderer.js");require("./pointline_renderer.js");require("./rangebar_renderer.js")},{"./band_renderer.js":59,"./bar_renderer.js":60,"./fill_renderer.js":61,"./pointline_renderer.js":62,"./rangebar_renderer.js":63}],59:[function(require,module,exports){var jermaine=require("../../../lib/jermaine/src/jermaine.js");var Renderer=require("../renderer.js"),RGBColor=require("../../math/rgb_color.js");var BandRenderer=new jermaine.Model("BandRenderer",function(){this.isA(Renderer);this.hasA("numberOfVariables").which.defaultsTo(3)});BandRenderer.GRAY=parseInt("80",16)/255;Renderer.declareOptions(BandRenderer,"BandRendererOptions",[{name:"linecolor",type:Renderer.RGBColorOption,"default":new RGBColor(0,0,0)},{name:"linewidth",type:Renderer.NumberOption,"default":1},{name:"line1color",type:Renderer.RGBColorOption,"default":null},{name:"line1width",type:Renderer.NumberOption,"default":-1},{name:"line2color",type:Renderer.RGBColorOption,"default":null},{name:"line2width",type:Renderer.NumberOption,"default":-1},{name:"fillcolor",type:Renderer.RGBColorOption,"default":new RGBColor(BandRenderer.GRAY,BandRenderer.GRAY,BandRenderer.GRAY)},{name:"fillopacity",type:Renderer.NumberOption,"default":1}]);Renderer.BAND=new Renderer.Type("band");Renderer.addType({type:Renderer.Type.parse("band"),model:BandRenderer});module.exports=BandRenderer},{"../../../lib/jermaine/src/jermaine.js":9,"../../math/rgb_color.js":105,"../renderer.js":57}],60:[function(require,module,exports){var jermaine=require("../../../lib/jermaine/src/jermaine.js");var Renderer=require("../renderer.js"),RGBColor=require("../../math/rgb_color.js"),DataMeasure=require("../data_measure.js"),utilityFunctions=require("../../util/utilityFunctions.js"),defaultValues=utilityFunctions.getDefaultValuesFromXSD(),attributes=utilityFunctions.getKeys(defaultValues.plot.renderer);var BarRenderer=new jermaine.Model("BarRenderer",function(){this.isA(Renderer);this.hasA("numberOfVariables").which.defaultsTo(2)});Renderer.declareOptions(BarRenderer,"BarRendererOptions",[{name:"barwidth",type:Renderer.HorizontalDataMeasureOption,"default":new DataMeasure.parse("number",0)},{name:"baroffset",type:Renderer.NumberOption,"default":0},{name:"barbase",type:Renderer.VerticalDataValueOption,"default":null},{name:"fillcolor",type:Renderer.RGBColorOption,"default":new RGBColor(0,0,0)},{name:"fillopacity",type:Renderer.NumberOption,"default":1},{name:"linecolor",type:Renderer.RGBColorOption,"default":new RGBColor(0,0,0)},{name:"hidelines",type:Renderer.NumberOption,"default":2}]);Renderer.BAR=new Renderer.Type("bar");Renderer.addType({type:Renderer.Type.parse("bar"),model:BarRenderer});module.exports=BarRenderer},{"../../../lib/jermaine/src/jermaine.js":9,"../../math/rgb_color.js":105,"../../util/utilityFunctions.js":157,"../data_measure.js":28,"../renderer.js":57}],61:[function(require,module,exports){var jermaine=require("../../../lib/jermaine/src/jermaine.js");var Renderer=require("../renderer.js"),RGBColor=require("../../math/rgb_color.js"),utilityFunctions=require("../../util/utilityFunctions.js"),defaultValues=utilityFunctions.getDefaultValuesFromXSD(),attributes=utilityFunctions.getKeys(defaultValues.plot.renderer),defaultValues=utilityFunctions.getDefaultValuesFromXSD(),attributes=utilityFunctions.getKeys(defaultValues.plot.renderer);var FillRenderer=new jermaine.Model("FillRenderer",function(){this.isA(Renderer);this.hasA("numberOfVariables").which.defaultsTo(2)});FillRenderer.GRAY=parseInt("80",16)/255;Renderer.declareOptions(FillRenderer,"FillRendererOptions",[{name:"linecolor",type:Renderer.RGBColorOption,"default":new RGBColor(0,0,0)},{name:"linewidth",type:Renderer.NumberOption,"default":1},{name:"fillcolor",type:Renderer.RGBColorOption,"default":new RGBColor(FillRenderer.GRAY,FillRenderer.GRAY,FillRenderer.GRAY)},{name:"downfillcolor",type:Renderer.RGBColorOption,"default":null},{name:"fillopacity",type:Renderer.NumberOption,"default":1},{name:"fillbase",type:Renderer.VerticalDataValueOption,"default":null}]);Renderer.FILL=new Renderer.Type("fill");Renderer.addType({type:Renderer.Type.parse("fill"),model:FillRenderer});module.exports=FillRenderer},{"../../../lib/jermaine/src/jermaine.js":9,"../../math/rgb_color.js":105,"../../util/utilityFunctions.js":157,"../renderer.js":57}],62:[function(require,module,exports){var jermaine=require("../../../lib/jermaine/src/jermaine.js");var Renderer=require("../renderer.js"),RGBColor=require("../../math/rgb_color.js"),utilityFunctions=require("../../util/utilityFunctions.js"),defaultValues=utilityFunctions.getDefaultValuesFromXSD(),attributes=utilityFunctions.getKeys(defaultValues.plot.renderer);var PointlineRenderer=new jermaine.Model("PointlineRenderer",function(){this.isA(Renderer);this.hasA("numberOfVariables").which.defaultsTo(2)});PointlineRenderer.CIRCLE="circle";PointlineRenderer.SQUARE="square";PointlineRenderer.TRIANGLE="triangle";PointlineRenderer.DIAMOND="diamond";PointlineRenderer.STAR="star";PointlineRenderer.PLUS="plus";PointlineRenderer.X="x";PointlineRenderer.shapes=[PointlineRenderer.CIRCLE,PointlineRenderer.SQUARE,PointlineRenderer.TRIANGLE,PointlineRenderer.DIAMOND,PointlineRenderer.STAR,PointlineRenderer.PLUS,PointlineRenderer.X];PointlineRenderer.isShape=function(shape){var i;for(i=0;i<PointlineRenderer.shapes.length;++i){if(PointlineRenderer.shapes[i]===shape){return true}}return false};PointlineRenderer.parseShape=function(string){if(string.toLowerCase()===PointlineRenderer.CIRCLE){return PointlineRenderer.CIRCLE}if(string.toLowerCase()===PointlineRenderer.SQUARE){return PointlineRenderer.SQUARE}if(string.toLowerCase()===PointlineRenderer.TRIANGLE){return PointlineRenderer.TRIANGLE}if(string.toLowerCase()===PointlineRenderer.DIAMOND){return PointlineRenderer.DIAMOND}if(string.toLowerCase()===PointlineRenderer.STAR){return PointlineRenderer.STAR}if(string.toLowerCase()===PointlineRenderer.PLUS){return PointlineRenderer.PLUS}if(string.toLowerCase()===PointlineRenderer.X){return PointlineRenderer.X}throw new Error("unknown point shape: "+string)};PointlineRenderer.serializeShape=function(shape){return shape};PointlineRenderer.ShapeOption=new jermaine.Model("PointlineRenderer.ShapeOption",function(){this.isA(Renderer.Option);this.hasA("value").which.validatesWith(PointlineRenderer.isShape);this.isBuiltWith("value");this.respondsTo("serializeValue",function(){return PointlineRenderer.serializeShape(this.value())});this.respondsTo("parseValue",function(string){this.value(PointlineRenderer.parseShape(string))});this.respondsTo("valueEq",function(value){return this.value()===value})});PointlineRenderer.SOLID="solid";PointlineRenderer.DASHED="dashed";PointlineRenderer.strokes=[PointlineRenderer.SOLID,PointlineRenderer.DASHED];PointlineRenderer.isStroke=function(stroke){var i;for(i=0;i<PointlineRenderer.strokes.length;++i){if(PointlineRenderer.strokes[i]===stroke){return true}}return false};PointlineRenderer.parseStroke=function(string){if(string.toLowerCase()===PointlineRenderer.SOLID){return PointlineRenderer.SOLID}if(string.toLowerCase()===PointlineRenderer.DASHED){return PointlineRenderer.DASHED}throw new Error("unknown line stroke: "+string)};PointlineRenderer.serializeStroke=function(stroke){return stroke};PointlineRenderer.StrokeOption=new jermaine.Model("PointlineRenderer.StrokeOption",function(){this.isA(Renderer.Option);this.hasA("value").which.validatesWith(PointlineRenderer.isStroke);this.isBuiltWith("value");this.respondsTo("serializeValue",function(){return PointlineRenderer.serializeStroke(this.value())});this.respondsTo("parseValue",function(string){this.value(PointlineRenderer.parseStroke(string))});this.respondsTo("valueEq",function(value){return this.value()===value})});Renderer.declareOptions(PointlineRenderer,"PointlineRendererOptions",[{name:"linecolor",type:Renderer.RGBColorOption,"default":new RGBColor(0,0,0)},{name:"linewidth",type:Renderer.NumberOption,"default":1},{name:"pointshape",type:PointlineRenderer.ShapeOption,"default":PointlineRenderer.CIRCLE},{name:"linestroke",type:PointlineRenderer.StrokeOption,"default":PointlineRenderer.SOLID},{name:"pointsize",type:Renderer.NumberOption,"default":0},{name:"pointcolor",type:Renderer.RGBColorOption,"default":new RGBColor(0,0,0)},{name:"pointopacity",type:Renderer.NumberOption,"default":1},{name:"pointoutlinewidth",type:Renderer.NumberOption,"default":0},{name:"pointoutlinecolor",type:Renderer.RGBColorOption,"default":new RGBColor(0,0,0)}]);Renderer.POINTLINE=new Renderer.Type("pointline");Renderer.POINT=new Renderer.Type("point");Renderer.LINE=new Renderer.Type("line");Renderer.addType({type:Renderer.Type.parse("pointline"),model:PointlineRenderer});Renderer.addType({type:Renderer.Type.parse("line"),model:PointlineRenderer});Renderer.addType({type:Renderer.Type.parse("point"),model:PointlineRenderer});module.exports=PointlineRenderer},{"../../../lib/jermaine/src/jermaine.js":9,"../../math/rgb_color.js":105,"../../util/utilityFunctions.js":157,"../renderer.js":57}],63:[function(require,module,exports){var jermaine=require("../../../lib/jermaine/src/jermaine.js");var Renderer=require("../renderer.js"),RGBColor=require("../../math/rgb_color.js"),DataMeasure=require("../data_measure.js"),utilityFunctions=require("../../util/utilityFunctions.js"),defaultValues=utilityFunctions.getDefaultValuesFromXSD(),attributes=utilityFunctions.getKeys(defaultValues.plot.renderer);var RangeBarRenderer=new jermaine.Model("RangeBarRenderer",function(){this.isA(Renderer);this.hasA("numberOfVariables").which.defaultsTo(3)});Renderer.declareOptions(RangeBarRenderer,"RangeBarRendererOptions",[{name:"barwidth",type:Renderer.HorizontalDataMeasureOption,"default":new DataMeasure.parse("number",0)},{name:"baroffset",type:Renderer.NumberOption,"default":0},{name:"fillcolor",type:Renderer.RGBColorOption,"default":RGBColor.parse("0x808080")},{name:"fillopacity",type:Renderer.NumberOption,"default":1},{name:"linecolor",type:Renderer.RGBColorOption,"default":new RGBColor(0,0,0)},{name:"linewidth",type:Renderer.NumberOption,"default":1},{name:"hidelines",type:Renderer.NumberOption,"default":2}]);Renderer.RANGEBAR=new Renderer.Type("rangebar");Renderer.addType({type:Renderer.Type.parse("rangebar"),model:RangeBarRenderer});module.exports=RangeBarRenderer},{"../../../lib/jermaine/src/jermaine.js":9,"../../math/rgb_color.js":105,"../../util/utilityFunctions.js":157,"../data_measure.js":28,"../renderer.js":57}],64:[function(require,module,exports){var jermaine=require("../../lib/jermaine/src/jermaine.js");var Text=new jermaine.Model("Text",function(){this.isBuiltWith("string");this.hasA("string").which.isA("string");this.hasA("origWidth").which.isA("number");this.hasA("origHeight").which.isA("number");this.hasA("rotatedWidth").which.isA("number");this.hasA("rotatedHeight").which.isA("number");this.hasA("font").which.isA("string").and.which.defaultsTo("");this.respondsTo("initializeGeometry",function(graphicsContext){var origWidth,origHeight,rotatedWidth,rotatedHeight;origWidth=this.measureStringWidth(graphicsContext);origHeight=this.measureStringHeight(graphicsContext);rotatedWidth=origWidth;rotatedHeight=origHeight;if(graphicsContext&&graphicsContext.angle!==undefined){var angle=graphicsContext.angle/180*Math.PI;rotatedWidth=Math.abs(Math.cos(angle))*origWidth+Math.abs(Math.sin(angle))*origHeight;rotatedHeight=Math.abs(Math.sin(angle))*origWidth+Math.abs(Math.cos(angle))*origHeight}this.origWidth(origWidth);this.origHeight(origHeight);this.rotatedWidth(rotatedWidth);this.rotatedHeight(rotatedHeight);return this});this.respondsTo("measureStringWidth",function(graphicsContext){var lines,maxLength=1,testLength,i;if(this.string()===undefined){throw new Error("measureStringWidth requires the string attr to be set.")}lines=this.string().split(/\n/);for(i=0;i<lines.length;i++){testLength=lines[i].length;if(testLength>maxLength){maxLength=testLength}}return maxLength*15});this.respondsTo("measureStringHeight",function(graphicsContext){if(this.string()===undefined){throw new Error("measureStringHeight requires the string attr to be set.")}var newlineCount=this.string().match(/\n/g);return(newlineCount!==null?newlineCount.length+1:1)*12})});module.exports=Text},{"../../lib/jermaine/src/jermaine.js":9}],65:[function(require,module,exports){var jermaine=require("../../lib/jermaine/src/jermaine.js");var Text=require("./text.js"),RGBColor=require("../math/rgb_color.js"),Point=require("../math/point.js"),utilityFunctions=require("../util/utilityFunctions.js"),defaultValues=utilityFunctions.getDefaultValuesFromXSD(),attributes=utilityFunctions.getKeys(defaultValues.title);var Title=new jermaine.Model("GraphTitle",function(){this.hasA("graph").which.validatesWith(function(graph){var Graph=require("./graph.js");return graph instanceof Graph});this.hasA("text").which.validatesWith(function(text){return text instanceof Text});this.hasA("frame").which.isA("string");this.hasA("border").which.isAn("integer");this.hasA("color").which.validatesWith(function(color){return color instanceof RGBColor});this.hasA("bordercolor").which.validatesWith(function(bordercolor){return bordercolor instanceof RGBColor});this.hasA("opacity").which.isA("number");this.hasA("padding").which.isAn("integer");this.hasA("cornerradius").which.isAn("integer");this.hasA("anchor").which.validatesWith(function(anchor){return anchor instanceof Point});this.hasA("base").which.validatesWith(function(base){return base instanceof Point});this.hasA("position").which.validatesWith(function(position){return position instanceof Point});this.hasA("fontSize").which.isA("string").and.defaultsTo("18px");this.respondsTo("initializeGeometry",function(graphicsContext){graphicsContext.fontSize=this.fontSize();this.text().initializeGeometry(graphicsContext);return this});this.respondsTo("render",function(){});this.isBuiltWith("text","graph");utilityFunctions.insertDefaults(this,defaultValues.title,attributes)});module.exports=Title},{"../../lib/jermaine/src/jermaine.js":9,"../math/point.js":104,"../math/rgb_color.js":105,"../util/utilityFunctions.js":157,"./graph.js":41,"./text.js":64}],66:[function(require,module,exports){var jermaine=require("../../lib/jermaine/src/jermaine.js");var Warning=function(message){this.message=message};Warning.prototype=new Error;module.exports=Warning},{"../../lib/jermaine/src/jermaine.js":9}],67:[function(require,module,exports){var WebServiceData;module.exports=function($){if(typeof WebServiceData!=="undefined"){return WebServiceData}var jermaine=require("../../lib/jermaine/src/jermaine.js");var Data=require("./data.js"),DataValue=require("./data_value.js"),DataFormatter=require("./data_formatter.js"),ArrayData=require("./array_data.js"),WebServiceDataCacheNode=require("./web_service_data_cache_node.js"),WebServiceDataIterator=require("./web_service_data_iterator.js");WebServiceData=new jermaine.Model(function(){this.isA(Data);this.hasA("serviceaddress").which.isA("string");this.hasA("serviceaddresspattern").which.isA("string");this.hasA("format").which.isA("string");this.hasA("formatter").which.validatesWith(DataFormatter.isInstance);this.hasA("messageHandler");this.hasA("ajaxthrottle");this.isBuiltWith("columns","serviceaddress","%messageHandler","%ajaxthrottle",function(){this.init();if(this.columns().size()>0){var column0Type=this.columns().at(0).type();if(this.format()===undefined){this.format(column0Type===DataValue.NUMBER?"%f":"%Y%M%D%H%i%s")}this.formatter(DataFormatter.create(column0Type,this.format()))}if(this.ajaxthrottle()===undefined){this.ajaxthrottle($)}});this.respondsTo("_displayError",function(e){if(this.messageHandler()){this.messageHandler().error(e)}else{throw e}});this.respondsTo("getBounds",function(columnNumber){return[0,10]});this.hasA("arraydata").which.defaultsTo(null).and.validatesWith(function(arraydata){return arraydata instanceof ArrayData||arraydata===null});this.hasA("cacheHead").which.defaultsTo(null).and.validatesWith(function(x){return x===null||x instanceof WebServiceDataCacheNode});this.hasA("cacheTail").which.defaultsTo(null).and.validatesWith(function(x){return x===null||x instanceof WebServiceDataCacheNode});this.respondsTo("dataHead",function(){var head=this.cacheHead();if(head===null){return null}if(head.hasData()){return head}return head.dataNext()});this.respondsTo("dataTail",function(){var tail=this.cacheTail();if(tail===null){return null}if(tail.hasData()){return tail}return tail.dataPrev()});this.respondsTo("insertCacheNode",function(node){var head=this.cacheHead(),tail=this.cacheTail();if(head===null){this.cacheHead(node);this.cacheTail(node)}else{if(node.coveredMin().lt(head.coveredMin())){node.next(head);head.prev(node);this.cacheHead(node)}else{node.prev(tail);tail.next(node);this.cacheTail(node)}}});this.respondsTo("constructRequestURL",function(min,max){var serviceaddress=this.serviceaddress(),formatter=this.formatter();if(serviceaddress===undefined){throw new Error("WebServiceData.constructRequestURL: undefined service address")}if(formatter===undefined){throw new Error("WebServiceData.constructRequestURL: undefined formatter for column 0")}if(this.serviceaddresspattern()===undefined){if(serviceaddress.indexOf("$min")<0&&serviceaddress.indexOf("$max")<0){this.serviceaddresspattern(serviceaddress+"$min,$max")}else{this.serviceaddresspattern(serviceaddress)}}return this.serviceaddresspattern().replace("$min",formatter.format(min)).replace("$max",formatter.format(max))});this.hasA("coveredMin").which.defaultsTo(null).and.validatesWith(function(x){return x===null||DataValue.isInstance(x)});this.hasA("coveredMax").which.defaultsTo(null).and.validatesWith(function(x){return x===null||DataValue.isInstance(x)});this.respondsTo("insureCoveredRange",function(){var head=this.cacheHead(),tail=this.cacheTail(),coveredMin=this.coveredMin(),coveredMax=this.coveredMax();if(coveredMin===null||coveredMax===null){return}if(head===null||tail===null){this.requestSingleRange(coveredMin,coveredMax)}else{if(coveredMin.lt(head.coveredMin())){this.requestSingleRange(coveredMin,head.coveredMin())}if(coveredMax.gt(tail.coveredMax())){this.requestSingleRange(tail.coveredMax(),coveredMax)}}});this.respondsTo("requestSingleRange",function(min,max){var node,requestURL,that=this,JQueryXMLParser=require("../parser/xml/jquery_xml_parser.js")($);node=new WebServiceDataCacheNode(min,max);this.insertCacheNode(node);requestURL=this.constructRequestURL(min,max);this.emit({type:"ajaxEvent",action:"start"});this.ajaxthrottle().ajax({url:requestURL,dataType:"text",success:function(data,textStatus,jqXHR){if(data.indexOf("<values>")>0){data=JQueryXMLParser.stringToJQueryXMLObj(data).find("values").text()}node.parseData(that.getColumns(),data);that.emit({type:"ajaxEvent",action:"success"});that.emit({type:"dataReady"})},error:function(jqXHR,textStatus,errorThrown){var message=errorThrown;if(jqXHR.statusCode().status===404){message="URL not found: '"+requestURL+'"'}else{if(textStatus){message=textStatus+": "+message}}that._displayError(new Error(message))},complete:function(jqXHR,textStatus){that.emit({type:"ajaxEvent",action:"complete"})}})});this.respondsTo("getIterator",function(columnIds,min,max,buffer){var initialNode,initialIndex,n,b,i,tmp,finalNode,finalIndex,columnIndices;if(min.gt(max)){tmp=min;min=max;max=tmp}if(this.coveredMin()===null||min.lt(this.coveredMin())){this.coveredMin(min.clone())}if(this.coveredMax()===null||max.gt(this.coveredMax())){this.coveredMax(max.clone())}if(!this.paused()){this.insureCoveredRange()}if(this.dataHead()===null){return{next:function(){},hasNext:function(){return false}}}columnIndices=[];for(i=0;i<columnIds.length;++i){columnIndices.push(this.columnIdToColumnNumber(columnIds[i]))}initialNode=this.dataHead();while(initialNode!==null&&initialNode.dataNext()!==null&&min.gt(initialNode.dataMax())){initialNode=initialNode.dataNext()}if(initialNode===null||!initialNode.hasData()){initialIndex=-1}else{initialIndex=0;while(initialIndex<initialNode.data().length-1&&initialNode.data()[initialIndex][columnIndices[0]].lt(min)){++initialIndex}n=0;while(n<buffer){--initialIndex;if(initialIndex<0){b=initialNode.dataPrev();if(b!==null){initialNode=b;initialIndex=initialNode.data().length-1}else{initialIndex=0;break}}++n}finalNode=initialNode;while(max.gt(finalNode.dataMax())&&finalNode.dataNext()!==null){finalNode=finalNode.dataNext()}finalIndex=0;if(finalNode===initialNode){finalIndex=initialIndex}while(finalIndex<finalNode.data().length-1&&finalNode.data()[finalIndex][columnIndices[0]].lt(max)){++finalIndex}n=0;while(n<buffer){++finalIndex;if(finalIndex>=finalNode.data().length){b=finalNode.dataNext();if(b!==null){finalNode=b;finalIndex=0}else{finalIndex=finalNode.data().length-1;break}}++n}}return new WebServiceDataIterator(columnIndices,initialNode,initialIndex,finalNode,finalIndex)});this.hasA("paused").which.isA("boolean").and.defaultsTo(false);this.respondsTo("pause",function(){this.paused(true)});this.respondsTo("resume",function(){this.paused(false);this.emit({type:"dataReady",min:this.coveredMin(),max:this.coveredMax()})})});return WebServiceData}},{"../../lib/jermaine/src/jermaine.js":9,"../parser/xml/jquery_xml_parser.js":144,"./array_data.js":17,"./data.js":26,"./data_formatter.js":27,"./data_value.js":30,"./web_service_data_cache_node.js":68,"./web_service_data_iterator.js":69}],68:[function(require,module,exports){var jermaine=require("../../lib/jermaine/src/jermaine.js");var DataValue=require("./data_value.js"),ArrayData=require("./array_data.js");var WebServiceDataCacheNode=new jermaine.Model(function(){this.hasA("data").which.defaultsTo(null).and.validatesWith(function(data){var validationFunctions=require("../util/validationFunctions.js");if(data===null){return true}if(validationFunctions.typeOf(data)!=="array"){this.message="WebServiceDataCacheNode's data attribute is not an Array";return false}if(data.length>0){var firstRow=data[0],i;if(validationFunctions.typeOf(firstRow)!=="array"){this.message="WebServiceDataCacheNode's data attribute is not an Array of Arrays";return false}for(i=0;i<firstRow.length;++i){if(!DataValue.isInstance(firstRow[i])){this.message="WebServiceDataCacheNode's data attribute is not an Array of Arrays of DataValues (bad value in position "+i+" of first row";return false}}}return true});this.hasA("next").which.defaultsTo(null).and.validatesWith(function(x){return x===null||x instanceof WebServiceDataCacheNode});this.hasA("prev").which.defaultsTo(null).and.validatesWith(function(x){return x===null||x instanceof WebServiceDataCacheNode});this.hasA("coveredMin").which.validatesWith(DataValue.isInstance);this.hasA("coveredMax").which.validatesWith(DataValue.isInstance);this.respondsTo("dataNext",function(){var node=this.next();while(node!==null&&!node.hasData()){node=node.next()}return node});this.respondsTo("dataPrev",function(){var node=this.prev();while(node!==null&&!node.hasData()){node=node.prev()}return node});this.respondsTo("dataMin",function(){var data=this.data();if(data===null){return null}if(data.length===0){return null}if(data[0]===null){return null}if(data[0].length===0){return null}return data[0][0]});this.respondsTo("dataMax",function(){var data=this.data();if(data===null){return null}if(data.length===0){return null}if(data[data.length-1]===null){return null}if(data[data.length-1].length===0){return null}return data[data.length-1][0]});this.respondsTo("hasData",function(){return this.data()!==null});this.isBuiltWith("coveredMin","coveredMax");this.respondsTo("parseData",function(columns,dataText){var i,b,maxPrevValue=null,minNextValue=null,arrayDataArray,data,row;b=this.dataPrev();if(b!==null){maxPrevValue=b.dataMax()}b=this.dataNext();if(b!==null){minNextValue=b.dataMin()}arrayDataArray=ArrayData.textToDataValuesArray(columns,dataText);data=[];for(i=0;i<arrayDataArray.length;++i){row=arrayDataArray[i];if((maxPrevValue===null||row[0].gt(maxPrevValue))&&(minNextValue===null||row[0].lt(minNextValue))){data.push(row)}}if(data.length===0){return}if(data[0][0].lt(this.coveredMin())){this.coveredMin(data[0][0])}if(data[data.length-1][0].gt(this.coveredMax())){this.coveredMax(data[data.length-1][0])}this.data(data)})});module.exports=WebServiceDataCacheNode},{"../../lib/jermaine/src/jermaine.js":9,"../util/validationFunctions.js":158,"./array_data.js":17,"./data_value.js":30}],69:[function(require,module,exports){var jermaine=require("../../lib/jermaine/src/jermaine.js");var WebServiceDataCacheNode=require("./web_service_data_cache_node.js"),ValidationFunctions=require("../util/validationFunctions.js");var WebServiceDataIterator=new jermaine.Model(function(){var WebServiceDataIterator=this;this.hasA("currentNode").which.validatesWith(function(x){return x instanceof WebServiceDataCacheNode});this.hasA("currentIndex").which.isA("integer");this.hasA("columnIndices").which.validatesWith(function(x){return ValidationFunctions.typeOf(x)==="array"});this.hasA("initialNode").which.validatesWith(function(x){return x instanceof WebServiceDataCacheNode});this.hasA("finalNode").which.validatesWith(function(x){return x instanceof WebServiceDataCacheNode});this.hasA("initialIndex").which.isA("integer");this.hasA("finalIndex").which.isA("integer");this.isBuiltWith("columnIndices","initialNode","initialIndex","finalNode","finalIndex",function(){this.currentNode(this.initialNode());this.currentIndex(this.initialIndex())});this.respondsTo("hasNext",function(){if(this.currentNode()===null||this.currentIndex()<0){return false}if(this.currentNode()!==this.finalNode()){return true}return this.currentIndex()<=this.finalIndex()});this.respondsTo("next",function(){var vals=[],columnIndices=this.columnIndices(),currentIndex=this.currentIndex(),finalIndex=this.finalIndex(),currentNode=this.currentNode(),i;if(currentNode===this.finalNode()){if(currentIndex>finalIndex){return null}for(i=0;i<columnIndices.length;++i){vals.push(currentNode.data()[currentIndex][columnIndices[i]])}this.currentIndex(++currentIndex);return vals}else{for(i=0;i<columnIndices.length;++i){vals.push(currentNode.data()[currentIndex][columnIndices[i]])}this.currentIndex(++currentIndex);if(currentIndex>=currentNode.data().length){this.currentNode(currentNode.dataNext());this.currentIndex(0)}return vals}})});module.exports=WebServiceDataIterator},{"../../lib/jermaine/src/jermaine.js":9,"../util/validationFunctions.js":158,"./web_service_data_cache_node.js":68}],70:[function(require,module,exports){var jermaine=require("../../lib/jermaine/src/jermaine.js");var Insets=require("../math/insets.js"),RGBColor=require("../math/rgb_color.js"),utilityFunctions=require("../util/utilityFunctions.js"),defaultValues=utilityFunctions.getDefaultValuesFromXSD(),attributes=utilityFunctions.getKeys(defaultValues.window);var Window=new jermaine.Model("Window",function(){this.hasA("width").which.isA("integer");this.hasA("height").which.isA("integer");this.hasA("border").which.isA("integer");this.hasA("margin").which.validatesWith(function(margin){return margin instanceof Insets});this.hasA("padding").which.validatesWith(function(padding){return padding instanceof Insets});this.hasA("bordercolor").which.validatesWith(function(bordercolor){return bordercolor instanceof RGBColor});utilityFunctions.insertDefaults(this,defaultValues.window,attributes)});module.exports=Window},{"../../lib/jermaine/src/jermaine.js":9,"../math/insets.js":103,"../math/rgb_color.js":105,"../util/utilityFunctions.js":157}],71:[function(require,module,exports){var jermaine=require("../../lib/jermaine/src/jermaine.js");var DataMeasure=require("./data_measure.js"),DataValue=require("./data_value.js");var utilityFunctions=require("../util/utilityFunctions.js"),defaultValues=utilityFunctions.getDefaultValuesFromXSD(),attributes=utilityFunctions.getKeys(defaultValues.horizontalaxis.zoom);var Zoom=new jermaine.Model("Zoom",function(){this.hasA("allowed").which.isA("boolean");this.hasA("min").which.validatesWith(function(min){return DataMeasure.isInstance(min)});this.hasA("max").which.validatesWith(function(max){return DataMeasure.isInstance(max)});this.hasA("anchor").which.validatesWith(function(anchor){return DataValue.isInstance(anchor)||anchor===null});utilityFunctions.insertDefaults(this,defaultValues.horizontalaxis.zoom,attributes)});module.exports=Zoom},{"../../lib/jermaine/src/jermaine.js":9,"../util/utilityFunctions.js":157,"./data_measure.js":28,"./data_value.js":30}],72:[function(require,module,exports){var _INCLUDED=false;
module.exports=function($,window,errorHandler){if(!_INCLUDED){require("./draggable/graph.js")($,window,errorHandler);require("./touch/graph.js")($,window,errorHandler);require("./touch/multigraph.js")($,window,errorHandler);require("./mouse/graph.js")($,window,errorHandler);require("./mouse/multigraph.js")($,window,errorHandler);require("./multigraph.js")($,window,errorHandler);require("./resize/multigraph.js")($,window,errorHandler);_INCLUDED=true}}},{"./draggable/graph.js":73,"./mouse/graph.js":74,"./mouse/multigraph.js":75,"./multigraph.js":76,"./resize/multigraph.js":77,"./touch/graph.js":78,"./touch/multigraph.js":79}],73:[function(require,module,exports){module.exports=function($,window,errorHandler){var Graph=require("../../core/graph.js"),Axis=require("../../core/axis.js");if(typeof Graph.dragStarted==="function"){return Graph}Graph.hasA("dragStarted").which.isA("boolean");Graph.hasA("dragOrientation").which.validatesWith(Axis.Orientation.isInstance);Graph.hasA("dragAxis").which.validatesWith(function(a){return a instanceof Axis});Graph.respondsTo("doDragReset",function(){this.dragStarted(false);this.pauseAllData()});Graph.respondsTo("doDragDone",function(){this.resumeAllData()});Graph.respondsTo("doDrag",function(multigraph,bx,by,dx,dy,shiftKey){var dragAxis=this.dragAxis,dragOrientation=this.dragOrientation,HORIZONTAL=Axis.HORIZONTAL,VERTICAL=Axis.VERTICAL;try{if(!this.dragStarted()){if(Math.abs(dx)>Math.abs(dy)){dragOrientation(HORIZONTAL)}else{dragOrientation(VERTICAL)}dragAxis(this.findNearestAxis(bx,by,dragOrientation()));if(dragAxis()===null){dragOrientation(dragOrientation()===HORIZONTAL?VERTICAL:HORIZONTAL);dragAxis(this.findNearestAxis(bx,by,dragOrientation()))}this.dragStarted(true)}if(shiftKey){if(dragOrientation()===HORIZONTAL){dragAxis().doZoom(bx,dx)}else{dragAxis().doZoom(by,dy)}}else{if(dragOrientation()===HORIZONTAL){dragAxis().doPan(bx,dx)}else{dragAxis().doPan(by,dy)}}multigraph.redraw()}catch(e){errorHandler(e)}});return Graph}},{"../../core/axis.js":18,"../../core/graph.js":41}],74:[function(require,module,exports){module.exports=function($,window,errorHandler){var Graph=require("../../core/graph.js"),ConstantPlot=require("../../core/constant_plot.js"),Axis=require("../../core/axis.js");if(typeof Graph.mouseWheelTimer==="function"){return Graph}Graph.hasA("mouseWheelTimer").which.defaultsTo(null);Graph.respondsTo("doWheelZoom",function(multigraph,x,y,delta){var that=this;try{this.pauseAllData();var axis=this.findNearestAxis(x,y);if(axis.orientation()===Axis.HORIZONTAL){axis.doZoom(x,4*delta)}else{axis.doZoom(y,4*delta)}multigraph.redraw();var mouseWheelTimer=this.mouseWheelTimer;if(mouseWheelTimer()!==null){window.clearTimeout(mouseWheelTimer());mouseWheelTimer(null)}mouseWheelTimer(window.setTimeout(function(){that.resumeAllData()},500))}catch(e){errorHandler(e)}});Graph.hasA("existingDatatips").which.defaultsTo(function(){return[]});Graph.respondsTo("handleDatatips",function(loc,width,height,$target,div){var existingDatatips=this.existingDatatips(),plots=this.plots(),plot,datatipsData,datatipIndex,i;var temp=$("<span></span>").css({display:"hidden",margin:"0px","padding-left":"5px","padding-right":"5px","padding-top":"1px","padding-bottom":"1px"}).appendTo(div);for(i=0;i<plots.size();i++){plot=plots.at(i);if(plot instanceof ConstantPlot){continue}datatipsData=plot.getDatatipsData(loc,width,height,this,temp);if(datatipsData!==undefined){datatipIndex=i;break}}temp.remove();if(datatipsData===undefined){this.removeDatatips();return}for(i=0;i<existingDatatips.length;i++){existingDatatips[i].flag=true}checkDatatipExistence(datatipsData,existingDatatips);this.removeFlaggedDatatips();if(datatipsData.flag===false){return}var arrowLength=10;datatipsData.arrow=arrowLength;var datatip=plots.at(datatipIndex).createDatatip(datatipsData);datatip.appendTo(div);datatip.mousedown(function(event){$target.trigger("mousedown",event)});datatipsData.elem=datatip;existingDatatips.push(datatipsData)});var checkDatatipExistence=function(datatipData,existingData){var i,l;for(i=0,l=existingData.length;i<l;i++){if(datatipData.content===existingData[i].content&&datatipData.type===existingData[i].type&&datatipData.pixelp[0]===existingData[i].pixelp[0]&&datatipData.pixelp[1]===existingData[i].pixelp[1]){existingData[i].flag=false;datatipData.flag=false;return}}datatipData.flag=true};Graph.respondsTo("removeDatatips",function(){var existingDatatips=this.existingDatatips(),i;if(existingDatatips.length>0){for(i=0;i<existingDatatips.length;i++){existingDatatips[i].elem.remove()}existingDatatips=[]}});Graph.respondsTo("removeFlaggedDatatips",function(){var existingDatatips=this.existingDatatips(),i;if(existingDatatips.length>0){for(i=0;i<existingDatatips.length;i++){if(existingDatatips[i].flag===true){existingDatatips[i].elem.remove();existingDatatips.splice(i,1)}}}});return Graph}},{"../../core/axis.js":18,"../../core/constant_plot.js":24,"../../core/graph.js":41}],75:[function(require,module,exports){module.exports=function($,window,errorHandler){var Multigraph=require("../../core/multigraph.js")($),Point=require("../../math/point.js");if(typeof Multigraph.registerMouseEvents==="function"){return Multigraph}Multigraph.respondsTo("registerMouseEvents",function(target,options){var base,mouseLast,mouseIsDown=false,dragStarted=false,multigraph=this,$target=$(target);var eventLocationToGraphCoords=function(event){return new Point(event.pageX-$target.offset().left-multigraph.graphs().at(0).x0(),$target.height()-(event.pageY-$target.offset().top)-multigraph.graphs().at(0).y0())};$target.mousedown(function(event,datatipsEvent){if(datatipsEvent){event=datatipsEvent}event.preventDefault();var i;for(i=0;i<multigraph.graphs().size();i++){multigraph.graphs().at(i).removeDatatips()}mouseLast=base=eventLocationToGraphCoords(event);mouseIsDown=true;dragStarted=false});$target.mouseup(function(event){mouseIsDown=false;multigraph.graphs().at(0).doDragDone()});$target.mousemove(function(event){var eventLoc=eventLocationToGraphCoords(event),graphs=multigraph.graphs();if(mouseIsDown){var dx=eventLoc.x()-mouseLast.x(),dy=eventLoc.y()-mouseLast.y();if(multigraph.graphs().size()>0){if(!dragStarted){graphs.at(0).doDragReset()}graphs.at(0).doDrag(multigraph,base.x(),base.y(),dx,dy,event.shiftKey)}dragStarted=true}else{var i;for(i=0;i<graphs.size();i++){graphs.at(i).handleDatatips(eventLoc,multigraph.width(),multigraph.height(),$target,multigraph.div())}}mouseLast=eventLoc});if(!options.noscroll){$target.mousewheel(function(event,delta){var eventLoc=eventLocationToGraphCoords(event);if(multigraph.graphs().size()>0){multigraph.graphs().at(0).doWheelZoom(multigraph,eventLoc.x(),eventLoc.y(),delta)}event.preventDefault()})}$target.mouseleave(function(event){mouseIsDown=false;multigraph.graphs().at(0).doDragDone()});$(multigraph.div()).mouseleave(function(event){var graphs=multigraph.graphs(),i;for(i=0;i<graphs.size();i++){graphs.at(i).removeDatatips()}})});return Multigraph}},{"../../core/multigraph.js":48,"../../math/point.js":104}],76:[function(require,module,exports){var _INCLUDED=false;module.exports=function($,window,errorHandler){if(_INCLUDED){return}else{_INCLUDED=true}var Multigraph=require("../core/multigraph.js")($);var methods={multigraph:function(){return this.data("multigraph").multigraph},done:function(func){return this.each(function(){return $(this).data("multigraph").multigraph.done(func)})},destroy:function(){return this.each(function(){var $this=$(this);$this.data("multigraph").multigraph.done(function(m){m.destroy()});$this.removeData("multigraph")})},init:function(options){return this.each(function(){var $this=$(this),data=$this.data("multigraph");if(!("mugl"in options)&&!("muglString"in options)){options={muglString:options}}options.div=this;if(!data){$this.data("multigraph",{multigraph:Multigraph.createGraph(options)})}return this})}};$.fn.multigraph=function(method){if(methods[method]){return methods[method].apply(this,Array.prototype.slice.call(arguments,1))}else if(typeof method==="object"||!method){return methods.init.apply(this,arguments)}else{$.error("Method "+method+" does not exist on jQuery.multigraph");return null}};$(document).ready(function(){$("div.multigraph").each(function(){var width=$(this).attr("data-width"),height=$(this).attr("data-height"),src=$(this).attr("data-src"),driver=$(this).attr("data-driver"),options;if(width!==undefined){$(this).css("width",width+"px")}if(height!==undefined){$(this).css("height",height+"px")}options={div:this,mugl:src,driver:driver};$(this).multigraph(options);$(this).lightbox({scale:true,postopen:function(){var lightboxData=this.data("lightbox");lightboxData.originalDiv=this;this.data("multigraph").multigraph.done(function(m){m.div(lightboxData.contents);m.initializeSurface();m.resizeSurface(lightboxData.contentWidth,lightboxData.contentHeight);m.width(lightboxData.contentWidth).height(lightboxData.contentHeight);m.busySpinner().remove();m.busySpinner($('<div style="position: absolute; left:5px; top:5px;"></div>').appendTo($(m.div())).busy_spinner());m.render()});var timeout=window.setTimeout(function(){lightboxData.contents.lightbox("resize");window.clearTimeout(timeout)},50)},postclose:function(){var lightboxData=this.data("lightbox");this.data("multigraph").multigraph.done(function(m){m.div(lightboxData.originalDiv).width($(m.div()).width()).height($(m.div()).height()).busySpinner($('<div style="position: absolute; left:5px; top:5px;"></div>').appendTo($(m.div())).busy_spinner());m.initializeSurface();m.render()})},postresize:function(){var lightboxData=this.data("lightbox");this.data("multigraph").multigraph.done(function(m){m.resizeSurface(lightboxData.contentWidth,lightboxData.contentHeight);m.width(lightboxData.contentWidth).height(lightboxData.contentHeight);m.render()})}})})})}},{"../core/multigraph.js":48}],77:[function(require,module,exports){module.exports=function($,window,errorHandler){var Multigraph=require("../../core/multigraph.js")($),Point=require("../../math/point.js");if(typeof Multigraph.registerResizeEvents==="function"){return Multigraph}Multigraph.respondsTo("registerResizeEvents",function(target){var multigraph=this;var container=$(this.div());var c=$(target);$(window).resize(respondGraph);function respondGraph(){c.attr("width",container.width()*window.devicePixelRatio);c.attr("height",container.height()*window.devicePixelRatio);c.css("width",container.width());c.css("height",container.height());multigraph.init()}});return Multigraph}},{"../../core/multigraph.js":48,"../../math/point.js":104}],78:[function(require,module,exports){module.exports=function($,window,errorHandler){var Graph=require("../../core/graph.js"),Axis=require("../../core/axis.js");if(typeof Graph.doFirstPinchZoom==="function"){return Graph}Graph.respondsTo("doFirstPinchZoom",function(multigraph,bx,by,dx,dy,totalx,totaly){var dragAxis=this.dragAxis,dragOrientation=this.dragOrientation,HORIZONTAL=Axis.HORIZONTAL,VERTICAL=Axis.VERTICAL;try{if(!this.dragStarted()){if(totalx>totaly){dragOrientation(HORIZONTAL)}else{dragOrientation(VERTICAL)}dragAxis(this.findNearestAxis(bx,by,dragOrientation()));if(dragAxis()===null){dragOrientation(dragOrientation()===HORIZONTAL?VERTICAL:HORIZONTAL);dragAxis(this.findNearestAxis(bx,by,dragOrientation()))}this.dragStarted(true)}if(dragOrientation()===HORIZONTAL){dragAxis().doZoom(bx,dx)}else{dragAxis().doZoom(by,dy)}multigraph.redraw()}catch(e){errorHandler(e)}});return Graph}},{"../../core/axis.js":18,"../../core/graph.js":41}],79:[function(require,module,exports){module.exports=function($,window,errorHandler){var Multigraph=require("../../core/multigraph.js")($),Point=require("../../math/point.js");if(typeof Multigraph.registerTouchEvents==="function"){return Multigraph}Multigraph.respondsTo("registerTouchEvents",function(target){var touchStarted=false,dragStarted=false,pinchZoomStarted=false,pinchZoomDetermined=false,pinchZoomInitialDeltas={},pinchZoomDeterminedTimeout,previoustoucha,previoustouchb,base,multigraph=this,$target=$(target);var touchLocationToGraphCoords=function(touch){return new Point(touch.pageX-$target.offset().left-multigraph.graphs().at(0).x0(),$target.height()-(touch.pageY-$target.offset().top)-multigraph.graphs().at(0).y0())};var handleTouchStart=function(jqueryEvent){var e=jqueryEvent.originalEvent;e.preventDefault();if(e.touches.length===1){base=touchLocationToGraphCoords(e.touches[0])}previoustoucha=touchLocationToGraphCoords(e.touches[0]);if(e.touches.length===1){dragStarted=true}else{dragStarted=false}if(e.touches.length===2){pinchZoomStarted=true;pinchZoomDetermined=false;previoustouchb=touchLocationToGraphCoords(e.touches[1])}else{pinchZoomStarted=false;pinchZoomDetermined=false}touchStarted=false;multigraph.graphs().at(0).doDragDone()};var handleTouchMove=function(jqueryEvent){var e=jqueryEvent.originalEvent;e.preventDefault();if(e.touches.length===1&&dragStarted===true){handleDrag(e)}if(e.touches.length===2&&pinchZoomStarted===true){handlePinchZoom(e)}};var handleTouchEnd=function(jqueryEvent){var e=jqueryEvent.originalEvent;e.preventDefault();if(e.touches.length===1){dragStarted=true}else{dragStarted=false}if(e.touches.length===2){pinchZoomStarted=true;pinchZoomDetermined=false}else{pinchZoomStarted=false;pinchZoomDetermined=false}touchStarted=false;multigraph.graphs().at(0).doDragDone()};var handleTouchLeave=function(jqueryEvent){jqueryEvent.originalEvent.preventDefault();dragStarted=false;pinchZoomStarted=false;pinchZoomDetermined=false;touchStarted=false;multigraph.graphs().at(0).doDragDone()};var handleDrag=function(e){var touchLoc=touchLocationToGraphCoords(e.touches[0]),dx=touchLoc.x()-previoustoucha.x(),dy=touchLoc.y()-previoustoucha.y();if(multigraph.graphs().size()>0){if(!touchStarted){multigraph.graphs().at(0).doDragReset()}multigraph.graphs().at(0).doDrag(multigraph,base.x(),base.y(),dx,dy,false)}touchStarted=true;previoustoucha=touchLoc};var handlePinchZoom=function(e){var a=touchLocationToGraphCoords(e.touches[0]),b=touchLocationToGraphCoords(e.touches[1]),basex=(a.x()+b.x())/2,basey=(a.y()+b.y())/2,dx=calculateAbsoluteDistance(a.x(),b.x())-calculateAbsoluteDistance(previoustoucha.x(),previoustouchb.x()),dy=calculateAbsoluteDistance(a.y(),b.y())-calculateAbsoluteDistance(previoustoucha.y(),previoustouchb.y());if(multigraph.graphs().size()>0){if(!touchStarted){multigraph.graphs().at(0).doDragReset()}if(pinchZoomDetermined===true){multigraph.graphs().at(0).doDrag(multigraph,basex,basey,dx,dy,true)}}touchStarted=true;var cx=(a.x()-previoustoucha.x()+(b.x()-previoustouchb.x()))/2,cy=(a.y()-previoustoucha.y()+(b.y()-previoustouchb.y()))/2;if(pinchZoomDetermined===true){multigraph.graphs().at(0).doDrag(multigraph,basex,basey,cx,cy,false)}if(pinchZoomDetermined===false){if(pinchZoomInitialDeltas.base===undefined){pinchZoomInitialDeltas.base={};pinchZoomInitialDeltas.base.x=basex;pinchZoomInitialDeltas.base.y=basey}if(pinchZoomInitialDeltas.zoomDeltas===undefined){pinchZoomInitialDeltas.zoomDeltas={dx:0,dy:0,totalx:0,totaly:0}}if(pinchZoomInitialDeltas.panDeltas===undefined){pinchZoomInitialDeltas.panDeltas={dx:0,dy:0}}pinchZoomInitialDeltas.zoomDeltas.dx+=dx;pinchZoomInitialDeltas.zoomDeltas.dy+=dy;pinchZoomInitialDeltas.panDeltas.dx+=cx;pinchZoomInitialDeltas.panDeltas.dy+=cy;pinchZoomInitialDeltas.zoomDeltas.totalx+=Math.abs(dx);pinchZoomInitialDeltas.zoomDeltas.totaly+=Math.abs(dy);if(pinchZoomDeterminedTimeout===undefined){pinchZoomDeterminedTimeout=setTimeout(function(){var basex=pinchZoomInitialDeltas.base.x,basey=pinchZoomInitialDeltas.base.y,dx=pinchZoomInitialDeltas.zoomDeltas.dx,dy=pinchZoomInitialDeltas.zoomDeltas.dy,cx=pinchZoomInitialDeltas.panDeltas.dx,cy=pinchZoomInitialDeltas.panDeltas.dy;multigraph.graphs().at(0).doDragReset();multigraph.graphs().at(0).doFirstPinchZoom(multigraph,basex,basey,dx,dy,pinchZoomInitialDeltas.zoomDeltas.totalx,pinchZoomInitialDeltas.zoomDeltas.totaly);multigraph.graphs().at(0).doDrag(multigraph,basex,basey,cx,cy,false);pinchZoomInitialDeltas={};pinchZoomDetermined=true;clearTimeout(pinchZoomDeterminedTimeout);pinchZoomDeterminedTimeout=undefined},60)}}previoustoucha=a;previoustouchb=b};var calculateAbsoluteDistance=function(a,b){return Math.abs(a-b)};$target.on("touchstart",handleTouchStart);$target.on("touchmove",handleTouchMove);$target.on("touchend",handleTouchEnd);$target.on("touchleave",handleTouchLeave)});return Multigraph}},{"../../core/multigraph.js":48,"../../math/point.js":104}],80:[function(require,module,exports){var _INCLUDED=false;module.exports=function($,window){if(_INCLUDED){return}_INCLUDED=true;require("./multigraph.js")($,window);require("./axis.js")();require("./axis_title.js")();require("./background.js")();require("./graph.js")();require("./graph_title.js")();require("./icon.js")();require("./img.js")();require("./labeler.js")();require("./legend.js")();require("./plotarea.js")();require("./renderers/band_renderer.js")();require("./renderers/bar_renderer.js")();require("./renderers/fill_renderer.js")();require("./renderers/pointline_renderer.js")();require("./renderers/rangebar_renderer.js")();require("./text.js")();require("./window.js")()}},{"./axis.js":81,"./axis_title.js":82,"./background.js":83,"./graph.js":84,"./graph_title.js":85,"./icon.js":86,"./img.js":87,"./labeler.js":88,"./legend.js":89,"./multigraph.js":90,"./plotarea.js":91,"./renderers/band_renderer.js":92,"./renderers/bar_renderer.js":93,"./renderers/fill_renderer.js":94,"./renderers/pointline_renderer.js":95,"./renderers/rangebar_renderer.js":96,"./text.js":97,"./window.js":98}],81:[function(require,module,exports){module.exports=function(){var Axis=require("../../core/axis.js");if(typeof Axis.renderGrid==="function"){return Axis}Axis.respondsTo("renderGrid",function(graph,context){if(!this.visible()){return}this.prepareRender(context);if(this.hasDataMin()&&this.hasDataMax()){if(this.grid().visible()){if(this.labelers().size()>0&&this.currentLabelDensity()<=1.5){var currentLabeler=this.currentLabeler(),perpOffset=this.perpOffset(),plotBox=graph.plotBox();currentLabeler.prepare(this.dataMin(),this.dataMax());context.beginPath();while(currentLabeler.hasNext()){var v=currentLabeler.next(),a=this.dataValueToAxisValue(v);if(this.orientation()===Axis.HORIZONTAL){context.moveTo(a,perpOffset);context.lineTo(a,plotBox.height()-perpOffset)}else{context.moveTo(perpOffset,a);context.lineTo(plotBox.width()-perpOffset,a)}}context.strokeStyle=this.grid().color().getHexString("#");context.stroke()}}}});Axis.respondsTo("render",function(graph,context){if(!this.visible()){return}var parallelOffset=this.parallelOffset(),perpOffset=this.perpOffset(),pixelLength=this.pixelLength(),currentLabeler=this.currentLabeler(),axisIsHorizontal=this.orientation()===Axis.HORIZONTAL;if(this.linewidth()>0){context.beginPath();if(axisIsHorizontal){context.moveTo(parallelOffset,perpOffset);context.lineTo(parallelOffset+pixelLength,perpOffset)}else{context.moveTo(perpOffset,parallelOffset);context.lineTo(perpOffset,parallelOffset+pixelLength)}context.strokeStyle=this.color().getHexString("#");context.stroke()}if(this.hasDataMin()&&this.hasDataMax()){if(currentLabeler&&currentLabeler.visible()){var tickwidth=this.tickwidth(),tickmin=this.tickmin(),tickmax=this.tickmax(),tickcolor=this.tickcolor();context.beginPath();context.fillStyle="#000000";currentLabeler.prepare(this.dataMin(),this.dataMax());while(currentLabeler.hasNext()){var v=currentLabeler.next(),a=this.dataValueToAxisValue(v);if(tickwidth>0){if(tickcolor!==undefined&&tickcolor!==null){context.strokeStyle=tickcolor.getHexString("#")}if(axisIsHorizontal){context.moveTo(a,perpOffset+tickmax);context.lineTo(a,perpOffset+tickmin)}else{context.moveTo(perpOffset+tickmin,a);context.lineTo(perpOffset+tickmax,a)}if(tickcolor!==undefined&&tickcolor!==null){context.restore()}}currentLabeler.renderLabel(context,v)}context.stroke()}}if(this.title()){this.title().render(context)}});return Axis}},{"../../core/axis.js":18}],82:[function(require,module,exports){module.exports=function(){var AxisTitle=require("../../core/axis_title.js"),Axis=require("../../core/axis.js"),Point=require("../../math/point.js");if(typeof AxisTitle.render==="function"){return AxisTitle}AxisTitle.respondsTo("render",function(context){var axis=this.axis(),title=this.content(),anchor=this.anchor(),perpOffset=axis.perpOffset(),h=title.origHeight(),w=title.origWidth(),pixelAnchor=new Point(.5*w*(anchor.x()+1),.5*h*(anchor.y()+1)),storedBase=(this.base()+1)*(axis.pixelLength()/2)+axis.minoffset()+axis.parallelOffset(),pixelBase;if(axis.orientation()===Axis.HORIZONTAL){pixelBase=new Point(storedBase,perpOffset)}else{pixelBase=new Point(perpOffset,storedBase)}context.save();context.fillStyle="rgba(0, 0, 0, 1)";title.font(this.font());title.drawText(context,pixelAnchor,pixelBase,this.position(),this.angle());context.restore()});return AxisTitle}},{"../../core/axis.js":18,"../../core/axis_title.js":20,"../../math/point.js":104}],83:[function(require,module,exports){module.exports=function(){var Background=require("../../core/background.js");if(typeof Background.render==="function"){return Background}Background.respondsTo("render",function(graph,context,width,height){var mb=graph.window().margin().left()+graph.window().border(),img=this.img();context.save();context.fillStyle=this.color().getHexString("#");context.fillRect(mb,mb,width-2*mb,height-2*mb);context.restore();if(img&&img.src()!==undefined){img.render(graph,context,width,height)}});return Background}},{"../../core/background.js":21}],84:[function(require,module,exports){module.exports=function(){var Graph=require("../../core/graph.js");if(typeof Graph.render==="function"){return Graph}Graph.respondsTo("render",function(context,width,height){var i;this.window().render(context,width,height);this.background().render(this,context,width,height);context.transform(1,0,0,1,this.x0(),this.y0());this.plotarea().render(this,context);for(i=0;i<this.axes().size();++i){this.axes().at(i).renderGrid(this,context)}context.save();context.rect(0,0,this.plotBox().width(),this.plotBox().height());context.clip();for(i=0;i<this.plots().size();++i){this.plots().at(i).render(this,context)}context.restore();for(i=0;i<this.axes().size();++i){this.axes().at(i).render(this,context)}this.legend().render(context);if(this.title()){this.title().render(context)}});return Graph}},{"../../core/graph.js":41}],85:[function(require,module,exports){module.exports=function(){var Title=require("../../core/title.js"),Point=require("../../math/point.js");if(typeof Title.render==="function"){return Title}Title.respondsTo("render",function(context){var graph=this.graph(),border=this.border(),padding=this.padding(),storedAnchor=this.anchor(),storedBase=this.base(),position=this.position(),title=this.text(),backgroundColor=this.color().toRGBA(this.opacity()),paddingBox=graph.paddingBox(),plotBox=graph.plotBox(),plotareaMargin=graph.plotarea().margin(),h=title.origHeight(),w=title.origWidth(),pixelAnchor=new Point((.5*w+padding+border)*(storedAnchor.x()+1),(.5*h+padding+border)*(storedAnchor.y()+1)),pixelBase;if(this.frame()==="padding"){pixelBase=new Point((storedBase.x()+1)*(paddingBox.width()/2)-plotareaMargin.left(),(storedBase.y()+1)*(paddingBox.height()/2)-plotareaMargin.bottom())}else{pixelBase=new Point((storedBase.x()+1)*(plotBox.width()/2),(storedBase.y()+1)*(plotBox.height()/2))}context.save();title.setTransform(context,pixelAnchor,pixelBase,position,0);context.transform(1,0,0,-1,0,0);if(border>0){context.strokeStyle=this.bordercolor().toRGBA();context.lineWidth=border;context.strokeRect(border/2,border/2,w+2*padding+border,h+2*padding+border)}context.fillStyle=backgroundColor;context.fillRect(border,border,w+2*padding,h+2*padding);context.restore();context.save();var textPosition=new Point(position.x()+border+padding,position.y()+border+padding);context.font=this.fontSize()+" sans-serif";context.fillStyle="rgba(0, 0, 0, 1)";title.drawText(context,pixelAnchor,pixelBase,textPosition,0);context.restore()});return Title}},{"../../core/title.js":65,"../../math/point.js":104}],86:[function(require,module,exports){module.exports=function(){var Icon=require("../../core/icon.js"),Point=require("../../math/point.js");if(typeof Icon.renderBorder==="function"){return Icon}Icon.respondsTo("renderBorder",function(context,x,y){context.save();context.strokeStyle="rgba(0, 0, 0, 1)";context.strokeRect(x,y,this.width(),this.height());context.restore()});return Icon}},{"../../core/icon.js":43,"../../math/point.js":104}],87:[function(require,module,exports){module.exports=function(){var Img=require("../../core/img.js"),Util=require("../../math/util.js");if(typeof Img.render==="function"){return Img}Img.hasA("image").which.defaultsTo(function(){return new Image});Img.hasA("fetched").which.defaultsTo(false);Img.respondsTo("render",function(graph,context,width,height){if(this.fetched()){var interp=Util.interp,image=this.image(),graphWindow=graph.window(),plotarea=graph.plotarea(),base=this.base(),ax=interp(this.anchor().x(),-1,1,0,image.width),ay=interp(this.anchor().y(),1,-1,0,image.height),paddingLeft=graphWindow.margin().left()+graphWindow.border(),paddingTop=graphWindow.margin().top()+graphWindow.border(),plotLeft=paddingLeft+graphWindow.padding().left()+plotarea.margin().left()+plotarea.border(),plotTop=paddingTop+graphWindow.padding().top()+plotarea.margin().top()+plotarea.border(),bx,by,x,y;if(this.frame()===Img.PLOT){bx=plotLeft+interp(base.x(),-1,1,0,graph.plotBox().width());by=plotTop+interp(base.y(),1,-1,0,graph.plotBox().height())}else{bx=paddingLeft+interp(base.x(),-1,1,0,graph.paddingBox().width());by=paddingTop+interp(base.y(),1,-1,0,graph.paddingBox().height())}x=bx+this.position().x()-ax;y=by+this.position().y()-ay;context.save();context.transform(1,0,0,-1,0,height);context.drawImage(image,x,y,image.width,image.height);context.restore()}else{var that=this;this.image().onload=function(){that.fetched(true);context.save();context.setTransform(1,0,0,-1,0,height);graph.render(context,width,height);context.restore()};this.image().src=this.src()}});return Img}},{"../../core/img.js":44,"../../math/util.js":106}],88:[function(require,module,exports){module.exports=function(){var Labeler=require("../../core/labeler.js"),Text=require("../../core/text.js"),Axis=require("../../core/axis.js"),Point=require("../../math/point.js");if(typeof Labeler.renderLabel==="function"){return Labeler}Labeler.respondsTo("measureStringWidth",function(context,string){var t=new Text(string);t.font(this.font());return t.initializeGeometry({context:context,angle:this.angle()}).rotatedWidth()});Labeler.respondsTo("measureStringHeight",function(context,string){var t=new Text(string);t.font(this.font());return t.initializeGeometry({context:context,angle:this.angle()}).rotatedHeight()});Labeler.respondsTo("renderLabel",function(context,value){var axis=this.axis(),storedAnchor=this.anchor(),angle=this.angle(),perpOffset=axis.perpOffset(),a=axis.dataValueToAxisValue(value),formattedString=new Text(this.formatter().format(value)),pixelAnchor,base;formattedString.font(this.font());formattedString.initializeGeometry({context:context,angle:angle});pixelAnchor=new Point(.5*formattedString.origWidth()*(storedAnchor.x()+1),.5*formattedString.origHeight()*(storedAnchor.y()+1));if(axis.orientation()===Axis.HORIZONTAL){base=new Point(a,perpOffset)}else{base=new Point(perpOffset,a)}context.save();context.fillStyle=this.color().getHexString("#");formattedString.drawText(context,pixelAnchor,base,this.position(),angle);context.restore()});return Labeler}},{"../../core/axis.js":18,"../../core/labeler.js":45,"../../core/text.js":64,"../../math/point.js":104}],89:[function(require,module,exports){module.exports=function(){var Legend=require("../../core/legend.js"),Point=require("../../math/point.js");if(typeof Legend.renderLegend==="function"){return Legend}Legend.respondsTo("begin",function(context){context.save();context.transform(1,0,0,1,this.x(),this.y())});Legend.respondsTo("end",function(context){context.restore()});Legend.respondsTo("renderLegend",function(context){var border=this.border();context.save();if(border>0){context.strokeStyle=this.bordercolor().toRGBA();context.strokeRect(border/2,border/2,this.width()-border/2,this.height()-border/2)}context.fillStyle=this.color().toRGBA(this.opacity());context.fillRect(border,border,this.width()-2*border,this.height()-2*border);context.restore()});Legend.respondsTo("renderLabel",function(label,context,x,y){context.save();context.fillStyle="rgba(0, 0, 0, 1)";context.transform(1,0,0,-1,0,y+this.maxLabelHeight()/2-label.origHeight()/2);context.fillText(label.string(),x,0);context.restore()});return Legend}},{"../../core/legend.js":46,"../../math/point.js":104}],90:[function(require,module,exports){module.exports=function($,window){var Multigraph=require("../../core/multigraph.js")($),Point=require("../../math/point.js"),vF=require("../../util/validationFunctions.js");if(typeof Multigraph.render==="function"){return Multigraph}Multigraph.hasA("canvas");Multigraph.hasA("context");Multigraph.hasA("width").which.isA("number");Multigraph.hasA("height").which.isA("number");Multigraph.respondsTo("redraw",function(){var that=this;window.requestAnimationFrame(function(){that.render()})});Multigraph.respondsTo("popout",function(popdiv){var origDiv=this.div();$(popdiv).empty();this.div($('<div style="width: 100%; height: 100%;"></div>').appendTo($(popdiv)));this.init();this.registerEvents();var that=this;return function(){$(that.div()).remove();that.div(origDiv);that.width($(that.div()).width());that.height($(that.div()).height());that.initializeSurface();that.render()}});Multigraph.respondsTo("resize",function(){var $div=$(this.div());this.width($div.width());this.height($div.height());this.resizeSurface(this.width()*window.devicePixelRatio,this.height()*window.devicePixelRatio);$div.find("canvas").css({width:this.width()+"px",height:this.height()+"px"});this.render()});Multigraph.respondsTo("init",function(){var $div=$(this.div());this.width($div.width());this.height($div.height());if(this.width()>0&&this.height()>0){$('<canvas width="'+this.width()*window.devicePixelRatio+'" height="'+this.height()*window.devicePixelRatio+'" style="width:'+this.width()+"px; height:"+this.height()+'px;"/>').appendTo($div);this.initializeSurface();this.busySpinner($('<div style="position:absolute;top:50%;left:50%;margin-top:-16px;margin-left:-16px"></div>').appendTo($div).busy_spinner())}this.render()});Multigraph.respondsTo("render",function(){var context=this.context(),width=this.width(),height=this.height(),i;context.setTransform(1,0,0,1,0,0);context.scale(window.devicePixelRatio,window.devicePixelRatio);context.transform(1,0,0,-1,0,height);context.clearRect(0,0,width,height);this.initializeGeometry(width,height,{context:context});for(i=0;i<this.graphs().size();++i){this.graphs().at(i).render(context,width,height)}});Multigraph.respondsTo("registerEvents",function(options){var canvas=this.canvas();this.registerMouseEvents(canvas,options);if(!options.noscroll){this.registerTouchEvents(canvas,options)}});Multigraph.respondsTo("resizeSurface",function(width,height){var canvas=this.context().canvas;canvas.width=width;canvas.height=height});Multigraph.respondsTo("initializeSurface",function(){this.canvas($(this.div()).children("canvas")[0]);this.context(this.canvas().getContext("2d"))});function looks_like_json(s){return/^\s*[{\[]/.test(s)}var generateInitialGraph=function(mugl,options){var JQueryXMLParser=require("../../parser/xml/jquery_xml_parser.js")($);require("../../parser/json/json_parser.js")($);var multigraph;if(vF.typeOf(mugl)==="string"){if(looks_like_json(mugl)){var obj=JSON&&JSON.parse(mugl)||$.parseJSON(mugl);multigraph=Multigraph.parseJSON(obj,options.mugl,options.messageHandler)}else{var xmlObj=JQueryXMLParser.stringToJQueryXMLObj(mugl);multigraph=Multigraph.parseXML(xmlObj,options.mugl,options.messageHandler)}}else{multigraph=Multigraph.parseJSON(mugl,options.mugl,options.messageHandler)
}multigraph.normalize();multigraph.div(options.div);$(options.div).css("cursor","pointer");multigraph.init();multigraph.registerEvents(options);multigraph.registerCommonDataCallback(function(event){multigraph.redraw()});return multigraph};Multigraph.createCanvasGraph=function(options){var muglPromise,deferred;try{require("../../events/all.js")($,window,options.messageHandler.error);muglPromise=$.ajax({url:options.mugl,dataType:"text"});deferred=$.Deferred()}catch(e){throw e}muglPromise.done(function(data){try{var multigraph=generateInitialGraph(data,options);deferred.resolve(multigraph)}catch(e){throw e}});return deferred.promise()};Multigraph.createCanvasGraphFromString=function(options){var deferred;try{require("../../events/all.js")($,window,options.messageHandler.error);deferred=$.Deferred();var multigraph=generateInitialGraph(options.muglString,options);deferred.resolve(multigraph)}catch(e){throw e}return deferred.promise()};return Multigraph}},{"../../core/multigraph.js":48,"../../events/all.js":72,"../../math/point.js":104,"../../parser/json/json_parser.js":119,"../../parser/xml/jquery_xml_parser.js":144,"../../util/validationFunctions.js":158}],91:[function(require,module,exports){module.exports=function(){var Plotarea=require("../../core/plotarea.js");if(typeof Plotarea.render==="function"){return Plotarea}Plotarea.respondsTo("render",function(graph,context){var plotBox=graph.plotBox(),border=this.border();if(this.color()!==null){context.save();context.fillStyle=this.color().getHexString("#");context.fillRect(0,0,plotBox.width(),plotBox.height());context.restore()}if(border>0){context.save();context.lineWidth=border;context.strokeStyle=this.bordercolor().getHexString("#");context.strokeRect(-border/2,-border/2,plotBox.width()+border,plotBox.height()+border);context.restore()}});return Plotarea}},{"../../core/plotarea.js":56}],92:[function(require,module,exports){var _INCLUDED=false;module.exports=function(){var BandRenderer=require("../../../core/renderers/band_renderer.js");if(_INCLUDED){return BandRenderer}_INCLUDED=true;BandRenderer.hasA("state");BandRenderer.respondsTo("begin",function(context){var state={context:context,run:[],linecolor:this.getOptionValue("linecolor"),line1color:this.getOptionValue("line1color"),line2color:this.getOptionValue("line2color"),linewidth:this.getOptionValue("linewidth"),line1width:this.getOptionValue("line1width"),line2width:this.getOptionValue("line2width"),fillcolor:this.getOptionValue("fillcolor"),fillopacity:this.getOptionValue("fillopacity")};this.state(state)});BandRenderer.respondsTo("dataPoint",function(datap){var state=this.state();if(this.isMissing(datap)){if(state.run.length>0){this.renderRun();state.run=[]}}else{var p=this.transformPoint(datap);state.run.push(p)}});BandRenderer.respondsTo("end",function(){var state=this.state();if(state.run.length>0){this.renderRun()}});var strokeRunLine=function(context,run,whichLine,color,defaultColor,width,defaultWidth){var i;width=width>=0?width:defaultWidth;if(width>0){color=color!==null?color:defaultColor;context.save();context.strokeStyle=color.getHexString("#");context.lineWidth=width;context.beginPath();context.moveTo(run[0][0],run[0][whichLine]);for(i=1;i<run.length;++i){context.lineTo(run[i][0],run[i][whichLine])}context.stroke();context.restore()}};BandRenderer.respondsTo("renderRun",function(){var state=this.state(),context=state.context,run=state.run,i;context.save();context.globalAlpha=state.fillopacity;context.fillStyle=state.fillcolor.getHexString("#");context.beginPath();context.moveTo(run[0][0],run[0][1]);for(i=1;i<run.length;++i){context.lineTo(run[i][0],run[i][1])}context.lineTo(run[run.length-1][0],run[run.length-1][2]);for(i=run.length-1;i>=0;--i){context.lineTo(run[i][0],run[i][2])}context.fill();context.restore();strokeRunLine(context,run,1,state.line1color,state.linecolor,state.line1width,state.linewidth);strokeRunLine(context,run,2,state.line2color,state.linecolor,state.line2width,state.linewidth)});BandRenderer.respondsTo("renderLegendIcon",function(context,x,y,icon){var state=this.state(),iconWidth=icon.width(),iconHeight=icon.height();context.save();context.transform(1,0,0,1,x,y);context.save();if(iconWidth<10||iconHeight<10){context.fillStyle=state.fillcolor.toRGBA()}else{context.fillStyle="#FFFFFF"}context.fillRect(0,0,iconWidth,iconHeight);context.restore();context.strokeStyle=state.line2color!==null?state.line2color:state.linecolor;context.lineWidth=state.line2width>=0?state.line2width:state.linewidth;context.fillStyle=state.fillcolor.toRGBA(state.fillopacity);context.beginPath();context.moveTo(0,2*iconHeight/8);context.lineTo(0,6*iconHeight/8);context.lineTo(iconWidth,7*iconHeight/8);context.lineTo(iconWidth,3*iconHeight/8);context.lineTo(0,2*iconHeight/8);context.fill();context.stroke();context.restore()});return BandRenderer}},{"../../../core/renderers/band_renderer.js":59}],93:[function(require,module,exports){var _INCLUDED=false;module.exports=function(){var BarRenderer=require("../../../core/renderers/bar_renderer.js");if(_INCLUDED){return BarRenderer}_INCLUDED=true;BarRenderer.hasA("settings");BarRenderer.respondsTo("begin",function(context){var settings={context:context,barpixelwidth:this.getOptionValue("barwidth").getRealValue()*this.plot().horizontalaxis().axisToDataRatio(),baroffset:this.getOptionValue("baroffset"),barpixelbase:this.getOptionValue("barbase")!==null?this.plot().verticalaxis().dataValueToAxisValue(this.getOptionValue("barbase")):0,fillcolor:this.getOptionValue("fillcolor"),linecolor:this.getOptionValue("linecolor"),hidelines:this.getOptionValue("hidelines"),barGroups:[],currentBarGroup:null,prevCorner:null,pixelEdgeTolerance:1};this.settings(settings)});BarRenderer.respondsTo("dataPoint",function(datap){if(this.isMissing(datap)){return}var settings=this.settings(),context=settings.context,p=this.transformPoint(datap),x0=p[0]+settings.baroffset,x1=p[0]+settings.baroffset+settings.barpixelwidth;context.save();context.fillStyle=this.getOptionValue("fillcolor",datap[1]).getHexString("#");context.fillRect(x0,settings.barpixelbase,settings.barpixelwidth,p[1]-settings.barpixelbase);context.restore();if(settings.barpixelwidth>settings.hidelines){if(settings.prevCorner===null){settings.currentBarGroup=[[x0,p[1]]]}else{if(Math.abs(x0-settings.prevCorner[0])<=settings.pixelEdgeTolerance){settings.currentBarGroup.push([x0,p[1]])}else{settings.currentBarGroup.push(settings.prevCorner);settings.barGroups.push(settings.currentBarGroup);settings.currentBarGroup=[[x0,p[1]]]}}settings.prevCorner=[x1,p[1]]}});BarRenderer.respondsTo("end",function(){var settings=this.settings(),context=settings.context,barpixelbase=settings.barpixelbase,max=Math.max,min=Math.min,p,barGroup,i,j,n;if(settings.prevCorner!==null&&settings.currentBarGroup!==null){settings.currentBarGroup.push(settings.prevCorner);settings.barGroups.push(settings.currentBarGroup)}context.save();context.strokeStyle=settings.linecolor.getHexString("#");context.beginPath();for(i=0;i<settings.barGroups.length;i++){barGroup=settings.barGroups[i];n=barGroup.length;if(n<2){return}context.moveTo(barGroup[1][0],barGroup[0][1]);context.lineTo(barGroup[0][0],barGroup[0][1]);context.lineTo(barGroup[0][0],barpixelbase);context.lineTo(barGroup[1][0],barpixelbase);for(j=1;j<n-1;++j){context.moveTo(barGroup[j][0],min(barGroup[j-1][1],barGroup[j][1],barpixelbase));context.lineTo(barGroup[j][0],max(barGroup[j-1][1],barGroup[j][1],barpixelbase));context.moveTo(barGroup[j][0],barGroup[j][1]);context.lineTo(barGroup[j+1][0],barGroup[j][1]);context.moveTo(barGroup[j][0],barpixelbase);context.lineTo(barGroup[j+1][0],barpixelbase)}context.moveTo(barGroup[n-1][0],barGroup[n-1][1]);context.lineTo(barGroup[n-1][0],barpixelbase)}context.stroke();context.restore()});BarRenderer.respondsTo("renderLegendIcon",function(context,x,y,icon){var settings=this.settings(),rendererFillColor=this.getOptionValue("fillcolor",0).toRGBA(this.getOptionValue("fillopacity",0));context.save();context.transform(1,0,0,1,x,y);context.fillStyle="rgba(255, 255, 255, 1)";context.fillRect(0,0,icon.width(),icon.height());context.lineWidth=1;context.fillStyle=rendererFillColor;if(settings.barpixelwidth<settings.hidelines){context.strokeStyle=rendererFillColor}else{context.strokeStyle=this.getOptionValue("linecolor",0).toRGBA()}var iconWidth=icon.width(),iconHeight=icon.height(),barwidth;if(iconWidth>20||iconHeight>20){barwidth=iconWidth/6}else if(iconWidth>10||iconHeight>10){barwidth=iconWidth/4}else{barwidth=iconWidth/4}if(iconWidth>20&&iconHeight>20){context.fillRect(iconWidth/4-barwidth/2,0,barwidth,iconHeight/2);context.strokeRect(iconWidth/4-barwidth/2,0,barwidth,iconHeight/2);context.fillRect(iconWidth-iconWidth/4-barwidth/2,0,barwidth,iconHeight/3);context.strokeRect(iconWidth-iconWidth/4-barwidth/2,0,barwidth,iconHeight/3)}context.fillRect(iconWidth/2-barwidth/2,0,barwidth,iconHeight-iconHeight/4);context.strokeRect(iconWidth/2-barwidth/2,0,barwidth,iconHeight-iconHeight/4);context.restore()});return BarRenderer}},{"../../../core/renderers/bar_renderer.js":60}],94:[function(require,module,exports){var _INCLUDED=false;module.exports=function(){var FillRenderer=require("../../../core/renderers/fill_renderer.js"),mathUtil=require("../../../math/util.js");if(_INCLUDED){return FillRenderer}_INCLUDED=true;FillRenderer.hasA("state");FillRenderer.respondsTo("begin",function(context){var state={context:context,run:[],previouspoint:null,linecolor:this.getOptionValue("linecolor"),linewidth:this.getOptionValue("linewidth"),fillcolor:this.getOptionValue("fillcolor"),downfillcolor:this.getOptionValue("downfillcolor"),fillopacity:this.getOptionValue("fillopacity"),fillbase:this.getOptionValue("fillbase"),currentfillcolor:null};if(state.downfillcolor===null){state.downfillcolor=state.fillcolor}if(state.fillbase!==null){state.fillpixelbase=this.plot().verticalaxis().dataValueToAxisValue(state.fillbase)}else{state.fillpixelbase=0}this.state(state);context.save();context.fillStyle=state.fillcolor.getHexString("#")});FillRenderer.respondsTo("dataPoint",function(datap){var state=this.state(),fillpixelbase=state.fillpixelbase,fillcolor,linecolor,p;if(this.isMissing(datap)){if(state.previouspoint!==null){state.run.push([state.previouspoint[0],fillpixelbase]);this.renderRun();state.run=[];state.previouspoint=null}return}p=this.transformPoint(datap);if(p[1]>=fillpixelbase){fillcolor=state.fillcolor}else{fillcolor=state.downfillcolor}if(state.run.length===0){state.run.push([p[0],fillpixelbase])}else{if(!fillcolor.eq(state.currentfillcolor)){var x=mathUtil.safe_interp(fillpixelbase,state.previouspoint[1],p[1],state.previouspoint[0],p[0]);state.run.push([x,fillpixelbase]);state.run.push([x,fillpixelbase]);this.renderRun();state.run=[];state.run.push([x,fillpixelbase]);state.run.push([x,fillpixelbase])}}state.run.push(p);state.previouspoint=p;state.currentfillcolor=fillcolor});FillRenderer.respondsTo("end",function(){var state=this.state(),context=state.context;if(state.run.length>0){state.run.push([state.run[state.run.length-1][0],state.fillpixelbase]);this.renderRun()}context.restore()});FillRenderer.respondsTo("renderRun",function(){var state=this.state(),context=state.context,i;context.save();context.globalAlpha=state.fillopacity;context.fillStyle=state.currentfillcolor.getHexString("#");context.beginPath();context.moveTo(state.run[0][0],state.run[0][1]);for(i=1;i<state.run.length;++i){context.lineTo(state.run[i][0],state.run[i][1])}context.fill();context.restore();context.save();context.strokeStyle=state.linecolor.getHexString("#");context.lineWidth=state.linewidth;context.beginPath();context.moveTo(state.run[1][0],state.run[1][1]);for(i=2;i<state.run.length-1;++i){context.lineTo(state.run[i][0],state.run[i][1])}context.stroke();context.restore()});FillRenderer.respondsTo("renderLegendIcon",function(context,x,y,icon){var state=this.state(),iconWidth=icon.width(),iconHeight=icon.height();context.save();context.transform(1,0,0,1,x,y);context.save();if(iconWidth<10||iconHeight<10){context.fillStyle=state.fillcolor.toRGBA()}else{context.fillStyle="rgba(255, 255, 255, 1)"}context.fillRect(0,0,iconWidth,iconHeight);context.restore();context.strokeStyle=state.linecolor.toRGBA();context.lineWidth=state.linewidth;context.fillStyle=state.fillcolor.toRGBA(state.fillopacity);context.beginPath();context.moveTo(0,0);if(iconWidth>10||iconHeight>10){if(iconWidth>20||iconHeight>20){context.lineTo(iconWidth/6,iconHeight/2);context.lineTo(iconWidth/3,iconHeight/4)}context.lineTo(iconWidth/2,iconHeight-iconHeight/4);if(iconWidth>20||iconHeight>20){context.lineTo(iconWidth-iconWidth/3,iconHeight/4);context.lineTo(iconWidth-iconWidth/6,iconHeight/2)}}context.lineTo(iconWidth,0);context.stroke();context.fill();context.restore()});return FillRenderer}},{"../../../core/renderers/fill_renderer.js":61,"../../../math/util.js":106}],95:[function(require,module,exports){var _INCLUDED=false;module.exports=function(){var PointlineRenderer=require("../../../core/renderers/pointline_renderer.js"),Renderer=require("../../../core/renderer.js");if(_INCLUDED){return PointlineRenderer}_INCLUDED=true;PointlineRenderer.hasA("settings");PointlineRenderer.respondsTo("begin",function(context){var settings={context:context,points:[],first:true,pointshape:this.getOptionValue("pointshape"),pointcolor:this.getOptionValue("pointcolor"),pointopacity:this.getOptionValue("pointopacity"),pointsize:this.getOptionValue("pointsize"),pointoutlinewidth:this.getOptionValue("pointoutlinewidth"),pointoutlinecolor:this.getOptionValue("pointoutlinecolor"),linestroke:this.getOptionValue("linestroke"),linecolor:this.getOptionValue("linecolor"),linewidth:this.getOptionValue("linewidth")};if(this.type()===Renderer.LINE){settings.pointsize=0}if(this.type()===Renderer.POINT){settings.linewidth=0}this.settings(settings);if(settings.linewidth>0){context.save();context.beginPath();if(settings.linestroke===PointlineRenderer.DASHED){context.setLineDash([5,5])}context.lineWidth=settings.linewidth;context.strokeStyle=settings.linecolor.getHexString("#")}if(this.filter()){this.filter().reset()}});PointlineRenderer.respondsTo("dataPoint",function(datap){var settings=this.settings(),context=settings.context,p;if(this.isMissing(datap)){settings.first=true;return}p=this.transformPoint(datap);if(this.filter()){if(this.filter().filter(datap,p)){return}}if(settings.linewidth>0){if(settings.first){context.moveTo(p[0],p[1]);settings.first=false}else{context.lineTo(p[0],p[1])}}if(settings.pointsize>0){settings.points.push(p)}});PointlineRenderer.respondsTo("end",function(){var settings=this.settings(),context=settings.context;if(settings.linewidth>0){context.stroke();context.restore()}if(settings.pointsize>0){this.drawPoints()}});PointlineRenderer.respondsTo("drawPoints",function(p){var settings=this.settings(),context=settings.context,points=settings.points,pointshape=settings.pointshape,i;context.save();context.beginPath();if(pointshape===PointlineRenderer.PLUS||pointshape===PointlineRenderer.X){context.strokeStyle=settings.pointcolor.getHexString("#");context.lineWidth=settings.pointoutlinewidth}else{context.fillStyle=settings.pointcolor.toRGBA(settings.pointopacity);context.strokeStyle=settings.pointoutlinecolor.getHexString("#");context.lineWidth=settings.pointoutlinewidth}for(i=0;i<points.length;++i){this.drawPoint(context,settings,points[i])}if(!(pointshape===PointlineRenderer.PLUS||pointshape===PointlineRenderer.X)){context.fill()}context.stroke();context.restore()});PointlineRenderer.respondsTo("drawPoint",function(context,settings,p){var pointsize=settings.pointsize,p0=p[0],p1=p[1],a,b,d;switch(settings.pointshape){case PointlineRenderer.PLUS:context.moveTo(p0,p1-pointsize);context.lineTo(p0,p1+pointsize);context.moveTo(p0-pointsize,p1);context.lineTo(p0+pointsize,p1);return;case PointlineRenderer.X:d=.7071*pointsize;context.moveTo(p0-d,p1-d);context.lineTo(p0+d,p1+d);context.moveTo(p0-d,p1+d);context.lineTo(p0+d,p1-d);return;case PointlineRenderer.SQUARE:context.moveTo(p0-pointsize,p1-pointsize);context.lineTo(p0+pointsize,p1-pointsize);context.lineTo(p0+pointsize,p1+pointsize);context.lineTo(p0-pointsize,p1+pointsize);return;case PointlineRenderer.TRIANGLE:d=1.5*pointsize;a=.866025*d;b=.5*d;context.moveTo(p0,p1+d);context.lineTo(p0+a,p1-b);context.lineTo(p0-a,p1-b);return;case PointlineRenderer.DIAMOND:d=1.5*pointsize;context.moveTo(p0-pointsize,p1);context.lineTo(p0,p1+d);context.lineTo(p0+pointsize,p1);context.lineTo(p0,p1-d);return;case PointlineRenderer.STAR:d=1.5*pointsize;context.moveTo(p0-d*0,p1+d*1);context.lineTo(p0+d*.3536,p1+d*.3536);context.lineTo(p0+d*.9511,p1+d*.309);context.lineTo(p0+d*.4455,p1-d*.227);context.lineTo(p0+d*.5878,p1-d*.809);context.lineTo(p0-d*.0782,p1-d*.4938);context.lineTo(p0-d*.5878,p1-d*.809);context.lineTo(p0-d*.4938,p1-d*.0782);context.lineTo(p0-d*.9511,p1+d*.309);context.lineTo(p0-d*.227,p1+d*.4455);return;case PointlineRenderer.CIRCLE:context.moveTo(p0+pointsize,p1);context.arc(p0,p1,pointsize,0,2*Math.PI,false);return}});PointlineRenderer.respondsTo("renderLegendIcon",function(context,x,y,icon){var settings=this.settings(),pointshape=settings.pointshape,iconWidth=icon.width(),iconHeight=icon.height();context.save();context.fillStyle="rgba(255, 255, 255, 1)";context.fillRect(x,y,iconWidth,iconHeight);if(settings.linewidth>0){context.strokeStyle=settings.linecolor.toRGBA();context.lineWidth=settings.linewidth;context.beginPath();context.moveTo(x,y+iconHeight/2);context.lineTo(x+iconWidth,y+iconHeight/2);context.stroke()}if(settings.pointsize>0){context.beginPath();if(pointshape===PointlineRenderer.PLUS||pointshape===PointlineRenderer.X){context.strokeStyle=settings.pointcolor.toRGBA();context.lineWidth=settings.pointoutlinewidth}else{context.fillStyle=settings.pointcolor.toRGBA(settings.pointopacity);context.strokeStyle=settings.pointoutlinecolor.toRGBA();context.lineWidth=settings.pointoutlinewidth}this.drawPoint(context,settings,[x+iconWidth/2,y+iconHeight/2]);if(!(pointshape===PointlineRenderer.PLUS||pointshape===PointlineRenderer.X)){context.fill()}context.stroke()}context.restore()});return PointlineRenderer}},{"../../../core/renderer.js":57,"../../../core/renderers/pointline_renderer.js":62}],96:[function(require,module,exports){var _INCLUDED=false;module.exports=function(){var RangeBarRenderer=require("../../../core/renderers/rangebar_renderer.js");if(_INCLUDED){return RangeBarRenderer}_INCLUDED=true;RangeBarRenderer.hasA("state");RangeBarRenderer.respondsTo("begin",function(context){var state={context:context,run:[],barpixelwidth:this.getOptionValue("barwidth").getRealValue()*this.plot().horizontalaxis().axisToDataRatio(),barpixeloffset:0,baroffset:this.getOptionValue("baroffset"),fillcolor:this.getOptionValue("fillcolor"),fillopacity:this.getOptionValue("fillopacity"),linecolor:this.getOptionValue("linecolor"),linewidth:this.getOptionValue("linewidth"),hidelines:this.getOptionValue("hidelines")};state.barpixeloffset=state.barpixelwidth*state.baroffset;this.state(state);context.save();context.beginPath()});RangeBarRenderer.respondsTo("dataPoint",function(datap){if(this.isMissing(datap)){return}var state=this.state(),context=state.context,p=this.transformPoint(datap),x0=p[0]-state.barpixeloffset,x1=x0+state.barpixelwidth;context.moveTo(x0,p[1]);context.lineTo(x0,p[2]);context.lineTo(x1,p[2]);context.lineTo(x1,p[1]);context.lineTo(x0,p[1])});RangeBarRenderer.respondsTo("end",function(){var state=this.state(),context=state.context;context.globalAlpha=state.fillopacity;context.fillStyle=state.fillcolor.getHexString("#");context.fill();if(state.linewidth>0&&state.barpixelwidth>state.hidelines){context.strokeStyle=state.linecolor.getHexString("#");context.lineWidth=state.linewidth;context.stroke()}context.restore()});RangeBarRenderer.respondsTo("renderLegendIcon",function(context,x,y,icon){var state=this.state(),iconWidth=icon.width(),iconHeight=icon.height(),barwidth;context.save();context.transform(1,0,0,1,x,y);context.save();context.strokeStyle="#FFFFFF";context.fillStyle="#FFFFFF";context.fillRect(0,0,iconWidth,iconHeight);context.restore();context.fillStyle=state.fillcolor.toRGBA(state.fillopacity);context.lineWidth=state.linewidth;if(state.barpixelwidth<10){context.strokeStyle=state.fillcolor.toRGBA(state.fillopacity)}else{context.strokeStyle=state.linecolor.getHexString("#")}if(iconWidth>20||iconHeight>20){barwidth=iconWidth/6}else if(iconWidth>10||iconHeight>10){barwidth=iconWidth/4}else{barwidth=iconWidth/4}if(iconWidth>20&&iconHeight>20){context.fillRect(iconWidth/4-barwidth/2,iconHeight/8,barwidth,iconHeight/2);context.strokeRect(iconWidth/4-barwidth/2,iconHeight/8,barwidth,iconHeight/2);context.fillRect(iconWidth-iconWidth/4-barwidth/2,iconHeight/4,barwidth,iconHeight/3);context.strokeRect(iconWidth-iconWidth/4-barwidth/2,iconHeight/4,barwidth,iconHeight/3)}context.fillRect(iconWidth/2-barwidth/2,0,barwidth,iconHeight-iconHeight/4);context.strokeRect(iconWidth/2-barwidth/2,0,barwidth,iconHeight-iconHeight/4);context.restore()});return RangeBarRenderer}},{"../../../core/renderers/rangebar_renderer.js":63}],97:[function(require,module,exports){module.exports=function(){var Text=require("../../core/text.js");if(typeof Text.drawText==="function"){return Text}Text.respondsTo("initializeGeometry",function(graphicsContext){var origWidth,origHeight,rotatedWidth,rotatedHeight;graphicsContext.context.save();if(this.font()!==""){graphicsContext.context.font=this.font()}else if(graphicsContext.fontSize!==undefined){graphicsContext.context.font=graphicsContext.fontSize+" sans-serif"}origWidth=this.measureStringWidth(graphicsContext.context);origHeight=this.measureStringHeight(graphicsContext.context);graphicsContext.context.restore();if(graphicsContext.angle!==undefined){var angle=graphicsContext.angle/180*Math.PI;rotatedWidth=Math.abs(Math.cos(angle))*origWidth+Math.abs(Math.sin(angle))*origHeight;rotatedHeight=Math.abs(Math.sin(angle))*origWidth+Math.abs(Math.cos(angle))*origHeight}else{rotatedWidth=origWidth;rotatedHeight=origHeight}this.origWidth(origWidth);this.origHeight(origHeight);this.rotatedWidth(rotatedWidth);this.rotatedHeight(rotatedHeight);return this});Text.respondsTo("measureStringWidth",function(context){if(this.string()===undefined){throw new Error("measureStringWidth requires the string attr to be set.")}var metrics=context.measureText(this.string());return metrics.width});Text.respondsTo("measureStringHeight",function(context){if(this.string()===undefined){throw new Error("measureStringHeight requires the string attr to be set.")}var metrics=context.measureText("M"),newlineCount=this.string().match(/\n/g);return(newlineCount!==null?newlineCount.length+1:1)*metrics.width});Text.respondsTo("setTransform",function(context,anchor,base,position,angle){context.transform(1,0,0,-1,0,2*base.y());context.transform(1,0,0,1,base.x(),base.y());context.transform(1,0,0,1,position.x(),-position.y());context.rotate(-angle*Math.PI/180);context.transform(1,0,0,1,-anchor.x(),anchor.y())});Text.respondsTo("drawText",function(context,anchor,base,position,angle){context.save();this.setTransform(context,anchor,base,position,angle);if(this.font()!==""){context.font=this.font()}context.fillText(this.string(),0,0);context.restore()});return Text}},{"../../core/text.js":64}],98:[function(require,module,exports){module.exports=function(){var Window=require("../../core/window.js");if(typeof Window.render==="function"){return Window}Window.respondsTo("render",function(context,width,height){var m=this.margin().left();context.save();context.fillStyle=this.bordercolor().getHexString("#");context.fillRect(m,m,width-2*m,height-2*m);context.restore()});return Window}},{"../../core/window.js":70}],99:[function(require,module,exports){require("../lib/ajaxthrottle/src/ajaxthrottle.js");require("../lib/lightbox/lightbox.js");require("../lib/jquery/jquery.mousewheel.js");require("../lib/busy-spinner/busy_spinner.js");require("../lib/error-display/build/errorDisplay.js");require("../lib/requestanimationframe/requestanimationframe.js");require("./parser/xml/jquery_xml_parser.js")($);require("./parser/json/json_parser.js")($);require("./graphics/canvas/all.js")($,window);require("./events/multigraph.js")($,window,undefined);var Multigraph=require("./core/multigraph.js")($);var utilityFunctions=require("./util/utilityFunctions.js");var parsingFunctions=require("./util/parsingFunctions.js");var validationFunctions=require("./util/validationFunctions.js");window.multigraph={core:{Multigraph:Multigraph,CSVData:require("./core/csv_data.js")($),WebServiceData:require("./core/web_service_data.js")($),ArrayData:require("./core/array_data.js"),Axis:require("./core/axis.js"),AxisBinding:require("./core/axis_binding.js"),AxisTitle:require("./core/axis_title.js"),Background:require("./core/background.js"),ConstantPlot:require("./core/constant_plot.js"),Data:require("./core/data.js"),DataFormatter:require("./core/data_formatter.js"),DataMeasure:require("./core/data_measure.js"),DataPlot:require("./core/data_plot.js"),DataValue:require("./core/data_value.js"),DataVariable:require("./core/data_variable.js"),Datatips:require("./core/datatips.js"),DatatipsVariable:require("./core/datatips_variable.js"),DatetimeFormatter:require("./core/datetime_formatter.js"),DatetimeMeasure:require("./core/datetime_measure.js"),DatetimeValue:require("./core/datetime_value.js"),EventEmitter:require("./core/event_emitter.js"),FilterOption:require("./core/filter_option.js"),Filter:require("./core/filter.js"),Graph:require("./core/graph.js"),Grid:require("./core/grid.js"),Icon:require("./core/icon.js"),Img:require("./core/img.js"),Labeler:require("./core/labeler.js"),Legend:require("./core/legend.js"),Mixin:require("./core/mixin.js"),NumberFormatter:require("./core/number_formatter.js"),NumberMeasure:require("./core/number_measure.js"),NumberValue:require("./core/number_value.js"),Pan:require("./core/pan.js"),PeriodicArrayData:require("./core/periodic_array_data.js"),Plot:require("./core/plot.js"),PlotLegend:require("./core/plot_legend.js"),Plotarea:require("./core/plotarea.js"),Renderer:require("./core/renderer.js"),BandRenderer:require("./core/renderers/band_renderer.js"),BarRenderer:require("./core/renderers/bar_renderer.js"),FillRenderer:require("./core/renderers/fill_renderer.js"),PointlineRenderer:require("./core/renderers/pointline_renderer.js"),RangeBarRenderer:require("./core/renderers/rangebar_renderer.js"),Text:require("./core/text.js"),Title:require("./core/title.js"),Warning:require("./core/warning.js"),WebServiceDataCacheNode:require("./core/web_service_data_cache_node.js"),WebServiceDataIterator:require("./core/web_service_data_iterator.js"),Window:require("./core/window.js"),Zoom:require("./core/zoom.js"),browserHasCanvasSupport:Multigraph.browserHasCanvasSupport,browserHasSVGSupport:Multigraph.browserHasSVGSupport},create:Multigraph.create,math:{Box:require("./math/box.js"),Displacement:require("./math/displacement.js"),Enum:require("./math/enum.js"),Insets:require("./math/insets.js"),Point:require("./math/point.js"),RGBColor:require("./math/rgb_color.js"),util:require("./math/util.js")},parser:{jquery:{stringToJQueryXMLObj:require("./parser/xml/jquery_xml_parser.js")($).stringToJQueryXMLObj}},utilityFunctions:{getKeys:utilityFunctions.getKeys,insertDefaults:utilityFunctions.insertDefaults,getDefaultValuesFromXSD:utilityFunctions.getDefaultValuesFromXSD,parseAttribute:parsingFunctions.parseAttribute,parseInteger:parsingFunctions.parseInteger,parseBoolean:parsingFunctions.parseBoolean,getXMLAttr:parsingFunctions.getXMLAttr,validateNumberRange:validationFunctions.validateNumberRange,typeOf:validationFunctions.typeOf},jermaine:require("../lib/jermaine/src/jermaine.js"),jQuery:$};window.sprintf=require("sprintf")},{"../lib/ajaxthrottle/src/ajaxthrottle.js":1,"../lib/busy-spinner/busy_spinner.js":2,"../lib/error-display/build/errorDisplay.js":3,"../lib/jermaine/src/jermaine.js":9,"../lib/jquery/jquery.mousewheel.js":13,"../lib/lightbox/lightbox.js":14,"../lib/requestanimationframe/requestanimationframe.js":15,"./core/array_data.js":17,"./core/axis.js":18,"./core/axis_binding.js":19,"./core/axis_title.js":20,"./core/background.js":21,"./core/constant_plot.js":24,"./core/csv_data.js":25,"./core/data.js":26,"./core/data_formatter.js":27,"./core/data_measure.js":28,"./core/data_plot.js":29,"./core/data_value.js":30,"./core/data_variable.js":31,"./core/datatips.js":32,"./core/datatips_variable.js":33,"./core/datetime_formatter.js":34,"./core/datetime_measure.js":35,"./core/datetime_value.js":37,"./core/event_emitter.js":38,"./core/filter.js":39,"./core/filter_option.js":40,"./core/graph.js":41,"./core/grid.js":42,"./core/icon.js":43,"./core/img.js":44,"./core/labeler.js":45,"./core/legend.js":46,"./core/mixin.js":47,"./core/multigraph.js":48,"./core/number_formatter.js":49,"./core/number_measure.js":50,"./core/number_value.js":51,"./core/pan.js":52,"./core/periodic_array_data.js":53,"./core/plot.js":54,"./core/plot_legend.js":55,"./core/plotarea.js":56,"./core/renderer.js":57,"./core/renderers/band_renderer.js":59,"./core/renderers/bar_renderer.js":60,"./core/renderers/fill_renderer.js":61,"./core/renderers/pointline_renderer.js":62,"./core/renderers/rangebar_renderer.js":63,"./core/text.js":64,"./core/title.js":65,"./core/warning.js":66,"./core/web_service_data.js":67,"./core/web_service_data_cache_node.js":68,"./core/web_service_data_iterator.js":69,"./core/window.js":70,"./core/zoom.js":71,"./events/multigraph.js":76,"./graphics/canvas/all.js":80,"./math/box.js":100,"./math/displacement.js":101,"./math/enum.js":102,"./math/insets.js":103,"./math/point.js":104,"./math/rgb_color.js":105,"./math/util.js":106,"./parser/json/json_parser.js":119,"./parser/xml/jquery_xml_parser.js":144,"./util/parsingFunctions.js":156,"./util/utilityFunctions.js":157,"./util/validationFunctions.js":158,sprintf:16}],100:[function(require,module,exports){var jermaine=require("../../lib/jermaine/src/jermaine.js");var Box=new jermaine.Model("Box",function(){this.hasA("width").which.isA("number");this.hasA("height").which.isA("number");this.isBuiltWith("width","height")});module.exports=Box},{"../../lib/jermaine/src/jermaine.js":9}],101:[function(require,module,exports){var jermaine=require("../../lib/jermaine/src/jermaine.js"),validationFunctions=require("../util/validationFunctions.js");var Displacement={};Displacement=new jermaine.Model("Displacement",function(){this.hasA("a").which.validatesWith(function(a){return validationFunctions.validateNumberRange(a,-1,1)});this.hasA("b").which.isA("integer").and.defaultsTo(0);this.isBuiltWith("a","%b");this.respondsTo("calculateLength",function(totalLength){return this.a()*totalLength+this.b()});this.respondsTo("calculateCoordinate",function(totalLength){return(this.a()+1)*totalLength/2+this.b()})});Displacement.regExp=/^([\+\-]?[0-9\.]+)([+\-])([0-9\.+\-]+)$/;Displacement.parse=function(string){if(typeof string!=="string"){string=String(string)}var ar=Displacement.regExp.exec(string),d,a,b,sign;if(string===undefined){d=new Displacement(1)}else if(ar!==null){a=parseFloat(ar[1]);b=parseFloat(ar[3]);switch(ar[2]){case"+":sign=1;break;case"-":sign=-1;break;default:sign=0;break}d=new Displacement(a,sign*b)}else{a=parseFloat(string);d=new Displacement(a)}return d};module.exports=Displacement},{"../../lib/jermaine/src/jermaine.js":9,"../util/validationFunctions.js":158}],102:[function(require,module,exports){var Enum=function(name){var instances={};var Enum=function(key){if(instances[key]!==undefined){throw new Error("attempt to redefine "+name+" Enum with key '"+key+"'")}this.enumType=name;this.key=key;instances[key]=this};Enum.parse=function(key){return instances[key]};Enum.prototype.toString=function(){return this.key};Enum.isInstance=function(obj){return obj!==undefined&&obj!==null&&obj.enumType===name};return Enum};module.exports=Enum},{}],103:[function(require,module,exports){var jermaine=require("../../lib/jermaine/src/jermaine.js");
var Insets=new jermaine.Model("Insets",function(){this.hasA("top").which.isA("number");this.hasA("left").which.isA("number");this.hasA("bottom").which.isA("number");this.hasA("right").which.isA("number");this.respondsTo("set",function(top,left,bottom,right){this.top(top);this.left(left);this.bottom(bottom);this.right(right)});this.isBuiltWith("top","left","bottom","right")});module.exports=Insets},{"../../lib/jermaine/src/jermaine.js":9}],104:[function(require,module,exports){var jermaine=require("../../lib/jermaine/src/jermaine.js");var Point=new jermaine.Model("Point",function(){this.hasA("x").which.isA("number");this.hasA("y").which.isA("number");this.isBuiltWith("x","y");this.respondsTo("eq",function(p){return this.x()===p.x()&&this.y()===p.y()})});var regExp=/^\s*([0-9\-\+\.eE]+)(,|\s+|\s*,\s+|\s+,\s*)([0-9\-\+\.eE]+)\s*$/;Point.parse=function(string){var ar=regExp.exec(string),p;if(!ar||ar.length!==4){throw new Error("cannot parse string '"+string+"' as a Point")}return new Point(parseFloat(ar[1]),parseFloat(ar[3]))};module.exports=Point},{"../../lib/jermaine/src/jermaine.js":9}],105:[function(require,module,exports){var jermaine=require("../../lib/jermaine/src/jermaine.js");var validationFunctions=require("../util/validationFunctions.js");var RGBColor=new jermaine.Model("RGBColor",function(){this.hasA("r").which.validatesWith(function(r){return validationFunctions.validateNumberRange(r,0,1)});this.hasA("g").which.validatesWith(function(g){return validationFunctions.validateNumberRange(g,0,1)});this.hasA("b").which.validatesWith(function(b){return validationFunctions.validateNumberRange(b,0,1)});var numberToHex=function(number){number=parseInt(number*255,10).toString(16);if(number.length===1){number="0"+number}return number};this.respondsTo("getHexString",function(prefix){if(!prefix){prefix="0x"}return prefix+numberToHex(this.r())+numberToHex(this.g())+numberToHex(this.b())});this.respondsTo("toRGBA",function(alpha){if(alpha===undefined){alpha=1}if(typeof alpha!=="number"){throw new Error("RGBColor.toRGBA: The argument, if present, must be a number")}return"rgba("+255*this.r()+", "+255*this.g()+", "+255*this.b()+", "+alpha+")"});this.respondsTo("eq",function(color){return this.r()===color.r()&&this.g()===color.g()&&this.b()===color.b()});this.isBuiltWith("r","g","b")});RGBColor.colorNameIsDeprecated=function(colorName){switch(colorName){case"grey":return"0xeeeeee";case"skyblue":return"0x87ceeb";case"khaki":return"0xf0e68c";case"orange":return"0xffa500";case"salmon":return"0xfa8072";case"olive":return"0x9acd32";case"sienna":return"0xa0522d";case"pink":return"0xffb5c5";case"violet":return"0xee82ee"}return false};RGBColor.parse=function(input){var red,green,blue,grey,parsedInput,colorObj;if(input===undefined){return undefined}else if(typeof input==="string"){parsedInput=input.toLowerCase();switch(parsedInput){case"black":red=0;green=0;blue=0;break;case"red":red=1;green=0;blue=0;break;case"green":red=0;green=1;blue=0;break;case"blue":red=0;green=0;blue=1;break;case"yellow":red=1;green=1;blue=0;break;case"magenta":red=1;green=0;blue=1;break;case"cyan":red=0;green=1;blue=1;break;case"white":red=1;green=1;blue=1;break;case"grey":grey=parseInt("ee",16)/255;red=grey;green=grey;blue=grey;break;case"skyblue":red=parseInt("87",16)/255;green=parseInt("ce",16)/255;blue=parseInt("eb",16)/255;break;case"khaki":red=parseInt("f0",16)/255;green=parseInt("e6",16)/255;blue=parseInt("8c",16)/255;break;case"orange":red=parseInt("ff",16)/255;green=parseInt("a5",16)/255;blue=parseInt("00",16)/255;break;case"salmon":red=parseInt("fa",16)/255;green=parseInt("80",16)/255;blue=parseInt("72",16)/255;break;case"olive":red=parseInt("9a",16)/255;green=parseInt("cd",16)/255;blue=parseInt("32",16)/255;break;case"sienna":red=parseInt("a0",16)/255;green=parseInt("52",16)/255;blue=parseInt("2d",16)/255;break;case"pink":red=parseInt("ff",16)/255;green=parseInt("b5",16)/255;blue=parseInt("c5",16)/255;break;case"violet":red=parseInt("ee",16)/255;green=parseInt("82",16)/255;blue=parseInt("ee",16)/255;break;default:parsedInput=parsedInput.replace(/(0(x|X)|#)/,"");if(parsedInput.search(new RegExp(/([^0-9a-f])/))!==-1){throw new Error("'"+input+"' is not a valid color")}if(parsedInput.length===6){red=parseInt(parsedInput.substring(0,2),16)/255;green=parseInt(parsedInput.substring(2,4),16)/255;blue=parseInt(parsedInput.substring(4,6),16)/255}else if(parsedInput.length===3){red=parseInt(parsedInput.charAt(0),16)/15;green=parseInt(parsedInput.charAt(1),16)/15;blue=parseInt(parsedInput.charAt(2),16)/15}else{throw new Error("'"+input+"' is not a valid color")}break}colorObj=new RGBColor(red,green,blue);return colorObj}throw new Error("'"+input+"' is not a valid color")};module.exports=RGBColor},{"../../lib/jermaine/src/jermaine.js":9,"../util/validationFunctions.js":158}],106:[function(require,module,exports){Util={};Util.interp=function(x,x0,x1,y0,y1){return y0+(y1-y0)*(x-x0)/(x1-x0)};Util.safe_interp=function(x,x0,x1,y0,y1){if(x0===x1){return(y0+y1)/2}return Util.interp(x,x0,x1,y0,y1)};Util.l2dist=function(x1,y1,x2,y2){var dx=x1-x2;var dy=y1-y2;return Math.sqrt(dx*dx+dy*dy)};module.exports=Util},{}],107:[function(require,module,exports){require("./labeler.js");require("./axis_title.js");require("./grid.js");require("./pan.js");require("./zoom.js");var Axis=require("../../core/axis.js"),pF=require("../../util/parsingFunctions.js"),vF=require("../../util/validationFunctions.js"),uF=require("../../util/utilityFunctions.js");var parseLabels=function(json,axis){var spacings,labelers=axis.labelers(),Labeler=require("../../core/labeler.js"),DataValue=require("../../core/data_value.js"),i;spacings=[];if(json!==undefined){if(json.spacing!==undefined){spacings=vF.typeOf(json.spacing)==="array"?json.spacing:[json.spacing]}}if(spacings.length>0){for(i=0;i<spacings.length;++i){labelers.add(Labeler.parseJSON(json,axis,undefined,spacings[i]))}}else if(json!==undefined&&json.label!==undefined&&json.label.length>0){var defaults=Labeler.parseJSON(json,axis,undefined,null);json.label.forEach(function(e){var spacing=[];if(e.spacing!==undefined){spacing=vF.typeOf(e.spacing)==="array"?e.spacing:[e.spacing]}spacing.forEach(function(s){labelers.add(Labeler.parseJSON(e,axis,defaults,s))})})}else{var defaultValues=uF.getDefaultValuesFromXSD().horizontalaxis.labels;var defaultSpacings=axis.type()===DataValue.NUMBER?defaultValues.defaultNumberSpacing:defaultValues.defaultDatetimeSpacing;for(i=0;i<defaultSpacings.length;++i){labelers.add(Labeler.parseJSON(json,axis,undefined,defaultSpacings[i]))}}};Axis.parseJSON=function(json,orientation,messageHandler,multigraph){var DataValue=require("../../core/data_value.js"),Point=require("../../math/point.js"),RGBColor=require("../../math/rgb_color.js"),Displacement=require("../../math/displacement.js"),AxisTitle=require("../../core/axis_title.js"),Grid=require("../../core/grid.js"),Pan=require("../../core/pan.js"),Zoom=require("../../core/zoom.js"),AxisBinding=require("../../core/axis_binding.js"),axis=new Axis(orientation),parseAttribute=pF.parseAttribute,parseDisplacement=Displacement.parse,parseJSONPoint=function(p){return new Point(p[0],p[1])},parseRGBColor=RGBColor.parse,attr,child,value;if(json){parseAttribute(json.id,axis.id);parseAttribute(json.type,axis.type,DataValue.parseType);parseAttribute(json.length,axis.length,parseDisplacement);(function(){var positionbase=json.positionbase;if(positionbase){messageHandler.warning('Use of deprecated axis attribute "positionbase"; use "base" attribute instead');if(positionbase==="left"||positionbase==="bottom"){axis.base(new Point(-1,-1))}else if(positionbase==="right"){axis.base(new Point(1,-1))}else if(positionbase==="top"){axis.base(new Point(-1,1))}}})();attr=json.position;if(attr!==undefined){if(vF.typeOf(attr)==="array"){axis.position(parseJSONPoint(attr))}else{if(vF.isNumberNotNaN(attr)){if(orientation===Axis.HORIZONTAL){axis.position(new Point(0,attr))}else{axis.position(new Point(attr,0))}}else{throw new Error("axis position '"+attr+"' is of the wrong type; it should be a number or a point")}}}if("min"in json){axis.min(uF.coerceToString(json.min))}if(axis.min()!=="auto"){axis.dataMin(DataValue.parse(axis.type(),axis.min()))}if("max"in json){axis.max(uF.coerceToString(json.max))}if(axis.max()!=="auto"){axis.dataMax(DataValue.parse(axis.type(),axis.max()))}parseAttribute(json.pregap,axis.pregap);parseAttribute(json.postgap,axis.postgap);parseAttribute(json.anchor,axis.anchor);parseAttribute(json.base,axis.base,parseJSONPoint);parseAttribute(json.minposition,axis.minposition,parseDisplacement);parseAttribute(json.maxposition,axis.maxposition,parseDisplacement);parseAttribute(json.minoffset,axis.minoffset);parseAttribute(json.maxoffset,axis.maxoffset);parseAttribute(json.color,axis.color,parseRGBColor);parseAttribute(json.tickcolor,axis.tickcolor,parseRGBColor);parseAttribute(json.tickwidth,axis.tickwidth);parseAttribute(json.tickmin,axis.tickmin);parseAttribute(json.tickmax,axis.tickmax);parseAttribute(json.highlightstyle,axis.highlightstyle);parseAttribute(json.linewidth,axis.linewidth);if("title"in json){if(typeof json.title==="boolean"){if(json.title){axis.title(new AxisTitle(axis))}else{axis.title(AxisTitle.parseJSON({},axis))}}else{axis.title(AxisTitle.parseJSON(json.title,axis))}}else{axis.title(new AxisTitle(axis))}if(json.grid){axis.grid(Grid.parseJSON(json.grid))}if(json.visible!==undefined){axis.visible(json.visible)}if("pan"in json){axis.pan(Pan.parseJSON(json.pan,axis.type()))}if("zoom"in json){axis.zoom(Zoom.parseJSON(json.zoom,axis.type()))}if(json.labels){parseLabels(json.labels,axis)}if(json.binding){var bindingMinDataValue=DataValue.parse(axis.type(),json.binding.min),bindingMaxDataValue=DataValue.parse(axis.type(),json.binding.max);if(typeof json.binding.id!=="string"){throw new Error("invalid axis binding id: '"+json.binding.id+"'")}if(!DataValue.isInstance(bindingMinDataValue)){throw new Error("invalid axis binding min: '"+json.binding.min+"'")}if(!DataValue.isInstance(bindingMaxDataValue)){throw new Error("invalid axis binding max: '"+json.binding.max+"'")}AxisBinding.findByIdOrCreateNew(json.binding.id).addAxis(axis,bindingMinDataValue,bindingMaxDataValue,multigraph)}}return axis};module.exports=Axis},{"../../core/axis.js":18,"../../core/axis_binding.js":19,"../../core/axis_title.js":20,"../../core/data_value.js":30,"../../core/grid.js":42,"../../core/labeler.js":45,"../../core/pan.js":52,"../../core/zoom.js":71,"../../math/displacement.js":101,"../../math/point.js":104,"../../math/rgb_color.js":105,"../../util/parsingFunctions.js":156,"../../util/utilityFunctions.js":157,"../../util/validationFunctions.js":158,"./axis_title.js":108,"./grid.js":116,"./labeler.js":120,"./pan.js":123,"./zoom.js":130}],108:[function(require,module,exports){var AxisTitle=require("../../core/axis_title.js");AxisTitle.parseJSON=function(json,axis){var title=new AxisTitle(axis),Text=require("../../core/text.js"),Point=require("../../math/point.js"),parseAttribute=require("../../util/parsingFunctions.js").parseAttribute,nonEmptyTitle=false,parseJSONPoint=function(p){return new Point(p[0],p[1])},text;if(json){text=json.text;if(text!==""&&text!==undefined){title.content(new Text(text));nonEmptyTitle=true}parseAttribute(json.anchor,title.anchor,parseJSONPoint);parseAttribute(json.base,title.base);parseAttribute(json.position,title.position,parseJSONPoint);parseAttribute(json.angle,title.angle);parseAttribute(json.font,title.font)}if(nonEmptyTitle===true){return title}return undefined};module.exports=AxisTitle},{"../../core/axis_title.js":20,"../../core/text.js":64,"../../math/point.js":104,"../../util/parsingFunctions.js":156}],109:[function(require,module,exports){var Background=require("../../core/background.js");Background.parseJSON=function(json,multigraph){var background=new Background,parseAttribute=require("../../util/parsingFunctions.js").parseAttribute,RGBColor=require("../../math/rgb_color.js"),Img=require("../../core/img.js"),child;if(json){parseAttribute(json.color,background.color,RGBColor.parse);if(json.img){background.img(Img.parseJSON(json.img,multigraph))}}return background};module.exports=Background},{"../../core/background.js":21,"../../core/img.js":44,"../../math/rgb_color.js":105,"../../util/parsingFunctions.js":156}],110:[function(require,module,exports){module.exports=function($){var Data=require("../../core/data.js");if(typeof Data.parseJSON==="function"){return Data}Data.parseJSON=function(json,multigraph,messageHandler){var ArrayData=require("../../core/array_data.js"),DataVariable=require("../../core/data_variable.js"),DataMeasure=require("../../core/data_measure.js"),PeriodicArrayData=require("../../core/periodic_array_data.js"),CSVData=require("../../core/csv_data.js")($),WebServiceData=require("../../core/web_service_data.js")($),Multigraph=require("../../core/multigraph.js")($),pF=require("../../util/parsingFunctions.js"),vF=require("../../util/validationFunctions.js"),uF=require("../../util/utilityFunctions.js"),defaultMissingvalueString,defaultMissingopString,dataVariables=[],data,adap,adapter=ArrayData;require("./data_variable.js");if(json){adap=json.adapter;if(adap!==undefined&&adap!==""){adapter=Multigraph.getDataAdapter(adap);if(adapter===undefined){throw new Error("Missing data adapater: "+adap)}}if(json.missingvalue){defaultMissingvalueString=uF.coerceToString(json.missingvalue)}defaultMissingopString=json.missingop;if(json.variables){json.variables.forEach(function(variable){dataVariables.push(DataVariable.parseJSON(variable))})}var haveRepeat=false,period;if("repeat"in json){var periodProp=vF.typeOf(json.repeat)==="object"?json.repeat.period:json.repeat;if(periodProp===undefined||periodProp===""){messageHandler.warning("repeat requires a period; data treated as non-repeating")}else{period=DataMeasure.parse(dataVariables[0].type(),periodProp);haveRepeat=true}}if(json.values){var stringValues=json.values;if(haveRepeat){data=new PeriodicArrayData(dataVariables,stringValues,period)}else{data=new ArrayData(dataVariables,stringValues)}}if(json.csv){var filename=vF.typeOf(json.csv)==="object"?json.csv.location:json.csv;data=new CSVData(dataVariables,multigraph?multigraph.rebaseUrl(filename):filename,messageHandler,multigraph?multigraph.getAjaxThrottle(filename):undefined)}if(json.service){var location=vF.typeOf(json.service)==="object"?json.service.location:json.service;data=new WebServiceData(dataVariables,multigraph?multigraph.rebaseUrl(location):location,messageHandler,multigraph?multigraph.getAjaxThrottle(location):undefined);if(vF.typeOf(json.service)==="object"&&"format"in json.service){data.format(json.service.format)}}if("id"in json){data.id(json.id)}}if(data){if(defaultMissingvalueString!==undefined){data.defaultMissingvalue(defaultMissingvalueString)}if(defaultMissingopString!==undefined){data.defaultMissingop(defaultMissingopString)}data.adapter(adapter)}return data};return Data}},{"../../core/array_data.js":17,"../../core/csv_data.js":25,"../../core/data.js":26,"../../core/data_measure.js":28,"../../core/data_variable.js":31,"../../core/multigraph.js":48,"../../core/periodic_array_data.js":53,"../../core/web_service_data.js":67,"../../util/parsingFunctions.js":156,"../../util/utilityFunctions.js":157,"../../util/validationFunctions.js":158,"./data_variable.js":111}],111:[function(require,module,exports){var DataVariable=require("../../core/data_variable.js");DataVariable.parseJSON=function(json,data){var variable,pF=require("../../util/parsingFunctions.js"),parseAttribute=pF.parseAttribute,DataValue=require("../../core/data_value.js"),attr;if(json&&json.id){variable=new DataVariable(json.id);parseAttribute(json.column,variable.column);parseAttribute(json.type,variable.type,DataValue.parseType);parseAttribute(json.missingvalue,variable.missingvalue,function(v){return DataValue.parse(variable.type(),v)});parseAttribute(json.missingop,variable.missingop,DataValue.parseComparator)}return variable};module.exports=DataVariable},{"../../core/data_value.js":30,"../../core/data_variable.js":31,"../../util/parsingFunctions.js":156}],112:[function(require,module,exports){var Datatips=require("../../core/datatips.js");Datatips.parseJSON=function(json){var datatips=new Datatips,RGBColor=require("../../math/rgb_color.js"),DatatipsVariable=require("../../core/datatips_variable.js"),pF=require("../../util/parsingFunctions.js"),uF=require("../../util/utilityFunctions.js"),parseRGBColor=RGBColor.parse,parseAttribute=pF.parseAttribute,parseInteger=pF.parseInteger,child;if(json){if(json["variable-formats"]){json["variable-formats"].forEach(function(fmt){var dtv=new DatatipsVariable;dtv.formatString(fmt);datatips.variables().add(dtv)})}parseAttribute(json.format,datatips.formatString);parseAttribute(json.bgcolor,datatips.bgcolor,parseRGBColor);parseAttribute(json.bgalpha,datatips.bgalpha);parseAttribute(json.border,datatips.border);parseAttribute(json.bordercolor,datatips.bordercolor,parseRGBColor);parseAttribute(json.pad,datatips.pad)}return datatips};module.exports=Datatips},{"../../core/datatips.js":32,"../../core/datatips_variable.js":33,"../../math/rgb_color.js":105,"../../util/parsingFunctions.js":156,"../../util/utilityFunctions.js":157}],113:[function(require,module,exports){var Filter=require("../../core/filter.js");Filter.parseJSON=function(json){var filter=new Filter,FilterOption=require("../../core/filter_option.js"),pF=require("../../util/parsingFunctions.js"),uF=require("../../util/utilityFunctions.js"),o;require("./filter_option.js");if(json){if(json.options){for(opt in json.options){if(json.options.hasOwnProperty(opt)){o=new FilterOption;o.name(opt);o.value(uF.coerceToString(json.options[opt]));filter.options().add(o)}}}pF.parseAttribute(json.type,filter.type);return filter}return Filter};module.exports=Filter},{"../../core/filter.js":39,"../../core/filter_option.js":40,"../../util/parsingFunctions.js":156,"../../util/utilityFunctions.js":157,"./filter_option.js":114}],114:[function(require,module,exports){var FilterOption=require("../../core/filter_option.js");FilterOption.parseJSON=function(json){var pF=require("../../util/parsingFunctions.js"),uF=require("../../util/utilityFunctions.js"),option=new FilterOption;if(json){option.name(json.name);if("value"in json&&json.value!==""){option.value(uF.coerceToString(json.value))}}return option};module.exports=FilterOption},{"../../core/filter_option.js":40,"../../util/parsingFunctions.js":156,"../../util/utilityFunctions.js":157}],115:[function(require,module,exports){module.exports=function($){var Graph=require("../../core/graph.js"),pF=require("../../util/parsingFunctions.js");if(typeof Graph.parseJSON==="function"){return Graph}Graph.parseJSON=function(json,multigraph,messageHandler){var graph=new Graph,Axis=require("../../core/axis.js"),Window=require("../../core/window.js"),Legend=require("../../core/legend.js"),Background=require("../../core/background.js"),Plotarea=require("../../core/plotarea.js"),ConsecutiveDistanceFilter=require("../../core/consecutive_distance_filter.js"),Title=require("../../core/title.js"),Data=require("../../core/data.js"),Plot=require("../../core/plot.js"),uF=require("../../util/utilityFunctions.js"),vF=require("../../util/validationFunctions.js"),defaults=uF.getDefaultValuesFromXSD(),child;require("./window.js");require("./legend.js");require("./background.js");require("./plotarea.js");require("./title.js");require("./axis.js");require("./data.js")($);require("./plot.js");graph.multigraph(multigraph);if(json){if(json.window){graph.window(Window.parseJSON(json.window))}if("legend"in json){graph.legend(Legend.parseJSON(json.legend))}else{graph.legend(Legend.parseJSON())}if(json.background){graph.background(Background.parseJSON(json.background,graph.multigraph()))}if(json.plotarea){graph.plotarea(Plotarea.parseJSON(json.plotarea))}if(json.title){graph.title(Title.parseJSON(json.title,graph))}if("filter"in json){if(vF.typeOf(json.filter)==="object"){if(typeof json.filter.type!=="undefined"&&json.filter.type!=="consecutivedistance"){throw new Error("unknown filter type: "+json.filter.type)}graph.filter(new ConsecutiveDistanceFilter(json.filter))}else{if(vF.typeOf(json.filter)!=="boolean"){throw new Error("invalid filter property: "+json.filter)}else if(json.filter){graph.filter(new ConsecutiveDistanceFilter({}))}}}var haxes=json.horizontalaxis?json.horizontalaxis:json.horizontalaxes;if(json.horizontalaxis&&json.horizontalaxes){throw new Error("graph may not have both 'horizontalaxis' and 'horizontalaxes'")}if(haxes){if(vF.typeOf(haxes)==="array"){haxes.forEach(function(axis){graph.axes().add(Axis.parseJSON(axis,Axis.HORIZONTAL,messageHandler,graph.multigraph()))})}else{graph.axes().add(Axis.parseJSON(haxes,Axis.HORIZONTAL,messageHandler,graph.multigraph()))}}var vaxes=json.verticalaxis?json.verticalaxis:json.verticalaxes;if(json.verticalaxis&&json.verticalaxes){throw new Error("graph may not have both 'verticalaxis' and 'verticalaxes'")}if(vaxes){if(vF.typeOf(vaxes)==="array"){vaxes.forEach(function(axis){graph.axes().add(Axis.parseJSON(axis,Axis.VERTICAL,messageHandler,graph.multigraph()))})}else{graph.axes().add(Axis.parseJSON(vaxes,Axis.VERTICAL,messageHandler,graph.multigraph()))}}function addAjaxThrottle(t){var pattern=t.pattern?t.pattern:defaults.throttle.pattern,requests=t.requests?t.requests:defaults.throttle.requests,period=t.period?t.period:defaults.throttle.period,concurrent=t.concurrent?t.concurrent:defaults.throttle.concurrent;multigraph.addAjaxThrottle(pattern,requests,period,concurrent)}var throttles=json.throttle?json.throttle:json.throttles;if(json.throttle&&json.throttles){throw new Error("graph may not have both 'throttle' and 'throttles'")}if(throttles){if(vF.typeOf(throttles)==="array"){throttles.forEach(addAjaxThrottle)}else{addAjaxThrottle(throttles)}}if(json.data){if(vF.typeOf(json.data)==="array"){json.data.forEach(function(data){graph.data().add(Data.parseJSON(data,graph.multigraph(),messageHandler))})}else{graph.data().add(Data.parseJSON(json.data,graph.multigraph(),messageHandler))}}var plots=json.plot?json.plot:json.plots;if(json.plot&&json.plots){throw new Error("graph may not have both 'plot' and 'plots'")}if(plots){if(vF.typeOf(plots)==="array"){plots.forEach(function(plot){graph.plots().add(Plot.parseJSON(plot,graph,messageHandler))})}else{graph.plots().add(Plot.parseJSON(plots,graph,messageHandler))}}graph.postParse()}return graph};return Graph}},{"../../core/axis.js":18,"../../core/background.js":21,"../../core/consecutive_distance_filter.js":23,"../../core/data.js":26,"../../core/graph.js":41,"../../core/legend.js":46,"../../core/plot.js":54,"../../core/plotarea.js":56,"../../core/title.js":65,"../../core/window.js":70,"../../util/parsingFunctions.js":156,"../../util/utilityFunctions.js":157,"../../util/validationFunctions.js":158,"./axis.js":107,"./background.js":109,"./data.js":110,"./legend.js":121,"./plot.js":124,"./plotarea.js":126,"./title.js":128,"./window.js":129}],116:[function(require,module,exports){var Grid=require("../../core/grid.js");Grid.parseJSON=function(json){var grid=new Grid,RGBColor=require("../../math/rgb_color.js"),parseAttribute=require("../../util/parsingFunctions.js").parseAttribute,attr;if(json){parseAttribute(json.color,grid.color,RGBColor.parse);attr=json.visible;if(attr!==undefined){grid.visible(attr)}else{grid.visible(true)}}return grid};module.exports=Grid},{"../../core/grid.js":42,"../../math/rgb_color.js":105,"../../util/parsingFunctions.js":156}],117:[function(require,module,exports){var Icon=require("../../core/icon.js");Icon.parseJSON=function(json){var icon=new Icon,parseAttribute=require("../../util/parsingFunctions.js").parseAttribute;if(json){parseAttribute(json.height,icon.height);parseAttribute(json.width,icon.width);parseAttribute(json.border,icon.border)}return icon};module.exports=Icon},{"../../core/icon.js":43,"../../util/parsingFunctions.js":156}],118:[function(require,module,exports){var Img=require("../../core/img.js");Img.parseJSON=function(json,multigraph){var img,parseAttribute=require("../../util/parsingFunctions.js").parseAttribute,Point=require("../../math/point.js"),parseJSONPoint=function(p){return new Point(p[0],p[1])};if(json&&json.src!==undefined){var src=json.src;if(!src){throw new Error('img requires a "src" property')}if(multigraph){src=multigraph.rebaseUrl(src)}img=new Img(src);parseAttribute(json.anchor,img.anchor,parseJSONPoint);parseAttribute(json.base,img.base,parseJSONPoint);parseAttribute(json.position,img.position,parseJSONPoint);parseAttribute(json.frame,img.frame,function(value){return value.toLowerCase()})}return img};module.exports=Img},{"../../core/img.js":44,"../../math/point.js":104,"../../util/parsingFunctions.js":156}],119:[function(require,module,exports){var included=false;module.exports=function($){if(included){return}included=true;require("./data.js")($);require("./graph.js")($);require("./multigraph.js")($);require("./axis.js");require("./axis_title.js");require("./background.js");require("./datatips.js");require("./data_variable.js");require("./filter.js");require("./filter_option.js");require("./grid.js");require("./icon.js");require("./img.js");require("./json_parser.js");require("./labeler.js");require("./legend.js");require("./pan.js");require("./plotarea.js");require("./plot.js");require("./plot_legend.js");require("./renderer.js");require("./title.js");require("./window.js");require("./zoom.js")}},{"./axis.js":107,"./axis_title.js":108,"./background.js":109,"./data.js":110,"./data_variable.js":111,"./datatips.js":112,"./filter.js":113,"./filter_option.js":114,"./graph.js":115,"./grid.js":116,"./icon.js":117,"./img.js":118,"./json_parser.js":119,"./labeler.js":120,"./legend.js":121,"./multigraph.js":122,"./pan.js":123,"./plot.js":124,"./plot_legend.js":125,"./plotarea.js":126,"./renderer.js":127,"./title.js":128,"./window.js":129,"./zoom.js":130}],120:[function(require,module,exports){var Labeler=require("../../core/labeler.js");Labeler.parseJSON=function(json,axis,defaults,spacing){var labeler,Point=require("../../math/point.js"),RGBColor=require("../../math/rgb_color.js"),DataMeasure=require("../../core/data_measure.js"),DataValue=require("../../core/data_value.js"),DataFormatter=require("../../core/data_formatter.js"),CategoryFormatter=require("../../core/category_formatter.js"),pF=require("../../util/parsingFunctions.js"),vF=require("../../util/validationFunctions.js"),parseJSONPoint=function(p){return new Point(p[0],p[1])};var parseLabelerAttribute=function(value,attribute,preprocessor,defaultName){if(!pF.parseAttribute(value,attribute,preprocessor)&&defaults!==undefined){attribute(defaults[defaultName]())}};var parseDataFormatter=function(type){return function(value){return DataFormatter.create(type,value)}};var parseDataValue=function(type){return function(value){return DataValue.parse(type,value)}};if(json){labeler=new Labeler(axis);if(spacing!==null){if(spacing===undefined){spacing=json.spacing}parseLabelerAttribute(spacing,labeler.spacing,function(v){return DataMeasure.parse(axis.type(),v)},"spacing")}if(vF.typeOf(json.format)==="array"){parseLabelerAttribute(json.format,labeler.formatter,function(format){return new CategoryFormatter(json.format)},undefined)}else{parseLabelerAttribute(json.format,labeler.formatter,parseDataFormatter(axis.type()),"formatter")}parseLabelerAttribute(json.start,labeler.start,parseDataValue(axis.type()),"start");parseLabelerAttribute(json.angle,labeler.angle,undefined,"angle");parseLabelerAttribute(json.position,labeler.position,parseJSONPoint,"position");parseLabelerAttribute(json.anchor,labeler.anchor,parseJSONPoint,"anchor");parseLabelerAttribute(json.densityfactor,labeler.densityfactor,undefined,"densityfactor");parseLabelerAttribute(json.color,labeler.color,RGBColor.parse,"color");parseLabelerAttribute(json.font,labeler.font,undefined,"font");parseLabelerAttribute(json.visible,labeler.visible,pF.parseBoolean,"visible")}return labeler};module.exports=Labeler},{"../../core/category_formatter.js":22,"../../core/data_formatter.js":27,"../../core/data_measure.js":28,"../../core/data_value.js":30,"../../core/labeler.js":45,"../../math/point.js":104,"../../math/rgb_color.js":105,"../../util/parsingFunctions.js":156,"../../util/validationFunctions.js":158}],121:[function(require,module,exports){var Legend=require("../../core/legend.js");Legend.parseJSON=function(json){var legend=new Legend,pF=require("../../util/parsingFunctions.js"),Point=require("../../math/point.js"),RGBColor=require("../../math/rgb_color.js"),Point=require("../../math/point.js"),Icon=require("../../core/icon.js"),parseAttribute=pF.parseAttribute,parseJSONPoint=function(p){return new Point(p[0],p[1])};require("./icon.js");if(typeof json==="boolean"){parseAttribute(json,legend.visible)}else if(json){parseAttribute(json.visible,legend.visible,pF.parseBoolean);parseAttribute(json.base,legend.base,parseJSONPoint);parseAttribute(json.anchor,legend.anchor,parseJSONPoint);parseAttribute(json.position,legend.position,parseJSONPoint);parseAttribute(json.frame,legend.frame);parseAttribute(json.color,legend.color,RGBColor.parse);parseAttribute(json.bordercolor,legend.bordercolor,RGBColor.parse);parseAttribute(json.opacity,legend.opacity);parseAttribute(json.border,legend.border);parseAttribute(json.rows,legend.rows);parseAttribute(json.columns,legend.columns);parseAttribute(json.cornerradius,legend.cornerradius);parseAttribute(json.padding,legend.padding);if(json.icon){legend.icon(Icon.parseJSON(json.icon))}}return legend};module.exports=Legend},{"../../core/icon.js":43,"../../core/legend.js":46,"../../math/point.js":104,"../../math/rgb_color.js":105,"../../util/parsingFunctions.js":156,"./icon.js":117}],122:[function(require,module,exports){module.exports=function($){var Multigraph=require("../../core/multigraph.js")($);if(typeof Multigraph.parseJSON==="function"){return Multigraph}Multigraph.parseJSON=function(json,mugl,messageHandler){var multigraph=new Multigraph,graphs=multigraph.graphs(),Graph=require("../../core/graph.js"),vF=require("../../util/validationFunctions.js");require("./graph.js")($);multigraph.mugl(mugl);if(json){if(vF.typeOf(json)==="array"){json.forEach(function(graph){graphs.add(Graph.parseJSON(graph,multigraph,messageHandler))})}else{graphs.add(Graph.parseJSON(json,multigraph,messageHandler))}}return multigraph};return Multigraph}},{"../../core/graph.js":41,"../../core/multigraph.js":48,"../../util/validationFunctions.js":158,"./graph.js":115}],123:[function(require,module,exports){var Pan=require("../../core/pan.js");Pan.parseJSON=function(json,type){var pan=new Pan,pF=require("../../util/parsingFunctions.js"),vF=require("../../util/validationFunctions.js"),parseAttribute=pF.parseAttribute,parseBoolean=pF.parseBoolean,DataValue=require("../../core/data_value.js"),parseDataValue=function(v){return DataValue.parse(type,v)};if(vF.typeOf(json)==="boolean"){parseAttribute(json,pan.allowed,parseBoolean)}else if(json){parseAttribute(json.allowed,pan.allowed,parseBoolean);parseAttribute(json.min,pan.min,parseDataValue);parseAttribute(json.max,pan.max,parseDataValue)}return pan};module.exports=Pan},{"../../core/data_value.js":30,"../../core/pan.js":52,"../../util/parsingFunctions.js":156,"../../util/validationFunctions.js":158}],124:[function(require,module,exports){var Plot=require("../../core/plot.js");Plot.parseJSON=function(json,graph,messageHandler){var DataPlot=require("../../core/data_plot.js"),PlotLegend=require("../../core/plot_legend.js"),ConstantPlot=require("../../core/constant_plot.js"),DataValue=require("../../core/data_value.js"),DateTimeValue=require("../../core/datetime_value.js"),Renderer=require("../../core/renderer.js"),Filter=require("../../core/filter.js"),ConsecutiveDistanceFilter=require("../../core/consecutive_distance_filter.js"),Datatips=require("../../core/datatips.js"),pF=require("../../util/parsingFunctions.js"),vF=require("../../util/validationFunctions.js"),plot,haxis,vaxis,variable,attr;
require("./plot_legend.js");require("./renderer.js");require("./filter.js");require("./datatips.js");function key(obj){return Object.keys(obj)[0]}function keyCount(obj){return Object.keys(obj).length}function looks_like_data_value(v){if(vF.typeOf(v)==="number"){return true}else if(vF.typeOf(v)==="string"){if(!isNaN(v)){return true}else{try{DatetimeValue.parse(v)}catch(e){return false}return true}}else{return false}}if(json){var vars={horizontal:[],vertical:[]};var axisid={horizontal:undefined,vertical:undefined};var constant_value=undefined;if(json.verticalaxis){if(vF.typeOf(json.verticalaxis)==="array"){vars.vertical=json.verticalaxis}else if(vF.typeOf(json.verticalaxis)==="number"){constant_value=DataValue.parse(DataValue.NUMBER,json.verticalaxis)}else if(vF.typeOf(json.verticalaxis)==="string"){if(looks_like_data_value(json.verticalaxis)){constant_value=DataValue.parse(DataValue.DATETIME,json.verticalaxis)}else{axisid.vertical=json.verticalaxis;vaxis=graph.axisById(axisid.vertical);if(typeof vaxis==="undefined"){throw new Error("plot refers to unknown vertical axis id: "+axisid.vertical)}}}else if(vF.typeOf(json.verticalaxis)==="object"){if(keyCount(json.verticalaxis)!==1){throw new Error("plot.verticalaxis object must contain exactly one key/value pair")}axisid.vertical=key(json.verticalaxis);vaxis=graph.axisById(axisid.vertical);if(typeof vaxis==="undefined"){throw new Error("plot refers to unknown vertical axis id: "+axisid.vertical)}if(vF.typeOf(json.verticalaxis[axisid.vertical])!=="undefined"){if(vF.typeOf(json.verticalaxis[axisid.vertical])==="array"){vars.vertical=json.verticalaxis[axisid.vertical]}else{if(vF.typeOf(json.verticalaxis[axisid.vertical])==="number"){if(vaxis.type()!==DataValue.NUMBER){throw new Error("constant value of '"+json.verticalaxis[axisid.vertical]+"' not appropriate for axis of type '"+vaxis.type()+"'")}constant_value=DataValue.parse(DataValue.NUMBER,json.verticalaxis[axisid.vertical])}else{if(vF.typeOf(json.verticalaxis[axisid.vertical])!=="string"){throw new Error("value for key '"+axisid.vertical+"' for verticalaxis is of wrong type")}if(looks_like_data_value(json.verticalaxis[axisid.vertical])){constant_value=DataValue.parse(vaxis.type(),json.verticalaxis[axisid.vertical])}else{vars.vertical=[json.verticalaxis[axisid.vertical]]}}}}}}if(constant_value!==undefined){plot=new ConstantPlot(constant_value)}else{plot=new DataPlot}plot.verticalaxis(vaxis);if(json.horizontalaxis){if(vF.typeOf(json.horizontalaxis)==="array"){vars.horizontal=json.horizontalaxis}else if(vF.typeOf(json.horizontalaxis)==="string"){axisid.horizontal=json.horizontalaxis;haxis=graph.axisById(axisid.horizontal);if(haxis!==undefined){plot.horizontalaxis(haxis)}else{throw new Error("Plot Horizontal Axis Error: The graph does not contain an axis with an id of '"+axisid.horizontal+"'")}}else if(vF.typeOf(json.horizontalaxis)==="object"){if(keyCount(json.horizontalaxis)!==1){throw new Error("plot.horizontalaxis object must contain exactly one key/value pair")}axisid.horizontal=key(json.horizontalaxis);haxis=graph.axisById(axisid.horizontal);if(haxis!==undefined){plot.horizontalaxis(haxis)}else{throw new Error("Plot Horizontal Axis Error: The graph does not contain an axis with an id of '"+axisid.horizontal+"'")}if(vF.typeOf(json.horizontalaxis[axisid.horizontal])!=="undefined"){if(vF.typeOf(json.horizontalaxis[axisid.horizontal])==="array"){vars.horizontal=json.horizontalaxis[axisid.horizontal]}else{if(vF.typeOf(json.horizontalaxis[axisid.horizontal])!=="string"){throw new Error("value for key '"+axisid.horizontal+"' for horizontalaxis is of wrong type")}vars.horizontal=[json.horizontalaxis[axisid.horizontal]]}}}}if(plot instanceof DataPlot){if(vars.horizontal.length==0){plot.variable().add(null)}if(graph){var allvars=[].concat(vars.horizontal,vars.vertical);allvars.forEach(function(vid){variable=graph.variableById(vid);if(variable!==undefined){plot.data(variable.data());plot.variable().add(variable)}else{throw new Error("Plot Variable Error: No Data tag contains a variable with an id of '"+vid+"'")}})}}if("legend"in json){plot.legend(PlotLegend.parseJSON(json.legend,plot))}else{plot.legend(PlotLegend.parseJSON(undefined,plot))}if("renderer"in json&&("style"in json||"options"in json)){throw new Error("plot may not contain both 'renderer' and 'style', or 'renderer' and 'options'")}if(json.visible!==undefined){plot.visible(json.visible)}if("renderer"in json){plot.renderer(Renderer.parseJSON(json.renderer,plot,messageHandler))}else if("style"in json){plot.renderer(Renderer.parseJSON({type:json.style,options:json.options},plot,messageHandler))}else if("options"in json){plot.renderer(Renderer.parseJSON({type:"line",options:json.options},plot,messageHandler))}if("filter"in json){if(vF.typeOf(json.filter)==="object"){if(typeof json.filter.type!=="undefined"&&json.filter.type!=="consecutivedistance"){throw new Error("unknown filter type: "+json.filter.type)}plot.renderer().filter(new ConsecutiveDistanceFilter(json.filter))}else if(vF.typeOf(json.filter)==="boolean"){if(json.filter){if(graph&&graph.filter()){plot.renderer().filter(graph.filter())}else{plot.renderer().filter(new ConsecutiveDistanceFilter({}))}}}else{throw new Error("invalid filter property: "+json.filter)}}else if(graph&&graph.filter()){plot.renderer().filter(graph.filter())}if("datatips"in json){plot.datatips(Datatips.parseJSON(json.datatips))}}return plot};module.exports=Plot},{"../../core/consecutive_distance_filter.js":23,"../../core/constant_plot.js":24,"../../core/data_plot.js":29,"../../core/data_value.js":30,"../../core/datatips.js":32,"../../core/datetime_value.js":37,"../../core/filter.js":39,"../../core/plot.js":54,"../../core/plot_legend.js":55,"../../core/renderer.js":57,"../../util/parsingFunctions.js":156,"../../util/validationFunctions.js":158,"./datatips.js":112,"./filter.js":113,"./plot_legend.js":125,"./renderer.js":127}],125:[function(require,module,exports){var PlotLegend=require("../../core/plot_legend.js");PlotLegend.parseJSON=function(json,plot){var legend=new PlotLegend,pF=require("../../util/parsingFunctions.js"),Text=require("../../core/text.js"),parseAttribute=pF.parseAttribute,child;if(typeof json==="boolean"){legend.visible(json)}else{if(json){parseAttribute(json.visible,legend.visible,pF.parseBoolean);parseAttribute(json.label,legend.label,function(value){return new Text(value)})}}if(legend.label()===undefined){if(typeof plot.variable==="function"&&plot.variable().size()>=2){legend.label(new Text(plot.variable().at(1).id()))}else{legend.label(new Text("plot"))}}return legend};module.exports=PlotLegend},{"../../core/plot_legend.js":55,"../../core/text.js":64,"../../util/parsingFunctions.js":156}],126:[function(require,module,exports){var Plotarea=require("../../core/plotarea.js");Plotarea.parseJSON=function(json){var plotarea=new Plotarea,margin=plotarea.margin(),pF=require("../../util/parsingFunctions.js"),RGBColor=require("../../math/rgb_color.js"),parseRGBColor=RGBColor.parse,parseAttribute=pF.parseAttribute,parseInteger=pF.parseInteger;if(json){parseAttribute(json.marginbottom,margin.bottom);parseAttribute(json.marginleft,margin.left);parseAttribute(json.margintop,margin.top);parseAttribute(json.marginright,margin.right);parseAttribute(json.border,plotarea.border);parseAttribute(json.color,plotarea.color,parseRGBColor);parseAttribute(json.bordercolor,plotarea.bordercolor,parseRGBColor)}return plotarea};module.exports=Plotarea},{"../../core/plotarea.js":56,"../../math/rgb_color.js":105,"../../util/parsingFunctions.js":156}],127:[function(require,module,exports){var Renderer=require("../../core/renderer.js");Renderer.parseJSON=function(json,plot,messageHandler){var DataValue=require("../../core/data_value.js"),NumberValue=require("../../core/number_value.js"),Warning=require("../../core/warning.js"),pF=require("../../util/parsingFunctions.js"),vF=require("../../util/validationFunctions.js"),rendererType,renderer,opt;require("../../core/renderers/all_renderers.js");function setOption(name,value,min,max){try{renderer.setOptionFromString(name,value,min,max)}catch(e){if(e instanceof Warning){messageHandler.warning(e)}else{throw e}}}if(json&&json.type!==undefined){rendererType=Renderer.Type.parse(json.type);if(!Renderer.Type.isInstance(rendererType)){throw new Error("unknown renderer type '"+json.type+"'")}renderer=Renderer.create(rendererType);renderer.plot(plot);if(json.options){for(opt in json.options){if(json.options.hasOwnProperty(opt)){if(vF.typeOf(json.options[opt])==="array"){json.options[opt].forEach(function(subopt){setOption(opt,subopt.value,subopt.min,subopt.max)})}else{setOption(opt,json.options[opt])}}}}}return renderer};module.exports=Renderer},{"../../core/data_value.js":30,"../../core/number_value.js":51,"../../core/renderer.js":57,"../../core/renderers/all_renderers.js":58,"../../core/warning.js":66,"../../util/parsingFunctions.js":156,"../../util/validationFunctions.js":158}],128:[function(require,module,exports){var Title=require("../../core/title.js");Title.parseJSON=function(json,graph){var Point=require("../../math/point.js"),RGBColor=require("../../math/rgb_color.js"),Text=require("../../core/text.js"),pF=require("../../util/parsingFunctions.js"),parseJSONPoint=function(p){return new Point(p[0],p[1])},parseRGBColor=RGBColor.parse,parseAttribute=pF.parseAttribute,title;if(json){var text=json.text;if(text!==""){title=new Title(new Text(text),graph)}else{return undefined}parseAttribute(json.frame,title.frame,function(value){return value.toLowerCase()});parseAttribute(json.border,title.border);parseAttribute(json.color,title.color,parseRGBColor);parseAttribute(json.bordercolor,title.bordercolor,parseRGBColor);parseAttribute(json.opacity,title.opacity);parseAttribute(json.padding,title.padding);parseAttribute(json.cornerradius,title.cornerradius);parseAttribute(json.anchor,title.anchor,parseJSONPoint);parseAttribute(json.base,title.base,parseJSONPoint);parseAttribute(json.position,title.position,parseJSONPoint)}return title};module.exports=Title},{"../../core/text.js":64,"../../core/title.js":65,"../../math/point.js":104,"../../math/rgb_color.js":105,"../../util/parsingFunctions.js":156}],129:[function(require,module,exports){var Window=require("../../core/window.js");Window.parseJSON=function(json){var w=new Window,RGBColor=require("../../math/rgb_color.js"),pF=require("../../util/parsingFunctions.js"),parseAttribute=pF.parseAttribute,parseInteger=pF.parseInteger,attr;if(json){parseAttribute(json.width,w.width);parseAttribute(json.height,w.height);parseAttribute(json.border,w.border);attr=json.margin;if(attr!==undefined){w.margin().set(attr,attr,attr,attr)}attr=json.padding;if(attr!==undefined){w.padding().set(attr,attr,attr,attr)}parseAttribute(json.bordercolor,w.bordercolor,RGBColor.parse)}return w};module.exports=Window},{"../../core/window.js":70,"../../math/rgb_color.js":105,"../../util/parsingFunctions.js":156}],130:[function(require,module,exports){var Zoom=require("../../core/zoom.js");Zoom.parseJSON=function(json,type){var zoom=new Zoom,DataValue=require("../../core/data_value.js"),DataMeasure=require("../../core/data_measure.js"),pF=require("../../util/parsingFunctions.js"),vF=require("../../util/validationFunctions.js"),parseAttribute=pF.parseAttribute,parseBoolean=pF.parseBoolean,parseDataMeasure=function(v){return DataMeasure.parse(type,v)},attr;if(vF.typeOf(json)==="boolean"){parseAttribute(json,zoom.allowed,parseBoolean)}else if(json){parseAttribute(json.allowed,zoom.allowed,parseBoolean);parseAttribute(json.min,zoom.min,parseDataMeasure);parseAttribute(json.max,zoom.max,parseDataMeasure);attr=json.anchor;if(attr!==undefined){if(typeof attr==="string"&&attr.toLowerCase()==="none"){zoom.anchor(null)}else{zoom.anchor(DataValue.parse(type,attr))}}}return zoom};module.exports=Zoom},{"../../core/data_measure.js":28,"../../core/data_value.js":30,"../../core/zoom.js":71,"../../util/parsingFunctions.js":156,"../../util/validationFunctions.js":158}],131:[function(require,module,exports){module.exports=function($){var Axis=require("../../core/axis.js"),pF=require("../../util/parsingFunctions.js");if(typeof Axis.parseXML==="function"){return Axis}var parseLabels=function(xml,axis){var spacingStrings=[],spacingString,labelsTag=xml.find("labels"),labelTags=xml.find("label"),labelers=axis.labelers(),Labeler=require("../../core/labeler.js"),DataValue=require("../../core/data_value.js"),utilityFunctions=require("../../util/utilityFunctions.js"),i;spacingString=$.trim(pF.getXMLAttr(labelsTag,"spacing"));if(spacingString!==""){spacingStrings=spacingString.split(/\s+/)}if(spacingStrings.length>0){for(i=0;i<spacingStrings.length;++i){labelers.add(Labeler.parseXML(labelsTag,axis,undefined,spacingStrings[i]))}}else if(labelTags.length>0){var defaults=Labeler.parseXML(labelsTag,axis,undefined,null);$.each(labelTags,function(j,e){spacingString=$.trim(pF.getXMLAttr($(e),"spacing"));spacingStrings=[];if(spacingString!==""){spacingStrings=spacingString.split(/\s+/)}for(i=0;i<spacingStrings.length;++i){labelers.add(Labeler.parseXML($(e),axis,defaults,spacingStrings[i]))}})}else{var defaultValues=utilityFunctions.getDefaultValuesFromXSD().horizontalaxis.labels;var defaultSpacings=axis.type()===DataValue.NUMBER?defaultValues.defaultNumberSpacing:defaultValues.defaultDatetimeSpacing;for(i=0;i<defaultSpacings.length;++i){labelers.add(Labeler.parseXML(labelsTag,axis,undefined,defaultSpacings[i]))}}};Axis.parseXML=function(xml,orientation,messageHandler,multigraph){var DataValue=require("../../core/data_value.js"),Point=require("../../math/point.js"),RGBColor=require("../../math/rgb_color.js"),Displacement=require("../../math/displacement.js"),AxisTitle=require("../../core/axis_title.js"),Grid=require("../../core/grid.js"),Pan=require("../../core/pan.js"),Zoom=require("../../core/zoom.js"),AxisBinding=require("../../core/axis_binding.js"),axis=new Axis(orientation),parseAttribute=pF.parseAttribute,parseInteger=pF.parseInteger,parseDisplacement=Displacement.parse,parsePoint=Point.parse,parseRGBColor=RGBColor.parse,attr,child,value;if(xml){parseAttribute(pF.getXMLAttr(xml,"id"),axis.id);parseAttribute(pF.getXMLAttr(xml,"type"),axis.type,DataValue.parseType);parseAttribute(pF.getXMLAttr(xml,"length"),axis.length,parseDisplacement);(function(){var positionbase=pF.getXMLAttr(xml,"positionbase");if(positionbase){messageHandler.warning('Use of deprecated axis attribute "positionbase"; use "base" attribute instead');if(positionbase==="left"||positionbase==="bottom"){axis.base(parsePoint("-1 -1"))}else if(positionbase==="right"){axis.base(parsePoint("1 -1"))}else if(positionbase==="top"){axis.base(parsePoint("-1 1"))}}})();attr=pF.getXMLAttr(xml,"position");if(attr!==undefined){try{axis.position(parsePoint(attr))}catch(e){value=parseInt(attr,10);if(value!==value){throw e}if(orientation===Axis.HORIZONTAL){axis.position(new Point(0,value))}else{axis.position(new Point(value,0))}}}axis.min(pF.getXMLAttr(xml,"min"));if(axis.min()!=="auto"){axis.dataMin(DataValue.parse(axis.type(),axis.min()))}axis.max(pF.getXMLAttr(xml,"max"));if(axis.max()!=="auto"){axis.dataMax(DataValue.parse(axis.type(),axis.max()))}parseAttribute(pF.getXMLAttr(xml,"pregap"),axis.pregap,parseFloat);parseAttribute(pF.getXMLAttr(xml,"postgap"),axis.postgap,parseFloat);parseAttribute(pF.getXMLAttr(xml,"anchor"),axis.anchor,parseFloat);parseAttribute(pF.getXMLAttr(xml,"base"),axis.base,parsePoint);parseAttribute(pF.getXMLAttr(xml,"minposition"),axis.minposition,parseDisplacement);parseAttribute(pF.getXMLAttr(xml,"maxposition"),axis.maxposition,parseDisplacement);parseAttribute(pF.getXMLAttr(xml,"minoffset"),axis.minoffset,parseFloat);parseAttribute(pF.getXMLAttr(xml,"maxoffset"),axis.maxoffset,parseFloat);parseAttribute(pF.getXMLAttr(xml,"color"),axis.color,parseRGBColor);parseAttribute(pF.getXMLAttr(xml,"tickcolor"),axis.tickcolor,parseRGBColor);parseAttribute(pF.getXMLAttr(xml,"tickwidth"),axis.tickwidth,parseInteger);parseAttribute(pF.getXMLAttr(xml,"tickmin"),axis.tickmin,parseInteger);parseAttribute(pF.getXMLAttr(xml,"tickmax"),axis.tickmax,parseInteger);parseAttribute(pF.getXMLAttr(xml,"highlightstyle"),axis.highlightstyle);parseAttribute(pF.getXMLAttr(xml,"linewidth"),axis.linewidth,parseInteger);child=xml.find("title");if(child.length>0){axis.title(AxisTitle.parseXML(child,axis))}else{axis.title(new AxisTitle(axis))}child=xml.find("grid");if(child.length>0){axis.grid(Grid.parseXML(child))}child=xml.find("pan");if(child.length>0){axis.pan(Pan.parseXML(child,axis.type()))}child=xml.find("zoom");if(child.length>0){axis.zoom(Zoom.parseXML(child,axis.type()))}if(xml.find("labels").length>0){parseLabels(xml,axis)}child=xml.find("binding");if(child.length>0){var bindingIdAttr=pF.getXMLAttr(child,"id"),bindingMinAttr=pF.getXMLAttr(child,"min"),bindingMaxAttr=pF.getXMLAttr(child,"max"),bindingMinDataValue=DataValue.parse(axis.type(),bindingMinAttr),bindingMaxDataValue=DataValue.parse(axis.type(),bindingMaxAttr);if(typeof bindingIdAttr!=="string"||bindingIdAttr.length<=0){throw new Error("invalid axis binding id: '"+bindingIdAttr+"'")}if(!DataValue.isInstance(bindingMinDataValue)){throw new Error("invalid axis binding min: '"+bindingMinAttr+"'")}if(!DataValue.isInstance(bindingMaxDataValue)){throw new Error("invalid axis binding max: '"+bindingMaxAttr+"'")}AxisBinding.findByIdOrCreateNew(bindingIdAttr).addAxis(axis,bindingMinDataValue,bindingMaxDataValue,multigraph)}}return axis};return Axis}},{"../../core/axis.js":18,"../../core/axis_binding.js":19,"../../core/axis_title.js":20,"../../core/data_value.js":30,"../../core/grid.js":42,"../../core/labeler.js":45,"../../core/pan.js":52,"../../core/zoom.js":71,"../../math/displacement.js":101,"../../math/point.js":104,"../../math/rgb_color.js":105,"../../util/parsingFunctions.js":156,"../../util/utilityFunctions.js":157}],132:[function(require,module,exports){var AxisTitle=require("../../core/axis_title.js");AxisTitle.parseXML=function(xml,axis){var title=new AxisTitle(axis),Text=require("../../core/text.js"),Point=require("../../math/point.js"),pF=require("../../util/parsingFunctions.js"),nonEmptyTitle=false,parsePoint=Point.parse,text,parseTitleAttribute=function(value,attribute,preprocessor){if(pF.parseAttribute(value,attribute,preprocessor)){}};if(xml){text=xml.text();if(text!==""){title.content(new Text(text));nonEmptyTitle=true}parseTitleAttribute(pF.getXMLAttr(xml,"anchor"),title.anchor,parsePoint);parseTitleAttribute(pF.getXMLAttr(xml,"base"),title.base,parseFloat);parseTitleAttribute(pF.getXMLAttr(xml,"position"),title.position,parsePoint);parseTitleAttribute(pF.getXMLAttr(xml,"angle"),title.angle,parseFloat)}if(nonEmptyTitle===true){return title}return undefined};module.exports=AxisTitle},{"../../core/axis_title.js":20,"../../core/text.js":64,"../../math/point.js":104,"../../util/parsingFunctions.js":156}],133:[function(require,module,exports){var Background=require("../../core/background.js");Background.parseXML=function(xml,multigraph){var background=new Background,pF=require("../../util/parsingFunctions.js"),RGBColor=require("../../math/rgb_color.js"),Img=require("../../core/img.js"),child;if(xml){pF.parseAttribute(pF.getXMLAttr(xml,"color"),background.color,RGBColor.parse);child=xml.find("img");if(child.length>0){background.img(Img.parseXML(child,multigraph))}}return background};module.exports=Background},{"../../core/background.js":21,"../../core/img.js":44,"../../math/rgb_color.js":105,"../../util/parsingFunctions.js":156}],134:[function(require,module,exports){module.exports=function($){var Data=require("../../core/data.js");if(typeof Data.parseXML==="function"){return Data}Data.parseXML=function(xml,multigraph,messageHandler){var ArrayData=require("../../core/array_data.js"),DataVariable=require("../../core/data_variable.js"),DataMeasure=require("../../core/data_measure.js"),PeriodicArrayData=require("../../core/periodic_array_data.js"),CSVData=require("../../core/csv_data.js")($),WebServiceData=require("../../core/web_service_data.js")($),Multigraph=require("../../core/multigraph.js")($),pF=require("../../util/parsingFunctions.js"),variables_xml,defaultMissingvalueString,defaultMissingopString,dataVariables=[],data,adap,adapter=ArrayData;if(xml){adap=pF.getXMLAttr($(xml),"adapter");if(adap!==undefined&&adap!==""){adapter=Multigraph.getDataAdapter(adap);if(adapter===undefined){throw new Error("Missing data adapater: "+adap)}}variables_xml=xml.find("variables");defaultMissingvalueString=pF.getXMLAttr(variables_xml,"missingvalue");defaultMissingopString=pF.getXMLAttr(variables_xml,"missingop");var variables=variables_xml.find(">variable");if(variables.length>0){$.each(variables,function(i,e){dataVariables.push(DataVariable.parseXML($(e)))})}var haveRepeat=false,period,repeat_xml=$(xml.find(">repeat"));if(repeat_xml.length>0){var periodString=pF.getXMLAttr($(repeat_xml),"period");if(periodString===undefined||periodString===""){messageHandler.warning("<repeat> tag requires a 'period' attribute; data treated as non-repeating")}else{period=DataMeasure.parse(dataVariables[0].type(),periodString);haveRepeat=true}}var values_xml=$(xml.find(">values"));if(values_xml.length>0){values_xml=values_xml[0];var stringValues=adapter.textToStringArray(dataVariables,$(values_xml).text());if(haveRepeat){data=new PeriodicArrayData(dataVariables,stringValues,period)}else{data=new ArrayData(dataVariables,stringValues)}}var csv_xml=$(xml.find(">csv"));if(csv_xml.length>0){csv_xml=csv_xml[0];var filename=pF.getXMLAttr($(csv_xml),"location");data=new CSVData(dataVariables,multigraph?multigraph.rebaseUrl(filename):filename,messageHandler,multigraph?multigraph.getAjaxThrottle(filename):undefined)}var service_xml=$(xml.find(">service"));if(service_xml.length>0){service_xml=$(service_xml[0]);var location=pF.getXMLAttr(service_xml,"location");data=new WebServiceData(dataVariables,multigraph?multigraph.rebaseUrl(location):location,messageHandler,multigraph?multigraph.getAjaxThrottle(location):undefined);var format=pF.getXMLAttr(service_xml,"format");if(format){data.format(format)}}}if(data){if(defaultMissingvalueString!==undefined){data.defaultMissingvalue(defaultMissingvalueString)}if(defaultMissingopString!==undefined){data.defaultMissingop(defaultMissingopString)}data.adapter(adapter)}return data};return Data}},{"../../core/array_data.js":17,"../../core/csv_data.js":25,"../../core/data.js":26,"../../core/data_measure.js":28,"../../core/data_variable.js":31,"../../core/multigraph.js":48,"../../core/periodic_array_data.js":53,"../../core/web_service_data.js":67,"../../util/parsingFunctions.js":156}],135:[function(require,module,exports){var DataVariable=require("../../core/data_variable.js");DataVariable.parseXML=function(xml,data){var variable,pF=require("../../util/parsingFunctions.js"),parseAttribute=pF.parseAttribute,DataValue=require("../../core/data_value.js"),attr;if(xml&&pF.getXMLAttr(xml,"id")){variable=new DataVariable(pF.getXMLAttr(xml,"id"));parseAttribute(pF.getXMLAttr(xml,"column"),variable.column,pF.parseInteger);parseAttribute(pF.getXMLAttr(xml,"type"),variable.type,DataValue.parseType);parseAttribute(pF.getXMLAttr(xml,"missingvalue"),variable.missingvalue,function(v){return DataValue.parse(variable.type(),v)});parseAttribute(pF.getXMLAttr(xml,"missingop"),variable.missingop,DataValue.parseComparator)}return variable};module.exports=DataVariable},{"../../core/data_value.js":30,"../../core/data_variable.js":31,"../../util/parsingFunctions.js":156}],136:[function(require,module,exports){module.exports=function($){var Datatips=require("../../core/datatips.js");if(typeof Datatips.parseXML==="function"){return Datatips}Datatips.parseXML=function(xml){var datatips=new Datatips,RGBColor=require("../../math/rgb_color.js"),DatatipsVariable=require("../../core/datatips_variable.js"),pF=require("../../util/parsingFunctions.js"),parseRGBColor=RGBColor.parse,parseAttribute=pF.parseAttribute,parseInteger=pF.parseInteger,child;if(xml){child=xml.find("variable");if(child.length>0){$.each(child,function(i,e){datatips.variables().add(DatatipsVariable.parseXML($(e)))})}parseAttribute(pF.getXMLAttr(xml,"format"),datatips.formatString);parseAttribute(pF.getXMLAttr(xml,"bgcolor"),datatips.bgcolor,parseRGBColor);parseAttribute(pF.getXMLAttr(xml,"bgalpha"),datatips.bgalpha,parseFloat);parseAttribute(pF.getXMLAttr(xml,"border"),datatips.border,parseInteger);parseAttribute(pF.getXMLAttr(xml,"bordercolor"),datatips.bordercolor,parseRGBColor);parseAttribute(pF.getXMLAttr(xml,"pad"),datatips.pad,parseInteger)}return datatips};return Datatips}},{"../../core/datatips.js":32,"../../core/datatips_variable.js":33,"../../math/rgb_color.js":105,"../../util/parsingFunctions.js":156}],137:[function(require,module,exports){var DatatipsVariable=require("../../core/datatips_variable.js");DatatipsVariable.parseXML=function(xml){var variable=new DatatipsVariable,pF=require("../../util/parsingFunctions.js");if(xml){pF.parseAttribute(pF.getXMLAttr(xml,"format"),variable.formatString)}return variable};module.exports=DatatipsVariable},{"../../core/datatips_variable.js":33,"../../util/parsingFunctions.js":156}],138:[function(require,module,exports){module.exports=function($){var Filter=require("../../core/filter.js");if(typeof Filter.parseXML==="function"){return Filter}Filter.parseXML=function(xml){var filter=new Filter,FilterOption=require("../../core/filter_option.js"),pF=require("../../util/parsingFunctions.js"),child;if(xml){child=xml.find("option");if(child.length>0){$.each(child,function(i,e){filter.options().add(FilterOption.parseXML($(e)))})}pF.parseAttribute(pF.getXMLAttr(xml,"type"),filter.type)}return filter};return Filter}},{"../../core/filter.js":39,"../../core/filter_option.js":40,"../../util/parsingFunctions.js":156}],139:[function(require,module,exports){var FilterOption=require("../../core/filter_option.js");FilterOption.parseXML=function(xml){var pF=require("../../util/parsingFunctions.js"),option=new FilterOption;if(xml){option.name(pF.getXMLAttr(xml,"name"));option.value(pF.getXMLAttr(xml,"value")===""?undefined:pF.getXMLAttr(xml,"value"))}return option};module.exports=FilterOption},{"../../core/filter_option.js":40,"../../util/parsingFunctions.js":156}],140:[function(require,module,exports){module.exports=function($){var Graph=require("../../core/graph.js"),pF=require("../../util/parsingFunctions.js");if(typeof Graph.parseXML==="function"){return Graph}var checkDeprecatedColorNames=function(xml,messageHandler){var RGBColor=require("../../math/rgb_color.js"),$xml=$(xml),attributes=$xml[0].attributes,children=$xml.children(),colorNameIsDeprecated=RGBColor.colorNameIsDeprecated,dep;if(xml.nodeName==="option"){if(/color/.test(pF.getXMLAttr($xml,"name"))){dep=colorNameIsDeprecated(pF.getXMLAttr($xml,"value"));if(dep){messageHandler.warning('Warning: color string "'+pF.getXMLAttr($xml,"value")+'" is deprecated; use "'+dep+'" instead')}}}if(attributes){$.each(attributes,function(){if(/color/.test(this.name)){dep=colorNameIsDeprecated(this.value);if(dep){messageHandler.warning('Warning: color string "'+this.value+'" is deprecated; use "'+dep+'" instead')}}})}if(children){children.each(function(){checkDeprecatedColorNames(this,messageHandler)})}};Graph.parseXML=function(xml,multigraph,messageHandler){var graph=new Graph,Axis=require("../../core/axis.js"),Window=require("../../core/window.js"),Legend=require("../../core/legend.js"),Background=require("../../core/background.js"),Plotarea=require("../../core/plotarea.js"),Title=require("../../core/title.js"),Data=require("../../core/data.js"),Plot=require("../../core/plot.js"),utilityFunctions=require("../../util/utilityFunctions.js"),defaults=utilityFunctions.getDefaultValuesFromXSD(),child;graph.multigraph(multigraph);if(xml){try{checkDeprecatedColorNames(xml,messageHandler)}catch(e){}child=xml.find(">window");if(child.length>0){graph.window(Window.parseXML(child))}child=xml.find(">legend");if(child.length>0){graph.legend(Legend.parseXML(child))}else{graph.legend(Legend.parseXML())}child=xml.find(">background");if(child.length>0){graph.background(Background.parseXML(child,graph.multigraph()))}child=xml.find(">plotarea");if(child.length>0){graph.plotarea(Plotarea.parseXML(child))}child=xml.find(">title");if(child.length>0){graph.title(Title.parseXML(child,graph))}$.each(xml.find(">horizontalaxis"),function(i,e){graph.axes().add(Axis.parseXML($(e),Axis.HORIZONTAL,messageHandler,graph.multigraph()))});$.each(xml.find(">verticalaxis"),function(i,e){graph.axes().add(Axis.parseXML($(e),Axis.VERTICAL,messageHandler,graph.multigraph()))});$.each(xml.find(">throttle"),function(i,e){var pattern=pF.getXMLAttr($(e),"pattern")?pF.getXMLAttr($(e),"pattern"):defaults.throttle.pattern,requests=pF.getXMLAttr($(e),"requests")?pF.getXMLAttr($(e),"requests"):defaults.throttle.requests,period=pF.getXMLAttr($(e),"period")?pF.getXMLAttr($(e),"period"):defaults.throttle.period,concurrent=pF.getXMLAttr($(e),"concurrent")?pF.getXMLAttr($(e),"concurrent"):defaults.throttle.concurrent;multigraph.addAjaxThrottle(pattern,requests,period,concurrent)});$.each(xml.find(">data"),function(i,e){graph.data().add(Data.parseXML($(e),graph.multigraph(),messageHandler))});$.each(xml.find(">plot"),function(i,e){graph.plots().add(Plot.parseXML($(e),graph,messageHandler))});graph.postParse()}return graph};return Graph}},{"../../core/axis.js":18,"../../core/background.js":21,"../../core/data.js":26,"../../core/graph.js":41,"../../core/legend.js":46,"../../core/plot.js":54,"../../core/plotarea.js":56,"../../core/title.js":65,"../../core/window.js":70,"../../math/rgb_color.js":105,"../../util/parsingFunctions.js":156,"../../util/utilityFunctions.js":157}],141:[function(require,module,exports){var Grid=require("../../core/grid.js");Grid.parseXML=function(xml){var grid=new Grid,RGBColor=require("../../math/rgb_color.js"),pF=require("../../util/parsingFunctions.js"),parseAttribute=pF.parseAttribute,attr;if(xml){parseAttribute(pF.getXMLAttr(xml,"color"),grid.color,RGBColor.parse);attr=pF.getXMLAttr(xml,"visible");if(attr!==undefined){grid.visible(pF.parseBoolean(attr))}else{grid.visible(true)}}return grid};module.exports=Grid},{"../../core/grid.js":42,"../../math/rgb_color.js":105,"../../util/parsingFunctions.js":156}],142:[function(require,module,exports){var Icon=require("../../core/icon.js");Icon.parseXML=function(xml){var icon=new Icon,pF=require("../../util/parsingFunctions.js"),parseAttribute=pF.parseAttribute,parseInteger=pF.parseInteger;if(xml){parseAttribute(pF.getXMLAttr(xml,"height"),icon.height,parseInteger);parseAttribute(pF.getXMLAttr(xml,"width"),icon.width,parseInteger);parseAttribute(pF.getXMLAttr(xml,"border"),icon.border,parseInteger)}return icon};module.exports=Icon},{"../../core/icon.js":43,"../../util/parsingFunctions.js":156}],143:[function(require,module,exports){var Img=require("../../core/img.js");Img.parseXML=function(xml,multigraph){var img,pF=require("../../util/parsingFunctions.js"),Point=require("../../math/point.js"),parseAttribute=pF.parseAttribute,parsePoint=Point.parse;if(xml&&pF.getXMLAttr(xml,"src")!==undefined){var src=pF.getXMLAttr(xml,"src");if(!src){throw new Error('img elment requires a "src" attribute value')}if(multigraph){src=multigraph.rebaseUrl(src)}img=new Img(src);parseAttribute(pF.getXMLAttr(xml,"anchor"),img.anchor,parsePoint);parseAttribute(pF.getXMLAttr(xml,"base"),img.base,parsePoint);parseAttribute(pF.getXMLAttr(xml,"position"),img.position,parsePoint);parseAttribute(pF.getXMLAttr(xml,"frame"),img.frame,function(value){return value.toLowerCase()})}return img};module.exports=Img},{"../../core/img.js":44,"../../math/point.js":104,"../../util/parsingFunctions.js":156}],144:[function(require,module,exports){var JQueryXMLParser;module.exports=function($){if(typeof JQueryXMLParser!="undefined"){return JQueryXMLParser}JQueryXMLParser={};require("./axis.js")($);require("./data.js")($);require("./datatips.js")($);require("./filter.js")($);require("./graph.js")($);require("./multigraph.js")($);
require("./plot.js")($);require("./renderer.js")($);require("./axis_title.js");require("./background.js");require("./datatips_variable.js");require("./data_variable.js");require("./filter_option.js");require("./grid.js");require("./icon.js");require("./img.js");require("./labeler.js");require("./legend.js");require("./pan.js");require("./plotarea.js");require("./plot_legend.js");require("./title.js");require("./window.js");require("./zoom.js");JQueryXMLParser.stringToJQueryXMLObj=function(thingy){if(typeof thingy!=="string"){return $(thingy)}var xml=$.parseXML(thingy);return $($(xml).children()[0])};return JQueryXMLParser}},{"./axis.js":131,"./axis_title.js":132,"./background.js":133,"./data.js":134,"./data_variable.js":135,"./datatips.js":136,"./datatips_variable.js":137,"./filter.js":138,"./filter_option.js":139,"./graph.js":140,"./grid.js":141,"./icon.js":142,"./img.js":143,"./labeler.js":145,"./legend.js":146,"./multigraph.js":147,"./pan.js":148,"./plot.js":149,"./plot_legend.js":150,"./plotarea.js":151,"./renderer.js":152,"./title.js":153,"./window.js":154,"./zoom.js":155}],145:[function(require,module,exports){var Labeler=require("../../core/labeler.js");Labeler.parseXML=function(xml,axis,defaults,spacing){var labeler,Point=require("../../math/point.js"),RGBColor=require("../../math/rgb_color.js"),DataMeasure=require("../../core/data_measure.js"),DataValue=require("../../core/data_value.js"),DataFormatter=require("../../core/data_formatter.js"),pF=require("../../util/parsingFunctions.js"),parsePoint=Point.parse;var parseLabelerAttribute=function(value,attribute,preprocessor,defaultName){if(!pF.parseAttribute(value,attribute,preprocessor)&&defaults!==undefined){attribute(defaults[defaultName]())}};var parseDataFormatter=function(type){return function(value){return DataFormatter.create(type,value)}};var parseDataValue=function(type){return function(value){return DataValue.parse(type,value)}};if(xml){labeler=new Labeler(axis);if(spacing!==null){if(spacing===undefined){spacing=pF.getXMLAttr(xml,"spacing")}parseLabelerAttribute(spacing,labeler.spacing,function(v){return DataMeasure.parse(axis.type(),v)},"spacing")}parseLabelerAttribute(pF.getXMLAttr(xml,"format"),labeler.formatter,parseDataFormatter(axis.type()),"formatter");parseLabelerAttribute(pF.getXMLAttr(xml,"start"),labeler.start,parseDataValue(axis.type()),"start");parseLabelerAttribute(pF.getXMLAttr(xml,"angle"),labeler.angle,parseFloat,"angle");parseLabelerAttribute(pF.getXMLAttr(xml,"position"),labeler.position,parsePoint,"position");parseLabelerAttribute(pF.getXMLAttr(xml,"anchor"),labeler.anchor,parsePoint,"anchor");parseLabelerAttribute(pF.getXMLAttr(xml,"densityfactor"),labeler.densityfactor,parseFloat,"densityfactor");parseLabelerAttribute(pF.getXMLAttr(xml,"color"),labeler.color,RGBColor.parse,"color");parseLabelerAttribute(pF.getXMLAttr(xml,"visible"),labeler.visible,pF.parseBoolean,"visible")}return labeler};module.exports=Labeler},{"../../core/data_formatter.js":27,"../../core/data_measure.js":28,"../../core/data_value.js":30,"../../core/labeler.js":45,"../../math/point.js":104,"../../math/rgb_color.js":105,"../../util/parsingFunctions.js":156}],146:[function(require,module,exports){var Legend=require("../../core/legend.js");Legend.parseXML=function(xml){var legend=new Legend,pF=require("../../util/parsingFunctions.js"),Point=require("../../math/point.js"),RGBColor=require("../../math/rgb_color.js"),Icon=require("../../core/icon.js"),parseAttribute=pF.parseAttribute,parseInteger=pF.parseInteger,parsePoint=Point.parse,parseRGBColor=RGBColor.parse,child;if(xml){parseAttribute(pF.getXMLAttr(xml,"visible"),legend.visible,pF.parseBoolean);parseAttribute(pF.getXMLAttr(xml,"base"),legend.base,parsePoint);parseAttribute(pF.getXMLAttr(xml,"anchor"),legend.anchor,parsePoint);parseAttribute(pF.getXMLAttr(xml,"position"),legend.position,parsePoint);parseAttribute(pF.getXMLAttr(xml,"frame"),legend.frame);parseAttribute(pF.getXMLAttr(xml,"color"),legend.color,parseRGBColor);parseAttribute(pF.getXMLAttr(xml,"bordercolor"),legend.bordercolor,parseRGBColor);parseAttribute(pF.getXMLAttr(xml,"opacity"),legend.opacity,parseFloat);parseAttribute(pF.getXMLAttr(xml,"border"),legend.border,parseInteger);parseAttribute(pF.getXMLAttr(xml,"rows"),legend.rows,parseInteger);parseAttribute(pF.getXMLAttr(xml,"columns"),legend.columns,parseInteger);parseAttribute(pF.getXMLAttr(xml,"cornerradius"),legend.cornerradius,parseInteger);parseAttribute(pF.getXMLAttr(xml,"padding"),legend.padding,parseInteger);child=xml.find("icon");if(child.length>0){legend.icon(Icon.parseXML(child))}}return legend};module.exports=Legend},{"../../core/icon.js":43,"../../core/legend.js":46,"../../math/point.js":104,"../../math/rgb_color.js":105,"../../util/parsingFunctions.js":156}],147:[function(require,module,exports){module.exports=function($){var Multigraph=require("../../core/multigraph.js")($);if(typeof Multigraph.parseXML==="function"){return Multigraph}Multigraph.parseXML=function(xml,mugl,messageHandler){var multigraph=new Multigraph,graphs=multigraph.graphs(),Graph=require("../../core/graph.js"),child;multigraph.mugl(mugl);if(xml){child=xml.find(">graph");if(child.length>0){$.each(child,function(i,e){graphs.add(Graph.parseXML($(e),multigraph,messageHandler))})}else if(child.length===0&&xml.children().length>0){graphs.add(Graph.parseXML(xml,multigraph,messageHandler))}}return multigraph};return Multigraph}},{"../../core/graph.js":41,"../../core/multigraph.js":48}],148:[function(require,module,exports){var Pan=require("../../core/pan.js");Pan.parseXML=function(xml,type){var pan=new Pan,pF=require("../../util/parsingFunctions.js"),DataValue=require("../../core/data_value.js"),parseAttribute=pF.parseAttribute,parseDataValue=function(v){return DataValue.parse(type,v)};if(xml){parseAttribute(pF.getXMLAttr(xml,"allowed"),pan.allowed,pF.parseBoolean);parseAttribute(pF.getXMLAttr(xml,"min"),pan.min,parseDataValue);parseAttribute(pF.getXMLAttr(xml,"max"),pan.max,parseDataValue)}return pan};module.exports=Pan},{"../../core/data_value.js":30,"../../core/pan.js":52,"../../util/parsingFunctions.js":156}],149:[function(require,module,exports){module.exports=function($){var Plot=require("../../core/plot.js");if(typeof Plot.parseXML==="function"){return Plot}Plot.parseXML=function(xml,graph,messageHandler){var DataPlot=require("../../core/data_plot.js"),PlotLegend=require("../../core/plot_legend.js"),ConstantPlot=require("../../core/constant_plot.js"),DataValue=require("../../core/data_value.js"),Renderer=require("../../core/renderer.js"),Filter=require("../../core/filter.js"),Datatips=require("../../core/datatips.js"),pF=require("../../util/parsingFunctions.js"),plot,haxis,vaxis,variable,attr,child;if(xml){child=xml.find(">verticalaxis");if(child.length===1&&pF.getXMLAttr(child,"ref")!==undefined){if(graph){vaxis=graph.axisById(pF.getXMLAttr(child,"ref"));if(vaxis===undefined){throw new Error("Plot Vertical Axis Error: The graph does not contain an axis with an id of '"+pF.getXMLAttr(child,"ref")+"'")}}}child=xml.find("verticalaxis constant");if(child.length>0){var constantValueString=pF.getXMLAttr(child,"value");if(constantValueString===undefined){throw new Error("Constant Plot Error: A 'value' attribute is needed to define a Constant Plot")}plot=new ConstantPlot(DataValue.parse(vaxis.type(),constantValueString))}else{plot=new DataPlot}plot.verticalaxis(vaxis);child=xml.find(">horizontalaxis");if(child.length===1&&pF.getXMLAttr(child,"ref")!==undefined){if(graph){haxis=graph.axisById(pF.getXMLAttr(child,"ref"));if(haxis!==undefined){plot.horizontalaxis(haxis)}else{throw new Error("Plot Horizontal Axis Error: The graph does not contain an axis with an id of '"+pF.getXMLAttr(child,"ref")+"'")}}}if(plot instanceof DataPlot){if(xml.find("horizontalaxis variable").length===0){plot.variable().add(null)}child=xml.find("horizontalaxis variable, verticalaxis variable");if(child.length>0){if(graph){$.each(child,function(i,e){attr=pF.getXMLAttr($(e),"ref");variable=graph.variableById(attr);if(variable!==undefined){plot.data(variable.data());plot.variable().add(variable)}else{throw new Error("Plot Variable Error: No Data tag contains a variable with an id of '"+attr+"'")}})}}}child=xml.find("legend");if(child.length>0){plot.legend(PlotLegend.parseXML(child,plot))}else{plot.legend(PlotLegend.parseXML(undefined,plot))}child=xml.find("renderer");if(child.length>0){plot.renderer(Renderer.parseXML(child,plot,messageHandler))}child=xml.find("filter");if(child.length>0){plot.filter(Filter.parseXML(child))}child=xml.find("datatips");if(child.length>0){plot.datatips(Datatips.parseXML(child))}}return plot};return Plot}},{"../../core/constant_plot.js":24,"../../core/data_plot.js":29,"../../core/data_value.js":30,"../../core/datatips.js":32,"../../core/filter.js":39,"../../core/plot.js":54,"../../core/plot_legend.js":55,"../../core/renderer.js":57,"../../util/parsingFunctions.js":156}],150:[function(require,module,exports){var PlotLegend=require("../../core/plot_legend.js");PlotLegend.parseXML=function(xml,plot){var legend=new PlotLegend,pF=require("../../util/parsingFunctions.js"),Text=require("../../core/text.js"),parseAttribute=pF.parseAttribute,child;if(xml){parseAttribute(pF.getXMLAttr(xml,"visible"),legend.visible,pF.parseBoolean);parseAttribute(pF.getXMLAttr(xml,"label"),legend.label,function(value){return new Text(value)})}if(legend.label()===undefined){if(typeof plot.variable==="function"&&plot.variable().size()>=2){legend.label(new Text(plot.variable().at(1).id()))}else{legend.label(new Text("plot"))}}return legend};module.exports=PlotLegend},{"../../core/plot_legend.js":55,"../../core/text.js":64,"../../util/parsingFunctions.js":156}],151:[function(require,module,exports){var Plotarea=require("../../core/plotarea.js");Plotarea.parseXML=function(xml){var plotarea=new Plotarea,margin=plotarea.margin(),pF=require("../../util/parsingFunctions.js"),RGBColor=require("../../math/rgb_color.js"),parseRGBColor=RGBColor.parse,parseAttribute=pF.parseAttribute,parseInteger=pF.parseInteger;if(xml){parseAttribute(pF.getXMLAttr(xml,"marginbottom"),margin.bottom,parseInteger);parseAttribute(pF.getXMLAttr(xml,"marginleft"),margin.left,parseInteger);parseAttribute(pF.getXMLAttr(xml,"margintop"),margin.top,parseInteger);parseAttribute(pF.getXMLAttr(xml,"marginright"),margin.right,parseInteger);parseAttribute(pF.getXMLAttr(xml,"border"),plotarea.border,parseInteger);parseAttribute(pF.getXMLAttr(xml,"color"),plotarea.color,parseRGBColor);parseAttribute(pF.getXMLAttr(xml,"bordercolor"),plotarea.bordercolor,parseRGBColor)}return plotarea};module.exports=Plotarea},{"../../core/plotarea.js":56,"../../math/rgb_color.js":105,"../../util/parsingFunctions.js":156}],152:[function(require,module,exports){module.exports=function($){var Renderer=require("../../core/renderer.js");if(typeof Renderer.parseXML==="function"){return Renderer}Renderer.parseXML=function(xml,plot,messageHandler){var DataValue=require("../../core/data_value.js"),NumberValue=require("../../core/number_value.js"),Warning=require("../../core/warning.js"),pF=require("../../util/parsingFunctions.js"),rendererType,renderer,opt;require("../../core/renderers/all_renderers.js");if(xml&&pF.getXMLAttr(xml,"type")!==undefined){rendererType=Renderer.Type.parse(pF.getXMLAttr(xml,"type"));if(!Renderer.Type.isInstance(rendererType)){throw new Error("unknown renderer type '"+pF.getXMLAttr(xml,"type")+"'")}renderer=Renderer.create(rendererType);renderer.plot(plot);if(xml.find("option").length>0){(function(renderer,xml,plot,messageHandler){var i,missingValueOption=xml.find("option[name=missingvalue]"),missingOpOption=xml.find("option[name=missingop]");if(missingValueOption.length>0||missingOpOption.length>0){var columns=plot.data().columns(),column;for(i=0;i<columns.size();++i){column=columns.at(i);if(column.type()===DataValue.NUMBER){if(missingValueOption.length>0&&column.missingvalue()===undefined){column.missingvalue(NumberValue.parse(pF.getXMLAttr(missingValueOption,"value")))}if(missingOpOption.length>0&&column.missingop()===undefined){column.missingop(DataValue.parseComparator(pF.getXMLAttr(missingOpOption,"value")))}}}}if(missingValueOption.length>0){messageHandler.warning("Renderer option 'missingvalue' is deprecated; "+"use 'missingvalue' attribute of 'data'/'variable'; instead");missingValueOption.remove()}if(missingOpOption.length>0){messageHandler.warning("Renderer option 'missingop' is deprecated; "+"use 'missingvalue' attribute of 'data'/'variable'; instead");missingOpOption.remove()}})(renderer,xml,plot,messageHandler);$.each(xml.find(">option"),function(i,e){try{renderer.setOptionFromString(pF.getXMLAttr($(e),"name"),pF.getXMLAttr($(e),"value"),pF.getXMLAttr($(e),"min"),pF.getXMLAttr($(e),"max"))}catch(e){if(e instanceof Warning){messageHandler.warning(e)}else{throw e}}})}}return renderer};return Renderer}},{"../../core/data_value.js":30,"../../core/number_value.js":51,"../../core/renderer.js":57,"../../core/renderers/all_renderers.js":58,"../../core/warning.js":66,"../../util/parsingFunctions.js":156}],153:[function(require,module,exports){var Title=require("../../core/title.js");Title.parseXML=function(xml,graph){var Point=require("../../math/point.js"),RGBColor=require("../../math/rgb_color.js"),Text=require("../../core/text.js"),pF=require("../../util/parsingFunctions.js"),parsePoint=Point.parse,parseRGBColor=RGBColor.parse,parseAttribute=pF.parseAttribute,parseInteger=pF.parseInteger,title;if(xml){var text=xml.text();if(text!==""){title=new Title(new Text(text),graph)}else{return undefined}parseAttribute(pF.getXMLAttr(xml,"frame"),title.frame,function(value){return value.toLowerCase()});parseAttribute(pF.getXMLAttr(xml,"border"),title.border,parseInteger);parseAttribute(pF.getXMLAttr(xml,"color"),title.color,parseRGBColor);parseAttribute(pF.getXMLAttr(xml,"bordercolor"),title.bordercolor,parseRGBColor);parseAttribute(pF.getXMLAttr(xml,"opacity"),title.opacity,parseFloat);parseAttribute(pF.getXMLAttr(xml,"padding"),title.padding,parseInteger);parseAttribute(pF.getXMLAttr(xml,"cornerradius"),title.cornerradius,parseInteger);parseAttribute(pF.getXMLAttr(xml,"anchor"),title.anchor,parsePoint);parseAttribute(pF.getXMLAttr(xml,"base"),title.base,parsePoint);parseAttribute(pF.getXMLAttr(xml,"position"),title.position,parsePoint)}return title};module.exports=Title},{"../../core/text.js":64,"../../core/title.js":65,"../../math/point.js":104,"../../math/rgb_color.js":105,"../../util/parsingFunctions.js":156}],154:[function(require,module,exports){var Window=require("../../core/window.js");Window.parseXML=function(xml){var w=new Window,RGBColor=require("../../math/rgb_color.js"),pF=require("../../util/parsingFunctions.js"),parseAttribute=pF.parseAttribute,parseInteger=pF.parseInteger,attr;if(xml){parseAttribute(pF.getXMLAttr(xml,"width"),w.width,parseInteger);parseAttribute(pF.getXMLAttr(xml,"height"),w.height,parseInteger);parseAttribute(pF.getXMLAttr(xml,"border"),w.border,parseInteger);attr=pF.getXMLAttr(xml,"margin");if(attr!==undefined){(function(m){w.margin().set(m,m,m,m)})(parseInt(attr,10))}attr=pF.getXMLAttr(xml,"padding");if(attr!==undefined){(function(m){w.padding().set(m,m,m,m)})(parseInt(attr,10))}parseAttribute(pF.getXMLAttr(xml,"bordercolor"),w.bordercolor,RGBColor.parse)}return w};module.exports=Window},{"../../core/window.js":70,"../../math/rgb_color.js":105,"../../util/parsingFunctions.js":156}],155:[function(require,module,exports){var Zoom=require("../../core/zoom.js");Zoom.parseXML=function(xml,type){var zoom=new Zoom,DataValue=require("../../core/data_value.js"),DataMeasure=require("../../core/data_measure.js"),pF=require("../../util/parsingFunctions.js"),parseAttribute=pF.parseAttribute,parseDataMeasure=function(v){return DataMeasure.parse(type,v)},attr;if(xml){parseAttribute(pF.getXMLAttr(xml,"allowed"),zoom.allowed,pF.parseBoolean);parseAttribute(pF.getXMLAttr(xml,"min"),zoom.min,parseDataMeasure);parseAttribute(pF.getXMLAttr(xml,"max"),zoom.max,parseDataMeasure);attr=pF.getXMLAttr(xml,"anchor");if(attr!==undefined){if(attr.toLowerCase()==="none"){zoom.anchor(null)}else{zoom.anchor(DataValue.parse(type,attr))}}}return zoom};module.exports=Zoom},{"../../core/data_measure.js":28,"../../core/data_value.js":30,"../../core/zoom.js":71,"../../util/parsingFunctions.js":156}],156:[function(require,module,exports){var ParsingFunctions={};ParsingFunctions.parseAttribute=function(value,attribute,preprocessor){if(value!==undefined){attribute(preprocessor!==undefined?preprocessor(value):value);return true}return false};ParsingFunctions.parseInteger=function(value){return parseInt(value,10)};ParsingFunctions.parseBoolean=function(param){if(typeof param==="string"){switch(param.toLowerCase()){case"true":case"yes":return true;case"false":case"no":return false;default:return param}}else{return param}};ParsingFunctions.getXMLAttr=function(node,attrname){if(node.length>=1&&node[0].hasAttribute(attrname)){return node.attr(attrname)}return undefined};module.exports=ParsingFunctions},{}],157:[function(require,module,exports){utilityFunctions={};utilityFunctions.getKeys=function(obj){var keys=[],key;for(key in obj){if(obj.hasOwnProperty(key)){keys.push(key)}}return keys};utilityFunctions.coerceToString=function(s){if(typeof s!=="undefined"){return String(s)}else{return s}};utilityFunctions.insertDefaults=function(elem,defaults,attributes){var i;for(i=0;i<attributes.length;i++){if(defaults[attributes[i]]!==undefined&&(typeof defaults[attributes[i]]!=="object"||defaults[attributes[i]]===null)){if(elem.attributes().indexOf(attributes[i])>-1){elem.attribute(attributes[i]).defaultsTo(defaults[attributes[i]])}}}return elem};utilityFunctions.getDefaultValuesFromXSD=function(){var DatetimeValue=require("../core/datetime_value.js"),NumberValue=require("../core/number_value.js"),Displacement=require("../math/displacement.js"),Insets=require("../math/insets.js"),Point=require("../math/point.js"),RGBColor=require("../math/rgb_color.js");return{window:{border:2,margin:function(){return new Insets(2,2,2,2)},padding:function(){return new Insets(5,5,5,5)},bordercolor:function(){return new RGBColor.parse("0x000000")}},legend:{icon:{height:30,width:40,border:1},visible:null,base:function(){return new Point(1,1)},anchor:function(){return new Point(1,1)},position:function(){return new Point(0,0)},frame:"plot",color:function(){return new RGBColor.parse("0xffffff")},bordercolor:function(){return new RGBColor.parse("0x000000")},opacity:1,border:1,rows:undefined,columns:undefined,cornerradius:0,padding:0},background:{img:{src:undefined,anchor:function(){return new Point(-1,-1)},base:function(){return new Point(-1,-1)},position:function(){return new Point(0,0)},frame:"padding"},color:"0xffffff"},plotarea:{margin:function(){return new Insets(10,38,35,35)},border:0,color:null,bordercolor:function(){return new RGBColor.parse("0xeeeeee")}},title:{text:undefined,frame:"padding",border:0,color:function(){return new RGBColor.parse("0xffffff")},bordercolor:function(){return new RGBColor.parse("0x000000")},opacity:1,padding:0,cornerradius:15,anchor:function(){return new Point(0,1)},base:function(){return new Point(0,1)},position:function(){return new Point(0,0)}},horizontalaxis:{title:{content:undefined,anchor:undefined,base:0,position:undefined,"position-horizontal-top":function(){return new Point(0,15)},"position-horizontal-bottom":function(){return new Point(0,-18)},"position-vertical-right":function(){return new Point(33,0)},"position-vertical-left":function(){return new Point(-25,0)},"anchor-horizontal-top":function(){return new Point(0,-1)},"anchor-horizontal-bottom":function(){return new Point(0,1)},"anchor-vertical-right":function(){return new Point(-1,0)},"anchor-vertical-left":function(){return new Point(1,0)},angle:0},labels:{label:{format:undefined,position:undefined,anchor:undefined,"position-horizontal-top":function(){return new Point(0,5)},"position-horizontal-bottom":function(){return new Point(0,-5)},"position-vertical-right":function(){return new Point(5,0)},"position-vertical-left":function(){return new Point(-8,0)},"anchor-horizontal-top":function(){return new Point(0,-1)},"anchor-horizontal-bottom":function(){return new Point(0,1)},"anchor-vertical-right":function(){return new Point(-1,0)},"anchor-vertical-left":function(){return new Point(1,0)},angle:0,spacing:undefined,densityfactor:1,color:function(){return new RGBColor.parse("0x000000")},visible:true},"start-number":function(){return new NumberValue(0)},"start-datetime":function(){return new DatetimeValue(0)},angle:0,position:function(){return new Point(0,0)},anchor:function(){return new Point(0,0)},color:function(){return new RGBColor.parse("0x000000")},visible:true,defaultNumberSpacing:[1e4,5e3,2e3,1e3,500,200,100,50,20,10,5,2,1,.1,.01,.001],defaultDatetimeSpacing:["1000Y","500Y","200Y","100Y","50Y","20Y","10Y","5Y","2Y","1Y","6M","3M","2M","1M","7D","3D","2D","1D","12H","6H","3H","2H","1H"],"function":undefined,densityfactor:undefined},grid:{color:function(){return new RGBColor.parse("0xeeeeee")},visible:false},pan:{allowed:true,min:null,max:null},zoom:{allowed:true,min:undefined,max:undefined,anchor:null},binding:{id:undefined,min:undefined,max:undefined},id:undefined,type:"number",length:function(){return new Displacement(1,0)},position:function(){return new Point(0,0)},pregap:0,postgap:0,anchor:-1,base:function(){return new Point(-1,-1)},min:"auto",minoffset:0,minposition:function(){return new Displacement(-1,0)},max:"auto",maxoffset:0,maxposition:function(){return new Displacement(1,0)},positionbase:undefined,color:function(){return new RGBColor(0,0,0)},tickmin:-3,tickmax:3,tickcolor:null,highlightstyle:"axis",linewidth:1,orientation:undefined},verticalaxis:{title:{content:undefined,anchor:function(){return new Point(0,-20)},position:function(){return new Point(0,1)},angle:"0"},labels:{label:{format:undefined,start:undefined,angle:undefined,position:undefined,anchor:undefined,spacing:undefined,densityfactor:undefined},format:"%1d",visible:"true",start:"0",angle:"0.0",position:"0 0",anchor:"0 0","function":undefined,densityfactor:undefined},grid:{visible:"false"},pan:{allowed:"yes",min:undefined,max:undefined},zoom:{allowed:"yes",min:undefined,max:undefined,anchor:"none"},binding:{id:undefined,min:undefined,max:undefined},id:undefined,type:"number",position:"0 0",pregap:"0",postgap:"0",anchor:"-1",base:"-1 1",min:"auto",minoffset:"0",minposition:"-1",max:"auto",maxoffset:"0",maxposition:"1",positionbase:undefined,tickmin:"-3",tickmax:"3",highlightstyle:"axis",linewidth:"1",orientation:undefined},plot:{legend:{visible:true,label:undefined},horizontalaxis:{variable:{ref:undefined,factor:undefined},constant:{value:undefined},ref:undefined},verticalaxis:{variable:{ref:undefined,factor:undefined},constant:{value:undefined},ref:undefined},filter:{option:{name:undefined,value:undefined},type:undefined},renderer:{option:{name:undefined,value:undefined,min:undefined,max:undefined},type:function(){var Renderer=require("../core/renderer.js");return Renderer.Type.parse("line")}},datatips:{variable:{"formatString-number":"%.2f","formatString-datetime":"%d %n %Y"},formatString:"{0}: {1}",bgcolor:function(){return RGBColor.parse("0xeeeeee")},bgalpha:1,border:1,bordercolor:function(){return RGBColor.parse("0x000000")},pad:2}},throttle:{pattern:"",requests:0,period:0,concurrent:0},data:{variables:{variable:{id:undefined,column:undefined,type:"number",missingvalue:undefined,missingop:undefined},missingvalue:"-9000",missingop:"eq"},values:{content:undefined},csv:{location:undefined},service:{location:undefined}}}};module.exports=utilityFunctions},{"../core/datetime_value.js":37,"../core/number_value.js":51,"../core/renderer.js":57,"../math/displacement.js":101,"../math/insets.js":103,"../math/point.js":104,"../math/rgb_color.js":105}],158:[function(require,module,exports){var ValidationFunctions={};ValidationFunctions.validateNumberRange=function(number,lowerBound,upperBound){return typeof number==="number"&&number>=lowerBound&&number<=upperBound};ValidationFunctions.typeOf=function(value){var s=typeof value;if(s==="object"){if(value){if(Object.prototype.toString.call(value)==="[object Array]"){s="array"}}else{s="null"}}return s};ValidationFunctions.isNumberNotNaN=function(x){return typeof x==="number"&&x===x};module.exports=ValidationFunctions},{}]},{},[99]);// This file defines the single global name "climate_widget" which contains the following functions:
//   climate_widget.graph(OPTIONS)
//   climate_widget.variables(FREQUENCY)
// See the file README.md for more details.
;(function ($) {

  if (!String.prototype.endsWith) {
    // String.endsWith() polyfill for browsers that don't implement it
    String.prototype.endsWith = function (searchString, position) {
      var subjectString = this.toString();
      if (typeof position !== 'number' || !isFinite(position) || Math.floor(position) !== position || position > subjectString.length) {
        position = subjectString.length;
      }
      position -= searchString.length;
      var lastIndex = subjectString.indexOf(searchString, position);
      return lastIndex !== -1 && lastIndex === position;
    };
  }

  function fahrenheit_to_celsius(f) {
    return (5 / 9) * (f - 32)
  }

  function fdd_to_cdd(fdd) {
    return fdd / 9 * 5;
  }

  function inches_to_mm(inches) {
    return inches * 25.4;
  }

  function no_conversion(x) {
    return x;
  }

  var defaultUnitSystem = "english";

  function get_region_reduction(obj) {
    if (obj.options.county) {
      return {'area_reduce': 'county_mean'}
    }
    if (obj.options.state) {
      return {'area_reduce': 'state_mean'}
    }
  }

  function get_region_value(obj) {
    if (obj.options.county) {
      return obj.options.county
    }
    if (obj.options.state) {
      return obj.options.state
    }
  }

  function get_region_parameters(obj) {
    if (obj.options.county) {
      return {
        "county": obj.options.county
      }
    }
    if (obj.options.state) {
      return {"state": obj.options.state}
    }
    else {
      throw new Error('county/state not valid')
    }
  }

  var variables = [
    {
      id: "tmax",
      title: {
        english: "Average Daily Max Temp",
        metric: "Average Daily Max Temp"
      },
      acis_elements: {
        annual: {
          "name": "maxt",
          "units": "degreeF",
          "interval": "yly",
          "duration": "yly",
          "reduce": "mean"

        },
        monthly: {
          "name": "maxt",
          "units": "degreeF",
          "interval": "mly",
          "duration": "mly",
          "reduce": "mean"
        }
      },
      dataconverters: {
        metric: fahrenheit_to_celsius,
        english: no_conversion
      },
      ytitles: {
        annual: {
          absolute: {
            english: "Average Daily Max Temp (°F)",
            metric: "Average Daily Max Temp (°C)"
          },
          anomaly: {
            english: "Average Daily Max Temp departure (°F)",
            metric: "Average Daily Max Temp departure (°C)"
          }
        },
        monthly: {
          english: "Average Daily Max Temp (°F)",
          metric: "Average Daily Max Temp (°C)"
        },
        seasonal: {
          english: "Average Daily Max Temp (°F)",
          metric: "Average Daily Max Temp (°C)"
        }
      }
    },
    {
      id: "tmin",
      title: {
        english: "Average Daily Min Temp",
        metric: "Average Daily Min Temp"
      },
      acis_elements: {
        annual: {
          "name": "mint",
          "units": "degreeF",
          "interval": "yly",
          "duration": "yly",
          "reduce": "mean"
        },
        monthly: {
          "name": "mint",
          "units": "degreeF",
          "interval": "mly",
          "duration": "mly",
          "reduce": "mean"

        }
      },
      dataconverters: {
        metric: fahrenheit_to_celsius,
        english: no_conversion
      },
      ytitles: {
        annual: {
          absolute: {
            english: "Average Daily Min Temp (°F)",
            metric: "Average Daily Min Temp (°C)"
          },
          anomaly: {
            english: "Average Daily Min Temp departure (°F)",
            metric: "Average Daily Min Temp departure (°C)"
          }
        },
        monthly: {
          english: "Average Daily Min Temp (°F)",
          metric: "Average Daily Min Temp (°C)"
        },
        seasonal: {
          english: "Average Daily Min Temp (°F)",
          metric: "Average Daily Min Temp (°C)"
        }
      }
    },
    {
      id: "days_tmax_gt_90f",
      title: {
        english: " Days per year with max above 90°F",
        metric: " Days per year with max above 90°F"
      },
      acis_elements: {
        annual: {
          "name": "maxt",
          "interval": "yly",
          "duration": "yly",
          "reduce": "cnt_gt_90"

        }
      },
      dataconverters: {
        metric: no_conversion,
        english: no_conversion
      },
      ytitles: {
        annual: {
          absolute: {
            english: " Days per year with max above 90°F",
            metric: " Days per year with max above 90°F"
          },
          anomaly: {
            english: " Days per year with max above 90°F",
            metric: " Days per year with max above 90°F"
          }
        }
      }
    },
    {
      id: "days_tmax_gt_95f",
      title: {
        english: "Days per year with max above 95°F",
        metric: "Days per year with max above 35°C"
      },
      acis_elements: {
        annual: {
          "name": "maxt",
          "interval": "yly",
          "duration": "yly",
          "reduce": "cnt_gt_95"

        }
      },
      dataconverters: {
        metric: no_conversion,
        english: no_conversion
      },
      ytitles: {
        annual: {
          absolute: {
            english: "Days per year with max above 95°F",
            metric: "Days per year with max above 95°C"
          },
          anomaly: {
            english: "Days per year with max above 95°F departure",
            metric: "Days per year with max above 95°C departure"
          }
        }
      }
    },
    {
      id: "days_tmax_gt_100f",
      title: {
        english: "Days per year with max above 100°F",
        metric: "Days per year with max above 100°F"
      },
      acis_elements: {
        annual: {
          "name": "maxt",
          "interval": "yly",
          "duration": "yly",
          "reduce": "cnt_gt_100"

        }
      },
      dataconverters: {
        metric: no_conversion,
        english: no_conversion
      },
      ytitles: {
        annual: {
          absolute: {
            english: "Days per year with max above 100°F",
            metric: "Days per year with max above 100°F"
          },
          anomaly: {
            english: " Days per year with max above 100°F",
            metric: " Days per year with max above 100°F"
          }
        }
      }
    },
    {
      id: "days_tmax_gt_105f",
      title: {
        english: "Days per year with max above 105°F",
        metric: "Days per year with max above 105°F"
      },
      acis_elements: {
        annual: {
          "name": "maxt",
          "interval": "yly",
          "duration": "yly",
          "reduce": "cnt_gt_105"

        }
      },
      dataconverters: {
        metric: no_conversion,
        english: no_conversion
      },
      ytitles: {
        annual: {
          absolute: {
            english: "Days per year with max above 105°F",
            metric: "Days per year with max above 105°F"
          },
          anomaly: {
            english: "Days per year with max above 105°F departure",
            metric: "Days per year with max above 105°F departure"
          }
        }
      }
    },
    {
      id: "days_tmax_lt_32f",
      title: {
        english: "Days per year with max below 32°F (Icing days)",
        metric: "Days per year with max below 0°C (Icing days)"
      },
      acis_elements: {
        annual: {
          "name": "maxt",
          "interval": "yly",
          "duration": "yly",
          "reduce": "cnt_lt_32"

        }
      },
      dataconverters: {
        metric: no_conversion,
        english: no_conversion
      },
      ytitles: {
        annual: {
          absolute: {
            english: "Days per year with max below 32°F (Icing days)",
            metric: "Days per year with max below 0°C (Icing days)"
          },
          anomaly: {
            english: "Days per year with max below 32°F departure",
            metric: "Days per year with max below 0°C departure"
          }
        }
      }
    },
    {
      id: "days_tmin_lt_32f",
      title: {
        english: "Days per year with min below 32°F (frost days)",
        metric: "Days per year with min below 0°C (frost days)"
      },
      acis_elements: {
        annual: {
          "name": "mint",
          "interval": "yly",
          "duration": "yly",
          "reduce": "cnt_lt_32"

        }
      },
      dataconverters: {
        metric: no_conversion,
        english: no_conversion
      },
      ytitles: {
        annual: {
          absolute: {
            english: "Days per year with min below 32°F (frost days)",
            metric: "Days per year with min below 0°C (frost days)"
          },
          anomaly: {
            english: "Days per year with min below 32°F (frost days)",
            metric: "Days per year with min below 0°C (frost days)"
          }
        }
      }
    },
    {
      id: "days_tmin_gt_80f",
      title: {
        english: "Days per year with min above 80°F",
        metric: "Days per year with min above 80°F"
      },
      acis_elements: {
        annual: {
          "name": "mint",
          "interval": "yly",
          "duration": "yly",
          "reduce": "cnt_gt_80"

        },
        monthly: {
          "name": "mint",
          "interval": "mly",
          "duration": "mly",
          "reduce": "cnt_gt_80"

        }
      },
      dataconverters: {
        metric: no_conversion,
        english: no_conversion
      },
      ytitles: {
        annual: {
          absolute: {
            english: "Days per year with min above 80°F",
            metric: "Days per year with min above 80°F"
          },
          anomaly: {
            english: "Days per year with min above 80°F departure",
            metric: "Days per year with min above 80°F departure"
          }
        }
      }
    },
    {
      id: "days_tmin_gt_90f",
      title: {
        english: "Days per year with min above 90°F",
        metric: "Days per year with min above 90°F"
      },
      acis_elements: {
        annual: {
          "name": "mint",
          "interval": "yly",
          "duration": "yly",
          "reduce": "cnt_gt_90"

        },
        monthly: {
          "name": "mint",
          "interval": "mly",
          "duration": "mly",
          "reduce": "cnt_gt_90"

        }
      },
      dataconverters: {
        metric: no_conversion,
        english: no_conversion
      },
      ytitles: {
        annual: {
          absolute: {
            english: "Days per year with min above 90°F",
            metric: "Days per year with min above 90°F"
          },
          anomaly: {
            english: "Days per year with min above 90°F departure",
            metric: "Days per year with min above 90°F departure"
          }
        }
      }
    },
    {
      id: "hdd_65f",
      title: {
        english: "Heating Degree Days",
        metric: "Heating Degree Days"
      },
      acis_elements: {
        annual: {
          "name": "hdd",
          "interval": "yly",
          "duration": "yly",
          "reduce": "sum"

        }
      },
      dataconverters: {
        metric: fdd_to_cdd,
        english: no_conversion
      },
      ytitles: {
        annual: {
          absolute: {
            english: "Heating Degree Days (°F-days)",
            metric: "Heating Degree Days (°C-days)"
          },
          anomaly: {
            english: "Heating Degree Days departure (°F-days)",
            metric: "Heating Degree Days departure (°C-days)"
          }
        }
      }
    },
    {
      id: "cdd_65f",
      title: {
        english: "Cooling Degree Days",
        metric: "Cooling Degree Days"
      },
      acis_elements: {
        annual: {
          "name": "cdd",
          "interval": "yly",
          "duration": "yly",
          "reduce": "sum"

        }
      },
      dataconverters: {
        metric: fdd_to_cdd,
        english: no_conversion
      },
      ytitles: {
        annual: {
          absolute: {
            english: "Cooling Degree Days (°F-days)",
            metric: "Cooling Degree Days (°C-days)"
          },
          anomaly: {
            english: "Cooling Degree Days departure (°F-days)",
            metric: "Cooling Degree Days departure (°C-days)"
          }
        }
      }
    },
    {
      id: "gdd",
      title: {
        english: "Growing Degree Days",
        metric: "Growing Degree Days"
      },
      acis_elements: {
        annual: {
          "name": "gdd",
          "interval": "yly",
          "duration": "yly",
          "reduce": "sum"
        }
      },
      dataconverters: {
        metric: no_conversion,
        english: no_conversion
      },
      ytitles: {
        annual: {
          absolute: {
            english: "Growing Degree Days (°F-days)",
            metric: "Growing Degree Days (°C-days)"
          },
          anomaly: {
            english: "Growing Degree Days departure (°F-days)",
            metric: "Growing Degree Days departure (°C-days)"
          }
        }
      }
    },
    {
      id: "gddmod",
      title: {
        english: "Modified Growing Degree Days",
        metric: "Modified Growing Degree Days"
      },
      acis_elements: {
        annual: {
          "name": "gdd",
          "duration": "yly",
          "limit": [86, 50],
          "interval": "yly",
          "reduce": "sum"
        }
      },
      dataconverters: {
        metric: no_conversion,
        english: no_conversion
      },
      ytitles: {
        annual: {
          absolute: {
            english: "Modified Growing Degree Days (°F-days)",
            metric: "Modified Growing Degree Days (°C-days)"
          },
          anomaly: {
            english: "Modified Growing Degree Days departure (°F-days)",
            metric: "Modified Growing Degree Days departure (°C-days)"
          }
        }
      }
    },
    {
      id: "pcpn",
      title: {
        english: "Total Precipitation",
        metric: "Total Precipitation"
      },
      acis_elements: {
        annual: {
          "name": "pcpn",
          "interval": "yly",
          "duration": "yly",
          "reduce": "sum",
          "units": "inch"

        },
        monthly: {
          "name": "pcpn",
          "interval": "mly",
          "duration": "mly",
          "reduce": "sum",
          "units": "inch"

        }
      },
      dataconverters: {
        metric: inches_to_mm,
        english: no_conversion
      },
      ytitles: {
        annual: {
          absolute: {
            english: "Total Precipitation",
            metric: "Total Precipitation"
          },
          anomaly: {
            english: "Total Precipitation departure (%)",
            metric: "Total Precipitation departure (%)"
          }
        },
        monthly: {
          english: "Total Precipitation",
          metric: "Total Precipitation"
        },
        seasonal: {
          english: "Total Precipitation",
          metric: "Total Precipitation"
        }
      }
    },
    {
      id: "days_pcpn_lt_0.01in",
      title: {
        english: "Dry Days",
        metric: "Dry Days"
      },
      acis_elements: {
        annual: {
          "name": "pcpn",
          "interval": "yly",
          "duration": "yly",
          "reduce": "cnt_lt_0.01"
        },
        monthly: {

          "name": "pcpn",
          "interval": "mly",
          "duration": "mly",
          "reduce": "cnt_lt_0.01"

        }

      },
      dataconverters: {
        metric: no_conversion,
        english: no_conversion
      },
      ytitles: {
        annual: {
          absolute: {
            english: "Dry Days (days/period)",
            metric: "Dry Days (days/period)"
          },
          anomaly: {
            english: "Dry Days (days/period)",
            metric: "Dry Days (days/period)"
          }
        },
        seasonal: {
          english: "Dry Days (days/period)",
          metric: "Dry Days (days/period)"
        }
      }
    },
    {
      id: "days_pcpn_gt_1in",
      title: {
        english: "Days per year with more than 1in precip",
        metric: "Days per year with more than 25.3mm precip"
      },
      acis_elements: {
        annual: {
          "name": "pcpn",
          "interval": "yly",
          "duration": "yly",
          "reduce": "cnt_gt_1"

        }
      },
      dataconverters: {
        metric: no_conversion,
        english: no_conversion
      },
      ytitles: {
        annual: {
          absolute: {
            english: "Days per year with more than 1in precip",
            metric: "Days per year with more than 25.3mm precip"
          },
          anomaly: {
            english: "Days per year with more than 1in precip departure",
            metric: "Days per year with more than 25.3mm precip departure"
          }
        }

      }
    },
    {
      id: "days_pcpn_gt_2in",
      title: {
        english: "Days per year with more than 2in precip",
        metric: "Days per year with more than 50.8mm precip"
      },
      acis_elements: {
        annual: {
          "name": "pcpn",
          "interval": "yly",
          "duration": "yly",
          "reduce": "cnt_gt_2"

        }

      },
      dataconverters: {
        metric: no_conversion,
        english: no_conversion
      },
      ytitles: {
        annual: {
          absolute: {
            english: "Days per year with more than 2in precip",
            metric: "Days of Precipitation Above 50.8mm"
          },
          anomaly: {
            english: "Days per year with more than 2in precip departure",
            metric: "Days of Precipitation Above 50.8mm departure"
          }
        }

      }
    },
    {
      id: "days_pcpn_gt_3in",
      title: {
        english: "Days per year with more than 3in precip",
        metric: "Days per year with more than 76.2mm precip"
      },
      acis_elements: {
        annual: {
          "name": "pcpn",
          "interval": "yly",
          "duration": "yly",
          "reduce": "cnt_gt_3"

        },
      },
      dataconverters: {
        metric: no_conversion,
        english: no_conversion
      },
      ytitles: {
        annual: {
          absolute: {
            english: "Days per year with more than 3in precip",
            metric: "Days per year with more than 76.2mm precip"
          },
          anomaly: {
            english: "Days per year with more than 3in precip departure",
            metric: "Days per year with more than 76.2mm precip departure"
          }
        },

      }
    },
    {
      id: "days_pcpn_gt_4in",
      title: {
        english: "Days per year with more than 4in precip",
        metric: "Days per year with more than 101.6mm precip"
      },
      acis_elements: {
        annual: {
          "name": "pcpn",
          "interval": "yly",
          "duration": "yly",
          "reduce": "cnt_gt_4"

        }
      },
      dataconverters: {
        metric: no_conversion,
        english: no_conversion
      },
      ytitles: {
        annual: {
          absolute: {
            english: "Days per year with more than 4in precip",
            metric: "Days per year with more than 101.6mm precip"
          },
          anomaly: {
            english: "Days per year with more than 4in precip departure",
            metric: "Days per year with more than 101.6mm precip departure"
          }
        }
      }
    }
  ];

  function variable_config(id) {
    var i;
    for (i = 0; i < variables.length; ++i) {
      if (variables[i].id === id) {
        return variables[i];
      }
    }
    return undefined;
  }

  function climate_widget_variables(frequency, unitsystem) {
    unitsystem = unitsystem || defaultUnitSystem;
    return variables.filter(function (v) {
      return frequency in v.ytitles;
    }).map(function (v) {
      return {id: v.id, title: v.title[unitsystem]};
    });
  }

  function transform_data(data, f) {
    // Takes a 2D data array, and modifies it in-place by replacing each y value
    // with the result of passing that y value to the function f.  The "y" values
    // consist of all values on every row EXCEPT for the 1st column.
    var i, j;
    for (i = 0; i < data.length; ++i) {
      for (j = 1; j < data[i].length; ++j) {
        data[i][j] = f(data[i][j]);
      }
    }
    return data;
  }

  function datas_range(datas) {
    // Takes an array of data arrays, and returns a JS object giving the min and max
    // values present in all the data.  Each element of the incoming datas array
    // is a 2D array whose first column is an x value, and all the remaining columns
    // are "y" columns.  This function returns the min and max of all the y column
    // in all the data arrays.
    var min = datas[0][0][1];
    var max = datas[0][0][1];
    datas.forEach(function (data) {
      data.forEach(function (row) {
        row.slice(1).forEach(function (value) {
          if (value === null) {
            return
          }
          if (value < min) {
            min = value;
          }
          if (value > max) {
            max = value;
          }
        });
      });
    });
    return {min: min, max: max};
  }

  function scale_range(range, factor) {
    // Take an object of the form returned by datas_range() above, and scale its
    // min and max values by a factor, returning a new object of the same form.
    var r = (range.max - range.min) / 2;
    var c = (range.max + range.min) / 2;
    return {
      min: c - r * factor,
      max: c + r * factor
    };
  }

  // Data ranges will get scaled by this factor when setting y axis ranges.
  // Previously was 1.1, but set to 1 now to avoid awkard negative values for
  // things that can never be negative.
  var yAxisRangeScaleFactor = 1;

  var _i = 0;
  var starti = function (v) {
    _i = v || 0;
    return _i;
  };
  var nexti = function () {
    return ++_i;
  };

  // The following function takes a jermaine attr_list instance and returns
  // a plain JS array containing all its values
  function attr_list_array(attr_list) {
    var a = [], i;
    for (i = 0; i < attr_list.size(); ++i) {
      a.push(attr_list.at(i));
    }
    return a;
  }

  function each_plot(obj, f) {
    // Takes a JS object "obj", and a function "f" which is assumed to take
    // a single argument which is a multigraph Plot object, and traverses
    // (recursively) all the properties inside obj, calling f with every
    // Plot value it finds.
    Object.keys(obj).forEach(function (key) {
      if (obj[key] instanceof window.multigraph.core.Plot) {
        f(obj[key]);
      } else if (typeof(obj[key]) === "object") {
        each_plot(obj[key], f);
      }
    });
  }

  // function each_key(obj, f) {
  //   Object.keys(obj).forEach(f);
  // }

  // "KeyObj" is a kind of nested index object that we use to store
  // references to all the Plot objects in the graph.  A KeyObj
  // object (constructed via new KeyObj() defined below) is just
  // like a plain old JS object, in the sense that it can arbitrary
  // properties and values, except that it has a prototype that
  // defines arbitrary-depth setter and getter methods (set_in &
  // get_in), and a method call each_keys for iterating over
  // multiple levels of nesting in a single loop.
  var KeyObjProto = {
    set_in: function (keys, value) {
      // Set a property value in a nested KeyObj corresponding to successive levels of nesting.
      // For example:
      //    x = new KeyObj();
      //    x.set_in(["foo", "bar", "bat"], 42)
      // results in
      //    x = { foo: { bar: { bat: 42 } } }
      // (where each {} indicates a KeyObj object)
      var p = this;
      keys.slice(0, -1).forEach(function (key) {
        if (key in p) {
          p = p[key];
          if (!p.set_in) {
            throw new Error("set_in: cannot drill into non-KeyObj object");
          }
        } else {
          p[key] = new KeyObj();
          p = p[key];
        }
      });
      p[keys[keys.length - 1]] = value;
    },

    get_in: function (keys) {
      // Return a property value in a nested KeyObj; keys is an array of property names
      // corresponding to successive levels of nesting.  If at any level the element of
      // the keys array is undefined, or the object at that level does not contain a property
      // with the given name, the value of the object at that level is returned.
      var i = 0, obj = this;
      while (obj.get_in && (i < keys.length) && (keys[i] !== undefined) && (keys[i] in obj)) {
        obj = obj[keys[i]];
        ++i;
      }
      return obj;
    },

    each_keys: function (levels, f, k) {
      // each_keys provides a concise way of looping over the contents
      // of a arbitrary-depth nested KeyObj.
      //
      // each_keys(levels,f) takes an array "levels"
      // of "level names", and a 1-arg function f.  The "levels" array
      // determines the depth of the nesting in "obj" to be traversed.
      // f will be called once for each combination of
      // nested properties corresponding to the given levels.  The argument
      // to f is an object whose properties are the level names, and
      // whose values are the corresponding property names.  For example,
      // if the object x is defined by:
      //     x = new KeyObj();
      //     x.set_in(["med", "rcp45"], "one");
      //     x.set_in(["med", "rcp85"], "two");
      //     x.set_in(["max", "rcp45"], "three");
      //     x.set_in(["max", "rcp65"], "four");
      //     x.set_in(["max", "rcp85"], "five");
      //     x.set_in(["min"],          "six");
      // then
      //     x.each_keys(["stat", "scenario"], function(k) {
      //       console.log(k);
      //     });
      // will result in the output:
      //     { stat: 'med', scenario: 'rcp45' }
      //     { stat: 'med', scenario: 'rcp85' }
      //     { stat: 'max', scenario: 'rcp45' }
      //     { stat: 'max', scenario: 'rcp65' }
      //     { stat: 'max', scenario: 'rcp85' }
      //     { stat: 'min' }
      // whereas
      //     x.each_keys(["stat"], function(k) {
      //       console.log(k);
      //     });
      // will result in the output:
      //     { stat: 'med' }
      //     { stat: 'max' }
      //     { stat: 'min' }
      // Note that traversal of the nested structure stops, and
      // results in a call to the callback function f, either
      // when all the levels in the keys array have been
      // traversed, or when an object is reached that is not a
      // KeyObj. Note also that the callback function f does not
      // receive a reference to the KeyObj or the values stored
      // in it --- it just receives an object giving the names of
      // the property values down to the given number of levels.
      //
      // Note that the 3rd arg to each_keys is only used internally -- calls
      // to each_keys from outside its own implementation should only
      // pass in 2 args.
      if (k === undefined) {
        this.each_keys(levels, f, {});
        return;
      }
      if (levels.length === 0) {
        return;
      }
      var level = levels[0];
      var that = this;
      Object.keys(this).forEach(function (keyValue) {
        if (!that.hasOwnProperty(keyValue)) {
          return;
        }
        var d = {};
        d[level] = keyValue;
        k = $.extend({}, k, d);
        if (!that[keyValue].each_keys || levels.length === 1) {
          f(k);
        } else {
          that[keyValue].each_keys(levels.slice(1), f, k);
        }
      });
    }

  };

  function KeyObj() {
    this.__proto__ = KeyObjProto;
  }

  function get_historical_observed_data(obj) {
    var freq = (obj.options.frequency === 'annual') ? 'annual' : 'monthly';
    var elems = [$.extend(variable_config(obj.options.variable)['acis_elements'][freq], get_region_reduction(obj))];
    return $.ajax({
      url: obj.options.data_api_endpoint,
      type: "POST",
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      timeout: 60000,
      data: JSON.stringify($.extend({
        "sdate": "1950-01-01",
        "edate": "2013-12-31",
        // "edate": (String(new Date().getFullYear() - 1)),
        "grid": "livneh",
        "elems": elems
      }, get_region_parameters(obj)))
    })
      .then(function (response) {

        var data;

        if (obj.options.frequency === 'annual') {
          data = [];
          response.data.forEach(function (record) {
            if (undefined !== record[1][get_region_value(obj)] && String(record[1][get_region_value(obj)]) !== '-999' && String(record[1][get_region_value(obj)]) !== '') {
              data.push([record[0], Math.round((record[1][get_region_value(obj)]) * 10) / 10]);
            }
          });
          obj.dataurls.hist_obs = 'data:text/csv;base64,' + window.btoa(('year,' + variable_config(obj.options.variable).id + '\n' + data.join('\n')));
          return data
        }
        else if (obj.options.frequency === 'monthly' || obj.options.frequency === 'seasonal') {
          //then build output of [[month(1-12), weighted mean]].
          data = {
            '01': [],
            '02': [],
            '03': [],
            '04': [],
            '05': [],
            '06': [],
            '07': [],
            '08': [],
            '09': [],
            '10': [],
            '11': [],
            '12': []
          };
          response.data.forEach(function (record) {
            if (undefined !== record[1][get_region_value(obj)]) {
              data[record[0].slice(-2)].push(parseFloat(record[1][get_region_value(obj)]));
            }
          });
          //group monthly data by season
          if (obj.options.frequency === 'seasonal') {
            var seasons = {
              "01": ["12", "01", "02"],
              "04": ["03", "04", "05"],
              "07": ["06", "07", "08"],
              "10": ["09", "10", "11"]
            };
            data = Object.keys(seasons).reduce(function (acc, season) {
              acc[season] = [].concat(data[seasons[season][0]], data[seasons[season][1]], data[seasons[season][2]]);
              return acc;
            }, {});
          }
          var mean = Object.keys(data).reduce(function (acc, key) {
            acc[key] = Math.round((data[key].reduce(function (a, b) {
              return a + b;
            }) / data[key].length) * 10) / 10;
            return acc;
          }, {});
          // var median = Object.keys(data).reduce(function (acc, key) {
          //   data[key].sort(function (a, b) {
          //     return a - b;
          //   });
          //   var half = Math.floor(data[key].length / 2);
          //   if (data[key].length % 2)
          //     acc[key] = Math.round(data[key][half]* 10) / 10;
          //   else
          //     acc[key] = Math.round(((data[key][half - 1] + data[key][half]) / 2.0) * 10) / 10;
          //   return acc;
          // }, {});
          //return [[month, weighted mean]]
          var export_data = [];
          data = Object.keys(data).reduce(function (acc, key) {
            acc.push([parseInt(key), null, mean[key]]);
            export_data.push([parseInt(key), mean[key]]);
            return acc;
          }, []).sort(function (a, b) {
            return parseInt(a[0]) - parseInt(b[0])
          });
          export_data.sort(function (a, b) {
            return parseInt(a[0]) - parseInt(b[0])
          });
          obj.dataurls.hist_obs = 'data:text/csv;base64,' + window.btoa(('month,weighted_mean\n' + export_data.join('\n')));
          return data;

        }
      });
  }

  function get_loca_data(obj, grid, sdate, edate) {

    var freq = (obj.options.frequency === 'annual') ? 'annual' : 'monthly';
    var elems = [$.extend(variable_config(obj.options.variable)['acis_elements'][freq], get_region_reduction(obj))];

    return $.ajax({
      url: obj.options.data_api_endpoint,
      type: "POST",
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      data: JSON.stringify($.extend({
        "grid": grid,
        "sdate": String(sdate),
        "edate": String(edate),
        "elems": elems
      }, get_region_parameters(obj)))
    })
      .then(function (response) {
        var data = {};
        response.data.forEach(function (record) {
          if (undefined !== record[1][get_region_value(obj)] && String(record[1][get_region_value(obj)]) !== '-999' && String(record[1][get_region_value(obj)]) !== '') {
            data[record[0]] = record[1][get_region_value(obj)]
          }
        });
        return data;
      });
  }

  function get_historical_model_data(obj) {
    // var edate = (String(new Date().getFullYear())) + '-01-01';
    var edate = '2006-12-31';
    return $.when.apply($, [
      get_loca_data(obj, 'loca:wMean:rcp85', '1950-01-01', edate),
      get_loca_data(obj, 'loca:allMin:rcp85', '1950-01-01', edate),
      get_loca_data(obj, 'loca:allMax:rcp85', '1950-01-01', edate)
    ])
      .then(function (wMean, min, max) {
        var data = [];
        var export_data = [];
        for (var key = 1950; key <= 2006; key++) {
          var values = {};
          values.wMean = wMean.hasOwnProperty(key) ? Math.round(wMean[key] * 10) / 10 : null;
          values.min = min.hasOwnProperty(key) ? Math.round(min[key] * 10) / 10 : null;
          values.max = max.hasOwnProperty(key) ? Math.round(max[key] * 10) / 10 : null;
          //year,mean,min,max,?,?
          data.push([String(key), values.wMean, values.min, values.max, null, null]);
          export_data.push([String(key), values.wMean, values.min, values.max])
        }
        // Sort before returning
        data.sort(function (a, b) {
          return (a[0] > b[0]) - (a[0] < b[0])
        });
        export_data.sort(function (a, b) {
          return parseInt(a[0]) - parseInt(b[0])
        });
        obj.dataurls.hist_mod = 'data:text/csv;base64,' + window.btoa(('year,weighted_mean,min,max' + '\n' + export_data.join('\n')));
        export_data = [];
        return data
      });
  }

  function get_projected_model_data(obj) {
    var sdate;

    if (obj.options.frequency === 'annual') {
      // sdate = (String(new Date().getFullYear())) + '-01-01';
      sdate = '2006-01-01';
    }
    else {
      sdate = '2010-01-01';
    }

    return $.when.apply($, [
      get_loca_data(obj, 'loca:wMean:rcp45', sdate, '2099-12-31'),
      get_loca_data(obj, 'loca:allMin:rcp45', sdate, '2099-12-31'),
      get_loca_data(obj, 'loca:allMax:rcp45', sdate, '2099-12-31'),
      get_loca_data(obj, 'loca:wMean:rcp85', sdate, '2099-12-31'),
      get_loca_data(obj, 'loca:allMin:rcp85', sdate, '2099-12-31'),
      get_loca_data(obj, 'loca:allMax:rcp85', sdate, '2099-12-31')
    ])
      .then(function (wMean45, min45, max45, wMean85, min85, max85) {
        var data, export_data;
        var seasons = {
          "01": "01",
          "02": "01",
          "03": "04",
          "04": "04",
          "05": "04",
          "06": "07",
          "07": "07",
          "08": "07",
          "09": "10",
          "10": "10",
          "11": "10",
          "12": "01"
        };
        if (obj.options.frequency === 'annual') {
          data = [];
          export_data = [];
          // Extract values
          for (var key = 2006; key < 2100; key++) {
            var values = {};
            values.wMean45 = wMean45.hasOwnProperty(key) ? Math.round(wMean45[key] * 10) / 10 : null;
            values.min45 = min45.hasOwnProperty(key) ? Math.round(min45[key] * 10) / 10 : null;
            values.max45 = max45.hasOwnProperty(key) ? Math.round(max45[key] * 10) / 10 : null;
            values.wMean85 = wMean85.hasOwnProperty(key) ? Math.round(wMean85[key] * 10) / 10 : null;
            values.min85 = min85.hasOwnProperty(key) ? Math.round(min85[key] * 10) / 10 : null;
            values.max85 = max85.hasOwnProperty(key) ? Math.round(max85[key] * 10) / 10 : null;
            //year,rcp45mean,rcp45min,rcp45max,rcp45p10,rcp45p90,rcp85mean,rcp85min,rcp85max,rcp85p10,rcp85p90
            data.push([String(key), values.wMean45, values.min45, values.max45, null, null, values.wMean85, values.min85, values.max85, null, null]);
            export_data.push([String(key), values.wMean45, values.min45, values.max45, values.wMean85, values.min85, values.max85]);
          }
          // Sort before returning
          data.sort(function (a, b) {
            return (a[0] > b[0]) - (a[0] < b[0])
          });
          export_data.sort(function (a, b) {
            return parseInt(a[0]) - parseInt(b[0])
          });
          obj.dataurls.proj_mod = 'data:text/csv;base64,' + window.btoa(('year,' + 'rcp45_weighted_mean,rcp45_min,rcp45_max,rcp85_weighted mean,rcp85_min,rcp85_max' + '\n' + export_data.join('\n')));
          export_data = [];
          return data
        }
        else if (obj.options.frequency === 'monthly' || obj.options.frequency === 'seasonal') {
          data = {};
          [2025, 2050, 2075].forEach(function (yearRange) {
            data[yearRange] = {};
            ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
              .forEach(function (month) {
                var season_month = month;
                if (obj.options.frequency === 'seasonal') {
                  //for seasonal group by season, not month.
                  season_month = seasons[month];
                }
                if (undefined === data[yearRange][season_month]) {
                  data[yearRange][season_month] = {};
                }
                var datasets = {
                  'wMean45': wMean45,
                  'wMean85': wMean85,
                  'min45': min45,
                  'max45': max45,
                  'min85': min85,
                  'max85': max85
                };
                Object.keys(datasets).forEach(function (dataset) {
                  if (undefined === data[yearRange][season_month][dataset]) {
                    data[yearRange][season_month][dataset] = [];
                  }
                  for (var year = yearRange - 15; year < yearRange + 15; year++) {
                    var year_month = String(year) + '-' + String(month);
                    if (datasets[dataset].hasOwnProperty(year_month)) {
                      data[yearRange][season_month][dataset].push(datasets[dataset][year_month]);
                    }
                  }
                });
              });
          });
          // mean values by month
          Object.keys(data).forEach(function (yearRange) {
            Object.keys(data[yearRange]).forEach(function (month) {
              ['wMean45', 'wMean85', 'min45', 'min85', 'max45', 'max85'].forEach(function (valueName) {
                var length = data[yearRange][month][valueName].length;
                var sum = data[yearRange][month][valueName].reduce(function (acc, value) {
                  return acc + value;
                }, 0);
                data[yearRange][month][valueName] = sum / length;
              });
            });
          });
          // reformat to expected output
          // [ month,2025rcp45_max,2025rcp45_weighted_mean,2025rcp45_min,2025rcp45_p10,2025rcp45_p90,2025rcp85_max,2025rcp85_weighted_mean,2025rcp85_min,2025rcp85_p10,2025rcp85_p90,2050rcp45_max,2050rcp45_weighted_mean,2050rcp45_min,2050rcp45_p10,2050rcp45_p90,2050rcp85_max,2050rcp85_weighted_mean,2050rcp85_min,2050rcp85_p10,2050rcp85_p90,2075rcp45_max,2075rcp45_weighted_mean,2075rcp45_min,2075rcp45_p10,2075rcp45_p90,2075rcp85_max,2075rcp85_weighted_mean,2075rcp85_min,2075rcp85_p10,2075rcp85_p90 ]
          var dataByMonth = {};
          var months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
          if (obj.options.frequency === 'seasonal') {
            months = ['01', '04', '07', '10']
          }
          months.forEach(function (month) {
            dataByMonth[month] = {};
            [2025, 2050, 2075].forEach(function (yearRange) {
              ['45', '85'].forEach(function (scenario) {
                ['max', 'wMean', 'min'].forEach(function (valueName) {
                  dataByMonth[month][String(yearRange) + 'rcp' + String(scenario) + '_' + String(valueName)] = data[yearRange][month][String(valueName) + String(scenario)];
                });
              });
            });
          });
          var export_data = [];
          var result = [];
          Object.keys(dataByMonth).forEach(function (month) {
            result.push([month,
              dataByMonth[month]['2025rcp45_max'],
              dataByMonth[month]['2025rcp45_wMean'],
              dataByMonth[month]['2025rcp45_min'],
              null,
              null,
              dataByMonth[month]['2025rcp85_max'],
              dataByMonth[month]['2025rcp85_wMean'],
              dataByMonth[month]['2025rcp85_min'],
              null,
              null,
              dataByMonth[month]['2050rcp45_max'],
              dataByMonth[month]['2050rcp45_wMean'],
              dataByMonth[month]['2050rcp45_min'],
              null,
              null,
              dataByMonth[month]['2050rcp85_max'],
              dataByMonth[month]['2050rcp85_wMean'],
              dataByMonth[month]['2050rcp85_min'],
              null,
              null,
              dataByMonth[month]['2075rcp45_max'],
              dataByMonth[month]['2075rcp45_wMean'],
              dataByMonth[month]['2075rcp45_min'],
              null,
              null,
              dataByMonth[month]['2075rcp85_max'],
              dataByMonth[month]['2075rcp85_wMean'],
              dataByMonth[month]['2075rcp85_min'],
              null,
              null]);
            export_data.push([month,
              Math.round(dataByMonth[month]['2025rcp45_max'] * 10) / 10,
              Math.round(dataByMonth[month]['2025rcp45_wMean'] * 10) / 10,
              Math.round(dataByMonth[month]['2025rcp45_min'] * 10) / 10,
              Math.round(dataByMonth[month]['2025rcp85_max'] * 10) / 10,
              Math.round(dataByMonth[month]['2025rcp85_wMean'] * 10) / 10,
              Math.round(dataByMonth[month]['2025rcp85_min'] * 10) / 10,
              Math.round(dataByMonth[month]['2050rcp45_max'] * 10) / 10,
              Math.round(dataByMonth[month]['2050rcp45_wMean'] * 10) / 10,
              Math.round(dataByMonth[month]['2050rcp45_min'] * 10) / 10,
              Math.round(dataByMonth[month]['2050rcp85_max'] * 10) / 10,
              Math.round(dataByMonth[month]['2050rcp85_wMean'] * 10) / 10,
              Math.round(dataByMonth[month]['2050rcp85_min'] * 10) / 10,
              Math.round(dataByMonth[month]['2075rcp45_max'] * 10) / 10,
              Math.round(dataByMonth[month]['2075rcp45_wMean'] * 10) / 10,
              Math.round(dataByMonth[month]['2075rcp45_min'] * 10) / 10,
              Math.round(dataByMonth[month]['2075rcp85_max'] * 10) / 10,
              Math.round(dataByMonth[month]['2075rcp85_wMean'] * 10) / 10,
              Math.round(dataByMonth[month]['2075rcp85_min'] * 10) / 10
            ]);
          });

          // Sort before returning
          result.sort(function (a, b) {
            return (a[0] > b[0]) - (a[0] < b[0])
          });
          export_data.sort(function (a, b) {
            return parseInt(a[0]) - parseInt(b[0])
          });
          obj.dataurls.proj_mod = 'data:text/csv;base64,' + window.btoa((
            'month,2025_rcp45_max,2025_rcp45_weighted_mean,2025_rcp45_min,2025_rcp85_max,2025_rcp85_weighted_mean,2025_rcp85_min,2050_rcp45_max,2050_rcp45_weighted_mean,2050_rcp45_min,2050_rcp85_max,2050_rcp85_weighted_mean,2050_rcp85_min,2075_rcp45_max,2075_rcp45_weighted_mean,2075_rcp45_min,2075_rcp85_max,2075_rcp85_weighted_mean,2075_rcp85_min\n' + export_data.join('\n')));
          return result
        }
      });
  }


  function average(data, first_year, last_year) {
    //    [[1921,1.3,33.5,2.5,...],
    //     [1922,1.3,33.5,2.5,...],
    //     ...]
    var sum = 0;
    var n = 0;
    data.forEach(function (row) {
      if (row[0] >= first_year && row[0] <= last_year) {
        sum += row[1];
        ++n;
      }
    });
    return sum / n;
  }

  function anomalies(data, ref) {
    return data.map(function (row) {
      var arow = [row[0]];
      var i;
      for (i = 1; i < row.length; ++i) {
        if (row[i] === null){
          arow[i] = row[i];
          continue;
        }
        arow[i] = row[i] - ref;
      }
      return arow;
    });
  }

  function percent_anomalies(data, ref) {
    return data.map(function (row) {
      var arow = [row[0]];
      var i;
      for (i = 1; i < row.length; ++i) {
        if (row[i] === null){
          arow[i] = row[i];
          continue;
        }
        arow[i] = 100 * row[i] / ref;
      }
      return arow;
    });
  }

  function band_plot(x_axis, x, y_axis, y0, y1, fill_color, fill_opacity) {
    var obj = {
      visible: false,
      horizontalaxis: {}, // populated below
      verticalaxis: {}, // populated below
      style: "band",
      options: {
        fillcolor: fill_color,
        fillopacity: fill_opacity,
        linewidth: 0
      }
    };
    // must use [] notation here since keys are variables:
    obj.horizontalaxis[x_axis] = x;
    obj.verticalaxis[y_axis] = [y0, y1];
    return obj;
  }

  function bar_plot_based_at(x_axis, x, y_axis, y, ref) {
    // (colors are hard-coded in this one, but not for any good reason)
    var obj = {
      visible: false,
      horizontalaxis: {}, // populated below
      verticalaxis: {}, // populated below
      style: "bar",
      options: {
        barbase: ref,
        fillcolor: [{"value": "0xCD6760", "min": ref},
          {"value": "0x6194C8", "max": ref}],
        barwidth: 1,
        baroffset: 0.5,
        linecolor: "#000000",
        hidelines: 999
      }
    };
    // must use [] notation here since keys are variables:
    obj.horizontalaxis[x_axis] = x;
    obj.verticalaxis[y_axis] = y;
    return obj;
  }

  function line_plot(x_axis, x, y_axis, y, line_color, dashed) {
    var obj = {
      visible: false,
      horizontalaxis: {}, // populated below
      verticalaxis: {}, // populated below
      style: "line",
      options: {
        linecolor: line_color,
        linestroke: dashed ? "dashed" : "solid",
        linewidth: 2
      }
    };
    // must use [] notation here since keys are variables:
    obj.horizontalaxis[x_axis] = x;
    obj.verticalaxis[y_axis] = y;
    return obj;
  }

  function range_bar_plot(x_axis, x, y_axis, y0, y1, bar_color, line_color, baroffset, fillopacity) {
    var obj = {
      horizontalaxis: {}, // populated below
      verticalaxis: {}, // populated below
      style: "rangebar",
      options: {
        fillcolor: bar_color,
        fillopacity: fillopacity,
        barwidth: 0.5,
        baroffset: baroffset,
        linecolor: line_color
      }
    };
    // must use [] notation here since keys are variables:
    obj.horizontalaxis[x_axis] = x;
    obj.verticalaxis[y_axis] = [y0, y1];
    return obj;
  }

  var colors = {
    reds: {
      line: '#f5442d',
      innerBand: '#f65642',
      outerBand: '#f76956'
    },
    blues: {
      line: '#0058cf',
      innerBand: '#1968d3',
      outerBand: '#3279d8'
    },
    grays: {
      innerBand: "#aaaaaa",
      outerBand: "#bbbbbb"
      //original hard-coded values
      //innerBand: "#999999",
      //outerBand: "#cccccc"
    },
    opacities: {
      ann_hist_1090: 0.6,
      ann_hist_minmax: 0.6,
      ann_proj_1090: 0.5,
      ann_proj_minmax: 0.5,
      mon_proj_1090: 0.5,
      mon_proj_minmax: 0.5
      //original hard-coded values
      //ann_hist_1090: 0.5,
      //ann_hist_minmax: 0.7,
      //ann_proj_1090: 0.3,
      //ann_proj_minmax: 0.3,
      //mon_proj_1090: 0.3,
      //mon_proj_minmax: 0.3,
    }
  };

  var mugl = {
    legend: false,
    window: {
      border: 0,
      padding: 0,
      margin: 0
    }, /*
        background: {
            img : {
               src: "demo.png",
               anchor: [0, 0],
               base: [0, 0],
               frame: "padding"
          }
        }, */
    plotarea: {
      marginleft: 55,
      marginright: 0
    },
    horizontalaxis: [{
      id: "x_annual",
      min: 1949.5,
      max: 2099.5,
      title: false, // { text: "Year" },
      visible: true,
      labels: {
        label: [
          {format: "%1d", spacing: [100, 50, 20, 10, 5, 2, 1]}
        ]
      },
      pan: {
        min: 1949.5,
        max: 2099.5
      },
      zoom: {
        min: "10Y",
        max: "151Y"
      },
      grid: true
    }, {
      id: "x_monthly",
      min: -2,
      max: 12,
      title: false, // { text: "Month" },
      visible: false,
      labels: {
        label: [{
          format: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov"],
          spacing: [1]
        }]
      },
      pan: {
        allowed: "no"
      },
      zoom: {
        allowed: "no"
      },
      grid: true
    }, {
      id: "x_seasonal",
      min: -0.5,
      max: 3.5,
      title: false, // { text: "Season" },
      visible: false,
      labels: {
        label: [{
          format: ["Winter", "Spring", "Summer", /* or */ "Fall"],
          /*        all you have to do is call... */
          spacing: [1]
        }]
      },
      pan: {
        allowed: "no"
      },
      zoom: {
        allowed: "no"
      }
      /*            pan: {
                    min: -0.5,
                    max: 3.5
                  },
                  zoom: {
                    min: 1,
                    max: 4
                  }
      */
    }],
    verticalaxis: {
      id: "y",
      min: 0,
      max: 2000,
      grid: true,
      title: {text: " ", angle: 90, anchor: [0, -1], position: [-40, 0]},
      visible: true,
      labels: {
        label: [
          {format: "%1d", spacing: [10000, 5000, 2000, 1000, 500, 200, 100, 50, 20, 10, 5, 2, 1]},
          {format: "%.1f", spacing: [0.5, 0.2, 0.1]},
          {format: "%.2f", spacing: [0.05, 0.02, 0.01]}
        ]
      },
      pan: {
        allowed: "yes",
        min: -7500.5,
        max: 10000.5
      },
      zoom: {
        allowed: "yes",
        min: 0.05,
        max: 10000
      }
    },
    plots: [
      //
      // annual plots:
      //
      band_plot("x_annual", "annual_hist_mod_x", "y", "annual_hist_mod_min", "annual_hist_mod_max", colors.grays.outerBand, colors.opacities.ann_hist_minmax),
      band_plot("x_annual", "annual_hist_mod_x", "y", "annual_hist_mod_p10", "annual_hist_mod_p90", colors.grays.innerBand, colors.opacities.ann_hist_1090),
      band_plot("x_annual", "annual_proj_mod_x", "y", "annual_proj_mod_min_rcp45", "annual_proj_mod_max_rcp45", colors.blues.outerBand, colors.opacities.ann_proj_minmax),
      band_plot("x_annual", "annual_proj_mod_x", "y", "annual_proj_mod_p10_rcp45", "annual_proj_mod_p90_rcp45", colors.blues.innerBand, colors.opacities.ann_proj_1090),
      band_plot("x_annual", "annual_proj_mod_x", "y", "annual_proj_mod_min_rcp85", "annual_proj_mod_max_rcp85", colors.reds.outerBand, colors.opacities.ann_proj_minmax),
      band_plot("x_annual", "annual_proj_mod_x", "y", "annual_proj_mod_p10_rcp85", "annual_proj_mod_p90_rcp85", colors.reds.innerBand, colors.opacities.ann_proj_1090),
      bar_plot_based_at("x_annual", "annual_hist_obs_x", "y", "annual_hist_obs_y", 0),
      line_plot("x_annual", "annual_hist_mod_x", "y", "annual_hist_mod_med", "#000000"),
      line_plot("x_annual", "annual_proj_mod_x", "y", "annual_proj_mod_med_rcp45", colors.blues.line),
      line_plot("x_annual", "annual_proj_mod_x", "y", "annual_proj_mod_med_rcp85", colors.reds.line),
      //
      // monthly plots:
      //
      line_plot("x_monthly", "monthly_hist_obs_x", "y", "monthly_hist_obs_med", "#000000"),
      // Hiding historical range for now
      //line_plot("x_monthly", "monthly_hist_obs_x", "y", "monthly_hist_obs_p10", "#000000", true)
      //line_plot("x_monthly", "monthly_hist_obs_x", "y", "monthly_hist_obs_p90", "#000000", true)

      band_plot("x_monthly", "monthly_proj_mod_x", "y", "monthly_proj_mod_min_rcp45_2025", "monthly_proj_mod_max_rcp45_2025", colors.blues.innerBand, colors.opacities.mon_proj_minmax),
      band_plot("x_monthly", "monthly_proj_mod_x", "y", "monthly_proj_mod_min_rcp85_2025", "monthly_proj_mod_max_rcp85_2025", colors.reds.innerBand, colors.opacities.mon_proj_minmax),
      band_plot("x_monthly", "monthly_proj_mod_x", "y", "monthly_proj_mod_p10_rcp45_2025", "monthly_proj_mod_p90_rcp45_2025", colors.blues.innerBand, colors.opacities.mon_proj_1090),
      band_plot("x_monthly", "monthly_proj_mod_x", "y", "monthly_proj_mod_p10_rcp85_2025", "monthly_proj_mod_p90_rcp85_2025", colors.reds.innerBand, colors.opacities.mon_proj_1090),
      line_plot("x_monthly", "monthly_proj_mod_x", "y", "monthly_proj_mod_med_rcp45_2025", colors.blues.outerBand),
      line_plot("x_monthly", "monthly_proj_mod_x", "y", "monthly_proj_mod_med_rcp85_2025", colors.reds.line),

      band_plot("x_monthly", "monthly_proj_mod_x", "y", "monthly_proj_mod_min_rcp45_2050", "monthly_proj_mod_max_rcp45_2050", colors.blues.innerBand, colors.opacities.mon_proj_minmax),
      band_plot("x_monthly", "monthly_proj_mod_x", "y", "monthly_proj_mod_min_rcp85_2050", "monthly_proj_mod_max_rcp85_2050", colors.reds.innerBand, colors.opacities.mon_proj_minmax),
      band_plot("x_monthly", "monthly_proj_mod_x", "y", "monthly_proj_mod_p10_rcp45_2050", "monthly_proj_mod_p90_rcp45_2050", colors.blues.innerBand, colors.opacities.mon_proj_1090),
      band_plot("x_monthly", "monthly_proj_mod_x", "y", "monthly_proj_mod_p10_rcp85_2050", "monthly_proj_mod_p90_rcp85_2050", colors.reds.innerBand, colors.opacities.mon_proj_1090),
      line_plot("x_monthly", "monthly_proj_mod_x", "y", "monthly_proj_mod_med_rcp45_2050", colors.blues.outerBand),
      line_plot("x_monthly", "monthly_proj_mod_x", "y", "monthly_proj_mod_med_rcp85_2050", colors.reds.line),

      band_plot("x_monthly", "monthly_proj_mod_x", "y", "monthly_proj_mod_min_rcp45_2075", "monthly_proj_mod_max_rcp45_2075", colors.blues.innerBand, colors.opacities.mon_proj_minmax),
      band_plot("x_monthly", "monthly_proj_mod_x", "y", "monthly_proj_mod_min_rcp85_2075", "monthly_proj_mod_max_rcp85_2075", colors.reds.innerBand, colors.opacities.mon_proj_minmax),
      band_plot("x_monthly", "monthly_proj_mod_x", "y", "monthly_proj_mod_p10_rcp45_2075", "monthly_proj_mod_p90_rcp45_2075", colors.blues.innerBand, colors.opacities.mon_proj_1090),
      band_plot("x_monthly", "monthly_proj_mod_x", "y", "monthly_proj_mod_p10_rcp85_2075", "monthly_proj_mod_p90_rcp85_2075", colors.reds.innerBand, colors.opacities.mon_proj_1090),
      line_plot("x_monthly", "monthly_proj_mod_x", "y", "monthly_proj_mod_med_rcp45_2075", colors.blues.outerBand),
      line_plot("x_monthly", "monthly_proj_mod_x", "y", "monthly_proj_mod_med_rcp85_2075", colors.reds.line),

      //
      // seasonal plots
      //
      // Hiding historical range for now
      //range_bar_plot("x_seasonal", "seasonal_hist_obs_x", "y", "seasonal_hist_obs_p10", "seasonal_hist_obs_p90",  "#cccccc", "#cccccc", 0.5, 0.7);
      range_bar_plot("x_seasonal", "seasonal_proj_mod_x",
        "y", "seasonal_proj_mod_min_rcp45_2025", "seasonal_proj_mod_max_rcp45_2025", colors.blues.innerBand, colors.blues.innerBand, 0.25, 0.4),
      range_bar_plot("x_seasonal", "seasonal_proj_mod_x",
        "y", "seasonal_proj_mod_min_rcp85_2025", "seasonal_proj_mod_max_rcp85_2025", colors.reds.innerBand, colors.reds.innerBand, 0.0, 0.4),
      range_bar_plot("x_seasonal", "seasonal_proj_mod_x",
        "y", "seasonal_proj_mod_p10_rcp45_2025", "seasonal_proj_mod_p90_rcp45_2025", colors.blues.innerBand, colors.blues.innerBand, 0.25, 0.4),
      range_bar_plot("x_seasonal", "seasonal_proj_mod_x",
        "y", "seasonal_proj_mod_p10_rcp85_2025", "seasonal_proj_mod_p90_rcp85_2025", colors.reds.innerBand, colors.reds.innerBand, 0.0, 0.4),
      range_bar_plot("x_seasonal", "seasonal_proj_mod_x",
        "y", "seasonal_proj_mod_min_rcp45_2050", "seasonal_proj_mod_max_rcp45_2050", colors.blues.innerBand, colors.blues.innerBand, 0.25, 0.4),
      range_bar_plot("x_seasonal", "seasonal_proj_mod_x",
        "y", "seasonal_proj_mod_min_rcp85_2050", "seasonal_proj_mod_max_rcp85_2050", colors.reds.innerBand, colors.reds.innerBand, 0.0, 0.4),
      range_bar_plot("x_seasonal", "seasonal_proj_mod_x",
        "y", "seasonal_proj_mod_p10_rcp45_2050", "seasonal_proj_mod_p90_rcp45_2050", colors.blues.innerBand, colors.blues.innerBand, 0.25, 0.4),
      range_bar_plot("x_seasonal", "seasonal_proj_mod_x",
        "y", "seasonal_proj_mod_p10_rcp85_2050", "seasonal_proj_mod_p90_rcp85_2050", colors.reds.innerBand, colors.reds.innerBand, 0.0, 0.4),
      range_bar_plot("x_seasonal", "seasonal_proj_mod_x",
        "y", "seasonal_proj_mod_min_rcp45_2075", "seasonal_proj_mod_max_rcp45_2075", colors.blues.innerBand, colors.blues.innerBand, 0.25, 0.4),
      range_bar_plot("x_seasonal", "seasonal_proj_mod_x",
        "y", "seasonal_proj_mod_min_rcp85_2075", "seasonal_proj_mod_max_rcp85_2075", colors.reds.innerBand, colors.reds.innerBand, 0.0, 0.4),
      range_bar_plot("x_seasonal", "seasonal_proj_mod_x",
        "y", "seasonal_proj_mod_p10_rcp45_2075", "seasonal_proj_mod_p90_rcp45_2075", colors.blues.innerBand, colors.blues.innerBand, 0.25, 0.4),
      range_bar_plot("x_seasonal", "seasonal_proj_mod_x",
        "y", "seasonal_proj_mod_p10_rcp85_2075", "seasonal_proj_mod_p90_rcp85_2075", colors.reds.innerBand, colors.reds.innerBand, 0.0, 0.4),

      range_bar_plot("x_seasonal", "seasonal_hist_obs_x",
        "y", "seasonal_hist_obs_med", "seasonal_hist_obs_med", "#000000", "#000000", 0.5, 1.0),

      range_bar_plot("x_seasonal", "seasonal_proj_mod_x",
        "y", "seasonal_proj_mod_med_rcp45_2025", "seasonal_proj_mod_med_rcp45_2025", "#0000ff", "#0000ff", 0.25, 1.0),
      range_bar_plot("x_seasonal", "seasonal_proj_mod_x",
        "y", "seasonal_proj_mod_med_rcp85_2025", "seasonal_proj_mod_med_rcp85_2025", colors.reds.line, colors.reds.line, 0.0, 1.0),
      range_bar_plot("x_seasonal", "seasonal_proj_mod_x",
        "y", "seasonal_proj_mod_med_rcp45_2050", "seasonal_proj_mod_med_rcp45_2050", "#0000ff", "#0000ff", 0.25, 1.0),
      range_bar_plot("x_seasonal", "seasonal_proj_mod_x",
        "y", "seasonal_proj_mod_med_rcp85_2050", "seasonal_proj_mod_med_rcp85_2050", colors.reds.line, colors.reds.line, 0.0, 1.0),
      range_bar_plot("x_seasonal", "seasonal_proj_mod_x",
        "y", "seasonal_proj_mod_med_rcp45_2075", "seasonal_proj_mod_med_rcp45_2075", "#0000ff", "#0000ff", 0.25, 1.0),
      range_bar_plot("x_seasonal", "seasonal_proj_mod_x",
        "y", "seasonal_proj_mod_med_rcp85_2075", "seasonal_proj_mod_med_rcp85_2075", colors.reds.line, colors.reds.line, 0.0, 1.0)
    ],
    data: [{
      variables: [{id: "annual_hist_obs_x"},
        {id: "annual_hist_obs_y"}],
      values: [[-9999, 0]]
    }, {
      variables: [{id: "annual_hist_mod_x"},
        {id: "annual_hist_mod_med"},
        {id: "annual_hist_mod_min"},
        {id: "annual_hist_mod_max"},
        {id: "annual_hist_mod_p10"},
        {id: "annual_hist_mod_p90"}],
      values: [[-9999, 0, 0, 0, 0, 0, 0]]
    }, {
      variables: [{id: "annual_proj_mod_x"},
        {id: "annual_proj_mod_med_rcp45"},
        {id: "annual_proj_mod_min_rcp45"},
        {id: "annual_proj_mod_max_rcp45"},
        {id: "annual_proj_mod_p10_rcp45"},
        {id: "annual_proj_mod_p90_rcp45"},
        {id: "annual_proj_mod_med_rcp85"},
        {id: "annual_proj_mod_min_rcp85"},
        {id: "annual_proj_mod_max_rcp85"},
        {id: "annual_proj_mod_p10_rcp85"},
        {id: "annual_proj_mod_p90_rcp85"}],
      values: [[-9999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]
    }, {
      variables: [{id: "monthly_hist_obs_x"},
        {id: "monthly_hist_obs_mean30"},
        {id: "monthly_hist_obs_med"}],
      values: [[-9999, 0, 0]],
      repeat: {period: 12}
    }, {
      variables: [{id: "monthly_proj_mod_x"},
        {id: "monthly_proj_mod_max_rcp45_2025"},
        {id: "monthly_proj_mod_med_rcp45_2025"},
        {id: "monthly_proj_mod_min_rcp45_2025"},
        {id: "monthly_proj_mod_p10_rcp45_2025"},
        {id: "monthly_proj_mod_p90_rcp45_2025"},
        {id: "monthly_proj_mod_max_rcp85_2025"},
        {id: "monthly_proj_mod_med_rcp85_2025"},
        {id: "monthly_proj_mod_min_rcp85_2025"},
        {id: "monthly_proj_mod_p10_rcp85_2025"},
        {id: "monthly_proj_mod_p90_rcp85_2025"},
        {id: "monthly_proj_mod_max_rcp45_2050"},
        {id: "monthly_proj_mod_med_rcp45_2050"},
        {id: "monthly_proj_mod_min_rcp45_2050"},
        {id: "monthly_proj_mod_p10_rcp45_2050"},
        {id: "monthly_proj_mod_p90_rcp45_2050"},
        {id: "monthly_proj_mod_max_rcp85_2050"},
        {id: "monthly_proj_mod_med_rcp85_2050"},
        {id: "monthly_proj_mod_min_rcp85_2050"},
        {id: "monthly_proj_mod_p10_rcp85_2050"},
        {id: "monthly_proj_mod_p90_rcp85_2050"},
        {id: "monthly_proj_mod_max_rcp45_2075"},
        {id: "monthly_proj_mod_med_rcp45_2075"},
        {id: "monthly_proj_mod_min_rcp45_2075"},
        {id: "monthly_proj_mod_p10_rcp45_2075"},
        {id: "monthly_proj_mod_p90_rcp45_2075"},
        {id: "monthly_proj_mod_max_rcp85_2075"},
        {id: "monthly_proj_mod_med_rcp85_2075"},
        {id: "monthly_proj_mod_min_rcp85_2075"},
        {id: "monthly_proj_mod_p10_rcp85_2075"},
        {id: "monthly_proj_mod_p90_rcp85_2075"}],
      values: [[-9999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
      repeat: {period: 12}
    }, {
      variables: [{id: "seasonal_hist_obs_x"},
        {id: "seasonal_hist_obs_mean30"},
        {id: "seasonal_hist_obs_med"}],
      values: [[-9999, 0, 0]],
      repeat: {period: 4}
    }, {
      variables: [{id: "seasonal_proj_mod_x"},
        {id: "seasonal_proj_mod_max_rcp45_2025"},
        {id: "seasonal_proj_mod_med_rcp45_2025"},
        {id: "seasonal_proj_mod_min_rcp45_2025"},
        {id: "seasonal_proj_mod_p10_rcp45_2025"},
        {id: "seasonal_proj_mod_p90_rcp45_2025"},
        {id: "seasonal_proj_mod_max_rcp85_2025"},
        {id: "seasonal_proj_mod_med_rcp85_2025"},
        {id: "seasonal_proj_mod_min_rcp85_2025"},
        {id: "seasonal_proj_mod_p10_rcp85_2025"},
        {id: "seasonal_proj_mod_p90_rcp85_2025"},
        {id: "seasonal_proj_mod_max_rcp45_2050"},
        {id: "seasonal_proj_mod_med_rcp45_2050"},
        {id: "seasonal_proj_mod_min_rcp45_2050"},
        {id: "seasonal_proj_mod_p10_rcp45_2050"},
        {id: "seasonal_proj_mod_p90_rcp45_2050"},
        {id: "seasonal_proj_mod_max_rcp85_2050"},
        {id: "seasonal_proj_mod_med_rcp85_2050"},
        {id: "seasonal_proj_mod_min_rcp85_2050"},
        {id: "seasonal_proj_mod_p10_rcp85_2050"},
        {id: "seasonal_proj_mod_p90_rcp85_2050"},
        {id: "seasonal_proj_mod_max_rcp45_2075"},
        {id: "seasonal_proj_mod_med_rcp45_2075"},
        {id: "seasonal_proj_mod_min_rcp45_2075"},
        {id: "seasonal_proj_mod_p10_rcp45_2075"},
        {id: "seasonal_proj_mod_p90_rcp45_2075"},
        {id: "seasonal_proj_mod_max_rcp85_2075"},
        {id: "seasonal_proj_mod_med_rcp85_2075"},
        {id: "seasonal_proj_mod_min_rcp85_2075"},
        {id: "seasonal_proj_mod_p10_rcp85_2075"},
        {id: "seasonal_proj_mod_p90_rcp85_2075"}],
      values: [[-9999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
      repeat: {period: 4}
    }]
  };

  function show_spinner($div) {
    hide_spinner($div);
    var style = "<style>.cwg-spinner { margin-top: -2.5rem; border-radius: 100%;border-style: solid;border-width: 0.25rem;height: 5rem;width: 5rem;animation: basic 1s infinite linear; border-color: rgba(0, 0, 0, 0.2);border-top-color: rgba(0, 0, 0, 1); }@keyframes basic {0%   { transform: rotate(0); }100% { transform: rotate(359.9deg); }} .cwg-spinner-wrapper {display:flex; align-items: center; justify-content: center; }</style>";
    $("<div class='cwg-spinner-wrapper'><div class='cwg-spinner'></div></div>").css({
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      zIndex: 1000000
    }).append(style).appendTo($div.css("position", "relative"));
  }

  function hide_spinner($div) {
    $div.children('.cwg-spinner-wrapper').remove();
  }

  function is_plot_visible(opts, frequency, regime, stat, scenario, timeperiod) {
    if (opts.frequency !== frequency) {
      return false;
    }
    if (frequency === "annual") {
      if (regime === "hist_obs") {
        return opts.histobs;
      }
      if (regime === "hist_mod") {
        if (stat === "med") {
          return opts.histmod && opts.hmedian;
        } else {
          if (opts.hrange !== stat && opts.hrange !== "both") {
            return false;
          }
          return opts.histmod;
        }
      }
      // frequency==="annual" && regime==="proj_mod":
      if (opts.scenario !== scenario && opts.scenario !== "both") {
        return false;
      }
      if (stat === "med") {
        return opts.pmedian;
      }
      if (opts.prange !== stat && opts.prange !== "both") {
        return false;
      }
      return true;
    } else {
      if (regime === "hist_obs") {
        return opts.histobs;
      }
      if (regime === "hist_mod") {
        return false;
      }
      // frequency==="monthly/seasonal" && regime==="proj_mod":
      if (opts.timeperiod !== timeperiod) {
        return false;
      }
      if (opts.scenario !== scenario && opts.scenario !== "both") {
        return false;
      }
      if (stat === "med") {
        return opts.pmedian;
      }
      if (opts.prange !== stat && opts.prange !== "both") {
        return false;
      }
      return true;
    }
  }

  function set_plot_visibilities(obj) {
    var opts = obj.options;
    obj.plots.each_keys(["frequency", "regime", "stat", "scenario", "timeperiod"], function (k) {
      obj.plots.get_in([k.frequency, k.regime, k.stat, k.scenario, k.timeperiod]).visible(
        is_plot_visible(opts, k.frequency, k.regime, k.stat, k.scenario, k.timeperiod)
      );
    });
  }


//        'div'          : "div#widget",         // jquery-style selector for the dom element that you want the graph to appear in
//        'county'         : selectedCounty,       // 5-character fips code for county
//        'frequency'    : selectedFrequency,    // time frequency of graph to display ("annual", "monthly", or "seasonal")
//        'timeperiod'   : selectedTimePeriod,   // time period center for monthly/seasonal graphs ("2025", "2050", or "2075"); only
//                                                  relevant for monthly or seasonal frequency)
//        'variable'     : selectedVariable,     // name of variable to display; see climate-widget-graph.js for list of variables
//        'scenario'     : selectedScenario,     // name of scenario to display: "both", "rcp45", or "rcp85"
//        'presentation' : selectedPresentation  // name of presentation; "absolute" or "anomaly" (only relevant for annual frequency)

//        'div'           :  "div#widget",         // jquery-style selector for the dom element that you want the graph to appear in
//        'dataprefix'    : 'http://climate-widget-data.nemac.org/data',
//        'font'          : 'Roboto',
//        'frequency'     :  $('#frequency').val(),    // time frequency of graph to display ("annual", "monthly", or "seasonal")
//        'timeperiod'    :  selectedTimePeriod,   // time period center for monthly/seasonal graphs ("2025", "2050", or "2075")
//        'county'          :  selectedCounty,       // 5-character fips code for county (as a string)
//        'state'          :  selectedState,       // 2-character abbreviation code for state (as a string)
//        'variable'      :  selectedVariable,     // name of variable to display; see climate-widget-graph.js for list of variables
//        'scenario'      :  selectedScenario,     // name of scenario to display; both, rcp45, or rcp85
//        'presentation'  :  selectedPresentation  // name of presentation; absolute or anomaly with respect to a baseline value

// required:
//   dataprefix
//   state or county
//
// optional, but no default provided:
//   font  (defaults to whatever the browser's default canvas font is)
//
// optional, with defaults provided:
//   unitsystem        ("english")
//   frequency         ("annual")
//   variable          ("tmax")
//   presentation      ("absolute")
//   scenario          ("both")
//   timeperiod        ("2025")
  var climate_widget_graph = function (orig_options) {
    var convertArray = window.multigraph.core.ArrayData.stringArrayToDataValuesArray;
    var obj = {
      orig_options: $.extend({}, orig_options),
      options: {
        // default values:
        unitsystem: defaultUnitSystem,
        variable: "tmax",
        frequency: "annual",
        scenario: "both",
        timeperiod: "2025",
        presentation: "absolute",
        hrange: "minmax", // deprecated
        prange: "minmax", // deprecated
        pmedian: false,
        hmedian: false,
        histobs: true,
        histmod: true,
        yzoom: true,
        ypan: true,
        data_api_endpoint: 'https://grid2.rcc-acis.org/GridData'
        //font: no default for this one; defaults to canvas's default font
        //dataprefix:  no default for this one; it's required
        //county:
        //state:
      },
      $div: $(orig_options.div)
    };

    if (!obj.orig_options.dataprefix) {
      throw new Error("climate_widget_graph: property 'dataprefix' is missing");
    }
    if (obj.orig_options.dataprefix.endsWith("/")) {
      obj.orig_options.dataprefix = obj.orig_options.dataprefix.replace(/\/$/, "");
    }
    obj.$div.empty();
    $('.errorDisplayDetails').remove();
    obj.$div.append("<div class='graph' style='width: 100%; height: 100%;'></div>");
    obj.$graphdiv = obj.$div.find('div.graph');
    obj.$graphdiv.multigraph({muglString: mugl, noscroll: true});
    obj.update = function (delta) {
      if (typeof delta.pmedian === "string") {
        delta.pmedian = delta.pmedian.toLowerCase() === "true";
      }
      if (typeof delta.hmedian === "string") {
        delta.hmedian = delta.hmedian.toLowerCase() === "true";
      }
      if (typeof delta.histobs === "string") {
        delta.histobs = delta.histobs.toLowerCase() === "true";
      }
      if (typeof delta.histmod === "string") {
        delta.histmod = delta.histmod.toLowerCase() === "true";
      }
      if (typeof delta.yzoom === "string") {
        delta.yzoom = delta.yzoom.toLowerCase() === "true";
      }
      if (typeof delta.ypan === "string") {
        delta.ypan = delta.ypan.toLowerCase() === "true";
      }

      var old_options = $.extend({}, obj.options);
      obj.options = $.extend({}, obj.options, delta || {});

      set_plot_visibilities(obj);

      if (obj.options.yzoom !== old_options.yzoom) {
        //console.log('yzoom changed');
        obj.axes.y.zoom().allowed(obj.options.yzoom);
        //console.log(obj.axes.y.zoom().allowed());
      }
      if (obj.options.ypan !== old_options.ypan) {
        //console.log('ypan changed');
        obj.axes.y.pan().allowed(obj.options.ypan);
        //console.log(obj.axes.y.pan().allowed());
      }

      // if font changed, set it in all the relevant places
      if (obj.options.font !== old_options.font) {
        var i, j;
        for (i = 0; i < obj.m.graphs().at(0).axes().size(); ++i) {
          var axis = obj.m.graphs().at(0).axes().at(i);
          if (axis.title()) {
            axis.title().font("14px " + obj.options.font);
          }
          for (j = 0; j < axis.labelers().size(); ++j) {
            axis.labelers().at(j).font("12px " + obj.options.font);
          }
        }
      }

      // if frequency, state, county, or variable changed, load data:
      if (obj.options.frequency !== old_options.frequency ||
        obj.options.state !== old_options.state ||
        obj.options.county !== old_options.county ||
        obj.options.presentation !== old_options.presentation ||
        obj.options.variable !== old_options.variable) {
        if (obj.options.frequency === "annual") {

          obj.axes.x_annual.visible(true);
          obj.axes.x_monthly.visible(false);
          obj.axes.x_seasonal.visible(false);

          each_plot(obj.plots, function (plot) {
            plot.visible(false);
          });

          obj.dataurls = {
            hist_obs: '',
            hist_mod: '',
            proj_mod: ''
          };
          show_spinner(obj.$div);
          //cancel previous (if any) requests


          return $.when.apply($, [
            get_historical_observed_data(obj),
            get_historical_model_data(obj),
            get_projected_model_data(obj)
          ])

            .then(function (hist_obs_data, hist_mod_data, proj_mod_data) {
              hide_spinner(obj.$div);

              var convfunc = variable_config(obj.options.variable).dataconverters[obj.options.unitsystem];
              hist_obs_data = transform_data(hist_obs_data, convfunc);
              hist_mod_data = transform_data(hist_mod_data, convfunc);
              proj_mod_data = transform_data(proj_mod_data, convfunc);

              var avg = average(hist_obs_data, 1961, 1990);
              if (obj.options.presentation === "anomaly") {
                if (obj.options.variable === "pcpn") {
                  hist_obs_data = percent_anomalies(hist_obs_data, avg);
                  hist_mod_data = percent_anomalies(hist_mod_data, avg);
                  proj_mod_data = percent_anomalies(proj_mod_data, avg);
                } else {
                  hist_obs_data = anomalies(hist_obs_data, avg);
                  hist_mod_data = anomalies(hist_mod_data, avg);
                  proj_mod_data = anomalies(proj_mod_data, avg);
                }
              }

              var range = scale_range(datas_range([hist_obs_data, hist_mod_data, proj_mod_data]), yAxisRangeScaleFactor);
              obj.axes.y.setDataRange(range.min, range.max);
              obj.axes.y.title().content().string(
                variable_config(obj.options.variable).ytitles.annual[obj.options.presentation][obj.options.unitsystem]
              );

              obj.data.annual_hist_obs.array(convertArray(attr_list_array(obj.data.annual_hist_obs.columns()), hist_obs_data));
              obj.data.annual_hist_mod.array(convertArray(attr_list_array(obj.data.annual_hist_mod.columns()), hist_mod_data));
              obj.data.annual_proj_mod.array(convertArray(attr_list_array(obj.data.annual_proj_mod.columns()), proj_mod_data));

              set_plot_visibilities(obj);

              {
                // Set the base level for the annual hist_obs bar plot --- this is the y-level
                // at which the bars are based ("barbase" plot option), as well as the level
                // that determines the colors of the bars ("min"/"max" property of the "fillcolor"
                // option -- above this level is red, below it is green).
                var ref = avg;
                if (obj.options.presentation === "anomaly") {
                  if (obj.options.variable === "pcpn") {
                    ref = 100;
                  } else {
                    ref = 0;
                  }
                }
                var number_val = new window.multigraph.core.NumberValue(ref);
                obj.plots.annual.hist_obs.renderer().options().barbase().at(0).value(number_val);
                var j;
                for (j = 1; j < obj.plots.annual.hist_obs.renderer().options().fillcolor().size(); ++j) {
                  if (obj.plots.annual.hist_obs.renderer().options().fillcolor().at(j).min()) {
                    obj.plots.annual.hist_obs.renderer().options().fillcolor().at(j).min(number_val);
                  }
                  if (obj.plots.annual.hist_obs.renderer().options().fillcolor().at(j).max()) {
                    obj.plots.annual.hist_obs.renderer().options().fillcolor().at(j).max(number_val);
                  }
                }
              }

              obj.m.render();

            });

        } else if (obj.options.frequency === "monthly") {
          obj.axes.x_annual.visible(false);
          obj.axes.x_monthly.visible(true);
          obj.axes.x_seasonal.visible(false);

          each_plot(obj.plots, function (plot) {
            plot.visible(false);
          });

          obj.dataurls = {};
          show_spinner(obj.$div);

          return $.when.apply($, [
            get_historical_observed_data(obj),
            get_projected_model_data(obj)
          ])
            .then(function (hist_obs_data, proj_mod_data) {
              hide_spinner(obj.$div);
              var convfunc = variable_config(obj.options.variable).dataconverters[obj.options.unitsystem];
              hist_obs_data = transform_data(hist_obs_data, convfunc);
              proj_mod_data = transform_data(proj_mod_data, convfunc);
              var range = scale_range(datas_range([hist_obs_data, proj_mod_data]), yAxisRangeScaleFactor);
              obj.axes.y.setDataRange(range.min, range.max);
              obj.axes.y.title().content().string(variable_config(obj.options.variable).ytitles.monthly[obj.options.unitsystem]);
              obj.data.monthly_hist_obs.array(convertArray(attr_list_array(obj.data.monthly_hist_obs.columns()), hist_obs_data));
              obj.data.monthly_proj_mod.array(convertArray(attr_list_array(obj.data.monthly_proj_mod.columns()), proj_mod_data));
              set_plot_visibilities(obj);
              obj.m.render();
            });


        } else if (obj.options.frequency === "seasonal") {
          obj.axes.x_annual.visible(false);
          obj.axes.x_monthly.visible(false);
          obj.axes.x_seasonal.visible(true);

          each_plot(obj.plots, function (plot) {
            plot.visible(false);
          });

          obj.dataurls = {};
          show_spinner(obj.$div);
          $.when.apply($, [
            get_historical_observed_data(obj),
            get_projected_model_data(obj)
          ]).then(function (hist_obs_data, proj_mod_data) {
            hide_spinner(obj.$div);
            // The incoming data has month values 1,4,7,10.  Here we replace these with the values 0,1,2,3:
            hist_obs_data.forEach(function (v) {
              v[0] = Math.floor(v[0] / 3);
            });
            proj_mod_data.forEach(function (v) {
              v[0] = Math.floor(v[0] / 3);
            });
            var convfunc = variable_config(obj.options.variable).dataconverters[obj.options.unitsystem];
            hist_obs_data = transform_data(hist_obs_data, convfunc);
            proj_mod_data = transform_data(proj_mod_data, convfunc);
            var range = scale_range(datas_range([hist_obs_data, proj_mod_data]), yAxisRangeScaleFactor);
            obj.axes.y.setDataRange(range.min, range.max);
            obj.axes.y.title().content().string(variable_config(obj.options.variable).ytitles.seasonal[obj.options.unitsystem]);
            obj.data.seasonal_hist_obs.array(convertArray(attr_list_array(obj.data.seasonal_hist_obs.columns()), hist_obs_data));
            obj.data.seasonal_proj_mod.array(convertArray(attr_list_array(obj.data.seasonal_proj_mod.columns()), proj_mod_data));
            set_plot_visibilities(obj);
            obj.m.render();
          });


        }

      }
      obj.m.render();
    };

    obj.download_image = function (link) {
      link.href = obj.$graphdiv.find('canvas')[0].toDataURL('image/png');
      link.download = [
        get_region_value(obj),
        obj.options.frequency,
        obj.options.variable,
        "graph"
      ].join('-').replace(/ /g, '_') + '.png';
    };

    obj.download_hist_obs_data = function (link) {
      link.href = obj.dataurls.hist_obs;
      link.download = [
        get_region_value(obj),
        obj.options.frequency,
        "hist_obs",
        obj.options.variable
      ].join('-').replace(/ /g, '_') + '.csv';
    };

    obj.download_hist_mod_data = function (link) {
      link.href = obj.dataurls.hist_mod;
      link.download = [
        get_region_value(obj),
        obj.options.frequency,
        "hist_mod",
        obj.options.variable
      ].join('-').replace(/ /g, '_') + '.csv';
    };
    obj.download_proj_mod_data = function (link) {
      link.href = obj.dataurls.proj_mod;
      link.download = [
        get_region_value(obj),
        obj.options.frequency,
        "proj_mod",
        obj.options.variable
      ].join('-').replace(/ /g, '_') + '.csv';
    };


    function setRange(axis, min, max) {
      var pan = axis.pan();
      var panMin = pan ? pan.min().getRealValue() : null;
      var panMax = pan ? pan.max().getRealValue() : null;
      var zoom = axis.zoom();
      var zoomMin = zoom ? zoom.min().getRealValue() : null;
      var zoomMax = zoom ? zoom.max().getRealValue() : null;
      if (panMax !== null && max > panMax) {
        return false;
      }
      if (panMin !== null && min < panMin) {
        return false;
      }
      if (zoomMax !== null && (max - min) > zoomMax) {
        return false;
      }
      if (zoomMin !== null && (max - min) < zoomMin) {
        return false;
      }
      axis.setDataRange(min - 0.5, max + 0.5);
      obj.m.render();
      return true;
    }

    obj.setXRange = function (min, max) {
      return setRange(obj.axes.x_annual, min, max);
    };

    obj.resize = function () {
      if (obj.m) {
        obj.m.resize();
      }
    };

    obj.$graphdiv.multigraph('done', function (m) {
      obj.m = m;
      obj.axes = {
        x_annual: m.graphs().at(0).axes().at(starti()),
        x_monthly: m.graphs().at(0).axes().at(nexti()),
        x_seasonal: m.graphs().at(0).axes().at(nexti()),
        y: m.graphs().at(0).axes().at(nexti())
      };

      obj.axes.x_annual.addListener('dataRangeSet', function (e) {
        if (obj.options.xrangefunc) {
          var min = Math.ceil(e.min.getRealValue());
          var max = Math.floor(e.max.getRealValue());
          obj.options.xrangefunc(min, max);
          //console.log(e);
          //console.log(min);
          //console.log(max);
          //var minYear = parseInt(yearFormatter.format(e.min), 10);
          //var maxYear = parseInt(yearFormatter.format(e.max), 10);
        }
      });


      obj.plots = new KeyObj();
      obj.plots.set_in(["annual", "hist_mod", "minmax"], m.graphs().at(0).plots().at(starti()));
      obj.plots.set_in(["annual", "hist_mod", "p1090"], m.graphs().at(0).plots().at(nexti()));
      obj.plots.set_in(["annual", "proj_mod", "minmax", "rcp45"], m.graphs().at(0).plots().at(nexti()));
      obj.plots.set_in(["annual", "proj_mod", "p1090", "rcp45"], m.graphs().at(0).plots().at(nexti()));
      obj.plots.set_in(["annual", "proj_mod", "minmax", "rcp85"], m.graphs().at(0).plots().at(nexti()));
      obj.plots.set_in(["annual", "proj_mod", "p1090", "rcp85"], m.graphs().at(0).plots().at(nexti()));
      obj.plots.set_in(["annual", "hist_obs"], m.graphs().at(0).plots().at(nexti()));
      obj.plots.set_in(["annual", "hist_mod", "med"], m.graphs().at(0).plots().at(nexti()));
      obj.plots.set_in(["annual", "proj_mod", "med", "rcp45"], m.graphs().at(0).plots().at(nexti()));
      obj.plots.set_in(["annual", "proj_mod", "med", "rcp85"], m.graphs().at(0).plots().at(nexti()));

      obj.plots.set_in(["monthly", "hist_obs", "med"], m.graphs().at(0).plots().at(nexti()));
      obj.plots.set_in(["monthly", "proj_mod", "minmax", "rcp45", "2025"], m.graphs().at(0).plots().at(nexti()));
      obj.plots.set_in(["monthly", "proj_mod", "minmax", "rcp85", "2025"], m.graphs().at(0).plots().at(nexti()));
      obj.plots.set_in(["monthly", "proj_mod", "p1090", "rcp45", "2025"], m.graphs().at(0).plots().at(nexti()));
      obj.plots.set_in(["monthly", "proj_mod", "p1090", "rcp85", "2025"], m.graphs().at(0).plots().at(nexti()));
      obj.plots.set_in(["monthly", "proj_mod", "med", "rcp45", "2025"], m.graphs().at(0).plots().at(nexti()));
      obj.plots.set_in(["monthly", "proj_mod", "med", "rcp85", "2025"], m.graphs().at(0).plots().at(nexti()));
      obj.plots.set_in(["monthly", "proj_mod", "minmax", "rcp45", "2050"], m.graphs().at(0).plots().at(nexti()));
      obj.plots.set_in(["monthly", "proj_mod", "minmax", "rcp85", "2050"], m.graphs().at(0).plots().at(nexti()));
      obj.plots.set_in(["monthly", "proj_mod", "p1090", "rcp45", "2050"], m.graphs().at(0).plots().at(nexti()));
      obj.plots.set_in(["monthly", "proj_mod", "p1090", "rcp85", "2050"], m.graphs().at(0).plots().at(nexti()));
      obj.plots.set_in(["monthly", "proj_mod", "med", "rcp45", "2050"], m.graphs().at(0).plots().at(nexti()));
      obj.plots.set_in(["monthly", "proj_mod", "med", "rcp85", "2050"], m.graphs().at(0).plots().at(nexti()));
      obj.plots.set_in(["monthly", "proj_mod", "minmax", "rcp45", "2075"], m.graphs().at(0).plots().at(nexti()));
      obj.plots.set_in(["monthly", "proj_mod", "minmax", "rcp85", "2075"], m.graphs().at(0).plots().at(nexti()));
      obj.plots.set_in(["monthly", "proj_mod", "p1090", "rcp45", "2075"], m.graphs().at(0).plots().at(nexti()));
      obj.plots.set_in(["monthly", "proj_mod", "p1090", "rcp85", "2075"], m.graphs().at(0).plots().at(nexti()));
      obj.plots.set_in(["monthly", "proj_mod", "med", "rcp45", "2075"], m.graphs().at(0).plots().at(nexti()));
      obj.plots.set_in(["monthly", "proj_mod", "med", "rcp85", "2075"], m.graphs().at(0).plots().at(nexti()));

      obj.plots.set_in(["seasonal", "proj_mod", "minmax", "rcp45", "2025"], m.graphs().at(0).plots().at(nexti()));
      obj.plots.set_in(["seasonal", "proj_mod", "minmax", "rcp85", "2025"], m.graphs().at(0).plots().at(nexti()));
      obj.plots.set_in(["seasonal", "proj_mod", "p1090", "rcp45", "2025"], m.graphs().at(0).plots().at(nexti()));
      obj.plots.set_in(["seasonal", "proj_mod", "p1090", "rcp85", "2025"], m.graphs().at(0).plots().at(nexti()));
      obj.plots.set_in(["seasonal", "proj_mod", "minmax", "rcp45", "2050"], m.graphs().at(0).plots().at(nexti()));
      obj.plots.set_in(["seasonal", "proj_mod", "minmax", "rcp85", "2050"], m.graphs().at(0).plots().at(nexti()));
      obj.plots.set_in(["seasonal", "proj_mod", "p1090", "rcp45", "2050"], m.graphs().at(0).plots().at(nexti()));
      obj.plots.set_in(["seasonal", "proj_mod", "p1090", "rcp85", "2050"], m.graphs().at(0).plots().at(nexti()));
      obj.plots.set_in(["seasonal", "proj_mod", "minmax", "rcp45", "2075"], m.graphs().at(0).plots().at(nexti()));
      obj.plots.set_in(["seasonal", "proj_mod", "minmax", "rcp85", "2075"], m.graphs().at(0).plots().at(nexti()));
      obj.plots.set_in(["seasonal", "proj_mod", "p1090", "rcp45", "2075"], m.graphs().at(0).plots().at(nexti()));
      obj.plots.set_in(["seasonal", "proj_mod", "p1090", "rcp85", "2075"], m.graphs().at(0).plots().at(nexti()));
      obj.plots.set_in(["seasonal", "hist_obs", "med"], m.graphs().at(0).plots().at(nexti()));
      obj.plots.set_in(["seasonal", "proj_mod", "med", "rcp45", "2025"], m.graphs().at(0).plots().at(nexti()));
      obj.plots.set_in(["seasonal", "proj_mod", "med", "rcp85", "2025"], m.graphs().at(0).plots().at(nexti()));
      obj.plots.set_in(["seasonal", "proj_mod", "med", "rcp45", "2050"], m.graphs().at(0).plots().at(nexti()));
      obj.plots.set_in(["seasonal", "proj_mod", "med", "rcp85", "2050"], m.graphs().at(0).plots().at(nexti()));
      obj.plots.set_in(["seasonal", "proj_mod", "med", "rcp45", "2075"], m.graphs().at(0).plots().at(nexti()));
      obj.plots.set_in(["seasonal", "proj_mod", "med", "rcp85", "2075"], m.graphs().at(0).plots().at(nexti()));
      obj.data = {
        annual_hist_obs: m.graphs().at(0).data().at(starti()),
        annual_hist_mod: m.graphs().at(0).data().at(nexti()),
        annual_proj_mod: m.graphs().at(0).data().at(nexti()),
        monthly_hist_obs: m.graphs().at(0).data().at(nexti()),
        monthly_proj_mod: m.graphs().at(0).data().at(nexti()),
        seasonal_hist_obs: m.graphs().at(0).data().at(nexti()),
        seasonal_proj_mod: m.graphs().at(0).data().at(nexti())
      };
      obj.update(obj.orig_options);
    });

    return obj;
  };

  window.climate_widget = {
    graph: climate_widget_graph,
    variables: climate_widget_variables
  };

})
(jQuery);
