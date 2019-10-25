$(document).ready(function () {

    $('body').on('shown.bs.modal', '.modal', function () {
        $(document).off('focusin.modal')
    });

    $('.addNote-btn').each(function () {
        let id = $(this).data("id");
        $(this).popover({
            placement: 'right',
            title: 'Add Note Form',
            html: true,
            content: $(`#${id}-noteForm`).html()
        }).on('click', function (event) {
            
            $('.note-btn').click(function () {
                $(".popover").removeClass("show")
                $.ajax({
                    method: "POST",
                    url: `/article/${id}`,
                    data: {
                        title: $(".popover").find(`#${id}-note-title`).val(),
                        body: $(".popover").find(`#${id}-note-body`).val()
                    }
                })
            })
        })
    })
    $(document).on("submit", "form", function(event){
        event.preventDefault();
    })

    $(".seeNotes-btn").on("click", function () {
        let id = $(this).data("id");
        $.ajax({
            method: "GET",
            url: `/article/${id}`
        }).then(window.location = `/article/${id}`)
    })

    $(".modal").one("shown.bs.modal", function () {
        let modal = $(this).find(".modal-content-article");

        let link = $(this).data("link");
        let id = $(this).data("id");
        let frame = $("<iframe>", {
            src: link
        });
        modal.append(frame)

    })

    $('.modal-content').resizable({
        alsoResize: ".modal-dialog,.modal-content-article",
        minHeight: 300,
        minWidth: 300
    });
    $('.modal-dialog').draggable();


    // $(".save-btn").on("click", function () {
    //     let artId = $(this).data("id");

    // })

    //notes page delete button
    $(".delete-btn").on("click", function () {
        let articleId = $(this).data("id");
        $.ajax({
            method: "DELETE",
            url: `/article/`,
            data: {
                id: articleId
            }
        })
        setTimeout(location.reload(true), 1500)
    });
});