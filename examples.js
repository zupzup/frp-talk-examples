function clearContent() {
    $("#content").empty();
}

function logContent(data) {
    $("#content").append("<div>" + data + "</div>");
    console.log(data);
}

$(function() {
    var data  = [1, 2, 3, 4];
    var dataStream = Rx.Observable.from(data);
    var range = Rx.Observable.range(1, 4);

    dataStream.subscribe(
        function(x) {
            logContent(x);
        },
        function() {},
        function() {
            logContent('completed');
        }
    );
    range.subscribe(
        function(x) {
            logContent(x);
        },
        function() {},
        function() {
            logContent('completed');
        }
    );
});
