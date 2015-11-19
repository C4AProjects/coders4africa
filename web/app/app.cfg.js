


var config_prod={

    "API_URI": "http://c4africa-dev.c4asolution.com:5000/api/v1.0"
}
var config_dev={

    "API_URI": "http://localhost:5000/api/v1.0"
}



APP.constant("CONFIG",config_prod )
APP.config(function ($translateProvider) {
    $translateProvider.useStaticFilesLoader({
        prefix: 'l10n/',
        suffix: '.json'
    });

    // Tell the module what language to use by default
    $translateProvider.preferredLanguage('fr');
});