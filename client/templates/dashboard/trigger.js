Template.dashboard.onCreated(function() {
    var self = this;
    self.autorun(function() {
        self.subscribe('nodes');
    });
});
