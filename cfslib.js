/* ----------------------------------------------------------------------------
    Utility LIB
---------------------------------------------------------------------------- */
(function (window, document, undefined) {
  window.parent.$$ = {


    hello: function () {
      alert("Hello. It works :)");
    },


    hasActiveEnrollment: function () {
      var people_id = getElementFromXML(formXML, "people_id");
      var program_providing_service_id = getFormElement("program_providing_service");
      var condition = "people_id = ''" + people_id + "'' AND program_info_id = ''" + program_providing_service_id + "''";

      var program_name = getDataValue("current_program_enrollment_view", "people_id", getElementFromXML(formXML, "people_id"), "program_name", condition);
      var end_date = getDataValue("current_program_enrollment_view", "people_id", getElementFromXML(formXML, "people_id"), "end_date", condition);

      var has_enrollment = program_name ? true : false;
      var is_active = !end_date ? true : false;

      return has_enrollment ? (is_active ? true : false) : false;
    },


    blankOutField: function (fieldName) {
      try {
        setFormElement(fieldName, "");
        setElementFromXML(formXML, fieldName, "");
        getFormElementDOM(fieldName + "_prompt").value = "";
        getFormElementDOM(fieldName + "_desc").innerHTML = "";
      } catch (error) { }
    },


    getElementFromXML: function (oXML, columnName, cleanGUID) {
      getElementFromXML(oXML, columnName, cleanGUID);
    }



  };
  return $$;
})(window, document);
