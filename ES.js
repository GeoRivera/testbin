/* ****************************************************************************
    Emergency Services


    Regular Call        - '12A9FD9B-9945-4C46-B5E0-8064CA7427D1'
    Well-being Check    - 'E858DEAF-002F-43C8-945E-EFD81A58972E'
    Triage / Enrollment - '7A5C3677-4401-4991-B38C-9B489D3E5EDF'
    Referral            - 'B7564AB8-A552-41E8-B661-43E1060EFABF'

    Emergency Services - Adult - 'CE6F5DE7-9ADA-4815-A849-1ECB2186ADA6'
    Emergency Services - Youth - 'C19BB95E-39BD-44AF-A8C0-7C63C35EC5C1'
**************************************************************************** */

// Jane Doe Jr - 'FE4175F4-E324-43BE-B4DD-3F62E1E1D5CF'
// Jay Doe     - '27575C8D-D2B5-4D13-A639-54536B2C5DE2'



document.nameProp.split(' ')[0] != 'ADD';



/* ****************************************************************************
    Form: ES - New Call
**************************************************************************** */
// After Load Code
//* Code commented to avoid formatter changing double braces {{
/*
window.setTimeout(function () {{ getFormElementDOM('on_load_code').click(); }}, 50);
*/

/* ----------------------------------------------------------------------------
    On Load Code - [on_load_code]
---------------------------------------------------------------------------- */
// On Click
getFormElementDOM('on_load_code').style.display = 'none';
getFormElementDOM('caption_on_load_code').style.display = 'none';

cfs_ShowHideDomEl(['udf_call_type', 'caller_org', 'udf_referral_contact', 'caller_other', 'client_id'], (document.nameProp.split(' ')[0] == 'EDIT'));

function cfs_ShowHideDomEl(cfs_fieldSet, cfs_showHide) {
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






/* ****************************************************************************
ES - Call Disposition Intake
**************************************************************************** */
/* ----------------------------------------------------------------------------
Call Type - [udf_call_type]
(confirm('You MUST enter the DOB and Gender in the client\'s [Demographics]. The System doesn\'t have a DOB for this Client and is therefore unable to auto-select an ES Program.\n\nDo you wish to enter the Client\'s DOB now?')) ? launchFormSet(people_id, self, '18D22ECF-1BDE-45A3-A7C3-18C5C8F6130D') : null;

        setFormElement('program_providing_service','');
        getFormElementDOM('program_providing_service_prompt').value = '';
        setFormElement('udf_call_type', '');
        getFormElementDOM('udf_call_type_prompt').value = '';
        getFormElementDOM('udf_call_type_desc').innerHTML = '';


        var cfs_selectedProgram = '';
        var cfs_initialAlertStatus = cfs_enrolmentAlertNode.getAttribute('is_visible');
        var cfs_callType = getElementFromXML(formXML, 'udf_call_type');


        alert(
            'DOM: ' + getFormElement('udf_call_type') +
            '  XML: ' + getElementFromXML(formXML, 'udf_call_type')
        );
---------------------------------------------------------------------------- */
// On change script - age based enrollment
var cfs_callType = getFormElement('udf_call_type');
var cfs_clientAge = getDataValue('client_personal_view ', 'people_id', getElementFromXML(formXML, 'people_id'), 'age');
var cfs_enrolmentAlertNode = formXML.selectSingleNode('form_object/form_group/form_item[@caption=\'age_of_enrollment\']');
setElementFromXML(formXML, 'udf_call_type', cfs_callType);
setFormElement('referral_reason_id', 'F46C2E9D-2F02-40EF-95B9-CF7A6D1CF858');

if (cfs_callType == '7A5C3677-4401-4991-B38C-9B489D3E5EDF') {
    cfs_SetAlertVisibility(cfs_enrolmentAlertNode, 'false');
    if (cfs_clientAge == '') {
        (confirm('You MUST enter the DOB and Gender in the client\'s [Demographics]. The System doesn\'t have a DOB for this Client and is therefore unable to auto-select an ES Program.\n\nDo you wish to enter the Client\'s DOB now?')) ? $('#people_id_desc').click() : null;
        cfs_BlankOutField('program_providing_service');
        cfs_BlankOutField('udf_call_type');
    } else {
        cfs_SetEsProgram(cfs_clientAge);
        setFormElement('is_intake_needed', cfs_SetIntakeNeeded());
    }
} else if (cfs_callType != '') {
    setFormElement('is_intake_needed', '');
    if (cfs_clientAge == '') {
        cfs_SetAlertVisibility(cfs_enrolmentAlertNode, 'true');
    } else {
        cfs_SetAlertVisibility(cfs_enrolmentAlertNode, 'false');
        cfs_SetEsProgram(cfs_clientAge);
    }
} else {
    setFormElement('is_intake_needed', '');
}






function cfs_BlankOutField(cfs_fieldName) {
    try {
        setFormElement(cfs_fieldName, '');
        getFormElementDOM(cfs_fieldName + '_prompt').value = '';
        getFormElementDOM(cfs_fieldName + '_desc').innerHTML = '';
    } catch (error) {}
}


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


function cfs_SetEsProgram(cfs_clientAge) {
    if (cfs_clientAge >= 21) {
        setFormElement('program_providing_service', 'CE6F5DE7-9ADA-4815-A849-1ECB2186ADA6');
    } else if (cfs_clientAge < 21) {
        setFormElement('program_providing_service', 'C19BB95E-39BD-44AF-A8C0-7C63C35EC5C1');
    }
}


function cfs_SetIntakeNeeded() {
    var cfs_people_id = getElementFromXML(formXML, 'people_id');
    var cfs_program_providing_service_id = getFormElement('program_providing_service');
    var cfs_condition = 'people_id = \'\'' + cfs_people_id + '\'\' AND program_info_id = \'\'' + cfs_program_providing_service_id + '\'\'';

    var cfs_program_name = getDataValue('current_program_enrollment_view', 'people_id', getElementFromXML(formXML, 'people_id'), 'program_name', cfs_condition);
    var cfs_end_date = (getDataValue('current_program_enrollment_view', 'people_id', getElementFromXML(formXML, 'people_id'), 'end_date', cfs_condition));

    var cfs_has_enrollment = (cfs_program_name) ? true : false;
    var cfs_is_active = (!cfs_end_date) ? true : false;

    if (!cfs_has_enrollment) {
        var cfs_intake_needed = 'on';
    } else {
        var cfs_intake_needed = (!cfs_is_active) ? 'on' : '';
    }

    cfs_intake_needed = (getFormElement('program_providing_service') == '') ? '' : cfs_intake_needed;

    if (getFormElement('program_providing_service') != '') {
        (!cfs_intake_needed) ? alert('Client already has an active enrolment on ' + cfs_program_name + '. Current enrollment MUST be Discharged prior to Triage.') : null;
    }
    return cfs_intake_needed;
}







// ES - Adult
'CE6F5DE7-9ADA-4815-A849-1ECB2186ADA6'
// ES - Youth
'C19BB95E-39BD-44AF-A8C0-7C63C35EC5C1'

/* ----------------------------------------------------------------------------
    Program - [program_providing_services]
---------------------------------------------------------------------------- */
// On change script

var cfs_clientAge = getDataValue('client_personal_view ', 'people_id', getElementFromXML(formXML, 'people_id'), 'age');

if (getFormElement('udf_call_type') == '7A5C3677-4401-4991-B38C-9B489D3E5EDF') {
    (cfs_clientAge != '') ? setFormElement('is_intake_needed', cfs_SetIntakeNeeded()) : null;
} else {
    setFormElement('is_intake_needed', '');
}


function cfs_SetIntakeNeeded() {
    var cfs_people_id = getElementFromXML(formXML, 'people_id');
    var cfs_program_providing_service_id = getFormElement('program_providing_service');
    var cfs_condition = 'people_id = \'\'' + cfs_people_id + '\'\' AND program_info_id = \'\'' + cfs_program_providing_service_id + '\'\'';

    var cfs_program_name = getDataValue('current_program_enrollment_view', 'people_id', getElementFromXML(formXML, 'people_id'), 'program_name', cfs_condition);
    var cfs_end_date = (getDataValue('current_program_enrollment_view', 'people_id', getElementFromXML(formXML, 'people_id'), 'end_date', cfs_condition));

    var cfs_has_enrollment = (cfs_program_name) ? true : false;
    var cfs_is_active = (!cfs_end_date) ? true : false;

    if (!cfs_has_enrollment) {
        var cfs_intake_needed = 'on';
    } else {
        var cfs_intake_needed = (!cfs_is_active) ? 'on' : '';
    }

    cfs_intake_needed = (getFormElement('program_providing_service') == '') ? '' : cfs_intake_needed;

    if (getFormElement('program_providing_service') != '') {
        (!cfs_intake_needed) ? alert('Client already has an active enrolment on ' + cfs_program_name + '. Current enrollment MUST be Discharged prior to Triage.') : null;
    }
    return cfs_intake_needed;
}


// Disable Rule
getFormElement('udf_call_type') == '7A5C3677-4401-4991-B38C-9B489D3E5EDF' || getDataValue('client_personal_view ', 'people_id', getElementFromXML(formXML, 'people_id'), 'age') != '';




/* ----------------------------------------------------------------------------
    Intake Needed
---------------------------------------------------------------------------- */
// Disable Rule
!isChecked('is_intake_needed');




/* ----------------------------------------------------------------------------
    Primary Reason for Referral
---------------------------------------------------------------------------- */
// Disable Rule
var cfs_callTypeArray = ['7A5C3677-4401-4991-B38C-9B489D3E5EDF', 'B7564AB8-A552-41E8-B661-43E1060EFABF'];
var cfs_callType = getFormElement('udf_call_type');
$.inArray(cfs_callType, cfs_callTypeArray) === -1;
