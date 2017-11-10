/* ----------------------------------------------------------------------------
    Utility LIB
---------------------------------------------------------------------------- */
(function (window, document, undefined) {
  window.parent.$$ = {
    /**
    * Says "Hello"
    *
    */
    hello: function () {
      alert("Hello. It works.");
    },


    /**
    * Extends an Object
    *
    * @param {object} target Object to be extended
    * @param {object} object Object containing the behaviors/methods to be added to {target}
    */
    extend: function (target, object) {
      for (var property in object) {
        if (object.hasOwnProperty(property)) {
          target[property] = object[property];
        }
      }
      return target;
    },


    /**
    * Check whether current [people_id] has an active enrollment in currently selected [program_providing_service]
    *
    * @returns {bool} - {true} if has active enrollment
    */
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


    /**
    * Clears form field values on XML and DOM
    *
    * @param {any} fieldName - Form field {Name}
    */
    blankOutField: function (fieldName) {
      try {
        setFormElement(fieldName, "");
        setElementFromXML(formXML, fieldName, "");
        blankOutHTML(fieldName);
      } catch (error) { }
    },


    /**
    * Clears form field values on the DOM
    *
    * @param {any} fieldName - Form field {Name}
    */
    blankOutHTML: function (fieldName) {
      try {
        getFormElementDOM(fieldName + "_prompt").value = "";
        getFormElementDOM(fieldName + "_desc").innerHTML = "";
      } catch (error) { }
    },


    /**
    * Sets form element even when [Is Modifiable] is unchecked. [Disable Rules] are respected.
    *
    * @param {any} field - Form field {Name}
    * @param {any} value - Form fiel {Value}
    */
    setFormElement: function (field, value) {
      try {
        var initModState = getNodeFromXML(formXML, field).getAttribute("is_modifiable");
        getNodeFromXML(formXML, field).setAttribute("is_modifiable", "true");
        setFormElement(field, value);
        setElementFromXML(formXML, field, value);
        getNodeFromXML(formXML, field).setAttribute("is_modifiable", initModState);
      } catch (error) { }
    },


    /**
    * Gets age of [people_id] from {client_personal_view}
    *
    * @returns {number} - Client's Age in years
    */
    getClientAge: function () {
      return getDataValue("client_personal_view ", "people_id", getElementFromXML(formXML, "people_id"), "age");
    },


    /**
    * Checks if {starDate} comes before {endDate} on Evolv's [datetime] form fields. If not, shows alert and ERASES both fields.
    *
    * @param {datetime} startDate
    * @param {datetime} endDate
    */
    validateStartBeforeEndDate: function (startDate, endDate) {
      for (i = 0; i < arguments.length; i++) {
        $("#time_" + arguments[i]).on("change", function () {
          $$.validateStartBeforeEndDate(startDate, endDate);
        });
      }

      if (getFormElement(startDate) != "" && getFormElement(endDate) != "") {
        var startDateLabel = getFormElementDOM("caption_" + startDate)
          .innerHTML;
        var endDateLabel = getFormElementDOM("caption_" + endDate).innerHTML;
        var startDateTime = new Date(getElementFromXML(formXML, startDate));
        var endDateTime = new Date(getElementFromXML(formXML, endDate));

        if (endDateTime < startDateTime) {
          alert("Date and time of [" + startDateLabel + "] must be prior to Date and time of [" + endDateLabel + "].");
          $$.blankOutField(startDate);
          $$.blankOutField("time_" + startDate);
          $$.blankOutField(endDate);
          $$.blankOutField("time_" + endDate);
        }
      }
    },

    /**
     * Inspects the current Form for fiels and variable and shows their current values in an alert window
     *
     */
    formState: function () {
      var domArray = $('.formbody > .formgroup :not([id^=group_],[id^=img],[id^=dimg],[id^=caption_],[id$=_prompt],[id^=on_load_code])').filter(function (index) { return this.id !== '' && this.id.charCodeAt(0) !== 13 }).map(function () { return ((this.id.charCodeAt(0) == 13) ? this.id.substring(this.id.lastIndexOf(this.id.charAt(0) + 1), this.id.length) : this.id) + ': ' + $(this).val() + $(this).text() + (($(this).attr('type') === 'checkbox') ? $(this).is(':checked').toString().toUpperCase() : ''); });
      var compositeArray = [];
      var resultArray = [];

      $.map(domArray, function (value, index) {
        try {
          var currkey = value.substr(0, value.indexOf(':'));
          if (domArray[index + 1]) {
            var nextkey = domArray[index + 1].substr(0, domArray[index + 1].indexOf(':'));
            var has_desc = nextkey.substr(nextkey.length - 5, 5) === '_desc';
          }
          var desc = domArray[index + 1].substr(domArray[index + 1].indexOf(':') + 1);
          var is_desc = currkey.substr(currkey.length - 5, 5) === '_desc';

          if ((domArray[index + 1]) && (has_desc)) {
            compositeArray[index] = value + ' > ' + desc;
          } else if (!is_desc) {
            compositeArray[index] = value;
          }
        } catch (error) { }
      });


      $.map(compositeArray, function (value, index) {
        if (value !== undefined) {
          resultArray.push(value);
        }
      });

      alert(JSON.stringify(resultArray, '', '\n'));
    }



  };
  return $$;
})(window, document);
