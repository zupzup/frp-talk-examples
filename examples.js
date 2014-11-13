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

    var range = Rx.Observable.range(1, 4); //this is the same thing

    var intervalStream = Rx.Observable.interval(500);

    var dataIntervalStream = Rx.Observable.zip(range, intervalStream, function(value, tick) {
        return value;
    });

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

    dataIntervalStream
    .filter(function(v) {
        return v%2 === 0; 
    }).map(function(v) {
        return v + " is an even number";
    }).subscribe(
        function(x) {
            logContent(x);
        },
        function() {},
        function() {
            logContent('completed');
        }
    );
});

