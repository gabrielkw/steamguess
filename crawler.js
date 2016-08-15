waitingForContent = true;
$('MoreContentForm' + currentPage).request({
    // currentPage ranges from 1 to N
    onComplete: function(transport) {
        console.log("request complete");
        console.log(transport.request.url);
    },
    onFailure: function() {
        DoneWaitingForContent();
        console.log("request failed");
    },
    onException: function() {
        DoneWaitingForContent();
        console.log("request found an exception");
    },
    onSuccess: function(transport) {
        console.log("request successful");
        console.log(transport.responseText);
    }
});
