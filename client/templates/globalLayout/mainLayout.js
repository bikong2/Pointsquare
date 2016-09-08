Meteor.startup(function() {
    AutoForm.setDefaultTemplate('materialize');

    $('body').on('click', '[data-action=logout]', function(event) {
        event.preventDefault();
        AccountsTemplates.logout();
    });

    // WARNING: REMOVE WHEN DEPLOY
    Session.set("godMode", true);
});
