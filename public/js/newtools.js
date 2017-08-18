$(function () {


    $("#postForm").on('init.field.fv', function (e, data) {
        var $parent = data.element.parents('.form-group'),
            $icon = $parent.find('.form-control-feedback[data-fv-icon-for="' + data.field + '"]');
        $icon.on('click.clearing', function () {
            if ($icon.hasClass('fa-remove')) {
                data.fv.resetField(data.element);
            }
        });
    }).formValidation({
            framework: 'bootstrap',
            icon: {
                valid: 'fa fa-check',
                invalid: 'fa fa-remove',
                validating: 'fa fa-refresh'
            },
            err: {
                container: 'tooltip'
            },
            fields: {
                Title: {
                    validators: {
                        notEmpty: {
                            message: '标题不能为空'
                        }
                    }
                },
                Summary: {
                    validators: {
                        notEmpty: {
                            message: '摘要不能为空'
                        }
                    }
                },
                Url: {
                    validators: {
                        notEmpty: {
                            message: 'Url不能为空'
                        },
                        uri: {
                            message: 'Url地址不正确'
                        }
                    }
                }
            }
        })
        .on('err.field.fv', function (e, data) {
            data.fv.disableSubmitButtons(false);
        })
        .on('success.field.fv', function (e, data) {
            data.fv.disableSubmitButtons(false);
        })
        .on('success.form.fv', function (e) {
            e.preventDefault()
            swal({
                    title: "确定要发布吗？",
                    text: null,
                    html: true,
                    type: "warning",
                    allowOutsideClick: true,
                    showCancelButton: true,
                    cancelButtonText: "取消",
                    confirmButtonColor: "#d9534f",
                    confirmButtonText: "确定发布",
                    closeOnConfirm: false
                },
                function () {
                    $(".sweet-alert .confirm").text("发布中...");
                    $(".sweet-alert .confirm").attr("disabled", "disabled");
                    $.ajax({
                        url: $("#postForm")[0].action,
                        type: $("#postForm")[0].method,
                        data: $("#postForm").serialize(),
                        success: function () {
                            swal({
                                title: "发布成功！",
                                type: "success",
                                showConfirmButton: false,
                                timer: 2000
                            }, function () {
                                window.location.href = "/admin/toolsmanage";
                            });
                        },
                        error: function () {
                            swal({
                                title: "发布失败！",
                                type: "error",
                                showConfirmButton: false,
                                timer: 2000
                            });
                        },
                        complete: function () {
                            $(".sweet-alert .confirm").removeAttr("disabled");
                        }
                    });
                });
        });

    $('#btnSave').on('click', function () {
        var $this = $(this);
        $this.attr('disabled', 'disabled');
        $.ajax({
            url: $("#postForm")[0].action,
            type: $("#postForm")[0].method,
            data: $("#postForm").serialize(),
            success: function () {
                swal({
                    title: '草稿保存成功！',
                    type: 'success',
                    showConfirmButton: false,
                    timer: 2000
                }, function () {
                    window.location.href = '/admin/edittools/' + $('#UniqueId').val();
                });
            },
            error: function () {
                swal({
                    title: "草稿保存失败！",
                    type: "error",
                    showConfirmButton: false,
                    timer: 2000
                });
            },
            complete: function () {
                $this.removeAttr("disabled");
            }
        });
    });


});
