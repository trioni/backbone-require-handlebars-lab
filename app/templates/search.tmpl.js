(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['search.tmpl'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<fieldset>\n	<legend>";
  foundHelper = helpers.label;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.label; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</legend>\n	<input type=\"text\" id=\"search_input\">\n	<input type=\"button\" id=\"search_submit\" value=\"Sök\">	\n</fieldset>";
  return buffer;});
})();