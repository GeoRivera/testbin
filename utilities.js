/* ****************************************************************************
    Code snippets
**************************************************************************** */


/* ----------------------------------------------------------------------------
    Utility LIB
---------------------------------------------------------------------------- */
(function (window, document, undefined) {
    window.parent.$$ = {

        hasActiveEnrollment: function () {
            var people_id = getElementFromXML(formXML, 'people_id');
            var program_providing_service_id = getFormElement('program_providing_service');
            var condition = 'people_id = \'\'' + people_id + '\'\' AND program_info_id = \'\'' + program_providing_service_id + '\'\'';

            var program_name = getDataValue('current_program_enrollment_view', 'people_id', getElementFromXML(formXML, 'people_id'), 'program_name', condition);
            var end_date = (getDataValue('current_program_enrollment_view', 'people_id', getElementFromXML(formXML, 'people_id'), 'end_date', condition));

            var has_enrollment = (program_name) ? true : false;
            var is_active = (!end_date) ? true : false;

            return (has_enrollment) ? ((is_active) ? true : false) : false;
        },


        blankOutField: function (fieldName) {
            try {
                setFormElement(fieldName, '');
                setElementFromXML(formXML, fieldName, '');
                getFormElementDOM(fieldName + '_prompt').value = '';
                getFormElementDOM(fieldName + '_desc').innerHTML = '';
            } catch (error) { }
        },


        hello: function () {
            alert('Hello. It works :)');
        }



    };
    return $$;
})(window, document);






/* ----------------------------------------------------------------------------

---------------------------------------------------------------------------- */








alert(
    'people_id: ' + getFormElement('people_id')
    + '\n' +'staff_id: ' + getFormElement('staff_id')
    + '\n' +'program_providing_service: ' + getFormElement('program_providing_service')
    + '\n' +'site_providing_service: ' + getFormElement('site_providing_service')
    + '\n' +'udf_call_type: ' + getFormElement('udf_call_type')
    + '\n' +'is_intake_needed: ' + getFormElementDOM('is_intake_needed').checked
    + '\n' +'is_intake_needed XML: ' + getElementFromXML(formXML, 'is_intake_needed')
    + '\n' +'service_track_id: ' + getFormElement('udf_call_type')
);



//  People ID
alert(getFormElement('people_id'));

//  Program
alert(getFormElement('program_providing_service'));

//  Location
alert(getFormElement('site_providing_service'));

//  Call Type
alert(getFormElement('udf_call_type'));

//  Inake Needed
alert(getElementFromXML(formXML, 'is_intake_needed'));


// Open OR Compass Personal Information
// launchFormSet(this, self, '18D22ECF-1BDE-45A3-A7C3-18C5C8F6130D');
launchFormSet(people_id,self,'18D22ECF-1BDE-45A3-A7C3-18C5C8F6130D');



// Validate [Call Type]
var cfs_validCallTypeArray = ['7A5C3677-4401-4991-B38C-9B489D3E5EDF', 'B7564AB8-A552-41E8-B661-43E1060EFABF', ''];
var cfs_callType = getFormElement('udf_call_type');

if ($.inArray(cfs_callType, cfs_validCallTypeArray) == -1) {
    cfs_setFormElement('program_providing_service', '');
    setFormElement('site_providing_service', '');
    setFormElement('referral_reason_id', '');
    setFormElement('udf_call_type', '');
    alert('The selected [Call Type] is not valid for this Program. Please select a valid [Call Type].');
}





/* ****************************************************************************
    Evolv won't let us add javascript functions to a form's [After Load Code] field. The following is a WORKAROUND for this limitation.
    + The anonymous function uses a variable to trigger the [OnChange] event on the form.
    + The additional line of code removes the anonymous function from the form's XML in order to avoid an XSLT error.
    + The anonymous function's curly braces are doubled on purpose to avoid an XSLT error.

    How to use:
    - Create a variable named [on_load_code] of type {Boolean}
    - Paste the following code on the [On Load Script] field of the [on_load_code] variable
    - Add the code you want executed to the [On Change Script] field of the [on_load_code] variable
**************************************************************************** */
//* Code commented to avoid formatter changing double braces {{
/*
window.setTimeout(function () {{
    var cfs_code = getFormElementDOM('on_load_code');
    if (document.nameProp.split(' ')[0] == 'ADD') {{
            setFormElement('on_load_code', 1);
            cfs_code.focus();
            cfs_code.blur();
        }}
    cfs_code.style.display = 'none';
    getFormElementDOM('caption_on_load_code').style.display = 'none';
}}, 50);
*/
/* ----------------------------------------------------------------------------
    Prepend the following line to the [On Change Script] code.
---------------------------------------------------------------------------- */
getNodeFromXML(formXML, 'on_load_code').setAttribute('onload_event', '');




/* ****************************************************************************
    Alternative code for the 1st Form using the Form's [After Load Code] to trigger the [On Click] event.
---------------------------------------------------------------------------- */
//* Code commented to avoid formatter changing double braces {{
/*
window.setTimeout(function () {{ getFormElementDOM('on_load_code').click(); }}, 50);
*/

/* ----------------------------------------------------------------------------
    Prepend the following line to the [On Click] code.
---------------------------------------------------------------------------- */
getFormElementDOM('on_load_code').style.display = 'none';
getFormElementDOM('caption_on_load_code').style.display = 'none';







/**
 * Conditionally Shows OR Hides DOM Elements in Evolv-CS Forms
 *
 * @param {array} cfs_fieldSet - List of [column_name]/[HTML element ids]
 * @param {boolean} cfs_showHide - Show[1]/Hide[0] elements. Default: [0]
 */
function cfs_CondShowHideDOM(cfs_fieldSet, cfs_showHide) {
    cfs_showHide = ((cfs_showHide == null) || (cfs_showHide == false)) ? 'none' : 'inline';

    for (var cfs_i = cfs_fieldSet.length - 1; cfs_i >= 0; cfs_i--) {
        var cfs_Caption = 'caption_' + cfs_fieldSet[cfs_i];
        var cfs_Prompt = cfs_fieldSet[cfs_i] + '_prompt';

        var cfs_El = getFormElementDOM(cfs_fieldSet[cfs_i]);
        var cfs_ElCaption = getFormElementDOM(cfs_Caption);
        var cfs_ElPrompt = getFormElementDOM(cfs_Prompt);

        try {
            cfs_El.style.display = cfs_showHide;
            cfs_ElCaption.style.display = cfs_showHide;
            cfs_ElPrompt.style.display = cfs_showHide;
        } catch (err) { }
    }
}




/**
 * Shows and/or Hides DOM Elements in Evolv-CS Forms
 *
 * @param {array} cfs_fieldSetShow - List of [column_name]/[HTML element ids] to SHOW
 * @param {array} cfs_fieldSetHide - List of [column_name]/[HTML element ids] to HIDE
 */
function cfs_ShowHideDOM(cfs_fieldSetShow, cfs_fieldSetHide) {
    cfs_show = 'inline';
    cfs_hide = 'none';


    for (var cfs_i = cfs_fieldSetShow.length - 1; cfs_i >= 0; cfs_i--) {
        var cfs_Caption = 'caption_' + cfs_fieldSetShow[cfs_i];
        var cfs_Prompt = cfs_fieldSetShow[cfs_i] + '_prompt';

        var cfs_El = getFormElementDOM(cfs_fieldSetShow[cfs_i]);
        var cfs_ElCaption = getFormElementDOM(cfs_Caption);
        var cfs_ElPrompt = getFormElementDOM(cfs_Prompt);

        try {
            cfs_El.style.display = cfs_show;
            cfs_ElCaption.style.display = cfs_show;
            cfs_ElPrompt.style.display = cfs_show;
        } catch (err) { }
    }

    for (var cfs_i = cfs_fieldSetHide.length - 1; cfs_i >= 0; cfs_i--) {
        var cfs_Caption = 'caption_' + cfs_fieldSetHide[cfs_i];
        var cfs_Prompt = cfs_fieldSetHide[cfs_i] + '_prompt';

        var cfs_El = getFormElementDOM(cfs_fieldSetHide[cfs_i]);
        var cfs_ElCaption = getFormElementDOM(cfs_Caption);
        var cfs_ElPrompt = getFormElementDOM(cfs_Prompt);

        try {
            cfs_El.style.display = cfs_hide;
            cfs_ElCaption.style.display = cfs_hide;
            cfs_ElPrompt.style.display = cfs_hide;
        } catch (err) { }
    }
}




/**
 * Flips the visibility of two DOM Element sets based on a condition
 *
 * @param {array} cfs_fieldSetShow - List of [column_name]/[HTML element ids] to SHOW when [cfs_ShowCondition] is TRUE.
 * @param {array} cfs_fieldSetHide - List of [column_name]/[HTML element ids] to HIDE when [cfs_ShowCondition] is TRUE.
 * @param {boolean} cfs_ShowCondition - Toggle condition
 */
function cfs_FlipDOM(cfs_fieldSetShow, cfs_fieldSetHide, cfs_ShowCondition) {
    cfs_show = (cfs_ShowCondition) ? 'inline' : 'none';
    cfs_hide = (cfs_ShowCondition) ? 'none' : 'inline';


    for (var cfs_i = cfs_fieldSetShow.length - 1; cfs_i >= 0; cfs_i--) {
        var cfs_Caption = 'caption_' + cfs_fieldSetShow[cfs_i];
        var cfs_Prompt = cfs_fieldSetShow[cfs_i] + '_prompt';

        var cfs_El = getFormElementDOM(cfs_fieldSetShow[cfs_i]);
        var cfs_ElCaption = getFormElementDOM(cfs_Caption);
        var cfs_ElPrompt = getFormElementDOM(cfs_Prompt);

        try {
            cfs_El.style.display = cfs_show;
            cfs_ElCaption.style.display = cfs_show;
            cfs_ElPrompt.style.display = cfs_show;
        } catch (err) { }
    }

    for (var cfs_i = cfs_fieldSetHide.length - 1; cfs_i >= 0; cfs_i--) {
        var cfs_Caption = 'caption_' + cfs_fieldSetHide[cfs_i];
        var cfs_Prompt = cfs_fieldSetHide[cfs_i] + '_prompt';

        var cfs_El = getFormElementDOM(cfs_fieldSetHide[cfs_i]);
        var cfs_ElCaption = getFormElementDOM(cfs_Caption);
        var cfs_ElPrompt = getFormElementDOM(cfs_Prompt);

        try {
            cfs_El.style.display = cfs_hide;
            cfs_ElCaption.style.display = cfs_hide;
            cfs_ElPrompt.style.display = cfs_hide;
        } catch (err) { }
    }
}




/**
 * Verifies whether the current [Person] has an active enrollment in the selected [Program]
 *
 * @param {any} cfs_people_id - GUID of the Person . Default: Form's [people_id]
 * @param {any} cfs_program_providing_service_id - GUID of the Program. Default: [program_providing_service_id]
 * @returns {string} - {'on'} if Intake is needed, {''} otherwise.
 */
function cfs_IsIntakeNeeded(cfs_people_id, cfs_program_providing_service_id) {
    cfs_people_id = ((cfs_people_id == null) || (cfs_people_id == false)) ? getElementFromXML(formXML, 'people_id') : cfs_people_id;
    cfs_program_providing_service_id = ((cfs_program_providing_service_id == null) || (cfs_program_providing_service_id == false)) ? getFormElement('program_providing_service') : cfs_program_providing_service_id;

    var cfs_condition = 'people_id = \'\'' + cfs_people_id + '\'\' AND program_info_id = \'\'' + cfs_program_providing_service_id + '\'\'';
    var cfs_program_name = getDataValue('current_program_enrollment_view', 'people_id', cfs_people_id, 'program_name', cfs_condition);
    var cfs_end_date = (getDataValue('current_program_enrollment_view', 'people_id', cfs_people_id, 'end_date', cfs_condition));
    var cfs_has_enrollment = (cfs_program_name) ? true : false;
    var cfs_is_active = (!cfs_end_date) ? true : false;

    if (!cfs_has_enrollment) {
        var cfs_intake_needed = 'on';
    } else {
        var cfs_intake_needed = (!cfs_is_active) ? 'on' : '';
    }

    cfs_intake_needed = (cfs_program_providing_service_id == '') ? '' : cfs_intake_needed;

    if (cfs_program_providing_service_id != '') {
        (!cfs_intake_needed) ? alert('Client already has an active enrolment on ' + cfs_program_name + '. Current enrollment MUST be Discharged prior to Triage.') : null;
    }
    return cfs_intake_needed;
}



/**
 * Sets the visibility of {Label} Field in a Form
 *
 * @param {DOM_Node} cfs_messageNode - DOM Node of the {Label} Field (Eg.: var cfs_enrolmentAlertNode = formXML.selectSingleNode('form_object/form_group/form_item[@caption=\'age_of_enrollment\']');)
 * @param {String} cfs_visible - visible = 'true' or hidden = 'false'
 */
function cfs_SetAlertVisibility(cfs_messageNode, cfs_visible) {
    cfs_messageNode.setAttribute('is_visible', cfs_visible);
    repaintFormXML();
    try {
        var cfs_notesParentNode = getFormElementDOM('inner_body1').firstChild;
        while (cfs_notesParentNode.childNodes.length > 1) {
            cfs_notesParentNode.removeChild(cfs_notesParentNode.childNodes[cfs_notesParentNode.childNodes.length - 1]);
        }
    } catch (error) { }
}



/* ****************************************************************************
DO NOT USE THIS FORM
- Insert a divider at the top os the form with the [Caption] {DO NOT USE THIS FORM}
- Append the following to the  [on_load_code]
**************************************************************************** */
getFormElementDOM('caption_divline').style.color = 'red';
getFormElementDOM('caption_divline').style.fontSize = '14pt';
getFormElementDOM('caption_divline').style.padding = '20px';
getFormElementDOM('caption_divline').style.textAlign = 'center';
alert('This form is not ready for Production yet.\nIf you need to run any tests, please use the DEVELOPMENT Evironment.');
window.close();











































/* ----------------------------------------------------------------------------
    This code is NOT being used. It was supposed to hide disabled fields.
---------------------------------------------------------------------------- */
var cfs_callType = getFormElement('udf_call_type');
var cfs_Intake_Fieldset = getFormElementDOM('caption_program_providing_service').parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
var cfs_Triage_Fieldset = getFormElementDOM('caption_udf_call_center_yesno').parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;


var cfs_showRegWell = ['call_center_category_id'];
var cfs_hideRegWell = ['caller_org', 'udf_referral_contact', 'caller_other', 'program_providing_service', 'site_providing_service', 'is_intake_needed', 'referral_reason_id', 'udf_call_center_yesno', 'udf_belongings'];


var cfs_showTriage = ['program_providing_service', 'site_providing_service', 'is_intake_needed', 'referral_reason_id', 'udf_call_center_yesno', 'udf_belongings'];
var cfs_hideTriage = ['call_center_category_id', 'caller_org', 'udf_referral_contact', 'caller_other'];

var cfs_showReferral = ['caller_org', 'udf_referral_contact', 'caller_other'];
var cfs_hideReferral = ['call_center_category_id', 'program_providing_service', 'site_providing_service', 'is_intake_needed', 'referral_reason_id', 'udf_call_center_yesno', 'udf_belongings'];

switch (cfs_callType) {
    case '12A9FD9B-9945-4C46-B5E0-8064CA7427D1':
        cfs_ShowHideDOM(cfs_showRegWell, cfs_hideRegWell);
        cfs_Intake_Fieldset.style.display = 'none';
        cfs_Triage_Fieldset.style.display = 'none';
        break;
    case 'E858DEAF-002F-43C8-945E-EFD81A58972E':
        cfs_ShowHideDOM(cfs_showRegWell, cfs_hideRegWell);
        cfs_Intake_Fieldset.style.display = 'none';
        cfs_Triage_Fieldset.style.display = 'none';
        break;
    case '7A5C3677-4401-4991-B38C-9B489D3E5EDF':
        cfs_ShowHideDOM(cfs_showTriage, cfs_hideTriage);
        cfs_Intake_Fieldset.style.display = 'inline';
        cfs_Triage_Fieldset.style.display = 'inline';
        break;
    case 'B7564AB8-A552-41E8-B661-43E1060EFABF':
        cfs_ShowHideDOM(cfs_showReferral, cfs_hideReferral);
        cfs_Intake_Fieldset.style.display = 'none';
        cfs_Triage_Fieldset.style.display = 'none';
        break;
}


function cfs_ShowHideDOM(cfs_fieldSetShow, cfs_fieldSetHide) {
    cfs_show = 'inline';
    cfs_hide = 'none';


    for (var cfs_i = cfs_fieldSetShow.length - 1; cfs_i >= 0; cfs_i--) {
        var cfs_Caption = 'caption_' + cfs_fieldSetShow[cfs_i];
        var cfs_Prompt = cfs_fieldSetShow[cfs_i] + '_prompt';

        var cfs_El = getFormElementDOM(cfs_fieldSetShow[cfs_i]);
        var cfs_ElCaption = getFormElementDOM(cfs_Caption);
        var cfs_ElPrompt = getFormElementDOM(cfs_Prompt);

        try {
            cfs_El.style.display = cfs_show;
            cfs_ElCaption.style.display = cfs_show;
            cfs_ElPrompt.style.display = cfs_show;
        } catch (err) { }
    }

    for (var cfs_i = cfs_fieldSetHide.length - 1; cfs_i >= 0; cfs_i--) {
        var cfs_Caption = 'caption_' + cfs_fieldSetHide[cfs_i];
        var cfs_Prompt = cfs_fieldSetHide[cfs_i] + '_prompt';

        var cfs_El = getFormElementDOM(cfs_fieldSetHide[cfs_i]);
        var cfs_ElCaption = getFormElementDOM(cfs_Caption);
        var cfs_ElPrompt = getFormElementDOM(cfs_Prompt);

        try {
            cfs_El.style.display = cfs_hide;
            cfs_ElCaption.style.display = cfs_hide;
            cfs_ElPrompt.style.display = cfs_hide;
        } catch (err) { }
    }
}
/* ----------------------------------------------------------------------------
---------------------------------------------------------------------------- */












setFormElement('is_caller_same', isChecked('is_referral'))


/* ****************************************************************************
ES - Adult {CE6F5DE7-9ADA-4815-A849-1ECB2186ADA6}
ES - Youth {C19BB95E-39BD-44AF-A8C0-7C63C35EC5C1}
Service Track ID - Triage -> {441DC841-C692-4AA7-92B3-DEC128080C94}

People_ID - Jane ES Doe - {30980542-70C4-4FB5-8B8D-0954B9776B51}
People_ID - Jake Doe - {61A2D7D0-BB28-41D0-BC2B-36D0F7A63BB6}
?? 7C3BA37E-97EE-47E2-95EF-1FD48D9E77D8
**************************************************************************** */

setFormElement('service_track_id', program_providing_service.value)

// ------------------------------------------------------------------------------------------------------

/* ****************************************************************************
Adoption Journeys ID
    program_providing_service: {733B128C-6E8A-44D6-AF6E-F468DB31B17C}
    people_id: {61A2D7D0-BB28-41D0-BC2B-36D0F7A63BB6} - Jake Doe

**************************************************************************** */
// AJ id - 733B128C-6E8A-44D6-AF6E-F468DB31B17C
setFormElement('service_track_id', program_providing_service.value)

// program_info_id
getDataValue('current_program_enrollment_view', 'people_id', getElementFromXML(formXML, 'people_id'), 'program_info_id', 'program_info_id = \'\'CE6F5DE7-9ADA-4815-A849-1ECB2186ADA6\'\' OR program_info_id = \'\'C19BB95E-39BD-44AF-A8C0-7C63C35EC5C1\'\'')
// end_date
getDataValue('current_program_enrollment_view', 'people_id', getElementFromXML(formXML, 'people_id'), 'end_date', 'program_info_id = \'\'CE6F5DE7-9ADA-4815-A849-1ECB2186ADA6\'\' OR program_info_id = \'\'C19BB95E-39BD-44AF-A8C0-7C63C35EC5C1\'\'')


/*
    var cfs_pid = '\'\'CE6F5DE7-9ADA-4815-A849-1ECB2186ADA6\'\'';
    var cfs_condition = 'program_info_id = ' + cfs_pid;
    var cfs_intake_needed = (cfs_has_enrollment && cfs_is_active) ? false : true;

    if (!cfs_has_enrollment) {
        var cfs_intake_needed = true;
    } else if (cfs_has_enrollment && cfs_is_active) {
        var cfs_intake_needed = false;
    } else {
        var cfs_intake_needed = false;
    }

    var cfs_condition = 'program_info_id = \'\'CE6F5DE7-9ADA-4815-A849-1ECB2186ADA6\'\' OR program_info_id = \'\'C19BB95E-39BD-44AF-A8C0-7C63C35EC5C1\'\'';

    var cfs_condition = 'people_id = \'\'' + getElementFromXML(formXML, 'people_id') + '\'\' AND (program_info_id = \'\'CE6F5DE7-9ADA-4815-A849-1ECB2186ADA6\'\' OR program_info_id = \'\'C19BB95E-39BD-44AF-A8C0-7C63C35EC5C1\'\')';

    */
alert('People ID Form: ' + getElementFromXML(formXML, 'people_id') + ' People ID DB: ' + getDataValue('current_program_enrollment_view', 'people_id', getElementFromXML(formXML, 'people_id'), 'people_id', cfs_condition));
alert(getDataValue('current_program_enrollment_view', 'people_id', getElementFromXML(formXML, 'people_id'), 'program_name', cfs_condition));
alert(getDataValue('current_program_enrollment_view', 'people_id', getElementFromXML(formXML, 'people_id'), 'end_date', cfs_condition));

alert('Enrollment: ' + cfs_has_enrollment + '  Active: ' + cfs_is_active);

getElementFromXML(formXML, 'program_providing_service')
program_providing_service


    (function () {
        var cfs_condition = 'people_id = \'\'' + getElementFromXML(formXML, 'people_id') + '\'\' AND program_info_id = \'\'' + getElementFromXML(formXML, 'program_providing_service') + '\'\'';
        var cfs_has_enrollment = (getDataValue('current_program_enrollment_view', 'people_id', getElementFromXML(formXML, 'people_id'), 'program_name', cfs_condition)) ? true : false;
        var cfs_is_active = (getDataValue('current_program_enrollment_view', 'people_id', getElementFromXML(formXML, 'people_id'), 'end_date', cfs_condition)) ? false : true;

        if (!cfs_has_enrollment) {
            var cfs_intake_needed = true;
        } else {
            var cfs_intake_needed = (cfs_is_active) ? false : true;
        }

        alert(cfs_intake_needed)
        return cfs_intake_needed
    })();



/* ****************************************************************************

intake needed
default value
if (!getElementFromXML(formXML, 'is_outside_agency_call') == '') {
    (getElementFromXML(formXML, 'service_track_id') == '') ? 'on' : ''
}

disable rule
getElementFromXML(formXML, 'service_track_id') != '' || getElementFromXML(formXML, 'program_providing_service') == '' || getElementFromXML(formXML, 'site_providing_service') == '' || getElementFromXML(formXML, 'is_outside_agency_call') != ''


**************************************************************************** */
window.setTimeout(setFormElement('is_intake_needed', cfs_SetIntakeNeeded), 3000);

/* ****************************************************************************
    Sets the [Intake Needed] checkbox according to the Client havinng an active
    enrollment on the selected Program
**************************************************************************** */
setFormElement('is_intake_needed', cfs_SetIntakeNeeded());

function cfs_SetIntakeNeeded() {
    var cfs_condition = 'people_id = \'\'' + getElementFromXML(formXML, 'people_id') + '\'\' AND program_info_id = \'\'' + getFormElement('program_providing_service') + '\'\'';
    var cfs_has_enrollment = (getDataValue('current_program_enrollment_view', 'people_id', getElementFromXML(formXML, 'people_id'), 'program_name', cfs_condition)) ? true : false;
    var cfs_is_active = (getDataValue('current_program_enrollment_view', 'people_id', getElementFromXML(formXML, 'people_id'), 'end_date', cfs_condition)) ? false : true;

    if (!cfs_has_enrollment) {
        var cfs_intake_needed = true;
    } else {
        var cfs_intake_needed = (cfs_is_active) ? false : true;
    }

    cfs_intake_needed = (getFormElement('program_providing_service') == '') ? false : cfs_intake_needed;

    (!cfs_intake_needed) ? alert('Client already has an active enrolment on the selected program!') : null;

    return cfs_intake_needed
}











getDataValue('current_program_enrollment_view', 'people_id', getFormElement('people_id'), 'program_info_id', 'program_info_id = \'\'CE6F5DE7-9ADA-4815-A849-1ECB2186ADA6\'\' OR program_info_id = \'\'C19BB95E-39BD-44AF-A8C0-7C63C35EC5C1\'\'')
getDataValue('current_program_enrollment_view', 'people_id', getFormElement('people_id'), 'end_date', 'program_info_id = \'\'CE6F5DE7-9ADA-4815-A849-1ECB2186ADA6\'\' OR program_info_id = \'\'C19BB95E-39BD-44AF-A8C0-7C63C35EC5C1\'\'')



// function getDataValue(tableFrom, codeField, codeValue, returnField, conditionExpr, orderExpr)
getDataValue('current_program_enrollment_view', 'people_id', getElementFromXML(formXML, 'people_id'), 'program_info_id', 'program_info_id = \'\'CE6F5DE7-9ADA-4815-A849-1ECB2186ADA6\'\' OR program_info_id = \'\'C19BB95E-39BD-44AF-A8C0-7C63C35EC5C1\'\'')



getDataValue('all_people_clients_view', 'people_id', getFormElement('people_id'), 'people_id')

getDataValue('all_people_clients_view', 'people_id', getFormElement('people_id'), 'is_active_client')
getDataValue('all_people_clients_view', 'people_id', getFormElement('people_id'), 'service_track_description')

var cfs_pid = 'CE6F5DE7-9ADA-4815-A849-1ECB2186ADA6';
getDataValue('current_program_enrollment_view', 'people_id', getElementFromXML(formXML, 'people_id'), 'program_info_id', 'program_info_id = "CE6F5DE7-9ADA-4815-A849-1ECB2186ADA6"');

var cfs_condition = 'program_info_id = ' + 'CE6F5DE7-9ADA-4815-A849-1ECB2186ADA6';
getDataValue('current_program_enrollment_view', 'people_id', getElementFromXML(formXML, 'people_id'), 'program_info_id', cfs_condition);
//, conditionExpr, orderExpr)



// ------------------------------------------------------------------------------------------------------
window.parent.getDataValue('agency_program_link_view', 'program_name', 'Clinic', 'agency_program_link_id');

(getElementFromXML(formXML, 'service_track_id') == '') ? 'on' : '';


VBTrim(getDataValue('service_track_current_view', 'people_id', getElementFromXML(formXML, 'people_id'), 'event_log_id'));

// function getDataValue(tableFrom,          codeField,            codeValue,                     returnField, conditionExpr, orderExpr)
getDataValue('service_track_current_view', 'people_id', getElementFromXML(formXML, 'people_id'), 'event_log_id')



VBTrim(getDataValue('service_track_current_view', 'people_id', getElementFromXML(formXML, 'people_id'), 'event_log_id'))








!isChecked('is_intake_needed') || getElementFromXML(formXML, 'service_track_id') != '' || isChecked('is_outside_agency_call')



https://myevolvcfsdev.netsmartcloud.com/pickform.aspx?lut_code=D4F9E7B4-5A7B-4D7B-83CE-1560E96CC973&lut_name=Referred%20to%20Discharge&agencyID=undefined&returnMode=single&sessionID=8a66ba0e-d946-4180-aa27-e3c193b77dde&no_cashe=0.024531730224440606