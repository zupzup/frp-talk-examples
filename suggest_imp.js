(function (global, $, undefined) {
    var delayTimeout = null,
        oldValue = null,
        currentRequest = null;

  // Search Wikipedia for a given term
  function searchWikipedia (term) {
    // Make sure we always use the last data
    if(currentRequest) {
        currentRequest.abort();
    }

    delayTimeout = null;
    currentRequest = $.ajax({
      url: 'http://en.wikipedia.org/w/api.php',
      dataType: 'jsonp',
      data: {
        action: 'opensearch',
        format: 'json',
        search: global.encodeURI(term)
      }
    });
    return currentRequest.promise();
  }

  function main() {
    var $input = $('#textInput'),
        $results = $('#results');

    $input.keyup(function() {
        // only if there are more than 2 characters
        if($input.val().length <= 2) {
            return;
        }

        // only if the value changed
        if(oldValue !== $input.val()) {
            oldValue = $input.val();
        } else {
            return; 
        }

        // reset timeout for delay
        if(delayTimeout !== null) {
            clearTimeout(delayTimeout);
        }

        delayTimeout = setTimeout(function() {
            var res = searchWikipedia($input.val());
            res.done(function(data) {
                var out = data[1];
                $results.empty();

                $.each(out, function (_, value) {
                    $('<li>' + value + '</li>').appendTo(results);
                });

            }).fail(function(error) {
                $results.empty();
                $('<li>Error: ' + error + '</li>').appendTo(results);
            });
        }, 750);
    });
  }

  main();

}(window, jQuery));
