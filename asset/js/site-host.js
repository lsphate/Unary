function eliminateDuplicates(arr) {
    var i, len = arr.length,
        out = [],
        obj = {};

    for (i = 0; i < len; i++) {
        obj[arr[i]] = 0;
    }
    for (i in obj) {
        if (i != ' ') out.push(i);
    }
    return out;
}


var UniqueID = function(str) {
    var len = str.length;
    var chars = [];
    for (var i = 0; i < len; i++) {
        chars[i] = str[Math.floor((Math.random() * len))];
    }
    var filtered = eliminateDuplicates(chars);
    return filtered.join('');
}

function CalcHash() {
    var hostname = $('form').find('input[name="hostname"]').val(),
        d = new Date();
    var toHash = hostname
                + d.getFullYear().toString()
                + (d.getMonth()+1).toString()
                + d.getDate().toString()
                + d.getHours().toString()
                + d.getMinutes().toString()
                + d.getSeconds().toString();
    return toHash;
}

$(function() {
    $('.datetimepicker').datetimepicker();
    $(document).on('click', '.btn-add', function(e) {
        e.preventDefault();

        var controlForm = $('.row form:first');
        var currentEntry = $(this).parents('.entry:first');
        var newEntry = currentEntry.clone();
        controlForm.find('div.entry:last').after(newEntry);

        newEntry.find('input').val('');
        controlForm.find('.entry:not(:last) .btn-add')
            .removeClass('btn-add').addClass('btn-remove')
            .removeClass('btn-success').addClass('btn-danger')
            .html('<span class="glyphicon glyphicon-minus"></span>');

        $('.datetimepicker').datetimepicker();
    }).on('click', '.btn-remove', function(e) {
        $(this).parents('.entry:first').remove();

        e.preventDefault();
        return false;
    }).on('click', '.btn-default', function(e) {
        $('input:hidden').val(UniqueID(CalcHash()));
    });
});
