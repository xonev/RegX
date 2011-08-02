$(document).ready(function () {
    var socket = io.connect();
        
    socket.on('connection', function (data) {
        console.log(data);
    });

    socket.on('match found', function (data) {
        var $results = $("#results").empty()
        , matches = data.results
        , i;
        
        if (data.results !== null) {
            $results.append(
                "<ul id='results-list'><li>" + data.results[0] + "</li><ul>");
            if (data.results.length > 1) {
                $("#results-list").append(
                    "<li>Groups<ul id='result-groups'></ul></li>");
                for (i = 1; i < data.results.length; i += 1) {
                    $("#result-groups").append(
                        "<li>" + data.results[i] + "</li>");
                }
            }
        }
        else {
            $results.append("No matches found :(");
        }
    });

    $('input').keypress(function (event) {
        var $enteredText
        , testText
        , $checkboxes
        , modifiers = "";

        
        if (event.which === 13) {
            $enteredText = $("#entered-text")
            
            $checkboxes = $("input[type=checkbox]:checked");
            $checkboxes.each(function (index) {
                modifiers += this.value;
            });

            testText = $("#test-text")[0];
            
            event.preventDefault();
            $enteredText.empty();
            $enteredText.append(this.value);
            socket.emit('find match', {
                pattern: this.value,
                testText: testText.value,
                modifiers: modifiers
            });
        } 
    }); 
});