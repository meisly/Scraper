$(document).ready(function () {
   
    $('body').on('shown.bs.modal','.modal', function() {
        $(document).off('focusin.modal')
      });

    $('.addNote-btn').each(function () {
        let id = $(this).data("id");
        let pops = $(this);
        $(this).popover({
            placement: 'right',
            title: 'Add Note Form',
            html: true,
            content: $(`#${id}-noteForm`).html()
        }).on('click', function () {
            // had to put it within the on click action so it grabs the correct info on submit
            $('.note-btn').click(function () {
                $.ajax({
                    method: "POST",
                    url: `/article/${id}`,
                    data: {
                        title: $(".popover").find(`#${id}-note-title`).val(),
                        body: $(".popover").find(`#${id}-note-body`).val()
                    }
                }).then((r)=>{
                    pops.popover('hide')
                })
            })
        })
    })
    $(".seeNotes-btn").on("click", function(){
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

    $(".save-btn").on("click", function () {
        let artId = $(this).data("id");

    })
})