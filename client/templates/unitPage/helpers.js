Template.unitPage.helpers({
  contentPage: function() {
    var nodeId = FlowRouter.getParam('nodeId');
    var content = Nodes.findOne({
      _id: nodeId
    }) || {};
    return content;
  }
});

Template.unitContent.helpers({
  'numberOfSections': function() {
    const numbersToWord = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'sixteen'];
    const numberOfSections = Template.currentData().content.length;
    return numbersToWord[numberOfSections];
  },
  'unitIsOneSectionAndNoExercise': function() {
    var unitContent = Template.currentData().content;
    var numberOfSections = _.filter(unitContent, {
      'type': 'unitSection'
    }).length;
    var noExercise = _.includes(_.find(unitContent, {
      'type': 'unitEvaluationSection'
    }), 'userConfirmation');
    if (numberOfSections == 1 && noExercise) {
      return 1;
    } else return 0;
  },

  'failedUnitAndNoGoal': function() {
    var failedUnitAndNoGoal;
    if (typeof Session.get('failedUnitAndNoGoal') !== 'undefined') {
      failedUnitAndNoGoal = Session.get('failedUnitAndNoGoal');
    } else failedUnitAndNoGoal = false;
    return failedUnitAndNoGoal;
  }
});

Template.relatedConcepts.helpers({
  neededConcepts: function() {
    var needs = Session.get("needs");
    var neededSetsOfConceptsArray = needs ? Object.keys(needs) : [];
    return neededSetsOfConceptsArray;
  },
  subConceptsOf: function(setOfConceptsID) {
    if (typeof setOfConceptsID !== "undefined" && setOfConceptsID !== null) {
      var setId = setOfConceptsID;
      var subConcepts = {};
      var needs = Session.get("needs");
      if (typeof needs[setId] !== "undefined" && needs[setId] !== null) {
        var subConceptIds = Object.keys(needs[setId]);
        var subConcepts = Nodes.find({
          "_id": {
            "$in": subConceptIds
          }
        }).fetch();
      };
      return subConcepts;
    }
  },
  grantedConcepts: function() {
    var nodeId = FlowRouter.getParam('nodeId');
    var content = Nodes.findOne({
      _id: nodeId
    }) || {};
    // if content.grants exist
    if (typeof content.grants !== "undefined") {
      //extract granted concepts as array of ids and query db
      var grantedIds = Object.keys(content.grants);
      var grantedConcepts = Nodes.find({
        "_id": {
          "$in": grantedIds
        }
      }).fetch();
      return grantedConcepts;
    } else return null;
  }
});
