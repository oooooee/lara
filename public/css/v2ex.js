// refresh money
function refreshMoney() {
    $.post('/ajax/money', function(data) {
        $('#money').html(data);
    });
}

var moveEnd = function(obj){
	obj.focus();
	var len = obj.value.length;
	if (document.selection) {
		var sel = obj.createTextRange();
		sel.moveStart('character',len);
		sel.collapse();
		sel.select();
	} else if (typeof obj.selectionStart == 'number' && typeof obj.selectionEnd == 'number') {
		obj.selectionStart = obj.selectionEnd = len;
	}
}

function dispatch() {
    var q = document.getElementById("q");
    if (q.value != "") {
        var url = 'http://www.google.com/search?q=site:v2ex.com/t%20' + q.value;
        if (navigator.userAgent.indexOf('iPad') > -1 || navigator.userAgent.indexOf('iPhone') > -1 || navigator.userAgent.indexOf('iPhone') > -1) {
            location.href = url;
        } else {
            window.open(url, "_blank");
        }
        return false;
    } else {
        return false;
    }
}

// reply a reply
function replyOne(username){
    replyContent = $("#reply_content");
	oldContent = replyContent.val();
	prefix = "@" + username + " ";
	newContent = ''
	if(oldContent.length > 0){
	    if (oldContent != prefix) {
	        newContent = oldContent + "\n" + prefix;
	    }
	} else {
	    newContent = prefix
	}
	replyContent.focus();
	replyContent.val(newContent);
	moveEnd($("#reply_content"));
}

// send a thank to reply
function thankReply(replyId, token) {
    $.post('/thank/reply/' + replyId + "?t=" + token, function() {
        $('#thank_area_' + replyId).addClass("thanked").html("感谢已发送");
        refreshMoney();
    });
}

// send a thank to topic
function thankTopic(topicId, token) {
    $.post('/thank/topic/' + topicId + "?t=" + token, function(data) {
        $('#topic_thank').html('<span class="f11 gray" style="text-shadow: 0px 1px 0px #fff;">感谢已发送</span>');
        refreshMoney();
    });
}

function upVoteTopic(topicId) {
    if (csrfToken) {
        var request = $.ajax({
            url: '/up/topic/' + topicId + "?t=" + csrfToken,
            type: "POST",
            dataType: "json"
        });
        request.done(function(data) {
            if (data.changed) {
                $('#topic_' + topicId + '_votes').html(data.html);
            }
        });
    }
}

function downVoteTopic(topicId) {
    if (csrfToken) {
        var request = $.ajax({
            url: '/down/topic/' + topicId + "?t=" + csrfToken,
            type: "POST",
            dataType: "json"
        });
        request.done(function(data) {
            if (data.changed) {
                $('#topic_' + topicId + '_votes').html(data.html);
            }
        });
    }
}

function ignoreReply(replyId, token) {
    $.post('/ignore/reply/' + replyId + "?once=" + token, function(data) {
        
    });
    $("#r_" + replyId).slideUp('fast');
}

function deleteNotification(nId, token) {
    $.post('/delete/notification/' + nId + '?once=' + token, function(data) {
        
    });
    $("#n_" + nId).slideUp('fast');
}

// for GA
function recordOutboundLink(link, category, action) {
    try {
        var pageTracker=_gat._getTracker("UA-11940834-2");
        pageTracker._trackEvent(category, action);
        // setTimeout('document.location = "' + link.href + '"', 100)
    } catch(err) {}
}

function protectTraffic() {
    var l = top.location.href;
	if ((l.indexOf("v2ex.com") == -1) && (l.indexOf("127.0.0.1:") == -1) && (l.indexOf("localhost:") == -1) && (l.indexOf("192.168") == -1)) {
		location.href = 'http://www.v2ex.com/';
	}
}

function previewTopic() {
    var box = $("#box");
    var preview = $("#topic_preview");
    if (preview.length == 0) {
        box.append('<div class="inner" id="topic_preview"></div>');
        preview = $("#topic_preview");
    }
    var md = editor.getValue();
    $.post( "/preview/markdown", { 'md' : md }, function( data ) {
        preview.html('<div class="topic_content"><div class="markdown_body">' + data + '</div></div>');
    });
}

function publishTopic() {
    var errors = 0;
    var em = $("#error_message");
    
    var content = editor.getValue();
    
    var title = $("#topic_title").val();

    if (title.length == 0) {
        errors++;
        em.html("主题标题不能为空");
    } else if (title.length > 120) {
        errors++;
        em.html("主题标题不能超过 120 个字符");
    }

    if (content.length > 20000) {
        errors++;
        em.html("主题内容不能超过 20000 个字符");
    }

    if (errors == 0) {
        var input_content = $("#topic_content");
        input_content.val(content);
        var form = $("#compose");
        return form.submit();
    }
}
