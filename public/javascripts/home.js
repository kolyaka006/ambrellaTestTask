if (!localStorage.getItem('token'))
    window.location.replace('/login')
$(document).ready(function () {
    //GET USERS LINKS
    $.ajax({
        url: '/get-all-links-user',
        type: 'get',
        headers: {
            token: localStorage.getItem('token')
        },
        dataType: 'json',
        success: function (res) {
            $.each(res, function (id, data) {
                addLinks(data);
            })
        },
        error: function (err) {
            if (err.status == 403) {
                window.location.replace('/login')
            }
        }
    });


    $('.save-btn').on('click', function () {
        var real = $('.real-link').val();
        var short = $('.short-link').val();
        if (real) {
            $.notify('Send data', 'info');
            $.ajax({
                url: '/create-url',
                type: 'post',
                data: {real: real, short: short},
                headers: {
                    token: localStorage.getItem('token')
                },
                dataType: 'json',
                success: function (res) {
                    addLinks(res);
                    $.notify('Link added', 'success');
                },
                error: function (err) {
                    if (err.status == 350) {
                        $('.real-link').parent().addClass('error');
                        $('.error-real-link').addClass('fade');
                    }
                    if (err.status == 351) {
                        $('.short-link').parent().addClass('error');
                        $('.error-short-link').addClass('fade');
                    }
                    if (err.status == 403) {
                        $.notify('The token is not valid', 'error')
                        window.location.replace('/login')
                    }
                }
            });
        } else {
            $('.real-link').parent().addClass('error');

        }
    });

    $('.real-link').on('focus', function () {
        $('.real-link').parent().removeClass('error');
        $('.error-real-link').removeClass('fade');
    });

    $('.short-link').on('focus', function () {
        $('.short-link').parent().removeClass('error');
        $('.error-short-link').removeClass('fade');
    })

    function addLinks(data) {
        var child = '<div class='
        m - t - 10
        m - b - 10
        animation - text
        fade
        '> ' +
        '<div>Real link: <a href='
        ' + data.real + '
        '>' + data.real + '</a></div>' +
        '<div>Short link: <a href='
        ' + location.origin + ' / ' + data.short + '
        '>' + location.origin + '/' + data.short + '</a></div>' +
        '<div>Count:' + data.count || 0 + '</a></div>' +
        '</div>'
        $('.list-links').append(child)
    }
})