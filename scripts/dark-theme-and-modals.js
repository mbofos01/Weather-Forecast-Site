// Self-executing function
{
    var checker = 0;
    var s = 0;
}

function turnToBlack() {

    if (checker === 0) {
        document.getElementById('last_five_table').classList.add('table-dark');
        document.getElementById('base-window').classList.add('dark-main');
        document.getElementById('modal_header').classList.add('modal-header-dark');
        document.getElementById('modal_body').classList.add('modal-body-dark');
        document.getElementById('modal_footer').classList.add('modal-footer-dark');
        document.getElementById('modal_close').classList.add('btn-close-dark');
        document.getElementById('modal_header2').classList.add('modal-header-dark');
        document.getElementById('modal_body2').classList.add('modal-body-dark');
        document.getElementById('modal_footer2').classList.add('modal-footer-dark');
        document.getElementById('modal_close2').classList.add('btn-close-dark');
        document.getElementById('dark-button').classList.add('alert-dark');
        document.getElementById('dark-button').classList.remove('alert-light');
        document.getElementById('labels_form1').classList.add('labels-dark');
        document.getElementById('labels_form2').classList.add('labels-dark');
        document.getElementById('labels_form3').classList.add('labels-dark');
        document.getElementById('labels_form4').classList.add('labels-dark');
        document.getElementById('labels_form5').classList.add('labels-dark');
        document.getElementById('labels_form6').classList.add('labels-dark');
        document.getElementById('labels_form7').classList.add('labels-dark');
        document.getElementById('icon_switch').classList.remove('fa-moon-o');
        document.getElementById('icon_switch').classList.add('fa-sun-o');
        document.getElementById('CitySelection').classList.add('form-control-dark');
        document.getElementById('CountrySelection').classList.add('form-control-dark');
        document.getElementById('AddressInput').classList.add('form-control-dark');
        document.getElementById('RegionInput').classList.add('form-control-dark');
        document.getElementById('site_title').classList.add('title-dark');
        document.getElementById('body').classList.add('body_dark');
        document.getElementById('right_now_table').classList.add('table-dark');
        document.getElementById('next_24_table').classList.add('table-dark');
        document.getElementById('rightnow').classList.add('tab-content-dark');
        document.getElementById('nexthours').classList.add('tab-content-dark');
        document.getElementById('right_now_tab').classList.add('dark_button_tabs');
        document.getElementById('p2').classList.add('labels-dark');
        document.getElementById('h2').classList.add('labels-dark');
        document.getElementById('ws2').classList.add('labels-dark');
        document.getElementById('pres').classList.add('labels-dark');
        document.getElementById('humi').classList.add('labels-dark');
        document.getElementById('wspe').classList.add('labels-dark');
        document.getElementById('weatinfo').classList.add('labels-dark');
        document.getElementById('card-body').classList.add('modal-footer-dark');
        document.getElementById('general').classList.add('modal-footer-dark');
        document.getElementById('insert_capital').classList.add('modal-footer-dark');
        document.getElementById('info_table').classList.add('table-dark');

        checker = 1;
    } else if (checker === 1) {
        document.getElementById('last_five_table').classList.remove('table-dark');
        document.getElementById('base-window').classList.remove('dark-main');
        document.getElementById('modal_header').classList.remove('modal-header-dark');
        document.getElementById('modal_body').classList.remove('modal-body-dark');
        document.getElementById('modal_footer').classList.remove('modal-footer-dark');
        document.getElementById('modal_close').classList.remove('btn-close-dark');
        document.getElementById('modal_header2').classList.remove('modal-header-dark');
        document.getElementById('modal_body2').classList.remove('modal-body-dark');
        document.getElementById('modal_footer2').classList.remove('modal-footer-dark');
        document.getElementById('modal_close2').classList.remove('btn-close-dark');
        document.getElementById('dark-button').classList.remove('alert-dark');
        document.getElementById('dark-button').classList.add('alert-light');
        document.getElementById('labels_form1').classList.remove('labels-dark');
        document.getElementById('labels_form2').classList.remove('labels-dark');
        document.getElementById('labels_form3').classList.remove('labels-dark');
        document.getElementById('labels_form4').classList.remove('labels-dark');
        document.getElementById('labels_form5').classList.remove('labels-dark');
        document.getElementById('labels_form6').classList.remove('labels-dark');
        document.getElementById('labels_form7').classList.remove('labels-dark');
        document.getElementById('icon_switch').classList.add('fa-moon-o');
        document.getElementById('icon_switch').classList.remove('fa-sun-o');
        document.getElementById('CitySelection').classList.remove('form-control-dark');
        document.getElementById('CountrySelection').classList.remove('form-control-dark');
        document.getElementById('AddressInput').classList.remove('form-control-dark');
        document.getElementById('RegionInput').classList.remove('form-control-dark');
        document.getElementById('site_title').classList.remove('title-dark');
        document.getElementById('body').classList.remove('body_dark');
        document.getElementById('right_now_table').classList.remove('table-dark');
        document.getElementById('next_24_table').classList.remove('table-dark');
        document.getElementById('rightnow').classList.remove('tab-content-dark');
        document.getElementById('nexthours').classList.remove('tab-content-dark');
        document.getElementById('p2').classList.remove('labels-dark');
        document.getElementById('h2').classList.remove('labels-dark');
        document.getElementById('ws2').classList.remove('labels-dark');
        document.getElementById('pres').classList.remove('labels-dark');
        document.getElementById('humi').classList.remove('labels-dark');
        document.getElementById('wspe').classList.remove('labels-dark');
        document.getElementById('weatinfo').classList.remove('labels-dark');
        document.getElementById('card-body').classList.remove('modal-footer-dark');
        document.getElementById('general').classList.remove('modal-footer-dark');
        document.getElementById('insert_capital').classList.remove('modal-footer-dark');
        document.getElementById('info_table').classList.remove('table-dark');

        checker = 0;
    }


}

$(document).ready(function () {
    $("ul.navbar-nav > li").click(function (e) {
        $("ul.navbar-nav > li").removeClass("active");
        $(this).addClass("active");
    });
});

var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
});

var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl)
})