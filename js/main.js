$(document).ready(function () {
    $("#checkAll").click(function(){
        $('input:checkbox').not('.checkbox-switch').each(function(index, value) {
            if($(this).is(':visible')){
                console.log(index);
                $(this).prop('checked', !this.checked);
            }
        });
        $(this).prop('checked', !this.checked);
    });

    $('input:checkbox').not('.checkbox-switch').not('#checkAll').click(function(e){
        if ($('input[type=checkbox]:checked').not('.checkbox-switch').not('#checkAll').length == 1) {
            $('#checkAll').prop('checked', true);
        }
        if ($('input[type=checkbox]:checked').not('.checkbox-switch').not('#checkAll').not(this).length == 0) {
            $('#checkAll').prop('checked', this.checked);
        }
    });

    function SearchBarFilter() {
        var value = $(".search-box").val().toLowerCase();
        if(value.length > 0){
            $("#table table tbody tr").filter(function() {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            });
        }
    }
    
    $(".search-box").on("keyup", function() {
        SearchBarFilter();
    });

    $('#btn-sprint').click(function () {
        if ($('#btn-sprint label input').prop('checked')) {
            if($('#btn-trunk label input').prop('checked')) {
                $("#table table tbody tr").filter(function() {
                    $(this).toggle($(this).text().toLowerCase().indexOf('') > -1)
                });
            } else {
                $("#table table tbody tr").filter(function() {
                    $(this).toggle($(this).text().toLowerCase().indexOf('sprint') > -1)
                });
            }
        } else{
            if (!$('#btn-trunk label input').prop('checked')) {
                $("#table table tbody tr").filter(function() {
                    $(this).toggle($(this).text().toLowerCase().indexOf('sprint') == -1 && $(this).text().toLowerCase().indexOf('trunk') == -1)
                });
            } else {
                $("#table table tbody tr").filter(function() {
                    $(this).toggle($(this).text().toLowerCase().indexOf('sprint') == -1)
                });
            }
        }

        SearchBarFilter();
    });

    $('#btn-trunk').click(function () {
        if ($('#btn-trunk label input').prop('checked')) {
            if($('#btn-sprint label input').prop('checked')) {
                $("#table table tbody tr").filter(function() {
                    $(this).toggle($(this).text().toLowerCase().indexOf('') > -1)
                });
            } else {
                $("#table table tbody tr").filter(function() {
                    $(this).toggle($(this).text().toLowerCase().indexOf('trunk') > -1)
                });
            }
        } else{
            if (!$('#btn-sprint label input').prop('checked')) {
                $("#table table tbody tr").filter(function() {
                    $(this).toggle($(this).text().toLowerCase().indexOf('trunk') == -1 && $(this).text().toLowerCase().indexOf('sprint') == -1)
                });
            } else {
                $("#table table tbody tr").filter(function() {
                    $(this).toggle($(this).text().toLowerCase().indexOf('trunk') == -1)
                });
            }
        }
        
        SearchBarFilter();
    });

    $('.btn-base .compiler').click(function () {
        //compile files
    });
});