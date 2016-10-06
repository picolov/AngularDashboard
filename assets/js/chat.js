var Gab = {
    connection: null,
    currentChatJid: null,
    currentChatName: null,
    chatHistory: {},

    disconnect: function() {
        if (Gab.connection != null) {
            //Gab.connection.send($pres({type: "unavailable"}));
            Gab.connection.options.sync = true; // Switch to using synchronous requests since this is typically called onUnload.
            Gab.connection.flush();
            Gab.connection.disconnect();
            Gab.connection = null;
        }
    },

    on_history: function(iq) {
        console.log("get history : " + Strophe.serialize(iq));
        // RESULT
//        <iq xmlns='jabber:client' type='result' id='pk1' to='user@101.50.3.86/b15d895'>
//            <list xmlns='urn:xmpp:archive'>
//                <chat with='pico@101.50.3.86' start='2014-10-11T05:03:43.518Z'/>
//                <chat with='pico@101.50.3.86' start='2014-10-11T06:01:24.892Z'/>
//                <chat with='pico@101.50.3.86' start='2014-10-11T06:34:08.412Z'/>
//                <set xmlns='http://jabber.org/protocol/rsm'>
//                    <first index='0'>1</first>
//                    <last>3</last>
//                    <count>3</count>
//                </set>
//            </list>
//        </iq>
        // QUERY PER DATE
//        <iq type="get" id="sid_16">
//            <retrieve xmlns="urn:xmpp:archive" with="pico@101.50.3.86" start="2014-10-11T06:34:08.412Z">
//                <set xmlns="http://jabber.org/protocol/rsm">
//                    <max>30</max>
//                </set>
//            </retrieve>
//        </iq>
        $(iq).find('chat').each(function () {
            var withUser = $(this).attr('with');
            var startDate = $(this).attr('start');
            var getDetailIq = $iq({type: "get", id: UUID()}).c("retrieve", {xmlns: "urn:xmpp:archive", "with": withUser, "start": startDate}).c("set", {xmlns: "http://jabber.org/protocol/rsm"}).c("max").t("30");
            Gab.connection.sendIQ(getDetailIq, Gab.on_detail)
        });
    },

    on_detail: function(iq) {
        // RESULT
//        <iq type="result" id="sid_17" to="user@101.50.3.86/mac">
//            <chat xmlns="urn:xmpp:archive" with="pico@101.50.3.86" start="2014-10-11T06:01:24.892Z">
//                <to secs="0">
//                    <body>testonggg</body>
//                </to>
//                <from secs="38" jid="pico@101.50.3.86">
//                    <body>halo juga bro</body>
//                </from>
//                <set xmlns="http://jabber.org/protocol/rsm">
//                    <first index="0">0</first>
//                    <last>1</last>
//                    <count>2</count>
//                </set>
//            </chat>
//        </iq>
        var currentJid = "";
        var historyArr = [];
        $(iq).find('chat').each(function () {
            var startDate = $(this).attr("start");
            currentJid = Gab.jid_to_id($(this).attr("with"));
            $(this).children().each(function() {
                var type = $(this).prop("tagName");
                if (type == "to") {
                    var message = $(this).find("body").text();
                    historyArr.push({type: "to", message: message, start: startDate});
                } else if (type == "from") {
                    var message = $(this).find("body").text();
                    historyArr.push({type: "from", message: message, start: startDate});
                }
            });
        });
        for (var i = historyArr.length - 1; i > 0; i--) {
            Gab.chatHistory[currentJid].unshift(historyArr[i]);
        }
    },

    jid_to_id: function (jid) {
        return Strophe.getBareJidFromJid(jid)
            .replace(/@/g, "-")
            .replace(/\./g, "-");
    },

    on_roster: function (iq) {
        $(iq).find('item').each(function () {
            var jid = $(this).attr('jid');
            var name = $(this).attr('name') || jid;

            // transform jid into an id
            var roster_jid_id = Gab.jid_to_id(jid);
            /*
            var contact = $("<li id='" + jid_id + "'>" +
                "<div class='roster-contact offline'>" +
                "<div class='roster-name'>" +
                name +
                "</div><div class='roster-jid'>" +
                jid +
                "</div></div></li>");
            */
            var contact = $("<li id='" + roster_jid_id + "' data-jid='" + jid + "' data-stats='offline'><a href='javascript:;'><img src='" + chatPhotoURL + "' alt=''><span>" + name + "</span></a></li>");
            Gab.insert_contact(contact);
        });

        // set up presence handler and send initial presence
        Gab.connection.addHandler(Gab.on_presence, null, "presence");
        Gab.connection.send($pres().tree());
    },

    pending_subscriber: null,

    on_presence: function (presence) {
        var ptype = $(presence).attr('type');
        var from = $(presence).attr('from');
        var jid_id = Gab.jid_to_id(from);

        if (ptype === 'subscribe') {
            // populate pending_subscriber, the approve-jid span, and
            // open the dialog
            Gab.pending_subscriber = from;
            /*
            $('#approve-jid').text(Strophe.getBareJidFromJid(from));
            $('#approve_dialog').dialog('open');
            */
            bootbox.dialog({
                message: Strophe.getBareJidFromJid(from) + " has requested a subscription to your presence.  Approve or deny?",
                title: "Pending Invitation",
                buttons: {
                    danger: {
                        label: "Deny",
                        className: "btn-danger",
                        callback: function() {
                            Gab.connection.send($pres({
                                to: Gab.pending_subscriber,
                                "type": "unsubscribed"}));
                            Gab.pending_subscriber = null;
                        }
                    },
                    success: {
                        label: "Approve",
                        className: "btn-success",
                        callback: function() {
                            Gab.connection.send($pres({
                                to: Gab.pending_subscriber,
                                "type": "subscribed"}));

                            Gab.connection.send($pres({
                                to: Gab.pending_subscriber,
                                "type": "subscribe"}));

                            Gab.pending_subscriber = null;
                        }
                    }
                }
            });
        } else if (ptype !== 'error') {
            var contact = $('#chatbody li#' + jid_id);
            if (contact.length > 0) {
                if (ptype === 'unavailable') {
                    contact.attr("data-stats", "offline");
                    console.log(jid_id + " is offline");
                } else {
                    var show = $(presence).find("show").text();
                    if (show === "" || show === "chat") {
                        contact.attr("data-stats", "online");
                        console.log(jid_id + " is online");
                    } else {
                        contact.attr("data-stats", "away");
                        console.log(jid_id + " is away");
                    }
                }
                contact.remove();
                Gab.insert_contact(contact);
            }

        }
        /*
        // reset addressing for user since their presence changed
        var jid_id = Gab.jid_to_id(from);
        $('#chat-' + jid_id).data('jid', Strophe.getBareJidFromJid(from));
        */
        return true;
    },

    on_roster_changed: function (iq) {
        $(iq).find('item').each(function () {
            var sub = $(this).attr('subscription');
            var jid = $(this).attr('jid');
            var name = $(this).attr('name') || jid;
            var jid_id = Gab.jid_to_id(jid);

            if (sub === 'remove') {
                // contact is being removed
                $('#' + jid_id).remove();
            } else {
                // contact is being added or modified
                /*
                var contact_html = "<li id='" + jid_id + "'>" +
                    "<div class='" +
                    ($('#' + jid_id).attr('class') || "roster-contact offline") +
                    "'>" +
                    "<div class='roster-name'>" +
                    name +
                    "</div><div class='roster-jid'>" +
                    jid +
                    "</div></div></li>";
                */
                var contact_html = "<li id='" + jid_id + "' data-jid='" + jid + "' data-stats='offline'><a href='javascript:;'><img src='" + chatPhotoURL + "' alt=''><span>" + name + "</span></a></li>";

                if ($('#' + jid_id).length > 0) {
                    $('#' + jid_id).replaceWith(contact_html);
                } else {
                    Gab.insert_contact($(contact_html));
                }
            }
        });

        return true;
    },

    on_message: function (message) {
        var full_jid = $(message).attr('from');
        var jid = Strophe.getBareJidFromJid(full_jid);
        var jid_id = Gab.jid_to_id(jid);
        console.log("on message from : " + full_jid);
        /*
        if ($('#chat-' + jid_id).length === 0) {
            $('#chat-area').tabs('add', '#chat-' + jid_id, jid);
            $('#chat-' + jid_id).append(
                "<div class='chat-messages'></div>" +
                    "<input type='text' class='chat-input'>");
        }

        $('#chat-' + jid_id).data('jid', full_jid);

        $('#chat-area').tabs('select', '#chat-' + jid_id);
        $('#chat-' + jid_id + ' input').focus();

        var composing = $(message).find('composing');
        if (composing.length > 0) {
            $('#chat-' + jid_id + ' .chat-messages').append(
                "<div class='chat-event'>" +
                    Strophe.getNodeFromJid(jid) +
                    " is typing...</div>");

            Gab.scroll_chat(jid_id);
        }
        */
        var body = $(message).find("html > body");

        if (body.length === 0) {
            body = $(message).find('body');
            if (body.length > 0) {
                body = body.text()
            } else {
                body = null;
            }
        } else {
            body = body.contents();

            var span = $("<span></span>");
            body.each(function () {
                if (document.importNode) {
                    $(document.importNode(this, true)).appendTo(span);
                } else {
                    // IE workaround
                    span.append(this.xml);
                }
            });

            body = span;
        }

        if (body) {
            /*
            // remove notifications since user is now active
            $('#chat-' + jid_id + ' .chat-event').remove();

            // add the new message
            $('#chat-' + jid_id + ' .chat-messages').append(
                "<div class='chat-message'>" +
                    "&lt;<span class='chat-name'>" +
                    Strophe.getNodeFromJid(jid) +
                    "</span>&gt;<span class='chat-text'>" +
                    "</span></div>");

            $('#chat-' + jid_id + ' .chat-message:last .chat-text')
                .append(body);

            Gab.scroll_chat(jid_id);
            */
            Gab.chatHistory[jid_id].push({type: "from", message: body, start: "-date-"});
            if ($("#chatarea").is(':visible') && Gab.currentChatJid == jid) {
                $("#chatarea .chathistory").append('<div class="chatmsg">' +
                    '<p>' + body + '</p>' +
                    //'<span class="timestamp">' + startDate + '</span>' +
                    '</div>');
                $(".chathistory").getNiceScroll().resize();
                $(".chathistory").scrollTop($(".chathistory").prop("scrollHeight"));
            } else {
                // show notification on the list
                var contact = $('#chatbody li#' + jid_id);
                if (contact.length > 0) {
                    var text = contact.find("span").text();
                    contact.find("span").html(text + " <i class='fa fa-comment-o'></i>");
                }
            }

            console.log("on message, jid : " + Strophe.getNodeFromJid(jid) + ", body : " + body);
        }

        return true;
    },

    scroll_chat: function (jid_id) {
        var div = $('#chat-' + jid_id + ' .chat-messages').get(0);
        div.scrollTop = div.scrollHeight;
    },


    presence_value: function (elem) {
        if (elem.data('stats') == 'online') {
            return 2;
        } else if (elem.data('stats') == 'away') {
            return 1;
        }

        return 0;
    },

    insert_contact: function (elem) {
        var jid = elem.data('jid');
        var pres = Gab.presence_value(elem);

        var contacts = $('#chatbody li');

        if (contacts.length > 0) {
            var inserted = false;
            contacts.each(function () {
                var cmp_pres = Gab.presence_value(
                    $(this));
                var cmp_jid = $(this).data('jid');

                if (pres > cmp_pres) {
                    $(this).before(elem);
                    inserted = true;
                    return false;
                } else if (pres === cmp_pres) {
                    if (jid < cmp_jid) {
                        $(this).before(elem);
                        inserted = true;
                        return false;
                    }
                }
            });

            if (!inserted) {
                $('#chatbody ul').append(elem);
            }
        } else {
            $('#chatbody ul').append(elem);
        }
        // get all history for each contacts
        if (Gab.chatHistory[Gab.jid_to_id(jid)] == null) {
            Gab.chatHistory[Gab.jid_to_id(jid)] = [];
            var getArchiveIq = $iq({type: "get", id: UUID()}).c("list", {xmlns: "urn:xmpp:archive", "with": jid}).c("set", {xmlns: "http://jabber.org/protocol/rsm"}).c("max").t("30");
            Gab.connection.sendIQ(getArchiveIq, Gab.on_history);
        }
        elem.find("a").click(function () {
            Gab.currentChatJid = $(this).parent().data("jid");
            Gab.currentChatName = $(this).find("span").text();
            $(this).find("span i").remove();

//        <iq type='get' id='juliet1'>
//            <list xmlns='urn:xmpp:archive'
//            with='juliet@capulet.com'>
//                <set xmlns='http://jabber.org/protocol/rsm'>
//                    <max>30</max>
//                </set>
//            </list>
//        </iq>

            if (Gab.currentChatJid != null) {
                $("#chatarea .chatuser span").text(Gab.currentChatName);
                $("#chatarea .chathistory").empty();
            }
            for (var i = 0; i < Gab.chatHistory[Gab.jid_to_id(Gab.currentChatJid)].length; i++) {
                if (Gab.chatHistory[Gab.jid_to_id(Gab.currentChatJid)][i].type == "to") {
                    $("#chatarea .chathistory").append('<div class="chatmsg sent">' +
                        '<p>' + Gab.chatHistory[Gab.jid_to_id(Gab.currentChatJid)][i].message + '</p>' +
                        //'<span class="timestamp">' + Gab.chatHistory[Gab.jid_to_id(Gab.currentChatJid)][i].start + '</span>' +
                        '</div>');
                } else if (Gab.chatHistory[Gab.jid_to_id(Gab.currentChatJid)][i].type == "from") {
                    $("#chatarea .chathistory").append('<div class="chatmsg">' +
                        '<p>' + Gab.chatHistory[Gab.jid_to_id(Gab.currentChatJid)][i].message + '</p>' +
                        //'<span class="timestamp">' + Gab.chatHistory[Gab.jid_to_id(Gab.currentChatJid)][i].start + '</span>' +
                        '</div>');
                }
            }
            $("#widgetarea").toggle();
            $("#chatarea").toggle();
            $(".chathistory").getNiceScroll().resize();
            $(".chathistory").scrollTop($(".chathistory").prop("scrollHeight"));
            //$(".chathistory").animate({ scrollTop: $(document).height() }, 0);
        });
    }
};

$(document).ready(function () {

    // pico custom
    chatConnect(username + "@spektasolusi.com", "password");

    // end pico custom

    /*
    $('#login_dialog').dialog({
        autoOpen: true,
        draggable: false,
        modal: true,
        title: 'Connect to XMPP',
        buttons: {
            "Connect": function () {
                $(document).trigger('connect', {
                    jid: $('#jid').val().toLowerCase(),
                    password: $('#password').val()
                });

                $('#password').val('');
                $(this).dialog('close');
            }
        }
    });

    $('#contact_dialog').dialog({
        autoOpen: false,
        draggable: false,
        modal: true,
        title: 'Add a Contact',
        buttons: {
            "Add": function () {
                $(document).trigger('contact_added', {
                    jid: $('#contact-jid').val().toLowerCase(),
                    name: $('#contact-name').val()
                });

                $('#contact-jid').val('');
                $('#contact-name').val('');

                $(this).dialog('close');
            }
        }
    });

    $('#new-contact').click(function (ev) {
        $('#contact_dialog').dialog('open');
    });

    $('#approve_dialog').dialog({
        autoOpen: false,
        draggable: false,
        modal: true,
        title: 'Subscription Request',
        buttons: {
            "Deny": function () {
                Gab.connection.send($pres({
                    to: Gab.pending_subscriber,
                    "type": "unsubscribed"}));
                Gab.pending_subscriber = null;

                $(this).dialog('close');
            },

            "Approve": function () {
                Gab.connection.send($pres({
                    to: Gab.pending_subscriber,
                    "type": "subscribed"}));

                Gab.connection.send($pres({
                    to: Gab.pending_subscriber,
                    "type": "subscribe"}));

                Gab.pending_subscriber = null;

                $(this).dialog('close');
            }
        }
    });

    $('#chat-area').tabs().find('.ui-tabs-nav').sortable({axis: 'x'});

    $('.roster-contact').live('click', function () {
        var jid = $(this).find(".roster-jid").text();
        var name = $(this).find(".roster-name").text();
        var jid_id = Gab.jid_to_id(jid);

        if ($('#chat-' + jid_id).length === 0) {
            $('#chat-area').tabs('add', '#chat-' + jid_id, name);
            $('#chat-' + jid_id).append(
                "<div class='chat-messages'></div>" +
                    "<input type='text' class='chat-input'>");
            $('#chat-' + jid_id).data('jid', jid);
        }
        $('#chat-area').tabs('select', '#chat-' + jid_id);

        $('#chat-' + jid_id + ' input').focus();
    });

    $('.chat-input').live('keypress', function (ev) {
        var jid = $(this).parent().data('jid');

        if (ev.which === 13) {
            ev.preventDefault();

            var body = $(this).val();

            var message = $msg({to: jid,
                "type": "chat"})
                .c('body').t(body).up()
                .c('active', {xmlns: "http://jabber.org/protocol/chatstates"});
            Gab.connection.send(message);

            $(this).parent().find('.chat-messages').append(
                "<div class='chat-message'>&lt;" +
                    "<span class='chat-name me'>" +
                    Strophe.getNodeFromJid(Gab.connection.jid) +
                    "</span>&gt;<span class='chat-text'>" +
                    body +
                    "</span></div>");
            Gab.scroll_chat(Gab.jid_to_id(jid));

            $(this).val('');
            $(this).parent().data('composing', false);
        } else {
            var composing = $(this).parent().data('composing');
            if (!composing) {
                var notify = $msg({to: jid, "type": "chat"})
                    .c('composing', {xmlns: "http://jabber.org/protocol/chatstates"});
                Gab.connection.send(notify);

                $(this).parent().data('composing', true);
            }
        }
    });

    $('#disconnect').click(function () {
        Gab.connection.disconnect();
        Gab.connection = null;
    });

    $('#chat_dialog').dialog({
        autoOpen: false,
        draggable: false,
        modal: true,
        title: 'Start a Chat',
        buttons: {
            "Start": function () {
                var jid = $('#chat-jid').val().toLowerCase();
                var jid_id = Gab.jid_to_id(jid);

                $('#chat-area').tabs('add', '#chat-' + jid_id, jid);
                $('#chat-' + jid_id).append(
                    "<div class='chat-messages'></div>" +
                        "<input type='text' class='chat-input'>");

                $('#chat-' + jid_id).data('jid', jid);

                $('#chat-area').tabs('select', '#chat-' + jid_id);
                $('#chat-' + jid_id + ' input').focus();


                $('#chat-jid').val('');

                $(this).dialog('close');
            }
        }
    });

    $('#new-chat').click(function () {
        $('#chat_dialog').dialog('open');
    });
    */
});

var server_ip = '101.50.1.109';
var BOSH_SERVICE = 'http://' + server_ip + '/http-bind';

function chatConnect(jid, password) {
    var conn = new Strophe.Connection(
        BOSH_SERVICE);

    conn.connect(jid, password, function (status) {
        if (status === Strophe.Status.CONNECTED) {
            chatConnected();
        } else if (status === Strophe.Status.DISCONNECTED) {
            chatDisconnected();
        }
    });

    Gab.connection = conn;
}

// var iq = $iq({to: “email@new.com”, type: “get”, id: “id1”}).c(“query”, {xmlns: “http://jabber.org/protocol/disco#info”});
// Produces
// <iq to=’email@new.com’ type=’get’ id=’id1’>
//      <query xmlns=’http://jabber.org/protocol/disco#info’/>
// </iq>

//<iq type='get' id='pk1'>
//    <list xmlns='urn:xmpp:archive'
//    with='piyush@openfire'>
//        <set xmlns='http://jabber.org/protocol/rsm'>
//            <max>30</max>
//        </set>
//    </list>
//</iq>

// var getArchiveIq = $iq({type: "get", id: "pk1"}).c("list", {xmlns: "urn:xmpp:archive", "with": "pico@101.50.3.86"}).c("set", {xmlns: "http://jabber.org/protocol/rsm"}).c("max").t("30");

// var presence = $pres().c(“show”).t(“away”).up().c(“status”).t(“Listening to Music”);
// Produces
// <presence>
//      <show>away</show>
//      <status>Listening to Music</status>
// </presence>

function chatConnected() {
    var iq = $iq({type: 'get'}).c('query', {xmlns: 'jabber:iq:roster'});
    Gab.connection.sendIQ(iq, Gab.on_roster);

    Gab.connection.addHandler(Gab.on_roster_changed,
        "jabber:iq:roster", "iq", "set");

    Gab.connection.addHandler(Gab.on_message,
        null, "message", "chat");
}

function chatDisconnected() {
    Gab.connection = null;
    Gab.pending_subscriber = null;
    /*
    $('#roster-area ul').empty();
    $('#chat-area ul').empty();
    $('#chat-area div').remove();

    $('#login_dialog').dialog('open');
    */
};

$(document).bind('contact_added', function (ev, data) {
    var iq = $iq({type: "set"}).c("query", {xmlns: "jabber:iq:roster"})
        .c("item", data);
    Gab.connection.sendIQ(iq);

    var subscribe = $pres({to: data.jid, "type": "subscribe"});
    Gab.connection.send(subscribe);
});

$('.chatinput textarea').keypress(function (e) {
    if (e.which == 13) {

        var chatmsg = $(".chatinput textarea").val();
        var oo=$(".chathistory").html();

        var d=new Date();
        var n=d.toLocaleTimeString();


        if (!!$(".chatinput textarea").val()) {
            //$(".chathistory").html(oo+ "<div class='chatmsg'><p>"+chatmsg+"</p><span class='timestamp'>"+n+"</span></div>");
            console.log("to : " + Gab.currentChatJid + ", message : " + chatmsg);
            var chatStanza = $msg({to: Gab.currentChatJid, type: "chat"})
                .c("body")
                .t(chatmsg);
            Gab.connection.send(chatStanza.tree());
            Gab.chatHistory[Gab.jid_to_id(Gab.currentChatJid)].push({type: "to", message: chatmsg, start: "-date-"});

            $("#chatarea .chathistory").append('<div class="chatmsg sent">' +
                '<p>' + chatmsg + '</p>' +
                //'<span class="timestamp">' + startDate + '</span>' +
                '</div>');
            $(".chathistory").getNiceScroll().resize();
            $(".chathistory").scrollTop($(".chathistory").prop("scrollHeight"));
        }

//        <iq type='get' id='juliet1'>
//            <list xmlns='urn:xmpp:archive'
//            with='juliet@capulet.com'>
//                <set xmlns='http://jabber.org/protocol/rsm'>
//                    <max>30</max>
//                </set>
//            </list>
//        </iq>

        $(this).val(''); // empty textarea

        return false;
    }
});