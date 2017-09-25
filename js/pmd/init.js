/* vim: set expandtab sw=4 ts=4 sts=4: */
/**
 * Initialises the data required to run PMD, then fires it up.
 */

var j_tabs, h_tabs, contr, display_field, server, db, selected_page, pmd_tables_enabled;

AJAX.registerTeardown('pmd/init.js', function () {
    $('.trigger').off('click');
});

AJAX.registerOnload('pmd/init.js', function () {
    $('.trigger').click(function () {
        $('.panel').toggle('fast');
        $(this).toggleClass('active');
        $('#ab').accordion('refresh');
        return false;
    });
    var tables_data = JSON.parse($('#script_tables').html());

    j_tabs             = tables_data.j_tabs;
    h_tabs             = tables_data.h_tabs;
    contr              = JSON.parse($('#script_contr').html());
    display_field      = JSON.parse($('#script_display_field').html());

    server             = $('#script_server').html();
    db                 = $('#script_db').html();
    selected_page      = $('#script_display_page').html() === '' ? '-1' : $('#script_display_page').html();
    pmd_tables_enabled = $('#pmd_tables_enabled').html() === '1';

    Main();

    if (! pmd_tables_enabled) {
        DesignerOfflineDB.open(function (success) {
            if (success) {
                Show_tables_in_landing_page(db);
            }
        });
    }

    $('#query_Aggregate_Button').click(function () {
        document.getElementById('query_Aggregate').style.display = 'none';
    });

    $('#query_having_button').click(function () {
        document.getElementById('query_having').style.display = 'none';
    });

    $('#query_rename_to_button').click(function () {
        document.getElementById('query_rename_to').style.display = 'none';
    });

    $('#build_query_button').click(function () {
        build_query('SQL Query on Database', 0);
    });

    $('#query_where_button').click(function () {
        document.getElementById('query_where').style.display = 'none';
    });
});
