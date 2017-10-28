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
            alert('Hello. It works.');
        },


        /**
         * Check whether current [people_id] has an active enrollment in currently selected [program_providing_service]
         *
         * @returns - {true} if has active enrollment
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
                var initModState = getNodeFromXML(formXML, field).getAttribute('is_modifiable');
                getNodeFromXML(formXML, field).setAttribute('is_modifiable', 'true');
                setFormElement(field, value);
                setElementFromXML(formXML, field, value);
                getNodeFromXML(formXML, field).setAttribute('is_modifiable', initModState);
            } catch (error) {}
        }


    };
    return $$;
})(window, document);
