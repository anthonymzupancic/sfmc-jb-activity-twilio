define([
    'postmonger'
], function (
    Postmonger
) {
    'use strict';

    let connection = new Postmonger.Session();
    let authTokens = {};
    let payload = {};
    let interactionRes = {};
    let dataSourcesRes = {};

    $(window).ready(onRender);

    connection.on('initActivity', initialize);
    connection.on('requestedTokens', onGetTokens);
    connection.on('requestedEndpoints', onGetEndpoints);
    connection.on('requestedInteraction', onRequestedInteraction);
    connection.on('requestedTriggerEventDefinition', onRequestedTriggerEventDefinition);
    connection.on('requestedDataSources', onRequestedDataSources);

    connection.on('clickedNext', save);
   
    function onRender() {
        // JB will respond the first time 'ready' is called with 'initActivity'
        connection.trigger('ready');

        connection.trigger('requestTokens');
        connection.trigger('requestEndpoints');
        connection.trigger('requestInteraction');
        connection.trigger('requestTriggerEventDefinition');
        connection.trigger('requestDataSources');  
    }

    function onRequestedDataSources(dataSources){
        console.log('*** requestedDataSources ***');
        console.log(dataSources);

        const event = dataSources.filter(e => e.id === 'Event')
        $('#dataSource').text(event.toString())
    }

    function onRequestedInteraction (interaction) {  
        console.log('*** requestedInteraction ***');
        console.log(interaction);
        
        interactionRes = interaction
     }

     function onRequestedTriggerEventDefinition(eventDefinitionModel) {
        console.log('*** requestedTriggerEventDefinition ***');
        console.log(eventDefinitionModel);
    }

    function initialize(data) {
        console.log(data);
        if (data) {
            payload = data;
        }
    
        var hasInArguments = Boolean(
            payload['arguments'] &&
            payload['arguments'].execute &&
            payload['arguments'].execute.inArguments &&
            payload['arguments'].execute.inArguments.length > 0
        );

        var inArguments = hasInArguments ? payload['arguments'].execute.inArguments : {};
        
        console.log('*** in arguments ***')
        console.log(inArguments);
        
        console.log('*** dataSource in init ***')
        console.log(dataSourcesRes)
        
        const event = dataSourcesRes.filter(e => e.id === 'Event')
        console.log('*** event ***')
        console.log(event)


        if(inArguments && inArguments.length > 0 && inArguments[0].message){
            $('#Message').val(inArguments[0].message)
        }

        connection.trigger('updateButton', {
            button: 'next',
            text: 'done',
            visible: true
        });
    }

    function onGetTokens(tokens) {
        console.log(tokens);
        authTokens = tokens;
    }

    function onGetEndpoints(endpoints) {
        console.log(endpoints);
    }

    function save() {        
        // set fields based on user input
        let message = $('#Message').val();
        payload['arguments'].execute.inArguments[0] = {
            'message': message,
            'toPhone': interactionRes.defaults.mobileNumber[0]
        }

        payload['metaData'].isConfigured = true;

        console.log(payload);
        connection.trigger('updateActivity', payload);
    }

   
});
