EasySearch.createSearchIndex('knowledge', {
    'field': ['name', 'description', 'views', 'state', 'date'],
    'collection': knowledge,
    'props': {
        'filteredClasses': ['Unit'],
        'orderBy': 'state',
        'onlyNewUnits': true,
        'onlyHighProspect': true,
    },
    sort: function() {
        if (this.props.orderBy) {
            if (this.props.orderBy === 'name') {
                return {
                    'name': 1
                };
            } else if (this.props.orderBy === 'views') {
                return {
                    'views': -1
                };
            } else if (this.props.orderBy === 'state') {
                currentUserRID = Session.get('currentUserRID');
                var sortQuery = {};
                sortQuery['user_dependent_info.' + currentUserRID + '.state'] = -1;
                return sortQuery;
            } else {
                return {
                    'name': 1
                };
            }
        }
    },
    'limit': 10,
    'query': function(searchString, opts) {
        // Default query that will be used for searching
        var query = EasySearch.getSearcher(this.use).defaultQuery(this, searchString);

        // filter for categories if set
        if (this.props.filteredClasses.length > 0) {
            query.class = {
                $in: this.props.filteredClasses
            };
        };

        // filter for only new units
        if (this.props.onlyNewUnits) {
            currentUserRID = Session.get('currentUserRID');
            query['user_dependent_info.' + currentUserRID + '.succeeded'] = {
                $not: {
                    $gt: 0
                }

            };
        };
        if (this.props.onlyHighProspect) {
            currentUserRID = Session.get('currentUserRID');
            query['user_dependent_info.' + currentUserRID + '.prospect'] = {
                $not: {
                    $lt: 0.5
                }
            };
        };
        return query;

    }
});
